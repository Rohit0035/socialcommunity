import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import "@/lib/dns";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";


export const authOptions = {

    providers: [

        CredentialsProvider({
            name: "Credentials",

            credentials: {
                identifier: {},
                password: {},
                role: {},
            },

            async authorize(credentials) {

                await connectDB();

                const user = await User.findOne({
                    $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier },
                    ],
                });
                
                if (!user) {
                    throw new Error("User not found");
                }

                // optional safety check for social login users
                if (!user.password) {
                    throw new Error("Please login with Google or GitHub");
                }

                // ADMIN LOGIN
                if (credentials.role === "admin") {

                    if (user.role !== "admin") {
                        throw new Error("Admin access only");
                    }

                    const isPasswordCorrect =
                        await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                        username: user.username,
                    };
                }

                // STUDENT LOGIN
                if (credentials.role === "user") {

                    if (user.role !== "user") {
                        throw new Error("User access only");
                    }

                    const isPasswordCorrect =
                        await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image,
                        username: user.username,
                    };
                }

                return null;
            },
        }),

        GoogleProvider({
            clientId:
                process.env.GOOGLE_CLIENT_ID,

            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    callbacks: {

        async jwt({ token, user, account }) {

            await connectDB();

            // Credentials login
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            // Google login first time
            if (account?.provider === "google") {

                let existingUser = await User.findOne({
                    email: token.email,
                });

                if (!existingUser) {
                    // Generate username from email
                    let username = token.email.split("@")[0];

                    // Make username unique
                    let usernameExists = await User.findOne({ username });
                    let counter = 1;

                    while (usernameExists) {
                        username = `${token.email.split("@")[0]}${counter}`;
                        usernameExists = await User.findOne({ username });
                        counter++;
                    }

                    existingUser = await User.create({
                        name: token.name,
                        email: token.email,
                        image: token.picture,
                        username: username,
                        role: "user",
                        provider: "google",
                    });
                }

                token.id = existingUser._id.toString();
                token.role = existingUser.role;
            }

            // Always ensure role exists
            if (!token.role && token.email) {

                const dbUser = await User.findOne({
                    email: token.email,
                });

                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                }
            }

            return token;
        },

        async session({ session, token }) {

            const dbUser = await User.findById(token.id).lean();

            session.user = dbUser;

            return session;
        },
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
};
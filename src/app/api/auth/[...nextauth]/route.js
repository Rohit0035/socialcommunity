import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
  name: "credentials",

  credentials: {
    identifier: {}, // email or username
    password: {},
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

    const isPasswordCorrect = await bcrypt.compare(
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
      image: user.image,
      username: user.username,
    };
  },
}),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      if (account.provider !== "credentials") {
        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
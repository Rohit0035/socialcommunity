import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { email, password,name, dateOfBirth, username } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    if(username){
      const existingUsername = await User.findOne({ username });
  
      if (existingUsername) {
        return Response.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      dateOfBirth,
      name,
      username,
    });

    return Response.json(user);

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
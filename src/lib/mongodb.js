// lib/connectDB.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function createDefaultAdmin() {
  try {
    console.log("Checking default admin...");

    const admin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (admin) {
      console.log("Admin already exists");
      console.log("Admin email:", admin.email);
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const newAdmin = await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", newAdmin.email);
  } catch (error) {
    console.log("Create admin error:", error);
  }
}

async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        // FORCE the database name here
        dbName: 'reelar', 
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    console.log(`MongoDB Connected to: ${cached.conn.connection.name}`);

    await createDefaultAdmin();

    return cached.conn;
  } catch (error) {
    console.log("MongoDB connection error:", error);
    throw error; 
  }
}

export default connectDB;
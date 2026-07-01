import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";
import Story from "@/models/Story";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Message from "@/models/Message";

import { uploadImage } from "@/lib/uploadImage";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  await connectDB();
  
  const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

  const userId = session.user._id;

  const stories = await Notification.find({ recipient: userId })
    .populate("sender")
    .populate("post")
    .populate("comment")
    .populate("message")
    .populate("story")
    .sort({ createdAt: -1 });

  return NextResponse.json(stories);
}
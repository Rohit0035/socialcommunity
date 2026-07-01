import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Saved from "@/models/Saved";
import Post from "@/models/Post";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID required" },
        { status: 400 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    const existingSave = await Saved.findOne({
      post: postId,
      user: session.user._id,
    });

    if (existingSave) {
      await existingSave.delete();

      return NextResponse.json({
        success: true,
        saved: false,
      });
    }

    await Saved.create({
      post: postId,
      user: session.user._id,
    });

    return NextResponse.json({
      success: true,
      saved: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
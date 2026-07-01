import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Like from "@/models/Like";
import Post from "@/models/Post";
import Notification from "@/models/Notification";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createNotification } from "@/lib/createNotification";

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

    const existingLike = await Like.findOne({
      post: postId,
      user: session.user._id,
    });

    if (existingLike) {
      await existingLike.delete();
      const likesCount = await Like.countDocuments({
        post: postId,
      });

      await Notification.deleteOne({
        type: "post_like",
        post: postId,
        sender: session.user._id,
        recipient: post.user,
      });

      return NextResponse.json({
        success: true,
        liked: false,
        likesCount,
      });
    }

    await Like.create({
      post: postId,
      user: session.user._id,
    });

    await createNotification({
      recipient: post.user,
      sender: session.user._id,
      type: "post_like",
      post: post._id,
      previewImage: post.image || "",
      text: `${session.user.name} liked your post`,
      actionText: "liked your post",
    });

    const likesCount = await Like.countDocuments({
      post: postId,
    });

    return NextResponse.json({
      success: true,
      liked: true,
      likesCount,
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
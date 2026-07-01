import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Comment from "@/models/Comment";
import Post from "@/models/Post";

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

    const { postId, text } = await req.json();

    if (!postId || !text?.trim()) {
      return NextResponse.json(
        {
          message: "Post ID and comment are required",
        },
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

    const comment = await Comment.create({
      post: postId,
      user: session.user._id,
      text: text.trim(),
    });

    await comment.populate(
      "user",
      "name username image"
    );

    await createNotification({
      recipient: post.user, // owner of the post
      sender: session.user._id, // commenter
      type: "post_comment",
      post: post._id,
      comment: comment._id,
      previewImage: post.image || "",
      text: `${session.user.name} commented on your post`,
      actionText: "commented on your post",
    });

    const commentsCount =
      await Comment.countDocuments({
        post: postId,
      });

    return NextResponse.json({
      success: true,
      comment,
      commentsCount,
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
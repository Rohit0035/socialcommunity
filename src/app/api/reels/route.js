import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import Follow from "@/models/Follow";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import Saved from "@/models/Saved";

import { uploadImage } from "@/lib/uploadImage";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const currentUserId =
      session.user._id.toString();

    const posts = await Post.find({
      user: {
        $nin: [currentUserId],
      },
      mediaType: "video",
    })
      .populate(
        "user",
        "name username image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    const postIds = posts.map(
      (p) => p._id
    );

    const likes = await Like.find({
      post: {
        $in: postIds,
      },
    }).lean();

    const comments = await Comment.find({
      post: {
        $in: postIds,
      },
    })
      .populate(
        "user",
        "name username image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    const saved = await Saved.find({
      post: {
        $in: postIds,
      },
    }).populate(
      "user",
      "name username image"
    );

    const feed = posts.map((post) => {
      const postLikes = likes.filter(
        (like) =>
          like.post.toString() ===
          post._id.toString()
      );

      const postComments =
        comments.filter(
          (comment) =>
            comment.post.toString() ===
            post._id.toString()
        );

      const latestComment =
        postComments.length > 0
          ? postComments[0]
          : null;

      return {
        ...post,

        likesCount:
          postLikes.length,

        commentsCount:
          postComments.length,

        isLiked: postLikes.some(
          (like) =>
            like.user.toString() ===
            currentUserId
        ),

        isSaved: saved.some(
          (save) =>
            save.post.toString() ===
            post._id.toString()
        ),

        comments: postComments.map(comment => ({
          _id: comment._id,
          text: comment.text,
          createdAt: comment.createdAt,
          user: comment.user,
        })),

        latestComment:
          latestComment
            ? {
              user:
                latestComment.user,
              text:
                latestComment.text,
            }
            : null,
      };
    });

    return NextResponse.json({
      success: true,
      reels: feed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch posts",
      },
      {
        status: 500,
      }
    );
  }
}
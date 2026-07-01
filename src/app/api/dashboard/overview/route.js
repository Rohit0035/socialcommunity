// app/api/dashboard/overview/route.js

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Post from "@/models/Post";
import Like from "@/models/Like";
import Comment from "@/models/Comment";
import Saved from "@/models/Saved";
import Follow from "@/models/Follow";

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

    const userId = session.user._id;

    const posts = await Post.find({
      user: userId,
    }).select("_id");

    const postIds = posts.map(
      (post) => post._id
    );

    const [
      postsCount,
      likesCount,
      commentsCount,
      savedCount,
      followersCount,
      followingCount,
    ] = await Promise.all([
      Post.countDocuments({
        user: userId,
      }),

      Like.countDocuments({
        post: { $in: postIds },
      }),

      Comment.countDocuments({
        post: { $in: postIds },
      }),

      Saved.countDocuments({
        post: { $in: postIds },
      }),

      Follow.countDocuments({
        following: userId,
        status: "accepted",
      }),

      Follow.countDocuments({
        follower: userId,
        status: "accepted",
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        posts: postsCount,
        likes: likesCount,
        comments: commentsCount,
        saved: savedCount,
        followers: followersCount,
        following: followingCount,
      },
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
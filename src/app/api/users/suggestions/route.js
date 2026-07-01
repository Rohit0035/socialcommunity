// app/api/users/suggestions/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

import User from "@/models/User";
import Follow from "@/models/Follow";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const currentUserId = session.user._id;

    // users already followed
    const following = await Follow.find({
      follower: currentUserId,
    }).select("following");

    const followingIds = following.map(
      (item) => item.following.toString()
    );

    const excludeIds = [
      ...followingIds,
      currentUserId,
    ];

    const users = await User.find({
      _id: {
        $nin: excludeIds,
      },
      role: "user",
    })
      .select(
        "name username image isPrivate"
      )
      .limit(10);

    const suggestions = await Promise.all(
      users.map(async (user) => {
        const followersCount =
          await Follow.countDocuments({
            following: user._id,
          });

        const followingCount =
          await Follow.countDocuments({
            follower: user._id,
          });

        const posts = await Post.find({
          user: user._id,
        })
          .select("image")
          .sort({ createdAt: -1 })
          .limit(3);

        const postsCount =
          await Post.countDocuments({
            user: user._id,
          });

        return {
          _id: user._id,
          name: user.name,
          username: user.username,
          image: user.image,
          private: user.isPrivate,

          followers: followersCount,
          following: followingCount,
          posts: postsCount,

          isFollowing: false,

          postsImages: posts.map(
            (post) => post.image
          ),
        };
      })
    );

    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
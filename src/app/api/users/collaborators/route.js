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

    // Users I follow
    const following = await Follow.find({
      follower: currentUserId,
    }).select("following");

    const followingIds = following.map((f) =>
      f.following.toString()
    );

    // Users who follow me
    const followers = await Follow.find({
      following: currentUserId,
    }).select("follower");

    const followerIds = followers.map((f) =>
      f.follower.toString()
    );

    // Mutual followers (intersection)
    const mutualIds = followingIds.filter((id) =>
      followerIds.includes(id)
    );

    const collaborators = await User.find({
      _id: {
        $in: mutualIds,
        $ne: currentUserId,
      },
      role: "user",
    }).select(
      "name username image isPrivate"
    );

    return NextResponse.json(collaborators);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
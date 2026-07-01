import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Follow from "@/models/Follow";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
  await connectDB();

  const session = await getServerSession(authOptions);
  
  const { id: followingId } = await req.json();
  const currentUserId = session.user._id;

  await Follow.findOneAndDelete({
    follower: currentUserId,
    following: followingId,
  });

  return NextResponse.json({
    message: "Unfollowed successfully",
  });

  } catch (error) {
    console.log(error);

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
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Follow from "@/models/Follow";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createNotification } from "@/lib/createNotification";

export async function POST(req) {
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

    const { followingId } = await req.json();
    const currentUserId = session.user._id;

    if (currentUserId === followingId) {
      return Response.json(
        { message: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    const existingFollow = await Follow.findOne({
      follower: currentUserId,
      following: followingId,
    });

    if (existingFollow) {
      return Response.json({
        message: "Already following",
      });
    }

    await Follow.create({
      follower: currentUserId,
      following: followingId,
    });

    await createNotification({
      recipient: followingId,
      sender: currentUserId,
      type: "follow_request",
      actionText: "requested to follow you",
    });


    return NextResponse.json({
      message: "Followed successfully",
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
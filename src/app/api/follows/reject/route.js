import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Follow from "@/models/Follow";
import Notification from "@/models/Notification";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createNotification } from "@/lib/createNotification";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    const { notificationId } = await req.json();
    const currentUserId = session.user._id;

    const notification = await Notification.findById(notificationId)
      .populate("sender");

    if (!notification) {
      return NextResponse.json(
        {
          message: "Notification not found",
        },
        {
          status: 404,
        }
      );
    }

    const followingId = notification.sender._id;

    await Follow.findOneAndUpdate({
      follower: followingId,
      following: currentUserId,
    }, {
      status: "rejected",
    });

    await Notification.delete({
      _id: notificationId,
    });

    await createNotification({
      recipient: followingId,
      sender: currentUserId,
      type: "follow_rejected",
      actionText: "rejected your follow request",
    });

    return NextResponse.json({
      message: "Follow request rejected successfully",
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
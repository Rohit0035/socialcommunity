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

    const followerId = notification.sender._id;

    await Follow.findOneAndUpdate({
      follower: followerId,
      following: currentUserId,
    }, {
      $set: {
        status: "accepted",
      },
    });

    const existingFollowBack = await Follow.findOne({
      follower: currentUserId,
      following: followerId,
    });

    if (existingFollowBack) {
      await Follow.findOneAndUpdate({
        follower: currentUserId,
        following: followerId,
      }, {
        $set: {
          status: "accepted",
        },
      });
    } else {
      await Follow.create({
        follower: currentUserId,
        following: followerId,
        status: "accepted",
      });
    }

    await Notification.delete({
      _id: notificationId,
    });

    await createNotification({
      recipient: followerId,
      sender: currentUserId,
      type: "follow_accepted",
      actionText: "accepted your follow request",
    });

    return NextResponse.json({
      message: "Follow request accepted successfully",
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
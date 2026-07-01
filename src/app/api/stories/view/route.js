import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Story from "@/models/Story";
import StoryView from "@/models/StoryView";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { storyId } = await req.json();

    if (!storyId) {
      return NextResponse.json(
        {
          message: "Story ID required",
        },
        {
          status: 400,
        }
      );
    }

    const story =
      await Story.findById(storyId);

    if (!story) {
      return NextResponse.json(
        {
          message: "Story not found",
        },
        {
          status: 404,
        }
      );
    }

    await StoryView.findOneAndUpdate(
      {
        story: storyId,
        viewer: session.user._id,
      },
      {},
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
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
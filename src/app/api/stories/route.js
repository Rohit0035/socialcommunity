import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Story from "@/models/Story";

import { uploadImage } from "@/lib/uploadImage";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    const formData = await req.formData();

    const user = session.user._id;

    const media =
      formData.get("file");

    const storyText =
      formData.get("storyText");

    const filter =
      formData.get("filter");

    const audience =
      formData.get("audience");

    const storyLink =
      formData.get("storyLink");

    const scheduleDate =
      formData.get("scheduleDate");

    const allowReplies =
      formData.get("allowReplies") === "true";

    const allowReactions =
      formData.get("allowReactions") === "true";

    const mentions =
      JSON.parse(
        formData.get("mentions") || "[]"
      );

    // Upload image/video
    const mediaPath =
      await uploadImage(
        media,
        "uploads/stories"
      );

    const mediaType =
      media.type.startsWith("video")
        ? "video"
        : "image";

    const story = await Story.create({

      user: user,

      media: mediaPath,
      mediaType,

      storyText,

      filter,
      audience,

      mentions,

      storyLink,

      allowReplies,
      allowReactions,

      scheduleDate:
        scheduleDate || null,
    });

    return NextResponse.json(story);

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
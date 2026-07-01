import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import Follow from "@/models/Follow";
import Comment from "@/models/Comment";
import Like from "@/models/Like";

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

    const media = formData.get("media");
    const filter = formData.get("filter");
    const caption = formData.get("caption");
    const location = formData.get("location");
    const collaborators =
      JSON.parse(
        formData.get("collaborators") || "[]"
      );
    const altText = formData.get("altText");

    const hideLikeAndViewCount =
      formData.get("hideLikeAndViewCount") === "true";

    const turnOffCommenting =
      formData.get("turnOffCommenting") === "true";


    // Upload image/video
    const mediaPath =
      await uploadImage(
        media,
        "uploads/posts"
      );

    const mediaType =
      media.type.startsWith("video")
        ? "video"
        : "image";

    const post = await Post.create({
      user: user,
      media: mediaPath,
      mediaType,
      filter,
      caption,
      location,
      collaborators,
      altText,
      hideLikeAndViewCount,
      turnOffCommenting
    });

    return NextResponse.json(post);

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
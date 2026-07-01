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

        const likes = await Like.find({
            user: userId,
        })
            .populate("post")
            .populate("user")
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            likes,
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
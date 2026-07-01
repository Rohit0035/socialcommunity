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

        const posts = await Post.find({
            user: userId,
        })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        console.log(posts);

        const postIds = posts.map(
            (post) => post._id
        );

        const likes = await Like.find({
            post: { $in: postIds },
        }).lean();

        const comments = await Comment.find({
            post: { $in: postIds },
        }).lean();

        const topPosts = posts.map((post) => ({
            ...post,

            likesCount: likes.filter(
                (like) =>
                    like.post.toString() ===
                    post._id.toString()
            ).length,

            commentsCount: comments.filter(
                (comment) =>
                    comment.post.toString() ===
                    post._id.toString()
            ).length,
        }));

        topPosts.sort(
            (a, b) =>
                b.likesCount +
                b.commentsCount -
                (a.likesCount +
                    a.commentsCount)
        );

        return NextResponse.json({
            success: true,
            topPosts,
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
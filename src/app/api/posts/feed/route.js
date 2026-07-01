import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import Post from "@/models/Post";
import Follow from "@/models/Follow";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import Saved from "@/models/Saved";

import { uploadImage } from "@/lib/uploadImage";

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

    const currentUserId =
      session.user._id.toString();

    // Following
    const following = await Follow.find({
      follower: currentUserId,
      status: "accepted",
    }).select("following");

    const followingIds = following.map(
      (f) => f.following.toString()
    );

    // Followers
    const followers = await Follow.find({
      following: currentUserId,
      status: "accepted",
    }).select("follower");

    const followerIds = followers.map(
      (f) => f.follower.toString()
    );

    // Mutuals
    const mutualIds = followingIds.filter(
      (id) => followerIds.includes(id)
    );

    // Public users
    const publicUsers = await User.find({
      accountType: "public",
    }).select("_id");

    const publicIds = publicUsers.map(
      (u) => u._id.toString()
    );

    const allowedUserIds = [
      ...new Set([
        ...mutualIds,
        ...publicIds,
      ]),
    ].filter(id => id !== currentUserId);

    const posts = await Post.find({
      user: {
        $in: allowedUserIds,
      },
    })
      .populate(
        "user",
        "name username image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    const postIds = posts.map(
      (p) => p._id
    );

    const likes = await Like.find({
      post: {
        $in: postIds,
      },
    }).lean();

    const comments = await Comment.find({
      post: {
        $in: postIds,
      },
    })
      .populate(
        "user",
        "name username image"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    const saved = await Saved.find({
      post: {
        $in: postIds,
      },
    }).populate(
      "user",
      "name username image"
    );

    const feed = posts.map((post) => {
      const postLikes = likes.filter(
        (like) =>
          like.post.toString() ===
          post._id.toString()
      );

      const postComments =
        comments.filter(
          (comment) =>
            comment.post.toString() ===
            post._id.toString()
        );

      const latestComment =
        postComments.length > 0
          ? postComments[0]
          : null;

      return {
        ...post,

        likesCount:
          postLikes.length,

        commentsCount:
          postComments.length,

        isLiked: postLikes.some(
          (like) =>
            like.user.toString() ===
            currentUserId
        ),

        isSaved: saved.some(
          (save) =>
            save.post.toString() ===
            post._id.toString()
        ),

        comments: postComments.map(comment => ({
          _id: comment._id,
          text: comment.text,
          createdAt: comment.createdAt,
          user: comment.user,
        })),

        latestComment:
          latestComment
            ? {
              user:
                latestComment.user,
              text:
                latestComment.text,
            }
            : null,
      };
    });

    return NextResponse.json({
      success: true,
      posts: feed,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch posts",
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Story from "@/models/Story";
import StoryView from "@/models/StoryView";
import Follow from "@/models/Follow";
import User from "@/models/User";

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

    /**
     * Users current user follows
     */
    const following = await Follow.find({
      follower: currentUserId,
      status: "accepted",
    }).select("following");

    const followingIds = following.map(
      (item) => item.following.toString()
    );

    /**
     * Users following current user
     */
    const followers = await Follow.find({
      following: currentUserId,
      status: "accepted",
    }).select("follower");

    const followerIds = followers.map(
      (item) => item.follower.toString()
    );

    /**
     * Mutual followers
     */
    const mutualIds = followingIds.filter(
      (id) => followerIds.includes(id)
    );

    /**
     * Public users
     */
    const publicUsers = await User.find({
      isPrivate: false,
      role: "user",
    }).select("_id");

    const publicIds = publicUsers.map(
      (user) => user._id.toString()
    );

    /**
     * Allowed users
     */
    const allowedUserIds = [
      ...new Set([
        currentUserId,
        ...mutualIds,
        ...publicIds,
      ]),
    ];

    /**
     * Active stories only
     */
    const stories = await Story.find({
      user: { $in: allowedUserIds },
      expiresAt: { $gt: new Date() },
    })
      .populate(
        "user",
        "name username image"
      )
      .sort({
        createdAt: -1,
      });

    /**
     * Get viewed stories
     */
    const storyIds = stories.map(
      (story) => story._id
    );

    const storyViews =
      await StoryView.find({
        viewer: currentUserId,
        story: {
          $in: storyIds,
        },
      }).select("story");

    const viewedStoryIds = new Set(
      storyViews.map((view) =>
        view.story.toString()
      )
    );

    /**
     * Group stories by user
     */
    const groupedStories = {};

    stories.forEach((story) => {
      if (!story.user) return;

      const userId =
        story.user._id.toString();

      if (!groupedStories[userId]) {
        groupedStories[userId] = {
            id: userId,
            user:
            story.user.username ||
            story.user.name,
            avatar:
            story.user.image ||
            "/images/default-avatar.png",
            isMine:
            userId === currentUserId,
            stories: [],
            viewed: true,
            latestStoryAt: story.createdAt,
        };
    }

      /**
       * If at least one story is unviewed,
       * whole group becomes unviewed.
       */
      if (
        !viewedStoryIds.has(
          story._id.toString()
        )
      ) {
        groupedStories[userId].viewed =
          false;
      }

      /**
       * Track latest story
       */
      if (
        story.createdAt >
        groupedStories[userId]
          .latestStoryAt
      ) {
        groupedStories[
          userId
        ].latestStoryAt =
          story.createdAt;
      }

      groupedStories[userId].stories.push({
        id: story._id,
        url: story.media,
        type: story.mediaType,
        storyText: story.storyText,
        filter: story.filter,
        storyLink: story.storyLink,
        allowReplies:
          story.allowReplies,
        allowReactions:
          story.allowReactions,
        createdAt:
          story.createdAt,
        viewed:
          viewedStoryIds.has(
            story._id.toString()
          ),
      });
    });

    /**
     * Convert to array
     */
    const allStories =
      Object.values(groupedStories);

    /**
     * Sort:
     * 1. Unviewed first
     * 2. Latest first
     */
    allStories.sort((a, b) => {
      if (a.viewed !== b.viewed) {
        return a.viewed ? 1 : -1;
      }

      return (
        new Date(
          b.latestStoryAt
        ).getTime() -
        new Date(
          a.latestStoryAt
        ).getTime()
      );
    });

    /**
     * Separate own stories
     */
    const myStory =
      allStories.find(
        (story) =>
          story.id === currentUserId
      ) || null;

    const otherStories =
      allStories.filter(
        (story) =>
          story.id !== currentUserId
      );

    return NextResponse.json({
      myStory,
      otherStories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch stories",
      },
      {
        status: 500,
      }
    );
  }
}
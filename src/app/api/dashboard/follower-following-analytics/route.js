import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Follow from "@/models/Follow";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export async function GET(req) {
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

    const { searchParams } = new URL(req.url);

    const range =
      searchParams.get("range") || "week";

    let followersData = [];
    let followingData = [];

    // ==================================
    // DAY (LAST 24 HOURS)
    // ==================================

    if (range === "day") {
      const startDate = new Date(
        Date.now() -
          24 * 60 * 60 * 1000
      );

      const [followers, following] =
        await Promise.all([
          Follow.aggregate([
            {
              $match: {
                following: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  hour: {
                    $hour: "$createdAt",
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),

          Follow.aggregate([
            {
              $match: {
                follower: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  hour: {
                    $hour: "$createdAt",
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),
        ]);

      const followerMap = {};
      const followingMap = {};

      followers.forEach((item) => {
        followerMap[item._id.hour] =
          item.count;
      });

      following.forEach((item) => {
        followingMap[item._id.hour] =
          item.count;
      });

      for (
        let hour = 0;
        hour < 24;
        hour += 3
      ) {
        followersData.push({
          label:
            hour === 0
              ? "12a"
              : hour < 12
              ? `${hour}a`
              : hour === 12
              ? "12p"
              : `${hour - 12}p`,
          followers:
            followerMap[hour] || 0,
          following:
            followingMap[hour] || 0,
        });
      }
    }

    // ==================================
    // WEEK (LAST 7 DAYS)
    // ==================================

    else if (range === "week") {
      const startDate = new Date();

      startDate.setDate(
        startDate.getDate() - 6
      );

      const [followers, following] =
        await Promise.all([
          Follow.aggregate([
            {
              $match: {
                following: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  day: {
                    $dateToString: {
                      format:
                        "%Y-%m-%d",
                      date: "$createdAt",
                    },
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),

          Follow.aggregate([
            {
              $match: {
                follower: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  day: {
                    $dateToString: {
                      format:
                        "%Y-%m-%d",
                      date: "$createdAt",
                    },
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),
        ]);

      const followerMap = {};
      const followingMap = {};

      followers.forEach((item) => {
        followerMap[item._id.day] =
          item.count;
      });

      following.forEach((item) => {
        followingMap[item._id.day] =
          item.count;
      });

      for (
        let i = 6;
        i >= 0;
        i--
      ) {
        const date = new Date();

        date.setDate(
          date.getDate() - i
        );

        const key = date
          .toISOString()
          .split("T")[0];

        followersData.push({
          label:
            WEEK_DAYS[
              date.getDay()
            ],
          followers:
            followerMap[key] || 0,
          following:
            followingMap[key] || 0,
        });
      }
    }

    // ==================================
    // MONTH (LAST 12 MONTHS)
    // ==================================

    else {
      const startDate = new Date();

      startDate.setMonth(
        startDate.getMonth() - 11
      );

      const [followers, following] =
        await Promise.all([
          Follow.aggregate([
            {
              $match: {
                following: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  year: {
                    $year:
                      "$createdAt",
                  },
                  month: {
                    $month:
                      "$createdAt",
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),

          Follow.aggregate([
            {
              $match: {
                follower: userId,
                status: "accepted",
                createdAt: {
                  $gte: startDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  year: {
                    $year:
                      "$createdAt",
                  },
                  month: {
                    $month:
                      "$createdAt",
                  },
                },
                count: {
                  $sum: 1,
                },
              },
            },
          ]),
        ]);

      const followerMap = {};
      const followingMap = {};

      followers.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}`;

        followerMap[key] =
          item.count;
      });

      following.forEach((item) => {
        const key = `${item._id.year}-${item._id.month}`;

        followingMap[key] =
          item.count;
      });

      for (
        let i = 11;
        i >= 0;
        i--
      ) {
        const date = new Date();

        date.setMonth(
          date.getMonth() - i
        );

        const key = `${
          date.getFullYear()
        }-${date.getMonth() + 1}`;

        followersData.push({
          label:
            MONTHS[
              date.getMonth()
            ],
          followers:
            followerMap[key] || 0,
          following:
            followingMap[key] || 0,
        });
      }
    }

    return NextResponse.json({
      success: true,
      range,
      data: followersData,
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
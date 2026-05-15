"use client";

import React, { useMemo, useState } from "react";

import {
  Card,
  CardBody,
  Button,
  ButtonGroup,
} from "reactstrap";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const FollowersChart = () => {

  const [view, setView] = useState("day");

  // -----------------------------------
  // DAY DATA
  // -----------------------------------
  const dayData = [
    { label: "12a", followers: 19, following: 10 },
    { label: "3a", followers: 18, following: 12 },
    { label: "6a", followers: 20, following: 14 },
    { label: "9a", followers: 17, following: 11 },
    { label: "12p", followers: 25, following: 18 },
    { label: "3p", followers: 28, following: 20 },
    { label: "6p", followers: 35, following: 24 },
    { label: "9p", followers: 30, following: 22 },
  ];

  // -----------------------------------
  // WEEK DATA
  // -----------------------------------
  const weekData = [
    { label: "Mon", followers: 120, following: 90 },
    { label: "Tue", followers: 180, following: 120 },
    { label: "Wed", followers: 240, following: 150 },
    { label: "Thu", followers: 170, following: 130 },
    { label: "Fri", followers: 300, following: 210 },
    { label: "Sat", followers: 350, following: 260 },
    { label: "Sun", followers: 280, following: 200 },
  ];

  // -----------------------------------
  // MONTH DATA
  // -----------------------------------
  const monthData = [
    { label: "Jan", followers: 1200, following: 800 },
    { label: "Feb", followers: 1400, following: 900 },
    { label: "Mar", followers: 1800, following: 1100 },
    { label: "Apr", followers: 1600, following: 1000 },
    { label: "May", followers: 2100, following: 1400 },
    { label: "Jun", followers: 2500, following: 1700 },
    { label: "Jul", followers: 2200, following: 1500 },
    { label: "Aug", followers: 2800, following: 1900 },
    { label: "Sep", followers: 2400, following: 1700 },
    { label: "Oct", followers: 3000, following: 2100 },
    { label: "Nov", followers: 3400, following: 2400 },
    { label: "Dec", followers: 3900, following: 2800 },
  ];

  // -----------------------------------
  // SWITCH DATA
  // -----------------------------------
  const chartData = useMemo(() => {

    switch (view) {

      case "week":
        return weekData;

      case "month":
        return monthData;

      default:
        return dayData;
    }

  }, [view]);

  // -----------------------------------
  // TOTALS
  // -----------------------------------
  const totalFollowers = chartData.reduce(
    (acc, item) => acc + item.followers,
    0
  );

  const totalFollowing = chartData.reduce(
    (acc, item) => acc + item.following,
    0
  );

  return (
    <Card
      className="border-0 shadow-sm rounded-4 mb-4"
      data-aos="zoom-in"
    >
      <CardBody className="p-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

          <div>
            <h5 className="fw-bold mb-1">
              Followers & Following Analytics
            </h5>

            <small className="text-muted">
              Track followers and following growth
            </small>
          </div>

          <div className="text-end">

            <h5 className="fw-bold text-primary mb-1">
              Followers: {totalFollowers.toLocaleString()}
            </h5>

            <h6 className="fw-bold text-success mb-0">
              Following: {totalFollowing.toLocaleString()}
            </h6>

          </div>

        </div>

        {/* FILTER BUTTONS */}
        <div className="d-flex justify-content-end mb-4">

          <ButtonGroup>

            <Button
              color={view === "day" ? "primary" : "light"}
              onClick={() => setView("day")}
            >
              Day
            </Button>

            <Button
              color={view === "week" ? "primary" : "light"}
              onClick={() => setView("week")}
            >
              Week
            </Button>

            <Button
              color={view === "month" ? "primary" : "light"}
              onClick={() => setView("month")}
            >
              Month
            </Button>

          </ButtonGroup>

        </div>

        {/* CHART */}
        <div style={{ width: "100%", height: "350px" }}>

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Legend />

              {/* FOLLOWERS BAR */}
              <Bar
                dataKey="followers"
                fill="#6C63FF"
                radius={[10, 10, 0, 0]}
                barSize={28}
                name="Followers"
              />

              {/* FOLLOWING BAR */}
              <Bar
                dataKey="following"
                fill="#22C55E"
                radius={[10, 10, 0, 0]}
                barSize={28}
                name="Following"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </CardBody>
    </Card>
  );
};

export default FollowersChart;
"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

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

	const [viewData, setViewData] = useState([]);
	const fetchAnalytics = async () => {
		try {
			const response = await axios.get(
				`/api/dashboard/follower-following-analytics?range=${view}`
			);

			setViewData(response.data.data);
		} catch (error) {
			toast.error("Something went wrong");
			console.error(error);
		}
	};

	useEffect(() => {
		fetchAnalytics();
	}, [view]);

	// -----------------------------------
	// TOTALS
	// -----------------------------------
	const totalFollowers = viewData.reduce(
		(acc, item) => acc + item.followers,
		0
	);

	const totalFollowing = viewData.reduce(
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
							data={viewData}
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
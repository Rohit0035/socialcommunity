"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, Popover, PopoverBody } from "reactstrap";
import { FaLock } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const Rightbar = () => {

	const { data: session } = useSession()
	const currentUser = session?.user;

	const [popoverOpen, setPopoverOpen] = useState(null);
	const [followState, setFollowState] = useState({});

	const handleMouseEnter = (id) => setPopoverOpen(id);
	const handleMouseLeave = () => setPopoverOpen(null);

	const [loadingSuggestions, setLoadingSuggestions] = useState(true);

	const toggleFollow = (id) => {
		setFollowState((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const [suggestions, setSuggestions] = useState([]);
	const [loadingUser, setLoadingUser] = useState(null);

	const fetchSuggestions = async () => {
		try {
			setLoadingSuggestions(true);

			const response = await axios.get("/api/users/suggestions");
			setSuggestions(response.data || []);
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		} finally {
			setLoadingSuggestions(false);
		}
	};
	useEffect(() => {
		fetchSuggestions();
	}, []);

	const handleFollowToggle = async (userId, isFollowing) => {
		try {
			setLoadingUser(userId);

			if (isFollowing) {
				await axios.delete(`/api/follows/${userId}`);
				toast.success("Unfollowed successfully");
			} else {
				await axios.post("/api/follows", { followingId: userId });
				toast.success("Followed successfully");
			}
			setSuggestions((prev) =>
				prev.map((user) =>
					user._id === userId
						? {
							...user,
							isFollowing: !isFollowing,
						}
						: user
				)
			);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setLoadingUser(null);
		}
	};

	return (
		<div className="position-sticky" style={{ top: "20px" }}>
			<PerfectScrollbar style={{ maxHeight: "85vh" }}>
				<div className="d-flex align-items-center justify-content-between mb-4">
					<Link href="/main/profile" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
						<Image
							src={`${currentUser?.image || 'https://i.pravatar.cc/100?img=10'}`}
							width={45}
							height={45}
							className="rounded-circle"
							alt="profile"
						/>
						<div>
							<div className="fw-semibold small">{currentUser?.username}</div>
							<div className="text-muted small">{currentUser?.name}</div>
						</div>
					</Link>
					<span className="text-primary small" style={{ cursor: "pointer" }}>
						Switch
					</span>
				</div>
				<div className="d-flex justify-content-between mb-3">
					<h6 className="fw-bold">Suggested for you</h6>
					<Link href="#" className="text-decoration-none small">
						See all
					</Link>
				</div>
				{loadingSuggestions ? (
					<div className="text-center py-3">
						<small className="text-muted">Loading suggestions...</small>
					</div>
				) : suggestions.length === 0 ? (
					<div
						className="text-center py-4"
					>
						<div style={{ fontSize: "40px" }}>👥</div>

						<h6 className="mt-2 mb-1">No Suggestions</h6>

						<p className="small text-muted mb-0 px-3">
							You're all caught up! We couldn't find any new people to suggest right now.
						</p>
					</div>
				) : (suggestions.map((user) => (
					<div key={user._id} className="d-flex align-items-center justify-content-between mb-3">
						<Link
							href={`/profile/${user.username}`}
							className="d-flex align-items-center gap-2 text-decoration-none text-dark"
							id={`user-${user._id}`}
							onMouseEnter={() => handleMouseEnter(user._id)}
							onMouseLeave={handleMouseLeave}
						>
							<Image
								src={user.image}
								width={40}
								height={40}
								className="rounded-circle"
								alt="user"
							/>
							<div>
								<div className="small fw-semibold">{user.name}</div>
								<div className="text-muted small">@{user.username}</div>
							</div>
						</Link>
						<Button
							size="sm"
							color={user.isFollowing ? "secondary" : "primary"}
							disabled={loadingUser === user._id}
							onClick={() =>
								handleFollowToggle(
									user._id,
									user.isFollowing
								)
							}
						>
							{loadingUser === user._id
								? "Loading..."
								: user.isFollowing
									? "Following"
									: "Follow"}
						</Button>
						<Popover
							trigger="legacy"
							placement="bottom"
							isOpen={popoverOpen === user._id}
							target={`user-${user._id}`}
						>
							<PopoverBody
								style={{ width: "260px" }}
								onMouseEnter={() => handleMouseEnter(user._id)}
								onMouseLeave={handleMouseLeave}
							>
								<div className="text-center">
									<div className="d-flex mb-3 align-items-center">
										<Image
											src={`${user?.image || 'https://i.pravatar.cc/100?img=10'}`}
											width={45}
											height={45}
											className="rounded-circle me-2"
											alt="user"
										/>
										<div className="text-start">
											<p className="mb-0 small fw-bold">{user.username}</p>
											<small className="bg-light px-2 py-1 d-inline-block mt-1">
												{user.name}
											</small>
										</div>
									</div>
									<div className="d-flex justify-content-around mb-3">
										<div>
											<strong>{user.posts}</strong>
											<div className="small text-muted">posts</div>
										</div>
										<div>
											<strong>{user.followers}</strong>
											<div className="small text-muted">followers</div>
										</div>
										<div>
											<strong>{user.following}</strong>
											<div className="small text-muted">following</div>
										</div>
									</div>
									{user.private && (
										<div className="text-center mb-2">
											<FaLock />
											<div className="small">The account is private</div>
										</div>
									)}
									{!user.private && user.postsImages && (
										<div className="d-flex gap-1 mb-3">
											{user.postsImages.slice(0, 3).map((img, i) => (
												<Image
													key={i}
													src={img}
													width={75}
													height={75}
													className="rounded"
													alt="post"
													style={{ objectFit: "cover" }}
												/>
											))}
										</div>
									)}
									<Button
										size="sm"
										color={user.isFollowing ? "secondary" : "primary"}
										disabled={loadingUser === user._id}
										onClick={() =>
											handleFollowToggle(
												user._id,
												user.isFollowing
											)
										}
									>
										{loadingUser === user._id
											? "Loading..."
											: user.isFollowing
												? "Following"
												: "Follow"}
									</Button>

								</div>
							</PopoverBody>
						</Popover>
					</div>
				)))}

			</PerfectScrollbar>

			<div className="mt-2 small  d-flex flex-wrap gap-3">
				<Link href="/about" className="">About</Link>
				<Link href="/help" className="">Help</Link>
				<Link href="/press" className="">Press</Link>
				<Link href="/api" className="">API</Link>
				<Link href="/jobs" className="">Jobs</Link>
				<Link href="/privacy" className="">Privacy</Link>
				<Link href="/terms" className="">Terms</Link>
				<Link href="/locations" className="">Locations</Link>
				<Link href="/language" className="">Language</Link>
				<Link href="/meta-verified" className="">Reelars Verified</Link>
			</div>

			<div className="small text-muted mt-3">
				© {new Date().getFullYear()} Reelars
			</div>
		</div>
	);
};

export default Rightbar;
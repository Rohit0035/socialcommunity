"use client";

import React, { useEffect, useState } from "react";

import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    Input,
    Badge,
    Button
} from "reactstrap";

import {
    FaHeart,
    FaSearch,
    FaUserPlus,
    FaCommentDots,
    FaBell,
    FaUser,
    FaUserCheck,
    FaUserTimes
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

const NotificationPage = () => {

    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const [notifications, setNotifications] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loadingUser, setLoadingUser] = useState(null);

    const fetchSuggestions = async () => {
        try {
            const response = await axios.get("/api/users/suggestions");
            setSuggestions(response.data);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get("/api/notifications");
            setNotifications(response.data);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
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

    const handleConfirmFollow = async (notificationId, userId) => {
        try {
            await axios.post("/api/follows/accept", {
                notificationId
            });

            toast.success("Follow request accepted");

            setNotifications((prev) =>
                prev.filter((n) => n._id !== notificationId)
            );
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleDeleteFollowRequest = async (notificationId) => {
        try {
            await axios.post(
                `/api/follows/reject`,
                { notificationId },
            );

            toast.success("Request deleted");

            setNotifications((prev) =>
                prev.filter((n) => n._id !== notificationId)
            );
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const filterTabs = [
        { key: "all", label: "All" },
        { key: "follow_request", label: "Follow Requests" },
        { key: "post_comment", label: "Comments" },
        { key: "post_like", label: "Likes" },
        { key: "mention", label: "Mentions" },
        { key: "reel_like", label: "Reels" },
        { key: "message", label: "Messages" },
        { key: "saved", label: "Saved" },
    ];

    // const notifications = [
    //     {
    //         id: 1,
    //         type: "likes",
    //         username: "rahul_dev",
    //         image:
    //             "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
    //         message: "liked your reel 🔥",
    //         followers: "12.5k",
    //         time: "2m ago",
    //     },

    //     {
    //         id: 2,
    //         type: "comments",
    //         username: "amit_ui",
    //         image:
    //             "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
    //         message: "commented: Awesome 👏",
    //         followers: "8.1k",
    //         time: "10m ago",
    //     },

    //     {
    //         id: 3,
    //         type: "follow",
    //         username: "social_boy",
    //         image:
    //             "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500",
    //         message: "started following you",
    //         followers: "30k",
    //         time: "20m ago",
    //     },

    //     {
    //         id: 4,
    //         type: "likes",
    //         username: "travel_world",
    //         image:
    //             "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
    //         message: "liked your post ❤️",
    //         followers: "6k",
    //         time: "1h ago",
    //     },
    // ];

    // const suggestions = [
    //     {
    //         id: 1,
    //         username: "rj_patel_777",
    //         name: "Rahul Patel",
    //         image:
    //             "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
    //         followers: "Followed by dayalupatel + 1 more",
    //     },

    //     {
    //         id: 2,
    //         username: "amit_k_vish",
    //         name: "Amit Vishwakarma",
    //         image:
    //             "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500",
    //         followers: "Followed by dayalupatel",
    //     },
    // ];

    const filteredNotifications =
        notifications.filter((item) => {
            const username =
                item.sender?.username || "";

            const searchMatch =
                username
                    .toLowerCase()
                    .includes(search.toLowerCase());

            if (activeTab === "all")
                return searchMatch;

            return (
                item.type === activeTab &&
                searchMatch
            );
        });

    return (
        <>
            <section className="bg-white min-vh-100 py-4">
                <Container>
                    <div
                        className="mb-4"
                        data-aos="fade-right"
                    >
                        <h4
                            className="fw-bold fs-3 mb-1"
                            style={{
                                color: "#111"
                            }}
                        >
                            Notifications
                        </h4>

                        <p className="text-muted mb-0">
                            Stay updated with your social activity
                        </p>
                    </div>

                    <div
                        className="position-relative mb-4"
                        data-aos="zoom-in"
                    >
                        <FaSearch
                            className="position-absolute"
                            style={{
                                left: "18px",
                                top: "18px",
                                zIndex: 2,
                                color: "#999"
                            }}
                        />

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search username or followers..."
                            className="rounded-pill shadow-none border-light ps-5"
                            style={{
                                height: "55px",
                                background: "#fafafa"
                            }}
                        />
                    </div>
                    <div
                        className="overflow-auto mb-5"
                        style={{
                            whiteSpace: "nowrap",
                            scrollbarWidth: "none"
                        }}
                    >
                        <Nav
                            pills
                            className="flex-nowrap gap-3"
                        >
                            {filterTabs.map((tab, index) => (
                                <NavItem
                                    key={tab.key}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 80}
                                >
                                    <NavLink
                                        active={activeTab === tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className="rounded-pill px-3 py-1 fw-semibold border"
                                        style={{
                                            cursor: "pointer",
                                            whiteSpace: "nowrap",
                                            background:
                                                activeTab === tab.key
                                                    ? "#00b894"
                                                    : "#fff",
                                            color:
                                                activeTab === tab.key
                                                    ? "#fff"
                                                    : "#222",
                                            borderColor:
                                                activeTab === tab.key
                                                    ? "transparent"
                                                    : "#e5e7eb",
                                            minWidth: "fit-content",
                                            transition: "0.3s"
                                        }}
                                    >
                                        {tab.label}
                                    </NavLink>
                                </NavItem>
                            ))}

                        </Nav>

                    </div>

                    {/* this for no activity show  */}
                    {/* <div
                        className="text-center py-5 mb-5"
                        data-aos="zoom-in"
                    >

                        <div
                            className="rounded-circle border border-2 d-flex align-items-center justify-content-center mx-auto mb-2"
                            style={{
                                width: "70px",
                                height: "70px",
                                borderColor: "#111"
                            }}
                        >
                            <FaHeart
                                style={{
                                    fontSize: "24px",
                                    color: "#ff3040"
                                }}
                            />
                        </div>

                        <h4 className="fw-bold mb-2">
                            Activity On Your Posts
                        </h4>

                        <p
                            className="text-muted mx-auto"
                            style={{
                                maxWidth: "650px",
                                fontSize: "18px",
                                lineHeight: "1.8"
                            }}
                        >
                            When someone likes or comments on one of your posts,
                            you'll see it here.
                        </p>

                    </div> */}

                    <div className="mb-5">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h5 className="fw-bold mb-0">
                                Recent Activity
                            </h5>

                            <Badge
                                pill
                                color="success"
                                className="px-3 py-2"
                            >
                                {filteredNotifications.length} New
                            </Badge>
                        </div>

                        {filteredNotifications.map((item, index) => (

                            <div
                                key={item._id}
                                className={`d-flex align-items-center justify-content-between gap-3 p-3 rounded-4 mb-3 ${!item.isRead
                                    ? "border border-success-subtle"
                                    : ""
                                    }`}
                                style={{
                                    background: item.isRead
                                        ? "#fafafa"
                                        : "#f0fff8",
                                }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={
                                            item.sender?.image ||
                                            "/images/user.png"
                                        }
                                        alt=""
                                        className="rounded-circle"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div>
                                        <div className="fw-bold">
                                            {item.sender?.username || item.sender?.name}
                                        </div>

                                        <div className="text-muted">
                                            <span>
                                                {item.actionText}
                                            </span>
                                        </div>

                                        <small className="text-secondary">
                                            {formatDistanceToNow(item.createdAt)}
                                        </small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-3">
                                    {item.previewImage && (
                                        <img
                                            src={item.previewImage}
                                            alt=""
                                            style={{
                                                width: 55,
                                                height: 55,
                                                borderRadius: 12,
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}

                                    {item.type.includes("like") && (
                                        <FaHeart
                                            style={{
                                                color: "#ff3040",
                                                fontSize: 22,
                                            }}
                                        />
                                    )}

                                    {item.type.includes("comment") && (
                                        <FaCommentDots
                                            style={{
                                                color: "#00b894",
                                                fontSize: 22,
                                            }}
                                        />
                                    )}

                                    {item.type === "follow_request" && (
                                        <div className="d-flex gap-2">
                                            <Button
                                                color="primary"
                                                size="sm"
                                                onClick={() =>
                                                    handleConfirmFollow(
                                                        item._id,
                                                        item.sender._id
                                                    )
                                                }
                                            >
                                                Confirm
                                            </Button>

                                            <Button
                                                color="light"
                                                size="sm"
                                                className="border"
                                                onClick={() =>
                                                    handleDeleteFollowRequest(
                                                        item._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    )}

                                    {item.type === "follow_accepted" && (
                                        <FaUserCheck
                                            style={{
                                                color: "#00b894",
                                                fontSize: 22,
                                            }}
                                        />
                                    )}
                                    {item.type === "follow_rejected" && (
                                        <FaUserTimes
                                            style={{
                                                color: "#e17055",
                                                fontSize: 22,
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h5 className="fw-bold mb-0">
                                Suggested for you
                            </h5>
                        </div>
                        <Row>
                            {suggestions.map((item, index) => (
                                <Col
                                    lg="6"
                                    key={item._id}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 120}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-between p-3 p-lg-4 rounded-4  mb-4"
                                        style={{
                                            background: "#fafafa",
                                            borderColor: "#f0f0f0"
                                        }}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt="user"
                                                className="rounded-circle"
                                                style={{
                                                    width: "75px",
                                                    height: "75px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <div>
                                                <h6 className="fw-bold mb-1">
                                                    {item.username}
                                                </h6>

                                                <div className="text-dark fw-semibold">
                                                    {item.name}
                                                </div>

                                                <small className="text-muted">
                                                    Followers: {item.followers}
                                                </small>
                                            </div>
                                        </div>

                                        <Button
                                            className="border-0 rounded-3 fw-bold  btn btn-primary btn-sm"
                                            color={item.isFollowing ? "secondary" : "primary"}
                                            disabled={loadingUser === item._id}
                                            onClick={() => handleFollowToggle(item._id, item.isFollowing)}
                                        >
                                            {loadingUser === item._id
                                                ? "Loading..."
                                                : item.isFollowing
                                                    ? "Following"
                                                    : "Follow"}
                                        </Button>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default NotificationPage;
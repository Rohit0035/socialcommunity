"use client";

import React, { useState } from "react";

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
    FaBell
} from "react-icons/fa";

const NotificationPage = () => {

    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const filterTabs = [
        { key: "all", label: "All" },
        { key: "follow", label: "People you follow" },
        { key: "comments", label: "Comments" },
        { key: "likes", label: "Likes" },
        { key: "mentions", label: "Mentions" },
        { key: "reels", label: "Reels" },
        { key: "messages", label: "Messages" },
        { key: "saved", label: "Saved" },
    ];

    const notifications = [
        {
            id: 1,
            type: "likes",
            username: "rahul_dev",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
            message: "liked your reel 🔥",
            followers: "12.5k",
            time: "2m ago",
        },

        {
            id: 2,
            type: "comments",
            username: "amit_ui",
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
            message: "commented: Awesome 👏",
            followers: "8.1k",
            time: "10m ago",
        },

        {
            id: 3,
            type: "follow",
            username: "social_boy",
            image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500",
            message: "started following you",
            followers: "30k",
            time: "20m ago",
        },

        {
            id: 4,
            type: "likes",
            username: "travel_world",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
            message: "liked your post ❤️",
            followers: "6k",
            time: "1h ago",
        },
    ];

    const suggestions = [
        {
            id: 1,
            username: "rj_patel_777",
            name: "Rahul Patel",
            image:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500",
            followers: "Followed by dayalupatel + 1 more",
        },

        {
            id: 2,
            username: "amit_k_vish",
            name: "Amit Vishwakarma",
            image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500",
            followers: "Followed by dayalupatel",
        },
    ];

    const filteredNotifications = notifications.filter((item) => {

        const searchMatch =
            item.username.toLowerCase().includes(search.toLowerCase()) ||
            item.followers.toLowerCase().includes(search.toLowerCase());

        if (activeTab === "all") return searchMatch;

        return item.type === activeTab && searchMatch;
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
                                key={item.id}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3 p-lg-4 rounded-4  mb-3"
                                style={{
                                    background: "#fafafa",
                                    borderColor: "#f1f1f1"
                                }}
                            >

                                <div className="d-flex align-items-center gap-3">

                                    <img
                                        src={item.image}
                                        alt="user"
                                        className="rounded-circle"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div>

                                        <div className="d-flex align-items-center gap-2 flex-wrap">

                                            <h6 className="fw-bold mb-0">
                                                {item.username}
                                            </h6>

                                            <Badge
                                                pill
                                                color="info"
                                                className="px-3 py-1"
                                               
                                            >
                                                {item.followers}
                                            </Badge>

                                        </div>

                                        <p className="text-muted mb-1 mt-1">
                                            {item.message}
                                        </p>

                                        <small className="text-secondary">
                                            {item.time}
                                        </small>

                                    </div>

                                </div>

                                <div>

                                    {item.type === "likes" && (
                                        <FaHeart
                                            style={{
                                                color: "#ff3040",
                                                fontSize: "24px"
                                            }}
                                        />
                                    )}

                                    {item.type === "comments" && (
                                        <FaCommentDots
                                            style={{
                                                color: "#00b894",
                                                fontSize: "24px"
                                            }}
                                        />
                                    )}

                                    {item.type === "follow" && (
                                        <FaUserPlus
                                            style={{
                                                color: "#00b894",
                                                fontSize: "24px"
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
                                    key={item.id}
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
                                                    {item.followers}
                                                </small>

                                            </div>

                                        </div>

                                        <Button
                                            className="border-0 rounded-3 fw-bold  btn btn-primary btn-sm"
                                        >
                                            Follow
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
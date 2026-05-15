"use client";

import React, { useMemo, useState } from "react";

import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Badge,
} from "reactstrap";

import {
    FaBullhorn,
    FaPlus,
    FaCreditCard,
    FaArrowRight,
} from "react-icons/fa";

const ManageAds = () => {
    // =========================
    // Dummy Data
    // =========================
    const adsData = [
        {
            id: 1,
            title: "Summer Fashion Sale",
            status: "Active",
            goal: "Website visits",
            views: 12450,
            budget: "$120",
        },
        {
            id: 2,
            title: "Black Friday Campaign",
            status: "Paused",
            goal: "Purchases",
            views: 8520,
            budget: "$300",
        },
        {
            id: 3,
            title: "Brand Awareness",
            status: "Completed",
            goal: "Profile visits",
            views: 20200,
            budget: "$450",
        },
        {
            id: 4,
            title: "DM Promotion",
            status: "Drafts",
            goal: "Messages",
            views: 1500,
            budget: "$80",
        },
        {
            id: 5,
            title: "Retargeting Ad",
            status: "Not delivering",
            goal: "Purchases",
            views: 3200,
            budget: "$150",
        },
    ];


    const [sortOpen, setSortOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const [goalOpen, setGoalOpen] = useState(false);


    const [sortBy, setSortBy] = useState("Most recent");
    const [statusFilter, setStatusFilter] =
        useState("All");
    const [goalFilter, setGoalFilter] =
        useState("All");


    const filteredAds = useMemo(() => {
        let data = [...adsData];

        if (statusFilter !== "All") {
            data = data.filter(
                (item) => item.status === statusFilter
            );
        }

        if (goalFilter !== "All") {
            data = data.filter(
                (item) => item.goal === goalFilter
            );
        }

        if (sortBy === "Most views") {
            data.sort((a, b) => b.views - a.views);
        }

        return data;
    }, [sortBy, statusFilter, goalFilter]);


    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "success";
            case "Paused":
                return "warning";
            case "Completed":
                return "primary";
            case "Drafts":
                return "secondary";
            case "Not delivering":
                return "danger";
            default:
                return "dark";
        }
    };

    return (
        <Row className="g-4">
            <Col lg="8">
                <Card className="border-0 shadow-sm rounded-4 h-100">
                    <CardBody className="p-4">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
                            <div>
                                <h4 className="fw-bold mb-1">
                                    Manage Ads
                                </h4>

                                <p className="text-muted mb-0">
                                    Monitor and optimize your campaigns
                                </p>
                            </div>

                            <div className="d-flex gap-2 flex-wrap w-100 w-md-auto">
                                <Dropdown
                                    isOpen={sortOpen}
                                    toggle={() =>
                                        setSortOpen(!sortOpen)
                                    }
                                >
                                    <DropdownToggle
                                        caret
                                        color="light"
                                        className="rounded-pill px-3 border w-100"
                                    >
                                        {sortBy}
                                    </DropdownToggle>

                                    <DropdownMenu className="border-0 shadow rounded-4 p-2">
                                        <div className="px-2 pb-2">
                                            <Input
                                                type="text"
                                                placeholder="Sort by"
                                                className="rounded-3"
                                            />
                                        </div>

                                        <DropdownItem
                                            active={
                                                sortBy === "Most recent"
                                            }
                                            onClick={() =>
                                                setSortBy("Most recent")
                                            }
                                        >
                                            Most recent
                                        </DropdownItem>

                                        <DropdownItem
                                            active={
                                                sortBy === "Most views"
                                            }
                                            onClick={() =>
                                                setSortBy("Most views")
                                            }
                                        >
                                            Most views
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                {/* STATUS */}
                                <Dropdown
                                    isOpen={statusOpen}
                                    toggle={() =>
                                        setStatusOpen(!statusOpen)
                                    }
                                >
                                    <DropdownToggle
                                        caret
                                        color="light"
                                        className="rounded-pill px-3 border w-100"
                                    >
                                        {statusFilter}
                                    </DropdownToggle>

                                    <DropdownMenu className="border-0 shadow rounded-4 p-2">
                                        <div className="px-2 pb-2">
                                            <Input
                                                type="text"
                                                placeholder="Filter by status"
                                                className="rounded-3"
                                            />
                                        </div>

                                        {[
                                            "All",
                                            "Active",
                                            "Paused",
                                            "Completed",
                                            "Drafts",
                                            "Not delivering",
                                        ].map((item) => (
                                            <DropdownItem
                                                key={item}
                                                active={
                                                    statusFilter === item
                                                }
                                                onClick={() =>
                                                    setStatusFilter(item)
                                                }
                                            >
                                                {item}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown
                                    isOpen={goalOpen}
                                    toggle={() =>
                                        setGoalOpen(!goalOpen)
                                    }
                                >
                                    <DropdownToggle
                                        caret
                                        color="light"
                                        className="rounded-pill px-3 border w-100"
                                    >
                                        {goalFilter}
                                    </DropdownToggle>

                                    <DropdownMenu className="border-0 shadow rounded-4 p-2">
                                        <div className="px-2 pb-2">
                                            <Input
                                                type="text"
                                                placeholder="Filter by goal"
                                                className="rounded-3"
                                            />
                                        </div>

                                        {[
                                            "All",
                                            "Profile visits",
                                            "Website visits",
                                            "Purchases",
                                            "Messages",
                                        ].map((item) => (
                                            <DropdownItem
                                                key={item}
                                                active={
                                                    goalFilter === item
                                                }
                                                onClick={() =>
                                                    setGoalFilter(item)
                                                }
                                            >
                                                {item}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        {filteredAds.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                                {filteredAds.map((ad) => (
                                    <Card
                                        key={ad.id}
                                        className="border-0 bg-light rounded-4"
                                    >
                                        <CardBody className="p-3">
                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div
                                                        className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "55px",
                                                            height: "55px",
                                                        }}
                                                    >
                                                        <FaBullhorn className="text-primary" />
                                                    </div>

                                                    <div>
                                                        <h6 className="fw-bold mb-1">
                                                            {ad.title}
                                                        </h6>

                                                        <div className="d-flex gap-2 flex-wrap">
                                                            <Badge
                                                                color={getStatusColor(
                                                                    ad.status
                                                                )}
                                                                pill
                                                            >
                                                                {ad.status}
                                                            </Badge>

                                                            <Badge
                                                                color="light"
                                                                text="dark"
                                                                pill
                                                            >
                                                                {ad.goal}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-md-end">
                                                    <h6 className="fw-bold mb-1">
                                                        {ad.views.toLocaleString()}{" "}
                                                        views
                                                    </h6>

                                                    <small className="text-muted">
                                                        Budget: {ad.budget}
                                                    </small>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="d-flex flex-column justify-content-center align-items-center text-center rounded-4 bg-light"
                                style={{
                                    minHeight: "420px",
                                }}
                            >
                                <div
                                    className="bg-white shadow-sm rounded-circle d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                    }}
                                >
                                    <FaBullhorn
                                        size={34}
                                        className="text-primary"
                                    />
                                </div>

                                <h4 className="fw-bold mb-2">
                                    No ads available
                                </h4>

                                <p className="text-muted mb-4">
                                    No ads matched your filters
                                </p>

                                <Button
                                    color="primary"
                                    size="lg"
                                    className="rounded-pill px-5"
                                >
                                    <FaPlus className="me-2" />
                                    Create New Ad
                                </Button>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </Col>
            <Col lg="4">
                <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
                    <div
                        style={{
                            height: "120px",
                            background:
                                "linear-gradient(135deg,#6C63FF,#4F46E5)",
                        }}
                    />

                    <CardBody className="p-4">
                        <small className="text-primary fw-semibold">
                            CREATE YOUR NEXT AD
                        </small>

                        <h4 className="fw-bold mt-2 mb-3">
                            Reach more people with premium
                            campaigns
                        </h4>

                        <p className="text-muted mb-4">
                            Boost engagement, grow followers,
                            and increase conversions using
                            advanced ad tools.
                        </p>

                        <Button
                            color="primary"
                            className="w-100 rounded-4 py-3 fw-semibold"
                        >
                            <FaPlus className="me-2" />
                            Create Ad
                        </Button>
                    </CardBody>
                </Card>

                <Card className="border-0 shadow-sm rounded-4">
                    <CardBody className="p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "55px",
                                        height: "55px",
                                    }}
                                >
                                    <FaCreditCard className="text-primary" />
                                </div>

                                <div>
                                    <h6 className="fw-bold mb-1">
                                        Billing & Payments
                                    </h6>

                                    <small className="text-muted">
                                        Manage subscriptions
                                    </small>
                                </div>
                            </div>

                            <FaArrowRight className="text-muted" />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ManageAds;
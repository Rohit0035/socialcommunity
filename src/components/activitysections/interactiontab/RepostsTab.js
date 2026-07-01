"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Row, Col, Button, Input } from "reactstrap";
import { FiVideo, FiCopy } from "react-icons/fi";
import axios from "axios";

const RepostsTab = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [posts, setPosts] = useState([
        {
            id: 1,
            type: "image",
            src: "https://picsum.photos/500/500?random=1",
        },
        {
            id: 2,
            type: "image",
            src: "https://picsum.photos/500/500?random=2",
        },
        {
            id: 3,
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
            id: 4,
            type: "image",
            src: "https://picsum.photos/500/500?random=3",
        },
    ]);

    const [reposts, setReposts] = useState([]);

    const currentData =
        activeTab === "posts" ? posts : reposts;

        const fetchReposts = async () => {
                try {
                    const response = await axios.get(
                        "/api/your-activity/reposts"
                    );
        
                    setReposts(response.data.stats);
                } catch (error) {
                    toast.error("Something went wrong");
                    console.error(error);
                }
            };
        
            useEffect(() => {
                fetchReposts();
            }, []);

    const toggleSelectionMode = () => {
        setSelectionMode(!selectionMode);
        setSelectedItems([]);
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handlePostAgain = () => {
        const selectedPosts = posts.filter((item) =>
            selectedItems.includes(item.id)
        );

        setReposts((prev) => [
            ...selectedPosts,
            ...prev,
        ]);

        setPosts((prev) =>
            prev.filter(
                (item) =>
                    !selectedItems.includes(item.id)
            )
        );

        setSelectedItems([]);
        setSelectionMode(false);
        setActiveTab("reposts");
    };

    const handleDelete = () => {
        if (activeTab === "posts") {
            setPosts((prev) =>
                prev.filter(
                    (item) =>
                        !selectedItems.includes(item.id)
                )
            );
        } else {
            setReposts((prev) =>
                prev.filter(
                    (item) =>
                        !selectedItems.includes(item.id)
                )
            );
        }

        setSelectedItems([]);
        setSelectionMode(false);
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    <Button
                        color={
                            activeTab === "posts"
                                ? "primary"
                                : "light"
                        }
                        className="btn-sm"
                        onClick={() =>
                            setActiveTab("posts")
                        }
                    >
                        Posts ({posts.length})
                    </Button>

                    <Button
                        color={
                            activeTab === "reposts"
                                ? "primary"
                                : "light"
                        }
                        className="btn-sm"
                        onClick={() =>
                            setActiveTab("reposts")
                        }
                    >
                        Reposts ({reposts.length})
                    </Button>
                </div>

                {!selectionMode ? (
                    <Button
                        color="primary"
                        onClick={
                            toggleSelectionMode
                        }
                        className="btn-sm"
                    >
                        Select
                    </Button>
                ) : (
                    <div className="d-flex gap-2">
                        {activeTab ===
                            "posts" &&
                            selectedItems.length >
                                0 && (
                                <Button
                                    color="success"
                                    onClick={
                                        handlePostAgain
                                    }
                                >
                                    Post Again
                                </Button>
                            )}

                        {selectedItems.length >
                            0 && (
                            <Button
                                color="danger"
                                onClick={
                                    handleDelete
                                }
                            >
                                Delete
                            </Button>
                        )}

                        <Button
                            color="secondary"
                            onClick={
                                toggleSelectionMode
                            }
                        >
                            Cancel
                        </Button>
                    </div>
                )}
            </div>

            {currentData.length === 0 ? (
                <div className="text-center py-5">
                    <h4>
                        No{" "}
                        {activeTab ===
                        "posts"
                            ? "Posts"
                            : "Reposts"}
                    </h4>

                    <p className="text-muted">
                        {activeTab ===
                        "posts"
                            ? "Your posts will appear here."
                            : "Items moved using Post Again will appear here."}
                    </p>
                </div>
            ) : (
                <Row className="g-2">
                    {currentData.map((item) => (
                        <Col
                            xs="6"
                            md="4"
                            lg="3"
                            key={item.id}
                        >
                            <div
                                className="position-relative overflow-hidden rounded border"
                                style={{
                                    aspectRatio:
                                        "1 / 1",
                                }}
                            >
                                {selectionMode && (
                                    <div className="position-absolute top-0 start-0 p-2 z-3">
                                        <Input
                                            type="checkbox"
                                            checked={selectedItems.includes(
                                                item.id
                                            )}
                                            onChange={() =>
                                                handleSelectItem(
                                                    item.id
                                                )
                                            }
                                        />
                                    </div>
                                )}

                                <div className="position-absolute top-0 end-0 p-2 text-white z-3">
                                    {item.type ===
                                    "video" ? (
                                        <FiVideo
                                            size={
                                                18
                                            }
                                        />
                                    ) : (
                                        <FiCopy
                                            size={
                                                18
                                            }
                                        />
                                    )}
                                </div>

                                {item.type ===
                                "image" ? (
                                    <Image
                                        src={
                                            item.src
                                        }
                                        alt=""
                                        fill
                                        unoptimized
                                        style={{
                                            objectFit:
                                                "cover",
                                        }}
                                    />
                                ) : (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-100 h-100"
                                        style={{
                                            objectFit:
                                                "cover",
                                        }}
                                    >
                                        <source
                                            src={
                                                item.src
                                            }
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default RepostsTab;
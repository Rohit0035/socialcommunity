"use client";

import { useRef, useState } from "react";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
import Stories from "react-insta-stories";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const StoryViewer = ({ stories, startIndex, onClose }) => {
    const [userIndex, setUserIndex] = useState(startIndex);

    const currentUser = stories[userIndex];

    /* 🔄 AUTO NEXT USER */
    const handleAllEnd = () => {
        if (userIndex < stories.length - 1) {
            setUserIndex(userIndex + 1);
        } else {
            onClose();
        }
    };

    const viewedStories = useRef(new Set());

    const handleStoryStart = async (storyIndex) => {
        const story =
            currentUser?.stories?.[storyIndex];

        if (!story?.id) return;

        // Own stories
        if (currentUser.isMine) return;

        // Already viewed
        if (story.viewed) return;

        if (viewedStories.current.has(story.id))
            return;

        viewedStories.current.add(story.id);

        try {
            await axios.post(
                "/api/stories/view",
                {
                    storyId: story.id,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal isOpen toggle={onClose} fullscreen>
            <ModalBody className="p-0 bg-dark">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="story-wrapper">

                                {/* 📦 CENTER BOX */}
                                <div className="story-container">

                                    {/* 🔝 HEADER */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            zIndex: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px"
                                        }}
                                    >
                                        <Image
                                            src={currentUser.avatar}
                                            width={30}
                                            height={30}
                                            className="rounded-circle"
                                            alt=""
                                        />
                                        <span className="text-white small fw-bold">
                                            {currentUser.user}
                                        </span>
                                    </div>

                                    {/* ❌ CLOSE */}
                                    <FaTimes
                                        onClick={onClose}
                                        style={{
                                            position: "absolute",
                                            top: 15,
                                            right: 15,
                                            zIndex: 99999,
                                            color: "#fff",
                                            cursor: "pointer"
                                        }}
                                    />

                                    {/* 🔥 STORIES */}
                                    <Stories
                                        key={userIndex}
                                        stories={currentUser.stories.map(
                                            (item) => ({
                                                url: item.url,
                                                type:
                                                    item.type || "image",
                                            })
                                        )}
                                        defaultInterval={3000}
                                        width="100%"
                                        height="100%"
                                        keyboardNavigation
                                        onAllStoriesEnd={handleAllEnd}
                                        onStoryStart={handleStoryStart}
                                    />

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    );
};

export default StoryViewer;
"use client";

import { useState } from "react";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";
import Stories from "react-insta-stories";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

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
                                        stories={currentUser.stories.map((item) => ({
                                            url: item.url,
                                            type: item.type || "image"
                                        }))}
                                        defaultInterval={3000}
                                        width="100%"
                                        height="100%"
                                        onAllStoriesEnd={handleAllEnd}
                                        keyboardNavigation
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
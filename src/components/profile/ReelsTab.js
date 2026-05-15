"use client";

import React, { useState, useRef } from "react";
import {
    Modal,
    ModalBody,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
} from "reactstrap";
import { FaHeart, FaRegHeart, FaCommentDots } from "react-icons/fa";
import { FiSend, FiVideo } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const ReelsTab = () => {
    const fileInputRef = useRef(null);

    const [reels, setReels] = useState([
        "/video/mov_bbb.mp4",
        "/video/mov_bbb.mp4",
    ]);

    const [selected, setSelected] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [modal, setModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState("");
    const [liked, setLiked] = useState(false);

    const [postModal, setPostModal] = useState(false);
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState("");

    // OPEN VIEWER
    const openModal = (video) => {
        setCurrentVideo(video);
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
        setCurrentVideo("");
    };

    // ADD VIDEO
    const handleAddClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newVideo = URL.createObjectURL(file);
        setReels([newVideo, ...reels]);
    };

    // SELECT
    const toggleSelect = (i) => {
        setSelected((prev) =>
            prev.includes(i)
                ? prev.filter((id) => id !== i)
                : [...prev, i]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === reels.length) {
            setSelected([]);
        } else {
            setSelected(reels.map((_, i) => i));
        }
    };

    // DELETE
    const handleDelete = () => {
        const newReels = reels.filter((_, i) => !selected.includes(i));
        setReels(newReels);
        setSelected([]);
    };

    // POST
    const handlePost = () => {
        if (!caption.trim()) {
            alert("Caption required");
            return;
        }

        console.log("Post Reels:", {
            reels: selected,
            caption,
            tags,
        });

        setPostModal(false);
        setCaption("");
        setTags("");
        setSelected([]);
    };

    // SHARE
    const handleShare = async () => {
        try {
            await navigator.share({
                title: "Check this reel",
                url: window.location.href,
            });
        } catch { }
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={handleSelectAll} className="btn btn-dark">
                    {selected.length === reels.length ? "Unselect All" : "Select All"}
                </Button>

                <Dropdown
                    isOpen={dropdownOpen}
                    toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret color="dark">Actions</DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem onClick={handleDelete}>Delete</DropdownItem>
                        <DropdownItem onClick={() => setPostModal(true)}>
                            Post
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="row">
                <div className="col-6 col-md-4 col-lg-3 mb-3">
                    <div
                        onClick={handleAddClick}
                        style={{
                            width: "100%",
                            aspectRatio: "9/16",
                            border: "2px dashed #ccc",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            background: "#fafafa",
                        }}
                    >
                        <FiVideo size={30} />
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        accept="video/*"
                        onChange={handleFileChange}
                    />
                </div>
                {reels.map((video, i) => (
                    <div className="col-6 col-md-4 col-lg-3 mb-3" key={i}>
                        <div style={{ position: "relative" }}>
                            <input
                                type="checkbox"
                                checked={selected.includes(i)}
                                onChange={() => toggleSelect(i)}
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    left: "8px",
                                    zIndex: 2,
                                    width: "18px",
                                    height: "18px",
                                }}
                            />

                            <video
                                src={video}
                                muted
                                autoPlay
                                loop
                                onClick={() => openModal(video)}
                                style={{
                                    width: "100%",
                                    aspectRatio: "9/16",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    border: selected.includes(i)
                                        ? "3px solid #007bff"
                                        : "none",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={modal} toggle={closeModal} centered size="md">
                <ModalBody className="p-0 d-flex justify-content-center bg-black">
                    <div
                        style={{
                            position: "relative",
                            height: "80vh",
                            aspectRatio: "9/16",
                            background: "#000",
                            borderRadius: "12px",
                            overflow: "hidden",
                        }}
                    >
                        {currentVideo && (
                            <video
                                src={currentVideo}
                                autoPlay
                                loop
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                        <div
                            style={{
                                position: "absolute",
                                right: "10px",
                                bottom: "80px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                alignItems: "center",
                            }}
                        >
                            <div onClick={() => setLiked(!liked)}>
                                {liked ? (
                                    <FaHeart size={24} color="red" />
                                ) : (
                                    <FaRegHeart size={24} color="white" />
                                )}
                            </div>

                            <FaCommentDots size={22} color="white" />

                            <div onClick={handleShare}>
                                <FiSend size={22} color="white" />
                            </div>
                        </div>

                        <div
                            onClick={closeModal}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                cursor: "pointer",
                            }}
                        >
                            <IoClose size={26} color="white" />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={postModal} toggle={() => setPostModal(false)} centered>
                <ModalBody>
                    <h5>Create Reel Post</h5>

                    <Input
                        placeholder="Caption..."
                        type="textarea"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />

                    <Input
                        type="text"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />

                    <Button color="primary" onClick={handlePost}>
                        Post
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ReelsTab;
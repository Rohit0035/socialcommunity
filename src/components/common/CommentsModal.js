"use client";

import React, { useState } from "react";
import { Modal, ModalBody, Input, Button, Spinner, Row, Col } from "reactstrap";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "react-perfect-scrollbar/dist/css/styles.css";

import PerfectScrollbar from "react-perfect-scrollbar";
import EmojiPicker from "emoji-picker-react";
import ShareModal from "./ShareModal";
import NotInterestedModal from "./NotInterestedModal";
import ConfirmationModal from "./ConfirmationModal";
import ReportAdsModal from "./ReportAdsModal";
import ReportConfirmModal from "./ReportConfirmModal";

import {
    FaHeart,
    FaRegHeart,
    FaRegComment,
    FaPaperPlane,
    FaEllipsisH,
    FaRegBookmark,
    FaBookmark,
    FaSmile,
    FaTimes
} from "react-icons/fa";
import axios from "axios";

const CommentsModal = ({ isOpen, commentToggleMd, post, toggleLike, loadingLike, toggleSave, loadingSave }) => {
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState(post?.comments || []);
    const [loading, setLoading] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [notInterestedOpen, setNotInterestedOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [reportConfirmOpen, setReportConfirmOpen] = useState(false);

    const addEmoji = (emoji) => {
        setComment((prev) => prev + emoji.emoji);
    };

    // ✅ POST COMMENT FUNCTION
    const handlePost = async () => {
        if (!comment.trim()) return;

        try {
            setLoading(true);

            const res = await axios.post(
            `/api/posts/comment`,
                {
                    text: comment,
                    postId: post._id
                }
            );

            if (res.data.success) {
                setCommentsList((prev) => [
                    ...prev,
                    res.data.comment,
                ]);

                setComment("");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

    const handleReasonSelect = (reason) => {
        console.log("Selected:", reason);

        setNotInterestedOpen(false);

        setTimeout(() => {
            setConfirmOpen(true);
        }, 300);
    };

    const handleReportSelect = (reason) => {
        console.log("Report Reason:", reason);

        setReportOpen(false);

        setTimeout(() => {
            setReportConfirmOpen(true);
        }, 300);
    };

    return (
        <>
            {/* MAIN MODAL */}
            <Modal isOpen={isOpen} toggle={commentToggleMd} size="xl" centered>
                <ModalBody className="p-0 d-flex position-relative rounded-5" style={{ height: "600px" }}>

                    {/* CLOSE BUTTON */}
                    {/* <FaTimes
            size={20}
            onClick={commentToggleMd}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              zIndex: 10
            }}
          /> */}
                    {/* LEFT MEDIA */}
                    <div className="w-50 bg-dark">
                        {post?.mediaType === "image" ? (
                            <img
                                src={post?.media}
                                alt="post"
                                className="w-100 h-100"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <video
                                src={post?.media}
                                controls
                                autoPlay
                                className="w-100 h-100"
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-50 d-flex flex-column">

                        {/* HEADER */}
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                            <div className="d-flex align-items-center gap-2">
                                <img src={post?.user?.avatar} width="40" className="rounded-circle" />
                                <strong>{post?.user?.username}</strong>
                            </div>

                            {/* 3 DOT MENU */}
                            <FaEllipsisH
                                style={{ cursor: "pointer" }}
                                onClick={() => setMenuOpen(true)}
                            />
                        </div>

                        {/* COMMENTS */}
                        <PerfectScrollbar className="flex-grow-1 p-3">
                            <p>
                                <strong>{post?.user?.username}</strong> {post?.caption}
                            </p>

                            {commentsList.map((c, i) => (
                                <p key={i}>
                                    <strong>{c.user?.username}</strong> {c.text}
                                </p>
                            ))}
                        </PerfectScrollbar>

                        {/* ACTIONS */}
                        <div className="p-3 border-top">

                            <div className="d-flex justify-content-between mb-2">
                                <div className="d-flex gap-3">

                                    <span onClick={() => toggleLike()} style={{ cursor: "pointer" }}>
                                        {loadingLike ? (
                                            <Spinner size="sm" />
                                        ) : post.isLiked ? (
                                            <FaHeart color="red" />
                                        ) : (
                                            <FaRegHeart />
                                        )}
                                    </span>

                                    <Link href="#" className="text-dark">
                                        <FaRegComment size={18} />
                                    </Link>

                                    <Link href="#" className="text-dark" onClick={() => setShareOpen(true)}>
                                        <FaPaperPlane size={18} />
                                    </Link>
                                </div>

                                <span onClick={() => toggleSave()} style={{ cursor: "pointer" }}>
                                    {loadingSave ? (
                                        <Spinner size="sm" />
                                    ) : post.isSaved ? (
                                        <FaBookmark />
                                    ) : (
                                        <FaRegBookmark />
                                    )}
                                </span>
                            </div>

                            <p className="small"><strong>{post?.likesCount} likes</strong></p>
                            <p className="text-muted small">{post?.date}</p>

                            {/* COMMENT INPUT */}
                            <div className="d-flex align-items-center gap-2 border-top pt-2">
                                <FaSmile size={22} onClick={() => setShowEmoji(!showEmoji)} style={{ cursor: "pointer" }} />

                                <Input
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="border-0"
                                />

                                <Button color="link" onClick={handlePost} disabled={loading} className="text-decoration-none fw-bold ">
                                    {loading ? <Spinner size="sm" /> : "Post"}
                                </Button>
                            </div>

                            {showEmoji && (
                                <div style={{ position: "absolute", bottom: "70px" }}>
                                    <EmojiPicker onEmojiClick={addEmoji} />
                                </div>
                            )}

                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* ✅ INSTAGRAM STYLE MENU MODAL */}
            <Modal isOpen={menuOpen} toggle={() => setMenuOpen(false)} centered>
                <ModalBody className="p-0 text-center small">
                    <Link href="#" onClick={() => {
                        setMenuOpen(false);
                        setNotInterestedOpen(true);
                    }} className="d-block border-bottom p-3 text-dark">
                        Not interested
                    </Link>

                    <Link href="#" onClick={() => {
                        setMenuOpen(false);
                        setReportOpen(true);
                    }} className="d-block border-bottom p-3 text-dark">
                        Report
                    </Link>

                    <Link href="#" className="d-block border-bottom p-3 text-dark">
                        Why you're seeing this ad
                    </Link>

                    <Link href="#" className="d-block border-bottom p-3 text-dark">
                        About Instagram Ads
                    </Link>

                    <div
                        className="p-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Cancel
                    </div>

                </ModalBody>
            </Modal>

            {/* share modla */}
            <ShareModal isOpen={shareOpen} toggle={() => setShareOpen(!shareOpen)} />

            {/* notintrested modal */}
            <NotInterestedModal
                isOpen={notInterestedOpen}
                toggle={() => setNotInterestedOpen(false)}
                onSelect={handleReasonSelect}
            />
            {/* confirmation  modal */}
            <ConfirmationModal
                isOpen={confirmOpen}
                toggle={() => setConfirmOpen(false)}
            />

            {/* report modal */}
            <ReportAdsModal
                isOpen={reportOpen}
                toggle={() => setReportOpen(false)}
                onSelect={handleReportSelect}
            />

            <ReportConfirmModal
                isOpen={reportConfirmOpen}
                toggle={() => setReportConfirmOpen(false)}
            />
        </>
    );
};

export default CommentsModal;
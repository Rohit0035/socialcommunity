"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  UncontrolledPopover,
  PopoverBody,
  Button,
  Container,
  Row,
  Spinner
} from "reactstrap";

import {
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
  FaShare
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { BsFillSendFill } from "react-icons/bs";
import CommentsModal from "./common/CommentsModal";
import ShareModal from "./common/ShareModal";
import axios from "axios";
import toast from "react-hot-toast";

const Post = ({ post,setPosts }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const [liked, setLiked] = useState(
  //   post.isLiked || false
  // );

  // const [saved, setSaved] = useState(
  //   post.isSaved || false
  // );

  // const [likes, setLikes] = useState(
  //   post.likesCount || 0
  // );

  // const [comments] = useState(
  //   post.commentsCount || 0
  // );

  const [expanded, setExpanded] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const commentToggleMd = () => {
    setCommentModal(!commentModal);
  };

  const toggleLike = async () => {
    try {
      setLoadingLike(true);
      const res = await axios.post(
        "/api/posts/toggle-like",
        {
          postId: post._id,
        }
      );

      if (res.data.success) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p._id === post._id) {
              return {
                ...p,
                isLiked: res.data.liked,
                likesCount: res.data.likesCount,
              };
            }
            return p;
          })
        );
        if (res.data.liked) {
          toast.success("Post liked successfully");
        } else {
          toast.success("Post unliked successfully");
        }

      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLike(false);
    }
  };

  const toggleSave = async () => {
    try {
      setLoadingSave(true);
      const res = await axios.post(
        "/api/posts/toggle-save",
        {
          postId: post._id,
        }
      );

      if (res.data.success) {
        setPosts((prev) =>
          prev.map((p) => {
            if (p._id === post._id) {
              return {
                ...p,
                isSaved: res.data.saved,
              };
            }
            return p;
          })
        );
        if (res.data.saved) {
          toast.success("Post saved successfully");
        } else {
          toast.success("Post unsaved successfully");
        }

      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm mb-3" data-aos="zoom-in">
        <CardBody className="p-0">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className="d-flex align-items-center gap-2">

              <div id="profileHover">
                <Image
                  src={
                    post.user?.image ||
                    "/images/default-avatar.png"
                  }
                  width={35}
                  height={35}
                  className="rounded-circle"
                  alt="user"
                />
              </div>

              <Link
                href={`/profile/${post.user?.username}`}
                className="fw-bold text-dark small text-decoration-none"
              >
                {post.user?.username}
              </Link>

              {/* POPOVER */}
              <UncontrolledPopover trigger="hover" placement="bottom-start" target="profileHover">
                <PopoverBody style={{ width: "260px" }}>
                  <div className="text-center">
                    <div className="d-flex mb-3 align-items-center">
                      <Image
                        src={
                          post.user?.image ||
                          "/images/default-avatar.png"
                        }
                        width={45}
                        height={45}
                        className="rounded-circle me-2"
                        alt="user"
                      />
                      <div className="text-start">
                        <p className="mb-0 small fw-bold">{post.user?.username}</p>
                        <small className="bg-light px-2 py-1 d-inline-block mt-1">
                          Lorem ipsum
                        </small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-around my-2 small">
                      <div><b>75</b><br />posts</div>
                      <div><b>18K</b><br />followers</div>
                      <div><b>303</b><br />following</div>
                    </div>
                    {/* last 3 posts */}
                    <div className="d-flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <Image key={i} src={`https://picsum.photos/100?${i}`} width={70} height={70} alt="post" />
                      ))}
                    </div>
                    <div className="mt-3 text-start">
                      <Button className="btn btn-primary btn-sm me-2">
                        <BsFillSendFill />  Message
                      </Button>
                      <Button className="btn btn-primary btn-sm">
                        Following
                      </Button>
                    </div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>

            </div>

            <FaEllipsisH onClick={() => setMenuOpen(true)} style={{ cursor: "pointer" }} />
          </div>

          <div
            style={{
              height: "450px",
              overflow: "hidden",
            }}
          >
            {post.mediaType === "image" ? (
              <Image
                src={post.media}
                width={800}
                height={600}
                alt="post"
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                src={post.media}
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                }}
                controls
                playsInline
              />
            )}
          </div>

          {/* ACTION BAR */}
          <div className="d-flex justify-content-between px-3 py-2">

            <div className="d-flex gap-3 align-items-center">

              {/* LIKE */}
              <div className="d-flex align-items-center gap-1">
                <span
                  onClick={!loadingLike ? toggleLike : undefined}
                  style={{ cursor: loadingLike ? "not-allowed" : "pointer" }}
                >
                  {loadingLike ? (
                    <Spinner size="sm" />
                  ) : post.isLiked ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                </span>
                {!post.hideLikeAndViewCount && (
                  <small>{post.likesCount}</small>
                )}
              </div>

              {/* COMMENT */}
              {!post.turnOffCommenting && (
                <div className="d-flex align-items-center gap-1">
                  <Link
                    href="#"
                    onClick={commentToggleMd}
                    className="text-dark"
                  >
                    <FaRegComment className="me-1" />
                    <small>{post.commentsCount}</small>
                  </Link>
                </div>
              )}


              {/* Share */}
              <div className="d-flex align-items-center gap-1">
                <Link href="#" className="text-dark" onClick={() => setShareOpen(true)}>
                  <BsFillSendFill />
                </Link>
              </div>
            </div>

            {/* BOOKMARK */}
            <div
              onClick={!loadingSave ? toggleSave : undefined}
              style={{
                cursor: loadingSave ? "not-allowed" : "pointer",
              }}
            >
              {loadingSave ? (
                <Spinner size="sm" />
              ) : post.isSaved ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </div>

          </div>

          {/* COMMENTS PREVIEW */}
          <div className="px-3 small">
            <Link href="/post/1" className="text-muted text-decoration-none">
              View all {post.commentCount} comments
            </Link>

            {post.latestComment && (
              <div className="mt-1">
                <b>
                  {
                    post.latestComment.user
                      ?.username
                  }
                </b>{" "}
                {post.latestComment.text}
              </div>
            )}
          </div>

          {/* CAPTION */}
          <div className="px-3 pb-2 small">
            <b>
              {post.user?.username}
            </b>{" "}

            {expanded
              ? post.caption
              : post.caption?.slice(
                0,
                120
              )}

            {post.caption?.length >
              120 &&
              !expanded && (
                <span
                  className="text-muted ms-1"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setExpanded(true)
                  }
                >
                  more
                </span>
              )}
          </div>

          {/* TRANSLATION TOGGLE */}
          <div className="px-3 pb-3 small text-muted">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setTranslated(!translated)}
            >
              {translated ? "See original" : "See translation"}
            </span>
          </div>

        </CardBody>
      </Card>

      {/* MODAL */}
      <Modal isOpen={menuOpen} toggle={() => setMenuOpen(false)} centered>
        <ModalBody className="p-0 text-center">

          <Link href="/report" className="text-secondary">
            <div className="p-2 border-bottom text-danger fw-bold small">Report</div>
          </Link>

          <Link href="/not-interested" className="text-secondary">
            <div className="p-2 border-bottom small">Not interested</div>
          </Link>

          <Link href="/post/1" className="text-secondary">
            <div className="p-2 border-bottom small ">Go to post</div>
          </Link>

          <Link href="/share" className="text-secondary">
            <div className="p-2 border-bottom small">Share to...</div>
          </Link>

          <Link href="/copy-link" className="text-secondary">
            <div className="p-2 border-bottom small">Copy link</div>
          </Link>

          <Link href="/embed" className="text-secondary">
            <div className="p-2 border-bottom small">Embed</div>
          </Link>

          <Link href="/about-account" className="text-secondary">
            <div className="p-2 border-bottom small">About this account</div>
          </Link>

          <div
            className="p-2 fw-semibold small text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            Cancel
          </div>

        </ModalBody>
      </Modal>


      {/* comment modal */}
      <CommentsModal
        isOpen={commentModal}
        commentToggleMd={commentToggleMd}
        post={post}
        toggleLike={toggleLike}
        loadingLike={loadingLike}
        toggleSave={toggleSave}
        loadingSave={loadingSave}
      />

      {/* share modal */}
      <ShareModal isOpen={shareOpen} toggle={() => setShareOpen(!shareOpen)} />

    </>
  );
};

export default Post;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Col
} from "reactstrap";

import {
  FaPlay,
  FaImage
} from "react-icons/fa";

import CommentsModal from "@/components/common/CommentsModal";
import ShareModal from "@/components/common/ShareModal";
import axios from "axios";
import toast from "react-hot-toast";

const SearchGrid = ({ post, setPosts,index }) => {
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
      <Col
        key={post._id}
        xl="2"
        lg="3"
        md="4"
        sm="6"
        xs="6"
        data-aos="zoom-in"
        data-aos-delay={index * 100}
        className="p-0 border border-light"
      >
        <Link
          href="#"
          onClick={commentToggleMd}
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "4px",
              background: "#ddd",
              cursor: "pointer",
              height: "320px",
            }}
          >
            {post.mediaType === "video" ? (
              <video
                src={post.media}
                poster={post.thumbnail}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={post.media}
                alt="explore"
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
                top: "10px",
                right: "10px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              {post.type === "video" ? (
                <FaPlay />
              ) : (
                <FaImage />
              )}
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
              }}
            />
          </div>
        </Link>
      </Col>


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

export default SearchGrid;
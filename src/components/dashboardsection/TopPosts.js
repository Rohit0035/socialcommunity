"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";

import {
  FaEye,
  FaHeart,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const TopPosts = () => {
  // const posts = [
  //   {
  //     type: "video",
  //     media:
  //       "https://www.w3schools.com/html/mov_bbb.mp4",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
  //     views: "40K",
  //     likes: "9K",
  //   },

  //   {
  //     type: "image",
  //     media:
  //       "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600",
  //     views: "30K",
  //     likes: "7K",
  //   },

  //   {
  //     type: "video",
  //     media:
  //       "https://www.w3schools.com/html/movie.mp4",
  //     thumbnail:
  //       "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600",
  //     views: "22K",
  //     likes: "5K",
  //   },
  // ];

  const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
          const response = await axios.get(
            "/api/dashboard/top-posts"
          );
    
          setPosts(response.data.topPosts);
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);

  return (
    <Card className="border-0 shadow-sm rounded-4">
      <CardBody className="p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h5 className="fw-bold mb-0">
            Top Performing Posts
          </h5>

          <Button
            color="primary"
            className="rounded-pill px-4"
          >
            View All
          </Button>
        </div>

        <Row className="g-4">
          {posts.map((post, index) => (
            <Col
              xl="3"
              lg="4"
              md="6"
              sm="6"
              xs="12"
              key={index}
            >
              <PostCard post={post} />
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

/* =========================
   SINGLE POST CARD
========================= */
const PostCard = ({ post }) => {
  const videoRef = useRef(null);

  const [muted, setMuted] = useState(true);

  // Toggle Sound
  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted =
      !videoRef.current.muted;

    setMuted(videoRef.current.muted);

    // ensure video keeps playing
    videoRef.current.play();
  };

  return (
    <div
      className="position-relative overflow-hidden rounded-4 bg-dark"
      style={{
        aspectRatio: "9/16",
        width: "100%",
      }}
    >
      {/* IMAGE */}
      {post.mediaType === "image" && (
        <img
          src={post.media}
          alt="post"
          className="w-100 h-100"
          style={{
            objectFit: "cover",
          }}
        />
      )}

      {/* VIDEO */}
      {post.mediaType === "video" && (
        <>
          <video
            ref={videoRef}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
            }}
            poster={post.thumbnail}
            autoPlay
            loop
            muted
            playsInline
            controls
          >
            <source
              src={post.media}
              type="video/mp4"
            />
          </video>

          {/* Play Overlay */}
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{
              pointerEvents: "none",
            }}
          >
            
          </div>

          {/* Mute / Unmute Button */}
          <button
            onClick={toggleMute}
            className="position-absolute top-0 end-0 m-3 border-0"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background:
                "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {muted ? (
              <FaVolumeMute />
            ) : (
              <FaVolumeUp />
            )}
          </button>
        </>
      )}

      {/* Bottom Overlay */}
      <div
        className="position-absolute bottom-0 start-0 w-100 p-3"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.9), transparent)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center text-white">
          <div className="small fw-semibold">
            <FaEye className="me-2" />
            {post.viewsCount || 0}
          </div>

          <div className="small fw-semibold">
            <FaHeart className="me-2 text-danger" />
            {post.likesCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPosts;
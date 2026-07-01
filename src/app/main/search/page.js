"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Input } from "reactstrap";
import {
    FaPlay,
    FaImage,
    FaSearch,
} from "react-icons/fa";
import CommentsModal from "@/components/common/CommentsModal";
import axios from "axios";
import SearchGrid from "@/components/searchComponent/SearchGrid";

  const postData = {
    user: {
      name: "fitnessfirst_id",
      avatar: "https://i.pravatar.cc/50"
    },
    media: [
      { type: "image", url: "https://picsum.photos/800/600?1" },
      { type: "image", url: "https://picsum.photos/800/600?1" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    caption: "Special Ramadan promo! 💪🔥",
    comments: [
      { user: "john", text: "Nice 🔥" },
      { user: "alex", text: "Love it 😍" }
    ],
    likes: 42,
    date: "March 12"
  };

const ExploreGrid = () => {

    const [search, setSearch] = useState("");
    const [commentModal, setCommentModal] = useState(false);
    const commentToggleMd = () => {
        setCommentModal(!commentModal);
    };

     const [posts, setPosts] = useState([]);
      const fetchPosts = async () => {
          try {
            const response = await axios.get(
              "/api/posts/feed"
            );
      
            setPosts(response.data.posts);
          } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
          }
        };
      
        useEffect(() => {
          fetchPosts();
        }, []);

    const exploreData = [
        {
            id: 1,
            type: "video",
            video:
                "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200",
            link: "/reel/1",
        },

        {
            id: 2,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
            link: "/post/2",
        },

        {
            id: 3,
            type: "video",
            video:
                "https://www.w3schools.com/html/movie.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
            link: "/reel/3",
        },

        {
            id: 4,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
            link: "/post/4",
        },

        {
            id: 5,
            type: "video",
            video:
                "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
            link: "/reel/5",
        },

        {
            id: 6,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200",
            link: "/post/6",
        },
         {
            id: 7,
            type: "video",
            video:
                "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200",
            link: "/reel/1",
        },

        {
            id: 8,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
            link: "/post/2",
        },

        {
            id: 9,
            type: "video",
            video:
                "https://www.w3schools.com/html/movie.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
            link: "/reel/3",
        },

        {
            id: 10,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
            link: "/post/4",
        },

        {
            id: 11,
            type: "video",
            video:
                "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail:
                "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
            link: "/reel/5",
        },

        {
            id: 12,
            type: "image",
            image:
                "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200",
            link: "/post/6",
        },
    ];

    const filteredData = posts.filter((item) =>
        item.mediaType.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.username.toLowerCase().includes(search.toLowerCase()) ||
        item.caption.toLowerCase().includes(search.toLowerCase()) ||
        item.altText.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <section className="py-0">
                <div
                    style={{
                        background: "#f5f5f5",
                        minHeight: "100vh",
                        padding: "20px 0",
                    }}
                >
                    <Container>
                        <div
                            data-aos="fade-down"
                            style={{
                                maxWidth: "600px",
                                margin: "0 auto 25px",
                                position: "relative",
                            }}
                        >
                            <FaSearch
                                style={{
                                    position: "absolute",
                                    left: "18px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#999",
                                    zIndex: 2,
                                }}
                            />
                            <Input
                                placeholder="Search videos/images..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    height: "46px",
                                    borderRadius: "30px",
                                    border: "none",
                                    paddingLeft: "45px",
                                    background: "#fff",
                                    boxShadow: "none",
                                }}
                            />
                        </div>
                        <Row
                            className="bg-white p-3 rounded-2"
                        >
                            {filteredData.map((post, index) => (
                                <SearchGrid key={index} post={post} setPosts={setPosts} index={index} />
                            ))}
                        </Row>
                    </Container>
                </div>
            </section>

            {/* comment modal start */}

            {/* comment modal */}
            {/* <CommentsModal
                isOpen={commentModal}
                commentToggleMd={commentToggleMd}
                posts={posts}
            /> */}

            {/* comment modal close */}

        </>
    );
};

export default ExploreGrid;
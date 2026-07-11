"use client";

import axios from "axios";
import Post from "./Post";
import Stories from "./stories/Stories";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/posts/feed");

      setPosts(response.data.posts || []);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Stories />

      <div className="mb-2">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <h5 className="text-muted">Loading posts...</h5>
          </div>
        ) : posts.length === 0 ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center text-center py-5"
          >
            <div
              className="rounded-circle d-flex justify-content-center align-items-center mb-3"
              style={{
                width: "90px",
                height: "90px",
                background: "#f1f3f5",
                fontSize: "40px",
              }}
            >
              📭
            </div>

            <h3 className="fw-bold">No Posts Yet</h3>

            <p className="text-muted" style={{ maxWidth: "400px" }}>
              Your feed is empty right now. Follow more people or be the first to
              share a post with your friends.
            </p>
          </div>
        ) : (
          posts.map((post, index) => (
            <Post key={post.id || index} post={post} setPosts={setPosts} />
          ))
        )}
      </div>
    </>
  );
}
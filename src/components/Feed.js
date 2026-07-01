"use client";

import axios from "axios";
import Post from "./Post";
import Stories from "./stories/Stories";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Feed() {

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

  return (
    <>
      <Stories />
      {/* <ReelsList/> */}
      <div className="mb-2">
        { posts.map((post,index) => (
          <Post key={index} post={post} setPosts={setPosts} />
        ))}
      </div>
    </>
  );
}

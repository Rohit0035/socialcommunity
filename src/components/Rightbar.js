"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, Popover, PopoverBody } from "reactstrap";
import { FaLock } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

const usersData = [
  {
    id: 1,
    name: "RUPALI 🦋",
    username: "itz_rupaliiiii",
    followers: 1491,
    following: 144,
    posts: 22,
    img: "https://i.pravatar.cc/100?img=1",
    private: true,
  },
  {
    id: 2,
    name: "queen_solanki",
    username: "queen_solanki_1043",
    followers: 980,
    following: 210,
    posts: 10,
    img: "https://i.pravatar.cc/100?img=2",
    private: false,
    postsImages: [
      "https://picsum.photos/200?random=11",
      "https://picsum.photos/200?random=12",
      "https://picsum.photos/200?random=13",
    ],
  },
  {
    id: 3,
    name: "kittu_baby",
    username: "kittu_baby_402024",
    followers: 500,
    following: 120,
    posts: 5,
    img: "https://i.pravatar.cc/100?img=3",
    private: false,
    postsImages: [
      "https://picsum.photos/200?random=14",
      "https://picsum.photos/200?random=15",
      "https://picsum.photos/200?random=16",
    ],
  },
  {
    id: 4,
    name: "Rahul Fitness",
    username: "rahul_fit_999",
    followers: 3200,
    following: 180,
    posts: 45,
    img: "https://i.pravatar.cc/100?img=4",
    private: false,
    postsImages: [
      "https://picsum.photos/200?random=17",
      "https://picsum.photos/200?random=18",
      "https://picsum.photos/200?random=19",
    ],
  },
  {
    id: 5,
    name: "Priya Style",
    username: "priya_look",
    followers: 2100,
    following: 300,
    posts: 60,
    img: "https://i.pravatar.cc/100?img=5",
    private: true,
  },
  {
    id: 6,
    name: "Aman Tech",
    username: "aman_dev",
    followers: 800,
    following: 150,
    posts: 25,
    img: "https://i.pravatar.cc/100?img=6",
    private: false,
    postsImages: [
      "https://picsum.photos/200?random=20",
      "https://picsum.photos/200?random=21",
      "https://picsum.photos/200?random=22",
    ],
  },
  {
    id: 7,
    name: "Sneha Artist",
    username: "sneha_art",
    followers: 1750,
    following: 220,
    posts: 35,
    img: "https://i.pravatar.cc/100?img=7",
    private: false,
    postsImages: [
      "https://picsum.photos/200?random=23",
      "https://picsum.photos/200?random=24",
      "https://picsum.photos/200?random=25",
    ],
  },
];

const Rightbar = () => {

  const { data: session } = useSession()
  const currentUser = session?.user;

  const [popoverOpen, setPopoverOpen] = useState(null);
  const [followState, setFollowState] = useState({});

  const handleMouseEnter = (id) => setPopoverOpen(id);
  const handleMouseLeave = () => setPopoverOpen(null);

  const toggleFollow = (id) => {
    setFollowState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [suggestions, setSuggestions] = useState([]);
  const [loadingUser, setLoadingUser] = useState(null);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("/api/users/suggestions");
      setSuggestions(response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleFollowToggle = async (userId, isFollowing) => {
    try {
      setLoadingUser(userId);

      if (isFollowing) {
        await axios.delete(`/api/follows/${userId}`);
        toast.success("Unfollowed successfully");
      } else {
        await axios.post("/api/follows", { followingId: userId });
        toast.success("Followed successfully");
      }
      setSuggestions((prev) =>
        prev.map((user) =>
          user._id === userId
            ? {
              ...user,
              isFollowing: !isFollowing,
            }
            : user
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoadingUser(null);
    }
  };

  return (
    <div className="position-sticky" style={{ top: "20px" }}>
      <PerfectScrollbar style={{ maxHeight: "85vh" }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link href="/main/profile" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
            <Image
              src={`${currentUser?.image || 'https://i.pravatar.cc/100?img=10'}`}
              width={45}
              height={45}
              className="rounded-circle"
              alt="profile"
            />
            <div>
              <div className="fw-semibold small">{currentUser?.username}</div>
              <div className="text-muted small">{currentUser?.name}</div>
            </div>
          </Link>
          <span className="text-primary small" style={{ cursor: "pointer" }}>
            Switch
          </span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <h6 className="fw-bold">Suggested for you</h6>
          <Link href="#" className="text-decoration-none small">
            See all
          </Link>
        </div>
        {suggestions.map((user) => (
          <div key={user._id} className="d-flex align-items-center justify-content-between mb-3">
            <Link
              href={`/profile/${user.username}`}
              className="d-flex align-items-center gap-2 text-decoration-none text-dark"
              id={`user-${user._id}`}
              onMouseEnter={() => handleMouseEnter(user._id)}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={user.image}
                width={40}
                height={40}
                className="rounded-circle"
                alt="user"
              />
              <div>
                <div className="small fw-semibold">{user.name}</div>
                <div className="text-muted small">@{user.username}</div>
              </div>
            </Link>
            <Button
              size="sm"
              color={user.isFollowing ? "secondary" : "primary"}
              disabled={loadingUser === user._id}
              onClick={() =>
                handleFollowToggle(
                  user._id,
                  user.isFollowing
                )
              }
            >
              {loadingUser === user._id
                ? "Loading..."
                : user.isFollowing
                  ? "Following"
                  : "Follow"}
            </Button>
            <Popover
              trigger="legacy"
              placement="bottom"
              isOpen={popoverOpen === user._id}
              target={`user-${user._id}`}
            >
              <PopoverBody
                style={{ width: "260px" }}
                onMouseEnter={() => handleMouseEnter(user._id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="text-center">
                  <div className="d-flex mb-3 align-items-center">
                    <Image
                      src={`${user?.image || 'https://i.pravatar.cc/100?img=10'}`}
                      width={45}
                      height={45}
                      className="rounded-circle me-2"
                      alt="user"
                    />
                    <div className="text-start">
                      <p className="mb-0 small fw-bold">{user.username}</p>
                      <small className="bg-light px-2 py-1 d-inline-block mt-1">
                        {user.name}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex justify-content-around mb-3">
                    <div>
                      <strong>{user.posts}</strong>
                      <div className="small text-muted">posts</div>
                    </div>
                    <div>
                      <strong>{user.followers}</strong>
                      <div className="small text-muted">followers</div>
                    </div>
                    <div>
                      <strong>{user.following}</strong>
                      <div className="small text-muted">following</div>
                    </div>
                  </div>
                  {user.private && (
                    <div className="text-center mb-2">
                      <FaLock />
                      <div className="small">The account is private</div>
                    </div>
                  )}
                  {!user.private && user.postsImages && (
                    <div className="d-flex gap-1 mb-3">
                      {user.postsImages.slice(0, 3).map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          width={75}
                          height={75}
                          className="rounded"
                          alt="post"
                          style={{ objectFit: "cover" }}
                        />
                      ))}
                    </div>
                  )}
                  <Button
                    size="sm"
                    color={user.isFollowing ? "secondary" : "primary"}
                    disabled={loadingUser === user._id}
                    onClick={() =>
                      handleFollowToggle(
                        user._id,
                        user.isFollowing
                      )
                    }
                  >
                    {loadingUser === user._id
                      ? "Loading..."
                      : user.isFollowing
                        ? "Following"
                        : "Follow"}
                  </Button>

                </div>
              </PopoverBody>
            </Popover>
          </div>
        ))}

      </PerfectScrollbar>

      <div className="mt-2 small  d-flex flex-wrap gap-1">
        <Link href="/about" className="text-secondary">About</Link>
        <Link href="/help" className="text-secondary">Help</Link>
        <Link href="/press" className="text-secondary">Press</Link>
        <Link href="/api" className="text-secondary">API</Link>
        <Link href="/jobs" className="text-secondary">Jobs</Link>
        <Link href="/privacy" className="text-secondary">Privacy</Link>
        <Link href="/terms" className="text-secondary">Terms</Link>
        <Link href="/locations" className="text-secondary">Locations</Link>
        <Link href="/language" className="text-secondary">Language</Link>
        <Link href="/meta-verified" className="text-secondary">Meta Verified</Link>
      </div>

      <div className="small text-muted mt-1">
        © 2026 Instagram from Meta
      </div>
    </div>
  );
};

export default Rightbar;
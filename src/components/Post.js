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
  Button
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
import "swiper/css/navigation";
import { BsFillSendFill } from "react-icons/bs";
import CommentsModal from "./common/CommentsModal";
import ShareModal from "./common/ShareModal";

/* ✅ 6 MEDIA DATA (IMAGE + VIDEO MIX) */
const mediaData = [
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { type: "image", src: "https://picsum.photos/800/600?1" },

  // { type: "image", src: "https://picsum.photos/800/600?2" },
  // { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  // { type: "image", src: "https://picsum.photos/800/600?3" },
  // { type: "image", src: "https://picsum.photos/800/600?4" },
];


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

const Post = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(19300);
  const [comments] = useState(587);
  const [expanded, setExpanded] = useState(false);
  const [translated, setTranslated] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const commentToggleMd = () => {
    setCommentModal(!commentModal);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
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
                  src="https://i.pravatar.cc/100?img=5"
                  width={35}
                  height={35}
                  className="rounded-circle"
                  alt="user"
                />
              </div>

              <Link href="/profile/dr.shruthi_sharmaa" id="profileHover" className="fw-bold text-dark small text-decoration-none">
                dr.shruthi_sharmaa
              </Link>

              {/* POPOVER */}
              <UncontrolledPopover trigger="hover" placement="bottom-start" target="profileHover">
                <PopoverBody style={{ width: "260px" }}>
                  <div className="text-center">
                    <div className="d-flex mb-3 align-items-center">
                      <Image
                        src="https://i.pravatar.cc/100?img=5"
                        width={45}
                        height={45}
                        className="rounded-circle me-2"
                        alt="user"
                      />
                      <div className="text-start">
                        <p className="mb-0 small fw-bold">dr.shruthi_sharmaa</p>
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

          {/* 🔥 SWIPER */}
          <Swiper modules={[Navigation]}
            navigation>
            {mediaData.map((item, i) => (
              <SwiperSlide key={i}>
                <div style={{ height: "450px", overflow: "hidden" }}>
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      width={800}
                      height={600}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt="post"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ACTION BAR */}
          <div className="d-flex justify-content-between px-3 py-2">

            <div className="d-flex gap-3 align-items-center">

              {/* LIKE */}
              <div className="d-flex align-items-center gap-1">
                <span onClick={toggleLike} style={{ cursor: "pointer" }}>
                  {liked ? <FaHeart color="red" /> : <FaRegHeart />}
                </span>
                <small>{likes}</small>
              </div>

              {/* COMMENT */}
              <div className="d-flex align-items-center gap-1">
                <Link href="#" onClick={commentToggleMd} className="text-dark">
                  <FaRegComment className="me-1"/>
                  <small>{comments}</small>
                </Link>
              </div>


              {/* Share */}
              <div className="d-flex align-items-center gap-1">
                <Link href="#" className="text-dark" onClick={() => setShareOpen(true)}>
                  <BsFillSendFill />
                </Link>
              </div>
            </div>

            {/* BOOKMARK */}
            <div onClick={() => setSaved(!saved)} style={{ cursor: "pointer" }}>
              {saved ? <FaBookmark /> : <FaRegBookmark />}
            </div>

          </div>

          {/* COMMENTS PREVIEW */}
          <div className="px-3 small">
            <Link href="/post/1" className="text-muted text-decoration-none">
              View all {comments} comments
            </Link>

            <div className="mt-1">
              <b>rahul_dev</b> Amazing content 🔥
            </div>
          </div>

          {/* CAPTION */}
          <div className="px-3 pb-2 small">
            <b>dr.shruthi_sharmaa</b>{" "}

            {translated ? (
              "हम अद्भुत क्षमता और मन की शक्ति रखते हैं क्योंकि हम सनातन धर्म से हैं..."
            ) : (
              expanded
                ? "We are capable of incredible capacitance, incredible power of mind because we belong from sanatan dharma..."
                : "We are capable of incredible capacitance..."
            )}

            {!expanded && !translated && (
              <span
                className="text-muted ms-1"
                style={{ cursor: "pointer" }}
                onClick={() => setExpanded(true)}
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
        postData={postData}
      />
      
       {/* share modal */}
       <ShareModal isOpen={shareOpen} toggle={() => setShareOpen(!shareOpen)} />

    </>
  );
};

export default Post;
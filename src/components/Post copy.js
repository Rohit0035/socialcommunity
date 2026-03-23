"use client";

import React, { useState } from "react";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  Card,
  CardBody,
  Button,
  UncontrolledPopover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip
} from "reactstrap";

import {
  FaEllipsisH,
  FaTimes,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaBell,
  FaUserMinus,
  FaBookmark,
  FaBan,
  FaFlag,
  FaCheckCircle,
  FaShieldAlt,
  FaFacebookMessenger,
  FaUserPlus,
  FaUser,
  FaGlobe,
  FaPlus,
  FaVideo
} from "react-icons/fa";
import Image from "next/image";
import ImageGridPost from "./post/ImageGridPost";

const Post = () => {
  const [visible, setVisible] = useState(true);

  // 🔥 MENU ITEMS
  const menuItems = [
    { label: "Interested in this post", icon: <FaThumbsUp />, href: "#" },
    { label: "Not interested in this post", icon: <FaUserMinus />, href: "#" },
    { label: "Save post", icon: <FaBookmark />, href: "#" },
    { label: "Turn on notifications", icon: <FaBell />, href: "#" },
    { label: "Hide post", icon: <FaBan />, href: "#" },
    { label: "Snooze for 30 days", icon: <FaBan />, href: "#" },
    { label: "Report post", icon: <FaFlag />, href: "#" },
    { label: "Block user", icon: <FaUserMinus />, href: "#" }
  ];

  if (!visible) return null;

  return (
    <Card className="mb-3 border-0 shadow-sm rounded-3">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <Image
              src="https://i.pravatar.cc/100?img=5"
              id="profilePopover"
              className="rounded-circle"
              width="45"
              height="45"
              style={{ objectFit: "cover", cursor: "pointer" }}
            />

            {/* PROFILE POPOVER */}
            <UncontrolledPopover
              trigger="legacy"
              placement="bottom-start"
              target="profilePopover"
            >
              <PopoverBody className="p-3 border-0 " style={{ width: "300px" }}>

                {/* HEADER */}
                <div className="d-flex justify-content-between">

                  {/* LEFT */}
                  <div className="d-flex gap-3">
                    <Image
                      src="https://i.pravatar.cc/100?img=12"
                      alt="profile"
                      width="70"
                      height="70"
                      className="rounded-circle border"
                    />

                    <div>
                      <h6 className="mb-1 fw-bold">
                        MYogiAdityanath <FaCheckCircle className="text-primary" />
                      </h6>

                      <div className="text-muted small d-flex align-items-center gap-2">
                        <FaVideo /> Page · Politician
                      </div>

                      <div className="text-muted small d-flex align-items-start gap-2 mt-1">
                        <FaUser />
                        <span>
                          मुख्यमंत्री (उत्तर प्रदेश);<br />
                          गोरक्षपीठाधीश्वर, श्री गोरक्षपीठ,<br />
                          गोरखपुर, उत्तर प्रदेश.
                        </span>
                      </div>

                      <div className="text-primary small d-flex align-items-center gap-2 mt-1">
                        <FaGlobe />
                        yogiadityanath.in
                      </div>

                      <div className="text-muted small d-flex align-items-center gap-2 mt-1">
                        <FaCheckCircle />
                        11M followers
                      </div>
                    </div>
                  </div>

                  {/* CLOSE BUTTON */}
                  <Button color="light" className="p-2 border-0 rounded-circle">
                    <FaTimes />
                  </Button>
                </div>

                {/* ACTION BUTTONS */}
                <div className="d-flex gap-2 mt-3">

                  <Button color="primary" className="flex-fill d-flex align-items-center justify-content-center gap-2">
                    🔗 Contact Us
                  </Button>

                  <Button color="light" className="flex-fill d-flex align-items-center justify-content-center gap-2">
                    <FaPlus /> Follow
                  </Button>

                  <Button color="light">
                    <FaEllipsisH />
                  </Button>

                </div>

                {/* FOOTER TEXT */}
                <div className="text-center text-muted small mt-3">
                  Press the up arrow key to access the link preview
                </div>

              </PopoverBody>
            </UncontrolledPopover>
            <div>
              <Link href="#" className="fw-bold text-dark text-decoration-none">
                Bharti Prajapati
              </Link>
              <div className="text-muted small">
                19 February at 20:06 · Public
              </div>
            </div>
          </div>
          <div className="d-flex gap-1">
            <Button id="menuBtn" color="light" className="p-1 border-0" style={{ width: '30PX', height: '30PX', borderRadius: '100px' }}>
              <FaEllipsisH />
            </Button>
            <Button
              color="light"
              className="p-1 border-0"
              onClick={() => setVisible(false)}
              style={{ width: '30PX', height: '30PX', borderRadius: '100px' }}
            >
              <FaTimes />
            </Button>
            <UncontrolledPopover
              trigger="legacy"
              placement="bottom-end"
              target="menuBtn"
              className="border-0 shadow"
            >
              <PopoverBody className="p-0 border-0" style={{ width: "260px" }}>
                <PerfectScrollbar style={{ maxHeight: 300 }}>
                  <ListGroup flush className="text-decoration-none">
                    {menuItems.map((item, i) => (
                      <ListGroupItem key={i}>
                        <Link
                          href={item.href}
                          className="d-flex gap-2 text-dark text-decoration-none"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </PerfectScrollbar>
              </PopoverBody>
            </UncontrolledPopover>

          </div>
        </div>
        <p className="mt-2">
          Facebook exact UI post with popovers, tooltips & interactions 🔥
        </p>
        <div className="w-100 overflow-hidden">
          <ImageGridPost images={[
            "https://picsum.photos/800/500",
            "https://picsum.photos/801/500",
            "https://picsum.photos/802/500",
            "https://picsum.photos/803/500",
            "https://picsum.photos/804/500"
          ]} />
        </div>
        <div className="d-flex justify-content-between mt-2 text-muted small">
          <div id="likesCount" className="d-flex align-items-center gap-1">
            <FaThumbsUp color="#1877f2" /> 455
          </div>
          <UncontrolledTooltip target="likesCount">
            Rohit, Aman and 453 others
          </UncontrolledTooltip>
          <div className="d-flex gap-3">
            <div id="commentCount">171 comments</div>
            <UncontrolledTooltip target="commentCount">
              View comments
            </UncontrolledTooltip>
            <div id="shareCount">6 shares</div>
            <UncontrolledTooltip target="shareCount">
              Shared by users
            </UncontrolledTooltip>
          </div>
        </div>

        <div className="d-flex justify-content-around border-top mt-2 pt-2">
          <Link href="#" id="likeBtn" className="text-dark text-decoration-none">
            <FaThumbsUp className="me-1" /> Like
          </Link>
          <UncontrolledTooltip target="likeBtn">Like</UncontrolledTooltip>
          <Link href="#" id="commentBtn" className="text-dark text-decoration-none">
            <FaComment className="me-1" /> Comment
          </Link>
          <UncontrolledTooltip target="commentBtn">Comment</UncontrolledTooltip>
          <Link href="#" id="shareBtn" className="text-dark text-decoration-none">
            <FaShare className="me-1" /> Share
          </Link>
          <UncontrolledTooltip target="shareBtn">Share</UncontrolledTooltip>
        </div>
      </CardBody>
    </Card>
  );
};

export default Post;










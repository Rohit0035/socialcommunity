"use client";

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  Button,
  Badge,
} from "reactstrap";

import {
  FiEdit2,
  FiSearch,
  FiPhone,
  FiVideo,
  FiInfo,
  FiSmile,
  FiMic,
  FiImage,
  FiMessageCircle,
  FiMoreVertical,
  FiCornerUpLeft,
} from "react-icons/fi";

import { BsFillPlayCircleFill } from "react-icons/bs";
import "aos/dist/aos.css";

const chatList = [
  {
    id: 1,
    name: "JANJAY T",
    message: "Active now",
    avatar:
      "https://i.pravatar.cc/150?img=12",
    online: true,
  },
];

const ChatInstagramUI = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <div className="chat-st-wrapper">
        <Container fluid className="p-0 h-100">
          <Row className="g-0 h-100">

            {/* ================= LEFT SIDEBAR ================= */}
            <Col
              lg="4"
              xl="4"
              className={`chat-st-sidebar ${
                selectedChat ? "chat-st-mobile-hide" : ""
              }`}
            
            >
              {/* TOP */}
              <div className="chat-st-topbar">
                <div className="d-flex align-items-center gap-2">
                  <h4 className="chat-st-logo mb-0">Lorem000</h4>
                  <span className="chat-st-down">⌄</span>
                </div>

                <button className="chat-st-icon-btn">
                  <FiEdit2 />
                </button>
              </div>

              {/* TABS */}
              <div className="chat-st-tabs-wrapper">
                <Nav pills className="chat-st-tabs">
                  <NavItem className="flex-fill">
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => setActiveTab("1")}
                    >
                      Primary
                    </NavLink>
                  </NavItem>

                  <NavItem className="flex-fill">
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => setActiveTab("2")}
                    >
                      General
                    </NavLink>
                  </NavItem>

                  <NavItem className="flex-fill">
                    <NavLink
                      className={activeTab === "3" ? "active" : ""}
                      onClick={() => setActiveTab("3")}
                    >
                      Requests
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>

              {/* SEARCH */}
              <div className="chat-st-search-wrap">
                <FiSearch className="chat-st-search-icon" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="chat-st-search"
                />
              </div>

              {/* CONTENT */}
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">

                  {/* NOTE */}
                  <div className="chat-st-note-box">
                    <div className="chat-st-note-badge">
                      Weekend
                      <br />
                      plans?
                    </div>

                    <div className="chat-st-note-profile">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                        alt=""
                      />
                    </div>

                    <p>Your note</p>
                  </div>

                  {/* CHAT LIST */}
                  <div className="chat-st-chat-list">
                    {chatList.map((chat) => (
                      <div
                        key={chat.id}
                        className={`chat-st-chat-item ${
                          selectedChat?.id === chat.id
                            ? "chat-st-active-chat"
                            : ""
                        }`}
                        onClick={() => setSelectedChat(chat)}
                        
                      >
                        <div className="chat-st-avatar-wrap">
                          <img
                            src={chat.avatar}
                            alt=""
                            className="chat-st-avatar"
                          />

                          {chat.online && (
                            <span className="chat-st-online"></span>
                          )}
                        </div>

                        <div>
                          <h6>{chat.name}</h6>
                          <p>{chat.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPane>

                <TabPane tabId="2">
                  <div className="chat-st-empty-tab">
                    General Messages
                  </div>
                </TabPane>

                <TabPane tabId="3">
                  <div className="chat-st-empty-tab">
                    Requests Empty
                  </div>
                </TabPane>
              </TabContent>
            </Col>

            {/* ================= RIGHT CHAT ================= */}
            <Col
              lg="8"
              xl="8"
              className={`chat-st-chat-section ${
                !selectedChat ? "chat-st-mobile-full" : ""
              }`}
              
            >
              {!selectedChat ? (
                <div className="chat-st-empty-screen">
                  <div className="chat-st-empty-icon">
                    <FiMessageCircle />
                  </div>

                  <h2>Your messages</h2>

                  <p>Send a message to start a chat.</p>

                  <Button className="chat-st-send-btn">
                    Send message
                  </Button>
                </div>
              ) : (
                <>
                  {/* CHAT HEADER */}
                  <div className="chat-st-chat-header">
                    <div className="d-flex align-items-center gap-3">
                      <div className="chat-st-avatar-wrap">
                        <img
                          src={selectedChat.avatar}
                          alt=""
                          className="chat-st-avatar"
                        />

                        <span className="chat-st-online"></span>
                      </div>

                      <div>
                        <h5>{selectedChat.name}</h5>
                        <p>Active now</p>
                      </div>
                    </div>

                    <div className="chat-st-header-icons">
                      <FiPhone />
                      <FiVideo />
                      <FiInfo />
                    </div>
                  </div>

                  {/* CHAT BODY */}
                  <div className="chat-st-chat-body">

                    <button className="chat-st-profile-btn">
                      View profile
                    </button>

                    <p className="chat-st-date">
                      Jan 21, 2026, 10:22 PM
                    </p>

                    <div className="chat-st-message-right">
                      <div className="chat-st-video-card">
                        <img
                          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop"
                          alt=""
                        />

                        <div className="chat-st-play">
                          <BsFillPlayCircleFill />
                        </div>
                      </div>

                      <div className="chat-st-message-actions">
                        <FiMoreVertical />
                        <FiCornerUpLeft />
                        <FiSmile />
                      </div>
                    </div>
                  </div>

                  {/* INPUT */}
                  <div className="chat-st-input-area">
                    <FiSmile className="chat-st-input-left" />

                    <Input
                      type="text"
                      placeholder="Message..."
                      className="chat-st-input"
                    />

                    <div className="chat-st-input-icons">
                      <FiMic />
                      <FiImage />
                      <FiSmile />
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ================= CUSTOM CSS ================= */}
      <style jsx>{`
        .chat-st-wrapper {
          height: 100vh;
          overflow: hidden;
          background: #fff;
          font-family: Arial, sans-serif;
        }

        .chat-st-sidebar {
          border-right: 1px solid #dbdbdb;
          height: 100vh;
          overflow-y: auto;
          background: #fff;
        }

        .chat-st-topbar {
          padding: 25px 24px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-st-logo {
          font-size: 34px;
          font-weight: 700;
          color: #000;
        }

        .chat-st-down {
          font-size: 20px;
        }

        .chat-st-icon-btn {
          width: 44px;
          height: 44px;
          border: 2px solid #2563eb;
          background: transparent;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .chat-st-tabs-wrapper {
          border-bottom: 1px solid #ddd;
        }

        .chat-st-tabs .nav-link {
          border: none !important;
          border-radius: 0 !important;
          padding: 16px;
          color: #666;
          font-weight: 600;
          background: transparent !important;
        }

        .chat-st-tabs .nav-link.active {
          color: #000 !important;
          border-bottom: 2px solid #000 !important;
        }

        .chat-st-search-wrap {
          position: relative;
          padding: 14px 20px;
        }

        .chat-st-search {
          border-radius: 30px;
          border: none;
          background: #f1f1f1;
          padding-left: 45px;
          height: 45px;
          box-shadow: none !important;
        }

        .chat-st-search-icon {
          position: absolute;
          left: 35px;
          top: 50%;
          transform: translateY(-50%);
          color: #777;
          font-size: 18px;
        }

        .chat-st-note-box {
          padding: 10px 20px;
        }

        .chat-st-note-badge {
          background: #f3f3f3;
          width: fit-content;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 12px;
          color: #666;
          position: relative;
        }

        .chat-st-note-profile img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: 10px;
        }

        .chat-st-note-box p {
          margin-top: 8px;
          color: #666;
          font-size: 14px;
        }

        .chat-st-chat-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .chat-st-chat-item:hover {
          background: #f5f5f5;
        }

        .chat-st-active-chat {
          background: #efefef;
        }

        .chat-st-avatar-wrap {
          position: relative;
        }

        .chat-st-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .chat-st-online {
          width: 14px;
          height: 14px;
          background: #22c55e;
          border-radius: 50%;
          position: absolute;
          bottom: 3px;
          right: 2px;
          border: 2px solid #fff;
        }

        .chat-st-chat-item h6 {
          margin: 0;
          font-size: 18px;
        }

        .chat-st-chat-item p {
          margin: 0;
          color: #666;
          font-size: 15px;
        }

        .chat-st-chat-section {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #fff;
        }

        .chat-st-empty-screen {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .chat-st-empty-icon {
          width: 100px;
          height: 100px;
          border: 2px solid #111;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          margin-bottom: 20px;
        }

        .chat-st-empty-screen h2 {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .chat-st-empty-screen p {
          color: #666;
        }

        .chat-st-send-btn {
          background: #4f46e5 !important;
          border: none !important;
          border-radius: 10px;
          padding: 10px 24px;
          margin-top: 12px;
        }

        .chat-st-chat-header {
          height: 78px;
          border-bottom: 1px solid #ddd;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-st-chat-header h5 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }

        .chat-st-chat-header p {
          margin: 0;
          color: #666;
        }

        .chat-st-header-icons {
          display: flex;
          gap: 20px;
          font-size: 28px;
        }

        .chat-st-chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          position: relative;
        }

        .chat-st-profile-btn {
          border: none;
          background: #f3f3f3;
          padding: 8px 18px;
          border-radius: 10px;
          display: block;
          margin: auto;
          font-weight: 600;
        }

        .chat-st-date {
          text-align: center;
          color: #777;
          margin: 50px 0;
          font-size: 14px;
        }

        .chat-st-message-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }

        .chat-st-video-card {
          width: 200px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          background: #000;
        }

        .chat-st-video-card img {
          width: 100%;
          height: 350px;
          object-fit: cover;
        }

        .chat-st-play {
          position: absolute;
          bottom: 15px;
          left: 15px;
          color: #fff;
          font-size: 34px;
        }

        .chat-st-message-actions {
          display: flex;
          gap: 10px;
          font-size: 22px;
          color: #444;
        }

        .chat-st-input-area {
          height: 85px;
          border-top: 1px solid #ddd;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .chat-st-input {
          border-radius: 40px;
          height: 52px;
          border: 1px solid #ddd;
          box-shadow: none !important;
          padding: 0 20px;
        }

        .chat-st-input-left {
          font-size: 28px;
          flex-shrink: 0;
        }

        .chat-st-input-icons {
          display: flex;
          gap: 18px;
          font-size: 25px;
          flex-shrink: 0;
        }

        .chat-st-empty-tab {
          padding: 40px;
          text-align: center;
          color: #777;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 991px) {
          .chat-st-sidebar {
            width: 100%;
          }

          .chat-st-mobile-hide {
            display: none;
          }

          .chat-st-mobile-full {
            display: none;
          }

          .chat-st-chat-section {
            width: 100%;
          }

          .chat-st-chat-header h5 {
            font-size: 18px;
          }

          .chat-st-header-icons {
            gap: 14px;
            font-size: 22px;
          }

          .chat-st-video-card {
            width: 170px;
          }

          .chat-st-video-card img {
            height: 300px;
          }

          .chat-st-empty-screen h2 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  );
};

export default ChatInstagramUI;
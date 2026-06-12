"use client";

import { useState } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../../../assets/styles/message.css"

import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput
} from "@chatscope/chat-ui-kit-react";

import {
  FaSmile,
  FaPaperclip,
  FaImage,
  FaPhone,
  FaVideo,
  FaEllipsisV
} from "react-icons/fa";

export default function MessagePage() {
  const [messages, setMessages] = useState([
    {
      message: "Hello 👋",
      sender: "John",
      direction: "incoming",
      position: "single"
    }
  ]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        message: text,
        sender: "Me",
        direction: "outgoing",
        position: "single"
      }
    ]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <MainContainer responsive>

        {/* LEFT SIDEBAR */}
        <Sidebar position="left">

          <ConversationList>

            <Conversation
              name="John Doe"
              info="Online"
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=1"
                name="John"
              />
            </Conversation>

            <Conversation
              name="Sarah"
              info="Typing..."
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=2"
                name="Sarah"
              />
            </Conversation>

            <Conversation
              name="Alex"
              info="Last seen today"
            >
              <Avatar
                src="https://i.pravatar.cc/150?img=3"
                name="Alex"
              />
            </Conversation>

          </ConversationList>

        </Sidebar>

        {/* CHAT AREA */}
        <ChatContainer>

          {/* HEADER */}
          <ConversationHeader>

            <Avatar
              src="https://i.pravatar.cc/150?img=1"
              name="John"
            />

            <ConversationHeader.Content
              userName="John Doe"
              info="Online"
            />

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "15px",
                paddingRight: "15px",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              <FaPhone />
              <FaVideo />
              <FaEllipsisV />
            </div>

          </ConversationHeader>

          {/* MESSAGE AREA */}
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={msg}
              />
            ))}
          </MessageList>

          {/* TOOLBAR */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              padding: "10px 15px",
              borderTop: "1px solid #eee",
              background: "#fff"
            }}
          >
            <FaSmile
              size={20}
              style={{ cursor: "pointer" }}
            />

            <label style={{ cursor: "pointer" }}>
              <FaImage size={20} />
              <input
                hidden
                type="file"
                accept="image/*"
              />
            </label>

            <label style={{ cursor: "pointer" }}>
              <FaPaperclip size={20} />
              <input
                hidden
                type="file"
                multiple
              />
            </label>
          </div>

          {/* INPUT */}
          <MessageInput
            placeholder="Type message..."
            attachButton={false}
            onSend={sendMessage}
          />

        </ChatContainer>

      </MainContainer>
    </div>
  );
}
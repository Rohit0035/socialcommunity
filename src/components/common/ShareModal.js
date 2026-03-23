"use client";

import React, { useState } from "react";
import { Modal, ModalBody, Input, Button } from "reactstrap";
import Select from "react-select";
import PerfectScrollbar from "react-perfect-scrollbar";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

const ShareModal = ({ isOpen, toggle }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Dummy user list
  const users = [
    {
      value: "chinmay",
      label: "Chinmay",
      username: "chinmay.33",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      value: "sapna",
      label: "kign_apna",
      username: "sapna_c",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
      value: "sudha",
      label: "sudha jain ✨",
      username: "cute_girl_2",
      avatar: "https://i.pravatar.cc/100?img=3"
    }
  ];

  // Select options for react-select
  const options = users.map((u) => ({
    value: u.value,
    label: u.label
  }));

  const handleSelect = (selected) => {
    setSelectedUsers(selected || []);
  };

  const isSelected = (user) =>
    selectedUsers?.some((u) => u.value === user.value);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody className="p-0 rounded-3">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <strong className="w-100 text-center">Share</strong>
          <FaTimes onClick={toggle} style={{ cursor: "pointer" }} />
        </div>

        {/* SELECT USERS */}
        <div className="p-2 border-bottom">
          <Select
            isMulti
            options={options}
            value={selectedUsers}
            onChange={handleSelect}
            placeholder="Search users..."
          />
        </div>

        {/* USER LIST */}
        <PerfectScrollbar style={{ maxHeight: "250px" }}>
          {users.map((user, i) => (
            <div
              key={i}
              className="d-flex align-items-center justify-content-between p-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (isSelected(user)) {
                  setSelectedUsers(selectedUsers.filter((u) => u.value !== user.value));
                } else {
                  setSelectedUsers([...selectedUsers, { value: user.value, label: user.label }]);
                }
              }}
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src={user.avatar}
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
                <div>
                  <div className="fw-bold">{user.label}</div>
                  <small className="text-muted">{user.username}</small>
                </div>
              </div>

              {/* CHECK ICON */}
              {isSelected(user) ? (
                <FaCheckCircle color="black" />
              ) : (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid #ccc",
                    borderRadius: "50%"
                  }}
                />
              )}
            </div>
          ))}
        </PerfectScrollbar>

        {/* MESSAGE BOX */}
        <div className="border-top p-2">
          <Input
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* SEND BUTTON */}
        <div className="p-2">
          <Button color="primary" block>
            Send
          </Button>
        </div>

      </ModalBody>
    </Modal>
  );
};

export default ShareModal;
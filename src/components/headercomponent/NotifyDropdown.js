"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Badge
} from "reactstrap";

import {
  FaBell,
  FaEllipsisH,
  FaCheck,
  FaTrash,
  FaBug,
  FaCircle,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


const NotifyDropdown = () => {
  const [activeTab, setActiveTab] = useState("all");
  const notifications = [
    {
      id: 1,
      text: "We noticed a new login from a device you don't usually use.",
      time: "1d",
      unread: true
    },
    {
      id: 2,
      text: "We noticed a new login from a location you don't usually use.",
      time: "4d",
      unread: true
    }
  ];

  return (
    <UncontrolledDropdown>
      <DropdownToggle
        color="light"
        className="ci-icon-st position-relative border-0"
      >
        <FaBell size={16} className="" />
        <Badge
          color="danger"
          pill
          className="position-absolute top-0 start-100 translate-middle st-badge"
        >
          {notifications.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu
        end
        className="p-0 shadow border-0"
        style={{ width: "360px" }}
      >
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 fw-bold">Notifications</h5>

            <Button color="light" size="sm" className="rounded-circle">
              <FaEllipsisH />
            </Button>
          </div>
          <div className="d-flex gap-2 mt-3">
            <Button
              size="sm"
              color={activeTab === "all" ? "primary" : "light"}
              onClick={() => setActiveTab("all")}
              className="rounded-pill"
            >
              All
            </Button>

            <Button
              size="sm"
              color={activeTab === "unread" ? "primary" : "light"}
              onClick={() => setActiveTab("unread")}
              className="rounded-pill"
            >
              Unread
            </Button>
          </div>
          <div className="mt-3 fw-semibold">Today</div>
          <div className="mt-2 d-flex flex-column gap-2">
            {notifications
              .filter((n) => activeTab === "all" || n.unread)
              .map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-start gap-2 p-2 rounded hover-bg-light"
                >
                  <div className="d-flex align-items-center justify-content-center position-relative"
                  >
                    <span className="bg-primary text-white text-center fs-3" style={{ width: "35px", height: "35px", borderRadius: '100px', padding: "1px" }}>
                      f
                    </span>
                    <span className="bg-info text-white text-center position-absolute" style={{ width: "22px", height: "22px", borderRadius: '100px', padding: "1px", top: "24px", right: "0px" }}>
                      <FaCheck size={12} />
                      {/* <IoMdClose size={12} /> */}
                    </span>

                  </div>
                  <div className="flex-grow-1">
                    <Link
                      href="#"
                      className="text-dark text-decoration-none small"
                    >
                      {item.text}
                    </Link>
                    <div className="text-muted small">{item.time}</div>
                  </div>
                  {item.unread && (
                    <span className="">
                      <Link href="#">
                        <FaCircle size={10} stroke="primary" />
                      </Link>
                    </span>
                  )}
                  <UncontrolledDropdown>
                    <DropdownToggle
                      tag="span"
                      className="text-muted"
                      style={{ cursor: "pointer" }}
                    >
                      <FaEllipsisH />
                    </DropdownToggle>

                    <DropdownMenu end className="shadow border-0 st-dropdown">

                      <DropdownItem className="d-flex gap-2 align-items-center">
                        <FaCheck /> Mark as read
                      </DropdownItem>

                      <DropdownItem className="d-flex gap-2 align-items-center">
                        <FaTrash /> Delete this notification
                      </DropdownItem>

                      <DropdownItem className="d-flex gap-2 align-items-center">
                        <FaBug /> Report issue
                      </DropdownItem>

                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              ))}

          </div>
          <div className="text-center mt-3">
            <Link href="#" className="text-primary text-decoration-none small">
              See all
            </Link>
          </div>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotifyDropdown;
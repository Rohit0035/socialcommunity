"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaCommentDots,
  FaSignOutAlt,
  FaChevronRight,
  FaArrowLeft,
  FaUserCircle,
  FaUsers,
  FaExclamationCircle
} from "react-icons/fa";

const MenuDropdown = ({ closeMenu }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  return (
    <div ref={menuRef} className="fb-menu shadow rounded p-2 bg-white">

      {/* MAIN MENU */}
      <div className={`menu-page ${activeMenu === "main" ? "active" : ""}`}>

        <div className="menu-item highlight d-flex align-items-center gap-2">
          <FaUserCircle size={35} />
          <span>John Smith</span>
        </div>

        <div className="menu-item center text-muted">
          <FaUsers className="me-2" /> See all profiles
        </div>

        <MenuItem icon={<FaCog />} text="Settings & privacy" onClick={() => setActiveMenu("settings")} />
        <MenuItem icon={<FaQuestionCircle />} text="Help & support" onClick={() => setActiveMenu("help")} />
        <MenuItem icon={<FaMoon />} text="Display & accessibility" />
        <MenuItem icon={<FaCommentDots />} text="Give feedback" sub="CTRL B" />
        <MenuItem icon={<FaSignOutAlt />} text="Log out" onClick={closeMenu} />

      </div>

      {/* HELP MENU */}
      <div className={`menu-page ${activeMenu === "settings" ? "active" : ""}`}>
        <div className="menu-header">
          <div className="back-btn" onClick={() => setActiveMenu("main")}>
            <FaArrowLeft />
          </div>
          <h6 className="mb-0">Settings & privacy</h6>
        </div>
        <MenuItem text="Help Centre" icon={<FaQuestionCircle />} />
        <MenuItem text="Account status" icon={<FaUserCircle />} />
        <MenuItem text="Support Inbox" icon={<FaCommentDots />} />
        <MenuItem text="Report a problem" icon={<FaExclamationCircle />} />
      </div>

        {/* HELP MENU */}
      <div className={`menu-page ${activeMenu === "help" ? "active" : ""}`}>
        <div className="menu-header">
          <div className="back-btn" onClick={() => setActiveMenu("main")}>
            <FaArrowLeft />
          </div>
          <h6 className="mb-0">Help & support</h6>
        </div>
        <MenuItem text="Help Centre" icon={<FaQuestionCircle />} />
        <MenuItem text="Account status" icon={<FaUserCircle />} />
        <MenuItem text="Support Inbox" icon={<FaCommentDots />} />
        <MenuItem text="Report a problem" icon={<FaExclamationCircle />} />
      </div>
    </div>

    
  );
};

const MenuItem = ({ icon, text, onClick, sub }) => {
  return (
    <div
      className="menu-item"
      onClick={onClick}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div className="icon-box">{icon}</div>
        <span>{text}</span>
      </div>

      {sub ? (
        <small className="text-muted">{sub}</small>
      ) : onClick ? (
        <FaChevronRight />
      ) : null}
    </div>
  );
};

export default MenuDropdown;
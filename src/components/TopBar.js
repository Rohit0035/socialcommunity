"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Navbar,
  Input,
  Offcanvas,
  OffcanvasBody,
  Badge
} from "reactstrap";

import {
  FaFacebook,
  FaSearch,
  FaHome,
  FaUserFriends,
  FaBell,
  FaTh,
  FaBars,
  FaStore,
  FaVideo,
  FaFacebookMessenger,
  FaFlag,
  FaBookmark,
  FaGift,
  FaCalendar,
  FaGamepad,
  FaBullhorn,
  FaClock,
  FaCog,
  FaUserCircle,
  FaFileInvoice
} from "react-icons/fa";
import MenuDropdown from "./common/MenuDropdown";
import NotifyDropdown from "./headercomponent/NotifyDropdown";
import Image from "next/image";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);

  // 🔥 MENU ITEMS
  const menuItems = [
    { icon: <FaFacebookMessenger />, label: "Messages" },
    { icon: <FaUserFriends />, label: "Groups" },
    { icon: <FaVideo />, label: "Reels" },
    { icon: <FaStore />, label: "Marketplace" },
    { icon: <FaFlag />, label: "Pages" },
    { icon: <FaBookmark />, label: "Saved" },
    { icon: <FaGift />, label: "Birthdays" },
    { icon: <FaCalendar />, label: "Events" },
    { icon: <FaGamepad />, label: "Games" },
    { icon: <FaBullhorn />, label: "Ads Manager" },
    { icon: <FaTh />, label: "Feeds" },
    { icon: <FaClock />, label: "Memories" }
  ];

  // 🔥 MOBILE NAV ITEMS WITH COUNTER
  const navItems = [
    { icon: <FaHome />, link: "/", count: 0, active: true },
    { icon: <FaUserFriends />, link: "/friends", count: 5 },
    { icon: <FaFacebookMessenger />, link: "/messages", count: 2 },
    { icon: <FaVideo />, link: "/videos", count: 0 },
    { icon: <FaBell />, link: "/notifications", count: 9 },
    { icon: <FaStore />, link: "/marketplace", count: 0 }
  ];


  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <Navbar className="d-none d-md-flex justify-content-between px-3 border-bottom bg-white sticky-top">

        {/* LEFT */}
        <div className="d-flex align-items-center gap-2">
          <FaFacebook size={28} color="#1877f2" />

          <div className="d-none d-lg-block">
            <div className="d-flex align-items-center border rounded px-2 ">
              <FaSearch />
              <Input
                placeholder="Search Facebook"
                className="border-0 shadow-none "
              />
            </div>
          </div>

          <div  style={{width:'30px', height:'30px', borderRadius:'100px'}} className="bg-light  p-1 d-block d-lg-none">
            <Link href="#">
              <FaSearch  size={14}/>
            </Link>
          </div>
        </div>

        {/* CENTER */}
        <div className="d-flex gap-5">
          <Link href="/" className="text-primary fs-5">
            <FaHome />
          </Link>
          <Link href="/friends" className="text-dark fs-5">
            <FaUserFriends />
          </Link>
          <Link href="/videos" className="text-dark fs-5">
            <FaVideo />
          </Link>
          <Link href="/marketplace" className="text-dark fs-5">
            <FaStore />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-light btn-sm">Find friends</button>

          <div
            className="ci-icon-st bg-light"
            style={{ cursor: "pointer" }}
            onClick={() => setDesktopMenu(!desktopMenu)}
          >
            <FaTh  />
          </div>

          <div className="ci-icon-st bg-light">
            <FaFacebookMessenger  />
          </div>

          <NotifyDropdown/>

          {/* <div className="rounded-circle bg-light p-2"  style={{ cursor: "pointer" }}
            onClick={() => setDesktopMenu(!desktopMenu)}>
            
            <FaBell />
          </div> */}

          <Image
            src="https://i.pravatar.cc/40"
            className="rounded-circle"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            alt="img-user"
            width={40}
            height={40}
          />
        </div>

        {/* DESKTOP MENU */}
        {desktopMenu && (
          <div className="position-absolute bg-white shadow p-3 rounded"
            style={{ right: 20, top: 60, width: 300 }}>

            <h6 className="fw-bold mb-3">Menu</h6>

            <div className="row g-2">
              {menuItems.map((item, i) => (
                <div key={i} className="col-6">
                  <div className="border rounded p-2 d-flex align-items-center gap-2">
                    {item.icon}
                    <small>{item.label}</small>
                  </div>
                </div>
              ))}
            </div>

            <hr />

            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2 align-items-center">
                <FaCog /> Settings
              </div>
              <div className="d-flex gap-2 align-items-center">
                <FaFileInvoice /> Orders & payments
              </div>
            </div>
          </div>
        )}
      </Navbar>

      {/* ================= MOBILE ================= */}
      <Navbar className="d-flex d-md-none flex-column p-0 bg-white border-bottom">

        {/* TOP */}
        <div className="d-flex justify-content-between align-items-center w-100 px-2 py-2">
          <FaFacebook size={26} color="#1877f2" />

          <div className="d-flex gap-2">
            <div className="bg-light rounded-circle p-2">
              <FaSearch />
            </div>

            <div
              className="bg-light rounded-circle p-2"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars />
            </div>
          </div>
        </div>

        {/*  MOBILE NAV */}
        <div className="d-flex justify-content-around align-items-center w-100 py-2 border-top">

          {navItems.map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className="text-dark text-decoration-none position-relative d-flex flex-column align-items-center"
            >
              <div className={`fs-5 ${item.active ? "text-primary" : ""}`}>
                {item.icon}
              </div>
              {item.count > 0 && (
                <Badge
                  color="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {item.count}
                </Badge>
              )}
            </Link>
          ))}

        </div>
      </Navbar>

      {/* ================= MOBILE DRAWER ================= */}
      <Offcanvas
        direction="end"
        isOpen={menuOpen}
        toggle={() => setMenuOpen(false)}
      >
        <OffcanvasBody>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <FaBars onClick={() => setMenuOpen(false)} />
            <h5 className="mb-0">Menu</h5>
            <FaSearch />
          </div>

          <div className="row g-2">
            {menuItems.map((item, i) => (
              <div className="col-6" key={i}>
                <div className="border rounded p-2 d-flex gap-2 align-items-center">
                  {item.icon}
                  <small>{item.label}</small>
                </div>
              </div>
            ))}
          </div>

          <hr />

          <div className="d-flex flex-column gap-2">
            <div className="d-flex gap-2 align-items-center">
              <FaUserCircle /> Settings
            </div>

            <div className="d-flex gap-2 align-items-center">
              <FaFileInvoice /> Orders & payments
            </div>
          </div>

        </OffcanvasBody>
      </Offcanvas>

      {isProfileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0",
          }}
        >
          <MenuDropdown closeMenu={() => setIsProfileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Topbar;
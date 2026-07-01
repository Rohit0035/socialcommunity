"use client";

import { useState } from "react";
import Link from "next/link";
import { sidebarMenu, moreMenu, createMenu } from "./sidebarMenu";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaBars } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isReelOpen, setIsReelOpen] = useState(false);

  const handleClick = (label) => {
    if (label === "Post") setIsPostOpen(true);
    if (label === "Reel") setIsReelOpen(true);
  };

  return (
    <div
      className={`sidebar d-none d-md-flex flex-column ${collapsed ? "collapsed" : "expanded"
        }`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* LOGO */}
      <div className="p-3 fw-bold"><h3>IG</h3></div>

      {/* MENU */}
      <div className="">
        {sidebarMenu.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.link}
              className="sidebar-item d-flex align-items-center"
            >
              <Icon className="icon" />
              {!collapsed && <span className="label">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* create */}
       {/* <UncontrolledDropdown className="mb-3">
        <DropdownToggle color="light" className="sidebar-item d-flex align-items-center px-3 py-2 w-100">
          <FaPlus size={22} />
          {!collapsed && <span className="label">Create</span>}
        </DropdownToggle>
        <DropdownMenu className="border-0 bg-light shadow-sm">
          {createMenu.map((item, i) => {
            const Icon = item.icon; 

            return (
              item.label === "Log out" ?
                <DropdownItem key={i}>
                  <Link
                    href='#'
                 onClick={() => handleClick(item.label)}
                    className="sidebar-item d-flex align-items-center py-2 px-2"
                  >
                    <Icon className="icon fs-5" />
                    <span className="label">{item.label}</span>
                  </Link>
                </DropdownItem> :
                <DropdownItem key={i}>
                  <Link
                    href={item.link}
                    className="sidebar-item d-flex align-items-center py-2 px-2"
                  >
                    <Icon className="icon fs-5" />
                    <span className="label">{item.label}</span>
                  </Link>
                </DropdownItem>
            );
          })}
        </DropdownMenu>

      </UncontrolledDropdown> */}

      {/* MORE DROPDOWN */}
      <UncontrolledDropdown className="mb-3">
        <DropdownToggle color="light" className="sidebar-item d-flex align-items-center px-3 py-2 w-100">
          <FaBars size={22} />
          {!collapsed && <span className="label">More</span>}
        </DropdownToggle>
        <DropdownMenu className="border-0 bg-light shadow-sm">
          {moreMenu.map((item, i) => {
            const Icon = item.icon; // <-- ADD THIS

            return (
              item.label === "Log out" ?
                <DropdownItem key={i}>
                  <Link
                    href='#'
                    onClick={() => signOut({
                      callbackUrl: "/auth/login",
                    })}
                    className="sidebar-item d-flex align-items-center py-2 px-2"
                  >
                    <Icon className="icon fs-5" /> {/* now it works */}
                    <span className="label">{item.label}</span>
                  </Link>
                </DropdownItem> :
                <DropdownItem key={i}>
                  <Link
                    href={item.link}
                    className="sidebar-item d-flex align-items-center py-2 px-2"
                  >
                    <Icon className="icon fs-5" /> {/* now it works */}
                    <span className="label">{item.label}</span>
                  </Link>
                </DropdownItem>
            );
          })}
        </DropdownMenu>

      </UncontrolledDropdown>
    </div>
  );
};

export default Sidebar;
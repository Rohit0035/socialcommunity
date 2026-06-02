"use client";

import { useState } from "react";
import {
  Navbar,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Collapse,
} from "reactstrap";

import {
  FaFacebook,
  FaBars,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";


import { sidebarMenu, moreMenu, createMenu } from "./sidebarMenu";

/* ================= MENU DATA ================= */


const Topbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState({
    main: true,
    create: false,
    more: false,
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      {/* ================= TOPBAR ================= */}

      <Navbar className="d-flex d-lg-none justify-content-between px-3 py-2 bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-bold">IG </h5>
          {/* <div className="bg-light rounded-circle p-2">
            <FaSearch />
          </div> */}
        </div>

        <div
          className="bg-light rounded-circle p-2"
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </div>
      </Navbar>

      {/* ================= OFFCANVAS SIDEBAR ================= */}

      <Offcanvas
        isOpen={sidebarOpen}
        toggle={toggleSidebar}
        direction="start"
      >
        <OffcanvasHeader toggle={toggleSidebar}>
          Menu
        </OffcanvasHeader>

        <OffcanvasBody>

          {/* ===== MAIN MENU DIRECT SHOW ===== */}

          <ul className="list-unstyled ps-2 mb-4">
            {sidebarMenu.map((item, index) => {
              const Icon = item.icon;

              return (
                <li key={index} className="mb-2">
                  <a
                    href={item.link}
                    className="text-decoration-none text-dark d-flex align-items-center gap-3 p-2 rounded hover-bg"
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ===== CREATE MENU ===== */}

          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center py-2"
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("create")}
            >
              <h6 className="mb-0">Create</h6>

              {openMenu.create ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            <Collapse isOpen={openMenu.create}>
              <ul className="list-unstyled ps-2">
                {createMenu.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <li key={index} className="mb-2">
                      <a
                        href={item.link}
                        className="text-decoration-none text-dark d-flex align-items-center gap-3 p-2 rounded"
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </div>

          {/* ===== MORE MENU ===== */}

          <div>
            <div
              className="d-flex justify-content-between align-items-center py-2"
              style={{ cursor: "pointer" }}
              onClick={() => toggleCollapse("more")}
            >
              <h6 className="mb-0">More</h6>

              {openMenu.more ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            <Collapse isOpen={openMenu.more}>
              <ul className="list-unstyled ps-2">
                {moreMenu.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <li key={index} className="mb-2">
                      <a
                        href={item.link}
                        className="text-decoration-none text-dark d-flex align-items-center gap-3 p-2 rounded"
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Collapse>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default Topbar;
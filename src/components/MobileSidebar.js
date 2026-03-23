"use client";

import { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  Button,
} from "reactstrap";
import SidebarMobile from "./SidebarMobile";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import Link from "next/link";


const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOGGLE BUTTON */}
      <Link href="#" onClick={() => setOpen(true)} className="text-dark">
         <RiBarChartHorizontalFill size={28} />
      </Link>

      <Offcanvas
        isOpen={open}
        toggle={() => setOpen(!open)}
        direction="start"
        style={{ width: "260px" }}
      >
        <OffcanvasBody className="p-0">
          <SidebarMobile />
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default MobileSidebar;
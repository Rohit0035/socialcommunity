"use client";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import AOSWrapper from "./AOSWrapper";
import MobileBottomBar from "./MobileBottomBar";
import Topbar from "./TopBar";

const ClientLayout = ({ children }) => {
  return (
    <AOSWrapper>
      <div className="">

        <Topbar/>

        {/* DESKTOP SIDEBAR */}
        {/* <div className="d-none d-lg-block sidebar-wrap">
          <Sidebar />
        </div> */}
         <div className="sidebar-wrap">
          <Sidebar />
        </div>
        {/* MAIN AREA */}
        <div className="flex-grow-1">

          {/* MOBILE HEADER */}
          {/* <div className="d-lg-none p-2 border-bottom">
            <MobileSidebar />
          </div> */}
          {/* PAGE CONTENT */}
          <div className="page-content">
            {children}
          </div>
        </div>

      </div>
    </AOSWrapper>
  );
};

export default ClientLayout;
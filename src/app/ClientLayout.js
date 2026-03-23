"use client";

import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import AOSWrapper from "../components/AOSWrapper";

export default function ClientLayout({ children }) {
  return (
     <AOSWrapper>
    <div>

      {/* MOBILE + TABLET */}
      <div className="d-lg-none p-2 border-bottom">
        <MobileSidebar />
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="d-none d-lg-block">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="page-content">
        {children}
      </div>

    </div>
    </AOSWrapper>
  );
}


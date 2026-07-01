"use client";

import { signOut } from "next-auth/react";

export default function AdminNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div className="container-fluid">
        
        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-dark d-lg-none me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebar"
        >
          ☰
        </button>

        <h4 className="mb-0">Admin Dashboard</h4>

        <button
          className="btn btn-outline-danger"
          onClick={() =>
            signOut({ callbackUrl: "/admin/auth/login" })
          }
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
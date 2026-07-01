"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", link: "/admin/dashboard" },
  { name: "Blog Categories", link: "/admin/blog-categories" },
  { name: "Blogs", link: "/admin/blogs" },
  { name: "Blog Comments", link: "/admin/blog-comments" },
  { name: "Notice Categories", link: "/admin/notice-categories" },
  { name: "Notices", link: "/admin/notices" },
  { name: "Universities", link: "/admin/universities" },
  { name: "Courses", link: "/admin/courses" },
  { name: "Institutes", link: "/admin/institutes" },
  { name: "Packages", link: "/admin/packages" },
  { name: "Testimonials", link: "/admin/testimonials" },
  { name: "Students", link: "/admin/students" },
  { name: "Student Packages", link: "/admin/student-packages" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="bg-dark text-white p-3 d-none d-lg-block"
        style={{
          width: "250px",
          height: "100vh",
          overflowY: "auto",
          position: "sticky",
          top: 0,
        }}
      >
        <h3 className="mb-4">Admin Panel</h3>

        <ul className="nav flex-column">
          {menu.map((item, index) => {
            const isActive = pathname === item.link;

            return (
              <li className="nav-item mb-2" key={index}>
                <Link
                  href={item.link}
                  className={`nav-link ${isActive
                      ? "bg-primary text-white rounded"
                      : "text-white"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start bg-dark text-white"
        tabIndex={-1}
        id="adminSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Admin Panel</h5>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {menu.map((item, index) => {
              const isActive = pathname === item.link;

              return (
                <li className="nav-item mb-2" key={index}>
                  <Link
                    href={item.link}
                    className={`nav-link ${isActive
                        ? "bg-primary text-white rounded"
                        : "text-white"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
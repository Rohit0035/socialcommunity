"use client";

import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { sidebarMenu, moreMenu } from "./sidebarMenu";
import { signOut } from "next-auth/react";

const SidebarMobile = () => {
  return (
    <div className="mobile-sidebar" style={{ height: "100vh" }}>
      <PerfectScrollbar>
        {[...sidebarMenu, ...moreMenu].map((item, i) => {
          const Icon = item.icon;
          return (
            item.label === "Log out" ?
              <Link
                key={i}
                href='#'
                onClick={() => signOut({
                  callbackUrl: "/auth/login",
                })}
                className="d-flex align-items-center gap-3 p-3 text-dark text-decoration-none"
              >
                {Icon && <Icon />}
                <span>{item.label}</span>
              </Link> :
              <Link
                key={i}
                href={item.link}
                className="d-flex align-items-center gap-3 p-3 text-dark text-decoration-none"
              >
                {Icon && <Icon />}
                <span>{item.label}</span>
              </Link>
          );
        })}
      </PerfectScrollbar>
    </div>
  );
};

export default SidebarMobile;
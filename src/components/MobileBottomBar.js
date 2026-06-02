// MobileBottomBar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { GoPlus } from "react-icons/go";

import { sidebarMenu, createMenu } from "./sidebarMenu";

const MobileBottomBar = () => {

  const pathname = usePathname();

  return (
    <>
      <div className="ig-bottom-navbar d-flex d-md-none">

        {/* MENU WRAPPER */}
        <div className="ig-bottom-slider">

          {/* DYNAMIC MENU */}
          {sidebarMenu.map((item, index) => {

            const Icon = item.icon;

            const active = pathname === item.link;

            return (
              <Link
                key={index}
                href={item.link}
                className={`
                  ig-bottom-item
                  text-decoration-none
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                  ${active ? "active-menu" : ""}
                `}
              >
                <Icon size={24} />

                <small className="mt-1">
                  {item.label}
                </small>
              </Link>
            );
          })}

          {/* CREATE MENU */}
          <UncontrolledDropdown direction="up">

            <DropdownToggle
              color="white"
              className="
                ig-bottom-item
                border-0
                shadow-none
                d-flex
                flex-column
                align-items-center
                justify-content-center
              "
            >
              <GoPlus size={28} />

              <small className="mt-1">
                Create
              </small>
            </DropdownToggle>

            <DropdownMenu
              end
              className="
                border-0
                shadow-lg
                rounded-4
                p-2
                mb-3
              "
            >

              {createMenu.map((item, index) => {

                const Icon = item.icon;

                return (
                  <DropdownItem
                    key={index}
                    tag={Link}
                    href={item.link}
                    className="
                      d-flex
                      align-items-center
                      gap-3
                      rounded-3
                      py-3
                    "
                  >
                    <Icon size={20} />

                    <span>{item.label}</span>

                  </DropdownItem>
                );
              })}

            </DropdownMenu>

          </UncontrolledDropdown>

        </div>

      </div>

      {/* CUSTOM CSS */}
      <style jsx>{`

        .ig-bottom-navbar{
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #ffffff;
          border-top: 1px solid #e9ecef;
          padding: 10px 0;
          backdrop-filter: blur(10px);
        }

        .ig-bottom-slider{
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          overflow-x: auto;
          padding: 0 12px;
          scroll-behavior: smooth;

          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .ig-bottom-slider::-webkit-scrollbar{
          display: none;
        }

        .ig-bottom-item{
          min-width: 72px;
          color: #555;
          transition: 0.3s ease;
          padding: 8px 10px;
          border-radius: 18px;
          background: transparent;
          flex-shrink: 0;
        }

        .ig-bottom-item small{
          font-size: 10px;
          font-weight: 600;
        }

        .ig-bottom-item:hover{
          background: #f5f5f5;
          color: #000;
          transform: translateY(-2px);
        }

        .active-menu{
          background: linear-gradient(
            135deg,
            #7b61ff,
            #5b5eff
          ) !important;

          color: #fff !important;

          box-shadow: 0 8px 20px rgba(91,94,255,0.25);
        }

      `}</style>
    </>
  );
};

export default MobileBottomBar;
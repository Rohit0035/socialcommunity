"use client";

import { Nav, NavItem, NavLink } from "reactstrap";
import {
  FiRepeat,
  FiImage,
  FiCalendar,
} from "react-icons/fi";

const ActivitySidebar = ({ active, setActive }) => {

  const menus = [
    {
      key: "interactions",
      title: "Interactions",
      desc: "Review and delete likes, comments and other interactions.",
      icon: FiRepeat,
    },
    {
      key: "media",
      title: "Photos and videos",
      desc: "View, archive or delete photos and videos you've shared.",
      icon: FiImage,
    },
    {
      key: "history",
      title: "Account history",
      desc: "Review changes you've made to your account.",
      icon: FiCalendar,
    },
  ];

  return (
    <div className="border-end h-100">

      <div className="p-4 border-bottom">
        <h4 className="fw-bold mb-0">
          Your activity
        </h4>
      </div>

      <Nav vertical pills className="p-3">

        {menus.map((item) => {

          const Icon = item.icon;

          return (
            <NavItem key={item.key} className="mb-3">

              <NavLink
                active={active === item.key}
                onClick={() => setActive(item.key)}
                className="
                  d-flex
                  align-items-start
                  gap-3
                  rounded-4
                  p-3
                  cursor-pointer
                "
                style={{ cursor: "pointer" }}
              >

                <Icon size={26} />

                <div>

                  <div className="fw-semibold">
                    {item.title}
                  </div>

                  <small className="text-muted">
                    {item.desc}
                  </small>

                </div>

              </NavLink>

            </NavItem>
          );
        })}

      </Nav>

    </div>
  );
};

export default ActivitySidebar;
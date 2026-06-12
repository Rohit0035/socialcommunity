"use client";

import { Nav, NavItem, NavLink } from "reactstrap";
import {
  FiHeart,
  FiMessageCircle,
  FiRepeat,
  FiCornerUpLeft,
  FiTag,
} from "react-icons/fi";

const ActivityTabs = ({ activeTab, setActiveTab }) => {

  const tabs = [
    {
      key: "likes",
      label: "LIKES",
      icon: FiHeart,
    },
    {
      key: "comments",
      label: "COMMENTS",
      icon: FiMessageCircle,
    },
    {
      key: "reposts",
      label: "REPOSTS",
      icon: FiRepeat,
    },
    {
      key: "replies",
      label: "STORY REPLIES",
      icon: FiCornerUpLeft,
    },
    {
      key: "reviews",
      label: "REVIEWS",
      icon: FiTag,
    },
  ];

  return (
    <Nav
      pills
      className="
        flex-nowrap
        overflow-auto
        border-bottom
        pb-2
      "
    >

      {tabs.map((tab) => {

        const Icon = tab.icon;

        return (
          <NavItem key={tab.key}>

            <NavLink
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="
                d-flex
                align-items-center
                gap-2
                px-3
                py-2
                rounded-0
              "
              style={{
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >

              <Icon />

              {tab.label}

            </NavLink>

          </NavItem>
        );
      })}

    </Nav>
  );
};

export default ActivityTabs;
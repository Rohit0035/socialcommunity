"use client";

import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  FiGrid,
  FiPlayCircle,
  FiBookOpen,
} from "react-icons/fi";
import PostsTab from "./photosvideostabs/Poststab";
import ReelsTab from "./photosvideostabs/Reeltab";


const PhotosVideosTab = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    {
      id: "posts",
      label: "POSTS",
      icon: FiGrid,
    },
    {
      id: "reels",
      label: "REELS",
      icon: FiPlayCircle,
    },
    // {
    //   id: "highlights",
    //   label: "HIGHLIGHTS",
    //   icon: FiBookOpen,
    // },
  ];

  return (
    <>
      <div className="overflow-auto mb-4">
        <Nav tabs className="flex-nowrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <NavItem key={tab.id}>
                <NavLink
                  href="#"
                  active={activeTab === tab.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id);
                  }}
                  className="d-flex align-items-center gap-2 text-nowrap px-3 text-st"
                >
                  <Icon size={14} />
                  {tab.label}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="posts">
          <PostsTab/>
        </TabPane>

        <TabPane tabId="reels">
         <ReelsTab/>
        </TabPane>

        {/* <TabPane tabId="highlights">
          kuiiui
        </TabPane> */}
      </TabContent>
    </>
  );
};

export default PhotosVideosTab;
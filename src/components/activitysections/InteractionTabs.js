"use client";

import { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import {
  FiHeart,
  FiMessageCircle,
  FiRepeat,
  FiCornerUpLeft,
  FiTag,
} from "react-icons/fi";
import LikesTab from "./interactiontab/LikesTab";
import CommentsTab from "./interactiontab/CommentsTab";
import RepostsTab from "./interactiontab/RepostsTab";
import StoryRepliesTab from "./interactiontab/StoryRepliesTab";
import ReviewsTab from "./interactiontab/ReviewTab";

const InteractionTabs = () => {
  const [activeTab, setActiveTab] = useState("likes");

  const tabs = [
    { id: "likes", label: "LIKES", icon: FiHeart },
    { id: "comments", label: "COMMENTS", icon: FiMessageCircle },
    { id: "reposts", label: "REPOSTS", icon: FiRepeat },
    { id: "replies", label: "STORY REPLIES", icon: FiCornerUpLeft },
    { id: "reviews", label: "REVIEWS", icon: FiTag },
  ];

  return (
    <>
      <div className="overflow-auto">
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

      <TabContent activeTab={activeTab} className="mt-4">
        <TabPane tabId="likes">
          <LikesTab/>
        </TabPane>

        <TabPane tabId="comments">
        <CommentsTab/>
        </TabPane>

        <TabPane tabId="reposts">
           <RepostsTab/>
        </TabPane>

        <TabPane tabId="replies">
          <StoryRepliesTab/>
        </TabPane>

        <TabPane tabId="reviews">
        <ReviewsTab/>
        </TabPane>
      </TabContent>
    </>
  );
};

export default InteractionTabs;
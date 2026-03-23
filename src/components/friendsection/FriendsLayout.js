"use client";

import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import FriendsSidebar from "./FriendsSidebar";
import SuggestionsList from "./SuggestionsList";
import FriendRequests from "./FriendRequests";
import FriendsList from "./FriendsList";

export default function FriendsLayout() {
  const [activeTab, setActiveTab] = useState("suggestions");

  return (
    <Container fluid className="fb-friends-wrapper">
      <Row>
        {/* Sidebar - Desktop & Tablet */}
        <Col md="3" className="d-none d-md-block fb-sidebar-col">
          <FriendsSidebar setActiveTab={setActiveTab} />
        </Col>

        {/* Main Content */}
        <Col xs="12" md="9" className="fb-content-col">
          {/* Mobile Header */}
          <div className="fb-mobile-header d-md-none">
            {activeTab !== "suggestions" && (
              <button
                className="fb-back-btn"
                onClick={() => setActiveTab("suggestions")}
              >
                ←
              </button>
            )}
            <h6 className="fb-mobile-title">Friends</h6>
          </div>

          {activeTab === "suggestions" && <SuggestionsList />}
          {activeTab === "requests" && <FriendRequests />}
          {activeTab === "friends" && <FriendsList />}
        </Col>
      </Row>
    </Container>
  );
}
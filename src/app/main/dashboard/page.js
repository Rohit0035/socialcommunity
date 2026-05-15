"use client";

import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import classNames from "classnames";

import {
  FaPaperPlane,
  FaBullhorn,
  FaChartLine,
  FaCreditCard,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

import DashboardStats from "@/components/dashboardsection/DashboardStatus";
import FollowersChart from "@/components/dashboardsection/FollowersChart";
import TopPosts from "@/components/dashboardsection/TopPosts";
import ManageAds from "@/components/dashboardsection/ManageAds";

const DashboardPage = () => {

  const [activeTab, setActiveTab] = useState("insights");

  return (
    <section className="bg-light min-vh-100 py-4">
      <Container>
        <div
          className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4"
          data-aos="fade-down"
        >

          <div>
            <h3 className="fw-bold mb-1">
              Dashboard
            </h3>

            <p className="text-muted mb-0">
              Social media analytics overview
            </p>
          </div>
          <Nav
            pills
            className="bg-white shadow-sm rounded-pill p-1"
          >
            <NavItem>
              <NavLink
                href="#"
                onClick={() => setActiveTab("insights")}
                className={classNames(
                  "rounded-pill px-4 py-2 fw-semibold border-0",
                  {
                    "bg-dark text-white":
                      activeTab === "insights",

                    "text-dark":
                      activeTab !== "insights",
                  }
                )}
              >
                <FaChartLine className="me-2" />
                Insights
              </NavLink>

            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                onClick={() => setActiveTab("ads")}
                className={classNames(
                  "rounded-pill px-4 py-2 fw-semibold border-0",
                  {
                    "bg-primary text-white":
                      activeTab === "ads",

                    "text-dark":
                      activeTab !== "ads",
                  }
                )}
              >
                <FaBullhorn className="me-2" />
                Ad Tools
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        {/* ========================= */}
        {/* INSIGHTS TAB */}
        {/* ========================= */}

        {activeTab === "insights" && (
          <div>

            <DashboardStats />

            <Row className="g-4">

              <Col lg="7">
                <FollowersChart />
              </Col>

              <Col lg="5">

                <Card
                  className="border-0 shadow-sm rounded-4 h-100"
                  data-aos="zoom-in"
                >

                  <CardBody className="p-4 d-flex flex-column">

                    <div className="d-flex align-items-center gap-2 mb-4">

                      <FaPaperPlane className="text-primary" />

                      <h5 className="fw-bold mb-0">
                        Quick Message
                      </h5>

                    </div>

                    <textarea
                      className="form-control rounded-4 border-0 bg-light mb-3"
                      rows="6"
                      placeholder="Type your message..."
                    />

                    <Button
                      color="primary"
                      className="w-100 rounded-4 py-3 fw-semibold mt-auto"
                    >
                      Send Message
                    </Button>

                  </CardBody>

                </Card>

              </Col>

              <Col lg="12">
                <TopPosts />
              </Col>

            </Row>

          </div>
        )}

        {/* ========================= */}
        {/* ADS TAB */}
        {/* ========================= */}

        {activeTab === "ads" && (
          <ManageAds/>
        )}

      </Container>

    </section>
  );
};

export default DashboardPage;
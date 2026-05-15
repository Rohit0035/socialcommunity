"use client";

import React from "react";
import { Row, Col, Card, CardBody, Badge } from "reactstrap";

import {
  FaEye,
  FaHeart,
  FaCommentDots,
  FaBookmark,
} from "react-icons/fa";

const DashboardStats = () => {

  const stats = [
    {
      icon: <FaEye />,
      title: "Total Views",
      value: "120.5K",
      growth: "+18%",
      color: "#6C63FF",
    },
    {
      icon: <FaHeart />,
      title: "Likes",
      value: "32.1K",
      growth: "+12%",
      color: "#FF4D6D",
    },
    {
      icon: <FaCommentDots />,
      title: "Comments",
      value: "8.4K",
      growth: "+9%",
      color: "#00C897",
    },
    {
      icon: <FaBookmark />,
      title: "Saved",
      value: "5.2K",
      growth: "+15%",
      color: "#FF9F43",
    },
  ];

  return (
    <Row className="g-4 mb-4">

      {stats.map((item, index) => (
        <Col
          xl="3"
          md="6"
          key={index}
          data-aos="zoom-in"
          data-aos-delay={index * 100}
        >
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <CardBody className="p-4">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: item.color,
                    fontSize: "22px",
                  }}
                >
                  {item.icon}
                </div>

                <Badge className="bg-success-subtle text-success px-3 py-2 rounded-pill">
                  {item.growth}
                </Badge>

              </div>

              <h6 className="text-muted">
                {item.title}
              </h6>

              <h2 className="fw-bold mb-0">
                {item.value}
              </h2>

            </CardBody>
          </Card>
        </Col>
      ))}

    </Row>
  );
};

export default DashboardStats;
"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import ProBg1 from "../../assets/images/pro-bgc-1.jpg";

const dummyData = [
  { id: 1, type: "close", online: true },
  { id: 2, type: "office", online: false },
  { id: 3, type: "friend", online: true },
  { id: 4, type: "close", online: false }
];

const FriendsTab = () => {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? dummyData
      : dummyData.filter((item) => item.type === filter);

  return (
    <div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Friends</h5>

        <UncontrolledDropdown>
          <DropdownToggle outline size="sm">
            Filter
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem onClick={() => setFilter("all")}>
              All Friends
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("close")}>
              Close Friends
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("office")}>
              Office Friends
            </DropdownItem>
            <DropdownItem onClick={() => setFilter("friend")}>
              Friends
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      {/* GRID */}
      <Row>
        {filteredData.map((item) => (
          <Col lg="3" md="6" key={item.id} className="mb-4">
            <Card className="text-center shadow-sm border-0 bg-light">
              <CardBody>

                <div className="position-relative d-inline-block">
                  <Image
                    src={ProBg1}
                    alt="user"
                    className="rounded-circle mb-2"
                    style={{
                        width:'70px',
                        height:'70px',
                        borderRadius:'100px'
                    }}
                  />
                  <span
                    className={item.online ? "online-dot" : ""}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      backgroundColor: item.online ? "green" : "gray",
                      border: "2px solid #fff"
                    }}
                  ></span>
                </div>

                <h6>Kelin Jasen ❤️</h6>
                <small className="text-muted d-block">
                  kelin.jasen156@gmail.com
                </small>

                <small className="text-primary text-capitalize">
                  {item.type} friend
                </small>

                <div className="d-flex justify-content-around mt-3">
                  <div>
                    <strong>546</strong>
                    <div style={{ fontSize: "12px" }}>Following</div>
                  </div>
                  <div>
                    <strong>26335</strong>
                    <div style={{ fontSize: "12px" }}>Likes</div>
                  </div>
                  <div>
                    <strong>6845</strong>
                    <div style={{ fontSize: "12px" }}>Followers</div>
                  </div>
                </div>

                <Button color="primary" size="sm" className="mt-3">
                  View Profile
                </Button>

              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FriendsTab;
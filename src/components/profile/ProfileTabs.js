"use client";

import React, { useState } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
    Container,
    Card,
    CardBody
} from "reactstrap";
import classnames from "classnames";
import { FaUserFriends, FaImage, FaInfoCircle, FaClock, FaVideo } from "react-icons/fa";

import TimelineTab from "./TimelineTab";
import AboutTab from "./AboutTab";
import FriendsTab from "./FriendsTab";
import PhotosTab from "./PhotosTab";
import ReelsTab from "./ReelsTab";

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <section className="pt-0">
                <Container >
                    <Card className="border-0 rounded">
                        <CardBody className="py-2">
                            <div
                                className="d-flex align-items-center justify-content-between  py-2"
                                style={{ overflowX: "auto" }}
                            >
                                <Nav pills className="flex-nowrap nav-st-pro">

                                    {/* <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "1" })}
                                            onClick={() => toggle("1")}
                                        >
                                            <FaClock className="me-1" /> Timeline
                                        </NavLink>
                                    </NavItem> */}

                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "1" })}
                                            onClick={() => toggle("1")}
                                        >
                                            <FaInfoCircle className="me-1" /> About
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "3" })}
                                            onClick={() => toggle("3")}
                                        >
                                            <FaUserFriends className="me-1" /> Friends
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "4" })}
                                            onClick={() => toggle("4")}
                                        >
                                            <FaImage className="me-1" /> Photos
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "5" })}
                                            onClick={() => toggle("5")}
                                        >
                                            <FaVideo className="me-1" /> Reels
                                        </NavLink>
                                    </NavItem>

                                </Nav>

                                {/* RIGHT SIDE SEARCH */}
                                <div className="d-flex gap-2 ms-3">
                                    <input type="text" className="form-control" placeholder="Search here..." size="sm" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>


                    {/* TAB CONTENT */}

                    <Card className="mt-3 border-0 rounded">
                        <CardBody>
                            <TabContent activeTab={activeTab}>
                                {/* <TabPane tabId="1">
                                    <TimelineTab />
                                </TabPane> */}

                                <TabPane tabId="1">
                                    <AboutTab />
                                </TabPane>

                                <TabPane tabId="3">
                                    <FriendsTab />
                                </TabPane>

                                <TabPane tabId="4">
                                    <PhotosTab />
                                </TabPane>
                                 <TabPane tabId="5">
                                    <ReelsTab />
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>


                </Container>
            </section>
        </>

    );
};

export default ProfileTabs;
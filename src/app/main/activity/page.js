"use client";

import { useState } from "react";
import {
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    CardBody,
    Container,
} from "reactstrap";
import { FiRepeat, FiImage, FiCalendar } from "react-icons/fi";
import "../../../assets/styles/custom.css"
import InteractionTabs from "@/components/activitysections/InteractionTabs";
import CommentsTab from "@/components/activitysections/interactiontab/CommentsTab";
import PhotosVideosTab from "@/components/activitysections/PhotosVideosTab";
import AccountHistoryTab from "@/components/activitysections/AccountHistoryTab";

const ActivityPage = () => {
    const [activeTab, setActiveTab] = useState("1");

    const tabs = [
        {
            id: "1",
            icon: <FiRepeat size={22} />,
            title: "Interactions",
            description:
                "Review and delete likes, comments, and your other interactions.",
        },
        {
            id: "2",
            icon: <FiImage size={22} />,
            title: "Photos and videos",
            description:
                "View, archive or delete photos and videos you've shared.",
        },
        {
            id: "3",
            icon: <FiCalendar size={22} />,
            title: "Account history",
            description:
                "Review changes you've made to your account since you created it.",
        },
    ];

    return (
        <>
            <section className="py-3">
                <Container>
                    <Card className="border-0">
                        <CardBody>
                            <h4 className="fw-bold mb-4">Your activity</h4>
                            <Row>
                                <Col xs="12" md="3" lg="3" className="mb-3 mb-md-0">
                                    <Nav vertical pills>
                                        {tabs.map((tab) => (
                                            <NavItem key={tab.id}>
                                                <NavLink
                                                    href="#"
                                                    active={activeTab === tab.id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setActiveTab(tab.id);
                                                    }}
                                                    className="d-flex align-items-start gap-3 border rounded p-3 mb-2 text-dark"
                                                >
                                                    <span>{tab.icon}</span>

                                                    <div>
                                                        <div className="fw-semibold">{tab.title}</div>
                                                        <small className="">
                                                            {tab.description}
                                                        </small>
                                                    </div>
                                                </NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>
                                </Col>
                                <Col xs="12" md="9" lg="9">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <InteractionTabs/>
                                        </TabPane>

                                        <TabPane tabId="2">
                                           <PhotosVideosTab/>
                                        </TabPane>

                                        <TabPane tabId="3">
                                           <AccountHistoryTab/>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </section>
        </>

    );
};

export default ActivityPage;
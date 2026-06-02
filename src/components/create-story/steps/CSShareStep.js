"use client";

import { useState } from "react";

import Select from "react-select";

import {
    Row,
    Col,
    Button,
    Input,
    Label,
    FormGroup,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
} from "reactstrap";

import {
    FiUsers,
    FiLink,
    FiClock,
} from "react-icons/fi";

const CSShareStep = ({
    storyMedia,
    selectedFilter,
    prevStep,
}) => {

    const [open, setOpen] = useState("");

    const [storyLink, setStoryLink] =
        useState("");

    const [allowReplies, setAllowReplies] =
        useState(true);

    const [allowReactions, setAllowReactions] =
        useState(true);

    const [shareFacebook, setShareFacebook] =
        useState(false);

    const [scheduleDate, setScheduleDate] =
        useState("");

    const [selectedAudience, setSelectedAudience] =
        useState({
            value: "story",
            label: "Your Story",
        });

    const [selectedUsers, setSelectedUsers] =
        useState([]);

    const toggle = (id) => {
        setOpen(open === id ? "" : id);
    };

    const audienceOptions = [
        {
            value: "story",
            label: "Your Story",
        },
        {
            value: "close_friends",
            label: "Close Friends",
        },
    ];

    const userOptions = [
        {
            value: "rohit",
            label: "@rohit_sen",
        },
        {
            value: "alex",
            label: "@alex_king",
        },
        {
            value: "john",
            label: "@john_doe",
        },
        {
            value: "rahul",
            label: "@rahul_dev",
        },
    ];

    return (
        <Row className="g-0">


            <Col lg="6">

                <div className="cs-final-preview-wrap">

                    <div className="cs-phone-preview">

                        {storyMedia?.type?.includes("video") ? (

                            <video
                                controls
                                className="cs-story-media"
                                style={{
                                    filter: selectedFilter,
                                }}
                            >
                                <source
                                    src={storyMedia.preview}
                                />
                            </video>

                        ) : (

                            <img
                                src={storyMedia.preview}
                                alt=""
                                className="cs-story-media"
                                style={{
                                    filter: selectedFilter,
                                }}
                            />

                        )}

                    </div>

                </div>

            </Col>

            <Col lg="6">

                <div className="cs-share-panel">
                    <Row>
                        <Col md="6">
                            <div className="cs-setting-title">
                                <FiUsers />
                                <span>
                                    Audience
                                </span>
                            </div>
                            <Select
                                value={selectedAudience}
                                options={audienceOptions}
                                onChange={setSelectedAudience}
                            />
                        </Col>
                        <Col md="6">
                            <div className="cs-setting-title mt-4">
                                <FiUsers />
                                <span>
                                    Mention Users
                                </span>
                            </div>
                            <Select
                                isMulti
                                isSearchable
                                value={selectedUsers}
                                options={userOptions}
                                onChange={setSelectedUsers}
                            />
                        </Col>
                        <Col md="6">
                            <div className="cs-setting-title mt-4">
                                <FiLink />
                                <span>
                                    Story Link
                                </span>
                            </div>
                            <Input
                                value={storyLink}
                                onChange={(e) =>
                                    setStoryLink(
                                        e.target.value
                                    )
                                }
                                placeholder="https://"
                            />
                        </Col>
                        <Col md="6">
                            <div className="cs-setting-title mt-4">
                                <FiClock />
                                <span>
                                    Schedule Story
                                </span>
                            </div>
                            <Input
                                type="datetime-local"
                                value={scheduleDate}
                                onChange={(e) =>
                                    setScheduleDate(
                                        e.target.value
                                    )
                                }
                            />
                        </Col>
                        <Col md="12">
                            <Accordion
                                open={open}
                                toggle={toggle}
                                className="mt-4"
                            >

                                <AccordionItem>

                                    <AccordionHeader targetId="1">
                                        Story Settings
                                    </AccordionHeader>

                                    <AccordionBody accordionId="1">

                                        <FormGroup switch>

                                            <Input
                                                type="switch"
                                                checked={
                                                    allowReplies
                                                }
                                                onChange={() =>
                                                    setAllowReplies(
                                                        !allowReplies
                                                    )
                                                }
                                            />

                                            <Label check>
                                                Allow Replies
                                            </Label>

                                        </FormGroup>

                                        <FormGroup switch>

                                            <Input
                                                type="switch"
                                                checked={
                                                    allowReactions
                                                }
                                                onChange={() =>
                                                    setAllowReactions(
                                                        !allowReactions
                                                    )
                                                }
                                            />

                                            <Label check>
                                                Allow Reactions
                                            </Label>

                                        </FormGroup>

                                    </AccordionBody>

                                </AccordionItem>

                            </Accordion>
                        </Col>
                        <Col md="12">
                            <div className="cs-share-footer">

                                <Button
                                    color="secondary"
                                    outline
                                    onClick={prevStep}
                                >
                                    Back
                                </Button>

                                <Button color="primary">
                                    Share Story
                                </Button>

                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default CSShareStep;
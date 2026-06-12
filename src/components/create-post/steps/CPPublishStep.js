"use client";

import { useState } from "react";
import Select from "react-select";

import {
    Row,
    Col,
    Input,
    Button,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody,
    FormGroup,
    Label,
} from "reactstrap";

import {
    FiMapPin,
    FiUserPlus,
} from "react-icons/fi";

const CPPublishStep = ({
    media,
    prevStep,
}) => {

    const [open, setOpen] = useState("");

    const [caption, setCaption] = useState("");

    const [altText, setAltText] = useState("");

    const [selectedLocation, setSelectedLocation] =
        useState(null);

    const [
        selectedCollaborators,
        setSelectedCollaborators,
    ] = useState([]);

    const [hideLikes, setHideLikes] =
        useState(false);

    const [turnOffComments, setTurnOffComments] =
        useState(false);

    const [shareThreads, setShareThreads] =
        useState(true);

    const [shareFacebook, setShareFacebook] =
        useState(false);

    const toggle = (id) => {
        setOpen(open === id ? "" : id);
    };

    const locationOptions = [
        {
            value: "bangalore",
            label: "Bangalore",
        },
        {
            value: "mumbai",
            label: "Mumbai",
        },
        {
            value: "delhi",
            label: "Delhi",
        },
        {
            value: "hyderabad",
            label: "Hyderabad",
        },
        {
            value: "chennai",
            label: "Chennai",
        },
    ];

    const collaboratorOptions = [
        {
            value: "test",
            label: "@test",
        },
        {
            value: "john",
            label: "@john_doe",
        },
        {
            value: "alex",
            label: "@alex_king",
        },
        {
            value: "rahul",
            label: "@rahul_dev",
        },
        {
            value: "amit",
            label: "@amit_ui",
        },
    ];

    return (
        <Row className="g-0">


            <Col lg="6">

                <div className="cp-final-left">

                    {media?.type?.includes("video") ? (
                        <video
                            controls
                            className="cp-final-preview"
                        >
                            <source src={media.preview} />
                        </video>
                    ) : (
                        <img
                            src={media?.preview}
                            alt=""
                            className="cp-final-preview"
                        />
                    )}

                </div>

            </Col>

            <Col lg="6">
                <div className="cp-final-right">
                    <Row>
                        <Col md="12">
                            <Input
                                type="textarea"
                                rows={3}
                                maxLength={2200}
                                value={caption}
                                placeholder="Write a caption..."
                                className="cp-caption"
                                onChange={(e) =>
                                    setCaption(e.target.value)
                                }
                            />

                            <div className="text-end small text-muted mt-1">
                                {caption.length}/2200
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="cp-setting-title">
                                <FiMapPin />
                                <span>Add Location</span>
                            </div>
                            <Select
                                options={locationOptions}
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                                isSearchable
                                placeholder="Search location..."
                                className="mb-3"
                            />
                        </Col>
                        <Col md="6">
                            <div className="cp-setting-title">
                                <FiUserPlus />
                                <span>Add Collaborators</span>
                            </div>
                            <Select
                                isMulti
                                isSearchable
                                options={collaboratorOptions}
                                value={selectedCollaborators}
                                onChange={
                                    setSelectedCollaborators
                                }
                                placeholder="Search collaborators..."
                            />
                        </Col>
                       
                    </Row>

                    <Accordion
                        open={open}
                        toggle={toggle}
                        className="mt-4"
                    >


                        <AccordionItem>

                            <AccordionHeader targetId="1">
                                Accessibility
                            </AccordionHeader>

                            <AccordionBody accordionId="1">

                                <p className="small text-muted">

                                    Alt text describes your
                                    photos for people with
                                    visual impairments.

                                </p>

                                <Input
                                    type="textarea"
                                    rows={3}
                                    value={altText}
                                    placeholder="Write alt text..."
                                    onChange={(e) =>
                                        setAltText(
                                            e.target.value
                                        )
                                    }
                                />

                            </AccordionBody>

                        </AccordionItem>


                        <AccordionItem>

                            <AccordionHeader targetId="2">
                                Advanced Settings
                            </AccordionHeader>

                            <AccordionBody accordionId="2">

                                <FormGroup
                                    switch
                                    className="mb-3"
                                >

                                    <Input
                                        type="switch"
                                        checked={hideLikes}
                                        onChange={() =>
                                            setHideLikes(
                                                !hideLikes
                                            )
                                        }
                                    />

                                    <Label check>
                                        Hide like and view
                                        counts on this post
                                    </Label>

                                </FormGroup>

                                <FormGroup
                                    switch
                                    className="mb-3"
                                >

                                    <Input
                                        type="switch"
                                        checked={
                                            turnOffComments
                                        }
                                        onChange={() =>
                                            setTurnOffComments(
                                                !turnOffComments
                                            )
                                        }
                                    />

                                    <Label check>
                                        Turn off commenting
                                    </Label>

                                </FormGroup>

                            </AccordionBody>

                        </AccordionItem>

                    </Accordion>
                    <div className="cp-footer-actions">
                        <Button
                            color="secondary"
                            outline
                            onClick={prevStep}
                        >
                            Back
                        </Button>

                        <Button color="primary">
                            Share Post
                        </Button>

                    </div>

                </div>

            </Col>

        </Row>
    );
};

export default CPPublishStep;
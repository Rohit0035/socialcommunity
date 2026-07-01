"use client";

import { useEffect, useState } from "react";
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
    Card,
    CardBody,
} from "reactstrap";

import {
    FiMapPin,
    FiUserPlus,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const CPPublishStep = ({
    media,
    setMedia,
    selectedFilter,
    setSelectedFilter,
    nextStep,
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
    const [loading, setLoading] = useState(false);

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

    const [collaborators, setCollaborators] = useState([]);
      const [loadingUser, setLoadingUser] = useState(null);
    
      const fetchCollaborators = async () => {
        try {
          const response = await axios.get("/api/users/collaborators");
          setCollaborators(response.data.map((u) => ({ value: u._id, label: u.username })));
        } catch (error) {
          toast.error("Something went wrong");
          console.log(error);
        }
      };
      useEffect(() => {
        fetchCollaborators();
      }, []);

    const handleSharePost = async () => {
        console.log("Button clicked");
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("media", media.file);
            formData.append("filter", selectedFilter);
            formData.append("caption", caption);
            formData.append("location", selectedLocation);
            formData.append(
                "collaborators",
                JSON.stringify(
                    selectedCollaborators.map((u) => u.value)
                )
            );
            formData.append("altText", altText);

            formData.append(
                "hideLikeAndViewCount",
                hideLikes
            );
            formData.append(
                "turnOffCommenting",
                turnOffComments
            );

            await axios.post(
                `/api/posts`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Post published successfully");

            setMedia(null);
            setSelectedFilter(null);
            setCaption("");
            setAltText("");
            setSelectedLocation(null);
            setSelectedCollaborators([]);
            setHideLikes(false);
            setTurnOffComments(false);
            nextStep();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="cp-post-card">
            <div className="cp-filter-header">
                <Button
                    color="link"
                    onClick={prevStep}
                    className="text-decoration-none"
                >
                    Back
                </Button>

                <h5>{media?.type?.includes("video") ? "New Reel" : "Create New Post"}</h5>

                <span className="text-muted">

                </span>
            </div>
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
                                    options={collaborators}
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

                            <Button color="primary" type="button" onClick={handleSharePost} >
                                {loading ? "Sharing..." : "Share Post"}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default CPPublishStep;
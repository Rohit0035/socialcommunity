"use client";

import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "reactstrap";

import {
    FaUser,
    FaBirthdayCake,
    FaPhone,
    FaVenusMars,
    FaHeart,
    FaMapMarkerAlt,
    FaTint,
    FaEnvelope,
    FaGlobe,
    FaCalendar,
    FaEdit
} from "react-icons/fa";

import AOS from "aos";

const AboutTab = () => {

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const [modal, setModal] = useState(false);
    const [section, setSection] = useState("");

    const toggle = () => setModal(!modal);

    const openModal = (type) => {
        setSection(type);
        setModal(true);
    };

    const [form, setForm] = useState({
        about: "Hello, I'm Kelin Jasen, Web Developer based in Paris.",
        birthday: "27 Aug 1994",
        phone: "+91 985245210",
        gender: "Male",
        relationship: "Single",
        location: "London",
        blood: "A+",
        email: "kelin@gmail.com",
        website: "www.website.com",
        joined: "June 20, 2010",

        hobbies: "Gym, Charity, Travel",
        movies: "Avengers, Harry Potter",
        books: "Atomic Habits",
        games: "PUBG, Valorant",
        bands: "Coldplay",
        series: "Breaking Bad",
        interests: "Blogging, Yoga",

        junior: "Lopez & Zhang Architects (2018–Present)",
        intern: "Goldberg & Richards (2015–2018)",
        master: "Woodbury University (2013–2015)",
        bachelor: "Woodbury University (2009–2013)"
    });

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const renderFields = () => {
        switch (section) {

            case "about":
                return (
                    <>
                        <Input className="mb-2" value={form.about} onChange={(e) => handleChange("about", e.target.value)} placeholder="About" />
                        <Input className="mb-2" value={form.birthday} onChange={(e) => handleChange("birthday", e.target.value)} placeholder="Birthday" />
                        <Input className="mb-2" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="Phone" />
                        <Input className="mb-2" value={form.gender} onChange={(e) => handleChange("gender", e.target.value)} placeholder="Gender" />
                        <Input className="mb-2" value={form.relationship} onChange={(e) => handleChange("relationship", e.target.value)} placeholder="Relationship" />
                        <Input className="mb-2" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="Location" />
                        <Input className="mb-2" value={form.blood} onChange={(e) => handleChange("blood", e.target.value)} placeholder="Blood Group" />
                        <Input className="mb-2" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Email" />
                        <Input className="mb-2" value={form.website} onChange={(e) => handleChange("website", e.target.value)} placeholder="Website" />
                        <Input className="mb-2" value={form.joined} onChange={(e) => handleChange("joined", e.target.value)} placeholder="Joined Date" />
                    </>
                );

            case "hobbies":
                return (
                    <>
                        <Input className="mb-2" value={form.hobbies} onChange={(e) => handleChange("hobbies", e.target.value)} placeholder="Hobbies" />
                        <Input className="mb-2" value={form.movies} onChange={(e) => handleChange("movies", e.target.value)} placeholder="Movies" />
                        <Input className="mb-2" value={form.books} onChange={(e) => handleChange("books", e.target.value)} placeholder="Books" />
                        <Input className="mb-2" value={form.games} onChange={(e) => handleChange("games", e.target.value)} placeholder="Games" />
                        <Input className="mb-2" value={form.bands} onChange={(e) => handleChange("bands", e.target.value)} placeholder="Bands" />
                        <Input className="mb-2" value={form.series} onChange={(e) => handleChange("series", e.target.value)} placeholder="Series" />
                        <Input className="mb-2" value={form.interests} onChange={(e) => handleChange("interests", e.target.value)} placeholder="Other Interests" />
                    </>
                );

            case "education":
                return (
                    <>
                        <Input className="mb-2" value={form.junior} onChange={(e) => handleChange("junior", e.target.value)} placeholder="Junior Architect" />
                        <Input className="mb-2" value={form.intern} onChange={(e) => handleChange("intern", e.target.value)} placeholder="Intern" />
                        <Input className="mb-2" value={form.master} onChange={(e) => handleChange("master", e.target.value)} placeholder="Master Degree" />
                        <Input className="mb-2" value={form.bachelor} onChange={(e) => handleChange("bachelor", e.target.value)} placeholder="Bachelor Degree" />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Row>

                <Col lg="4">
                    <Card data-aos="zoom-in" className="border-0 bg-light rounded">
                        <CardBody>

                            <div className="d-flex justify-content-between mb-3">
                                <h6>About</h6>
                                <FaEdit onClick={() => openModal("about")} style={{ cursor: "pointer" }} />
                            </div>

                            <p className="small">{form.about}</p>
                            <p className="small">{form.birthday}</p>
                            <p className="small">{form.phone}</p>
                            <p className="small">{form.gender}</p>
                            <p className="small">{form.relationship}</p>
                            <p className="small">{form.location}</p>
                            <p className="small">{form.blood}</p>
                            <p className="small">{form.email}</p>
                            <p className="small">{form.website}</p>
                            <p className="small">{form.joined}</p>

                        </CardBody>
                    </Card>
                </Col>

                <Col lg="8">

                    <Card className="mb-3 border-0 rounded bg-light" data-aos="zoom-in">
                        <CardBody>
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Hobbies & Interest</h6>
                                <FaEdit onClick={() => openModal("hobbies")} style={{ cursor: "pointer" }} />
                            </div>

                            <p className="small">{form.hobbies}</p>
                            <p className="small">{form.movies}</p>
                            <p className="small">{form.books}</p>
                            <p className="small">{form.games}</p>
                            <p className="small">{form.bands}</p>
                            <p className="small">{form.series}</p>
                            <p className="small">{form.interests}</p>

                        </CardBody>
                    </Card>

                    <Card data-aos="zoom-in" className="border-0 bg-light">
                        <CardBody>
                            <div className="d-flex justify-content-between mb-3">
                                <h6>Education & Work</h6>
                                <FaEdit onClick={() => openModal("education")} style={{ cursor: "pointer" }} />
                            </div>

                            <p className="small">{form.junior}</p>
                            <p className="small">{form.intern}</p>
                            <p className="small">{form.master}</p>
                            <p className="small">{form.bachelor}</p>

                        </CardBody>
                    </Card>

                </Col>

            </Row>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Edit {section}
                </ModalHeader>

                <ModalBody>
                    {renderFields()}
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Save</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AboutTab;
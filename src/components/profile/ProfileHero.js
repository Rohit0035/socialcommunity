"use client";

import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { FaEdit, FaCamera } from "react-icons/fa";
import AOS from "aos";
import "../../assets/styles/profile.css"
import EditProfileModal from "./EditProfileModal";
import GalleryModal from "./GalleryModal";
import ProBg1 from "../../assets/images/pro-bgc-1.jpg";
import Image from "next/image";


const ProfileHero = () => {
    const [profileModal, setProfileModal] = useState(false);
    const [galleryModal, setGalleryModal] = useState(false);

    const [coverImage, setCoverImage] = useState(ProBg1);

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgURL = URL.createObjectURL(file);
            setCoverImage(imgURL);
        }
    };

    const handleRemove = () => {
        setCoverImage(ProBg1);
    };

    return (
        <>
            <section className="pt-3 pb-3">
                <Container>
                    <div className="profile-hero">
                        <div
                            className="cover rounded"
                            style={{
                                backgroundImage: `url(${coverImage})`,
                               
                            }}

                        >
                            <div className="overlay rounded" />

                             <Row>
                                <Col md="4">
                                    <div className="profile-card shadow m-3" data-aos="zoom-in">
                                        <Image
                                            src={ProBg1}
                                            className="avatar mx-auto"
                                            alt="profile"
                                            style={{
                                                height: '100px',
                                                width: '100px',
                                                borderRadius: '100px'
                                            }}
                                        />

                                        <h5 className="mt-3">king_fitness888 ❤️</h5>

                                        <p className="text-muted small">
                                            Pradeep Nirgude
                                        </p>

                                        <Row className="text-center stats">
                                            <Col>
                                                <strong>546</strong>
                                                <p>Following</p>
                                            </Col>
                                            <Col>
                                                <strong>26335</strong>
                                                <p>Likes</p>
                                            </Col>
                                            <Col>
                                                <strong>6845</strong>
                                                <p>Followers</p>
                                            </Col>
                                        </Row>

                                        <Button
                                            color="primary"
                                            className="mt-3"
                                            onClick={() => setProfileModal(true)}
                                        >
                                            <FaEdit /> Edit Profile
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <UncontrolledDropdown className="cover-edit">
                                <DropdownToggle color="primary" size="sm">
                                    <FaCamera /> Edit Cover
                                </DropdownToggle>

                                <DropdownMenu className="stp-drop"> 
                                    <DropdownItem onClick={() => setGalleryModal(true)} className="small">
                                        Choose from Gallery
                                    </DropdownItem>

                                    <DropdownItem className="small">
                                        <label className="w-100 m-0">
                                            Upload Photo
                                            <input type="file" hidden onChange={handleUpload} />
                                        </label>
                                    </DropdownItem>

                                    <DropdownItem onClick={handleRemove} className="small">
                                        Remove
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>

                    </div>
                    <EditProfileModal
                        isOpen={profileModal}
                        toggle={() => setProfileModal(!profileModal)}
                    />
                    <GalleryModal
                        isOpen={galleryModal}
                        toggle={() => setGalleryModal(!galleryModal)}
                        setCoverImage={setCoverImage}
                    />
                </Container>
            </section>
        </>
    );
};

export default ProfileHero;
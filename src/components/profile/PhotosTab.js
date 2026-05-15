"use client";

import React, { useState, useRef } from "react";
import { Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, Input } from "reactstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import ProBg1 from "../../assets/images/pro-bgc-1.jpg";
import ProBg2 from "../../assets/images/pro-bgc-2.jpg";

const PhotosTab = () => {
    const fileInputRef = useRef(null);

    const [images, setImages] = useState([
        ProBg1,
        ProBg2,
        ProBg1,
        ProBg2,
    ]);

    const [selected, setSelected] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const [postModal, setPostModal] = useState(false);
    const [caption, setCaption] = useState("");
    const [tags, setTags] = useState("");

    const handleAddClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImage = URL.createObjectURL(file);
        setImages([{ src: newImage }, ...images]);
    };

    const toggleSelect = (i) => {
        setSelected((prev) =>
            prev.includes(i)
                ? prev.filter((id) => id !== i)
                : [...prev, i]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === images.length) {
            setSelected([]);
        } else {
            setSelected(images.map((_, i) => i));
        }
    };

    const handleDelete = () => {
        const newImages = images.filter((_, i) => !selected.includes(i));
        setImages(newImages);
        setSelected([]);
    };

    const handlePost = () => {
        if (!caption.trim()) {
            alert("Caption is required");
            return;
        }

        console.log("Posting:", {
            images: selected,
            caption,
            tags,
        });

        setPostModal(false);
        setCaption("");
        setTags("");
        setSelected([]);
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={handleSelectAll} className="btn-sm btn-dark">
                    {selected.length === images.length ? "Unselect All" : "Select All"}
                </Button>

                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                    <DropdownToggle caret color="dark">
                        Actions
                    </DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem onClick={handleDelete}>Delete</DropdownItem>
                        <DropdownItem onClick={() => setPostModal(true)}>Post</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <Row>
                <Col lg="3" md="6" sm="6" xs="6" className="mb-3">
                    <div
                        onClick={handleAddClick}
                        style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "10px",
                            border: "2px dashed #ccc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <FiImage size={30} />
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Col>
                {images.map((img, i) => (
                    <Col lg="3" md="6" sm="6" xs="6" key={i} className="mb-3">
                        <div style={{ position: "relative" }}>
                            <input
                                type="checkbox"
                                checked={selected.includes(i)}
                                onChange={() => toggleSelect(i)}
                                style={{
                                    position: "absolute",
                                    top: "8px",
                                    left: "8px",
                                    zIndex: 2,
                                    width: "18px",
                                    height: "18px"
                                }}
                            />
                            <Image
                                src={img.src || img}
                                alt="photo"
                                width={100}
                                height={100}
                                onClick={() => {
                                    setIndex(i);
                                    setOpen(true);
                                }}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    border: selected.includes(i) ? "3px solid #007bff" : "none"
                                }}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={images.map((img) => ({
                    src: img.src || img
                }))}
            />
            <Modal isOpen={postModal} toggle={() => setPostModal(false)} centered>
                <ModalBody>
                    <h5>Create Post</h5>

                    <div className="mb-2">
                        <Input
                            placeholder="Write caption..."
                            type="textarea"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    <div className="mb-2">
                        <Input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            style={{ width: "100%", padding: "8px" }}
                        />
                    </div>

                    <Button color="primary" onClick={handlePost}>
                        Post
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
};

export default PhotosTab;
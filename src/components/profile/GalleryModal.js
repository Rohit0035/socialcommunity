"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button
} from "reactstrap";

import ProBg1 from "../../assets/images/pro-bgc-1.jpg";
import ProBg2 from "../../assets/images/pro-bgc-2.jpg";
import Image from "next/image";

const images = [ProBg1, ProBg2];

const GalleryModal = ({ isOpen, toggle, setCoverImage }) => {
  const [selected, setSelected] = useState(null);

  const handleApply = () => {
    if (selected) {
      setCoverImage(selected.src); // ✅ FIX
      toggle();
    }
  };

  return (
    <Modal size="lg" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        Choose Image
      </ModalHeader>

      <ModalBody>
        <Row>
          {images.map((img, i) => (
            <Col sm="6" md="3" key={i}>
              <Image
                src={img.src}   // ✅ FIX
                alt="gallery"
                width={100}
                height={100}
                className={`img-fluid mb-3 w-100 rounded ${
                  selected === img ? "border border-primary" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(img)}
              />
            </Col>
          ))}
        </Row>

        <div className="text-end">
          <Button color="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default GalleryModal;
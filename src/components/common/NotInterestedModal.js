"use client";

import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Link from "next/link";
import { FaTimes, FaChevronRight } from "react-icons/fa";

const NotInterestedModal = ({ isOpen, toggle, onSelect }) => {
  const reasons = [
    "It's irrelevant",
    "I've just seen too many ads recently",
    "I already bought an item in this ad",
    "I see similar ads too often",
    "It's inappropriate",
    "Something else"
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody className="p-0">

        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <FaTimes onClick={toggle} style={{ cursor: "pointer" }} />
          <strong className="text-center w-100">What made this ad uninteresting?</strong>
          <div style={{ width: "20px" }}></div>
        </div>

        {/* LIST */}
        {reasons.map((item, i) => (
          <Link href="#" key={i} className="text-dark text-decoration-none">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom"
              onClick={() => onSelect(item)}
              style={{ cursor: "pointer" }}
            >
              <span>{item}</span>
              <FaChevronRight size={12} />
            </div>
          </Link>
        ))}

      </ModalBody>
    </Modal>
  );
};

export default NotInterestedModal;
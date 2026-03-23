"use client";

import React from "react";
import { Modal, ModalBody } from "reactstrap";
import Link from "next/link";
import { FaTimes, FaChevronRight } from "react-icons/fa";

const ReportAdsModal = ({ isOpen, toggle, onSelect }) => {
  const reasons = [
    "I find it offensive",
    "It's spam",
    "It's sexually inappropriate",
    "It's a scam or it's misleading",
    "It's violent or prohibited content",
    "It refers to a political candidate or issue",
    "It violates my intellectual property rights",
    "This account is pretending to be another account"
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody className="p-0">

        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <FaTimes onClick={toggle} style={{ cursor: "pointer" }} />
          <strong className="text-center w-100">
            Why are you reporting this ad?
          </strong>
          <div style={{ width: "20px" }}></div>
        </div>

        {/* LIST */}
        {reasons.map((item, i) => (
          <Link href="#" key={i} className="text-dark text-decoration-none">
            <div
              className="d-flex justify-content-between align-items-center p-3 border-bottom"
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(item)}
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

export default ReportAdsModal;
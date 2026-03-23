"use client";

import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { FaCheckCircle } from "react-icons/fa";

const ReportConfirmModal = ({ isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalBody className="text-center p-4">
                <FaCheckCircle size={45} className="mb-3" color="green" />

                <h5 className="mb-2">Report submitted</h5>
                <p className="text-muted">
                    Thanks for letting us know. We'll review this ad.
                </p>

                <Button color="primary" onClick={toggle}>
                    Done
                </Button>

            </ModalBody>
        </Modal>
    );
};

export default ReportConfirmModal;
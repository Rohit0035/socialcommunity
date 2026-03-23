"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Modal, ModalBody, Button } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalBody className="text-center p-4">

         <FaCheckCircle size={45} className="mb-3" color="green"/>

        <h5 className="mb-3">Thanks for your feedback</h5>
        <p className="text-muted">
          We'll show you fewer ads like this.
        </p>

        <Button color="primary" onClick={toggle}>
          Done
        </Button>

      </ModalBody>
    </Modal>
  );
};

export default ConfirmationModal;
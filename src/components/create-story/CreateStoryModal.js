"use client";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateStoryWizard from "./CreateStoryWizard";

const CreateStoryModal = ({
  showCreateStoryModal,
  handleCloseCreateStoryModal,
}) => {
  return (
    <Modal
      isOpen={showCreateStoryModal}
      toggle={handleCloseCreateStoryModal}
      size="xl"
      centered
    >
      <ModalHeader toggle={handleCloseCreateStoryModal}>
        Create Story
      </ModalHeader>

      <ModalBody>
        <CreateStoryWizard />
      </ModalBody>
    </Modal>
  );
};

export default CreateStoryModal;
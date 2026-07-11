"use client";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateStoryWizard from "./CreateStoryWizard";

const CreateStoryModal = ({
	showCreateStoryModal,
	handleCloseCreateStoryModal,
	fetchStories
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
				<CreateStoryWizard showCreateStoryModal={showCreateStoryModal} handleCloseCreateStoryModal={handleCloseCreateStoryModal} fetchStories={fetchStories}/>
			</ModalBody>
		</Modal>
	);
};

export default CreateStoryModal;
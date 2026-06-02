import { Modal, ModalHeader, ModalBody } from "reactstrap";

const PostModal = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle}>Create Post</ModalHeader>
      <ModalBody>
        <h5>Post Form</h5>
        <p>Add your post content or form here.</p>
      </ModalBody>
    </Modal>
  );
};

export default PostModal;
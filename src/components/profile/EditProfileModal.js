"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label
} from "reactstrap";

import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaMapMarkerAlt,
  FaTrash,
  FaPlus,
  FaEdit
} from "react-icons/fa";
import Image from "next/image";
import ProBg1 from "../../assets/images/pro-bgc-1.jpg";

const EditProfileModal = ({ isOpen, toggle }) => {
  const [profileImage, setProfileImage] = useState("/profile.jpg");

  const [work, setWork] = useState([""]);
  const [education, setEducation] = useState([""]);
  const [cities, setCities] = useState([""]);

  const [relationship, setRelationship] = useState("Single");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (list, setList, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const handleAdd = (list, setList) => {
    setList([...list, ""]);
  };

  const handleRemove = (list, setList, index) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
  };

  return (
    <Modal  isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <Label className="fw-bold">
            Edit Profile Image
          </Label>

          <div className="d-flex align-items-center mt-2">
            <Image
              src={ProBg1}
              alt="profile"
              style={{
                 width:'80px',
                 height:'80px',
                 borderRadius:'100px'
              }}
              className="rounded-circle me-3"
            />
            <label className="btn btn-primary btn-sm mb-0">
              <FaEdit /> Edit Image
              <input type="file" hidden onChange={handleImageChange} />
            </label>
          </div>
        </div>
        <hr />
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <Label className="fw-bold">
              Work Details
            </Label>

            <Button
              size="sm"
              color="primary"
              onClick={() => handleAdd(work, setWork)}
            >
              <FaPlus /> Add Work
            </Button>
          </div>

          {work.map((item, index) => (
            <Row key={index} className="mt-2">
              <Col md="10">
                <Input
                  value={item}
                  placeholder="e.g. UX Designer at Google"
                  onChange={(e) =>
                    handleChange(work, setWork, index, e.target.value)
                  }
                />
              </Col>

              <Col md="2">
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleRemove(work, setWork, index)}
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}
        </div>

        <hr />
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <Label className="fw-bold">
              Education
            </Label>

            <Button
              size="sm"
              color="primary"
              onClick={() => handleAdd(education, setEducation)}
            >
              <FaPlus /> Add Education
            </Button>
          </div>
          {education.map((item, index) => (
            <Row key={index} className="mt-2">
              <Col md="10">
                <Input
                  value={item}
                  placeholder="e.g. London University - 2015"
                  onChange={(e) =>
                    handleChange(education, setEducation, index, e.target.value)
                  }
                />
              </Col>
              <Col md="2">
                <Button
                  color="danger"
                  size="sm"
                  onClick={() =>
                    handleRemove(education, setEducation, index)
                  }
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}
        </div>
        <hr />
        <div className="mb-4">
          <Label className="fw-bold">
            Relationship Status
          </Label>

          <Row className="mt-2">
            {[
              "Single",
              "In a Relationship",
              "Engaged",
              "Married",
              "Divorced",
              "Widowed"
            ].map((status, i) => (
              <Col md="6" key={i}>
                <FormGroup check>
                  <Input
                    type="radio"
                    name="relationship"
                    checked={relationship === status}
                    onChange={() => setRelationship(status)}
                  />
                  <Label check>{status}</Label>
                </FormGroup>
              </Col>
            ))}
          </Row>
        </div>

        <hr />
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <Label className="fw-bold">
              Current City
            </Label>

            <Button
              size="sm"
              color="primary"
              onClick={() => handleAdd(cities, setCities)}
            >
              <FaPlus /> Add City
            </Button>
          </div>

          {cities.map((item, index) => (
            <Row key={index} className="mt-2">
              <Col md="10">
                <Input
                  value={item}
                  placeholder="e.g. London"
                  onChange={(e) =>
                    handleChange(cities, setCities, index, e.target.value)
                  }
                />
              </Col>

              <Col md="2">
                <Button
                  color="danger"
                  size="sm"
                  onClick={() =>
                    handleRemove(cities, setCities, index)
                  }
                >
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button color="primary">Save Changes</Button>
        {/* <Button color="secondary" onClick={toggle}>
          Cancel
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default EditProfileModal;
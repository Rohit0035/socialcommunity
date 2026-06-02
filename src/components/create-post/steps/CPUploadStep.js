"use client";

import { useRef } from "react";

import {
  Button,
  Card,
  CardBody,
} from "reactstrap";

import { BsImages } from "react-icons/bs";

const CPUploadStep = ({
  media,
  setMedia,
  nextStep,
}) => {
  const fileRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setMedia({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    });
  };

  return (
    <Card className="cp-post-card">
      <CardBody>

        <div className="cp-header">
          Create New Post
        </div>

        {!media ? (
          <div className="cp-upload-area">

            <BsImages className="cp-upload-icon" />

            <h4>
              Drag photos and videos here
            </h4>

            <Button
              color="primary"
              onClick={() => fileRef.current.click()}
            >
              Select here
            </Button>

            <input
              hidden
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
            />

          </div>
        ) : (
          <div className="text-center">

            {media.type.includes("image") ? (
              <img
                src={media.preview}
                alt=""
                className="cp-preview"
              />
            ) : (
              <video
                controls
                className="cp-preview"
              >
                <source src={media.preview} />
              </video>
            )}

            <Button
              color="primary"
              onClick={nextStep}
            >
              Next
            </Button>

          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CPUploadStep;
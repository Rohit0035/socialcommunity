"use client";

import { useRef } from "react";

import {
  Card,
  CardBody,
  Button,
} from "reactstrap";

import {
  BsImages,
} from "react-icons/bs";

const CSUploadStep = ({
  storyMedia,
  setStoryMedia,
  nextStep,
}) => {

  const fileRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setStoryMedia({
      file,
      preview: URL.createObjectURL(file),
      type: file.type,
    });
  };

  return (
    <Card className="cs-main-card">
      <CardBody>
        {!storyMedia ? (
          <div className="cs-upload-wrapper">
            <BsImages className="cs-upload-icon" />

            <h4>
              Drag photos and videos here
            </h4>

            <Button
              color="primary"
              onClick={() =>
                fileRef.current.click()
              }
            >
              Select From Computer
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
          <div className="cs-preview-wrapper">
            {storyMedia.type.includes("video") ? (
              <video
                controls
                className="cs-story-preview"
              >
                <source
                  src={storyMedia.preview}
                />
              </video>
            ) : (
              <img
                src={storyMedia.preview}
                alt=""
                className="cs-story-preview"
              />
            )}

            <div className="mt-4">
              <Button
                color="secondary"
                className="me-2"
                onClick={() =>
                  setStoryMedia(null)
                }
              >
                Change
              </Button>

              <Button
                color="primary"
                onClick={nextStep}
              >
                Next
              </Button>

            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CSUploadStep;
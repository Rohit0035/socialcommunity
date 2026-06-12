"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Row, Col } from "reactstrap";

const ReelsTab = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const reels = [
    {
      id: 1,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      src: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      src: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  const handleVideoClick = (id) => {
    setActiveVideo((prev) =>
      prev === id ? null : id
    );
  };

  return (
    <Row className="g-3">
      {reels.map((item) => (
        <Col xs="6" md="4" lg="3" key={item.id}>
          <div
            className="position-relative overflow-hidden border rounded"
            style={{
              aspectRatio: "9 / 16",
              background: "#000",
            }}
          >
            <video
              muted={activeVideo !== item.id}
              controls={activeVideo === item.id}
              autoPlay
              loop
              playsInline
              onClick={() =>
                handleVideoClick(item.id)
              }
              className="w-100 h-100"
              style={{
                objectFit: "cover",
                cursor: "pointer",
              }}
            >
              <source
                src={item.src}
                type="video/mp4"
              />
              Your browser does not support video.
            </video>

            {activeVideo !== item.id && (
              <div
                className="position-absolute top-50 start-50 translate-middle text-white px-3 py-2 rounded"
                style={{
                  background:
                    "rgba(0,0,0,0.5)",
                  pointerEvents: "none",
                }}
              >
                <FaPlay/>
              </div>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ReelsTab;
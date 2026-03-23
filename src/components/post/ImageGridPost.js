"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageGridPost = ({ images = [] }) => {
  const [index, setIndex] = useState(-1);

  if (!images.length) return null;

  const openLightbox = (i) => setIndex(i);

  const renderImages = () => {
    // ✅ SINGLE IMAGE
    if (images.length === 1) {
      return (
        <Image
          src={images[0]}
          onClick={() => openLightbox(0)}
          className="w-100"
          style={{ height: "400px", objectFit: "cover", cursor: "pointer" }}
        />
      );
    }

    // ✅ 2 IMAGES
    if (images.length === 2) {
      return (
        <div className="row g-1">
          {images.map((img, i) => (
            <div className="col-6" key={i}>
              <Image
                src={img}
                onClick={() => openLightbox(i)}
                className="w-100"
                style={{ height: "300px", objectFit: "cover", cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      );
    }

    // ✅ 3 IMAGES
    if (images.length === 3) {
      return (
        <div className="row g-1">
          <div className="col-6">
            <Image
              src={images[0]}
              onClick={() => openLightbox(0)}
              className="w-100"
              style={{ height: "300px", objectFit: "cover", cursor: "pointer" }}
            />
          </div>
          <div className="col-6 d-flex flex-column gap-1">
            {[1, 2].map((i) => (
              <Image
                key={i}
                src={images[i]}
                onClick={() => openLightbox(i)}
                className="w-100"
                style={{ height: "149px", objectFit: "cover", cursor: "pointer" }}
              />
            ))}
          </div>
        </div>
      );
    }

    // ✅ 4+ IMAGES
    return (
      <div className="row g-1">
        {images.slice(0, 4).map((img, i) => (
          <div className="col-6 position-relative" key={i}>
            <Image
              src={img}
              onClick={() => openLightbox(i)}
              width={100}
              height={200}
              className="w-100"
              style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
            />

            {/* 🔥 +MORE OVERLAY */}
            {i === 3 && images.length > 4 && (
              <div
                onClick={() => openLightbox(i)}
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  fontSize: "24px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                +{images.length - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-100 overflow-hidden">
        {renderImages()}
      </div>

      {/* 🔥 LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({ src: img }))}
      />
    </>
  );
};

export default ImageGridPost;
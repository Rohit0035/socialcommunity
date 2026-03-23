"use client";

import { useState, useRef } from "react";
import { Modal, ModalBody } from "reactstrap";
import {
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaPlay
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ReelViewer = ({ reels, startIndex, onClose }) => {
  const [active, setActive] = useState(startIndex);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef([]);

  const handlePlayPause = () => {
    const vid = videoRefs.current[active];
    if (!vid) return;

    if (paused) {
      vid.play();
    } else {
      vid.pause();
    }
    setPaused(!paused);
  };

  return (
    <Modal isOpen toggle={onClose} fullscreen className="bg-black">
      <ModalBody className="p-0 bg-black text-white position-relative">

        {/* TOP BAR */}
        <div className="position-absolute top-0 w-100 d-flex justify-content-between p-3 z-3">

          <FaTimes size={20} style={{ cursor: "pointer" }} onClick={onClose} />

          {/* SOUND CONTROL */}
          <div
            className="bg-dark px-3 py-1 rounded d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => setMuted(!muted)}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            <span className="small">
              {muted ? "Unmute" : "Mute"}
            </span>
          </div>
        </div>

        {/* SWIPER */}
        <Swiper
          direction="vertical"
          slidesPerView={1}
          initialSlide={startIndex}
          onSlideChange={(s) => {
            setActive(s.activeIndex);
            setPaused(false);
          }}
          style={{ height: "100vh" }}
        >

          {reels.map((item, index) => (
            <SwiperSlide key={item.id}>

              {!item.hidden && (
                <div className="d-flex justify-content-center align-items-center h-100 position-relative">

                  {/* VIDEO */}
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={item.video}
                    autoPlay={active === index}
                    muted={muted}
                    loop
                    playsInline
                    className="h-100"
                    style={{ maxWidth: "420px", objectFit: "cover" }}
                    onClick={handlePlayPause}
                  />

                  {/* PLAY ICON */}
                  {paused && (
                    <FaPlay
                      size={50}
                      className="position-absolute"
                    />
                  )}

                  {/* RIGHT SIDE ICONS */}
                  <div className="position-absolute end-0 me-3 bottom-0 mb-5 d-flex flex-column gap-4 text-center">

                    <div>
                      <FaHeart size={22} />
                      <div className="small">29K</div>
                    </div>

                    <div>
                      <FaComment size={22} />
                      <div className="small">115</div>
                    </div>

                    <div>
                      <FaShare size={22} />
                      <div className="small">130</div>
                    </div>

                    <div>
                      <FaEllipsisH size={20} />
                    </div>

                  </div>

                  {/* BOTTOM CONTENT */}
                  <div className="position-absolute bottom-0 start-0 p-3">

                    <div className="fw-bold text-white">
                      Bolly Window • Follow
                    </div>

                    <div className="">
                      <p className="small text-white fw-bold">🎵  Abhijeet - Tauba Tumhare Ishare</p>
                    </div>

                    <div className="small fw-bold text-white">
                      #reels #viral #trending
                    </div>

                  </div>

                </div>
              )}

            </SwiperSlide>
          ))}

        </Swiper>

      </ModalBody>
    </Modal>
  );
};

export default ReelViewer;
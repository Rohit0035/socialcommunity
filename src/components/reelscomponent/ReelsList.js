"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Button
} from "reactstrap";

import {
  FaVolumeMute,
  FaVolumeUp,
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaPlay,
  FaLink,
  FaFlag,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import "../../assets/styles/reelview.css";

/* ✅ DUMMY REELS DATA */
const reelsData = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: 2,
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: 3,
    video: "https://www.w3schools.com/html/movie.mp4"
  }
];

const ReelsList = () => {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [paused, setPaused] = useState(false);
  const [saved, setSaved] = useState(false);


  const videoRefs = useRef([]);

  /* ▶️ PLAY / PAUSE */
  const togglePlay = () => {
    const vid = videoRefs.current[active];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPaused(false);
    } else {
      vid.pause();
      setPaused(true);
    }
  };

  /* 🔄 SLIDE CHANGE */
  const handleSlideChange = (swiper) => {
    setActive(swiper.activeIndex);

    videoRefs.current.forEach((vid, i) => {
      if (vid) {
        if (i === swiper.activeIndex) vid.play();
        else {
          vid.pause();
          vid.currentTime = 0;
        }
      }
    });

    setPaused(false);
  };

  return (
    <div style={{ height: "95vh", background: "#000", borderRadius: '10px' }}>
      <Container fluid>
        <Row>
          {/* <Col lg="4"></Col> */}

          <Col lg="12" className="p-0">

            <Swiper
              direction="vertical"
              modules={[Navigation, Mousewheel]}
              mousewheel
              navigation
              onSlideChange={handleSlideChange}
              className="rv-swiper"
              style={{ height: "95vh" }}
            >
              {reelsData.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="rv-slide">

                    {/* 🔊 VOLUME */}
                    <div className="rv-volume">
                      <span onClick={() => setMuted(!muted)}>
                        {muted ? (
                          <FaVolumeMute className="text-white" />
                        ) : (
                          <FaVolumeUp className="text-white" />
                        )}
                      </span>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setVolume(val);
                          setMuted(val === 0);

                          videoRefs.current.forEach((v) => {
                            if (v) v.volume = val;
                          });
                        }}
                      />
                    </div>

                    {/* 🎥 VIDEO */}
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={item.video}
                      muted={muted}
                      loop
                      autoPlay={index === active}
                      playsInline
                      className="rv-video"
                      onClick={togglePlay}
                    />

                    {/* ▶ PLAY ICON */}
                    {paused && (
                      <div className="rv-play">
                        <FaPlay />
                      </div>
                    )}

                    {/* 👉 RIGHT ACTIONS */}
                    <div className="rv-actions">

                      {/* LIKE */}
                      <Link href="#" id={`like-${item.id}`} className="rv-vertical-icons text-white text-center">
                        <FaHeart />
                        <p className="small my-0 text-white">29K</p>
                      </Link>

                      <UncontrolledTooltip target={`like-${item.id}`} placement="left">
                        Like
                      </UncontrolledTooltip>

                      {/* COMMENT */}
                      <Link href="#" id={`comment-${item.id}`} className="rv-vertical-icons text-white text-center">
                        <FaComment />
                        <p className="small my-0 text-white">115</p>
                      </Link>

                      <UncontrolledTooltip target={`comment-${item.id}`} placement="left">
                        Comment
                      </UncontrolledTooltip>

                      {/* SHARE */}
                      <Link href="#" id={`share-${item.id}`} className="rv-vertical-icons text-white text-center">
                        <FaShare />
                        <p className="small my-0 text-white">130</p>
                      </Link>

                      <UncontrolledTooltip target={`share-${item.id}`} placement="left">
                        Share
                      </UncontrolledTooltip>


                      {/* bookmark */}
                      <Link
                        href={{void:(0)}}
                        id={`bookmark-${item.id}`}
                        className="rv-vertical-icons fw-bold text-white text-decoration-none text-center"
                      >
                        {saved ? <FaBookmark /> : <FaRegBookmark />}
                      </Link>
                      <UncontrolledTooltip target={`bookmark-${item.id}`} placement="left">
                        Bookmark
                      </UncontrolledTooltip>

                      {/* MENU */}
                      <UncontrolledDropdown direction="start">
                        <DropdownToggle tag="span" className="text-white">
                          <FaEllipsisH />
                        </DropdownToggle>

                        <DropdownMenu white className="rel-drp">
                          <DropdownItem>
                            <FaBookmark className="me-2" /> Save
                          </DropdownItem>
                          <DropdownItem>
                            <FaLink className="me-2" /> Copy link
                          </DropdownItem>
                          <DropdownItem>
                            <FaFlag className="me-2" /> Report
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>

                    </div>

                    {/* 👇 BOTTOM */}
                    <div className="rv-bottom">

                      <div className="d-flex align-items-center gap-2">
                        <Image
                          src="https://i.pravatar.cc/40"
                          width={35}
                          height={35}
                          className="rounded-circle"
                          alt="user"
                        />

                        <span className="text-white fw-bold small">
                          Bolly Window ✔
                          <small className="w-100 d-block">🎵 Trending Audio Track</small>
                        </span>

                        <span className="text-white small">
                          <Button className="btn btn-primary btn-sm">Follow</Button>
                        </span>
                      </div>
                      <span className="text-white small">
                        #reels #viral #trending
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </Col>

          {/* <Col lg="4"></Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default ReelsList;
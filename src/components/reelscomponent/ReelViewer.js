"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
    Modal,
    ModalBody,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Container,
    UncontrolledTooltip
} from "reactstrap";

import {
    FaTimes,
    FaVolumeMute,
    FaVolumeUp,
    FaHeart,
    FaComment,
    FaShare,
    FaEllipsisH,
    FaPlay,
    FaBookmark,
    FaLink,
    FaFlag
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "../../assets/styles/reelview.css"
import Image from "next/image";

const ReelViewer = ({ reels, startIndex, onClose }) => {
    const [active, setActive] = useState(startIndex);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [paused, setPaused] = useState(false);
    const [saved, setSaved] = useState(false);

    const videoRefs = useRef([]);

    const togglePlayUnique = () => {
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

    const handleSlideChangeUnique = (swiper) => {
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
        <Modal isOpen toggle={onClose} fullscreen className="rv-modal">
            <ModalBody className="rv-body">

                {/* 🔥 TOP BAR */}
                <div className="rv-topbar">
                    <FaTimes onClick={onClose} className="rv-close" />


                </div>

                <Container>
                    <Row className="mt-5">
                        <Col md="12" lg="4"></Col>
                        <Col md="12" lg="4" className="">

                            {/* 🔥 SWIPER */}
                            <Swiper
                                direction="vertical"
                                modules={[Navigation]}
                                navigation={true}
                                initialSlide={startIndex}
                                onSlideChange={handleSlideChangeUnique}
                                className="rv-swiper"
                            >
                                {reels.map((item, index) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="rv-slide">
                                            <div className="rv-volume">
                                                <span onClick={() => setMuted(!muted)}>
                                                    {muted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
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
                                            {/* VIDEO */}
                                            <video
                                                ref={(el) => (videoRefs.current[index] = el)}
                                                src={item.video}
                                                muted={muted}
                                                loop
                                                autoPlay={index === active}
                                                playsInline
                                                className="rv-video"
                                                onClick={togglePlayUnique}
                                            />

                                            {/* PLAY ICON */}
                                            {paused && (
                                                <div className="rv-play">
                                                    <FaPlay />
                                                </div>
                                            )}

                                            {/* RIGHT ACTIONS */}
                                            <div className="rv-actions">

                                                {/* LIKE */}
                                                <Link
                                                    href={`/post/${item.id}`}
                                                    id={`like-${item.id}`}
                                                    className="rv-vertical-icons fw-bold text-white text-decoration-none text-center"
                                                >
                                                    <FaHeart />
                                                    <p className="small my-0 text-white">29K</p>
                                                </Link>

                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target={`like-${item.id}`}
                                                >
                                                    Like
                                                </UncontrolledTooltip>


                                                {/* COMMENT */}
                                                <Link
                                                    href={`/post/${item.id}#comments`}
                                                    id={`comment-${item.id}`}
                                                    className="rv-vertical-icons fw-bold text-white text-decoration-none text-center"
                                                >
                                                    <FaComment />
                                                    <p className="small my-0 text-white">115</p>
                                                </Link>

                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target={`comment-${item.id}`}
                                                >
                                                    Comment
                                                </UncontrolledTooltip>


                                                {/* SHARE */}
                                                <Link
                                                    href={`/share/${item.id}`}
                                                    id={`share-${item.id}`}
                                                    className="rv-vertical-icons fw-bold text-white text-decoration-none text-center"
                                                >
                                                    <FaShare />
                                                    <p className="small my-0 text-white">130</p>
                                                </Link>

                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target={`share-${item.id}`}
                                                >
                                                    Share
                                                </UncontrolledTooltip>

                                                {/* bookmark */}
                                                <Link
                                                    href={`/bookmark/${item.id}`}
                                                    id={`bookmark-${item.id}`}
                                                    className="rv-vertical-icons fw-bold text-white text-decoration-none text-center"
                                                >
                                                    {saved ? <FaBookmark /> : <FaRegBookmark />}
                                                </Link>

                                                <UncontrolledTooltip
                                                    placement="left"
                                                    target={`bookmark-${item.id}`}
                                                >
                                                    Bookmark
                                                </UncontrolledTooltip>



                                                {/* DROPDOWN */}
                                                <UncontrolledDropdown direction="start" >
                                                    <DropdownToggle tag="span" className="text-white fw-bold">
                                                        <FaEllipsisH style={{ cursor: "pointer" }} />
                                                    </DropdownToggle>

                                                    <DropdownMenu dark className="rv-dropdown small">
                                                        <DropdownItem className="small" tag={Link} href={`/save/${item.id}`}>
                                                            <FaBookmark className="me-2" /> Save reel
                                                        </DropdownItem>

                                                        <DropdownItem className="small" tag={Link} href={`/reel/${item.id}`}>
                                                            <FaLink className="me-2" /> Copy link
                                                        </DropdownItem>

                                                        <DropdownItem className="small" tag={Link} href={`/report/${item.id}`}>
                                                            <FaFlag className="me-2" /> Report
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>

                                            </div>

                                            {/* 🔥 BOTTOM CONTENT */}
                                            <div className="rv-bottom">

                                                <div className="d-flex align-items-center gap-2">

                                                    {/* PROFILE IMAGE */}
                                                    <Link href={`/profile/${item.id}`}>
                                                        <Image
                                                            src="https://i.pravatar.cc/40"
                                                            className="rounded-circle"
                                                            width="35"
                                                            height="35"
                                                        />
                                                    </Link>

                                                    {/* NAME + FOLLOW */}
                                                    <Link
                                                        href={`/profile/${item.id}`}
                                                        className="rv-user text-decoration-none"
                                                    >
                                                        Bolly Window ✔
                                                    </Link>

                                                    <Link
                                                        href={`/follow/${item.id}`}
                                                        className="text-white text-decoration-none small"
                                                    >
                                                        Follow
                                                    </Link>
                                                </div>

                                                <p className="mb-1 text-white fw-bold">
                                                    🎵 Abhijeet - Tauba Tumhare Ishare
                                                </p>

                                                <span className="fw-bold">#reels #viral #trending</span>

                                            </div>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </Col>

                        <Col md="12" lg="4"></Col>
                    </Row>
                </Container>
            </ModalBody>
        </Modal>
    );
};

export default ReelViewer;
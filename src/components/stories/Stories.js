"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import axios from "axios";

import { Card, CardBody } from "reactstrap";
import { FaPlus } from "react-icons/fa";

import StoryViewer from "./StoryViewer";
import CreateStoryModal from "../create-story/CreateStoryModal";
import toast from "react-hot-toast";

const Stories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [myStory, setMyStory] = useState(null);
  const [otherStories, setOtherStories] = useState([]);

  const [showCreateStoryModal, setShowCreateStoryModal] =
    useState(false);

  const handleOpenCreateStoryModal = () => {
    setShowCreateStoryModal(true);
  };

  const handleCloseCreateStoryModal = () => {
    setShowCreateStoryModal(false);
  };

  const openStory = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeStory = () => {
    setIsOpen(false);
	 fetchStories();
  };

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        "/api/stories/feed"
      );

      setMyStory(response.data.myStory || null);
      setOtherStories(
        response.data.otherStories || []
      );
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  /**
   * Stories passed to StoryViewer
   * Index 0 = myStory (if exists)
   * Index 1+ = other stories
   */
  const viewerStories = [
    ...(myStory ? [myStory] : []),
    ...otherStories,
  ];

  return (
    <>
      <div className="mb-4">
        <Card className="border-0">
          <CardBody>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={8}
              grabCursor
              breakpoints={{
                0: {
                  slidesPerView: 4,
                },
                640: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
            >
              {/* ADD STORY */}
              <SwiperSlide>
                <div
                  className="text-center"
                  onClick={
                    handleOpenCreateStoryModal
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="position-relative mx-auto d-flex align-items-center justify-content-center rounded-circle border bg-light"
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  >
                    <FaPlus size={22} />
                  </div>

                  <small className="d-block mt-1 text-truncate st-txt-o">
                    Add Story
                  </small>
                </div>
              </SwiperSlide>

              {/* MY STORY */}
              {myStory && (
                <SwiperSlide>
                  <div
                    className="text-center"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      openStory(0)
                    }
                  >
                    <div className="story-ring mx-auto">
                      <Image
                        src={myStory.avatar}
                        width={70}
                        height={70}
                        className="rounded-circle story-img"
                        alt="Your Story"
                      />
                    </div>

                    <small className="d-block mt-0 text-truncate st-txt-o">
                      Your Story
                    </small>
                  </div>
                </SwiperSlide>
              )}

              {/* OTHER STORIES */}
              {otherStories.map(
                (item, index) => (
                  <SwiperSlide
                    key={item.id}
                  >
                    <div
                      className="text-center"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        openStory(
                          myStory
                            ? index + 1
                            : index
                        )
                      }
                    >
                      <div className="story-ring mx-auto">
                        <Image
                          src={item.avatar}
                          width={70}
                          height={70}
                          className="rounded-circle story-img"
                          alt={item.user}
                        />
                      </div>

                      <small className="d-block mt-0 text-truncate st-txt-o">
                        {item.user}
                      </small>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </CardBody>
        </Card>
      </div>

      {/* STORY VIEWER */}
      {isOpen && (
        <StoryViewer
          stories={viewerStories}
          startIndex={activeIndex}
          onClose={closeStory}
        />
      )}

      {/* CREATE STORY MODAL */}
      <CreateStoryModal
        showCreateStoryModal={
          showCreateStoryModal
        }
        handleCloseCreateStoryModal={
          handleCloseCreateStoryModal
        }
      />
    </>
  );
};

export default Stories;
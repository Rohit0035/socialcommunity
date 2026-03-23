"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import StoryViewer from "./StoryViewer";

const storiesData = [
  {
    id: 1,
    user: "fitnessfirst_id",
    avatar: "https://i.pravatar.cc/150?img=10",
    stories: [
      { url: "https://picsum.photos/400/700?1", type: "image" },
      { url: "https://picsum.photos/400/700?2", type: "image" },
      { url: "https://picsum.photos/400/700?3", type: "image" },
      { url: "https://picsum.photos/400/700?4", type: "image" },
      { url: "https://picsum.photos/400/700?5", type: "image" },
      { url: "https://www.pexels.com/download/video/6716513/", type: "video" },
      { url: "https://picsum.photos/400/700?6", type: "image" },
      { url: "https://picsum.photos/400/700?7", type: "image" },
      { url: "https://picsum.photos/400/700?8", type: "image" },
      { url: "https://picsum.photos/400/700?9", type: "image" }
    ]
  },
  {
    id: 2,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 3,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 4,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 5,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 6,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 7,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 8,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  },
  {
    id: 9,
    user: "coach_andy",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: [
      { url: "https://picsum.photos/400/700?11", type: "image" },
      { url: "https://picsum.photos/400/700?12", type: "image" },
      { url: "https://www.w3schools.com/html/movie.mp4", type: "video" },
      { url: "https://picsum.photos/400/700?13", type: "image" }
    ]
  }
];


const Stories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openStory = (i) => {
    setActiveIndex(i);
    setIsOpen(true);
  };

  const closeStory = () => setIsOpen(false);

  return (
    <>
      <div className="mb-4">
         <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={8}
        grabCursor={true}
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
        {storiesData.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className="text-center"
              style={{ cursor: "pointer" }}
              onClick={() => openStory(i)}
            >
              {/* Avatar */}
              <div className="story-ring mx-auto">
                <Image
                  src={item.avatar}
                  width={70}
                  height={70}
                  className="rounded-circle story-img"
                  alt={item.user}
                />
              </div>

              {/* Username */}
              <small className="d-block mt-0 text-truncate st-txt-o">
                {item.user}
              </small>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
     

      {/* Story Viewer */}
      {isOpen && (
        <StoryViewer
          stories={storiesData}
          startIndex={activeIndex}
          onClose={closeStory}
        />
      )}
    </>
  );
};

export default Stories;
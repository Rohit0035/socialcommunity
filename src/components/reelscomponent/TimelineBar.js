"use client";
import { useState } from "react";

export default function TimelineBar({ videoRef }) {
  const [time, setTime] = useState(0);

  const handleSeek = (e) => {
    const t = e.target.value;
    setTime(t);
    videoRef.current.currentTime = t;
  };

  return (
    <div className="pro-timeline">

      <input
        type="range"
        min="0"
        max="60"
        value={time}
        onChange={handleSeek}
      />

    </div>
  );
}
"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import EmojiPicker from "emoji-picker-react";
import "../../assets/styles/reels-pro.css";

export default function AdvancedEditor() {

  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  let chunks = [];

  const [videoUrl, setVideoUrl] = useState("");
  const [layers, setLayers] = useState([]);
  const [showSticker, setShowSticker] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  // 🎨 Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [glow, setGlow] = useState(0);
  const [saturate, setSaturate] = useState(100);

  // 🎬 Upload Video
  const uploadVideo = (e) => {
    const file = e.target.files[0];
    setVideoUrl(URL.createObjectURL(file));
    setShowCamera(false);
  };

  // 📷 Start Camera
  const startCamera = async () => {
    setShowCamera(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    cameraRef.current.srcObject = stream;
  };

  // 🔴 Start Recording
  const startRecording = () => {
    const stream = cameraRef.current.srcObject;

    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setShowCamera(false);
    };

    mediaRecorderRef.current.start();
  };

  // ⏹ Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  // 🎨 Apply Filters
  const applyFilters = () => {
    if (!videoRef.current) return;

    videoRef.current.style.filter = `
      brightness(${brightness}%)
      contrast(${contrast}%)
      blur(${blur}px)
      saturate(${saturate}%)
      drop-shadow(0 0 ${glow}px white)
    `;
  };

  // 📝 Add Text
  const addText = () => {
    setLayers([
      ...layers,
      {
        id: Date.now(),
        content: "Text",
        x: 100,
        y: 100,
        start: 0,
      },
    ]);
  };

  // 😎 Add Emoji Sticker
  const addSticker = (emoji) => {
    setLayers([
      ...layers,
      {
        id: Date.now(),
        content: emoji,
        x: 120,
        y: 120,
        start: videoRef.current?.currentTime || 0,
      },
    ]);
  };

  // 🎞 Timeline
  const [time, setTime] = useState(0);

  const handleTimeline = (e) => {
    const t = e.target.value;
    setTime(t);

    if (videoRef.current) {
      videoRef.current.currentTime = t;
    }
  };

  return (
    <div className="pro-editor">

      {/* Upload */}
      <input type="file" accept="video/*" onChange={uploadVideo} />

      {/* PREVIEW */}
      <div className="pro-preview">

        {showCamera ? (
          <div className="camera-box">

            <video ref={cameraRef} autoPlay className="video" />

            {/* RECORD BUTTONS */}
            <div className="record-controls">
              <button onClick={startRecording} className="rec-btn">
                🔴 Start
              </button>

              <button onClick={stopRecording} className="stop-btn">
                ⏹ Stop
              </button>
            </div>

          </div>
        ) : (
          <video ref={videoRef} src={videoUrl} controls className="video" />
        )}

        {/* Layers */}
        {layers
          .filter(layer =>
            videoRef.current
              ? videoRef.current.currentTime >= layer.start
              : true
          )
          .map(layer => (
            <Draggable
              key={layer.id}
              defaultPosition={{ x: layer.x, y: layer.y }}
            >
              <div className="layer">{layer.content}</div>
            </Draggable>
          ))}

      </div>

      {/* 🎨 FILTERS */}
      <div className="filters">

        <label>Brightness</label>
        <input type="range" min="50" max="150"
          value={brightness}
          onChange={(e) => { setBrightness(e.target.value); applyFilters(); }}
        />

        <label>Contrast</label>
        <input type="range" min="50" max="150"
          value={contrast}
          onChange={(e) => { setContrast(e.target.value); applyFilters(); }}
        />

        <label>Blur</label>
        <input type="range" min="0" max="10"
          value={blur}
          onChange={(e) => { setBlur(e.target.value); applyFilters(); }}
        />

        <label>Glow</label>
        <input type="range" min="0" max="20"
          value={glow}
          onChange={(e) => { setGlow(e.target.value); applyFilters(); }}
        />

        <label>Saturation</label>
        <input type="range" min="50" max="200"
          value={saturate}
          onChange={(e) => { setSaturate(e.target.value); applyFilters(); }}
        />

      </div>

      {/* TOOLS */}
      <div className="tools">

        <button onClick={addText}>Text</button>

        <button onClick={() => setShowSticker(!showSticker)}>
          Stickers
        </button>

        <button onClick={startCamera}>
          📷 Camera
        </button>

      </div>

      {/* STICKER PANEL */}
      {showSticker && (
        <div className="sticker-panel">
          <EmojiPicker onEmojiClick={(e) => addSticker(e.emoji)} />
        </div>
      )}

      {/* TIMELINE */}
      <div className="timeline">
        <input
          type="range"
          min="0"
          max="60"
          value={time}
          onChange={handleTimeline}
        />
      </div>

    </div>
  );
}
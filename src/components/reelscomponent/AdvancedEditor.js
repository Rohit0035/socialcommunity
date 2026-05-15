"use client";

import React, { useRef, useState, nodeRef  } from "react";
import Draggable from "react-draggable";
import EmojiPicker from "emoji-picker-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input
} from "reactstrap";

import "../../assets/styles/reels-pro.css";
import TextEditorModal from "./TextEditorModal";
export default function AdvancedEditor() {

  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const nodeRefs = useRef({});

  let chunks = [];
  let timerInterval = null;

  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [layers, setLayers] = useState([]);
  const [showSticker, setShowSticker] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const [musicModal, setMusicModal] = useState(false);
  const [search, setSearch] = useState("");
  const [textModal, setTextModal] = useState(false);
  // 🎵 Dummy Songs
  const songs = [
    { id: 1, name: "Trending Beat 🔥", url: "https://samplelib.com/mp3/sample-3s.mp3" },
    { id: 2, name: "Sad Vibes 💔", url: "/songs/song2.mp3" },
    { id: 3, name: "Party Mix 🎉", url: "/songs/song3.mp3" },
  ];

  // 🎬 Upload Video
  const uploadVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoUrl(URL.createObjectURL(file));
    setShowCamera(false);
  };

  // 📷 Camera
  const startCamera = async () => {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    cameraRef.current.srcObject = stream;
  };

  // 🔴 Recording
  const startRecording = () => {
    const stream = cameraRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks = [];

    setIsRecording(true);
    setRecordingTime(0);

    timerInterval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 120) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      clearInterval(timerInterval);
      setIsRecording(false);

      const blob = new Blob(chunks, { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setVideoUrl(url);
      setShowCamera(false);
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    clearInterval(timerInterval);
    mediaRecorderRef.current?.stop();
  };

  // 🎨 Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [glow, setGlow] = useState(0);
  const [saturate, setSaturate] = useState(100);

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

  // 🎵 Sync
  const syncPlay = () => {
    if (audioRef.current && videoRef.current) {
      audioRef.current.currentTime = videoRef.current.currentTime;
      audioRef.current.play();
    }
  };

  // 📝 Text
  const handleAddText = (textLayer) => {
    setLayers([...layers, textLayer]);
  };

  // 😎 Sticker
  const addSticker = (emoji) => {
    setLayers([
      ...layers,
      {
        id: Date.now(),
        type: "sticker",
        content: emoji,
        x: 150,
        y: 150,
        size: 60 // BIG SIZE
      }
    ]);
  };

  // 💾 Save
  const saveReel = () => {
    localStorage.setItem("reel", JSON.stringify({
      videoUrl,
      audioUrl,
      layers
    }));
    alert("Saved ✅");
  };

  // 🚀 Publish
  const publishReel = () => {
    alert("Published 🚀 (API later)");
  };

  // 🎞 Timeline
  const [time, setTime] = useState(0);
  const handleTimeline = (e) => {
    const t = e.target.value;
    setTime(t);
    if (videoRef.current) videoRef.current.currentTime = t;
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

            {isRecording && (
              <div className="record-timer">
                ⏱ {recordingTime}s / 120s
              </div>
            )}

            <div className="record-controls">
              <button onClick={startRecording} className="rec-btn">🔴 Start</button>
              <button onClick={stopRecording} className="stop-btn">⏹ Stop</button>
            </div>

          </div>
        ) : videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="video"
            onPlay={syncPlay}
          />
        ) : (
          <div className="empty-video">Upload or Record Video</div>
        )}

        {/* Layers FIXED */}
        {layers.map(layer => {
          if (!nodeRefs.current[layer.id]) {
            nodeRefs.current[layer.id] = React.createRef();
          }

          return (
            <Draggable
              key={layer.id}
              nodeRef={nodeRef}
              defaultPosition={{ x: layer.x, y: layer.y }}
            >
              <div ref={nodeRef} className="layer">

                {layer.type === "text" ? (
                  <div style={layer.style}>{layer.content}</div>
                ) : (
                  <div style={{ fontSize: layer.size || "60px" }}>
                    {layer.content}
                  </div>
                )}

              </div>
            </Draggable>
          );
        })}


        {layers.map(layer => {
          if (!nodeRefs.current[layer.id]) {
            nodeRefs.current[layer.id] = React.createRef();
          }

          const nodeRef = nodeRefs.current[layer.id]; // ✅ THIS WAS MISSING

          return (
            <Draggable
              key={layer.id}
              nodeRef={nodeRef}
              defaultPosition={{ x: layer.x, y: layer.y }}
            >
              <div ref={nodeRef} className="layer">

                {layer.type === "text" ? (
                  <div style={layer.style}>{layer.content}</div>
                ) : (
                  <div style={{ fontSize: layer.size || "60px" }}>
                    {layer.content}
                  </div>
                )}

              </div>
            </Draggable>
          );
        })}

      </div>

      {/* FILTERS */}
      <div className="filters">
        <input type="range" min="50" max="150" onChange={(e) => { setBrightness(e.target.value); applyFilters(); }} />
        <input type="range" min="50" max="150" onChange={(e) => { setContrast(e.target.value); applyFilters(); }} />
        <input type="range" min="0" max="10" onChange={(e) => { setBlur(e.target.value); applyFilters(); }} />
      </div>

      {/* TOOLS */}
      <div className="tools">
        <button onClick={() => setTextModal(true)}>Text</button>
        <button onClick={() => setShowSticker(!showSticker)}>Sticker</button>
        <button onClick={startCamera}>📷 Camera</button>
        <button onClick={() => setMusicModal(true)}>🎵 Add Song</button>
        <button onClick={saveReel}>💾 Save</button>
        <button onClick={publishReel}>🚀 Publish</button>
      </div>

      {/* AUDIO */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} controls />}

      {/* STICKERS */}
      {showSticker && <EmojiPicker onEmojiClick={(e) => addSticker(e.emoji)} />}

      {/* TIMELINE */}
      <input type="range" min="0" max="60" value={time} onChange={handleTimeline} />

      {/* MUSIC MODAL */}
      <Modal isOpen={musicModal} toggle={() => setMusicModal(false)}>
        <ModalHeader toggle={() => setMusicModal(false)}>Music</ModalHeader>
        <ModalBody>

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {songs
            .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
            .map(song => (
              <div key={song.id} className="song-item">
                <span>{song.name}</span>
                <Button size="sm" onClick={() => {
                  setAudioUrl(song.url);
                  setMusicModal(false);
                }}>
                  Apply
                </Button>
              </div>
            ))
          }

        </ModalBody>
      </Modal>


      <TextEditorModal
        isOpen={textModal}
        toggle={() => setTextModal(false)}
        onApply={handleAddText}
      />

    </div>


  );
}
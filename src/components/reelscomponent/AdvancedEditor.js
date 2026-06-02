"use client";

import { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Label,
} from "reactstrap";
import Draggable from "react-draggable";
import EmojiPicker from "emoji-picker-react";
import {
  FaVideo,
  FaCamera,
  FaPlay,
  FaStop,
  FaFont,
  FaSmile,
  FaSlidersH,
  FaMagic,
} from "react-icons/fa";

export default function AdvancedEditor() {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  let chunks = [];

  const [videoUrl, setVideoUrl] = useState("");
  const [layers, setLayers] = useState([]);
  const [showSticker, setShowSticker] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [glow, setGlow] = useState(0);
  const [saturate, setSaturate] = useState(100);

  const [time, setTime] = useState(0);

  const uploadVideo = (e) => {
    const file = e.target.files[0];
    setVideoUrl(URL.createObjectURL(file));
    setShowCamera(false);
  };

  const startCamera = async () => {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    cameraRef.current.srcObject = stream;
  };

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

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

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

  const addText = () => {
    setLayers([
      ...layers,
      { id: Date.now(), content: "Text", x: 100, y: 100, start: 0 },
    ]);
  };

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

  const handleTimeline = (e) => {
    const t = e.target.value;
    setTime(t);
    if (videoRef.current) videoRef.current.currentTime = t;
  };

  return (
    <Container fluid className="p-3 bg-light min-vh-100">
      {/* Header */}
      <Card className="mb-3 shadow-sm">
        <CardBody className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FaVideo className="me-2 text-primary" />
            Advanced Reel Editor
          </h4>
          <Input type="file" accept="video/*" onChange={uploadVideo} />
        </CardBody>
      </Card>

      <Row>
        {/* Left Sidebar */}
        <Col lg={3}>
          <Card className="mb-3 shadow-sm">
            <CardHeader>
              <FaMagic className="me-2" />
              Tools
            </CardHeader>
            <CardBody className="d-grid gap-2">
              <Button color="primary" onClick={addText}>
                <FaFont className="me-2" />
                Add Text
              </Button>
              <Button
                color="warning"
                onClick={() => setShowSticker(!showSticker)}
              >
                <FaSmile className="me-2" />
                Stickers
              </Button>
              <Button color="success" onClick={startCamera}>
                <FaCamera className="me-2" />
                Camera
              </Button>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <FaSlidersH className="me-2" />
              Filters
            </CardHeader>
            <CardBody>
              <Label>Brightness</Label>
              <Input
                type="range"
                min={50}
                max={150}
                value={brightness}
                onChange={(e) => {
                  setBrightness(e.target.value);
                  applyFilters();
                }}
              />
              <Label>Contrast</Label>
              <Input
                type="range"
                min={50}
                max={150}
                value={contrast}
                onChange={(e) => {
                  setContrast(e.target.value);
                  applyFilters();
                }}
              />
              <Label>Blur</Label>
              <Input
                type="range"
                min={0}
                max={10}
                value={blur}
                onChange={(e) => {
                  setBlur(e.target.value);
                  applyFilters();
                }}
              />
              <Label>Glow</Label>
              <Input
                type="range"
                min={0}
                max={20}
                value={glow}
                onChange={(e) => {
                  setGlow(e.target.value);
                  applyFilters();
                }}
              />
              <Label>Saturation</Label>
              <Input
                type="range"
                min={50}
                max={200}
                value={saturate}
                onChange={(e) => {
                  setSaturate(e.target.value);
                  applyFilters();
                }}
              />
            </CardBody>
          </Card>
        </Col>

        {/* Center Preview */}
        <Col lg={6}>
          <Card className="shadow mb-3">
            <CardHeader>Preview Window</CardHeader>
            <CardBody className="p-0 position-relative" style={{ minHeight: "500px" }}>
              {showCamera ? (
                <video ref={cameraRef} autoPlay className="w-100 h-100" />
              ) : (
                <video ref={videoRef} src={videoUrl} controls className="w-100" />
              )}

              {layers.map((layer) => (
                <Draggable key={layer.id}>
                  <div className="position-absolute text-white fw-bold fs-4 px-2">
                    {layer.content}
                  </div>
                </Draggable>
              ))}
            </CardBody>
          </Card>
        </Col>

        {/* Right Panel */}
        <Col lg={3}>
          <Card className="mb-3 shadow-sm">
            <CardHeader>Recording Controls</CardHeader>
            <CardBody className="d-grid gap-2">
              <Button color="danger" onClick={startRecording}>
                <FaPlay className="me-2" />
                Start Recording
              </Button>
              <Button color="secondary" onClick={stopRecording}>
                <FaStop className="me-2" />
                Stop Recording
              </Button>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>Timeline</CardHeader>
            <CardBody>
              <Input
                type="range"
                min={0}
                max={60}
                value={time}
                onChange={handleTimeline}
              />
              <div className="text-center mt-2">
                <span className="badge bg-primary">{Math.floor(time)} sec</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Sticker Panel */}
      {showSticker && (
        <Card className="shadow mt-3">
          <CardHeader>Select Sticker</CardHeader>
          <CardBody>
            <EmojiPicker
              onEmojiClick={(emoji) => addSticker(emoji.emoji)}
            />
          </CardBody>
        </Card>
      )}
    </Container>
  );
}
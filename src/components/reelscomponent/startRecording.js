const mediaRecorderRef = useRef(null);
let chunks = [];

const startRecording = () => {
  const stream = cameraRef.current.srcObject;
  mediaRecorderRef.current = new MediaRecorder(stream);

  mediaRecorderRef.current.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorderRef.current.onstop = () => {
    const blob = new Blob(chunks, { type: "video/mp4" });
    setVideoUrl(URL.createObjectURL(blob));
    setShowCamera(false);
  };

  mediaRecorderRef.current.start();
};

const stopRecording = () => {
  mediaRecorderRef.current.stop();
};
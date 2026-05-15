"use client";

export default function ExportButton({ videoRef }) {

  const exportVideo = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = "reel.png";
    a.click();
  };

  return (
    <button onClick={exportVideo}>
      Download Frame 📥
    </button>
  );
}
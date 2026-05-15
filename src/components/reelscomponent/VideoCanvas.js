"use client";

import Draggable from "react-draggable";

export default function VideoCanvas({ videoRef, videoUrl, layers, setLayers }) {

  const updatePosition = (id, x, y) => {
    setLayers(layers.map(l =>
      l.id === id ? { ...l, x, y } : l
    ));
  };

  return (
    <div className="pro-canvas">

      <video ref={videoRef} src={videoUrl} controls />

      {layers.map((layer) => (
        <Draggable
          key={layer.id}
          position={{ x: layer.x, y: layer.y }}
          onStop={(e, data) =>
            updatePosition(layer.id, data.x, data.y)
          }
        >
          <div className="layer-box">
            {layer.content}
          </div>
        </Draggable>
      ))}

    </div>
  );
}
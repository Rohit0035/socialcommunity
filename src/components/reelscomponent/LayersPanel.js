"use client";

export default function LayersPanel({ layers }) {
  return (
    <div className="pro-layers">

      <h4>Layers</h4>

      {layers.map((l) => (
        <div key={l.id}>
          {l.type} - {l.content}
        </div>
      ))}

    </div>
  );
}
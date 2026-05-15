"use client";

import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Input } from "reactstrap";

export default function TextEditorModal({ isOpen, toggle, onApply }) {

  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);

  const [color, setColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");

  const handleApply = () => {
    if (!text) return;

    onApply({
      id: Date.now(),
      type: "text",
      content: text,
      x: 120,
      y: 120,
      style: {
        color,
        fontSize: `${fontSize}px`,
        fontFamily,
        fontWeight,
        fontStyle,
      }
    });

    toggle();
    setPreview(false);
    setText("");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add Text</ModalHeader>

      <ModalBody>

        {/* TEXT INPUT */}
        <Input
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* STYLE CONTROLS */}
        <div className="mt-3">

          <label>Font Size</label>
          <Input
            type="range"
            min="16"
            max="80"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />

          <label>Text Color</label>
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <label>Font Family</label>
          <Input
            type="select"
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option>Arial</option>
            <option>Courier New</option>
            <option>Georgia</option>
            <option>Verdana</option>
          </Input>

          <label>Font Weight</label>
          <Input
            type="select"
            onChange={(e) => setFontWeight(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </Input>

          <label>Font Style</label>
          <Input
            type="select"
            onChange={(e) => setFontStyle(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </Input>

        </div>

        {/* PREVIEW */}
        {preview && (
          <div
            className="mt-3 p-3 text-center"
            style={{
              background: "#000",
              borderRadius: "10px",
              ...{
                color,
                fontSize: `${fontSize}px`,
                fontFamily,
                fontWeight,
                fontStyle
              }
            }}
          >
            {text || "Preview Text"}
          </div>
        )}

        {/* BUTTONS */}
        <div className="d-flex justify-content-between mt-4">
          <Button color="secondary" onClick={() => setPreview(true)}>
            Preview
          </Button>

          <Button color="success" onClick={handleApply}>
            Apply
          </Button>
        </div>

      </ModalBody>
    </Modal>
  );
}
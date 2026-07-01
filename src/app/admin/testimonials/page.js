"use client";

import { useState } from "react";
import TestimonialTable from "@/components/admin/Testimonial/TestimonialTable";

export default function TestimonialsPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Testimonials</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Testimonial
        </button>
      </div>

      <TestimonialTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchData={() => {}}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import CourseTable from "@/components/admin/Course/CourseTable";

export default function CoursesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Courses</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Course
        </button>
      </div>

      <CourseTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchData={() => {}}
      />
    </div>
  );
}
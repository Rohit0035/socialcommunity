"use client";

import { useState } from "react";
import UniversityTable from "@/components/admin/University/UniversityTable";

export default function UniversitiesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Universities</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add University
        </button>
      </div>

      <UniversityTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchData={() => {}}
      />
    </div>
  );
}
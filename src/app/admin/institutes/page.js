"use client";
import InstituteTable from "@/components/admin/Institute/InstituteTable";
import { useState } from "react";

export default function InstitutesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Institutes</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Institute
        </button>
      </div>

      <InstituteTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchData={() => {}}
      />
    </div>
  );
}
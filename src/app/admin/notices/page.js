"use client";
import NoticesTable from "@/components/admin/Notice/NoticesTable";
import { useState } from "react";

export default function NoticesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Notices</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Notice
        </button>
      </div>

      <NoticesTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchNotices={() => {}}
      />
    </div>
  );
}
"use client";

import { useState } from "react";
import NoticeCategoryTable from "@/components/admin/Notice/NoticeCategoryTable";

export default function NoticeCategoriesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Notice Categories</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Category
        </button>
      </div>

      <NoticeCategoryTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchCategories={() => {}}
      />
    </div>
  );
}
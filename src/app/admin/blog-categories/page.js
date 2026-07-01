"use client";

import { useState } from "react";
import BlogCategoryTable from "@/components/admin/Blog/BlogCategoryTable";

export default function BlogCategoriesPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blog Categories</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Category
        </button>
      </div>

      <BlogCategoryTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchCategories={() => {}}
      />
    </div>
  );
}
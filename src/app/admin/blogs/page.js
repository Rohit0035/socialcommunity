"use client";
import BlogsTable from "@/components/admin/Blog/BlogsTable";
import { useState } from "react";

export default function BlogsPage() {
  const [editData, setEditData] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blogs</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShow(true)}
        >
          Add Blog
        </button>
      </div>

      <BlogsTable
        show={show}
        setShow={setShow}
        editData={editData}
        setEditData={setEditData}
        fetchBlogs={() => {}}
      />
    </div>
  );
}
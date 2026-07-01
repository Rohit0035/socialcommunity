"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import BlogCategoryForm from "./BlogCategoryForm";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function BlogCategoryTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredComments, setFilteredComments] =
    useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const result = comments.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.comment
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredComments(result);
  }, [search, comments]);

  const fetchComments = async () => {
    const res = await fetch("/api/blog-comments");
    const data = await res.json();

    setComments(data);
    setFilteredComments(data);
  };

  const toggleStatus = async (id, isApproved) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isApproved ? "Disapprove" : "Approve"
        } this category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/blog-comments/${id}`, {
        isApproved: !isApproved,
      });

      toast.success("Comment updated successfully");
      fetchComments();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShow(true);
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: `You are about to delete "${item.name}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `/api/blog-comments/${item._id}`
      );

      toast.success("Comment deleted successfully");

      fetchComments();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Sr No",
      cell: (row, index) => index + 1,
      width: "100px",
    },
    {
      name: "Blog Title",
      selector: (row) => row.blog?.title,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Comments",
      selector: (row) => row.comment,
    },
    {
      name: "Is Approved",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={row.isApproved}
            onChange={() =>
              toggleStatus(row._id, row.isApproved)
            }
          />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <DataTable
        columns={columns}
        data={filteredComments}
        pagination
        highlightOnHover
        responsive
      />
    </>
  );
}
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
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const result = categories.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.slug
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredCategories(result);
  }, [search, categories]);

  const fetchCategories = async () => {
    const res = await fetch("/api/blog-categories");
    const data = await res.json();

    setCategories(data);
    setFilteredCategories(data);
  };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this category?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/blog-categories/${id}`, {
        status: !status,
      });

      toast.success("Category updated successfully");
      fetchCategories();
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
      title: "Delete Category?",
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
        `/api/blog-categories/${item._id}`
      );

      toast.success("Category deleted successfully");

      fetchCategories();
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={row.status}
            onChange={() =>
              toggleStatus(row._id, row.status)
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
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
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
        data={filteredCategories}
        pagination
        highlightOnHover
        responsive
      />

      <BlogCategoryForm
        show={show}
        setShow={setShow}
        fetchCategories={fetchCategories}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
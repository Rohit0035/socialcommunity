"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import BlogForm from "./BlogForm";
import Swal from "sweetalert2";

export default function BlogsTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [search, setSearch] = useState("");
  const [blogs, setBlogs] =
    useState([]);
  const [filteredBlogs, setFilteredBlogs] =
    useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const result = blogs.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.slug
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredBlogs(result);
  }, [search, blogs]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();

    setBlogs(data);
    setFilteredBlogs(data);
  };

  // const toggleStatus = async (id, status) => {
  //   try {
  //     const payload = { status: !status };

  //     await axios.put(
  //       `/api/blogs/status/${id}`,
  //       payload
  //     );

  //     toast.success(
  //       "Blog status updated successfully"
  //     );

  //     fetchBlogs();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this blog?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/blogs/status/${id}`, {
        status: !status,
      });

      toast.success("Blog updated successfully");
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setShow(true);
  };

  // const handleDelete = async (item) => {
  //   try {
  //     await axios.delete(`/api/blogs/${item._id}`);
  //     toast.success("Blog deleted successfully");
  //     fetchBlogs();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: `You are about to delete "${item.title}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `/api/blogs/${item._id}`
      );

      toast.success("Blog deleted successfully");

      fetchBlogs();
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
      name: "Category",
      selector: (row) => row.category?.name,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div
          style={{
            maxWidth: "400px",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{
            __html: row.description,
          }}
        />
      ),
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="img-fluid"
        />
      ),
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
        data={filteredBlogs}
        pagination
        highlightOnHover
        responsive
      />

      <BlogForm
        show={show}
        setShow={setShow}
        fetchBlogs={fetchBlogs}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import BlogForm from "./NoticeForm";
import Swal from "sweetalert2";

export default function NoticesTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [search, setSearch] = useState("");
  const [notices, setNotices] =
    useState([]);
  const [filteredNotices, setFilteredNotices] =
    useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    const result = notices.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.slug
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredNotices(result);
  }, [search, notices]);

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();

    setNotices(data);
    setFilteredNotices(data);
  };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this notice?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/notices/status/${id}`, {
        status: !status,
      });

      toast.success("Notice updated successfully");
      fetchNotices();
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
      title: "Delete Notice?",
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
        `/api/notices/${item._id}`
      );

      toast.success("Notice deleted successfully");

      fetchNotices();
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
      selector: (row) => row.description,
      sortable: true,
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
        data={filteredNotices}
        pagination
        highlightOnHover
        responsive
      />

      <BlogForm
        show={show}
        setShow={setShow}
        fetchNotices={fetchNotices}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
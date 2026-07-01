"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UniversityForm from "./UniversityForm";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function UniversityTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] =
    useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = universities.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.slug
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredUniversities(result);
  }, [search, universities]);

  const fetchData = async () => {
    const res = await fetch("/api/universities");
    const data = await res.json();

    setUniversities(data);
    setFilteredUniversities(data);
  };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this university?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/universities/${id}`, {
        status: !status,
      });

      toast.success("University updated successfully");
      fetchData();
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
        `/api/universities/${item._id}`
      );

      toast.success("University deleted successfully");

      fetchData();
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
      name: "Type",
      selector: (row) => row.type,
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
        data={filteredUniversities}
        pagination
        highlightOnHover
        responsive
      />

      <UniversityForm
        show={show}
        setShow={setShow}
        fetchData={fetchData}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
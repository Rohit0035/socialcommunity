"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InstituteForm from "./InstituteForm";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function InstituteTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [institutes, setInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] =
  useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = institutes.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.slug
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredInstitutes(result);
  }, [search, institutes]);

  const fetchData = async () => {
    const res = await fetch("/api/institutes");
    const data = await res.json();

    setInstitutes(data);
    setFilteredInstitutes(data);
  };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this institute?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/institutes/status/${id}`, {
        status: !status,
      });

      toast.success("Institute updated successfully");
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
      title: "Delete Institute?",
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
        `/api/institutes/${item._id}`
      );

      toast.success("Institute deleted successfully");

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
      name: "State",
      selector: (row) => row.state,
    },
    {
      name: "Institute Type",
      selector: (row) => row.instituteType,
    },
    {
      name: "University",
      selector: (row) => row.university?.name,
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
        data={filteredInstitutes}
        pagination
        highlightOnHover
        responsive
      />

      <InstituteForm
        show={show}
        setShow={setShow}
        fetchData={fetchData}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
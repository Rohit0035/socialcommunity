"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import PackageForm from "./PackageForm";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function PackageTable({
  show,
  setShow,
  editData,
  setEditData,
}) {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] =
    useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = packages.filter((item) => {
      return (
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.tag
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredPackages(result);
  }, [search, packages]);

  const fetchData = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();

    setPackages(data);
    setFilteredPackages(data);
  };

  const toggleStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "deactivate" : "activate"
        } this package?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(`/api/packages/${id}`, {
        status: !status,
      });

      toast.success("Package updated successfully");
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
        `/api/packages/${item._id}`
      );

      toast.success("Package deleted successfully");

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
      width: "8%",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Exam",
      selector: (row) => row.exam,
      sortable: true,
      width: "15%",
    },
    {
      name: "Tag",
      selector: (row) => row.tag,
      sortable: true,
      width: "15%",
    },
    {
      name: "MRP",
      selector: (row) => row.mrp,
      sortable: true,
      width: "10%",
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "10%",
    },
    {
      name: "Final Price",
      selector: (row) => row.finalPrice,
      sortable: true,
      width: "10%",
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
      width: "30%",
    },
    {
      name: "Features",
      cell: (row) => (
        <ul>
          {row.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )
      ,
      width: "30%",
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
      width: "10%",
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
      width: "20%",
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
        data={filteredPackages}
        pagination
        highlightOnHover
        responsive
      />

      <PackageForm
        show={show}
        setShow={setShow}
        fetchData={fetchData}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.boolean(),
});

export default function NoticeCategoryForm({
  fetchNotices,
  editData,
  setEditData,
  show,
  setShow,
}) {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      title: "",
      description: "",
      status: "true",
      image: null,
    },
  });

  const fetchCategories = async () => {
    const res = await fetch("/api/notice-categories");
    const data = await res.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editData) {
      setValue("category", editData.category?._id);
      setValue("title", editData.title);
      setValue("description", editData.description);
      setValue("status", String(editData.status));
    } else {
      reset({
        category: "",
        title: "",
        description: "",
        status: "true",
      });
    }
  }, [editData, setValue, reset]);

  const handleClose = () => {
    setShow(false);

    setEditData(null);

    reset({
      category: "",
      title: "",
      description: "",
      status: "true",
    });
  };

  const onSubmit = async (data) => {
    try {

      if (editData) {
        await axios.put(
          `/api/notices/${editData._id}`,
          data
        );

        toast.success("Notice updated successfully");
      } else {
        await axios.post("/api/notices", data);

        toast.success("Notice added successfully");
      }

      fetchNotices();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Edit Notice" : "Add Notice"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          {/* CATEGORY */}
          <Form.Group className="mb-3">
            <Form.Label>Notice Category</Form.Label>

            <Form.Select
              placeholder="Enter category"
              {...register("category")}
            >
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </Form.Select>

            {errors.category && (
              <span className="text-danger">
                {errors.category.message}
              </span>
            )}
          </Form.Group>

          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              {...register("title")}
            />

            {errors.title && (
              <span className="text-danger">
                {errors.title.message}
              </span>
            )}
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              {...register("description")}
            />

            {errors.description && (
              <span className="text-danger">
                {errors.description.message}
              </span>
            )}
          </Form.Group>

          {/* STATUS */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Select {...register("status", {
  setValueAs: (v) => v === "true",
})}>
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </Form.Select>

            {errors.status && (
              <span className="text-danger">
                {errors.status.message}
              </span>
            )}
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {editData
              ? "Update"
              : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
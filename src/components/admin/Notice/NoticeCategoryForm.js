"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  status: z.boolean(),
});

export default function NoticeCategoryForm({
  fetchCategories,
  editData,
  setEditData,
  show,
  setShow,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      status: true,
    },
  });

  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setValue("description", editData.description);
      setValue("status", editData.status);
    } else {
      reset({
        name: "",
        description: "",
        status: true,
      });
    }
  }, [editData, setValue, reset]);

  const handleClose = () => {
    setShow(false);

    setEditData(null);

    reset({
      name: "",
      description: "",
      status: true,
    });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        slug: data.name.toLowerCase().replaceAll(" ", "-"),
      };

      if (editData) {
        await axios.put(
          `/api/notice-categories/${editData._id}`,
          payload
        );
        toast.success(
          "Category updated successfully"
        );
      } else {
        await axios.post(
          "/api/notice-categories",
          payload
        );
        toast.success(
          "Category added successfully"
        );
      }

      fetchCategories();

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
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Edit Notice Category" : "Add Notice Category"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Notice Category Name</Form.Label>

            <Form.Control
              type="text"
              {...register("name")}
            />

            {errors.name && (
              <span className="text-danger">
                {errors.name.message}
              </span>
            )}
          </Form.Group>

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

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Select
              {...register("status", {
  setValueAs: (v) => v === "true",
})}
            >
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
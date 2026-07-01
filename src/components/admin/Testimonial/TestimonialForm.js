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
  rating: z.coerce.number().min(1).max(5),
  description: z.string().min(1, "Description is required"),
  status: z.boolean(),
});

export default function TestimonialForm({
  fetchData,
  editData,
  setEditData,
  show,
  setShow,
}) {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
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
      image: "",
      rating: 1,
      description: "",
      status: true,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setValue("rating", editData.rating);
      setValue("description", editData.description);
      setValue("status", editData.status);

      setImagePreview(editData.image || "");
    } else {
      reset({
        name: "",
        rating: 1,
        description: "",
        status: true,
      });

      setImageFile(null);
      setImagePreview("");
    }
  }, [editData, setValue, reset]);

  const handleClose = () => {
    setShow(false);
    setEditData(null);

    setImageFile(null);
    setImagePreview("");

    reset({
      name: "",
      rating: 1,
      description: "",
      status: true,
    });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("rating", data.rating);
      formData.append("description", data.description);
      formData.append("status", data.status);
      formData.append(
        "slug",
        data.name.toLowerCase().replaceAll(" ", "-")
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editData) {
        await axios.put(
          `/api/testimonials/${editData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Testimonial updated successfully");
      } else {
        await axios.post(
          "/api/testimonials",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Testimonial added successfully");
      }

      fetchData();
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
          {editData ? "Edit Testimonial" : "Add Testimonial"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

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
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>

            <Form.Control
              type="number"
              {...register("rating")}
            />

            {errors.rating && (
              <span className="text-danger">
                {errors.rating.message}
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
              ? "Update Testimonial"
              : "Save Testimonial"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
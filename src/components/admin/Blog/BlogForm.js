"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm, Controller } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.boolean(),
  image: z.any().optional(),
});

export default function BlogCategoryForm({
  fetchBlogs,
  editData,
  setEditData,
  show,
  setShow,
}) {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

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
    const res = await fetch("/api/blog-categories");
    const data = await res.json();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const imageFile = watch("image");

  // IMAGE PREVIEW
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];

      const imageUrl = URL.createObjectURL(file);

      setPreview(imageUrl);

      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    if (editData) {
      setValue("category", editData.category?._id);
      setValue("title", editData.title);
      setValue("description", editData.description);
      setValue("status", String(editData.status));

      if (editData.image) {
        setPreview(editData.image);
      }
    } else {
      reset({
        category: "",
        title: "",
        description: "",
        status: "true",
        image: null,
      });

      setPreview(null);
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
      image: null,
    });

    setPreview(null);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();

      formData.append("category", data.category);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("status", data.status);

      formData.append(
        "slug",
        data.title.toLowerCase().replaceAll(" ", "-")
      );

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (editData) {
        console.log(editData)
        await axios.put(
          `/api/blogs/${editData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Blog updated successfully");
      } else {
        await axios.post("/api/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Blog added successfully");
      }

      fetchBlogs();

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  // QUILL MODULES
  const imageHandler = function () {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      const formData = new FormData();

      formData.append("image", file);

      try {
        const response = await axios.post(
          "/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.url;

        const quill =
          this.quill || this;

        const range = quill.getSelection();

        quill.insertEmbed(
          range.index,
          "image",
          imageUrl
        );

        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error(error);

        toast.error("Image upload failed");
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Edit Blog" : "Add Blog"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          {/* CATEGORY */}
          <Form.Group className="mb-3">
            <Form.Label>Blog Category</Form.Label>

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

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  modules={modules}
                />
              )}
            />

            {errors.description && (
              <span className="text-danger">
                {errors.description.message}
              </span>
            )}
          </Form.Group>

          {/* IMAGE */}
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              accept="image/*"
              {...register("image")}
            />

            {errors.image && (
              <span className="text-danger">
                {errors.image.message}
              </span>
            )}

            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
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
              ? "Update Blog"
              : "Save Blog"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
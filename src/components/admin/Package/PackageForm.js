"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    exam: z.string().min(1, "Exam is required"),
    tag: z.string().min(1, "Tag is required"),
    color: z.string().min(1, "Color is required"),
    mrp: z.coerce.number().positive("MRP must be greater than 0"),
    discount: z.coerce.number().min(0),
    finalPrice: z.coerce
      .number()
      .positive("Final Price must be greater than 0"),

      
    features: z.array(
      z.object({
        value: z.string().min(1, "Feature is required"),
      })
    ),
    note: z.string().optional(),

    status: z.boolean(),
  })
  .refine(
    (data) => data.finalPrice <= data.mrp,
    {
      message:
        "Final Price must be less than or equal to MRP",
      path: ["finalPrice"],
    }
  );

export default function PackageForm({
  fetchData,
  editData,
  setEditData,
  show,
  setShow,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      exam: "",
      tage: "",
      color: "",
      mrp: "",
      discount: "",
      finalPrice: "",
      features: [{ value: "" }],
      note: "",
      status: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const mrp = watch("mrp");
  const finalPrice = watch("finalPrice");

  useEffect(() => {
    const mrpValue = Number(mrp);
    const finalPriceValue = Number(finalPrice);

    if (
      mrpValue > 0 &&
      finalPriceValue >= 0 &&
      finalPriceValue <= mrpValue
    ) {
      const discount =
        mrpValue - finalPriceValue;

      setValue(
        "discount",
        Number(discount.toFixed(2))
      );
    } else {
      setValue("discount", 0);
    }
  }, [mrp, finalPrice, setValue]);

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || "",
        exam: editData.exam || "",
        tag: editData.tag || "",
        color: editData.color || "",
        mrp: editData.mrp || "",
        discount: editData.discount || "",
        finalPrice: editData.finalPrice || "",
        features:
        editData.features?.length > 0
        ? editData.features.map((item) => ({
          value: item,
        }))
        : [{ value: "" }],
        note: editData.note || "",
        status: editData.status ?? true,
      });
    } else {
      reset({
        name: "",
        exam: "",
        tag: "",
        color: "",
        mrp: "",
        discount: "",
        finalPrice: "",
        features: [{ value: "" }],
        note: "",
        status: true,
      });
    }
  }, [editData, setValue, reset]);

  const handleClose = () => {
    setShow(false);

    setEditData(null);

    reset({
      name: "",
      exam: "",
      tag: "",
      color: "",
      mrp: "",
      discount: "",
      finalPrice: "",
      features: [{ value: "" }],
      note: "",
      status: true,
    });
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        features: data.features.map(item => item.value),
        slug: data.name.toLowerCase().replaceAll(" ", "-"),
      };

      if (editData) {
        await axios.put(
          `/api/packages/${editData._id}`,
          payload
        );
        toast.success(
          "Package updated successfully"
        );
      } else {
        await axios.post(
          "/api/packages",
          payload
        );
        toast.success(
          "Package added successfully"
        );
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
          {editData ? "Edit Package" : "Add Package"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Package Name</Form.Label>

            <Form.Control
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
            />

            {errors.name && (
              <span className="text-danger">
                {errors.name.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exam</Form.Label>
            <Form.Select
              {...register("exam")}
              isInvalid={!!errors.exam}
            >
              <option value="">Select Exam</option>
              <option value="NEET UG">NEET UG</option>
              <option value="NEET PG">NEET PG</option>
              <option value="NEET MDS">NEET MDS</option>
              <option value="INICET">INICET</option>
              <option value="DNB PDCET">DNB PDCET</option>
              <option value="NEET SS">NEET SS</option>
            </Form.Select>
            {errors.exam && (
              <span className="text-danger">
                {errors.exam.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              {...register("tag")}
              isInvalid={!!errors.tag}
            />
            {errors.tag && (
              <span className="text-danger">
                {errors.tag.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="color"
              className="w-100"
              {...register("color")}
              isInvalid={!!errors.color}
            />
            {errors.color && (
              <span className="text-danger">
                {errors.color.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              {...register("mrp")}
              isInvalid={!!errors.mrp}
            />
            {errors.mrp && (
              <span className="text-danger">
                {errors.mrp.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="number"
              {...register("discount")}
              isInvalid={!!errors.discount}
              readOnly
            />
            {errors.discount && (
              <span className="text-danger">
                {errors.discount.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Final Price</Form.Label>
            <Form.Control
              type="number"
              {...register("finalPrice")}
              isInvalid={!!errors.finalPrice}
            />
            {errors.finalPrice && (
              <span className="text-danger">
                {errors.finalPrice.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="d-flex gap-2 mb-2"
              >
                <div className="w-100">
                  <Form.Control
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    isInvalid={!!errors.features?.[index]?.value}
                    {...register(`features.${index}.value`)}
                  />

                  {errors.features?.[index]?.value && (
                    <div className="text-danger mt-1">
                      {errors.features[index].value.message}
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  variant="success"
                  onClick={() => append({ value: "" })}
                >
                  +
                </Button>

                {
                  fields.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => remove(index)}
                    >
                      -
                    </Button>
                  )
                }
              </div>
            ))}

            {errors.features && (
              <span className="text-danger">
                {errors.features.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              {...register("note")}
              isInvalid={!!errors.note}
            />

            {errors.note && (
              <span className="text-danger">
                {errors.note.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Select
              {...register("status", {
                setValueAs: (v) => v === "true",
              })}
              isInvalid={!!errors.status}
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
    </Modal >
  );
}
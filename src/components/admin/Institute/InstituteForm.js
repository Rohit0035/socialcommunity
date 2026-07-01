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
import { authorities, instituteTypes, languages, states } from "../data";

export const schema = z.object({
  name: z.string().min(1, "Institute name is required"),
  slug: z.string().optional(),
  state: z.string().min(1, "State is required"),
  instituteType: z.string().min(1, "Institute type is required"),
  instituteManagement: z.string().min(1, "Institute management is required"),
  university: z.string().min(1, "University is required"),
  website: z.union([
    z.string().url(),
    z.literal(""),
  ]).optional(),
  courses: z.array(z.string()).default([]),
  logoImage: z.any().optional(),
  coverImage: z.any().optional(),
  galleryImages: z.any().optional(),

  fee: z.object({
    min: z.coerce.number().default(0),
    max: z.coerce.number().default(0),
  }),
  seats: z.coerce.number().default(0),
  beds: z.object({
    count: z.coerce.number().default(0),
    details: z.string().optional(),
  }),
  establishedYear: z.coerce.number().default(0),
  languages: z.array(z.string()).default([]),
  about: z.string().optional(),
  location: z.object({
    city: z.string().optional(),
    district: z.string().optional(),
    pincode: z.string().optional(),
    address: z.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    googleMapsUrl: z.union([
      z.string().url(),
      z.literal(""),
    ]).optional(),
  }),
  airport: z.object({
    name: z.string().optional(),
    distance: z.coerce.number().default(0),
    link: z.union([
      z.string().url(),
      z.literal(""),
    ]).optional(),
  }),
  contactPerson: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    emails: z.array(z.string().email()).default([]),
    phoneNos: z.array(z.string()).default([]),
  }),
  dean: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    emails: z.array(z.string().email()).default([]),
    phoneNos: z.array(z.string()).default([]),
  }),
  nodalOfficer: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    emails: z.array(z.string().email()).default([]),
    phoneNos: z.array(z.string()).default([]),
  }),
  hostel: z.object({
    mensHostelAvailability: z.boolean().default(false),
    womensHostelAvailability: z.boolean().default(false),
    details: z.string().optional(),
    feeDetails: z.string().optional(),
    mess: z.object({
      veg: z.boolean().default(false),
      nonVeg: z.boolean().default(false),
      details: z.string().optional(),
    }),
  }),

  marbProforma: z.object({
    file: z.any().optional(),
    link: z.union([
      z.string().url(),
      z.literal(""),
    ]).optional(),
  }),

  nmcClinicDetails: z.object({
    file: z.any().optional(),
    link: z.union([
      z.string().url(),
      z.literal(""),
    ]).optional(),
  }),

  mbbsExamResult: z.object({
    availability: z.boolean().default(false),

    links: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ).default([]),
  }),

  videos: z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    })
  ).default([]),

  profiles: z.object({
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
  }),

  infoLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    })
  ).default([]),
});

const defaultValues = {
  name: "",
  slug: "",
  state: "",
  instituteType: "",
  instituteManagement: "",
  university: "",
  website: "",

  courses: [],

  fee: {
    min: 0,
    max: 0,
  },

  seats: 0,

  beds: {
    count: 0,
    details: "",
  },

  establishedYear: 0,

  languages: [],

  about: "",

  location: {
    city: "",
    district: "",
    pincode: "",
    address: "",
    latitude: "",
    longitude: "",
    googleMapsUrl: "",
  },

  airport: {
    name: "",
    distance: 0,
    link: "",
  },

  contactPerson: {
    name: "",
    designation: "",
    emails: [],
    phoneNos: [],
  },

  dean: {
    name: "",
    designation: "",
    emails: [],
    phoneNos: [],
  },

  nodalOfficer: {
    name: "",
    designation: "",
    emails: [],
    phoneNos: [],
  },

  hostel: {
    mensHostelAvailability: false,
    womensHostelAvailability: false,
    details: "",
    feeDetails: "",
    mess: {
      veg: false,
      nonVeg: false,
      details: "",
    },
  },

  marbProforma: {
    file: null,
    link: "",
  },

  nmcClinicDetails: {
    file: null,
    link: "",
  },

  mbbsExamResult: {
    availability: false,
    links: [],
  },

  videos: [],

  profiles: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  },

  infoLinks: [],

  status: true,
};

export default function InstituteForm({
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
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const logoFile = watch("logoImage");
  const coverFile = watch("coverImage");
  const galleryFiles = watch("galleryImages");

  useEffect(() => {
    if (!logoFile?.[0]) {
      // setLogoPreview(null);
      return;
    }

    const url = URL.createObjectURL(logoFile[0]);
    setLogoPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [logoFile]);

  useEffect(() => {
    if (!coverFile?.[0]) {
      // setCoverPreview(null);
      return;
    }

    const url = URL.createObjectURL(coverFile[0]);
    setCoverPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  useEffect(() => {
    if (!galleryFiles?.length) {
      // setGalleryPreviews([]);
      return;
    }

    const urls = Array.from(galleryFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryFiles]);

  const fetchUniversities = async () => {
    const res = await fetch("/api/universities");
    const data = await res.json();

    setUniversities(data);
  };

  const fetchCourses = async () => {
    const res = await fetch("/api/courses");
    const data = await res.json();

    setCourses(data);
  };

  useEffect(() => {
    fetchUniversities();
    fetchCourses();
  }, []);


  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || "",
        slug: editData.slug || "",
        state: editData.state || "",
        instituteType: editData.instituteType || "",
        instituteManagement: editData.instituteManagement || "",
        university:
          typeof editData.university === "object"
            ? editData.university?._id
            : editData.university || "",
        website: editData.website || "",

        courses: editData.courses?.map((c) =>
          typeof c === "object" ? c._id : c
        ) || [],

        fee: {
          min: editData.fee?.min || 0,
          max: editData.fee?.max || 0,
        },

        seats: editData.seats || 0,

        beds: {
          count: editData.beds?.count || 0,
          details: editData.beds?.details || "",
        },

        establishedYear: editData.establishedYear || 0,

        languages: editData.languages || [],

        about: editData.about || "",

        location: {
          city: editData.location?.city || "",
          district: editData.location?.district || "",
          pincode: editData.location?.pincode || "",
          address: editData.location?.address || "",
          latitude: editData.location?.latitude || "",
          longitude: editData.location?.longitude || "",
          googleMapsUrl:
            editData.location?.googleMapsUrl || "",
        },

        airport: {
          name: editData.airport?.name || "",
          distance: editData.airport?.distance || 0,
          link: editData.airport?.link || "",
        },

        contactPerson: {
          name: editData.contactPerson?.name || "",
          designation: editData.contactPerson?.designation || "",
          emails: editData.contactPerson?.emails?.join(", ") || "",
          phoneNos: editData.contactPerson?.phoneNos?.join(", ") || "",
        },

        dean: {
          name: editData.dean?.name || "",
          designation: editData.dean?.designation || "",
          emails: editData.dean?.emails?.join(", ") || "",
          phoneNos: editData.dean?.phoneNos?.join(", ") || "",
        },

        nodalOfficer: {
          name: editData.nodalOfficer?.name || "",
          designation: editData.nodalOfficer?.designation || "",
          emails: editData.nodalOfficer?.emails?.join(", ") || "",
          phoneNos: editData.nodalOfficer?.phoneNos?.join(", ") || "",
        },

        hostel: {
          mensHostelAvailability:
            editData.hostel?.mensHostelAvailability || false,
          womensHostelAvailability:
            editData.hostel?.womensHostelAvailability || false,
          details: editData.hostel?.details || "",
          feeDetails:
            editData.hostel?.feeDetails || "",
          mess: {
            veg: editData.hostel?.mess?.veg || false,
            nonVeg:
              editData.hostel?.mess?.nonVeg || false,
            details:
              editData.hostel?.mess?.details || "",
          },
        },

        marbProforma: {
          link: editData.marbProforma?.link || "",
        },

        nmcClinicDetails: {
          link:
            editData.nmcClinicDetails?.link || "",
        },

        mbbsExamResult: {
          availability:
            editData.mbbsExamResult?.availability || false,
          links:
            editData.mbbsExamResult?.links || [],
        },

        videos: editData.videos || [],

        profiles: {
          facebook:
            editData.profiles?.facebook || "",
          instagram:
            editData.profiles?.instagram || "",
          twitter:
            editData.profiles?.twitter || "",
          linkedin:
            editData.profiles?.linkedin || "",
          youtube:
            editData.profiles?.youtube || "",
        },

        infoLinks: editData.infoLinks || [],

        status:
          editData.status !== undefined
            ? editData.status
            : true,
      });

      // image previews from existing urls
      setLogoPreview(editData.logoImage || null);
      setCoverPreview(editData.coverImage || null);
      setGalleryPreviews(editData.galleryImages || []);
    } else {
      reset(defaultValues);
      setLogoPreview(null);
      setCoverPreview(null);
      setGalleryPreviews([]);
    }

  }, [editData, setValue, reset]);

  const handleClose = () => {
    setShow(false);

    setEditData(null);

    reset(defaultValues);
    setLogoPreview(null);
    setCoverPreview(null);
    setGalleryPreviews([]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // 1. Create a deep copy of the data to avoid mutating form state
      const payload = JSON.parse(JSON.stringify(data));

      // 2. Generate the slug if missing
      payload.slug =
        payload.slug ||
        payload.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      // 3. FIX: Remove top-level file inputs from the JSON payload
      delete payload.logoImage;
      delete payload.coverImage;
      delete payload.galleryImages;

      // 4. FIX: Handle the 'university' ObjectId error
      if (payload.university === "") {
        delete payload.university;
      }

      // 5. FIX: Remove nested file objects preventing Mongoose string casting
      if (payload.marbProforma) {
        delete payload.marbProforma.file;
      }
      if (payload.nmcClinicDetails) {
        delete payload.nmcClinicDetails.file;
      }

      // Append the cleaned JSON payload
      formData.append("data", JSON.stringify(payload));

      // 6. Append the actual files to formData so the backend can process them
      if (data.logoImage?.[0]) formData.append("logoImage", data.logoImage[0]);
      if (data.coverImage?.[0]) formData.append("coverImage", data.coverImage[0]);

      if (data.galleryImages?.length) {
        Array.from(data.galleryImages).forEach((file) => {
          formData.append("galleryImages", file);
        });
      }

      // Append the MARB and NMC files to formData if they exist
      if (data.marbProforma?.file?.[0]) {
        formData.append("marbProformaFile", data.marbProforma.file[0]);
      }
      if (data.nmcClinicDetails?.file?.[0]) {
        formData.append("nmcClinicDetailsFile", data.nmcClinicDetails.file[0]);
      }

      // 7. Send API Request
      if (editData?._id) {
        await axios.put(`/api/institutes/${editData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Institute updated successfully");
      } else {
        await axios.post("/api/institutes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Institute added successfully");
      }

      await fetchData();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {editData ? "Edit Institute" : "Add Institute"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>

          {/* BASIC INFO */}

          <h5 className="mb-3">Basic Information</h5>

          <Form.Group className="mb-3">
            <Form.Label>Institute Name</Form.Label>
            <Form.Control {...register("name")} />
            {errors.name && (
              <span className="text-danger">
                {errors.name.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select {...register("state")} >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
            {errors.state && (
              <span className="text-danger">
                {errors.state.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Institute Type</Form.Label>
            <Form.Select {...register("instituteType")} >
              <option value="">Select Institute Type</option>
              {instituteTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            {errors.instituteType && (
              <span className="text-danger">
                {errors.instituteType.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>University</Form.Label>
            <Form.Select {...register("university")} >
              <option value="">Select University</option>
              {universities.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </Form.Select>
            {errors.university && (
              <span className="text-danger">
                {errors.university.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control {...register("website")} />
            {errors.website && (
              <span className="text-danger">
                {errors.website.message}
              </span>
            )}
          </Form.Group>

          <div className="row g-3">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Seats</Form.Label>
                <Form.Control
                  type="number"
                  {...register("seats")}
                />
                {errors.seats && (
                  <span className="text-danger">
                    {errors.seats.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Institute Management</Form.Label>
                <Form.Select {...register("instituteManagement")} >
                  {authorities.map((authority) => (
                    <option key={authority} value={authority}>
                      {authority}
                    </option>
                  ))}
                </Form.Select>
                {errors.instituteManagement && (
                  <span className="text-danger">
                    {errors.instituteManagement.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Beds Count</Form.Label>
                <Form.Control
                  type="number"
                  {...register("beds.count")}
                />
                {errors.beds && (
                  <span className="text-danger">
                    {errors.beds.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Beds Details</Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("beds.details")}
                />
                {errors.beds && (
                  <span className="text-danger">
                    {errors.beds.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Min Fee</Form.Label>
                <Form.Control
                  type="number"
                  {...register("fee.min")}
                />
                {errors.fee && (
                  <span className="text-danger">
                    {errors.fee.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Max Fee</Form.Label>
                <Form.Control
                  type="number"
                  {...register("fee.max")}
                />
                {errors.fee && (
                  <span className="text-danger">
                    {errors.fee.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Courses Offered</Form.Label>
            <Form.Select {...register("courses")} multiple >
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.shortName} ({course.name})
                </option>
              ))}
            </Form.Select>
            {errors.courses && (
              <span className="text-danger">
                {errors.courses.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Languages</Form.Label>
            <Form.Select {...register("languages")} multiple >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Form.Select>
            {errors.languages && (
              <span className="text-danger">
                {errors.languages.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...register("about")}
            />
            {errors.about && (
              <span className="text-danger">
                {errors.about.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Institute Established Year</Form.Label>
            <Form.Control
              type="number"
              {...register("establishedYear")}
            />
            {errors.establishedYear && (
              <span className="text-danger">
                {errors.establishedYear.message}
              </span>
            )}
          </Form.Group>

          <hr />

          {/* LOCATION */}

          <h5 className="mb-3">Location</h5>

          <div className="row g-3">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  {...register("location.city")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>District</Form.Label>
                <Form.Control
                  {...register("location.district")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  {...register("location.pincode")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("location.address")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  {...register("location.latitude")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  {...register("location.longitude")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Google Maps URL</Form.Label>
                <Form.Control
                  {...register("location.googleMapsUrl")}
                />
                {errors.location && (
                  <span className="text-danger">
                    {errors.location.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>

          <hr />

          <h5 className="mb-3">Nearest Airport</h5>

          <div className="row g-3">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Airport Name</Form.Label>
                <Form.Control
                  {...register("airport.name")}
                />
                {errors.airport && (
                  <span className="text-danger">
                    {errors.airport.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Distance (KM)</Form.Label>
                <Form.Control
                  type="number"
                  {...register("airport.distance")}
                />
                {errors.airport && (
                  <span className="text-danger">
                    {errors.airport.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Airport Link</Form.Label>
                <Form.Control
                  {...register("airport.link")}
                />
                {errors.airport && (
                  <span className="text-danger">
                    {errors.airport.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>

          <hr />

          <h5 className="mb-3">Contact Details</h5>
          <h5 className="mb-3">Contact Person</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("contactPerson.name")}
                />
                {errors.contactPerson && (
                  <span className="text-danger">
                    {errors.contactPerson.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  {...register("contactPerson.designation")}
                />
                {errors.contactPerson && (
                  <span className="text-danger">
                    {errors.contactPerson.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Emails (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("contactPerson.emails", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
}
                  })}
                />
                {errors.contactPerson && (
                  <span className="text-danger">
                    {errors.contactPerson.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Phone Nos (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("contactPerson.phoneNos", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
}
                  })}
                />
                {errors.contactPerson && (
                  <span className="text-danger">
                    {errors.contactPerson.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>

          <h5 className="mb-3">Dean</h5>

          <div className="row g-3">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("dean.name")}
                />
                {errors.dean && (
                  <span className="text-danger">
                    {errors.dean.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  {...register("dean.designation")}
                />
                {errors.dean && (
                  <span className="text-danger">
                    {errors.dean.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Emails (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("dean.emails", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
}
                  })}
                />
                {errors.dean && (
                  <span className="text-danger">
                    {errors.dean.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Phone Nos (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("dean.phoneNos", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
},
                  })}
                />
                {errors.dean && (
                  <span className="text-danger">
                    {errors.dean.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>


          <h5 className="mb-3">Nodal Officer</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("nodalOfficer.name")}
                />
                {errors.nodalOfficer && (
                  <span className="text-danger">
                    {errors.nodalOfficer.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  {...register("nodalOfficer.designation")}
                />
                {errors.nodalOfficer && (
                  <span className="text-danger">
                    {errors.nodalOfficer.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Emails (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("nodalOfficer.emails", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
},
                  })}
                />
                {errors.nodalOfficer && (
                  <span className="text-danger">
                    {errors.nodalOfficer.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <div className="col-md-3">
              <Form.Group className="mb-3">
                <Form.Label>Phone Nos (Comma Separated)</Form.Label>
                <Form.Control
                  {...register("nodalOfficer.phoneNos", {
                    setValueAs: (value) => {
  if (Array.isArray(value)) return value;

  return typeof value === "string"
    ? value
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
    : [];
},
                  })}
                />
                {errors.nodalOfficer && (
                  <span className="text-danger">
                    {errors.nodalOfficer.message}
                  </span>
                )}
              </Form.Group>
            </div>
          </div>

          <hr />

          {/* MEDIA */}

          <h5 className="mb-3">Media</h5>

          <Form.Group className="mb-3">
            <Form.Label>Logo Image</Form.Label>
            <Form.Control
              type="file"
              {...register("logoImage")} accept="image/*" />
            {errors.logoImage && (
              <span className="text-danger">
                {errors.logoImage.message}
              </span>
            )}
            {logoPreview && (
              <div className="mt-3">
                <img
                  src={logoPreview}
                  alt="logoPreview"
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

          <Form.Group className="mb-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control type="file" {...register("coverImage")} accept="image/*" />
            {errors.coverImage && (
              <span className="text-danger">
                {errors.coverImage.message}
              </span>
            )}
            {coverPreview && (
              <div className="mt-3">
                <img
                  src={coverPreview}
                  alt="coverPreview"
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

          <Form.Group className="mb-3">
            <Form.Label>Gallery Images</Form.Label>
            <Form.Control type="file" {...register("galleryImages")} accept="image/*" multiple />
            {errors.galleryImages && (
              <span className="text-danger">
                {errors.galleryImages.message}
              </span>
            )}
            {galleryPreviews && galleryPreviews.length > 0 &&
              galleryPreviews.map((image, index) => (
                <div className="mt-3" key={index}>
                  <img
                    src={image}
                    alt="galleryPreviews"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))
            }
          </Form.Group>

          <hr />

          {/* HOSTEL */}

          <h5 className="mb-3">Accommodation and Food</h5>
          <h5 className="mb-3">Hostel</h5>

          <Form.Check
            label="Men Hostel Available"
            id="hostel.mensHostelAvailability"
            {...register("hostel.mensHostelAvailability")}
          />

          <Form.Check
            label="Women Hostel Available"
            id="hostel.womensHostelAvailability"
            {...register("hostel.womensHostelAvailability")}
          />

          <Form.Check
            label="Veg Mess"
            id="hostel.mess.veg"
            {...register("hostel.mess.veg")}
          />

          <Form.Check
            label="Non Veg Mess"
            id="hostel.mess.nonVeg"
            {...register("hostel.mess.nonVeg")}
          />

          <Form.Group className="mt-3">
            <Form.Label>Hostel Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("hostel.details")}
            />
            {errors.hostel && (
              <span className="text-danger">
                {errors.hostel.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Hostel Fee Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("hostel.feeDetails")}
            />
            {errors.hostel && (
              <span className="text-danger">
                {errors.hostel.message}
              </span>
            )}
          </Form.Group>

          <hr />

          {/* SOCIAL */}

          <h5 className="mb-3 mt-3">MARB Proforma</h5>
          <Form.Group className="mt-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              {...register("marbProforma.file", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue("marbProforma.file", file);
                  }
                }
              })}
            />
            {errors.marbProforma && (
              <span className="text-danger">
                {errors.marbProforma.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              {...register("marbProforma.link")}
            />
            {errors.marbProforma && (
              <span className="text-danger">
                {errors.marbProforma.message}
              </span>
            )}
          </Form.Group>

          <h5 className="mb-3 mt-3">NMC Clinic Details / Materials</h5>
          <Form.Group className="mt-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              {...register("nmcClinicDetails.file", {
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setValue("nmcClinicDetails.file", file);
                  }
                }
              })}
            />
            {errors.nmcClinicDetails && (
              <span className="text-danger">
                {errors.nmcClinicDetails.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Link</Form.Label>
            <Form.Control
              type="text"
              {...register("nmcClinicDetails.link")}
            />
            {errors.nmcClinicDetails && (
              <span className="text-danger">
                {errors.nmcClinicDetails.message}
              </span>
            )}
          </Form.Group>

          <h5 className="mb-3 mt-3">MBBS Exam Result</h5>
          <Form.Check
            label="Available"
            {...register("mbbsExamResult.availability")}
          />

          <hr />

          <h5 className="mb-3">Profiles</h5>

          <Form.Group className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control
              {...register("profiles.facebook")}
            />
            {errors.profiles && (
              <span className="text-danger">
                {errors.profiles.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control
              {...register("profiles.instagram")}
            />
            {errors.profiles && (
              <span className="text-danger">
                {errors.profiles.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Twitter</Form.Label>
            <Form.Control
              {...register("profiles.twitter")}
            />
            {errors.profiles && (
              <span className="text-danger">
                {errors.profiles.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn</Form.Label>
            <Form.Control
              {...register("profiles.linkedin")}
            />
            {errors.profiles && (
              <span className="text-danger">
                {errors.profiles.message}
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>YouTube</Form.Label>
            <Form.Control
              {...register("profiles.youtube")}
            />
            {errors.profiles && (
              <span className="text-danger">
                {errors.profiles.message}
              </span>
            )}
          </Form.Group>

          <hr />

          {/* STATUS */}

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
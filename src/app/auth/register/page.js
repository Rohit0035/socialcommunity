"use client";
import { useMemo, useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import {
  FaRegUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../../assets/styles/social-auth.css";
import Authimf1 from "../../../assets/images/auth-sl-1.jpg";
import Authimg2 from "../../../assets/images/auth-sl2.jpg";
import Image from "next/image";

import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ADD THIS
import debounce from "lodash/debounce";
import toast from "react-hot-toast";

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: 100 },
  (_, i) => currentYear - i
);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    terms: false
  });

  const [usernameStatus, setUsernameStatus] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    if (e.target.name === "terms") {
      setFormData({
        ...formData,
        [e.target.name]: !formData.terms,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    // remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
      general: "",
    });
  };

  const checkUsername = useMemo(
    () =>
      debounce(async (username) => {
        if (!username) {
          setUsernameStatus("");
          return;
        }

        try {
          setCheckingUsername(true);

          const res = await axios.get(
            `/api/auth/check-username?username=${username}`
          );

          if (res.data.exists) {
            setErrors({
              ...errors, 
              username: "Username already taken" 
            });
            setUsernameStatus("Username already taken");
          } else {
            setErrors({
              ...errors, 
              username: ""
            })
            setUsernameStatus("Username available");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setCheckingUsername(false);
        }
      }, 800),
    []
  );

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.day) {
      newErrors.day = "Day is required";
    }

    if (!formData.month) {
      newErrors.month = "Month is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (formData.day && formData.month && formData.year) {
      const date = new Date(formData.year, formData.month - 1, formData.day);
      const today = new Date();
      if (date > today) {
        newErrors.date = "Date of birth cannot be in the future";
      }
    }

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (usernameStatus === "Username already taken") {
      newErrors.username = "Username already taken";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      if (!validate()) return;
      setLoading(true);
      const dateOfBirth = new Date(
        formData.year,
        formData.month - 1,
        formData.day
      );
      const payload = {
        ...formData,
        dateOfBirth: dateOfBirth.toISOString(),
      }

      const res = await axios.post("/api/auth/register", payload);

      if (res.data) {
        toast.success("Account Created");
        
        router.push("/auth/login");
      }
    } catch (error) {
      setErrors({ general: error?.response?.data?.error || "Something went wrong" });
      // alert(error?.response?.data?.error || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-main px-0">
      <Row className="g-0 h-100">
        <Col lg="6" className="left-section d-none d-lg-flex">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            className="auth-swiper"
          >
            <SwiperSlide>
              <div className="slide-content">
                <div
                  className="mb-2 mx-auto"
                  style={{ width: "200px", height: "200px" }}
                >
                  <Image src={Authimf1} alt="slide" className="w-100 h-100" />
                </div>

                <h3>Together Is Better</h3>

                <p className="text-white">
                  It is a long established fact that a reader will be distracted
                  by readable content.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide-content">
                <div
                  className="mb-2 mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "100px",
                  }}
                >
                  <Image src={Authimg2} alt="slide" className="w-100 h-100" />
                </div>

                <h3>Share Your Moments</h3>

                <p className="text-white">
                  Upload reels and connect with the world instantly.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </Col>

        <Col lg="6" xs="12" className="right-section" data-aos="zoom-in">
          <div className="auth-card">
            <div className="logo">
              <span className="logo-icon">◉</span>
              <h4>Logo</h4>
            </div>

            <p className="subtitle">
              Welcome to Logo, a platform to connect with the social world
            </p>

            {errors.general && (
              <div className="alert alert-danger mt-3">
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>

              <div className="input-box">
                <FaEnvelope />

                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@example"
                />
              </div>

              {errors.email && (
                <p className="text-danger small mt-1">
                  {errors.email}
                </p>
              )}

              <label>Your Password</label>

              <div
                className="input-box"
                style={{ position: "relative" }}
              >
                <FaLock
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#555",
                  }}
                />

                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={{ paddingLeft: "35px" }}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-danger small mt-1">
                  {errors.password}
                </p>
              )}

              <label>Date Of Birth</label>

              <Row className="g-2">

                {/* MONTH */}
                <Col xs="4">
                  <Input
                    type="select"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  >
                    <option value="">Month</option>

                    {months.map((month, index) => (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </Input>
                  {errors.month && (
                    <p className="text-danger small mt-1">
                      {errors.month}
                    </p>
                  )}
                </Col>

                {/* DAY */}
                <Col xs="4">
                  <Input
                    type="select"
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                  >
                    <option value="">Day</option>

                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Input>
                  {errors.day && (
                    <p className="text-danger small mt-1">
                      {errors.day}
                    </p>
                  )}
                </Col>

                {/* YEAR */}
                <Col xs="4">
                  <Input
                    type="select"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  >
                    <option value="">Year</option>

                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Input>
                  {errors.year && (
                    <p className="text-danger small mt-1">
                      {errors.year}
                    </p>
                  )}
                </Col>
              </Row>

              {errors.date && (
                <p className="text-danger small mt-1">
                  {errors.date}
                </p>
              )}

              <label>Your Full Name</label>

              <div className="input-box">
                <FaRegUser />

                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
              </div>

              {errors.name && (
                <p className="text-danger small mt-1">
                  {errors.name}
                </p>
              )}

              <label>Username</label>

              <div className="input-box">
                <FaRegUser />

                <Input
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    handleChange(e);
                    checkUsername(e.target.value);
                  }}
                  placeholder="Your Username"
                />
              </div>

              {errors.username && (
                <p className="text-danger small mt-1">
                  {errors.username}
                </p>
              )}

              {checkingUsername ? (
                <small style={{ color: "#888" }}>Checking...</small>
              ) : (
                usernameStatus && usernameStatus === "Username available" && (
                  <small
                    style={{
                      color: "green"
                    }}
                  >
                    {usernameStatus}
                  </small>
                )
              )}

              <div className="terms">
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />

                <label htmlFor="terms">
                  I Accept <a>Terms And Conditions</a>
                </label>
                {errors.terms && (
                  <p className="text-danger small mt-1">
                    {errors.terms}
                  </p>
                )}
              </div>

              <button
                onClick={handleRegister}
                className="btn btn-primary w-100"
              >
                {loading ? "Loading..." : "SIGN UP"}
              </button>

              <div className="my-4 text-center text-muted">
                <span>--------- Or ---------</span>
              </div>

              {/* GOOGLE BUTTON */}
              <button
                onClick={() => signIn("google", {
                  callbackUrl: "/main/home",
                })}
                className="btn btn-light w-100"
              >
                <FcGoogle size={30} /> Continue with Google
              </button>

              <p className="bottom-text">
                Already Have An Account ?{" "}
                <span>
                  <a href="/auth/login">Login</a>
                </span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
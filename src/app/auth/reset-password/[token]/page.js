"use client";

import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Container, Row, Col, Input } from "reactstrap";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "@/assets/styles/social-auth.css";

import Authimf1 from "@/assets/images/auth-sl-1.jpg";
import Authimg2 from "@/assets/images/auth-sl2.jpg";

import Image from "next/image";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
      general: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password is required";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !==
        formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    try {
      if (!validate()) return;

      setLoading(true);

      await axios.post(
        `/api/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      alert("Password reset successful");

      router.push("/auth/login");
    } catch (error) {
      setErrors({
        general:
          error?.response?.data?.error ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-main px-0">
      <Row className="g-0 h-100">

        {/* LEFT SECTION */}
        <Col
          lg="6"
          className="left-section d-none d-lg-flex"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="auth-swiper"
          >
            <SwiperSlide>
              <div className="slide-content">
                <div
                  className="mb-2 mx-auto"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <Image
                    src={Authimf1}
                    alt="slide"
                    className="w-100 h-100"
                  />
                </div>

                <h3>Reset Your Password</h3>

                <p className="text-white">
                  Enter a new password to secure
                  your account.
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
                  <Image
                    src={Authimg2}
                    alt="slide"
                    className="w-100 h-100"
                  />
                </div>

                <h3>Stay Connected</h3>

                <p className="text-white">
                  Keep your account secure and
                  continue enjoying the platform.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </Col>

        {/* RIGHT SECTION */}
        <Col
          lg="6"
          xs="12"
          className="right-section"
        >
          <div className="auth-card">

            <div className="logo">
              <span className="logo-icon">◉</span>
              <h4>Logo</h4>
            </div>

            <p className="subtitle">
              Create a new password for your
              account
            </p>

            {errors.general && (
              <div className="alert alert-danger mt-3">
                {errors.general}
              </div>
            )}

            <div className="form-group">

              {/* PASSWORD */}
              <label>New Password</label>

              <div
                className="input-box"
                style={{ position: "relative" }}
              >
                <FaLock
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    color: "#555",
                  }}
                />

                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter New Password"
                  style={{
                    paddingLeft: "35px",
                  }}
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>
              </div>

              {errors.password && (
                <p className="text-danger small mt-1">
                  {errors.password}
                </p>
              )}

              {/* CONFIRM PASSWORD */}
              <label className="mt-3">
                Confirm Password
              </label>

              <div
                className="input-box"
                style={{ position: "relative" }}
              >
                <FaLock
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    color: "#555",
                  }}
                />

                <Input
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  style={{
                    paddingLeft: "35px",
                  }}
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform:
                      "translateY(-50%)",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-danger small mt-1">
                  {errors.confirmPassword}
                </p>
              )}

              <button
                onClick={handleResetPassword}
                className="btn btn-primary w-100 mt-4"
                disabled={loading}
              >
                {loading
                  ? "Resetting..."
                  : "RESET PASSWORD"}
              </button>

              <p className="bottom-text mt-3">
                Remember your password?
                <span>
                  <a href="/auth/login">
                    Login
                  </a>
                </span>
              </p>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
"use client";

import { useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "../../../assets/styles/social-auth.css";

import Authimf1 from "../../../assets/images/auth-sl-1.jpg";
import Authimg2 from "../../../assets/images/auth-sl2.jpg";

import Image from "next/image";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // remove error while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
      general: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = "Either email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      if (!validate()) return;

      setLoading(true);

      const res = await signIn("credentials", {
        identifier: formData.identifier,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/main/home");
      } else {
        setErrors({
          general: "Invalid email/username or password",
        });
      }
    } catch (error) {
      console.log(error);

      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="auth-main px-0">
      <Row className="g-0 h-100">

        {/* LEFT SECTION */}
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
                  <Image
                    src={Authimf1}
                    alt="slide"
                    className="w-100 h-100"
                  />
                </div>

                <h3>Welcome Back!</h3>

                <p className="text-white">
                  Login to continue and connect with your friends instantly.
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

                <h3>Share Your Moments</h3>

                <p className="text-white">
                  Upload reels and connect with the world instantly.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </Col>

        {/* RIGHT SECTION */}
        <Col lg="6" xs="12" className="right-section">
          <div className="auth-card">

            <div className="logo">
              <span className="logo-icon">◉</span>
              <h4>Logo</h4>
            </div>

            <p className="subtitle">
              Welcome to Logo, login to access your account
            </p>

            {errors.general && (
              <div className="alert alert-danger mt-3">
                {errors.general}
              </div>
            )}

            <div className="form-group">

              {/* Email */}
              <label>Email or Username</label>

              <div className="input-box">
                <FaEnvelope />

                <Input
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="Email or Username"
                />
              </div>

              {errors.identifier && (
                <p className="text-danger small mt-1">
                  {errors.identifier}
                </p>
              )}

              {/* Password */}
              <label>Password</label>

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
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
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

              <p className="small">
                <a href="/auth/forgotpassword">
                  Forgot your password? Click here to reset it.
                </a>
              </p>

              <button
                onClick={handleLogin}
                className="btn btn-primary w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "LOGIN"}
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
                <FcGoogle  size={30}/> Continue with Google
              </button>

              <p className="bottom-text mt-2">
                Don't Have An Account ?
                <span>
                  <a href="/auth/register">
                    Create Account
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

export default LoginPage;
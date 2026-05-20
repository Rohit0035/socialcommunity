"use client";
import { useState } from "react";
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

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../../assets/styles/social-auth.css";
import Authimf1 from "../../../assets/images/auth-sl-1.jpg";
import Authimg2 from "../../../assets/images/auth-sl2.jpg";
import Image from "next/image";

import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // ADD THIS

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/register", formData);

      if (res.data) {
        alert("Account Created");

        router.push("/auth/login");
      }
    } catch (error) {
      alert(error?.response?.data?.error || "Something went wrong");
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

            <div className="form-group">
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

              <div className="terms">
                <input type="checkbox" id="terms" />

                <label htmlFor="terms">
                  I Accept <a>Terms And Conditions</a>
                </label>
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
                className="btn btn-danger w-100"
              >
                <FaGoogle /> Continue with Google
              </button>

              {/* GITHUB BUTTON */}
              <button
                onClick={() => signIn("github", {
                  callbackUrl: "/main/home",
                })}
                className="btn btn-dark w-100 mt-2"
              >
                <FaGithub /> Continue with GitHub
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
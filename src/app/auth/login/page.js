"use client";
import { useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../../assets/styles/social-auth.css";
import Authimf1 from "../../../assets/images/auth-sl-1.jpg";
import Authimg2 from "../../../assets/images/auth-sl2.jpg";
import Image from "next/image";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container fluid className="auth-main px-0">
      <Row className="g-0 h-100">

        {/* LEFT SECTION (SLIDER) */}
        <Col lg="6" className="left-section d-none d-lg-flex">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            className="auth-swiper"
          >
            <SwiperSlide>
              <div className="slide-content">
                <div className="mb-2 mx-auto" style={{ width: '200px', height: '200px' }}>
                  <Image src={Authimf1} alt="slide" className="w-100 h-100" />
                </div>
                <h3>Welcome Back!</h3>
                <p className="text-white">
                  Login to continue and connect with your friends instantly.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide-content">
                <div className="mb-2 mx-auto" style={{ width: '200px', height: '200px', borderRadius: '100px' }}>
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

        {/* RIGHT SECTION */}
        <Col lg="6" xs="12" className="right-section" data-aos="zoom-in">
          <div className="auth-card">
            <div className="logo">
              <span className="logo-icon">◉</span>
              <h4>Logo</h4>
            </div>
            <p className="subtitle">
              Welcome to Logo, login to access your account
            </p>

            <div className="form-group">
              {/* Email */}
              <label>Email Address</label>
              <div className="input-box">
                <FaEnvelope />
                <Input placeholder="marvin@example.com" />
              </div>

              {/* Password with Eye Toggle */}
              <label>Password</label>
              <div className="input-box" style={{ position: "relative" }}>
                <FaLock style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#555" }} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
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
                    color: "#555"
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
               <p className="small">
                    <a href="/auth/forgotpassword">Forgot your password? Click here to reset it.</a>
                </p>

              <a href="/main/home" className="btn btn-primary w-100 mt-3">LOGIN</a>
              <p className="bottom-text mt-2">
                Don't Have An Account ? <span><a href="/auth/register">Create Account</a></span>
              </p>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default LoginPage;
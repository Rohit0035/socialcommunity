"use client";
import { useState } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import { FaEnvelope } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../../assets/styles/social-auth.css";
import Authimf1 from "../../../assets/images/auth-sl-1.jpg";
import Authimg2 from "../../../assets/images/auth-sl2.jpg";
import Image from "next/image";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

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
                <h3>Reset Your Password</h3>
                <p className="text-white">
                  Enter your email to receive a link to reset your password.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="slide-content">
                <div className="mb-2 mx-auto" style={{ width: '200px', height: '200px', borderRadius: '100px' }}>
                  <Image src={Authimg2} alt="slide" className="w-100 h-100" />
                </div>
                <h3>Stay Connected</h3>
                <p className="text-white">
                  Access your account easily and securely.
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
              Forgot your password? Enter your email to reset it.
            </p>

            <div className="form-group">
              {/* Email Input */}
              <label>Email Address</label>
              <div className="input-box">
                <FaEnvelope />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <a href="/login" className="btn btn-primary w-100 mt-3">Send Reset Link</a>
              <p className="bottom-text mt-2">
                Remembered your password? <span><a href="/auth/login">Login</a></span>
              </p>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/LandPage/LandPage.css"; // Import custom CSS for additional styling
import { BiKey } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import logo from '../../assets/LandingPage/logo.png'
import Typed from 'typed.js';

export default function LandPage() {
  const navigate = useNavigate();

  // Auto-typing effect
  useEffect(() => {
    const options = {
      strings: ["Start with Mufasha AI", "Perform complex tasks", "Learn everything easily"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true
    };
    const typed = new Typed(".auto-type", options);

    return () => {
      typed.destroy();
    };
  }, []);

  const handleTryMufashaClick = () => {
    navigate("/chat");
  };

  return (
    <div className="full-screen-container d-flex justify-content-between position-relative">
      
      {/* Left side with slideshow, overlay, logo, auto-typing, and buttons */}
      <div className="left-side-container position-relative">
        <div className="overlay"></div>
        
        {/* Overlay content */}
        <div className="overlay-content d-flex flex-column justify-content-center">
          <div className="logo text-center">
            <img src={logo} alt="mufasha logo" />
          </div>

          <div className="auto-type text-center">
            <span className="auto-type text-white"></span>
          </div>

          <div className="bottom-content text-center">
            <p className="text-white">Continue without Account</p>
            <button
              className="btn try-mufasha-btn"
              onClick={handleTryMufashaClick}
            >
              Try Mufasha
            </button>
          </div>
        </div>
      </div>

      {/* Right side with form container */}
      <div className="form-container-wrapper d-flex align-items-center">
        <div className="form-background">
          <div className="form-background-overlay"></div> {/* Black overlay */}
        </div>
        <div className="form-container">
          <h2 className="text-center">Sign Up to Mufasha AI</h2>
          <form className="row g-3 mt-3">
            <div className="col-12">
              <label className="form-label" htmlFor="specificSizeInputGroupUsername">
                Email
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  className="form-control"
                  id="specificSizeInputGroupUsername"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="specificSizeInputGroupUsername">
                Password
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <BiKey />
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="specificSizeInputGroupUsername"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="autoSizingCheck2"
                />
                <label className="form-check-label" htmlFor="autoSizingCheck2">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
            <div className="col-12 mt-3">
              <button className="btn btn-google w-100 d-flex align-items-center justify-content-center bg-blue-700 text-white">
                <FcGoogle className="google-icon" /> Log in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

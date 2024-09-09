import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/LandPage/SignUp.css"; // Import custom CSS for additional styling
import { BiKey } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import logo from "../../assets/LandingPage/logo.png";
import Typed from "typed.js";

export default function SignUp() {
  const navigate = useNavigate();

  // Auto-typing effect
  useEffect(() => {
    const options = {
      strings: [
        "Start with ",
        "Perform complex tasks with ",
        "Learn everything easily with ",
      ], // Only the changing part
      typeSpeed: 60,
      backSpeed: 25,
      loop: true,
    };
    const typed = new Typed(".auto-type", options);

    return () => {
      typed.destroy();
    };
  }, []);

  // Handle Google Sign-In success
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google ID token:", credentialResponse.credential);
    // Here, you can send the token to your backend server for verification or process it further
  
    navigate('/chat')
  };

  // Handle Google Sign-In failure
  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
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

          <div className="auto-type-container text-center">
            <span className="auto-type text-white"></span>
            <span className="auto-type-fixed text-white">MufashaAI</span>{" "}
            {/* Always-visible text */}
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
              <label
                className="form-label"
                htmlFor="specificSizeInputGroupUsername"
              >
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
              <label
                className="form-label"
                htmlFor="specificSizeInputGroupUsername"
              >
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
            <div className="col-12 mt-3 ml-3 w-full">
              {/* Container with custom background color */}
                {/* Actual GoogleLogin button - displayed normally */}
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  shape="pill"
                  text="signin_with"
                />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

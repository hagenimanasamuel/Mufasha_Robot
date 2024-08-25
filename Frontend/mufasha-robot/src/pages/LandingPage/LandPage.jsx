import React from "react";
import "./LandPage.css"; // Import custom CSS for additional styling
import { BiKey } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons

export default function LandPage() {
  return (
    <div className="full-screen-container d-flex justify-content-space-around">
      <div className="logo-container d-flex flex-column align-items-center justify-content-center">
        <div className="logo">M</div>
        <div className="continue-text">Continue without Account</div>
        <button className="btn btn-try-mufasha mt-3">Try Mufasha</button>
      </div>
      <div className="form-container-wrapper d-flex align-items-center">
        <div className="form-container p-4 shadow-sm">
          <h2 className="text-center text-2xl">Sign Up to Mufasha AI</h2>
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
            <div className="col-12 mt-3">
              <button className="btn btn-google w-100 d-flex align-items-center justify-content-center">
                <FcGoogle className="google-icon" /> Log in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaSignOutAlt,
  FaBars,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaUniversalAccess,
  FaVolumeMute,
  FaDeaf,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MufashaLogo from "../../assets/ChatUI/humanoid-face-robot.png";
import "../../styles/Navbar/Navbar.css"; // Import the CSS file

const profilePic = "https://via.placeholder.com/40"; // Replace with actual profile picture URL

const Navbar = ({ isLoggedIn }) => {
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAccessibilityDropdown, setShowAccessibilityDropdown] =
    useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const versionDropdownRef = useRef(null);
  const profileMenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const accessibilityDropdownRef = useRef(null);

  const navigate = useNavigate();

  // Toggle accessibility dropdown
  const toggleAccessibilityDropdown = () => {
    setShowAccessibilityDropdown(!showAccessibilityDropdown);
  };

  // Toggle the visibility of the profile menu
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Close the dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        versionDropdownRef.current &&
        !versionDropdownRef.current.contains(event.target)
      ) {
        setShowVersionDropdown(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
      if (
        accessibilityDropdownRef.current &&
        !accessibilityDropdownRef.current.contains(event.target)
      ) {
        setShowAccessibilityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show login message after 1000ms if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowLoginMessage(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  // Handle log out
  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/signup");
  };

  return (
    <nav className="navbar flex items-center justify-between p-3 z-50 bg-black border-b border-gray-700">
      {/* Left side: Mufasha logo and name */}
      <div className="relative flex items-center space-x-2">
        <div
          className="flex items-center space-x-1 cursor-pointer hover:animate-icon"
          onClick={() => setShowVersionDropdown(!showVersionDropdown)}
        >
          <div className="relative flex justify-center align-items-center">
            <img src={MufashaLogo} alt="Mufasha Logo" className="w-[30px]" />
          </div>
          <span className="text-lg text-white">
            Mufasha{" "}
            <sup>
              <b>AI</b>
            </sup>
          </span>
          <FaChevronDown className="text-white" />
        </div>

        {/* Version Dropdown */}
        {showVersionDropdown && (
          <div
            ref={versionDropdownRef}
            className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
          >
            <div
              className="p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => alert("You are using Mufasha v1.0")}
            >
              Mufasha v1.0
            </div>
            <div
              className="p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => alert("Mufasha v2.0")}
            >
              Mufasha v2.0{" "}
              <span className="text-yellow-400 text-sm">(Beta)</span>
            </div>
          </div>
        )}
      </div>

      {/* Right side: User profile, accessibility, or sign-up button */}
      <div className="relative flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <FaBars
              className="text-white cursor-pointer mr-2"
              onClick={toggleSidebar}
            />

            {/* Accessibility Icon */}
            <div
              className="relative flex items-center cursor-pointer"
              onClick={toggleAccessibilityDropdown}
            >
              <FaUniversalAccess className="text-white text-2xl" />
              <FaChevronDown className="text-white ml-1" />
            </div>

            {/* Accessibility Dropdown */}
            <div
              ref={accessibilityDropdownRef}
              className={`accessibility-dropdown ${
                showAccessibilityDropdown ? "open" : ""
              }`}
            >
              <div className="p-2 flex items-center cursor-pointer hover:bg-gray-700">
                <FaVolumeMute className="w-6 h-6 mr-2" />
                <span>Speech Disabled</span>
              </div>
              <div className="p-2 flex items-center cursor-pointer hover:bg-gray-700">
                <FaDeaf className="w-6 h-6 mr-2" />
                <span>Deaf</span>
              </div>
              <div className="p-2 flex items-center cursor-pointer hover:bg-gray-700">
                <FaEyeSlash className="w-6 h-6 mr-2" />
                <span>Visual Disabled</span>
              </div>
            </div>

            {/* Profile Icon */}
            <div
              className={`relative flex items-center cursor-pointer ${
                showLoginMessage ? "show-message" : ""
              }`}
              onClick={toggleProfileMenu}
            >
              <img
                src={profilePic}
                alt="Profile"
                className={`w-10 h-10 rounded-full ${
                  showLoginMessage ? "profile-pic-border" : ""
                }`}
              />
              <FaChevronDown className="text-white ml-2" />
              {showLoginMessage && (
                <span className="signup-info">
                  Log In to access all resources
                </span>
              )}
            </div>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
              >
                <div className="flex items-center p-2 space-x-2">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm truncate w-32">
                    <div className="font-bold">John Doe</div>
                    <div className="text-gray-400 truncate">
                      john.doe@example.com
                    </div>
                  </div>
                </div>
                <div className="p-2 cursor-pointer hover:bg-gray-700">
                  My Account
                </div>
                <div
                  className="p-2 cursor-pointer hover:bg-gray-700 text-red-500"
                  onClick={handleLogout}
                >
                  <div className="flex items-center space-x-2">
                    <FaSignOutAlt />
                    <span>Log out</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <span className="signup-info text-warning mr-4">
              Sign Up to Access all MufashaAI features
            </span>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <>
          <div
            className={`sidebar-overlay ${showSidebar ? "show" : ""}`}
            onClick={toggleSidebar}
          ></div>

          <div
            ref={sidebarRef}
            className={`sidebar ${showSidebar ? "open" : ""}`}
          >
            <div className="text-lg font-bold mb-4">Menu</div>
            <ul>
              <li className="py-2 cursor-pointer hover:bg-gray-700">
                My Profile
              </li>
              <li className="py-2 cursor-pointer hover:bg-gray-700">
                Accessibility
              </li>
              <li className="py-2 cursor-pointer hover:bg-gray-700">Theme</li>
              <li className="py-2 cursor-pointer hover:bg-gray-700">
                Go Premium
              </li>
            </ul>
            <div className="border-t border-gray-600 mt-4 pt-4">
              <div className="text-lg font-bold mb-2">Follow Us</div>
              <div className="flex space-x-2">
                <FaFacebook className="text-blue-600 cursor-pointer" />
                <FaInstagram className="text-pink-500 cursor-pointer" />
                <FaTwitter className="text-blue-400 cursor-pointer" />
                <FaGithub className="text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

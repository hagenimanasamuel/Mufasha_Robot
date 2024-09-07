import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaUserCircle, FaSignOutAlt, FaBars, FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

// Placeholder profile picture
const profilePic = 'https://via.placeholder.com/40'; // Replace with actual profile picture URL

const Navbar = ({ isLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const versionDropdownRef = useRef(null);
  const profileMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  // Toggle the visibility of the version dropdown
  const toggleVersionDropdown = () => {
    setShowVersionDropdown(!showVersionDropdown);
  };

  // Toggle the visibility of the profile menu
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(event.target)) {
        setShowVersionDropdown(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show modal with beta version message
  const handleBetaClick = () => {
    setShowModal(true);
    setShowVersionDropdown(false); // Close the version dropdown
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle log out
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout functionality here
  };

  return (
    <nav className="navbar glass-effect fixed top-0 left-0 right-0 flex items-center justify-between p-3 z-50 bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700">
      {/* Left side: Mufasha logo and name */}
      <div className="relative flex items-center space-x-2">
        <div className="flex items-center space-x-1 cursor-pointer" onClick={toggleVersionDropdown}>
          <div className="text-2xl font-bold text-white">M</div>
          <span className="text-lg text-white">Mufasha AI</span>
          <FaChevronDown className="text-white" />
        </div>

        {/* Dropdown menu for version */}
        {showVersionDropdown && (
          <div
            ref={versionDropdownRef}
            className="absolute top-full left-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
          >
            <div className="p-2 cursor-pointer hover:bg-gray-700" onClick={() => alert('You are using Mufasha v1.0')}>
              <div>Mufasha v1.0</div>
            </div>
            <div className="p-2 cursor-pointer hover:bg-gray-700" onClick={handleBetaClick}>
              <div>Mufasha v2.0 <span className="text-yellow-400 text-sm">(Beta)</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Right side: User profile or accessibility icon */}
      <div className="relative flex items-center space-x-1">
        {isLoggedIn && (
          <>
            <FaBars className="text-white cursor-pointer mr-2" onClick={toggleSidebar} /> {/* Menu icon */}

            <div className="relative flex items-center cursor-pointer" onClick={toggleProfileMenu}>
              <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
              <FaChevronDown className="text-white ml-2" />
            </div>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50"
              >
                <div className="flex items-center p-2 space-x-2">
                  <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" />
                  <div className="text-sm truncate w-32">
                    <div className="font-bold">John Doe</div> {/* Replace with user's name */}
                    <div className="text-gray-400 truncate">john.doe@example.com</div> {/* Replace with user's email */}
                  </div>
                </div>
                <div className="p-2 cursor-pointer hover:bg-gray-700">My Account</div>
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
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed right-0 top-0 w-64 h-full bg-gray-800 text-white p-4 shadow-lg z-50 transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="text-lg font-bold mb-4">Menu</div>
        <ul>
          <li className="py-2 cursor-pointer hover:bg-gray-700">My Profile</li>
          <li className="py-2 cursor-pointer hover:bg-gray-700">Accessibility</li>
          <li className="py-2 cursor-pointer hover:bg-gray-700">Theme</li>
          <li className="py-2 cursor-pointer hover:bg-gray-700">Go Premium</li>
        </ul>
        <div className="border-t border-gray-600 mt-4 pt-4">
          <div className="text-lg font-bold mb-2">Follow Us</div>
          <div className="flex space-x-2">
            <FaFacebook className="text-blue-600 cursor-pointer" />
            <FaInstagram className="text-pink-500 cursor-pointer" />
            <FaTwitter className="text-blue-400 cursor-pointer" />
            <FaGithub className="text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Modal for Beta version */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-50 p-4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full mt-10">
            <h3 className="text-xl font-bold mb-4">New Version Available!</h3>
            <p className="mb-4">The Mufasha v2.0 is currently under development. We will notify you once it is released. Stay tuned!</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

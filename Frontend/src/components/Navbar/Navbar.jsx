import React, { useState } from 'react';
import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
import '../../styles/Navbar/Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //Handling navigation to home
  const MufashaVersion = () => {
    navigate("/");
  };

  return (
    <nav className="navbar glass-effect fixed top-0 left-0 right-0 flex items-center justify-between p-3 z-50">
      {/* Left side: Mufasha logo and name */}
      <div className="relative flex items-center space-x-2">
        <div className="flex items-center space-x-1 cursor-pointer" onClick={toggleDropdown}>
          <div className="text-2xl font-bold text-white">M</div>
          <span className="text-lg text-white">Mufasha AI</span>
          <FaChevronDown className="text-white" />
        </div>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-2 z-50">
            <div className="p-2" onClick={MufashaVersion}>Mufasha v1.0</div>
          </div>
        )}
      </div>

      {/* Right side: User profile or accessibility icon */}
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle className="text-3xl text-white cursor-pointer" />
            <FaChevronDown className="text-white cursor-pointer absolute top-2 right-0" />
          </div>
        ) : (
          <>
            <FaUserCircle className="text-3xl text-white cursor-pointer" />
            <FaChevronDown className="text-white cursor-pointer" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

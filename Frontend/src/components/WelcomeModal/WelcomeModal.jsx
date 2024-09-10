import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/WelcomeModal/WelcomeModal.css'; // Import CSS for animations

const WelcomeModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleContinueAsGuest = () => {
    onClose();
  };

  const handleCreateAccount = () => {
    navigate('/signup');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Welcome to Mufasha AI</h3>
        <p>Select an option to continue:</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={handleContinueAsGuest}>
            Continue as Guest
          </button>
          <button className="modal-button" onClick={handleCreateAccount}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaRegPlusSquare } from 'react-icons/fa'; // Replaced icon for the upload button
import robot from '../../assets/ChatUI/humanoid-face-robot.png';
import Navbar from '../Navbar/Navbar';
import "../../styles/ChatUI/ChatUI.css";
import axios from 'axios';

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showMediaDiv, setShowMediaDiv] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false); // State to manage upload menu visibility
  const uploadMenuRef = useRef(null); // Ref for upload menu to detect outside clicks

  // API Key for Gemini (Replace with your actual API key)
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace this with your actual API key

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      if (input.toLowerCase().includes('image') || input.toLowerCase().includes('video')) {
        setFadeIn(true);
        setShowMediaDiv(true);
        setFadeOut(false);  // Reset fade out if div is shown again
      }

      try {
        // Make API request to Gemini
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCgNyoCpjKQpoa1-kQTJ6vKlrM56_IWCUM',
          {
            message: input,
          },
          {
            headers: {
              'Authorization': `Bearer ${GEMINI_API_KEY}`,
              'Content-Type': 'application/json'
            },
            data: { message: messages },
          }
        );

        const botResponse = response.data.reply;
        const mufashaResponse = `Mufasha: ${botResponse}`;
        setMessages([...newMessages, { text: mufashaResponse, sender: 'mufasha' }]);
      } catch (error) {
        console.error('Error sending message to Gemini API', error);
        setMessages([...newMessages, { text: "Mufasha: Sorry, I couldn't process your request.", sender: 'mufasha' }]);
      }

      setTimeout(() => {
        setFadeIn(false);
      }, 500); // Match the duration of the CSS animation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleCloseMediaDiv = () => {
    setFadeOut(true);
    setFadeIn(false);
    setTimeout(() => {
      setShowMediaDiv(false);
    }, 500);  // Match the duration of the CSS animation
  };

  // Toggle the upload menu visibility
  const toggleUploadMenu = () => {
    setShowUploadMenu(!showUploadMenu);
  };

  // Handle file selection
  const handleFileSelect = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'Document' ? '.pdf,.doc,.docx' : type.toLowerCase() + '/*'; // Adjust file types
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(`${type} selected:`, file);
        // Handle the file upload or processing
      }
    };
    input.click();
    setShowUploadMenu(false); // Close the menu after selection
  };

  // Close the popup if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (uploadMenuRef.current && !uploadMenuRef.current.contains(event.target)) {
        setShowUploadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={true} /> {/* Pass `false` if user is not logged in */}

      {/* Chat content */}
      <div className="flex-grow flex p-2 gap-2 mt-[9.3vh]">
        {/* Left side: Humanoid face robot */}
        <div className={`flex justify-center items-center p-4 rounded-lg shadow-lg ${showMediaDiv ? 'w-1/3' : 'w-1/2'} full-height`} style={{backgroundColor: 'transparent' }}>
          <img
            src={robot}
            alt="Humanoid Robot Face"
            style={{
              maxHeight: 'calc(100vh - 70px - 60px)', // Leaves 30px from top and 30px from bottom
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Conditionally render the media container */}
        {showMediaDiv && (
          <div className={`media-div w-1/3 flex flex-col justify-center items-center bg-gray-800 p-4 rounded-lg shadow-lg relative ${fadeOut ? 'fade-out' : ''} ${fadeIn ? 'fade-in' : ''} full-height`}>
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={handleCloseMediaDiv}
            >
              <FaTimes size={20} /> {/* Close icon */}
            </button>
            <div className="w-full h-full rounded-lg flex justify-center items-center">
              <span className="text-white">Generated Media</span>
            </div>
          </div>
        )}

        {/* Right Side: Chat UI */}
        <div className={`chat-ui-container ${showMediaDiv ? 'w-1/3' : 'w-1/2'} full-height flex flex-col rounded-lg shadow-2xl glass-effect`}>
          <div className="bg-gray-800 p-3 rounded-t-lg text-center">
            <h2 className="text-xl font-bold text-white">Mufasha AI Chat</h2>
          </div>
          <div className="chat-body flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 p-2 rounded-lg max-w-xs ${
                  msg.sender === 'user' ? 'bg-gray-700 text-white self-end' : 'bg-black-800 text-white self-start'
                } ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat footer with upload button */}
          <div className="chat-footer flex items-center">
            <div className="relative flex items-center flex-grow">
              {/* Upload Button */}
              <button
                onClick={toggleUploadMenu}
                className="p-2 bg-green-600 text-white flex items-center justify-center hover:bg-green-700 rounded-l-lg"
                style={{ height: '40px' }}
              >
                <FaRegPlusSquare className="text-xl" /> {/* New upload icon similar to ChatGPT */}
              </button>

              {/* Conditionally render the upload menu */}
              {showUploadMenu && (
                <div className="absolute left-0 bottom-12 bg-gray-900 text-white shadow-lg p-2 rounded-lg z-50" ref={uploadMenuRef}>
                  <ul className="flex flex-col">
                    <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleFileSelect('Document')}>Document</li>
                    <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleFileSelect('Image')}>Image</li>
                    <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleFileSelect('Video')}>Video</li>
                    <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => handleFileSelect('Audio')}>Audio</li>
                  </ul>
                </div>
              )}

              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-r-lg text-white border border-gray-600 focus:outline-none resize-none overflow-hidden"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '200px' }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 rounded-r-lg"
              style={{ height: '40px' }}
            >
              <FaPaperPlane className="text-xl" /> {/* Send icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

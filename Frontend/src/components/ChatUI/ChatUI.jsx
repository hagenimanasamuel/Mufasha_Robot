import React, { useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import "../../styles/ChatUI/ChatUI.css";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showMediaDiv, setShowMediaDiv] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      if (input.toLowerCase().includes('image') || input.toLowerCase().includes('video')) {
        setShowMediaDiv(true);
        setFadeOut(false);  // Reset fade out if div is shown again
      }

      setTimeout(() => {
        const mufashaResponse = `Mufasha: This is a response to "${input}"`;
        setMessages([...newMessages, { text: mufashaResponse, sender: 'mufasha' }]);
      }, 500);
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
    setTimeout(() => {
      setShowMediaDiv(false);
    }, 500);  // Match the duration of the CSS animation
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar isLoggedIn={true} /> {/* Pass `false` if user is not logged in */}

      {/* Chat content */}
      <div className="flex-grow flex p-2 gap-2 mt-[9.3vh]">
        {/* Left side: Humanoid face robot */}
        <div className={`flex justify-center items-center bg-gray-900 p-4 rounded-lg shadow-lg ${showMediaDiv ? 'w-1/3' : 'w-1/2'} full-height`}>
          <div className="bg-gray-700 w-full h-full rounded-lg flex justify-center items-center">
            <span className="text-white">Humanoid Robot Face</span>
          </div>
        </div>

        {/* Conditionally render the media container */}
        {showMediaDiv && (
          <div className={`media-div w-1/3 flex flex-col justify-center items-center bg-gray-800 p-4 rounded-lg shadow-lg relative ${fadeOut ? 'fade-out' : ''} full-height`}>
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
          <div className="bg-blue-600 p-3 rounded-t-lg text-center">
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
          <div className="chat-footer flex mt-4">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white border border-gray-600 focus:outline-none resize-none overflow-hidden"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '200px' }}
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-r-lg flex items-center justify-center hover:bg-blue-700"
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

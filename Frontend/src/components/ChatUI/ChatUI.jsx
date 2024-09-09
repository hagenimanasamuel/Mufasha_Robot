import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaRegPlusSquare, FaFile, FaImage, FaVideo, FaAudioDescription, FaMicrophone } from 'react-icons/fa';
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
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const uploadMenuRef = useRef(null);
  const recognitionRef = useRef(null);

  // API Key for Gemini (Replace with your actual API key)
  const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace this with your actual API key

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognitionRef.current = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new recognitionRef.current();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = '*'; // Support all languages
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };
    } else {
      console.error("Speech Recognition API not supported");
    }
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user', file: uploadedFile }];
      setMessages(newMessages);
      setInput('');
      setUploadedFile(null);

      if (input.toLowerCase().includes('image') || input.toLowerCase().includes('video')) {
        setFadeIn(true);
        setShowMediaDiv(true);
        setFadeOut(false);
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
    setFadeIn(false);
    setTimeout(() => {
      setShowMediaDiv(false);
    }, 500);
  };

  const toggleUploadMenu = () => {
    setShowUploadMenu(!showUploadMenu);
  };

  const handleFileSelect = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'Document' ? '.pdf,.doc,.docx' : type.toLowerCase() + '/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedFile({
          file: file,
          type: type,
          url: URL.createObjectURL(file)
        });
        setShowUploadMenu(false);
      }
    };
    input.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

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
      <Navbar isLoggedIn={false} />

      <div className="flex-grow flex p-2 gap-2 mt-[9.3vh]">
        <div className={`flex justify-center items-center p-4 rounded-lg shadow-lg ${showMediaDiv ? 'w-1/3' : 'w-1/2'} full-height`} style={{backgroundColor: 'transparent' }}>
          <img
            src={robot}
            alt="Humanoid Robot Face"
            style={{
              maxHeight: 'calc(100vh - 70px - 60px)',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
          <button
            className={`relative flex bottom-4 right-4 ${isRecording ? 'is-recording' : 'bg-blue-700'} text-white p-2 rounded-lg`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <FaMicrophone size={20} />          
            <p className='text-white'>Voice Chat</p>

          </button>
        </div>

        {showMediaDiv && (
          <div className={`media-div w-1/3 flex flex-col justify-center items-center bg-gray-800 p-4 rounded-lg shadow-lg relative ${fadeOut ? 'fade-out' : ''} ${fadeIn ? 'fade-in' : ''} full-height`}>
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={handleCloseMediaDiv}
            >
              <FaTimes size={20} />
            </button>
            <div className="w-full h-full rounded-lg flex justify-center items-center">
              <span className="text-white">Generated Media</span>
            </div>
          </div>
        )}

        <div className={`chat-ui-container ${showMediaDiv ? 'w-1/3' : 'w-1/2'} full-height flex flex-col rounded-lg shadow-2xl glass-effect bg-gray-900`}>
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
                {msg.file && msg.file.type === 'Image' && <img src={msg.file.url} alt="Uploaded" className="w-24 h-24 object-cover" />}
                {msg.file && msg.file.type === 'Video' && <video controls className="w-24 h-24"><source src={msg.file.url} type={`video/${msg.file.file.type.split('/')[1]}`} /></video>}
                {msg.file && msg.file.type === 'Document' && <a href={msg.file.url} download>{msg.file.file.name}</a>}
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer flex items-center p-2 bg-gray-800 border-t border-gray-700">
            {uploadedFile && (
              <div className="uploaded-file-preview flex items-start mb-2">
                {uploadedFile.type === 'Image' && <img src={uploadedFile.url} alt="Preview" className="w-16 h-16 object-cover" />}
                {uploadedFile.type === 'Video' && <video controls className="w-16 h-16"><source src={uploadedFile.url} type={`video/${uploadedFile.file.type.split('/')[1]}`} /></video>}
                {uploadedFile.type === 'Document' && <a href={uploadedFile.url} download>{uploadedFile.file.name}</a>}
                <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 ml-2">
                  <FaTimes />
                </button>
              </div>
            )}
            <button
              className="upload-button p-2 bg-gray-600 text-white rounded-lg flex items-center"
              onClick={toggleUploadMenu}
            >
              <FaRegPlusSquare size={20} />
            </button>
            {showUploadMenu && (
              <div ref={uploadMenuRef} className="upload-menu">
                <ul>
                  <li onClick={() => handleFileSelect('Image')}>Image</li>
                  <li onClick={() => handleFileSelect('Video')}>Video</li>
                  <li onClick={() => handleFileSelect('Document')}>Document</li>
                </ul>
              </div>
            )}
            <textarea
              className="flex-grow mx-2 bg-gray-900 text-white p-2 rounded-lg border border-gray-700"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
            />
            <button
              className="send-button flex items-center justify-center p-2"
              onClick={handleSend}
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

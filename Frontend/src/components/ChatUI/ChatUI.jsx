import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import robot from "../../assets/ChatUI/humanoid-face-robot.png";
import Navbar from "../Navbar/Navbar";
import "../../styles/ChatUI/ChatUI.css";
import WelcomeModal from "../WelcomeModal/WelcomeModal";

export default function ChatUI() {
  const name = 'MufashaAI'
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [textChat, setTextChat] = useState(false);

  // Initialize Speech Recognition
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognitionRef.current =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new recognitionRef.current();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "*";
    } else {
      console.error("Speech Recognition API not supported");
    }
  }, []);

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

  // Show welcome modal if it's the user's first visit
  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      setShowModal(true);
      localStorage.setItem("visited", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />

      {textChat && (
        <div className="flex-grow flex justify-center items-center mt-[9.3vh]">
          <div
            className="flex flex-col justify-center items-center p-4 rounded-lg shadow-lg w-1/2 full-height"
            style={{ backgroundColor: "transparent" }}
          >
            <img
              src={robot}
              alt="Humanoid Robot Face"
              style={{
                maxHeight: "calc(100vh - 70px - 60px)",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="max-width-full">
            {!isRecording && (
              <>
                <button
                  className={`btn-record ${
                    isRecording ? "is-recording" : "bg-gray-900"
                  } text-white p-4 rounded-lg flex justify-center mx-2`}
                  onClick={isRecording ? stopRecording : startRecording}
                  id="voice-chat"
                >
                  <FaMicrophone size={20} />
                  <p className="text-white mx-2">
                    Start Mufasha <sup>AI</sup>
                  </p>
                </button>
              </>
            )}
            {isRecording && (
              <>
                <div className="relative flex justify-between align-items-center text-white w-full h-full bg-gray-900 rounded-md p-4">
                  <div className="relative flex flex-column justify-center align-content-center text-blue-300">
                    <span className="flex mr-8 justify-center align-content-center text-2xl">
                      <FaMicrophone />
                    </span>
                    <p className="flex justify-center text-[18px] mr-8">
                      Listening...
                    </p>
                  </div>
                  <div className="relative flex">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className="flex bg-red-500 px-8 py-2 rounded hover:bg-red-600"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showModal && <WelcomeModal onClose={handleCloseModal} />}

      {setTextChat && (
        <div className="bg-black min-h-screen relative flex flex-col justify-between align-center">
          <div
            className=" fixed bottom-8 mx-8 flex flex-col justify-center align-items-baseline  p-4 rounded-lg shadow-lg w-1/4 full-height"
            style={{ backgroundColor: "transparent" }}
          >
            <img
              src={robot}
              alt="Humanoid Robot Face"
              style={{
                maxHeight: "calc(100vh - 70px - 60px)",
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: '50%',
              }}
            />
          </div>
          <div className="w-full full-screen flex-grow flex justify-center items-center">
            <div className="bg-red-400">
              <div className="border-1 flex justify-center align-center text-white">
              <span>{name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

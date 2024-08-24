import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




// import React, { useEffect, useState } from 'react';
// import { getHelloWorld } from './js/main';

// function App() {
//   const [pythonMessage, setPythonMessage] = useState('');
//   const [nodeMessage, setNodeMessage] = useState('');

//   useEffect(() => {
//     // Fetching message from Flask server
//     fetch('/api/hello')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setPythonMessage(data.message))
//       .catch(error => console.error('Error fetching Python message:', error));

//     // Fetching message from Node.js server
//     fetch('http://localhost:5000/api/message')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => setNodeMessage(data.message))
//       .catch(error => console.error('Error fetching Node.js message:', error));
//   }, []);

//   const javascriptMessage = getHelloWorld();

//   return (
//     <div>
//       <h1>{javascriptMessage}</h1>
//       <h2>{pythonMessage}</h2>
//       <h2>{nodeMessage}</h2>
//     </div>
//   );
// }

// export default App;

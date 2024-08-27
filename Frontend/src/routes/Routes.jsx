import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandPage from '../pages/LandPage/LandPage';
import ChatUI from '../components/ChatUI/ChatUI';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the landing page */}
        <Route path="/" element={<LandPage />} />

        {/* Define the route for the Mufasha AI chat interface */}
        <Route path="/chat" element={<ChatUI />} />

        {/* You can add more routes here as needed */}
        {/* Example: <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;

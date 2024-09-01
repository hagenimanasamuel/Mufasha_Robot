import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandPage from "../pages/LandPage/LandPage";
import ChatUI from "../components/ChatUI/ChatUI";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/*route for the landing page */}
        <Route path="/" element={<LandPage />} />

        {/* route for the Mufasha AI chat interface */}
        <Route path="/chat" element={<ChatUI />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

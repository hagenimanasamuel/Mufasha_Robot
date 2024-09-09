import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/LandPage/SignUp";
import ChatUI from "../components/ChatUI/ChatUI";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* route for the Mufasha AI chat interface */}
        <Route path="/chat" element={<ChatUI />} />
        {/*route for the landing page */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

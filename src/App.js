import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Chatbot from "./components/Chatbot";
import Booking from "./components/Booking";
import ResourceHub from "./components/ResourceHub";
import PeerForum from "./components/PeerForum";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/chatbot">AI Chatbot</Link>
          <Link to="/booking">Book Appointment</Link>
          <Link to="/resources">Resource Hub</Link>
          <Link to="/forum">Peer Forum</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </nav>

        {/* Updated routing without Switch */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/forum" element={<PeerForum />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <section>
    <h1>Digital Mental Health Platform for Higher Education</h1>
    <p>
      Welcome to MindBridge – Your Digital Companion for Mental Well-Being
Our platform is dedicated to supporting the mental health and emotional wellness of college and university students. By combining advanced AI technology with compassionate human insight, we provide a confidential space where students can easily access personalized guidance, evidence-based resources, and professional help—anytime, anywhere. From stress management tools and self-care programs to 24/7 chat support and a vibrant peer community, MindBridge empowers you to take charge of your well-being. Our data-driven approach ensures early detection of mental health challenges and offers actionable insights for continuous improvement, all while safeguarding your privacy. Together, we aim to break the stigma around mental health and build a more inclusive, resilient campus culture where every student can thrive academically and personally.
    </p>
  </section>
);

export default App;
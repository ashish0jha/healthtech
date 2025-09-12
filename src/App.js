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
      Empowering students with AI, confidential support, inclusive resources,
      peer community, and data-driven wellness.
    </p>
  </section>
);

export default App;

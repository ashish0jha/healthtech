import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Booking from "./components/Booking";
import ResourceHub from "./components/ResourceHub";
import PeerForum from "./components/PeerForum";
import AdminDashboard from "./components/AdminDashboard";
import Body from "./components/Body";
import Navbar from "./components/NavBar";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/forum" element={<PeerForum />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <footer className="bg-indigo-700 text-white text-center py-6">
        <p className="text-sm md:text-base animate-blink">
          💙 Empowering students with stigma-free mental wellness support
        </p>
      </footer>
    </Router>
  );
}

const Home = () => (
  <>
    <Body/>
  </>

);

export default App;
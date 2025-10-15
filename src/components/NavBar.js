import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#5477ff] shadow-md flex items-center justify-between px-4 py-2">
      <Link to="/" className="flex items-center">
        <img
          alt="logo"
          src="https://i.postimg.cc/T35YTygz/fevicon.png"
          className="w-12 h-12 bg-[#365abd] rounded-md"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-lg font-medium text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/chatbot">AI Chatbot</Link>
        <Link to="/booking">Book Appointment</Link>
        <Link to="/resources">Resource Hub</Link>
        <Link to="/forum">Peer Forum</Link>
        <Link to="/call-support">Call Support</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={30} />
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col space-y-2 p-4 md:hidden z-40">
          {[
            { to: "/", label: "Home" },
            { to: "/chatbot", label: "AI Chatbot" },
            { to: "/booking", label: "Book Appointment" },
            { to: "/resources", label: "Resource Hub" },
            { to: "/forum", label: "Peer Forum" },
            { to: "/call-support", label: "Call Support" }, // ✅ Added
            { to: "/admin", label: "Admin Dashboard" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-1 text-gray-700 rounded hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

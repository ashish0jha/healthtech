import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, UserCircle2 } from "lucide-react";
import { auth } from "../firebase";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  const displayName = user?.displayName?.split(" (")[0];
  const userType = user?.displayName?.split(" (")[1]?.replace(")", "");

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
      <div className="hidden md:flex space-x-6 text-lg font-medium text-white">
        <Link to="/">Home</Link>
        <Link to="/chatbot">AI Chatbot</Link>
        <Link to="/booking">Book Appointment</Link>
        <Link to="/resources">Resource Hub</Link>
        <Link to="/forum">Peer Forum</Link>
        <Link to="/call-support">Call Support</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>

      {/* User Section */}
      {user && (
        <div className="relative ml-4">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 text-white focus:outline-none"
          >
            <UserCircle2 size={28} />
            <span className="hidden md:inline font-semibold">
              {displayName} ({userType})
            </span>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md z-50">
              <Link
                to="/user"
                onClick={() => setUserMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setUserMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="md:hidden focus:outline-none text-white"
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
            { to: "/call-support", label: "Call Support" },
            { to: "/admin", label: "Admin Dashboard" },
            ...(user
              ? [
                  { to: "/user", label: "Dashboard" },
                  { to: "/", label: "Logout", action: handleLogout },
                ]
              : []),
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setMenuOpen(false);
                item.action ? item.action() : navigate(item.to);
              }}
              className="text-left px-2 py-1 text-gray-700 rounded hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
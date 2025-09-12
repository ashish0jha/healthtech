import { useState } from "react";
import FeatureCard from "./FeatureCard";
import { Heart, Users, BookOpen, MessageCircle, BarChart, StickyNote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const featureOptions = [
  { title: "AI Chatbot", path: "/chatbot" },
  { title: "Confidential Booking", path: "/booking" },
  { title: "Resource Hub", path: "/resources" },
  { title: "Peer Support Forum", path: "/forum" },
  { title: "Admin Dashboard", path: "/admin" },
];

const HomePage = () => {
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSaveNote = () => {
    if (notes.trim() !== "") {
      setSavedNotes([...savedNotes, notes]);
      setNotes("");
    }
  };

  // New modal handlers
  const handleSupportNowClick = () => {
    setModalOpen(true);
  };

  const handleFeatureSelect = (path) => {
    setModalOpen(false);
    navigate(path);
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-indigo-100 min-h-screen flex flex-col mt-[65px]">

      {/* Hero Section */}
      <header className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-4 animate-fadeIn">
          Digital Psychological Intervention System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn delay-200">
          A stigma-free, inclusive, and AI-powered mental wellness platform 
          designed to support students anytime, anywhere.
        </p>
        {/* Modified Button onClick */}
        <button
          onClick={handleSupportNowClick}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700"
        >
          Get Support Now
        </button>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-12 max-w-6xl mx-auto bg-blue-100">
        <Link to="/chatbot">
            <FeatureCard 
              icon={<MessageCircle className="w-10 h-10 text-black" />} 
              title="AI Chatbot"
              desc="Get instant coping strategies and first-aid support anytime you need." 
            />
        </Link>
        <Link to="/booking">
            <FeatureCard 
              icon={<Heart className="w-10 h-10 text-black" />} 
              title="Confidential Booking"
              desc="Book private appointments with counselors or helplines securely." 
            />
        </Link>
        <Link to="/resources">
            <FeatureCard 
              icon={<BookOpen className="w-10 h-10 text-black" />} 
              title="Resource Hub"
              desc="Access wellness guides, audios, and videos in regional languages." 
            />
        </Link>
        <Link to="/forum">
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-black" />} 
              title="Peer Support Forum"
              desc="Share experiences in a safe, moderated community of students." 
            />
        </Link>
        <Link to="/admin">
            <FeatureCard 
              icon={<BarChart className="w-10 h-10 text-black" />} 
              title="Admin Dashboard"
              desc="Anonymous analytics for institutions to plan proactive interventions." 
            />
        </Link>
      </section>

      {/* Notes Section */}
      <section className="bg-white py-12 px-6 rounded-2xl shadow-lg max-w-4xl mx-auto mb-12 flex flex-col">
        <div className="flex items-center justify-center gap-3 mb-6">
          <StickyNote className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-indigo-700">Your Wellness Notes</h2>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your thoughts, reminders, or feelings here..."
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 resize-none"
          rows="4"
        />

        <button
          onClick={handleSaveNote}
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Save Note
        </button>

        {/* Display Saved Notes */}
        <div className="mt-6 space-y-3">
          {savedNotes.map((note, index) => (
            <div
              key={index}
              className="p-3 bg-pink-50 border border-pink-200 rounded-lg text-gray-800 animate-fadeIn"
            >
              {note}
            </div>
          ))}
        </div>
      </section>

      {/* Modal Section - added to existing code */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
              Choose a Feature to Get Support
            </h2>
            <ul className="space-y-3">
              {featureOptions.map(({ title, path }) => (
                <li key={path}>
                  <button
                    onClick={() => handleFeatureSelect(path)}
                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full py-2 text-indigo-700 font-semibold hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

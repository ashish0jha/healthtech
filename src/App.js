import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Booking from "./components/Booking";
import ResourceHub from "./components/ResourceHub";
import PeerForum from "./components/PeerForum";
import AdminDashboard from "./components/AdminDashboard";
import Body from "./components/Body";
import CallSupport from "./components/CallSupport";
import Login from "./Pages/Login";
import UserDashboard from "./components/UserDashboard";
import MainLayout from "./components/MainLayout";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const Home = () => <Body />;

  return (
    <Router>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes with Navbar */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <ResourceHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <PeerForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/call-support"
            element={
              <ProtectedRoute>
                <CallSupport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
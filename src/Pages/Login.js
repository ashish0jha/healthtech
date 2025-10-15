import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Student");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (login) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${name} (${type})`,
        });
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="flex items-center justify-center min-h-screen px-4 bg-[url('https://img.freepik.com/free-photo/healthcare-experts-discuss-recovery-strategies-treatment-center_53876-145042.jpg')] bg-cover bg-center bg-no-repeat"
>
      <div className="bg-blue-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {login ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!login && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Please wait..." : login ? "Login" : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <p
          onClick={() => setLogin(!login)}
          className="mt-4 text-center text-indigo-600 cursor-pointer hover:underline"
        >
          {login ? "Create new account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
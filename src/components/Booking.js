import React, { useState } from "react";

function Booking() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center font-sans">
      <main className="w-full max-w-md  bg-blue-100 rounded-xl shadow-2xl px-8 py-10 flex flex-col items-center ">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center select-none ">
          🕊️ Book a Confidential Counseling Session
        </h2>
        {submitted ? (
          <p className="bg-green-50 border border-green-200 rounded-md text-green-900 py-5 px-4 text-center text-lg shadow-inner transition">
            Your appointment is booked.<br />
            <span className="text-base text-gray-600 block mt-1">A counselor will contact you soon.</span>
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 mt-2"
            aria-label="Booking form"
          >
            <label className="flex flex-col gap-2">
              <span className="text-blue-800 font-medium text-base">
                Preferred name or alias
              </span>
              <input
                type="text"
                placeholder="Enter name or alias"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 placeholder:text-blue-300 font-normal shadow"
                aria-label="Preferred name or alias"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-blue-800 font-medium text-base">
                Choose a session date
              </span>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')}
                onChange={(e) => setDate(e.target.value)}
                required
                className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-normal shadow"
                aria-label="Session date"
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow transition"
            >
              Book Now
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default Booking;

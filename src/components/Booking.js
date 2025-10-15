import React, { useState } from "react";

function Booking() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setDate("");
    setTimeSlot("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center font-sans">
      <main className="w-full max-w-md bg-blue-100 rounded-xl shadow-2xl px-8 py-10 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center select-none">
          🕊️ Book a Confidential Counseling Session
        </h2>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-md text-green-900 py-5 px-4 text-center text-lg shadow-inner transition space-y-2">
            <p>Your appointment is booked.</p>
            <p className="text-base text-gray-700">
              <strong>Name:</strong> {name}
              <br />
              <strong>Date:</strong> {date}
              <br />
              <strong>Time Slot:</strong> {timeSlot}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              A counselor will contact you soon.
            </p>
            <button
              onClick={resetForm}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Book Another Session
            </button>
          </div>
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
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-blue-800 font-medium text-base">
                Choose a session date
              </span>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                required
                className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-normal shadow"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-blue-800 font-medium text-base">
                Select a time slot
              </span>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
                className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-normal shadow"
              >
                <option value="" disabled>
                  Choose a time slot
                </option>
                <option value="Morning (9AM - 11AM)">Morning (9AM - 11AM)</option>
                <option value="Afternoon (1PM - 3PM)">Afternoon (1PM - 3PM)</option>
                <option value="Evening (5PM - 7PM)">Evening (5PM - 7PM)</option>
              </select>
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
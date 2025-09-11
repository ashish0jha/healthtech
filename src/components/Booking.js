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
    <section>
      <h2>Book a Confidential Counseling Session</h2>
      {submitted ? (
        <p>Your appointment is booked. A counselor will contact you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Preferred name or alias"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <button type="submit">Book Now</button>
        </form>
      )}
    </section>
  );
}

export default Booking;

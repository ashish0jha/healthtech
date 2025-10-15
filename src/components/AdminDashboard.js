import React from "react";

function AdminDashboard() {
  const analytics = {
    highStressCases: 12,
    totalChats: 122,
    activeBookings: 6,
    forumPosts: 34,
  };

  const stats = [
    { label: "High Stress Cases Detected", value: analytics.highStressCases, color: "bg-red-500" },
    { label: "Total Chatbot Interactions", value: analytics.totalChats, color: "bg-blue-500" },
    { label: "Active Counseling Bookings", value: analytics.activeBookings, color: "bg-green-500" },
    { label: "Peer Forum Posts", value: analytics.forumPosts, color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-blue-100 p-8 font-sans">
      <header className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-900 tracking-tight select-none">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-blue-700 max-w-lg text-center">
          Use real-time data to create proactive policies supporting students' well-being.
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map(({ label, value, color }) => (
          <section
            key={label}
            className="rounded-xl shadow-lg p-6 flex flex-col items-center justify-center bg-white hover:scale-105 duration-300"
            aria-label={label}
            tabIndex={0}
          >
            <div
              className={`${color} rounded-full w-14 h-14 flex items-center justify-center mb-4`}
              aria-hidden="true"
            >
              <span className="text-white text-xl font-bold">{value}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 text-center">{label}</h2>
          </section>
        ))}
      </main>
    </div>
  );
}

export default AdminDashboard;

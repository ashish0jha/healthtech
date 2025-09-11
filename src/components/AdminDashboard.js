import React from "react";

function AdminDashboard() {
  const analytics = {
    highStressCases: 12,
    totalChats: 122,
    activeBookings: 6,
    forumPosts: 34,
  };

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>High stress cases detected: {analytics.highStressCases}</li>
        <li>Total chatbot interactions: {analytics.totalChats}</li>
        <li>Active counseling bookings: {analytics.activeBookings}</li>
        <li>Peer forum posts: {analytics.forumPosts}</li>
      </ul>
      <p>Use real-time data to create proactive policies supporting students' well-being.</p>
    </section>
  );
}

export default AdminDashboard;

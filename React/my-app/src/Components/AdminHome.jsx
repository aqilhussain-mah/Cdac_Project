import React, { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./AdminHome.css";

const AdminHome = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Dummy Data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  ];

  const bookings = [
    { id: 1, user: "John Doe", date: "2024-01-10", amount: "$500", status: "Pending" },
    { id: 2, user: "Jane Smith", date: "2024-01-15", amount: "$700", status: "Confirmed" },
  ];

  const analyticsData = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 500 },
  ];

  const events = [
    { title: "John's Booking", date: "2024-01-10" },
    { title: "Jane's Booking", date: "2024-01-15" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`admin-home-container ${darkMode ? "dark" : ""}`}>
      <h1>Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="dashboard">
        <div className="card">
          <h2>Total Users</h2>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h2>Bookings This Month</h2>
          <p>{bookings.length}</p>
        </div>
        <div className="card">
          <h2>Revenue</h2>
          <p>$12,500</p>
        </div>
        <div className="card">
          <h2>Notifications</h2>
          <p>5 New</p>
        </div>
      </div>

      {/* Admin Controls */}
      <div className="admin-controls">
        <button onClick={() => console.log("Navigating to user management")}>
          Manage Users
        </button>
        <button onClick={() => console.log("Navigating to booking management")}>
          Manage Bookings
        </button>
        <button onClick={() => console.log("Navigating to analytics")}>
          View Analytics
        </button>
        <button onClick={() => console.log("Navigating to settings")}>
          Settings
        </button>
      </div>

      {/* Analytics Chart */}
      <div>
        <h2>Analytics</h2>
        <LineChart width={600} height={300} data={analyticsData}>
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      {/* Calendar */}
      <div>
        <h2>Calendar</h2>
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
      </div>

      {/* Booking Management Table */}
      <div>
        <h2>Bookings</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user}</td>
                <td>{booking.date}</td>
                <td>{booking.amount}</td>
                <td>{booking.status}</td>
                <td>
                  <button>Approve</button>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          <li>New user registered</li>
          <li>System maintenance scheduled for 12:00 AM</li>
        </ul>
      </div>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => console.log("Searching:", e.target.value)}
        />
      </div>

      {/* Dark Mode Toggle */}
      <div>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default AdminHome;

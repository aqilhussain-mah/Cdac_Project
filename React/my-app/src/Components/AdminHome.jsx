import React from "react";
import "./AdminHome.css";

function AdminHome() {
  const cards = [
    { title: "Active Locations", value: 2, icon: "fas fa-map-marker-alt" },
    { title: "Active Services", value: 4, icon: "fas fa-concierge-bell" },
    { title: "Bookings", value: 2, icon: "fas fa-calendar-alt" },
    { title: "Unread Inquiries", value: 1, icon: "fas fa-envelope" },
  ];

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Wedding Solutions</h2>
        <ul>
          <li><i className="fas fa-home"></i> Dashboard</li>
          <li><i className="fas fa-calendar-check"></i> Booking Applications</li>
          <li><i className="fas fa-envelope"></i> Inquiries</li>
          <li><i className="fas fa-users"></i> Clients List</li>
          <hr />
          <li><i className="fas fa-map-marker-alt"></i> Locations List</li>
          <li><i className="fas fa-concierge-bell"></i> Services List</li>
          <li><i className="fas fa-user"></i> User List</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <div className="navbar-left">
            <i className="fas fa-bars"></i>
            <h3>Wedding Solutions - Admin</h3>
          </div>
          <div className="navbar-right">
            <span>Administrator Admin</span>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard">
          <h1>Welcome to Wedding Solutions - Admin Panel</h1>
          <div className="cards">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <i className={card.icon}></i>
                <h3>{card.value}</h3>
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

/* App.css */

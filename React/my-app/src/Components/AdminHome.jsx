import React, { useState, useEffect, useContext } from "react";
import "./AdminHome.css";
import Profile from "./Profile";
import { AppContext } from "./AppContext"; // Import AppContext
import FunctionHall from "./FunctionHall"; // Assuming you have a FunctionHall component
import axios from "axios"; // Import axios for making HTTP requests

const AdminHome = ({ setView }) => {
  const { username, updateFunctionHallId, functionHallId } = useContext(AppContext); // Get username and functionHallId from context
  const [activeView, setActiveView] = useState("dashboard");
  const [functionHalls, setFunctionHalls] = useState([]);

  // Fetch function halls data from backend (port 3000)
  useEffect(() => {
    const fetchFunctionHalls = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/functionhalls/state/Andhra Pradesh`);
        setFunctionHalls(response.data);
      } catch (error) {
        console.error("Error fetching function halls:", error);
      }
    };

    fetchFunctionHalls();
  }, []); // Run once when the component mounts

  const handleViewDetails = (hallId) => {
    updateFunctionHallId(Number(hallId)); // Ensure ID is sent as a number
    setActiveView("viewDetails"); // Switch to FunctionHall view
  };

  return (
    <div className="app row">
      {/* Sidebar */}
      <div className="sidebar col-2">
        <h2>Control Panel</h2>
        <ul>
          <li onClick={() => setActiveView("dashboard")}>
            <i className="fas fa-home"></i> Dashboard
          </li>
          <li onClick={() => setActiveView("inquiries")}>
            <i className="fas fa-envelope"></i> Inquiries
          </li>
          <li onClick={() => setActiveView("bookings")}>
            <i className="fas fa-calendar-check"></i> Booked Applicants
          </li>
          <li onClick={() => setActiveView("details")}>
            <i className="fas fa-concierge-bell"></i> Details
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-10 main-content">
        <div className="navbar">
          <div className="navbar-left">
            <h4 className="username-display">Welcome, {username}</h4>
          </div>
          <div className="navbar-right">
            <Profile />
          </div>
        </div>
        <hr />

        <div className="card main">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div>
              <div className="row">
                <div className="col-3 card">Card 1</div>
                <div className="col-3 card">Card 2</div>
                <div className="col-3 card">Card 3</div>
                <div className="col-3 card">Card 4</div>
              </div>

              <div className="row mt-4">
                <h4>Function Halls</h4>
                {functionHalls.length > 0 ? (
                  functionHalls.map((hall) => (
                    <div key={hall.id} className="col-3 card">
                      <h5>{hall.name}</h5>
                      <p>{hall.state}</p>
                      <p>{hall.location}</p>
                      <button onClick={() => handleViewDetails(hall.id)}>
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading function halls...</p>
                )}
              </div>
            </div>
          )}

          {/* Details View */}
          {activeView === "details" && (
            <div>
              {functionHalls.length === 1 ? (
                <FunctionHall hallId={Number(functionHalls[0]?.id)} selectedState={functionHalls[0]?.state} />
              ) : (
                <ul>
                  {functionHalls.map((hall) => (
                    <li key={hall.id}>
                      {hall.state} - {hall.name} ({hall.location})
                      <button onClick={() => handleViewDetails(hall.id)}>
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Function Hall View */}
          {activeView === "viewDetails" && functionHallId !== null && (
            <FunctionHall hallId={functionHallId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

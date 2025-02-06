import React, { useState, useEffect, useContext } from "react";
import "./AdminHome.css";
import Profile from "./Profile";
import { AppContext } from "./AppContext"; // Import AppContext
import FunctionHall from "./FunctionHall"; // Assuming you have a FunctionHall component
import axios from "axios"; // Import axios for making HTTP requests

const AdminHome = ({ setView }) => {
  const { username, adminId } = useContext(AppContext); // Get username and adminId from context

  // Dynamic content for the cards (linked to Dashboard)
  const [activeView, setActiveView] = useState("dashboard");

  // State to hold function halls fetched from the backend
  const [functionHalls, setFunctionHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);

  // Fetch function halls data from backend (port 3000)
  useEffect(() => {
    const fetchFunctionHalls = async () => {
      try {
        // Using 'state' instead of 'adminId' to fetch the function halls
        const response = await axios.get(`http://localhost:3000/api/functionhalls/state/${"Andhra Pradesh"}`); // Hardcoded for testing (use dynamic state if needed)
        setFunctionHalls(response.data); // Update state with the response data
      } catch (error) {
        console.error("Error fetching function halls:", error);
      }
    };

    fetchFunctionHalls();
  }, []); // Run once when the component mounts

  const handleViewDetails = (hallId) => {
    setActiveView("viewDetails");
    // Optionally, you can pass the hallId to the FunctionHall component if needed
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
            {/* Display the username */}
            <h4 className="username-display">Welcome, {username}</h4>
          </div>
          <div className="navbar-right">
            <Profile />
          </div>
        </div>
        <hr />

        <div className="card main">
          {/* Conditional Rendering based on active view */}
          {activeView === "dashboard" && (
            <div>
              <div className="row">
                {/* Display 4 static cards */}
                <div className="col-3 card">Card 1</div>
                <div className="col-3 card">Card 2</div>
                <div className="col-3 card">Card 3</div>
                <div className="col-3 card">Card 4</div>
              </div>

              <div className="row mt-4">
                <h4>Function Halls</h4>
                {/* Dynamically render function hall cards */}
                {functionHalls.length > 0 ? (
                  functionHalls.map((hall) => (
                    <div key={hall.id} className="col-3 card">
                      <h5>{hall.name}</h5>
                      <p>{hall.state}</p>
                      <p>{hall.location}</p>
                      <button
                        onClick={() => handleViewDetails(hall.id)}
                      >
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading function halls...</p>
                )}
              </div>

              {/* Display FunctionHall component in the card main section when a hall is selected */}
              {selectedHall && (
                <div className="row mt-4">
                  <FunctionHall hallId={selectedHall.id} selectedState={selectedHall.state} />
                </div>
              )}
            </div>
          )}

          {activeView === "details" && (
            <div>
              {/* If only one function hall, automatically show its details */}
              {functionHalls.length === 1 ? (
                // <FunctionHall id={Number(functionHalls[0]?.id)} />
                <FunctionHall hallId={functionHalls[0]?.id} selectedState={functionHalls[0]?.state} />
              ) : (
                <ul>
                  {functionHalls.map((hall) => (
                    <li key={hall.id}>
                      {hall.state} - {hall.name} ({hall.location})
                      <button
                        onClick={() => handleViewDetails(hall.id)}
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeView === "viewDetails" && <FunctionHall hallId={Number(functionHalls[0]?.id)} selectedState={functionHalls[0]?.state} />}

        </div>
      </div>
    </div>
  );
};

export default AdminHome;

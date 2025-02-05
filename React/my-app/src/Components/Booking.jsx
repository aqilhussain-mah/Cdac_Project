import React, { useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Booking = () => {
  const [selectedState, setSelectedState] = useState("");
  const [functionHalls, setFunctionHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useContext(AppContext);
  const navigate = useNavigate();

  // Hardcoded states of India
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh"
  ];

  // Fetch function halls when state is selected
  const fetchFunctionHalls = (state) => {
    if (state && state !== "--Select State--") {
      setLoading(true);
      fetch(`http://localhost:3000/api/functionhalls/state/${state}`)  // Updated endpoint
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFunctionHalls(data || []); // Expecting list of halls with id, state, and location
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching function halls:", error);
          setError("Failed to fetch function halls. Please try again later.");
          setLoading(false);
        });
    } else {
      setFunctionHalls([]);
    }
  };

  // Handle state change
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    fetchFunctionHalls(event.target.value); // Fetch function halls after state change
  };

  // Handle "View Details" button click
  const handleViewDetails = (hall) => {
    navigate('/FunctionHall', {
      state: {
        selectedState,
        hallId: hall.hallId  // Pass hallId and state to FunctionHall component
      }
    });
  };

  return (
    <div className="booking-container">
      <div className="container-fluid">
        <div className="card">
          <p>Welcome, <b>{username}</b>! We’re excited to help you find the perfect function hall!</p>
          <p>Please select a state from the options below to view available function halls.</p>

          {/* State Dropdown */}
          <div className="state-drop">
            <select value={selectedState} onChange={handleStateChange} className="form-select">
              <option value="--Select State--">--Select State--</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Info Message */}
          <div className="state-message">
            {selectedState === "" || selectedState === "--Select State--" ? (
              <p className="info-text">Select a state to get the function hall details.</p>
            ) : (
              <p className="info-text">Here is the list of halls from <b>{selectedState}</b>.</p>
            )}
          </div>

          {/* Loading & Error Messages */}
          {loading && <p className="loading-message">Loading function halls...</p>}
          {error && <p className="error-text">{error}</p>}

          {/* Function Hall Table */}
          {!loading && functionHalls.length > 0 && (
            <div className="function-hall-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Function Hall</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {functionHalls.map((hall) => (
                    <tr key={hall.id}>
                      <td>{selectedState}</td>
                      <td>{hall.name}</td>
                      <td>{hall.location}</td>
                      <td>
                        <button onClick={() => handleViewDetails(hall)} className="btn btn-primary">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* No Function Halls Message */}
          {!loading && functionHalls.length === 0 && selectedState && selectedState !== "--Select State--" && (
            <p className="info-text">No function halls found for {selectedState}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;

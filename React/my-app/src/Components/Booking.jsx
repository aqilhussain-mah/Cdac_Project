import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import "./Booking.css";

const Booking = () => {
  const [selectedState, setSelectedState] = useState(""); // Tracks selected state
  const [functionHalls, setFunctionHalls] = useState([]); // Tracks fetched function halls
  const [states, setStates] = useState([]); // Tracks the states fetched from the backend
  const [loading, setLoading] = useState(false); // Loading state for function halls
  const [error, setError] = useState(null); // Error handling state
  const { username } = useContext(AppContext); // Gets username from context
  const navigate = useNavigate(); // React Router navigate hook

  // Fetch states from backend on component mount
  useEffect(() => {
    fetch("http://localhost:3000/states")
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states); // Update states with data from the backend
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setError("Failed to fetch states. Please try again later.");
      });
  }, []);

  // Fetch function halls when a state is selected
  useEffect(() => {
    if (selectedState && selectedState !== "--Select State--") {
      setLoading(true); // Start loading when fetching function halls
      fetch(`http://localhost:3000/functionHalls/${selectedState}`)
        .then((response) => response.json())
        .then((data) => {
          setFunctionHalls(data.functionHalls || []); // Ensure no undefined value
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching function halls:", error);
          setError("Failed to fetch function halls. Please try again later.");
          setLoading(false);
        });
    } else {
      setFunctionHalls([]); // Reset function halls if no state is selected
    }
  }, [selectedState]); // Depend on selectedState to trigger fetch when changed

  // Function to handle state change (update selected state)
  const handleStateChange = (event) => {
    setSelectedState(event.target.value); // Set the selected state
  };

  // Function to handle booking
  const handleBookNow = (hall) => {
    // Navigate to the FunctionHall page and pass the hall data as state
    navigate('/functionhall', { 
      state: { 
        selectedState,  // Pass the selectedState
        hallId: hall.id // Pass the hall's id
      } 
    });
  };

  return (
    <div className="booking-container">
      <div className="container-fluid">
        <div className="card">
          <p>
            Welcome, <b>{username}</b>! We’re excited to help you find the perfect function hall!
          </p>
          <p>
            Please select a state from the options below to view available function halls in that location.
            Once selected, you can explore the halls and proceed with booking based on your preferences.
          </p>

          {/* State dropdown */}
          <div className="state-drop">
            <select
              value={selectedState}
              onChange={handleStateChange}
              className={selectedState === "--Select State--" ? "gray-text" : ""}
            >
              <option value="--Select State--" className="gray-text">
                --Select State--
              </option>
              {/* Dynamically populate states from the backend */}
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Info message */}
          <div className="state-message">
            {selectedState === "" || selectedState === "--Select State--" ? (
              <p className="info-text">Select a state in the dropdown above to get the function hall details.</p>
            ) : (
              <p className="info-text">
                Here is the list of halls from <b>{selectedState}</b>.
              </p>
            )}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="loading-message">
              <p>Loading function halls...</p>
            </div>
          )}

          {/* Error message */}
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
                        <button
                          onClick={() => handleBookNow(hall)} // Send hall data to the FunctionHall page
                          className="btn btn-primary"
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Message if no function halls are found */}
          {!loading && functionHalls.length === 0 && selectedState && selectedState !== "--Select State--" && (
            <p className="info-text">No function halls found for {selectedState}. Try selecting another state.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
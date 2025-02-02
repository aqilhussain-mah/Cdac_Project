import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // To access the state passed via navigation
import "./FunctionHall.css"; // Assume you have some styling for this component

const FunctionHall = () => {
  const location = useLocation(); // Access the state passed via navigate
  const { selectedState, hallId } = location.state || {}; // Destructure the state and hallId from location

  const [hallDetails, setHallDetails] = useState(null); // To store the function hall details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Fetch the function hall details from the backend based on the state and hallId
  useEffect(() => {
    if (selectedState && hallId) {
      setLoading(true); // Set loading to true while fetching
      fetch(`http://localhost:3000/functionHallDetails/${selectedState}/${hallId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.functionHall) {
            setHallDetails(data.functionHall); // Set the fetched hall details
          } else {
            setError("Function hall not found.");
          }
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching function hall details:", error);
          setError("Failed to fetch function hall details. Please try again later.");
          setLoading(false);
        });
    }
  }, [selectedState, hallId]); // Run this effect whenever selectedState or hallId changes

  // Render the component
  return (
    <div className="function-hall-container">
      <div className="container">
        <div className="card">
          <h2>Function Hall Details</h2>

          {/* Display loading state */}
          {loading && <p>Loading details...</p>}

          {/* Display error message */}
          {error && <p className="error-text">{error}</p>}

          {/* Display hall details if available */}
          {hallDetails && (
            <div className="hall-details">
              <p><strong>Hall Name:</strong> {hallDetails.name}</p>
              <p><strong>Location:</strong> {hallDetails.location}</p>
              <p><strong>State:</strong> {selectedState}</p>
              <p><strong>Hall ID:</strong> {hallDetails.id}</p>
            </div>
          )}

          {/* Message if no hall details are found */}
          {!loading && !hallDetails && !error && (
            <p>No details available for the selected hall.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionHall;
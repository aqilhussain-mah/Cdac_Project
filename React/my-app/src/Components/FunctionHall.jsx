import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FunctionHall = () => {
  const location = useLocation();
  const { selectedState, hallId } = location.state || {};

  const [hallDetails, setHallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hallId) {
      setError("Invalid function hall ID.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:3000/api/functionhalls/${hallId}/details`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setHallDetails(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching function hall details:", err);
        setError("Failed to fetch hall details.");
        setLoading(false);
      });
  }, [hallId]);

  return (
    <div className="container mt-4">
      <h2>Function Hall Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {hallDetails && (
        <div className="card p-3">
          <p><strong>State:</strong> {selectedState}</p>
          <p><strong>Hall Name:</strong> {hallDetails.name}</p>
          <p><strong>Location:</strong> {hallDetails.location}</p>
          <p><strong>Admin:</strong> {hallDetails.admin}</p>
        </div>
      )}
    </div>
  );
};

export default FunctionHall;

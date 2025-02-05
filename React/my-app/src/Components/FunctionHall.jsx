import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FunctionHall = () => {
  const location = useLocation();
  const { hallId } = location.state || {};
  const [hallDetails, setHallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHallModal, setShowHallModal] = useState(false);

  useEffect(() => {
    if (!hallId) {
      console.error("hallId is undefined!");
      setError("Invalid hall ID. Please go back and select a hall.");
      setLoading(false);
      return;
    }

    console.log(`Fetching details for hallId: ${hallId}`);
    fetch(`http://localhost:3000/api/functionhalls/${hallId}/details`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched hall details:", data);
        if (!data || Object.keys(data).length === 0) {
          throw new Error("No details available for this hall.");
        }
        setHallDetails(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch hall details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [hallId]);

  return (
    <div className="container mt-4">
      <h2>Function Hall Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {hallDetails && (
        <div className="card p-4">
          <h4>{hallDetails.name}</h4>
          <p><strong>Location:</strong> {hallDetails.location}</p>
          <p><strong>Admin:</strong> {hallDetails.admin}</p>
        </div>
      )}

      {/* Book Now Button */}
      <Button
        variant="primary"
        className="float-end mb-4"
        onClick={() => setShowHallModal(true)}
      >
        Book Now
      </Button>

      {/* Booking Modal */}
      <Modal show={showHallModal} onHide={() => setShowHallModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book {hallDetails?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Booking functionality will be implemented soon.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHallModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FunctionHall;

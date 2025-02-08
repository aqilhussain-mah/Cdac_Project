import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmBooking = () => {
  const location = useLocation();
  const bookingData = location.state; // Get the data passed from the previous component

  // Check if bookingData is available, if not, handle it gracefully
  if (!bookingData) {
    return <div>No booking data available.</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2><b>Confirm Booking</b></h2><br></br>
          <h4 className="card-title">Booking Details</h4>
          <ul className="list-unstyled">
            <li><strong>Function Hall Name:</strong> {bookingData.name}</li>
            <li><strong>Admin Name:</strong> {bookingData.adminName}</li>
            <li><strong>Admin Contact:</strong> {bookingData.adminContact}</li>
            <li><strong>State:</strong> {bookingData.state}</li>
            <li><strong>Location:</strong> {bookingData.location}</li>
          </ul>
          <input type="button" value="Book now"></input>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;

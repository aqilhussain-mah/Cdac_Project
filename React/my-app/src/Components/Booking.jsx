import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import "./Booking.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for modal styling

const Booking = () => {
  const [selectedState, setSelectedState] = useState("");
  const [functionHalls, setFunctionHalls] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useContext(AppContext);
  const navigate = useNavigate();

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    location: "",
    userName: "",
    capacity: "",
    date: "",
    timeSlot: "Morning",
    additionalNotes: "",
  });

  // Fetch states from backend
  useEffect(() => {
    fetch("http://localhost:3000/users/states")
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        setError("Failed to fetch states. Please try again later.");
      });
  }, []);

  // Fetch function halls when state is selected
  useEffect(() => {
    if (selectedState && selectedState !== "--Select State--") {
      setLoading(true);
      fetch(`http://localhost:3000/users/functionHalls/${selectedState}`)
        .then((response) => response.json())
        .then((data) => {
          setFunctionHalls(data.functionHalls || []);
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
  }, [selectedState]);

  // Handle state change
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  // Handle "View Details" button click
  const handleBookNow = (hall) => {
    navigate('/functionhall', {
      state: {
        selectedState,
        hallId: hall.id
      }
    });
  };

  // Open modal for booking
  const openBookingModal = (hall) => {
    setBookingData({
      ...bookingData,
      name: hall.name,
      location: hall.location,
    });
    setShowModal(true);
  };

  // Close modal
  const closeBookingModal = () => {
    setShowModal(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details:", bookingData);
    closeBookingModal();
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
                      <td className="d-flex gap-2">
                        <button onClick={() => handleBookNow(hall)} className="btn btn-primary">
                          View Details
                        </button>
                        <button className="btn btn-success" onClick={() => openBookingModal(hall)}>
                          Book Now
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

      {/* Modal for Booking */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Function Hall</h5>
                <button type="button" className="btn-close" onClick={closeBookingModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Hall Name</label>
                    <input type="text" className="form-control" value={bookingData.name} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" value={bookingData.location} disabled />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-control" name="userName" value={bookingData.userName} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Capacity</label>
                    <input type="number" className="form-control" name="capacity" value={bookingData.capacity} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" name="date" value={bookingData.date} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Time Slot</label>
                    <select className="form-select" name="timeSlot" value={bookingData.timeSlot} onChange={handleChange}>
                      <option value="Morning">Morning</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit Booking</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;

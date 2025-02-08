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
  const [selectedState, setSelectedState] = useState("Andhra Pradesh"); // Assuming you want to keep it static for now
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState(null);

  // Fetch function halls data from backend (port 3000)
  useEffect(() => {
    const fetchFunctionHalls = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/functionhalls/state/${selectedState}`);
        setFunctionHalls(response.data);
      } catch (error) {
        console.error("Error fetching function halls:", error);
      }
    };

    fetchFunctionHalls();
  }, [selectedState]); // Run every time selectedState changes

  const handleViewDetails = (hallId) => {
    updateFunctionHallId(Number(hallId)); // Ensure ID is sent as a number
    setActiveView("viewDetails"); // Switch to FunctionHall view
  };

  const handleDelete = (hallId) => {
    setHallToDelete(hallId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/functionhalls/${hallToDelete}`);
      setFunctionHalls(functionHalls.filter((hall) => hall.id !== hallToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting function hall:", error);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
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

        <div className="main">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <div>
              <div className="row">
                <div className="col-3 card clickable-card" onClick={() => setActiveView("details")}>
                  <div className="card-content">
                    <div className="icon-number-container">
                      <h5>{functionHalls.length}</h5>
                    </div>
                    <p>Active Location</p>
                  </div>
                </div>
                <div className="col-3 card">Card 2</div>
                <div className="col-3 card">Card 3</div>
                <div className="col-3 card">Card 4</div>
              </div>

              <div className="row mt-4">
                <h4>Function Halls</h4>
                {functionHalls.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>State</th>
                        <th>Name</th>
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
                              onClick={() => handleViewDetails(hall.id)}
                              className="btn btn-primary"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Click on <b>Details</b> to enter your function hall details.</p>
                )}
              </div>
            </div>
          )}

          {/* Details View */}
          {activeView === "details" && (
            <div>
              <button className="btn btn-success" onClick={() => setActiveView("addFunctionHall")}>
                + Add Function Hall
              </button>
              <h4 className="mt-4">Function Halls</h4>
              {functionHalls.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {functionHalls.map((hall) => (
                      <tr key={hall.id}>
                        <td>{hall.state}</td>
                        <td>{hall.name}</td>
                        <td>{hall.location}</td>
                        <td>
                          <button
                            onClick={() => handleViewDetails(hall.id)}
                            className="btn btn-primary"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(hall.id)}
                            className="btn btn-danger ml-2"
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>
                  No function halls found. Click on <b>+ Add Function Hall</b> to add your function hall details.
                </p>
              )}
            </div>
          )}

          {/* Function Hall View */}
          {activeView === "viewDetails" && functionHallId !== null && (
            <FunctionHall hallId={functionHallId} />
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h4>Confirm Deletion</h4>
                <p>Are you sure you want to delete this function hall?</p>
                <button onClick={confirmDelete} className="btn btn-danger">
                  Yes, Delete
                </button>
                <button onClick={cancelDelete} className="btn btn-secondary ml-2">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default AdminHome;

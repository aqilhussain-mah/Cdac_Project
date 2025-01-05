import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="NavigationBar-container">
      <div className="container-fluid mb-5 mt-4">
        <div className="row">
          <div className="col-9 d-flex justify-content-start">
            <div className="me-4 ps-4">
              <NavLink to="/" className="nav-link btn-modal">
                <i className="bi bi-house"></i> Home
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/Location" className="nav-link">
                <i className="bi bi-info-circle"></i> Instructions
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/About" className="nav-link">
                <i className="bi bi-people"></i> About
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/ContactUs" className="nav-link">
                <i className="bi bi-envelope"></i> Contact
              </NavLink>
            </div>
            <div className="me-4">
              <NavLink to="/MyBooking" className="nav-link">
                <i className="bi bi-journal-bookmark"></i> My Bookings
              </NavLink>
            </div>
          </div>
          <div className="col-3 d-flex align-items-center justify-content-end order-last mr-2">
            {/* Profile NavLink */}
            <div className="position-relative">
              <NavLink
                to="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  toggleModal();
                }}
              >
                <i className="bi bi-person"></i> Profile
              </NavLink>

              {/* Modal Popup */}
              {modal && (
                <div
                className="profile-modal"
                style={{
                  position: "absolute",
                  top: "100%", // Align just below the Profile button
                  right: "0", // Align to the left of the Profile button
                  zIndex: 1050,
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                  width: "200px",
                }}
              >
                {/* Close Button */}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={toggleModal}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              
                {/* Modal Links */}
                <ul className="list-unstyled mb-0">
                  <li>
                    <NavLink
                      to="/Login"
                      className="modal-link"
                      onClick={toggleModal} // Close modal on link click
                    >
                      LogIn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/UserRegistration"
                      className="modal-link"
                      onClick={toggleModal} // Close modal on link click
                    >
                      Register as User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/adminRegister"
                      className="modal-link"
                      onClick={toggleModal} // Close modal on link click
                    >
                      Register as Admin
                    </NavLink>
                  </li>
                </ul>
              </div>
              
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

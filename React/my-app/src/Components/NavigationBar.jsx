import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { AppContext } from "./AppContext";

const NavigationBar = () => {
  const [modal, setModal] = useState(false);
  const { username, role ,logout } = useContext(AppContext);  // Access both username and role from context

  const toggleModal = () => {
    setModal(!modal);
  };
  
  const handleLogout = () => {
    logout();  // Call logout function to reset username and role
    setModal(false);  // Close modal after logout
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
                <i className="bi bi-person"></i>
                {role === null || role === "none" ? ("Profile") : (username)}
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
                      <i className="bi bi-person-square"> </i>
                      {username}
                    </li>

                    {role === null || role === "none" ? (
                      <li>
                        <NavLink
                          to="/Login"
                          className="modal-link"
                          onClick={toggleModal} // Close modal on link click
                        >
                          LogIn
                        </NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink
                          to="/Login/ResetPassword"
                          className="modal-link"
                          onClick={toggleModal} // Close modal on link click
                        >
                          Settings
                        </NavLink>
                      </li>
                    )}
                    {role === null || role === "none" ?
                      (
                        <li>
                        </li>
                      ) : (
                        <li>
                          <NavLink to="/" className="modal-link" onClick={handleLogout}>
                            <i className="bi bi-box-arow-right"></i>Log Out
                          </NavLink>
                        </li>
                      )}
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

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import "./Profile.css"; // Import the external CSS file

const Profile = () => {
  const [modal, setModal] = useState(false);
  const { username, role, logout } = useContext(AppContext); // Access both username and role from context

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    logout(); // Call logout function to reset username and role
    setModal(false); // Close modal after logout
  };

  return (
    <div className="col-3 d-flex align-items-center justify-content-end order-last mr-2">
      {/* Profile NavLink */}
      <div className="position-relative">
        <NavLink
          to="#"
          className="nav-link d-flex align-items-center profile-navlink"
          onClick={(e) => {
            e.preventDefault(); // Prevent default navigation
            toggleModal();
          }}
        >
          <i className="bi bi-person profile-icon"></i>
          <span className="profile-username">
            {username === null ? "Profile" : username}
          </span>
        </NavLink>

        {/* Modal Popup */}
        {modal && (
          <div className="profile-modal">
            {/* Close Button */}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={toggleModal}
            >
              &times;
            </button>

            {/* Modal Links */}
            <ul className="list-unstyled mb-0">
              <li>
                <i className="bi bi-person-square profile-icon"></i>
                <span className="profile-username">
                  {username || "Profile"}
                </span>
              </li>

              {role === null || role === "none" ? (
                <li>
                  <NavLink
                    to="/Login"
                    className="modal-link"
                    onClick={toggleModal}
                  >
                    LogIn
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/Login/ResetPassword"
                    className="modal-link"
                    onClick={toggleModal}
                  >
                    Settings
                  </NavLink>
                </li>
              )}

              {role !== null && role !== "none" && (
                <li>
                  <NavLink
                    to="/"
                    className="modal-link"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right profile-icon"></i>{" "}
                    Log Out
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Modal, Table, Button, CloseButton} from "react-bootstrap";
import "./Profile.css"; // Import the external CSS file


const Profile = () => {
  const [modal, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false); // State for Details modal
  const { username, role, logout } = useContext(AppContext);




  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    logout();
    setModal(false);
  };

  // Dummy details data
  const detailsData = [
    {
      functionalName: "Banquet Hall",
      address: "123 Main St, New York",
      serviceName: "Biryani, Gulab Jamun", 
      type: "Main Course, Dessert", 
      category: "Non-Veg", 
      status: "Confirmed",
    },
    {
      functionalName: "Conference Room",
      address: "456 Business Ave, California",
      serviceName: "Paneer Tikka, Jalebi",
      type: "Starter, Dessert",
      category: "Veg",
      status: "Pending",
    },
  ];

  return (
    <div className="col-3 d-flex align-items-center justify-content-end order-last mr-2">
      <div className="position-relative">
        <NavLink
          to="#"
          className="nav-link d-flex align-items-center profile-navlink"
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <i className="bi bi-person profile-icon"></i>
          <span className="profile-username">
            {username === null ? "Profile" : username}
          </span>
        </NavLink>

        {modal && (
  <div className="profile-modal">
    {/* ✅ Proper Close Button */}
    <button
    type="button"
    className="profile-close-btn"
    aria-label="Close"
    onClick={toggleModal}
>
    <span>&times;</span> {/* This will properly show the "X" symbol */}
</button>




    <ul className="list-unstyled mb-0">
      <li>
        <i className="bi bi-person-square profile-icon"></i>
        <span className="profile-username">{username || "Profile"}</span>
      </li>

      {role === null || role === "none" ? (
        <li>
          <NavLink to="/Login" className="modal-link" onClick={toggleModal}>
            LogIn
          </NavLink>
        </li>
      ) : (
        <div>
          <li>
            <NavLink to="/Login/ResetPassword" className="modal-link" onClick={toggleModal}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink className="modal-link" onClick={() => setDetailsModal(true)}>
              Details
            </NavLink>
          </li>
        </div>
      )}

      {role !== null && role !== "none" && (
        <li>
          <NavLink to="/" className="modal-link" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right profile-icon"></i> Log Out
          </NavLink>
        </li>
      )}
    </ul>
  </div>
)}

      </div>

      {/* Details Modal */}
      <Modal show={detailsModal} onHide={() => setDetailsModal(false)} backdrop={false} size="lg"   centered>
        <Modal.Header>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive bordered hover>
            <thead className="table-dark">
              <tr>
                <th>Functional Name</th>
                <th>Address</th>
                <th>Service Name</th>
                <th>Type</th>
                <th>Category (Veg/Non-Veg)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {detailsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.functionalName}</td>
                  <td>{item.address}</td>
                  <td>{item.serviceName}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={item.status === "Confirmed" ? "badge bg-success" : "badge bg-warning"}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;

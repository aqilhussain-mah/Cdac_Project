import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FunctionHall = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { functionHallId, role, stateList } = useContext(AppContext);
  const [hallDetails, setHallDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value });
  };

  const handleBookNow = async () => {
    try {
      console.log("Fetching latest hall details before booking...");
      
      const response = await fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`);
      const data = await response.json();
      
      if (!response.ok || !data || Object.keys(data).length === 0) {
        console.error("Failed to fetch valid function hall details, cannot proceed.");
        return;
      }
  
      console.log("Navigating with updated hallDetails:", data);
  
      // Navigate with the freshly fetched data
      navigate("/ConfirmBooking", { state: data });
  
    } catch (error) {
      console.error("Error fetching function hall details:", error);
    }
  };

  const handleSave = () => {
    // Ensure IDs are numbers before sending
    const updatedData = {
      hallId: parseInt(formData.hallId, 10), // Ensure hallId is a number
      hallName: formData.name,
      location: formData.location,
      state: formData.state,
      admin: {
        id: parseInt(formData.adminId, 10),   // Ensure adminId is a number
        name: formData.adminName,
        contact: formData.adminContact
      },
    };

    // Send the data to backend to update
    fetch("http://localhost:3000/api/functionhalls/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Data saved successfully:", data);
          // After successful update, fetch the updated hall details again
          fetchFunctionHallDetails();  // Call the function to fetch updated details
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setError("Error saving data.");
        setLoading(false);
      });
  };

  const fetchFunctionHallDetails = () => {
    setLoading(true); // Set loading to true before making the request
    fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setHallDetails(data);  // Update function hall details in state
          setFormData(data);      // Set the form data with the updated details
        }
        setLoading(false);       // Stop loading
      })
      .catch((err) => {
        console.error("Error fetching function hall details:", err);
        setError("Failed to fetch hall details.");
        setLoading(false);       // Stop loading
      });
  };

  useEffect(() => {
    if (!functionHallId) {
      setError("Invalid function hall ID.");
      setLoading(false);
      return;
    }

    console.log("Fetching details for hallId:", functionHallId);
    // Fetch the function hall details when the component is mounted
    fetchFunctionHallDetails();
  }, [functionHallId]);

  return (
    <div className="container FunctionHall-container">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {hallDetails && (
        <div className="card text-start">
          <h2 className="text-center mb-5">Function Hall Details</h2>

          <form>
            <table className="table">
              <tr>
                <td><strong>State:</strong></td>
                <td>
                  {isEditing ? (
                    <div className="state-drop">
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className="form-select"
                      >
                        <option value="">--Select State--</option>
                        {stateList.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <input
                      type="text"
                      id="state"
                      className="form-control"
                      name="state"
                      value={formData.state || "Not Available"}
                      disabled
                    />
                  )}
                </td>
              </tr>

              <tr>
                <td><strong>Function Hall Name:</strong></td>
                <td>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </td>
                <td>
                  <div className="col text-end">
                    {role === "user" ? (
                      <button className="btn btn-primary action-btn" type="button" onClick={handleBookNow}>
                        Book Now
                      </button>
                    ) : role === "admin" ? (
                      <button
                        className="btn btn-secondary action-btn"
                        onClick={handleEdit}
                        type="button"
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>

              <tr>
                <td><strong>Location:</strong></td>
                <td>
                  <input
                    type="text"
                    id="location"
                    className="form-control"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </td>
              </tr>

              <tr>
                <td><strong>Manager Name:</strong></td>
                <td>
                  <input
                    type="text"
                    id="adminName"
                    className="form-control"
                    name="adminName"
                    value={formData.adminName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </td>
              </tr>

              <tr>
                <td><strong>Manager Contact:</strong></td>
                <td>
                  <input
                    type="text"
                    id="adminContact"
                    className="form-control"
                    name="adminContact"
                    value={formData.adminContact || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  {isEditing && (
                    <button
                      className="btn btn-success action-btn ms-2"
                      onClick={handleSave}
                      type="button"
                    >
                      Save
                    </button>
                  )}
                </td>
              </tr>
            </table>
          </form>
        </div>
      )}
    </div>
  );
};

export default FunctionHall;

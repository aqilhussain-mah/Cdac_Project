import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./AppContext";
import "bootstrap/dist/css/bootstrap.min.css";

const FunctionHall = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { functionHallId, role, stateList } = useContext(AppContext);
  const [hallDetails, setHallDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [receivedState, setReceivedState] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    setFormData({ ...formData, state: e.target.value });
  };

  const handleSave = () => {
    // Prepare the updated data to be sent to the backend
    const updatedData = {
      hallId: formData.hallId,
      hallName: formData.name,
      location: formData.location,
      state: formData.state,
      admin: { id: formData.adminId },
    };

    // Send the data to backend to update
    fetch("http://localhost:3000/api/functionhalls/update", {
      method: "POST",
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
          // After successful update, fetch the updated hall details
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
    fetch(`http://localhost:3000/api/functionhalls/${functionHallId}/details`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setHallDetails(data);  // Update function hall details in state
          setFormData(data);      // Set the form data with the updated details
          setReceivedState(data.state); // Update received state
          setIsEditing(false);     // Exit edit mode
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
                      value={receivedState || "Not Available"}
                      disabled
                    />
                  )}
                </td>
              </tr>

              <tr>
                <td><strong>Function Hall Name</strong></td>
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
                      <button className="btn btn-primary action-btn" type="button">
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
                <td><strong>Admin:</strong></td>
                <td>
                  <input
                    type="text"
                    id="admin"
                    className="form-control"
                    name="admin"
                    value={formData.admin || ""}
                    onChange={handleChange}
                    disabled
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

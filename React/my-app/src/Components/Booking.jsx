import React, { useState } from "react";
import "./Booking.css"

const Booking = () => {
    const [selectedState, setSelectedState] = useState("");

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    return (
        <div className="booking-container">
            <div className="container-fluid">
                <div className="card">

                    <p>Welcome, <b>[Username] </b> We’re excited to help you find the perfect function hall!”
                        This makes the user feel acknowledged and engaged.
                    </p>
                    <p>
                        Please select a state from the options below to view available function halls in that location.
                        Once selected, you can explore the halls and proceed with booking based on your preferences.
                    </p>
                    <div className="state-drop">
                        <select
                            value={selectedState} onChange={handleStateChange} className={selectedState === "--Select State--" ? "gray-text" : ""} >
                            <option value="--Select State--" className="gray-text">--Select State--</option>
                            <option value="Andhra pradesh">Andhra pradesh</option>
                            <option value="Telengan">Telengan</option>
                        </select>
                    </div>
                    <div className="state-message">
                        {selectedState === "" || selectedState === "--Select State--"
                            ? <p className="info-text">Select a state in the dropdown above to get the function hall details.</p>
                            : <p className="info-text">Here is the list of halls from <b>{selectedState}</b>.</p>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Booking
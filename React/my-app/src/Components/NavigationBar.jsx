import React from "react"
import { NavLink } from "react-router-dom"
import "./NavigationBar.css"

const NavigationBar = () => {

    return (

        <div className="NavigationBar-container">
            <div className="container-fluid mb-5 mt-4">
                <div className="row">
                    <div className="col-9 d-flex justify-content-start">
                        <div className="me-4 ps-4">
                            <NavLink to="/Home" className="nav-link">
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
                                <i className="bi bi-people"></i>About
                            </NavLink>
                        </div>
                        <div className="me-4">
                            <NavLink to="/ContactUs" className="nav-link">
                                <i className="bi bi-envelope"></i>Contact
                            </NavLink>
                        </div>
                        <div className="me-4">
                            <NavLink to="/MyBooking" className="nav-link">
                            <i className="bi bi-journal-bookmark"></i> My Bookings
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-end order-last mr-2">
                        <NavLink to="/Profile" className="nav-link">
                            <i className="bi bi-person"></i> Profile
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NavigationBar
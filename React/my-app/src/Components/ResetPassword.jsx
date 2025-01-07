import { NavLink } from 'react-router-dom';
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";  // Import the eye icons
import "./ResetPassword.css";

const ResetPassword = () => {
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <div className="resetPassword-container">
            <div className="container-fluid">
                <form action="">
                    <h1>Reset Password</h1>
                    <div>
                        <label htmlFor="">USERNAME</label><br />
                        <input type="text" name="" id="" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="">CURRENT PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={currentPasswordVisible ? "text" : "password"}
                                name=""
                                id=""
                                placeholder="Enter your Password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                                aria-label={currentPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {currentPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">NEW PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={newPasswordVisible ? "text" : "password"}
                                name=""
                                id=""
                                placeholder="New Password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                aria-label={newPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">CONFIRM PASSWORD</label>
                        <div className="password-input-container">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name=""
                                id=""
                                placeholder="Confirm New Password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <NavLink to="/Login" className="nav-link" activeClassName="active">
                            Book Now
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

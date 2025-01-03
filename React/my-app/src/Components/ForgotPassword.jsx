import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ForgotPassword.css"

const ForgotPassword = () => {
    let [otpSent, setotpSent] = useState(false)
    let [otpVerified, setOtpVerified] = useState(false);
    const otpHandler = (e) => {
        e.preventDefault(); // Prevent form submission
        const enteredOtp = document.getElementById("otp").value; // Get the entered OTP
        if (enteredOtp === "1234") {
            setOtpVerified(true);
        } else {
            alert("Invalid OTP. Please try again.");
        }
    }

    let formcontext
    if (!otpSent) {
        formcontext = (
            <form action="">
                <h1>Forgot Password</h1>
                <div>
                    <label htmlFor="">USERNAME</label>
                    <input type="text" name="" id="" placeholder="Username" />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" onClick={() => setotpSent(true)} >Send otp</button>
                </div>
            </form>
        )
    }
    else {
        formcontext = (
            <form action="">
                <h2>Verify otp</h2>
                <div>
                    <label htmlFor="">Enter the OTP</label>
                    <input type="text" name="" id="otp" pattern="\d{4}" />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" onClick={otpHandler}>Verify</button>
                </div>
            </form>
        )
    }
    if (otpVerified) {
        formcontext = (
            <form action="">
                <h2>Change password</h2>
                <div>
                    <label htmlFor="">Change password </label>
                    <input type="text" name="" id="" placeholder="Enter New Password" />
                </div>
                <div>
                    <label htmlFor="">Confirm Password</label>
                    <input type="text" name="" id="" placeholder="Re-Enter the same password" />
                </div>
                <div className='d-flex justify-content-center'>
                    <NavLink to="/Login" className="nav-link" activeClassName="active">
                        Change
                    </NavLink>
                </div>
            </form>
        )
    }
    return (
        <div className="fpassword-container">
            <div className="container-fluid">
                {formcontext}
            </div>
        </div>
    )
}
export default ForgotPassword
import React, { useState } from "react";
import "./Login.css";
import UserRegister from "./UserRegister";
import ManagerRegister from "./ManagerRegister"

const Login = () => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [newRegister, setNewRegister] = useState(false);
    const [userResgister, setUserRegister] = useState(false);
    const [managerRegister, setManagerRegister] = useState(false);


    const otpSentHandler = () => {
        if (!email) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        setErrorMessage("");
        console.log(`OTP sent to: ${email}`);
        setOtpSent(true);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const verifyOtpHandler = () => {
        if (otp === "1234") {
            setOtpVerified(true);
            setErrorMessage("");
        } else {
            setErrorMessage("Invalid OTP. Please try again.");
        }
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const resetPasswordHandler = () => {
        if (newPassword === confirmPassword) {
            setErrorMessage("");
            alert("Password reset successfully!");
            window.location.reload();
        } else {
            setErrorMessage("Passwords do not match. Please try again.");
        }
    };

    let formContent;

    if (!isForgotPassword) {
        formContent = (
            <form action="">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1>Sign In</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>USERNAME</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="" id="" placeholder="Username" required />
                            </td>
                        </tr>
                        <tr>
                            <td>PASSWORD</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" name="" id="" placeholder="Password" required />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="c1">
                                    <button type="submit">Submit</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="reset-password" onClick={() => setIsResetPassword(true)}>Reset Password</button>
                                <button className="forgot-password" onClick={() => setIsForgotPassword(true)} > Forgot Password? </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className="new-register" onClick={() => setNewRegister(true)}>
                                        New users click here to register
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="d-flex justify-content-center">
                                    <i className="bi bi-hand-index" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    } else if (!otpSent) {
        formContent = (
            <form action="">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1>Forgot Password</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter your email address</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                {errorMessage && <span className="error-message">{errorMessage}</span>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="c1">
                                    <button type="button" onClick={otpSentHandler}>
                                        Send OTP
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    } else if (!otpVerified) {
        formContent = (
            <form action="">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1>Enter OTP</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter the OTP sent to your email</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" value={otp} onChange={handleOtpChange} placeholder="OTP" required />
                                {errorMessage && <span className="error-message">{errorMessage}</span>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="c1">
                                    <button type="button" onClick={verifyOtpHandler}>
                                        Verify OTP
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    } else {
        formContent = (
            <form action="">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1>Change Password</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>Enter New Password</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" value={newPassword} onChange={handlePasswordChange} placeholder="New Password" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Confirm New Password</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" required />
                                {errorMessage && <span className="error-message">{errorMessage}</span>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="c1">
                                    <button type="button" onClick={resetPasswordHandler}>
                                        Reset Password
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
    if (isResetPassword) {
        formContent = (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h1>Reset Password</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>Username</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="Username" required />
                            </td>
                        </tr>
                        <tr>
                            <td>Current Password</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="Current Password" required />
                            </td>
                        </tr>
                        <tr>
                            <td>New Password</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Confirm New Password</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                                {errorMessage && <span className="error-message">{errorMessage}</span>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="c1">
                                    <button type="button" onClick={resetPasswordHandler}>Reset Password</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    } else if (newRegister) {
        formContent = (
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="row">
                                    <div className="col">
                                        <button className="user-register" onClick={() => setUserRegister(true)}>User Registration</button>
                                    </div>
                                    <div className="col">
                                        <button className="manager-register" onClick={() => setManagerRegister(true)}>Manager Registration</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        )
    }
    if (userResgister) {
        return (<UserRegister />)
    }
    if (managerRegister) {
        return (<ManagerRegister />)
    }
    return (
        <div className="login-container">
            <div className="container-fluid">
                <div className="card">
                    <div className="row">
                        <div className="col-7">
                            <img src="frame.jpg" alt="" />
                        </div>
                        <div className="col-5">
                            {formContent}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

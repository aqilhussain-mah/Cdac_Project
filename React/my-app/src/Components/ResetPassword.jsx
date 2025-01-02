import React from "react";
import "./ResetPassword.css"

const ResetPassword = () => {
    return (
        <div className="resetPassword-container">
            <h1>Reset Password</h1>
            <form action="">
                <div>
                    <label htmlFor="">USERNAME</label><br />
                    <input type="text" placeholder="username" required/>
                </div>
                <div>
                    <label htmlFor="">CURRENT PASSWORD</label>
                    <input type="password" name="" id="" placeholder="Password" required/>
                </div>
                <div>
                    <label htmlFor="">NEW PASSWORD</label>
                    <input type="password" name="" id="" placeholder="New Password" required/>
                </div>
                <div>
                    <label htmlFor="">CONFIRM PASSWORD</label>
                    <input type="password" name="" id="" placeholder="Enter the same password" required/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit">Reset</button>
                </div>
            </form>
        </div>

    )
}

export default ResetPassword
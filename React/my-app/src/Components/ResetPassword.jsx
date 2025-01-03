import { NavLink } from 'react-router-dom';
import React from "react";
import "./ResetPassword.css"

const ResetPassword = () => {
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
                        <input type="text" name="" id="" placeholder="Enter your Password" />
                    </div>
                    <div>
                        <label htmlFor="">NEW PASSWORD</label>
                        <input type="text" name="" id="" placeholder="New Password" />
                    </div>
                    <div>
                        <label htmlFor="">CONFIRM PASSWORD</label>
                        <input type="text" name="" id="" placeholder="Confirm New Password" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <NavLink to="/Login" className="nav-link" activeClassName="active">
                            Book Now
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
import React from "react";
import "./SignIn.css"
import { NavLink } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="signin-container">
            <div className="container-fluid">
                <form action="">
                    <h1>Sign In</h1>
                    <div>
                        <label htmlFor="">USERNAME</label><br />
                        <input type="text" name="" id="" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="">PASSWORD</label><br />
                        <input type="password" name="" id="" placeholder="Password" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit">Sign In</button>
                    </div>
                    <div className="row ">
                        <div className="col d-flex justify-content-start">
                            <NavLink to="ResetPassword" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Reset password
                            </NavLink>
                        </div>
                        <div className="col d-flex justify-content-end text-end">
                            <NavLink to="ForgotPassword" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                Forgot password
                            </NavLink>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <NavLink to="Register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <h5>New user register here</h5>
                        </NavLink>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i className="bi bi-hand-index" />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignIn
import React from "react";
import "./SignIn.css"
import { NavLink } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="signin-container">
            <div className="constainer-fluid">
                <form action="">
                    <h1>Sign In</h1>
                    <div>
                        <label htmlFor="">USERNAME</label><br />
                        <input type="text" name="" id="" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="">PASSWORD</label><br />
                        <input type="text" name="" id="" placeholder="Password" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit">Sign In</button>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-left">
                            Reset password
                        </div>
                        <div className="col d-flex justify-content-end">
                            <NavLink to="/forgotpassword" className="nav-link" activeClassName="active">
                                Forgot password
                            </NavLink>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <h5>New user register here</h5>
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
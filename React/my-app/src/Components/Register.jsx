import React from "react";
import { NavLink } from "react-router-dom"

const Register = () => {
    return (
        <div className="conatiner-fluid">
            <div className="row">
                <div className="col">
                    <NavLink to="/userregister" className="nav-link">
                        User Register click here
                    </NavLink>
                </div>
                <div className="col text-end">
                    <NavLink to="/managerregister" className="nav-link">
                        Manager Register click here
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                    <i className="bi bi-hand-index" />
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <i className="bi bi-hand-index" />
                </div>
            </div>
        </div>
    )
}

export default Register
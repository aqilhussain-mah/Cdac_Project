import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminRegistrationForm = () => {

  const [newpass, setNewPass] = useState("");
  const [connewpass, setconnewPass] = useState("")

  const handlePassword = (event) => {
    setNewPass(event.target.value);
  }
  const handleConPassword = (event) => {
    setconnewPass(event.target.value);
  }

  const handleBothPass = () => {
    if (newpass === connewpass) {

    }
    else {
      alert("Both Password Should Match!!")
    }
  }

  return (
    <div className="container mb-5 d-flex justify-content-center align-items-center ">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <form className="needs-validation" noValidate onSubmit={handleBothPass}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip01">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationTooltip01"
                    placeholder="First name"
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip02">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationTooltip02"
                    placeholder="Last name"
                    required
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip03">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="validationTooltip03"
                    placeholder="Email"
                    required
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip03">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationTooltip03"
                    placeholder="Mobile Number"
                    pattern="^[0-9]{10}$" // Regular expression to ensure 10 digits
                    maxLength={10} // Restrict the length to 10 digits
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid 10-digit mobile number.
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip03">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationTooltip03"
                    onChange={handlePassword}
                    placeholder="Password"
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="validationTooltip03">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationTooltip03"
                    onChange={handleConPassword}
                    placeholder="Confirm Password"
                    required
                  />

                </div>


              </div>
              <div className="d-flex justify-content-center align-items-center mt-3">
                <button className="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationForm;

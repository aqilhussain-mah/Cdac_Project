import React, { useState } from "react";

const UserRegistration = () => {

  const [newpass, setnewPass] = useState("");
  const [connewpass, setconnewPass] = useState("");

  const handleNewPass = (event) => {
    setnewPass(event.target.value)
  }


  const handleConNewPass = (event) => {
    setconnewPass(event.target.value)
  }

  const handlePassword = () => {
    if (newpass === connewpass) {
      // alert("Password Reset Successfully")
      window.location.reload();
    }
    else {
      alert("Both the Password Should be match!!")
    }
  }

  return (
    <div className='container mb-5 d-flex justify-content-center align-items-center'>
      <div className='col-md-8'>
        <div className="card">
          <div className="card-body">
            <form className="needs-validation" noValidate onSubmit={handlePassword}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fname">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="First name"
                    required
                  ></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lname">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Last name"
                    required
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                  ></input>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="mob-no">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mob-no"
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
                  <label htmlFor="pass">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="pass"
                    onChange={handleNewPass}
                    placeholder="Password"
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="cpass">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpass"
                    onChange={handleConNewPass}
                    placeholder="Confirm Password"
                    required
                  />

                </div>


              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <button className="btn btn-primary" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration

import React, { useState } from "react";
import "./ForgotPassword.css"

const ForgotPassword = () =>{
    let[otpHandler,setotpHandler]=useState(false)

    let formcontext
    if(!otpHandler){
        formcontext = (
            <form action="">
                <h1>Forgot Password</h1>
                <div>
                    <label htmlFor="">USERNAME</label>
                    <input type="text" name="" id="" placeholder="Username"/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit"  onClick={() => setotpHandler(true)} >Send otp</button>
                </div>
            </form>
        )
    }
    else{
        formcontext=(
            <form action="">
                <h2>Verify otp</h2>
                <div>
                    <label htmlFor="">Enter the OTP</label>
                    <input type="text" name="" id="" pattern="\d{4}"/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit">Verify</button>
                </div>
            </form>
        )
    }
    return(
        <div className="fpassword-container">
            <div className="container-fluid">
                {formcontext}
            </div>
        </div>
    )
}
 export default ForgotPassword
import React, { useState } from "react";
import { Navigate } from "react-router";
import GoogleSignIn from "./GoogleSignIn";
import "./Login.css";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [errorDirect, setErrorDirect] = useState(false);

  const callbackFunction = (childData) => {
    setRedirect(childData.redirect);
    setErrorDirect(childData.errorDirect);
  };

  return (
    <div>
      {redirect ? <Navigate to="/dashboard" /> : null}
      <div className="login">
        <div className="card-login">
          <h5 className="card-title-login">Welcome</h5>
          <p className="card-text-login">
            Hello there! Sign in and start managing your objectives
          </p>
          <GoogleSignIn parentCallback={callbackFunction} />
          <p className="quote-login">
            "A Goal without a plan is only a dream."
            <p>-Abhishek Ghosh</p>
          </p>
        </div>
      </div>
    </div>
  );
}

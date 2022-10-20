import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
// import { GoogleLogout } from "react-google-login";
import OBJECTIVES from "../../Assets/OBJECTIVES.png";
import OBJECTIVESHIGHLIGHTED from "../../Assets/OBJECTIVESHIGHLIGHTED.png";
import "./Navigation.css";

export default function Navigation() {
  const [redirect, setRedirect] = useState(false);
  const [errorDirect, setErrorDirect] = useState(false);
  const [statusToDirect, setStatusToDirect] = useState(false);

  const signOut = () => {
    localStorage.clear();
    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Navigate to="/" />;
    }
  };

  return (
    <div className={"navigation-header"}>
      <div className="navigation-header-nav">
        <div className="navigation-header-text">
          <img
            className="profile-pic"
            src={localStorage.getItem("profile")}
            alt=""
          />
          &emsp;
          {localStorage.getItem("name")}
          <h7 className="navigation-line">|</h7>
          {renderRedirect()}
          <button className="logout button-focus" onClick={signOut}>
            <span>
              <i className="fas fa-sign-out-alt"></i>
            </span>
          </button>
        </div>
      </div>
      <div className={"navigation-header-shadow"}> </div>
    </div>
  );
}

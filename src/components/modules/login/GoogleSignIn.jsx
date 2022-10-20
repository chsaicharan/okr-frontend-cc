import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl, getToken } from "../../services/constants";
import "./Login.css";

export default function GoogleSignIn(props) {
  const { parentCallback } = props;

  function handleCallback(response) {
    let headerss = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: response.credential,
    };
    axios
      .post(`${baseUrl}/login`, {}, { headers: headerss })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("name", res.data.userName);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("profile", res.data.profilePic);
        getToken.setToken(res.data.accessToken);
        sendData(true, false);
      })
      .catch((err) => {
        sendData(false, true);
      });
  }

  function sendData(redirect, errorDirect) {
    parentCallback({ redirect, errorDirect });
  }

  function handleSignOut() {}

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "289910498353-7cl876qt96g649c0i23l0l23ifeio4q5.apps.googleusercontent.com",
      callback: (response) => {
        handleCallback(response);
      },
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "filled_blue", size: "large", type: "standard" }
    );
  }, []);

  return (
    <div>
      <div className="login_button">
        <div id="google-signin-button"></div>
      </div>
    </div>
  );
}

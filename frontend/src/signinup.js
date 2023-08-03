import React, { useState, useEffect } from "react";
import * as Components from "./Components";
import { Link } from "react-router-dom";
import axios from "axios";
import "./homepage.css";

function Signinup() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/user");

      // You can handle the response here, e.g., display a success message or redirect the user to the home page.
      console.log("Sign Up Successful!", response);
      return response
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("your-backend-endpoint-for-signup", {
        email,
        password,
      });

      // You can handle the response here, e.g., display a success message or redirect the user to the home page.
      console.log("Sign In Successful!", response);
      return response
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // useEffect to clear email and password on component mount
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [signIn]);

  return (
    <div className="Wrapper">
      <div className="circle">A</div>
      <div className="container">
        <div className="head">
          <div className="nothing"></div>
          <div className="title">
            <div className="smallTitle">Our restaurants</div>
            <div className="bigTitle">RESTAURANTS</div>
          </div>
        </div>

        {signIn ? (
          <div className="first">
            <div className="rest">
              <Components.Form>
                <Components.Title>Create Account</Components.Title>
                <Components.Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Components.Button onClick={handleSignUp}>
                  Sign Up
                </Components.Button>
              </Components.Form>
            </div>
          </div>
        ) : (
          <div className="first">
            <div className="rest">
              <Components.Form>
                <Components.Title>Sign in</Components.Title>
                <Components.Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Components.Button onClick={handleSignIn}>
                  Sign In
                </Components.Button>
              </Components.Form>
            </div>
          </div>
        )}

        <div className="first">
          <div className="rest">
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  We are glad to have you back!
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>Welcome to KuKes!</Components.Title>
                <Components.Paragraph>
                  We are excited to go with you on your new journey of
                  experiencing savory dishes!
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signinup;

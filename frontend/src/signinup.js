import React, { Component } from "react";
import * as Components from "./Components";
import { Link } from "react-router-dom";

function Signinup() {
  const [signIn, toggle] = React.useState(true);
  return (
    <Components.Wrapper>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />

            <Link to="/Home">
              <Components.Button>Sign Up</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Link to="/Home">
              <Components.Button>Sign In</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
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
        </Components.OverlayContainer>
      </Components.Container>
    </Components.Wrapper>
  );
}

export default Signinup;

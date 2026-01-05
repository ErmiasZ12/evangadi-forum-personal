import React from "react";
import SignIn from "../components/SignIn/SignIn";
import About from "../components/SignUpSignIn/About/About";
import "./Login.css";

const Login = () => {
  return (
    <main className="login-page">
      <div className="login-content">
        <SignIn />

        <div className="about-wrapper">
          <div className="bg-shape"></div>
          <div className="about-content">
            <About />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

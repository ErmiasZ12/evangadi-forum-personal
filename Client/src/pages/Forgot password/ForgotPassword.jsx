import React, { useState } from "react";
import axiosBase from "../../axiosConfig";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosBase.post("/users/forgot-password", { email });
      setMessage("Password reset link sent to your email");
    } catch (error) {
      setMessage("Email not found");
    }
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.loginCard}>
          <h2>Forgot Password</h2>

          {message && (
            <p
              className={
                message === "Email not found" ? styles.error : styles.success
              }
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className={styles.submitBtn}>
              Send Reset Link
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        &copy; 2026 My Website. All rights reserved.
      </footer>
    </>
  );
};

export default ForgotPassword;

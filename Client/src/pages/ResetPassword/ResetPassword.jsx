import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await instance.post(`/users/reset-password/${token}`, {
        password,
      });

      setMessage("Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Invalid or expired token");
    }
  };

  return (
    <div className="login-card">
      <h2>Reset Password</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-btn" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

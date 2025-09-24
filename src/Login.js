import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch("http://localhost:8081/api/insuredpersons/login"
        const response = await fetch("https://insuredperson-api-458668609912.us-central1.run.app/api/insuredpersons/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        setMessage("Login successful");
        navigate("/home/welcome");
      } else {
        setMessage(data.message || "Login failed, please check your credentials.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="brand">PCM Insurance Ltd.</h1>
        <h3 className="title">Login</h3>

        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn primary">
            Login
          </button>
          <button type="button" className="btn secondary" onClick={handleForgotPassword}>
            Forgot Password?
          </button>
        </div>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

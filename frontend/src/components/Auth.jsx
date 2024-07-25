import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeForm, setActiveForm] = useState("register");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${activeForm}`,
        {
          email,
          password,
        }
      );
      const data = res.data;
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        window.location.reload();
      } else {
        alert(`${data.message}`);
      }
    } catch (err) {
      alert(`${err.response.data.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-section">
      <h1>My Notes</h1>
      <div id="auth-forms">
        {activeForm === "register" ? (
          <form id="register-form" onSubmit={onSubmit}>
            <h2>Register</h2>
            <input
              type="email"
              id="register-username"
              placeholder="Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="register-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading} id="register-btn">
              {loading ? "Registering..." : "Register"}
            </button>

            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setPassword("");
                  setEmail("");
                  setActiveForm("login");
                }}
              >
                Login
              </span>
            </p>
          </form>
        ) : (
          <form id="login-form" onSubmit={onSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              id="login-username"
              placeholder="Username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading} id="login-btn">
              {loading ? "Logging..." : "Login"}
            </button>
            <p>
              Don't have an account?
              <span
                onClick={() => {
                  setPassword("");
                  setEmail("");
                  setActiveForm("register");
                }}
              >
                {" "}
                Register
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;

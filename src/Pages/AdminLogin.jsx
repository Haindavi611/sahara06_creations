import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = login(form.username, form.password);
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 600);
  };
  return (
    <div className="admin-login-page">
      {" "}
      <div className="admin-login-card">
        {" "}
        <div className="admin-login-logo">
          {" "}
          <span>🛡️</span>{" "}
        </div>{" "}
        <h1>Admin Portal</h1> <p>Sahara06_Creations — Secure Access</p>{" "}
        <form onSubmit={handleSubmit} className="admin-login-form">
          {" "}
          <div className="admin-field">
            {" "}
            <label>Username</label>{" "}
            <div className="admin-input-wrap">
              {" "}
              <FaUser className="admin-input-icon" />{" "}
              <input
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                autoComplete="username"
                required
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="admin-field">
            {" "}
            <label>Password</label>{" "}
            <div className="admin-input-wrap">
              {" "}
              <FaLock className="admin-input-icon" />{" "}
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                autoComplete="current-password"
                required
              />{" "}
              <button
                type="button"
                className="admin-eye-btn"
                onClick={() => setShowPass((s) => !s)}
                tabIndex={-1}
              >
                {" "}
                {showPass ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {error && <div className="admin-error">{error}</div>}{" "}
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {" "}
            {loading ? "Signing in…" : "Sign In"}{" "}
          </button>{" "}
        </form>{" "}
        <a href="/" className="admin-back-link">
          ← Back to Website
        </a>{" "}
      </div>{" "}
    </div>
  );
}

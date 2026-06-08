// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleForgot = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Check your email for a reset link!");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, try again later");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">

        <div className="top">
          <h3>Capstone</h3>
        </div>

        <h1>Recover Password</h1>
        <p>Enter your email and we'll send you a reset link</p>

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Wealth@gmail.com"
          onChange={handleChange}
        />

        {message && <p style={{ color: "green", fontSize: "13px" }}>{message}</p>}
        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        <button className="mainBtn" onClick={handleForgot} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p>
          Remember your password?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;

import { useState } from "react";
import { forgotPassword} from "./api"
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
    const response = await forgotPassword(form.email);
    setMessage(response.data?.message || "Reset link sent! Check your email.");
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};
      
  return (
    <div className="container">
      <div className="card">

        <div className="top">
          <h3>Trovr</h3>
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

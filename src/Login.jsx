import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); 
        navigate("/");  
      } else {
        setError(data.message || "Login failed"); 
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

        <h1>Login</h1>
        <p>Enter your details to access and manage your listing</p>

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Wealth1010"
          onChange={handleChange}
        />

        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        <span
          className="link"
          onClick={() => navigate("/forgot-password")}
        >
          Recover Password
        </span>
        <br />

        <button
          className="mainBtn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Got no account yet?{" "}
          <span className="link" onClick={() => navigate("/signup")}>
            Sign-up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;


  

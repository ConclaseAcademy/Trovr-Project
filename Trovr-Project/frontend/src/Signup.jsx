import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://104.211.22.120/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
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
          <h3>Trovr</h3>
        </div>

        <h1>Sign-up</h1>
        <p>Enter your details to create an account with us</p>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <label>Contact</label>
        <input
          type="text"
          name="contact"
          placeholder="09134671010"
          onChange={handleChange}
        />

        <label>School Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Wealth@gmail.com"
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

        <button
          className="mainBtn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;

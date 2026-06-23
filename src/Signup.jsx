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
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.top}>
          <span style={styles.backBtn} onClick={() => navigate(-1)}>&#8592;</span>
          <span style={styles.brand}>Trovr</span>
        </div>

        <h1 style={styles.title}>Sign-up</h1>
        <p style={styles.subtitle}>Enter your details to create an account with us</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Full Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Wealth Happiness"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Contact</label>
          <input
            type="text"
            name="contact"
            placeholder="09134671010"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            School Email Address <span style={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Wealth@gmail.com"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Password <span style={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Wealth1010"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <span style={styles.switchLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "36px 32px",
    width: "420px",
    maxWidth: "90vw",
    boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  backBtn: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e3a8a",
    fontFamily: "Georgia, serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#111",
    fontFamily: "Georgia, serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#555",
    marginBottom: "6px",
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "12px",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "13px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "16px",
  },
  switchText: {
    fontSize: "13px",
    color: "#555",
  },
  switchLink: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "#111",
    fontWeight: "500",
  },
};

export default Signup;

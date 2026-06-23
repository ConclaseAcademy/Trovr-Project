import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useStore from "./store";

function Login() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    axios.post("http://104.211.22.120:5000/api/auth/login", { email, password })
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setUser(response.data.user, response.data.token);
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.error(response.data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data?.message || "An error occurred. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.top}>
          <span style={styles.backBtn} onClick={() => navigate(-1)}>&#8592;</span>
          <span style={styles.brand}>Trovr</span>
        </div>

        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>Enter your details to access and manage your listings</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            School Email Address <span style={styles.required}>*</span>
          </label>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="Wealth@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Password <span style={styles.required}>*</span>
          </label>
          <input
            name="passsword"
            type="password"
            value={password}
            placeholder="Wealth1010"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <p style={styles.recover} onClick={() => navigate("/ForgotPassword")}>
          Recover Password
        </p>

        <button
          style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.switchText}>
          Got no account yet?{" "}
          <span style={styles.switchLink} onClick={() => navigate("/signup")}>
            Sign-up
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
  recover: {
    color: "#c9a84c",
    fontSize: "13px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "500",
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

export default Login;

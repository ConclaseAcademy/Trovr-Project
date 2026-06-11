import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ type, onClose }) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(type);
  const [form, setForm] = useState({
    name: "", contact: "", email: "", password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const isLogin = modal === "login";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, contact: form.contact, email: form.email, password: form.password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          onClose();       
          navigate("/");   
        } else {
          onClose();
          navigate("/login"); 
        }
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, try again later");
    }
    setLoading(false);
  };

  return (
    <div onClick={onClose} style={styles.backdrop}>
      <div onClick={(e) => e.stopPropagation()} style={styles.modal}>

        <button onClick={onClose} style={styles.closeBtn}>✕</button>

        <h2 style={styles.title}>{isLogin ? "Login" : "Sign-up"}</h2>
        <p style={styles.subtitle}>
          {isLogin
            ? "Enter your detail to access and manage your listings"
            : "Enter your details to create an account with us"}
        </p>

        {!isLogin && (
          <>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Full Name <span style={styles.required}>*</span></label>
              <input name="name" placeholder="Wealth Happiness"
                onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Contact</label>
              <input name="contact" placeholder="09134671010"
                onChange={handleChange} style={styles.input} />
            </div>
          </>
        )}

        <div style={styles.fieldGroup}>
          <label style={styles.label}>School Email Address <span style={styles.required}>*</span></label>
          <input name="email" placeholder="Wealth@gmail.com"
            onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password <span style={styles.required}>*</span></label>
          <input name="password" type="password" placeholder="Wealth1010"
            onChange={handleChange} style={styles.input} />
        </div>

        
        {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

        {isLogin && (
          <p style={styles.recover}>Recover Password</p>
        )}

        <button
          style={styles.submitBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
        </button>

        <p style={styles.switchText}>
          {isLogin ? "Got no account yet? - " : "Already have an account? - "}
          <span
            onClick={() => { setModal(isLogin ? "signup" : "login"); setError(""); }}
            style={styles.switchLink}
          >
            {isLogin ? "Sign-up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed", inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(5px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "36px 32px",
    width: "420px",
    maxWidth: "90vw",
    position: "relative",
    boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
  },
  closeBtn: {
    position: "absolute", top: "16px", right: "16px",
    background: "none", border: "none",
    fontSize: "18px", cursor: "pointer", color: "#999",
  },
  title: {
    fontSize: "28px", fontWeight: "700",
    marginBottom: "6px", color: "#111",
    fontFamily: "Georgia, serif",
  },
  subtitle: {
    fontSize: "14px", color: "#666",
    marginBottom: "24px", lineHeight: "1.5",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block", fontSize: "12px",
    color: "#555", marginBottom: "6px",
  },
  required: { color: "red" },
  input: {
    width: "100%", padding: "12px 14px",
    borderRadius: "8px", border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5", fontSize: "14px",
    boxSizing: "border-box", outline: "none",
  },
  recover: {
    color: "#c9a84c",
    fontSize: "13px", cursor: "pointer",
    marginBottom: "20px", fontWeight: "500",
  },
  submitBtn: {
    backgroundColor: "#1e3a8a",
    color: "#fff", border: "none",
    borderRadius: "8px", padding: "12px 28px",
    fontSize: "15px", fontWeight: "600",
    cursor: "pointer", marginBottom: "16px",
    display: "block",
  },
  switchText: {
    fontSize: "13px", color: "#555",
  },
  switchLink: {
    textDecoration: "underline",
    cursor: "pointer", color: "#111", fontWeight: "500",
  },
};

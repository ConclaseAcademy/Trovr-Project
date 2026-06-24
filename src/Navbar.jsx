import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "./store";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, setUser, setToken } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const url = isLogin
      ? "http://104.211.22.120:5000/api/auth/login"
      : "http://104.211.22.120:5000/api/auth/register";

    const body = isLogin
      ? { email: form.email, password: form.password }
      : { fullName: form.fullName, email: form.email, password: form.password };

    axios.post(url, body)
      .then((response) => {
        toast.success(isLogin ? "You signed in successfully" : "Account created!");
        
       
        const userData = response.data?.user || response.data?.data?.user || response.data;
        const tokenData = response.data?.accessToken || response.data?.token || response.data?.data?.token;

        if (userData) setUser(userData);
        if (tokenData) {
          setToken(tokenData);
          localStorage.setItem("token", tokenData);
          localStorage.setItem("accessToken", tokenData);
        }

        setForm({ fullName: "", email: "", password: "" });
        navigate("/Marketplace");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      
      <nav style={styles.nav}>
        <span style={styles.navLogo} onClick={() => navigate("/")}>CapStone</span>
        <div style={styles.navBtns}>
          {user ? (
            <>
              <button style={styles.textLinkBtn} onClick={() => navigate("/create-listing")}>Create Listing</button>
              
              <div style={styles.msgBadgeContainer} onClick={() => navigate("/conversations")}>
                <span style={styles.textLinkBtn}>Messages</span>
                <span style={styles.badge}>•</span>
              </div>

              <div style={styles.avatar} onClick={() => navigate("/dashboard")}>
                {user.fullName ? user.fullName[0].toUpperCase() : "U"}
              </div>

              <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* Quick toggle headers built right into the top banner */}
              <button style={isLogin ? styles.signupBtn : styles.loginBtn} onClick={() => setIsLogin(false)}>Sign up</button>
              <button style={isLogin ? styles.loginBtn : styles.signupBtn} onClick={() => setIsLogin(true)}>Log in</button>
            </>
          )}
        </div>
      </nav>

      
      {!user && (
        <div style={styles.authBlockContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.title}>{isLogin ? "Login" : "Sign Up"}</h2>

            {!isLogin && (
              <input
                style={styles.input}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
              />
            )}
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button style={styles.submitBtn} onClick={handleSubmit}>
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p style={styles.toggle}>
              {isLogin ? "No account yet? " : "Already have an account? "}
              <span style={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "14px 32px",
    backgroundColor: "#fff", borderBottom: "1px solid #eee",
  },
  navLogo: { color: "#333", fontWeight: "bold", fontSize: "18px", cursor: "pointer" },
  navBtns: { display: "flex", gap: "16px", alignItems: "center" },
  textLinkBtn: {
    background: "none", border: "none", color: "#333",
    fontSize: "14px", fontWeight: "500", cursor: "pointer"
  },
  msgBadgeContainer: {
    display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", position: "relative"
  },
  badge: {
    color: "#ff3b30", fontSize: "20px", lineHeight: "0", marginTop: "-4px"
  },
  avatar: {
    width: "32px", height: "32px", borderRadius: "50%",
    backgroundColor: "#007bff", color: "#fff", display: "flex",
    alignItems: "center", justifyContent: "center", fontWeight: "bold",
    fontSize: "14px", cursor: "pointer"
  },
  signupBtn: {
    padding: "8px 16px", borderRadius: "20px",
    border: "1px solid #007bff", backgroundColor: "#fff",
    color: "#007bff", cursor: "pointer", fontSize: "14px"
  },
  loginBtn: {
    padding: "8px 16px", borderRadius: "20px",
    backgroundColor: "#007bff", color: "#fff",
    border: "none", cursor: "pointer", fontSize: "14px"
  },
  logoutBtn: {
    padding: "6px 12px", borderRadius: "6px",
    backgroundColor: "#f44336", color: "#fff",
    border: "none", cursor: "pointer", fontSize: "12px"
  },
 
  authBlockContainer: {
    width: "100%",
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    padding: "40px 0"
  },
  authCard: {
    backgroundColor: "#fff", 
    borderRadius: "12px",
    padding: "32px", 
    width: "90%", 
    maxWidth: "400px",
    border: "1px solid #eee",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  },
  title: { fontSize: "22px", fontWeight: "700", marginBottom: "20px" },
  input: {
    width: "100%", padding: "10px 14px",
    borderRadius: "8px", border: "1px solid #ddd",
    marginBottom: "12px", fontSize: "14px",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%", padding: "12px",
    backgroundColor: "#007bff", color: "#fff",
    border: "none", borderRadius: "8px",
    fontSize: "15px", cursor: "pointer", marginBottom: "12px",
  },
  toggle: { textAlign: "center", fontSize: "13px", color: "#666" },
  toggleLink: { color: "#007bff", cursor: "pointer", fontWeight: "600" },
};

export default Navbar;
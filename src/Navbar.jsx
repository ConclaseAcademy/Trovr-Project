import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "./store";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, setUser, setToken } = useStore();
  const [showModal, setShowModal] = useState(false);
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
        setUser(response.data.user);
        setToken(response.data.accessToken);
        setShowModal(false);
        navigate("/Marketplace");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.logo} onClick={() => navigate("/")}>Trovr</span>
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
              <button style={styles.signupBtn} onClick={() => { setIsLogin(false); setShowModal(true); }}>Sign up</button>
              <button style={styles.loginBtn} onClick={() => { setIsLogin(true); setShowModal(true); }}>Log in</button>
            </>
          )}
        </div>
      </nav>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
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
  logo: { color: "#333", fontWeight: "bold", fontSize: "18px", cursor: "pointer" },
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
  overlay: {
    position: "fixed", top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff", borderRadius: "12px",
    padding: "32px", width: "90%", maxWidth: "400px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute", top: "12px", right: "12px",
    background: "none", border: "none", fontSize: "18px", cursor: "pointer",
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
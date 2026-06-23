import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <span style={{ ...styles.logo, cursor: "pointer" }} onClick={() => navigate("/")}>
        Trovr
      </span>
      <div style={styles.navBtns}>
        <button style={styles.signupBtn} onClick={() => navigate("/signup")}>
          Sign-up
        </button>
        <button style={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    backgroundColor: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 1px 12px rgba(0,0,0,0.08)",
  },
  logo: {
    color: "#1e3a8a",
    fontWeight: "800",
    fontSize: "22px",
    fontFamily: "Georgia, serif",
    letterSpacing: "-0.5px",
  },
  navBtns: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  signupBtn: {
    padding: "9px 22px",
    borderRadius: "22px",
    border: "1.5px solid #1e3a8a",
    background: "transparent",
    color: "#1e3a8a",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  loginBtn: {
    padding: "9px 22px",
    borderRadius: "22px",
    border: "none",
    background: "#1e3a8a",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default Navbar;

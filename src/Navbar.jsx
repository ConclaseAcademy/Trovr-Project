import { useNavigate } from "react-router-dom";
import useStore from "./store";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.logo} onClick={() => navigate("/")}>Trovr</span>
      <div style={styles.navBtns}>
        {user ? (
          <>
            <button style={styles.loginBtn} onClick={() => navigate("/marketplace")}>Browse Listing</button>
            <button style={styles.loginBtn} onClick={() => navigate("/dashboard")}>My Listing</button>
            <button style={styles.signupBtn} onClick={() => navigate("/create-listing")}>Create Listing</button>
            <button style={styles.loginBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button style={styles.signupBtn} onClick={() => navigate("/signup")}>Sign-up</button>
            <button style={styles.loginBtn} onClick={() => navigate("/login")}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "18px 40px",
    backgroundColor: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 1px 12px rgba(0,0,0,0.08)",
  },
  logo: { color: "#1e3a8a", fontWeight: "800", fontSize: "22px", cursor: "pointer" },
  navBtns: { display: "flex", gap: "12px", alignItems: "center" },
  signupBtn: {
    padding: "9px 22px", borderRadius: "22px",
    border: "1.5px solid #1e3a8a", background: "transparent",
    color: "#1e3a8a", cursor: "pointer", fontSize: "14px", fontWeight: "600",
  },
  loginBtn: {
    padding: "9px 22px", borderRadius: "22px",
    border: "none", background: "#1e3a8a",
    color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600",
  },
};

export default Navbar;
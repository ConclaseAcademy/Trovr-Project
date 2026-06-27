import { useNavigate, useLocation } from "react-router-dom";
import useStore from "./store";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <span style={styles.logo} onClick={() => navigate("/Marketplace")}>Trovr</span>
      <div style={styles.navBtns}>
        {user ? (
          <>
            <button style={isActive("/Marketplace") ? styles.activeBtn : styles.ghostBtn} onClick={() => navigate("/Marketplace")}>Browse Listing</button>
            <button style={isActive("/dashboard") ? styles.activeBtn : styles.ghostBtn} onClick={() => navigate("/dashboard")}>My Listing</button>
            <button style={isActive("/create-listing")? styles.activeBtn : styles.ghostBtn} onClick={() => navigate("/create-listing")}>+ Create Listing</button>
            <button style={isActive("/conversations")? styles.activeBtn : styles.iconBtn}onClick={() => navigate("/conversations")}>💬</button>
            <button style={styles.ghostBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button style={styles.ghostBtn} onClick={() => navigate("/signup")}>Sign-up</button>
            <button style={styles.activeBtn} onClick={() => navigate("/login")}>Login</button>
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
  activeBtn: {
    padding: "9px 22px", borderRadius: "22px",
    border: "none", background: "#1e3a8a",
    color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "600",
  },
  ghostBtn: {
    padding: "9px 22px", borderRadius: "22px",
    border: "1.5px solid #1e3a8a", background: "transparent",
    color: "#1e3a8a", cursor: "pointer", fontSize: "14px", fontWeight: "600",
  },
  iconBtn: {
  width: "38px", height: "38px", borderRadius: "50%",
  border: "1.5px solid #1e3a8a", background: "transparent",
    color: "#1e3a8a", cursor: "pointer", fontSize: "16px", 
},
};

export default Navbar;
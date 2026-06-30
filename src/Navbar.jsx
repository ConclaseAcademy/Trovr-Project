import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useStore from "./store";
import { getUnreadCount } from "./api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!user) return;

    getUnreadCount()
      .then((response) => {
        setUnreadCount(response.data.unreadCount);
      })
      .catch(() => {});
  }, [user]);

  return (
    <nav style={styles.nav}>
      <style>{`
        .navbar-links { display: flex; gap: 12px; align-items: center; }
        .navbar-hamburger { display: none; }
        @media (max-width: 768px) {
          .navbar-links {
            display: none;
            position: absolute;
            top: 64px;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            background: white;
            padding: 16px 20px;
            gap: 10px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.08);
          }
          .navbar-links.open { display: flex; }
          .navbar-links button { width: 100%; }
          .navbar-hamburger { display: block; }
        }
      `}</style>

      <span style={styles.logo} onClick={() => go("/Marketplace")}>Trovr</span>

      <button
        className="navbar-hamburger"
        style={styles.hamburgerBtn}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`navbar-links${menuOpen ? " open" : ""}`}>
        {user ? (
          <>
            <button style={isActive("/Marketplace") ? styles.activeBtn : styles.ghostBtn} onClick={() => go("/Marketplace")}>Browse Listing</button>
            <button style={isActive("/dashboard") ? styles.activeBtn : styles.ghostBtn} onClick={() => go("/dashboard")}>My Listing</button>
            <button style={isActive("/create-listing") ? styles.activeBtn : styles.ghostBtn} onClick={() => go("/create-listing")}>+ Create Listing</button>

            <div style={{ position: "relative", display: "inline-block" }}>
              <button style={isActive("/conversations") ? styles.activeBtn : styles.iconBtn} onClick={() => go("/conversations")}>💬 Messages</button>
              {unreadCount > 0 && <span style={styles.unreadDot} />}
            </div>

            <button style={styles.ghostBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button style={styles.ghostBtn} onClick={() => go("/signup")}>Sign-up</button>
            <button style={styles.activeBtn} onClick={() => go("/login")}>Login</button>
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
  hamburgerBtn: {
    border: "none", background: "transparent",
    fontSize: "24px", color: "#1e3a8a", cursor: "pointer",
  },
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
    padding: "9px 22px", borderRadius: "22px",
    border: "1.5px solid #1e3a8a", background: "transparent",
    color: "#1e3a8a", cursor: "pointer", fontSize: "14px", fontWeight: "600",
  },
  unreadDot: {
    position: "absolute", top: "-2px", right: "-2px",
    width: "10px", height: "10px", borderRadius: "50%",
    backgroundColor: "#ef4444", border: "2px solid white",
  },
};

export default Navbar;
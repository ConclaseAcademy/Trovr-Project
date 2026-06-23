import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyListings } from "./api";

function Dashboard() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
    return;
  }

  getMyListings()
    .then((data) => {
      setListings(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);

if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;
if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={styles.page}>

      <nav style={styles.nav}>
        <span style={styles.logo}>Trovr</span>
        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => navigate("/marketplace")}>
            🏪 Browse Listing
          </span>
          <span style={styles.navLink} onClick={() => navigate("/dashboard")}>
            📋 My Listing
          </span>
          <span style={styles.navLink} onClick={() => navigate("/")}>
            🚪 Logout
          </span>
          <button style={styles.createBtn} onClick={() => navigate("/create-listing")}>
            + Create Listing
          </button>
          <div style={styles.avatar}>💬</div>
        </div>
      </nav>

      <div style={styles.container}>
        <h2 style={styles.heading}>My Listing Dashboard</h2>
        <p style={styles.subtitle}>Manage and update your listings here</p>

        {listings.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🗂️</div>
            <p style={styles.emptyTitle}>No listing created yet</p>
            <p style={styles.emptySubtitle}>Create your first listing to get started</p>
            <button
              style={styles.listBtn}
              onClick={() => navigate("/create-listing")}
            >
              List your 1st item →
            </button>
          </div>
        ) : (
          <div>
  
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <span>© 2026 Trovr. All rights reserved.</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={styles.footerLink}>REPORT</span>
          <span style={styles.footerLink}>SAFETY TIPS</span>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" },
  nav: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "14px 32px",
    backgroundColor: "#fff", borderBottom: "1px solid #eee",
  },
  logo: { color: "#1e3a8a", fontWeight: "bold", fontSize: "18px" },
  navLinks: { display: "flex", alignItems: "center", gap: "20px" },
  navLink: { fontSize: "14px", cursor: "pointer", color: "#555" },
  createBtn: {
    backgroundColor: "#1e3a8a", color: "#fff",
    border: "none", borderRadius: "8px",
    padding: "8px 16px", cursor: "pointer", fontWeight: "600",
  },
  avatar: { fontSize: "20px", cursor: "pointer" },
  container: {
    flex: 1, maxWidth: "1100px",
    margin: "0 auto", padding: "32px 16px",
    width: "100%",
  },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "4px" },
  subtitle: { color: "#888", fontSize: "14px", marginBottom: "40px" },
  emptyState: {
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "80px 20px", textAlign: "center",
  },
  emptyIcon: { fontSize: "48px", marginBottom: "16px", opacity: 0.4 },
  emptyTitle: { fontSize: "16px", fontWeight: "600", color: "#555" },
  emptySubtitle: { fontSize: "13px", color: "#999", marginBottom: "20px" },
  listBtn: {
    backgroundColor: "#e8e8f8", color: "#1e3a8a",
    border: "none", borderRadius: "8px",
    padding: "10px 20px", cursor: "pointer", fontWeight: "600",
  },
  footer: {
    display: "flex", justifyContent: "space-between",
    padding: "16px 32px", borderTop: "1px solid #eee",
    fontSize: "12px", color: "#999",
  },
  footerLink: { cursor: "pointer" },
};

export default Dashboard;

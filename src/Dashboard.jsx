import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyListings } from "./api";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // <-- Tracks clicked active item for the modal view

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
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>My Listing Dashboard</h2>
        <p style={styles.subtitle}>
          Manage and update your listings here • <strong>{listings.length} {listings.length === 1 ? 'item' : 'items'} listed</strong>
        </p>

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
          
          <div style={styles.gridContainer}>
            {listings.map((item) => (
              <div 
                key={item._id || item.id} 
                style={{ ...styles.listingCard, cursor: "pointer" }}
                onClick={() => setSelectedItem(item)} 
              >
                <img 
                  src={typeof item.image === "string" ? item.image : item.image?.[0] || "https://via.placeholder.com/150"} 
                  alt={item.name || item.title} 
                  style={styles.cardImg} 
                />
                <div style={styles.cardDetails}>
                  <h4 style={styles.cardName}>{item.name || item.title}</h4>
                  <p style={styles.cardPrice}>₦{item.price}</p>
                  <span style={{
                    ...styles.conditionBadge,
                    backgroundColor: item.condition === "New" ? "#dcfce7" : "#fef9c3",
                    color: item.condition === "New" ? "#16a34a" : "#ca8a04",
                  }}>
                    {item.condition || "Used"}
                  </span>
                  <p style={styles.cardLocation}>📍 {item.location || "Campus"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

            {selectedItem && (
        <div style={styles.overlay} onClick={() => setSelectedItem(null)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            
            <div style={styles.headerRow}>
              <h3 style={styles.modalTitle}>{selectedItem.name || selectedItem.title}</h3>
              <button style={styles.closeX} onClick={() => setSelectedItem(null)}>✕</button>
            </div>

            <img 
              src={typeof selectedItem.image === "string" ? selectedItem.image : selectedItem.image?.[0] || "https://via.placeholder.com/300"} 
              alt={selectedItem.name || selectedItem.title} 
              style={styles.modalImg} 
            />

            <div style={styles.detailsContainer}>
              <div style={styles.priceRow}>
                <span style={styles.price}>₦{selectedItem.price}</span>
                <span style={{
                  ...styles.conditionBadge,
                  backgroundColor: selectedItem.condition === "New" ? "#dcfce7" : "#fef9c3",
                  color: selectedItem.condition === "New" ? "#16a34a" : "#ca8a04",
                  margin: 0
                }}>
                  {selectedItem.condition || "Used"}
                </span>
              </div>

              <h4 style={styles.sectionLabel}>Description</h4>
              <p style={styles.descriptionText}>{selectedItem.description || "No description provided."}</p>
              <p style={styles.modalLocation}>📍 {selectedItem.location}</p>

              
              <div style={styles.sellerBar}>
                <div style={styles.statusLabelContainer}>
                  <span style={styles.liveIndicator}>•</span> Live Active Post
                </div>
                
                <button 
                  style={styles.closeModalBtn} 
                  onClick={() => setSelectedItem(null)}
                >
                  Close View
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      

      <Footer />
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif", display: "flex", flexDirection: "column" },
  container: { flex: 1, maxWidth: "1100px", margin: "0 auto", padding: "32px 16px", width: "100%", boxSizing: "border-box" },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "4px", color: "#333" },
  subtitle: { color: "#666", fontSize: "14px", marginBottom: "40px" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" },
  emptyIcon: { fontSize: "48px", marginBottom: "16px", opacity: 0.4 },
  emptyTitle: { fontSize: "16px", fontWeight: "600", color: "#555" },
  emptySubtitle: { fontSize: "13px", color: "#999", marginBottom: "20px" },
  listBtn: { backgroundColor: "#e8e8f8", color: "#1e3a8a", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontWeight: "600" },
  
  gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" },
  listingCard: { backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  cardImg: { width: "100%", height: "150px", objectFit: "cover" },
  cardDetails: { padding: "12px", display: "flex", flexDirection: "column", gap: "6px" },
  cardName: { margin: 0, fontSize: "14px", fontWeight: "600", color: "#333" },
  cardPrice: { margin: 0, fontSize: "14px", fontWeight: "700", color: "#1e3a8a" },
  conditionBadge: { fontSize: "11px", padding: "2px 8px", borderRadius: "10px", display: "inline-block", alignSelf: "flex-start" },
  cardLocation: { margin: 0, fontSize: "11px", color: "#777" },

  
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "16px" },
  modalCard: { backgroundColor: "#fff", width: "100%", maxWidth: "400px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #eee" },
  modalTitle: { margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" },
  closeX: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#999" },
  modalImg: { width: "100%", height: "200px", objectFit: "cover" },
  detailsContainer: { padding: "16px", display: "flex", flexDirection: "column", gap: "12px" },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: "20px", fontWeight: "700", color: "#000" },
  sectionLabel: { margin: 0, fontSize: "12px", fontWeight: "600", color: "#777", textTransform: "uppercase" },
  descriptionText: { margin: 0, fontSize: "13px", color: "#444", lineHeight: "1.4" },
  modalLocation: { margin: 0, fontSize: "11px", color: "#666" },
  sellerBar: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "4px" },
  statusLabelContainer: { fontSize: "13px", fontWeight: "500", color: "#555", display: "flex", alignItems: "center", gap: "6px" },
  liveIndicator: { color: "#16a34a", fontSize: "20px", lineHeight: 0 },
  closeModalBtn: { backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }
};

export default Dashboard;
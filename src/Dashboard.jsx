import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyListings } from "./api";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Dashboard() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  
  useEffect(()=>{
     getMyListings().then((response)=>{
      setListings(response.data.data.items)
      console.log(response)
     }).catch((error)=>{
      toast.error(error.data.messgae || "unable to load your listing")
      console.log(error)
     })
     },[])

  if (loading) return <p style={{ textAlign: "center", marginTop: 40, fontFamily: "Poppins, sans-serif" }}>Loading...</p>;
 if (error) return (
  <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
    <Navbar />
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <p style={{ fontSize: "16px", color: "#555" }}>Unable to load listings right now.</p>
      <p style={{ fontSize: "13px", color: "#999" }}>Please try again later.</p>
      <button
        onClick={() => navigate("/create-listing")}
        style={{ backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginTop: "16px" }}
      >
        Create a Listing
      </button>
    </div>
    <Footer />
  </div>
);
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Poppins, sans-serif", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ flex: 1, maxWidth: "1100px", margin: "0 auto", padding: "32px 16px", width: "100%", boxSizing: "border-box" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1e3a8a", marginBottom: "4px" }}>My Listing Dashboard</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "32px" }}>
          Manage and update your listings here • <strong>{listings.length} {listings.length === 1 ? "item" : "items"} listed</strong>
        </p>

        {listings.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.4 }}>🗂️</div>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#555", margin: 0 }}>No listing created yet</p>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px" }}>Create your first listing to get started</p>
            <button
              onClick={() => navigate("/create-listing")}
              style={{ backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              List your 1st item →
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {listings.map((item) => (
              <div
                key={item._id || item.id}
                onClick={() => setSelectedItem(item)}
                style={{ backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", cursor: "pointer" }}
              >
                <img
                  src={item.images?.[0] || item.image || "https://via.placeholder.com/150"}
                  alt={item.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#333" }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#1e3a8a" }}>₦{item.price}</p>
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", display: "inline-block", alignSelf: "flex-start", backgroundColor: "#dcfce7", color: "#16a34a" }}>
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "16px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#fff", width: "100%", maxWidth: "400px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #eee" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>{selectedItem.title}</h3>
              <button onClick={() => setSelectedItem(null)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#999" }}>✕</button>
            </div>

            <img
              src={selectedItem.images?.[0] || selectedItem.image || "https://via.placeholder.com/300"}
              alt={selectedItem.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: "700", color: "#000" }}>₦{selectedItem.price}</span>
                <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", backgroundColor: "#dcfce7", color: "#16a34a" }}>{selectedItem.category}</span>
              </div>

              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "12px", fontWeight: "600", color: "#777", textTransform: "uppercase" }}>Description</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#444", lineHeight: "1.5" }}>{selectedItem.description || "No description provided."}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "12px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => navigate("/create-listing", { state: { listing: selectedItem } })}
                    style={{ backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    style={{ backgroundColor: "#f3f4f6", color: "#1e3a8a", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Close
                  </button>
                </div>
                <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "500" }}>● Live</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
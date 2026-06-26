import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getListings } from "./api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CtaBanner from "./CTABanner"; 
import useStore from "./store";

const categories = ["All", "Education", "Sport", "Electronics", "Furniture", "Fashion"];

const fallbackProducts = [
  {
    _id: "1",
    title: "Organic Chemistry Textbook",
    price: "N9K",
    condition: "Used",
    description: "Second Edition, minimal highlighting. Good condition. Used for CHEM 201.",
    location: "Ife Main Hostel, Burger Spot, Ite Junction",
    category: "Education",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
    sellerName: "Wealth Happiness"
  },
  {
    _id: "2",
    title: "Gaming Mouse Logitech G502",
    price: "N100K",
    condition: "New",
    description: "High precision gaming mouse with programmable buttons.",
    location: "Okonkwo Junction",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
    sellerName: "Chidi Tech"
  },
  {
    _id: "3",
    title: "Desk Lamp With USB Port",
    price: "N36K",
    condition: "Used",
    description: "LED desk lamp with adjustable brightness and USB charging port.",
    location: "Adekunle Hostel, Aisha Road",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop",
    sellerName: "Emeka Stores"
  },
];

function Marketplace() {
  const navigate = useNavigate();
  const { user } = useStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [listings, setListings] = useState(fallbackProducts);
  const [selectedItem, setSelectedItem] = useState(null); 

  useEffect(() => {
    getListings()
      .then((data) => {
        const result = data.data || data.listings || data;
        setListings(Array.isArray(result) && result.length > 0 ? result : fallbackProducts);
      })
      .catch(() => {
        setListings(fallbackProducts);
      });
  }, []);

  const handleMessageSeller = (product) => {
    if (user) {
      navigate("/conversations");
    } else {
      setSelectedItem(null); 
      toast.info("Please log in to message the seller");
      const loginBtn = document.querySelector("nav button:last-child");
      if (loginBtn) loginBtn.click();
    }
  };

  const filtered = listings.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = (p.title || p.name || "").toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return ( 
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Discover Items</h2>

        <input
          type="text"
          placeholder="🔍 Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.catBtn,
                backgroundColor: activeCategory === cat ? "#007bff" : "#f0f0f0",
                color: activeCategory === cat ? "#fff" : "#333",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p style={styles.resultCount}>{filtered.length} Items Found</p>

        <div style={styles.grid}>
          {filtered.map((product) => (
            <div 
              key={product._id} 
              style={{ ...styles.card, cursor: "pointer" }}
              onClick={() => setSelectedItem(product)} 
            >
              <img
                src={typeof product.image === "string" ? product.image : product.image?.[0]}
                alt={product.title || product.name}
                style={styles.cardImg}
              />
              <div style={styles.cardBody}>
                <div style={styles.cardTop}>
                  <span style={styles.cardName}>{product.title || product.name}</span>
                  <span style={styles.cardPrice}>{product.price}</span>
                </div>
                <span style={{
                  ...styles.conditionBadge,
                  backgroundColor: product.condition === "New" ? "#dcfce7" : "#fef9c3",
                  color: product.condition === "New" ? "#16a34a" : "#ca8a04",
                }}>
                  {product.condition}
                </span>
                <p style={styles.cardDesc}>{product.description}</p>
                <p style={styles.cardLocation}>📍 {product.location}</p>
                
                <button 
                  style={styles.msgBtn} 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedItem(product);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedItem && (
          <div style={styles.overlay} onClick={() => setSelectedItem(null)}>
            <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              
              <div style={styles.headerRow}>
                <h3 style={styles.modalTitle}>{selectedItem.title || selectedItem.name}</h3>
                <button style={styles.closeX} onClick={() => setSelectedItem(null)}>✕</button>
              </div>

              <img 
                src={typeof selectedItem.image === "string" ? selectedItem.image : selectedItem.image?.[0]} 
                alt={selectedItem.title || selectedItem.name} 
                style={styles.modalImg} 
              />

              <div style={styles.detailsContainer}>
                <div style={styles.priceRow}>
                  <span style={styles.price}>{selectedItem.price}</span>
                  <span style={{
                    ...styles.conditionBadge,
                    backgroundColor: selectedItem.condition === "New" ? "#dcfce7" : "#fef9c3",
                    color: selectedItem.condition === "New" ? "#16a34a" : "#ca8a04",
                    margin: 0
                  }}>
                    {selectedItem.condition}
                  </span>
                </div>

                <h4 style={styles.sectionLabel}>Description</h4>
                <p style={styles.descriptionText}>{selectedItem.description}</p>
                <p style={styles.modalLocation}>📍 {selectedItem.location}</p>

                
                <div style={styles.sellerBar}>
                  <div style={styles.sellerInfo}>
                    <div style={styles.avatarMini}>
                      {selectedItem.sellerName ? selectedItem.sellerName[0].toUpperCase() : "S"}
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", color: "#999" }}>Seller</div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#333" }}>
                        {selectedItem.sellerName || "Wealth Happiness"}
                      </div>
                    </div>
                  </div>

                  <button 
                    style={styles.modalMsgBtn} 
                    onClick={() => handleMessageSeller(selectedItem)}
                  >
                    💬 Message Seller
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
        
        <CtaBanner />
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
  searchInput: { padding: "10px 16px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", width: "100%", boxSizing: "border-box", marginBottom: "12px" },
  categories: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" },
  catBtn: { padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px" },
  resultCount: { fontSize: "13px", color: "#888", marginBottom: "16px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginBottom: "40px" },
  card: { backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" },
  cardImg: { width: "100%", height: "160px", objectFit: "cover" },
  cardBody: { padding: "12px", display: "flex", flexDirection: "column", flexGrow: 1 },
  cardTop: { display: "flex", justifyContent: "space-between", marginBottom: "6px" },
  cardName: { fontWeight: "600", fontSize: "14px" },
  cardPrice: { fontWeight: "700", color: "#007bff" },
  conditionBadge: { fontSize: "11px", padding: "2px 8px", borderRadius: "10px", display: "inline-block", marginBottom: "8px", alignSelf: "flex-start" },
  cardDesc: { fontSize: "12px", color: "#666", marginBottom: "6px", flexGrow: 1 },
  cardLocation: { fontSize: "11px", color: "#999", marginBottom: "10px" },
  msgBtn: { width: "100%", padding: "8px", backgroundColor: "#f0f0f0", color: "#333", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "auto" },

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
  sellerInfo: { display: "flex", alignItems: "center", gap: "10px" },
  avatarMini: { width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#f4c430", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" },
  modalMsgBtn: { backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }
};

export default Marketplace;
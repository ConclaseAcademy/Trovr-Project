import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getListings } from "./api";
import Navbar from "./Navbar";
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
  },
  {
    _id: "4",
    title: "Organic Chemistry Textbook",
    price: "N9K",
    condition: "Used",
    description: "Second Edition, minimal highlighting. Good condition. Used for CHEM 201.",
    location: "Ife Main Hostel, Burger Spot, Ite Junction",
    category: "Education",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
  },
  {
    _id: "5",
    title: "Gaming Mouse Logitech G502",
    price: "N100K",
    condition: "New",
    description: "High precision gaming mouse with programmable buttons.",
    location: "Okonkwo Junction",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
  },
  {
    _id: "6",
    title: "Desk Lamp With USB Port",
    price: "N36K",
    condition: "Used",
    description: "LED desk lamp with adjustable brightness and USB charging port.",
    location: "Adekunle Hostel, Aisha Road",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop",
  },
];

function Marketplace() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [listings, setListings] = useState(fallbackProducts);

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
                backgroundColor: activeCategory === cat ? "#1e3a8a" : "#f0f0f0",
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
            <div key={product._id} style={styles.card}>
              <img
                src={typeof product.image === "string" ? product.image:product.image?.[0]}
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
              </div>
            </div>
          ))}
        </div>

        <div style={styles.ctaBanner}>
          <h3 style={styles.ctaTitle}>Ready to become a Seller?</h3>
          <p style={styles.ctaSubtitle}>Join hundreds of students buying and selling on campus</p>
          <button style={styles.ctaBtn} onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>

      <footer style={styles.footer}>
        <span>©️ 2024 Trovr. All rights reserved.</span>
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={styles.footerLink}>REPORT</span>
          <span style={styles.footerLink}>SAFETY TIPS</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "24px 16px" },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
  searchInput: {
    padding: "10px 16px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "14px",
    width: "100%", boxSizing: "border-box", marginBottom: "12px",
  },
  categories: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" },
  catBtn: { padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "13px" },
  resultCount: { fontSize: "13px", color: "#888", marginBottom: "16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px", marginBottom: "40px",
  },
  card: { backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" },
  cardImg: { width: "100%", height: "160px", objectFit: "cover" },
  cardBody: { padding: "12px" },
  cardTop: { display: "flex", justifyContent: "space-between", marginBottom: "6px" },
  cardName: { fontWeight: "600", fontSize: "14px" },
  cardPrice: { fontWeight: "700", color: "#1e3a8a" },
  conditionBadge: { fontSize: "11px", padding: "2px 8px", borderRadius: "10px", display: "inline-block", marginBottom: "8px" },
  cardDesc: { fontSize: "12px", color: "#666", marginBottom: "6px" },
  cardLocation: { fontSize: "11px", color: "#999" },
  ctaBanner: {
    backgroundColor: "#fff", borderRadius: "12px",
    padding: "40px", textAlign: "center",
    marginBottom: "40px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  ctaTitle: { color: "#c9a84c", fontSize: "22px", fontWeight: "700" },
  ctaSubtitle: { color: "#666", marginBottom: "16px" },
  ctaBtn: { backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer" },
  footer: { display: "flex", justifyContent: "space-between", padding: "16px 32px", borderTop: "1px solid #eee", fontSize: "12px", color: "#999" },
  footerLink: { cursor: "pointer" },
};

export default Marketplace;



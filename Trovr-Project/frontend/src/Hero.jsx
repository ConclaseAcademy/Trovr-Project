import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>
        <span style={styles.green}>Trovr</span> 
      </h1>
      <p style={styles.sub}>
       "No Ghost Buying. No Scam Sellers. <br /> 
        Just People Who Actually Show Up."
      </p>
      <div style={styles.btns}>
        <button
          style={styles.browseBtn}
          onClick={() => navigate("/marketplace")}  
        >
          Browse Listing
        </button>
        <button
          style={styles.listBtn}
          onClick={() => navigate("/create-listing")}  
        >
          Get started
        </button>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    textAlign: "center",
    padding: "60px 24px 50px",
    backgroundColor: "#f0f4ee",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#111",
    lineHeight: 1.3,
    marginBottom: "16px",
  },
  green: {
    color: "#4caf7d",
  },
  sub: {
    color: "#555",
    fontSize: "15px",
    marginBottom: "28px",
    lineHeight: 1.6,
  },
  btns: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  browseBtn: {
    padding: "12px 22px",
    borderRadius: "8px",
    border: "none",
    background: "#1a1a6e",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
  listBtn: {
    padding: "12px 22px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Hero;

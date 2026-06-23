import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={styles.hero}>
      <h1 style={styles.title}>
        <span style={styles.green}>Trovr</span> 
      </h1>
      <p style={styles.sub}>
       "No Ghost Buyers. No Scam Sellers. <br /> 
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
    padding: "100px 32px 80px",
    backgroundColor: "#f0f4ee",
  },
  title: {
    fontSize: "64px",
    fontWeight: "800",
    color: "#111",
    lineHeight: 1.15,
    marginBottom: "20px",
    fontFamily: "Georgia, serif",
    letterSpacing: "-1px",
  },
  green: {
    color: "#4caf7d",
  },
  sub: {
    color: "#555",
    fontSize: "20px",
    marginBottom: "40px",
    lineHeight: 1.7,
    maxWidth: "520px",
    margin: "0 auto 40px",
  },
  btns: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  browseBtn: {
    padding: "15px 34px",
    borderRadius: "10px",
    border: "none",
    background: "#1e3a8a",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  listBtn: {
    padding: "15px 34px",
    borderRadius: "10px",
    border: "1.5px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    color: "#111",
  },
};

export default Hero;

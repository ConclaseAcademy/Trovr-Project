 function CTABanner() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Ready to get started?</h2>
      <p style={styles.sub}>Join hundreds of students buying and selling on campus</p>
      <button style={styles.btn}>Explore Marketplace</button>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: "#fefde8",
    textAlign: "center",
    padding: "100px 40px",
  },
  title: {
    fontSize: "44px",
    fontWeight: "800",
    color: "#b8860b",
    marginBottom: "16px",
    fontFamily: "Georgia, serif",
    lineHeight: 1.2,
  },
  sub: {
    color: "#555",
    fontSize: "18px",
    marginBottom: "36px",
    maxWidth: "480px",
    margin: "0 auto 36px",
    lineHeight: 1.6,
  },
  btn: {
    padding: "15px 40px",
    borderRadius: "10px",
    border: "none",
    background: "#1e3a8a",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default CTABanner;

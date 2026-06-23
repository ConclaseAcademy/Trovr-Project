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
    padding: "50px 24px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#b8860b",
    marginBottom: "12px",
  },
  sub: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "24px",
  },
  btn: {
    padding: "12px 28px",
    borderRadius: "8px",
    border: "none",
    background: "#1a1a6e",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default CTABanner;

function Footer() {
  return (
    <footer style={styles.footer}>
      <span>© 2026 Campus Marketplace. All rights reserved.</span>
      <div>
        <span style={styles.link}>REPORT</span>
        <span style={styles.link}>SAFETY TIPS</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#aaa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    fontSize: "13px",
    flexWrap: "wrap",
    gap: "10px",
  },
  link: {
    color: "#ccc",
    marginLeft: "16px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Footer;

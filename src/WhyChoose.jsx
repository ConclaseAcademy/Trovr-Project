const features = [
  {
    icon: "👥",
    title: "Campus Community",
    desc: "Trade only with verified students from your university for a safe experience.",
  },
  {
  icon: "💬",
    title: "Direct Messaging",
    desc: "Chat directly with sellers to ask questions and arrange meetups safely on campus.",
  },
  {
     icon: "🛒",
    title: "Buy & Sell Easily",
    desc: "List your items in minutes and discover great deals from fellow students on campus.",
  },
  {
    icon: "⚡",
    title: "Fast & Simple",
    desc: "No complicated processes. Post, browse, message, and meet up all in one place.",
  },
       
];
 

  
function WhyChoose() {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>
        Why <span style={styles.green}>students trust</span><br /> Trovr?
      </h2>
     

      <div style={styles.grid}>
        {features.map((item, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.icon}>{item.icon}</div>
            <h3 style={styles.cardTitle}>{item.title}</h3>
            <p style={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "50px 24px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "28px",
     textAlign:"center",
    fontWeight: "bold",
    color: "#111",
    marginBottom: "10px",
    lineHeight: 1.3,
  },
  green: {
     color: "#4caf7d",
  },
  sub: {
    textAlign:"center",
    color: "#555",
    fontSize: "14px",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  card: {
    backgroundColor: "#f5f5f0",
    borderRadius: "12px",
    padding: "20px",
  },
  icon: {
    fontSize: "24px",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#111",
  },
  cardDesc: {
    fontSize: "13px",
    color: "#555",
    lineHeight: 1.5,
  },
};

export default WhyChoose;

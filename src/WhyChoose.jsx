import {ShieldCheck, UserCheck, LayoutGrid, Smartphone} from "lucide-react";
const features = [
  { icon: ShieldCheck, title: "Buy & Sell Easily", desc: "Create a safer buying and selling experience for students." },
  { icon: UserCheck, title: "Trusted", desc: "Verifying students to build trust within the campus community." },
  { icon: LayoutGrid, title: "Clean Listing", desc: "Providing beautiful, category-sorted, organised listings that are easier to browse than WhatsApp groups." },
  { icon: Smartphone, title: "Mobile First", desc: "Designing modern, organised listings that are easier to browse for how students naturally use their phones everyday." },
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
            <div style={styles.icon}><item.icon size={32}/></div>
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
    padding: "90px 40px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "40px",
    textAlign: "center",
    fontWeight: "800",
    color: "#111",
    marginBottom: "48px",
    lineHeight: 1.25,
    fontFamily: "Georgia, serif",
  },
  green: {
    color: "#4caf7d",
  },
  sub: {
    textAlign: "center",
    color: "#555",
    fontSize: "16px",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "28px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#f5f5f0",
    borderRadius: "16px",
    padding: "32px 28px",
  },
  icon: {
    marginBottom: "16px",
    color: "#1e3a8a",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#111",
  },
  cardDesc: {
    fontSize: "15px",
    color: "#555",
    lineHeight: 1.6,
  },
};

export default WhyChoose;

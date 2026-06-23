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

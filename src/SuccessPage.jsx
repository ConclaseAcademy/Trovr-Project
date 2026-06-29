import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.circle}></div>
        <h1 style={styles.title}>Success</h1>
        <p style={styles.message}>
          Hurray 🎉....... Your item has been updated successfully
        </p>
        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f0f0" },
  card: { backgroundColor: "#fff", padding: "60px 40px", borderRadius: "12px", textAlign: "center", width: "360px" },
  circle: { width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#4CAF50", margin: "0 auto 24px" },
  title: { color: "#2d6a2d", fontSize: "32px", marginBottom: "12px" },
  message: { color: "#555", fontSize: "15px", marginBottom: "24px" },
  button: { backgroundColor: "#1a1aff", color: "#fff", padding: "10px 24px", border: "none", borderRadius: "8px", cursor: "pointer" },
};

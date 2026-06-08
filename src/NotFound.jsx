import { useNavigate } from "react-router-dom";

function NotFound() {
 const navigate = useNavigate();

 return (
   <div style={styles.container}>
     <h1 style={styles.code}>404</h1>
     <h2 style={styles.title}>Page Not Found</h2>
     <p style={styles.subtitle}>
       Oops! The page you're looking for doesn't exist.
     </p>
     <button style={styles.btn} onClick={() => navigate("/")}>
       Back to Home
     </button>
   </div>
 );
}

const styles = {
 container: {
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
   height: "100vh",
   textAlign: "center",
   backgroundColor: "#f5f5f0",
 },
 code: {
   fontSize: "100px",
   fontWeight: "700",
   color: "#1e3a8a",
   margin: 0,
   lineHeight: 1,
 },
 title: {
   fontSize: "26px",
   color: "#111",
   marginTop: "16px",
   marginBottom: "8px",
 },
 subtitle: {
   color: "#888",
   fontSize: "15px",
   marginBottom: "32px",
 },
 btn: {
   backgroundColor:"#1e3a8a",
   color:"#fff",
   border:"none",
   borderRadius:"8px",
   padding:"12px 32px",
   fontSize:"15px",
   fontWeight:"600",
   cursor:"pointer"
},
};

export default NotFound;
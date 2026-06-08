import { useState } from "react";
import AuthModal from "./AuthModal";

function Navbar({ setPage }) {
  const [modal, setModal] = useState(null); 

  return (
    <>
      <nav style={styles.nav}>
        <span style={styles.logo}>Capstone</span>
        <div style={styles.navBtns}>
          <button
            style={styles.signupBtn}
            onClick={() => setModal("signup")}  
          >
            Sign-up
          </button>
          <button
            style={styles.loginBtn}
            onClick={() => setModal("login")}   
          >
            Login
          </button>
        </div>
      </nav>

      {modal && (
        <AuthModal
          type={modal}
          onClose={() => setModal(null)}
          setPage={setPage}   
        />
      )}
    </>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#f5f5f0",
  },
  logo: {
    color: "#2a5c3f",
    fontWeight: "bold",
    fontSize: "18px",
  },
  navBtns: {
    display: "flex",
    gap: "10px",
  },
  signupBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #333",
    background: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
  loginBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    background: "#1a1a6e",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
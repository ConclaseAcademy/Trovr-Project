import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
 
const [loading, setLoading] = useState(false);
const [name,setName] = useState("")
const [contact,setContact] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] =useState("")
 
const API_BASE_URL = 'http://104.211.22.120:5000';


const handleSubmit =async (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  if(!name.trim()) {
    toast.error('Please enter your full name');
      return;
  }

 if(!contact.trim()) {
    toast.error('Please enter your contact number');
      return;
  }

   if(!emailRegex.test(email)) {
    toast.error('Please enter your email address');
      return;
  }

   if(!passwordRegex.test(password)) {
    toast.error('Please enter your password password must contain uppercase,lolwercase and a number');
      return;
  }
 try{
  const payload ={
    fullName:name.trim(),
    contact:contact.trim(),
    email:email.trim(),
    password,
    role:'STUDENT'
  };
 
  await axios.post(`${API_BASE_URL}/api/auth/register`,payload);

  toast.success('Signin Successful!',{
    position:'top-center',
    autoClose:5000,
    closeOnclick:false,
    hideProgressBar:false,
    pauseOnHover:true,
    draggable:true,
    progress:undefined,
    theme:'light',
  });

  navigate('/login');
} catch (error) {
  console.error('Signup error:', error.response?.status,error.response.data || error.message);
  toast.error(
    error.response?.data?.message || 
    error.response?.data?.error ||
    'Sigup failed.Please check your details and try again.'
  );
}
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.top}>
          <span style={styles.backBtn} onClick={() => navigate(-1)}>&#8592;</span>
          <span style={styles.brand}>Trovr</span>
        </div>

        <h1 style={styles.title}>Sign-up</h1>
        <p style={styles.subtitle}>Enter your details to create an account with us</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Full Name <span style={styles.required}>*</span>
          </label>

          <input
            type="text"
            name="name"
            value={name}
            placeholder="Wealth Happiness"
            onChange={(e)=>setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Contact</label>
          <input
            type="text"
            name="contact"
            value={contact}
            placeholder="09134671010"
            onChange={(e)=> setContact(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            School Email Address <span style={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Wealth@gmail.com"
            onChange={(e)=> setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>
            Password <span style={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Wealth1010"
            onChange={(e)=> setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleSubmit}    
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <span style={styles.switchLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "36px 32px",
    width: "420px",
    maxWidth: "90vw",
    boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  backBtn: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#555",
    lineHeight: 1,
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e3a8a",
    fontFamily: "Georgia, serif",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#111",
    fontFamily: "Georgia, serif",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#555",
    marginBottom: "6px",
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "13px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "16px",
  },
  switchText: {
    fontSize: "13px",
    color: "#555",
  },
  switchLink: {
    textDecoration: "underline",
    cursor: "pointer",
    color: "#111",
    fontWeight: "500",
  },
};

export default Signup;

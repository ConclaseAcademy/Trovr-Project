import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CreateListing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    if (!toast.isActive("login-warning")){
    toast.error("You need to login before you can create a listing.",{
      toastId:"login-warning",
    });
  }
    setTimeout(() => {
      navigate("/login"); 
    },100);
    return null;
  }
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    condition: "",
    description: "",
    location: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const rawToken = localStorage.getItem("token");
    const token = rawToken ? rawToken.replaceAll('"', '') : "";

    axios.post("http://104.211.22.120:5000/api/listings", form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setLoading(false);
      toast.success("Listing created successfully!");
      navigate("/success");
    })
    .catch((error) => {
      setLoading(false);
      toast.error(error.response?.data?.message || "Server error, try again later");
    });
  };

  return (
    <div style={styles.page}>

      <nav style={styles.nav}>
        <span style={styles.logo}>Trovr</span>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={styles.container}>
        <h2 style={styles.heading}>Create a Listing</h2>
        <p style={styles.subtitle}>Fill in the details of the item you want to sell</p>

        <div style={styles.form}>

          <InputField 
            label="Item Name *" 
            name="name" 
            placeholder="e.g. Organic Chemistry Textbook" 
            value={form.name} 
            onChange={handleChange} 
          />

          <InputField 
            label="Price (₦) *" 
            name="price" 
            placeholder="e.g. 9000" 
            value={form.price} 
            onChange={handleChange} 
          />

          <SelectField 
            label="Category *" 
            name="category" 
            value={form.category} 
            onChange={handleChange}
            options={["Education", "Electronics", "Furniture", "Fashion", "Sport"]}
          />

          <SelectField 
            label="Condition *" 
            name="condition" 
            value={form.condition} 
            onChange={handleChange}
            options={["New", "Used"]}
          />

          <label style={styles.label}>Description *</label>
          <textarea
            name="description"
            value={form.description}
            placeholder="Describe your item..."
            onChange={handleChange}
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
          />

          <InputField 
            label="Location *" 
            name="location" 
            placeholder="e.g. Ife Main Hostel, Burger Spot" 
            value={form.location} 
            onChange={handleChange} 
          />

          <InputField 
            label="Item Image URL" 
            name="image" 
            placeholder="Paste image link e.g. http://..." 
            value={form.image} 
            onChange={handleChange} 
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}

          {error && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "10px" }}>
              {error}
            </p>
          )}

          <button
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>

        </div>
      </div>
    </div>
  );
}



const InputField = ({ label, name, placeholder, value, onChange, type = "text" }) => (
  <>
    <label style={styles.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={styles.input}
    />
  </>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <>
    <label style={styles.label}>{label}</label>
    <select name={name} value={value} onChange={onChange} style={styles.input}>
      <option value="">Select {name}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </>
);


const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", backgroundColor: "#fff", borderBottom: "1px solid #eee" },
  logo: { color: "#1e3a8a", fontWeight: "bold", fontSize: "18px" },
  backBtn: { background: "none", border: "none", color: "#1e3a8a", cursor: "pointer", fontSize: "14px" },
  container: { maxWidth: "600px", margin: "0 auto", padding: "32px 16px" },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "4px" },
  subtitle: { color: "#888", fontSize: "14px", marginBottom: "24px" },
  form: { backgroundColor: "#fff", borderRadius: "12px", padding: "24px" },
  label: { display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", marginTop: "14px" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#f5f5f5", fontSize: "14px", boxSizing: "border-box" },
  submitBtn: { marginTop: "20px", width: "100%", backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
};

export default CreateListing;
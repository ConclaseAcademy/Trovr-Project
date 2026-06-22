import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "", price: "", category: "",
    condition: "", description: "", location: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`https://104.211.22.120/api/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setForm({
            name: data.name || "",
            price: data.price || "",
            category: data.category || "",
            condition: data.condition || "",
            description: data.description || "",
            location: data.location || "",
          });
        } else {
          setError("Failed to load listing");
        }
      } catch {
        setError("Server error, try again later");
      }
      setFetching(false);
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://104.211.22.120/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/success");
      } else {
        setError(data.message || "Failed to update listing");
      }
    } catch {
      setError("Server error, try again later");
    }
    setLoading(false);
  };

  if (fetching) return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.logo}>Trovr</span>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </nav>

      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Listing</h2>
        <p style={styles.subtitle}>Update the details of your listing</p>

        <div style={styles.form}>

          <label style={styles.label}>Item Name *</label>
          <input name="name" value={form.name}
            onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Price (₦) *</label>
          <input name="price" value={form.price}
            onChange={handleChange} style={styles.input} />

          <label style={styles.label}>Category *</label>
          <select name="category" value={form.category}
            onChange={handleChange} style={styles.input}>
            <option value="">Select category</option>
            <option value="Education">Education</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Fashion">Fashion</option>
            <option value="Sport">Sport</option>
          </select>

          <label style={styles.label}>Condition *</label>
          <select name="condition" value={form.condition}
            onChange={handleChange} style={styles.input}>
            <option value="">Select condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>

          <label style={styles.label}>Description *</label>
          <textarea name="description" value={form.description}
            onChange={handleChange}
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
          />

          <label style={styles.label}>Location *</label>
          <input name="location" value={form.location}
            onChange={handleChange} style={styles.input} />

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <button style={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "sans-serif" },
  nav: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "14px 32px",
    backgroundColor: "#fff", borderBottom: "1px solid #eee",
  },
  logo: { color: "#1e3a8a", fontWeight: "bold", fontSize: "18px" },
  backBtn: {
    background: "none", border: "none",
    color: "#1e3a8a", cursor: "pointer", fontSize: "14px",
  },
  container: { maxWidth: "600px", margin: "0 auto", padding: "32px 16px" },
  heading: { fontSize: "22px", fontWeight: "700", marginBottom: "4px" },
  subtitle: { color: "#888", fontSize: "14px", marginBottom: "24px" },
  form: { backgroundColor: "#fff", borderRadius: "12px", padding: "24px" },
  label: { display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", marginTop: "14px" },
  input: {
    width: "100%", padding: "10px 14px",
    borderRadius: "8px", border: "1px solid #ddd",
    backgroundColor: "#f5f5f5", fontSize: "14px",
    boxSizing: "border-box",
  },
  submitBtn: {
    marginTop: "20px", width: "100%",
    backgroundColor: "#1e3a8a", color: "#fff",
    border: "none", borderRadius: "8px",
    padding: "12px", fontSize: "15px",
    fontWeight: "600", cursor: "pointer",
  },
};

export default EditListing;

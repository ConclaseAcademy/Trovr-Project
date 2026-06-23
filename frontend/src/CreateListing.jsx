import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateListing() {
 const navigate = useNavigate();
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

 const handleChange = (e) =>
   setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async () => {
   setLoading(true);
   setError("");
   try {
     const response = await fetch("http://104.211.22.120/api/listings", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
       body: JSON.stringify(form),
     });
     const data = await response.json();
     if (response.ok) {
       navigate("success");
     } else {
       setError(data.message || "Failed to create listing");
     }
   } catch (err) {
     setError("Server error, try again later");
   }
   setLoading(false);
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

         <label style={styles.label}>Item Name *</label>
         <input
           name="name"
           placeholder="e.g. Organic Chemistry Textbook"
           onChange={handleChange}
           style={styles.input}
         />

         <label style={styles.label}>Price (₦) *</label>
         <input
           name="price"
           placeholder="e.g. 9000"
           onChange={handleChange}
           style={styles.input}
         />

         <label style={styles.label}>Category *</label>
         <select name="category" onChange={handleChange} style={styles.input}>
           <option value="">Select category</option>
           <option value="Education">Education</option>
           <option value="Electronics">Electronics</option>
           <option value="Furniture">Furniture</option>
           <option value="Fashion">Fashion</option>
           <option value="Sport">Sport</option>
         </select>

         <label style={styles.label}>Condition *</label>
         <select name="condition" onChange={handleChange} style={styles.input}>
           <option value="">Select condition</option>
           <option value="New">New</option>
           <option value="Used">Used</option>
         </select>

         <label style={styles.label}>Description *</label>
         <textarea
           name="description"
           placeholder="Describe your item..."
           onChange={handleChange}
           style={{ ...styles.input, height: "100px", resize: "vertical" }}
         />

         <label style={styles.label}>Location *</label>
         <input
           name="location"
           placeholder="e.g. Ife Main Hostel, Burger Spot"
           onChange={handleChange}
           style={styles.input}
         />

         <label style={styles.label}>Item Image URL</label>
         <input
           name="image"
           placeholder="Paste image link e.g. https://..."
           onChange={handleChange}
           style={styles.input}
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

const styles = {
 page: {
   backgroundColor: "#f9f9f9",
   minHeight: "100vh",
   fontFamily: "sans-serif",
 },
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
 label: {
   display: "block", fontSize: "13px",
   color: "#555", marginBottom: "6px", marginTop: "14px",
 },
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

export default CreateListing;

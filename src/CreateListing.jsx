import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "./api"; 
import { toast } from "react-toastify";

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  background: '#F5F5F5',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#333',
  outline: 'none',
  fontFamily: 'Poppins, sans-serif',
  boxSizing: 'border-box',
  marginBottom: '14px'
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  color: '#555',
  marginBottom: '6px',
  fontWeight: '500',
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

function CreateListing({ listingToEdit }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listingToEdit) {
      setTitle(listingToEdit.title || '');
      setPrice(listingToEdit.price || '');
      setCategory(listingToEdit.category || '');
      setDescription(listingToEdit.description || '');
      setImage(listingToEdit.image || '');
    }
  }, [listingToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error('You must be logged in to create a listing!', {
        position: 'top-center',
        autoClose: 4000,
        theme: 'light',
      });
      navigate("/login",{ state: { from: "/create-listing"}});
      return;
    }

    const payload = {
      title:title,
      price:Number(price),
      category,
      description,
      images:image ? [image] : [],
    };

    try {
      await createListing(payload);

      toast.success('Listing Created Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Error creating listing:', error.response?.status, error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.response?.data?.error || 'Server error, try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
        <span style={{ color: "#1e3a8a", fontWeight: "bold", fontSize: "18px" }}>Trovr</span>
        <button 
          onClick={handleCancel}
          style={{ background: "none", border: "none", color: "#1e3a8a", cursor: "pointer", fontSize: "14px" }} 
        >
          ← Back to Dashboard
        </button>
      </nav>

      {/* Form Container */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 16px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#1e3a8a", marginBottom: "4px" }}>
          {listingToEdit ? 'Edit Listing' : 'Create a Listing'}
        </h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>Fill in the details of the item you want to sell</p>

        <div style={{ backgroundColor: "#fff", borderRadius: "12px", padding: "24px", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>Item Name *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Organic Chemistry Textbook" style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>Price (₦) *</label>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 9000" style={inputStyle} required />
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} required>
                  <option value="">Select Category</option>
                  <option value="Education">Education</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>

            
            </div>

            <div>
              <label style={labelStyle}>Description *</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your item..."
                rows={3}
                style={{ ...inputStyle, height: "100px", resize: 'vertical' }}
                required
              />
            </div>

          
            <div>
              <label style={labelStyle}>Item Image URL</label>
              <input value={image} onChange={e => setImage(e.target.value)} placeholder="Paste image link e.g. http://..." style={inputStyle} />
            </div>

            {image && (
              <img
                src={image}
                alt="preview"
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginTop: "14px", marginBottom: "14px" }}
              />
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1, backgroundColor: "#1e3a8a", color: "#fff", border: "none", borderRadius: "8px", padding: "14px", fontSize: "15px", fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Processing...' : listingToEdit ? 'Save Changes' : 'Create Listing'}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                style={{ padding: "14px 24px", backgroundColor: "#f3f4f6", color: "#1e3a8a", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;
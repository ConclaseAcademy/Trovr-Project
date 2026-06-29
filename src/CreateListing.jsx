import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "./api"; 
import { toast } from "react-toastify";

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  background: '#F5F5F5',
  border: 'none', 
  borderRadius: '8px',
  fontSize: '14px',
  color: '#333',
  outline: 'none',
  fontFamily: 'Poppins, sans-serif',
  boxSizing: 'border-box',
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
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };


  useEffect(() => {
    if (listingToEdit) {
      setTitle(listingToEdit.title || '');
      setPrice(listingToEdit.price || '');
      setCategory(listingToEdit.category || '');
      setDescription(listingToEdit.description || '');
      if (listingToEdit.image?.[0]) {
        setImagePreview(listingToEdit.image[0]);
      } else if (typeof listingToEdit.image === 'string') {
        setImagePreview(listingToEdit.image);
      }
      return;
    }

    resetForm();
  }, [listingToEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error('You must be logged in to create a listing!', { position: 'top-center' });
      navigate("/login", { state: { from: "/create-listing" } });
      return;
    }

    if (!imageFile && !imagePreview) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', Number(price));
    formData.append('category', category.toUpperCase());
    formData.append('description', description);
    if (imageFile) {
      formData.append('images', imageFile);
    }

    setLoading(true);
    createListing(formData)
      .then((response) => {
        toast.success(response?.data?.message || 'Listing Created Successfully!');
        resetForm();
        navigate("/success");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message || "Unable to create listing!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    resetForm();
    navigate("/dashboard");
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
  
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
        <span style={{ color: "#1e3a8a", fontWeight: "bold", fontSize: "18px" }}>Trovr</span>
        <button
          onClick={handleCancel}
          style={{ background: "none", border: "none", color: "#1e3a8a", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div style={{ maxWidth: "620px", margin: "0 auto", padding: "36px 16px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e3a8a", marginBottom: "6px" }}>
          {listingToEdit ? 'Edit Listing' : 'Create a Listing'}
        </h2>
        <p style={{ color: "#888", fontSize: "13px", marginBottom: "28px", lineHeight: "1.6" }}>
          Fill in the details below to publish a new item for buyers to discover.
        </p>

        <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "36px", boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div>
              <label style={labelStyle}>Item Name *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Organic Chemistry Textbook" style={inputStyle} required />
            </div>

            <div style={rowStyle}>
              <div>
                <label style={labelStyle}>Price (₦) *</label>
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 9000" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} required>
                  <option value="">Select Category</option>
                  <option value="EDUCATION">Education</option>
                  <option value="ELECTRONICS">Electronics</option>
                  <option value="FURNITURE">Furniture</option>
                  <option value="FASHION">Fashion</option>
                  <option value="SPORT">Sport</option>
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
                style={{ ...inputStyle, resize: 'vertical' }}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Item Image *</label>
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: '#F5F5F5',
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>📁 Click to choose a file</p>
                <p style={{ margin: '4px 0 0', color: '#bbb', fontSize: '11px' }}>JPG, PNG, WEBP supported</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {imagePreview && (
              <div style={{ position: 'relative' }}>
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute', top: '8px', right: '8px',
                    background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none',
                    borderRadius: '50%', width: '28px', height: '28px',
                    cursor: 'pointer', fontSize: '14px', lineHeight: '28px', textAlign: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: '#1e3a8a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {loading ? 'Processing...' : listingToEdit ? 'Save Changes' : 'Create Listing'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '15px 28px',
                  background: '#e0e7ff',
                  color: '#1e3a8a',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                }}
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
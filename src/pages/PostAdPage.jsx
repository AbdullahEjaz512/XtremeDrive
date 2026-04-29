import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Upload, Trash2, Link } from 'lucide-react';

export default function PostAdPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    category: 'CAR',
    title: '',
    make: '',
    model: '',
    year: '',
    city: '',
    price: '',
    mileage: '',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    engineCapacity: '',
    condition: 'Used',
    description: '',
    images: '',
    features: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedPreviews, setUploadedPreviews] = useState([]);
  const [pastedUrl, setPastedUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Convert uploaded files to Base64
  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPreviews(prev => {
          const updated = [...prev, reader.result];
          // Sync with form.images (comma-separated base64)
          setForm(f => ({ ...f, images: updated.join(',') }));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleBrowse = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const addUrlImage = () => {
    if (pastedUrl.trim()) {
      setUploadedPreviews(prev => {
        const updated = [...prev, pastedUrl.trim()];
        setForm(f => ({ ...f, images: updated.join(',') }));
        return updated;
      });
      setPastedUrl('');
    }
  };

  const removeImage = (index) => {
    setUploadedPreviews(prev => {
      const updated = prev.filter((_, i) => i !== index);
      setForm(f => ({ ...f, images: updated.join(',') }));
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!form.title || !form.make || !form.model || !form.city || !form.price || !form.sellerName || !form.sellerPhone) {
      setError('Please fill in all the required fields (*)');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error('Ad submission failed. Please try again.');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/ads');
      }, 2000);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
        <div style={{
          width: '80px', height: '80px', backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)', borderRadius: '50%', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
        }}>
          <Check size={40} />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--black)', marginBottom: '12px' }}>
          Ad Posted Successfully!
        </h2>
        <p style={{ color: 'var(--gray-500)' }}>Redirecting you to listings...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: 'var(--gray-50)', paddingBottom: '60px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--white)', padding: '30px 0', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--black)' }}>Post an Ad</h1>
          <p style={{ color: 'var(--gray-500)' }}>Sell your vehicle or part for the best price in Pakistan.</p>
        </div>
      </section>

      <section className="container" style={{ marginTop: '40px', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'var(--white)',
          padding: '40px',
          borderRadius: 'var(--border-radius-md)',
          border: '1px solid var(--gray-200)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444',
              padding: '16px', borderRadius: 'var(--border-radius-md)',
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontWeight: 500
            }}>
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {/* Section 1: Item Details */}
          <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', marginBottom: '20px' }}>
            1. Item Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="AUTOPART">Auto Part</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Title / Ad Name *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Honda Civic Oriel 2021" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Make *</label>
              <input type="text" name="make" value={form.make} onChange={handleChange} placeholder="e.g. Honda, Suzuki" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Model *</label>
              <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="e.g. Civic, Mehran" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>City *</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Lahore, Karachi" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Price (PKR) *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 1500000" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Condition *</label>
              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="Used">Used</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>

          {/* Section 2: Specs */}
          {form.category !== 'AUTOPART' && (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', marginBottom: '20px', marginTop: '40px' }}>
                2. Technical Specifications
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Year</label>
                  <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2020" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Mileage (km)</label>
                  <input type="number" name="mileage" value={form.mileage} onChange={handleChange} placeholder="e.g. 50000" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Fuel Type</label>
                  <select name="fuelType" value={form.fuelType} onChange={handleChange}>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Transmission</label>
                  <select name="transmission" value={form.transmission} onChange={handleChange}>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Section 3: Extra Info */}
          <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', marginBottom: '20px', marginTop: '40px' }}>
            {form.category === 'AUTOPART' ? '2. Additional Details' : '3. Additional Details'}
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Provide details about condition, upgrades, history..."></textarea>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Features (Comma-separated)</label>
            <input type="text" name="features" value={form.features} onChange={handleChange} placeholder="e.g. ABS, Alloy Rims, Sunroof" />
          </div>

          {/* Image Upload Area */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '12px' }}>Upload Images *</label>
            
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              style={{
                border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--gray-300)'}`,
                backgroundColor: isDragging ? 'var(--primary-light)' : 'var(--gray-50)',
                padding: '40px 20px',
                borderRadius: 'var(--border-radius-md)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <Upload size={32} style={{ color: 'var(--gray-400)' }} />
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-700)' }}>
                  Drag and drop your files here, or <span style={{ color: 'var(--primary)' }}>browse</span>
                </p>
                <p style={{ fontSize: '12px', color: 'var(--gray-400)', marginTop: '4px' }}>Supports JPG, JPEG, PNG</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleBrowse}
                style={{
                  position: 'absolute', opacity: 0, width: '100%', height: '100%',
                  top: 0, left: 0, cursor: 'pointer', pointerEvents: 'none'
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById('file-input-id').click()}
                style={{ backgroundColor: 'var(--gray-200)', color: 'var(--gray-700)' }}
              >
                Choose Files
              </button>
              <input id="file-input-id" type="file" multiple accept="image/*" onChange={handleBrowse} style={{ display: 'none' }} />
            </div>

            {/* URL Fallback */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <input
                type="text"
                placeholder="Or paste an image URL..."
                value={pastedUrl}
                onChange={(e) => setPastedUrl(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={addUrlImage}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  backgroundColor: 'var(--black)', color: 'var(--white)',
                  borderRadius: 'var(--border-radius-md)', padding: '0 16px'
                }}
              >
                <Link size={16} /> Add URL
              </button>
            </div>

            {/* Previews */}
            {uploadedPreviews.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
                {uploadedPreviews.map((src, index) => (
                  <div key={index} style={{
                    width: '100px', height: '100px', position: 'relative',
                    borderRadius: 'var(--border-radius-sm)', overflow: 'hidden',
                    border: '1px solid var(--gray-200)'
                  }}>
                    <img src={src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute', top: '4px', right: '4px',
                        backgroundColor: 'rgba(239, 68, 68, 0.8)', color: 'var(--white)',
                        border: 'none', borderRadius: '50%', width: '22px', height: '22px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Seller Info */}
          <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--gray-100)', paddingBottom: '8px', marginBottom: '20px', marginTop: '40px' }}>
            {form.category === 'AUTOPART' ? '3. Seller Contact' : '4. Seller Contact'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Name *</label>
              <input type="text" name="sellerName" value={form.sellerName} onChange={handleChange} placeholder="Your name" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Phone *</label>
              <input type="text" name="sellerPhone" value={form.sellerPhone} onChange={handleChange} placeholder="e.g. 03001234567" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Email</label>
              <input type="email" name="sellerEmail" value={form.sellerEmail} onChange={handleChange} placeholder="your@email.com" />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary hover-lift"
            disabled={loading}
            style={{ width: '100%', padding: '16px', fontSize: '16px' }}
          >
            {loading ? 'Posting Ad...' : 'Submit Ad'}
          </button>
        </form>
      </section>
    </div>
  );
}

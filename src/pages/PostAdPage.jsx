import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Quick validations
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

          {/* Section 2: Technical Specifications (Conditional) */}
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

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '6px' }}>Images (Comma-separated URLs)</label>
            <input type="text" name="images" value={form.images} onChange={handleChange} placeholder="Enter online image URLs separated by commas" />
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

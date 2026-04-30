import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, AlertCircle, Upload, Trash2, Link, 
  Car, Info, Shield, Camera, DollarSign, User, MapPin
} from 'lucide-react';

export default function PostAdPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPreviews(prev => {
          const updated = [...prev, reader.result];
          setForm(f => ({ ...f, images: updated.join(',') }));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
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

      if (!res.ok) throw new Error('Ad submission failed. Please try again.');

      setSuccess(true);
      setTimeout(() => navigate('/ads'), 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#e6f4f4', color: 'var(--primary)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Check size={40} />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1a3b5d', marginBottom: '12px' }}>Ad Posted Successfully!</h2>
        <p style={{ color: '#666' }}>Redirecting you to listings...</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', paddingBottom: '80px' }}>
      
      {/* Top Banner */}
      <section style={{ backgroundColor: 'var(--white)', padding: '40px 0', borderBottom: '1px solid #e1e1e1' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1a3b5d', marginBottom: '10px' }}>Sell your Car with 3 Easy Steps!</h1>
          <p style={{ color: '#666' }}>It's free and takes less than a minute</p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="container" style={{ maxWidth: '900px', marginTop: '-30px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '40px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ 
              width: '100px', height: '6px', 
              backgroundColor: step >= s ? 'var(--primary)' : '#ddd',
              borderRadius: '3px'
            }} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px', alignItems: 'start' }}>
          
          {/* Main Form Area */}
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '8px', border: '1px solid #e1e1e1', padding: '40px' }}>
            <form onSubmit={handleSubmit}>
              
              {step === 1 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <Car size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Car Information
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Make *</label>
                        <input type="text" name="make" value={form.make} onChange={handleChange} placeholder="e.g. Honda" style={{ padding: '12px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Model *</label>
                        <input type="text" name="model" value={form.model} onChange={handleChange} placeholder="e.g. Civic" style={{ padding: '12px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Year *</label>
                        <input type="number" name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2021" style={{ padding: '12px' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>City *</label>
                        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Lahore" style={{ padding: '12px' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Ad Title *</label>
                      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Honda Civic Oriel 2021 For Sale" style={{ padding: '12px' }} />
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                      <button type="button" onClick={() => setStep(2)} className="btn btn-primary" style={{ padding: '12px 40px', borderRadius: '4px', fontWeight: 700 }}>Next Step</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <Camera size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Photos & Details
                  </h3>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '15px' }}>Upload Photos (Max 10)</label>
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                      style={{ 
                        border: '2px dashed #ccc', borderRadius: '8px', padding: '40px', 
                        textAlign: 'center', backgroundColor: isDragging ? '#e6f4f4' : '#fcfcfc',
                        cursor: 'pointer'
                      }}
                      onClick={() => document.getElementById('photo-input').click()}
                    >
                      <input id="photo-input" type="file" multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} style={{ display: 'none' }} />
                      <div style={{ color: 'var(--primary)', marginBottom: '10px' }}><Camera size={40} /></div>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: '#1a3b5d' }}>Add Photos</div>
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>(Drag & Drop or Click to browse)</div>
                    </div>

                    {uploadedPreviews.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                        {uploadedPreviews.map((src, idx) => (
                          <div key={idx} style={{ width: '80px', height: '60px', position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee' }}>
                            <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(255,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', padding: '2px' }}>
                              <Trash2 size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Price (PKR) *</label>
                      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 2500000" style={{ padding: '12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Mileage (km) *</label>
                      <input type="number" name="mileage" value={form.mileage} onChange={handleChange} placeholder="e.g. 45000" style={{ padding: '12px' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Description *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows="5" placeholder="Tell us about your car..." style={{ padding: '12px' }}></textarea>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                    <button type="button" onClick={() => setStep(1)} className="btn" style={{ padding: '12px 30px', border: '1px solid #ccc' }}>Back</button>
                    <button type="button" onClick={() => setStep(3)} className="btn btn-primary" style={{ padding: '12px 40px', borderRadius: '4px', fontWeight: 700 }}>Next Step</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                    <User size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Contact Details
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Full Name *</label>
                      <input type="text" name="sellerName" value={form.sellerName} onChange={handleChange} placeholder="Your Name" style={{ padding: '12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Phone Number *</label>
                      <input type="text" name="sellerPhone" value={form.sellerPhone} onChange={handleChange} placeholder="e.g. 0300 1234567" style={{ padding: '12px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#444', marginBottom: '8px' }}>Email (Optional)</label>
                      <input type="email" name="sellerEmail" value={form.sellerEmail} onChange={handleChange} placeholder="your@email.com" style={{ padding: '12px' }} />
                    </div>
                  </div>

                  {error && (
                    <div style={{ marginTop: '20px', color: '#ff4d4f', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                    <button type="button" onClick={() => setStep(2)} className="btn" style={{ padding: '12px 30px', border: '1px solid #ccc' }}>Back</button>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '12px 40px', borderRadius: '4px', fontWeight: 700 }}>
                      {loading ? 'Posting...' : 'Finish & Submit'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar Tips */}
          <aside>
            <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '8px', padding: '25px', position: 'sticky', top: '100px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#856404', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} /> Ad Posting Tips
              </h4>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#856404', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: '1.4' }}>
                <li><strong>Photos:</strong> Ads with 10+ photos get 5x more views.</li>
                <li><strong>Price:</strong> Check similar cars for market competitive price.</li>
                <li><strong>Details:</strong> Mention service history and any modifications.</li>
                <li><strong>Verification:</strong> Use a reachable phone number for buyers.</li>
              </ul>
              <div style={{ marginTop: '25px', borderTop: '1px solid #ffe58f', paddingTop: '20px', fontSize: '12px', color: '#856404', textAlign: 'center' }}>
                <Shield size={32} style={{ opacity: 0.3, marginBottom: '10px' }} />
                <p>We ensure your safety by verifying buyers and protecting your data.</p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

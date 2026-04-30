import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, CheckCircle, Info, ChevronRight, AlertCircle, 
  MapPin, Tag, Calendar, Gauge, Fuel, Settings, FileText
} from 'lucide-react';

export default function PostAdPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: '',
    make: '',
    model: '',
    version: '',
    year: '',
    registrationCity: '',
    mileage: '',
    price: '',
    color: '',
    description: '',
    phone: '',
    images: []
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Ad posted successfully!');
      navigate('/ads');
    }, 2000);
  };

  const SectionHeader = ({ num, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
      <div style={{ 
        width: '30px', height: '30px', borderRadius: '50%', background: 'var(--primary)', 
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 
      }}>{num}</div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1a3b5d' }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1a3b5d', marginBottom: '10px' }}>Sell your Car with 3 Easy Steps!</h1>
          <p style={{ color: '#666' }}>It's free and always will be.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* 1. Car Information */}
            <div className="card-pakwheels" style={{ padding: '30px' }}>
              <SectionHeader num="1" title="Car Information" />
              <div className="grid grid-2" style={{ gap: '20px' }}>
                <div className="form-group">
                  <label>City *</label>
                  <select required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
                    <option value="">Select City</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Car Make *</label>
                  <select required value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})}>
                    <option value="">Select Make</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Suzuki</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Car Model *</label>
                  <input type="text" placeholder="e.g. Corolla" required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Car Version</label>
                  <input type="text" placeholder="e.g. VTi Oriel" value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Year *</label>
                  <select required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})}>
                    <option value="">Select Year</option>
                    {[2024, 2023, 2022, 2021, 2020].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Registration City</label>
                  <select value={formData.registrationCity} onChange={e => setFormData({...formData, registrationCity: e.target.value})}>
                    <option value="">Unregistered</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mileage (km) *</label>
                  <input type="number" placeholder="e.g. 50000" required value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Exterior Color *</label>
                  <select required value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
                    <option value="">Select Color</option>
                    <option>White</option>
                    <option>Silver</option>
                    <option>Black</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Price (PKR) *</label>
                  <input type="number" placeholder="e.g. 2500000" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Ad Description *</label>
                  <textarea 
                    rows="5" 
                    placeholder="Describe your car (e.g. Condition, features, history)" 
                    required 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 2. Upload Photos */}
            <div className="card-pakwheels" style={{ padding: '30px' }}>
              <SectionHeader num="2" title="Upload Photos" />
              <div style={{ 
                border: '2px dashed #ddd', borderRadius: '8px', padding: '40px', 
                textAlign: 'center', backgroundColor: '#fafafa', cursor: 'pointer' 
              }}>
                <div style={{ color: 'var(--primary)', marginBottom: '15px' }}><Camera size={48} /></div>
                <h4 style={{ fontWeight: 700, marginBottom: '10px' }}>Add Photos</h4>
                <p style={{ fontSize: '13px', color: '#999' }}>(Max limit 5 MB per image)</p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} color="#3bb54a" /> Front View</div>
                  <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} color="#3bb54a" /> Side View</div>
                  <div style={{ fontSize: '12px', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={14} color="#3bb54a" /> Interior</div>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#b73439', marginTop: '15px', fontWeight: 600 }}>
                <AlertCircle size={14} style={{ marginBottom: '-3px', marginRight: '5px' }} />
                Ads with 10+ photos get 5x more views!
              </p>
            </div>

            {/* 3. Contact Information */}
            <div className="card-pakwheels" style={{ padding: '30px' }}>
              <SectionHeader num="3" title="Contact Information" />
              <div className="form-group">
                <label>Mobile Number *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ padding: '0 15px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 700 }}>+92</div>
                  <input type="tel" placeholder="300 1234567" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div style={{ marginTop: '30px' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '15px', fontSize: '18px', fontWeight: 800 }}
                >
                  {loading ? 'Posting Ad...' : 'Post Your Ad'}
                </button>
              </div>
            </div>

          </form>

          {/* Sidebar Tips */}
          <aside>
            <div style={{ backgroundColor: '#e6f4f4', borderRadius: '8px', padding: '25px', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px' }}>How to sell fast?</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#444' }}>
                  <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div><strong>Clear Photos</strong>: High quality photos attract more buyers.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#444' }}>
                  <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div><strong>Market Price</strong>: Set a competitive price to sell quickly.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#444' }}>
                  <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div><strong>Detail Description</strong>: Add details about maintenance and condition.</div>
                </li>
                <li style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#444' }}>
                  <CheckCircle size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div><strong>Honesty</strong>: Be transparent about any defects or issues.</div>
                </li>
              </ul>
              <div style={{ marginTop: '30px', padding: '15px', background: 'white', borderRadius: '4px', textAlign: 'center' }}>
                <Info size={24} color="var(--primary)" style={{ marginBottom: '10px' }} />
                <div style={{ fontSize: '12px', color: '#666' }}>Need help? Call us at <strong>042-111-WHEELS</strong></div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Phone, Calendar, Gauge, Fuel, ShieldAlert, CheckCircle, 
  ChevronLeft, ChevronRight, MapPin, Share2, Heart, Flag,
  Settings, User, Info, MessageCircle, Clock, Award, Wrench
} from 'lucide-react';
import { adsAPI } from '../services/api.js';

export default function AdDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]); // For related ads
  
  const [revealPhone, setRevealPhone] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    const loadAd = async () => {
      try {
        const data = await adsAPI.getAdById(id);
        const adData = data.ad || data;
        setAd({
          ...adData,
          sellerName: adData.user?.name || adData.sellerName,
          sellerPhone: adData.user?.phone || adData.sellerPhone
        });
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error, using mock data:', err);
        setAd({
          id: id || '1',
          title: 'Toyota Corolla Altis 1.6 Special Edition 2022',
          price: '6,500,000',
          city: 'Lahore',
          year: 2022,
          mileage: '15,000',
          fuelType: 'Petrol',
          transmission: 'Automatic',
          engine: '1600 cc',
          color: 'White',
          assembly: 'Local',
          bodyType: 'Sedan',
          description: `First hand, single owner driven car. Bumper to bumper original. 
Low mileage, maintained by Toyota authorized dealership. 
All documents clear, original book and file available.
Seeing is believing. Contact only serious buyers.`,
          features: 'ABS, Air Bags, Air Conditioning, Alloy Rims, AM/FM Radio, CD Player, Immobilizer Key, Power Locks, Power Mirrors, Power Steering, Power Windows',
          sellerName: 'Abdullah Ejaz',
          sellerPhone: '0300-1234567',
          images: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800,https://images.unsplash.com/photo-1542362567-b07e54358753?w=800,https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
        });
        setLoading(false);
      }
    };

    const loadRelated = async () => {
      try {
        const data = await adsAPI.getAds(1, 4);
        setAds(data.ads || []);
      } catch {
        setAds([
          { id: '2', title: 'Honda Civic RS 2024', price: '9,800,000', city: 'Karachi', year: 2024, images: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800' },
          { id: '3', title: 'Suzuki Alto VXL', price: '2,800,000', city: 'Islamabad', year: 2021, images: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' },
          { id: '4', title: 'KIA Sportage AWD', price: '8,200,000', city: 'Lahore', year: 2023, images: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800' },
          { id: '5', title: 'Toyota Fortuner', price: '18,500,000', city: 'Peshawar', year: 2023, images: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800' }
        ]);
      }
    };

    loadAd();
    loadRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--gray-500)' }}>Loading Ad Details...</h2>
      </div>
    );
  }

  const images = (ad.images || '').split(',').filter(Boolean);
  const imageList = images.length > 0 ? images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', paddingBottom: '60px' }}>
      
      {/* Detail Header / Breadcrumbs */}
      <section style={{ backgroundColor: 'var(--white)', padding: '15px 0', borderBottom: '1px solid #e1e1e1' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
            <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> / 
            <Link to="/ads" style={{ color: 'var(--primary)', marginLeft: '5px' }}>Used Cars</Link> / 
            <span style={{ marginLeft: '5px' }}>{ad.title}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>{ad.title}</h1>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none' }}>
                <Share2 size={16} /> Share
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none' }}>
                <Heart size={16} /> Favorite
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#999', fontWeight: 600, background: 'none', border: 'none' }}>
                <Flag size={16} /> Report
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', fontSize: '14px', color: '#666' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} color="var(--primary)" /> {ad.city}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} color="#999" /> Updated about 2 hours ago</span>
          </div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '30px' }}>
        <div className="detail-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px', alignItems: 'start' }}>
          
          {/* Left Column: Media & Info */}
          <div>
            {/* Gallery Card */}
            <div className="card-pakwheels" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '450px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={imageList[activeImageIdx]} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                <button onClick={() => setActiveImageIdx(prev => (prev - 1 + imageList.length) % imageList.length)} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}>
                  <ChevronLeft size={24} />
                </button>
                <button onClick={() => setActiveImageIdx(prev => (prev + 1) % imageList.length)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}>
                  <ChevronRight size={24} />
                </button>
                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '12px' }}>
                  {activeImageIdx + 1} / {imageList.length}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', padding: '15px', overflowX: 'auto', backgroundColor: '#f8f9fa' }}>
                {imageList.map((img, idx) => (
                  <img 
                    key={idx} src={img} 
                    onClick={() => setActiveImageIdx(idx)}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', border: activeImageIdx === idx ? '2px solid var(--primary)' : '2px solid transparent' }} 
                  />
                ))}
              </div>
            </div>

            {/* Main Spec Row (Icon Based) */}
            <div className="card-pakwheels" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '20px 0', marginTop: '20px' }}>
              <div style={{ flex: 1 }}>
                <Calendar size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', color: '#999' }}>Year</div>
                <div style={{ fontWeight: 700, color: '#1a3b5d' }}>{ad.year}</div>
              </div>
              <div style={{ borderLeft: '1px solid #eee' }}></div>
              <div style={{ flex: 1 }}>
                <Gauge size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', color: '#999' }}>Mileage</div>
                <div style={{ fontWeight: 700, color: '#1a3b5d' }}>{ad.mileage?.toLocaleString()} km</div>
              </div>
              <div style={{ borderLeft: '1px solid #eee' }}></div>
              <div style={{ flex: 1 }}>
                <Fuel size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', color: '#999' }}>Fuel Type</div>
                <div style={{ fontWeight: 700, color: '#1a3b5d' }}>{ad.fuelType || 'Petrol'}</div>
              </div>
              <div style={{ borderLeft: '1px solid #eee' }}></div>
              <div style={{ flex: 1 }}>
                <Settings size={28} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '12px', color: '#999' }}>Transmission</div>
                <div style={{ fontWeight: 700, color: '#1a3b5d' }}>{ad.transmission}</div>
              </div>
            </div>

            {/* Detailed Specs Table */}
            <div className="card-pakwheels" style={{ marginTop: '20px', padding: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Vehicle Specifications</h3>
              <div className="grid grid-2" style={{ gap: '0 40px' }}>
                {[
                  { label: 'Registered City', value: ad.city },
                  { label: 'Color', value: ad.color || 'White' },
                  { label: 'Engine Capacity', value: ad.engine || '1600 cc' },
                  { label: 'Assembly', value: ad.assembly || 'Local' },
                  { label: 'Body Type', value: ad.bodyType || 'Sedan' },
                  { label: 'Last Updated', value: '2 hours ago' }
                ].map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f8f9fa', fontSize: '14px' }}>
                    <span style={{ color: '#666' }}>{spec.label}</span>
                    <span style={{ fontWeight: 600, color: '#1a3b5d' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="card-pakwheels" style={{ marginTop: '20px', padding: '25px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Seller's Description</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#444', whiteSpace: 'pre-wrap' }}>
                {ad.description || 'No detailed description available for this vehicle.'}
              </p>
            </div>

            {/* Features */}
            {ad.features && (
              <div className="card-pakwheels" style={{ marginTop: '20px', padding: '25px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Car Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  {ad.features.split(',').map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1a3b5d', fontWeight: 600 }}>
                      <CheckCircle size={16} color="var(--primary)" /> {f.trim()}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Seller & Contact */}
          <div>
            {/* Price Card */}
            <div className="card-pakwheels" style={{ textAlign: 'center', padding: '25px', marginBottom: '20px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)' }}>PKR {ad.price}</div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>Managed by XtremeDrive <Award size={14} color="var(--primary)" /></div>
            </div>

            {/* Seller Contact Card */}
            <div className="card-pakwheels" style={{ padding: '25px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px' }}>Seller Information</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 700 }}>
                  {ad.sellerName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: '#1a3b5d' }}>{ad.sellerName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={12} /> Verified Seller
                  </div>
                </div>
              </div>
              
              {!revealPhone ? (
                <button 
                  onClick={() => setRevealPhone(true)}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <Phone size={20} /> Show Phone Number
                </button>
              ) : (
                <div style={{ textAlign: 'center', padding: '14px', backgroundColor: '#e6f4f4', color: 'var(--primary)', borderRadius: '4px', fontWeight: 700, fontSize: '20px' }}>
                  {ad.sellerPhone}
                </div>
              )}
              
              <button className="btn" style={{ width: '100%', marginTop: '15px', padding: '14px', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <MessageCircle size={20} /> Chat with Seller
              </button>
            </div>

            {/* Safety Tips Card */}
            <div style={{ backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '4px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#856404', fontWeight: 700, marginBottom: '10px', fontSize: '14px' }}>
                <ShieldAlert size={18} /> Safety Tips for Buyers
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '12px', color: '#856404', lineHeight: '1.6' }}>
                <li>Do not pay advance payment</li>
                <li>Meet seller in public place</li>
                <li>Verify vehicle documents before buying</li>
                <li>Check car in daylight</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Related Ads */}
        <div style={{ marginTop: '50px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1a3b5d', marginBottom: '25px' }}>Similar Used Cars</h2>
          <div className="grid grid-4">
            {ads.map(item => (
              <Link 
                to={`/ads/${item.id}`} 
                key={item.id} 
                className="card-pakwheels hover-lift" 
                style={{ cursor: 'pointer' }}
              >
                <img src={item.images.split(',')[0]} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1a3b5d', marginBottom: '8px' }}>{item.title}</h4>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>PKR {item.price}</div>
                  <div style={{ fontSize: '11px', color: '#999' }}>{item.city} | {item.year}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

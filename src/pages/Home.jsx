import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Car, Bike, Settings, CheckCircle, Smartphone, Play, 
  Users, Shield, DollarSign, FileText, Briefcase, ChevronRight, 
  MapPin, Tag, Star, Award, Zap, Globe, Wrench, Package
} from 'lucide-react';
import { adsAPI } from '../services/api.js';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);
  const [ads, setAds] = useState([]);
  const [featuredTab, setFeaturedTab] = useState('popular'); 
  const [activeComparison, setActiveComparison] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const mockMakes = ['Toyota', 'Honda', 'Suzuki', 'KIA', 'Hyundai', 'Nissan'];
    const mockCities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Peshawar'];
    
    setMakes(mockMakes);
    setCities(mockCities);

    const loadAds = async () => {
      try {
        const data = await adsAPI.getAds(1, 8);
        const normalized = (data.ads || []).map((ad, index) => ({
          ...ad,
          featured: Boolean(ad.featured ?? index % 3 === 0),
          image: (ad.images || '').split(',')[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'
        }));
        setAds(normalized);
      } catch (err) {
        console.error('API Error:', err);
        setAds([
          { id: 1, title: 'Toyota Corolla Altis 1.6', price: '6,500,000', city: 'Lahore', year: 2022, mileage: '15,000', featured: true, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800' },
          { id: 2, title: 'Honda Civic RS 2024', price: '9,800,000', city: 'Karachi', year: 2024, mileage: '1,200', featured: true, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800' },
          { id: 3, title: 'Suzuki Alto VXL', price: '2,800,000', city: 'Islamabad', year: 2021, mileage: '35,000', featured: false, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' },
          { id: 4, title: 'KIA Sportage AWD', price: '8,200,000', city: 'Lahore', year: 2023, mileage: '8,500', featured: true, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800' }
        ]);
      }
    };

    loadAds();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/ads?category=CAR`;
    if (selectedMake) url += `&make=${selectedMake}`;
    if (selectedCity) url += `&city=${selectedCity}`;
    if (searchQuery) url += `&search=${searchQuery}`;
    navigate(url);
  };

  const offerings = [
    { title: 'Car Inspection', desc: 'Get a comprehensive report', icon: <Search size={32} />, color: '#EBF8FF' },
    { title: 'Car Insurance', desc: 'Secure your ride', icon: <Shield size={32} />, color: '#F0FFF4' },
    { title: 'Car Finance', desc: 'Easy monthly installments', icon: <DollarSign size={32} />, color: '#FFF5F5' },
    { title: 'Auction Sheet', desc: 'Verify Japanese cars', icon: <FileText size={32} />, color: '#FAF5FF' },
  ];

  const browseCategories = [
    { title: 'Japanese Cars', count: '12k+', icon: <Globe size={24} /> },
    { title: '1000cc Cars', count: '8k+', icon: <Zap size={24} /> },
    { title: 'Imported Cars', count: '5k+', icon: <Package size={24} /> },
    { title: 'Automatic Cars', count: '15k+', icon: <Settings size={24} /> },
    { title: '660cc Cars', count: '4k+', icon: <Zap size={24} /> },
    { title: 'Big Cars', count: '7k+', icon: <Car size={24} /> },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      
      {/* Hero Search Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '15px' }}>Find Used Cars in Pakistan</h1>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>With thousands of cars, we have just the right one for you</p>
          
          <div className="glass" style={{ padding: '25px', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                type="text" placeholder="Car Make or Model" 
                style={{ flex: 2, minWidth: '200px' }}
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select style={{ flex: 1, minWidth: '150px' }} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">All Cities</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <select style={{ flex: 1, minWidth: '150px' }} value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">Price Range</option>
                <option value="0-10">Under 10 Lacs</option>
                <option value="10-20">10 - 20 Lacs</option>
                <option value="20-50">20 - 50 Lacs</option>
                <option value="50+">Above 50 Lacs</option>
              </select>
              <button type="submit" className="btn" style={{ background: '#3bb54a', color: 'white', padding: '0 30px', fontSize: '18px' }}>
                <Search size={20} />
              </button>
            </form>
            <div style={{ marginTop: '15px', textAlign: 'left' }}>
              <Link to="/ads" style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Advanced Filter &gt;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#1a3b5d' }}>Sell Your Car on XtremeDrive</h2>
          <div className="grid grid-2" style={{ gap: '40px' }}>
            <div className="card-pakwheels" style={{ padding: '30px', display: 'flex', gap: '20px', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ color: 'var(--primary)' }}><Tag size={48} /></div>
              <div>
                <h3 style={{ color: '#1a3b5d', marginBottom: '10px' }}>Post your Ad on XtremeDrive</h3>
                <ul style={{ paddingLeft: '20px', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                  <li>Post your Ad for Free in 3 Easy Steps</li>
                  <li>Get Genuine offers from Verified Buyers</li>
                  <li>Sell your car Fast at the Best Price</li>
                </ul>
                <button className="btn btn-primary" onClick={() => navigate('/post-ad')}>Post Your Ad</button>
              </div>
            </div>
            <div className="card-pakwheels" style={{ padding: '30px', display: 'flex', gap: '20px', borderLeft: '4px solid #b73439' }}>
              <div style={{ color: '#b73439' }}><Shield size={48} /></div>
              <div>
                <h3 style={{ color: '#1a3b5d', marginBottom: '10px' }}>Try XtremeDrive Sell It For Me</h3>
                <ul style={{ paddingLeft: '20px', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                  <li>Dedicated Sales Expert to Sell your Car</li>
                  <li>We Take Care of Advertising & Buyers</li>
                  <li>We Ensure Safe & Secure Transaction</li>
                </ul>
                <button className="btn" style={{ background: '#b73439', color: 'white' }}>Register Your Car</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Used Cars Categories */}
      <section className="section-padding" style={{ backgroundColor: '#f2f3f3' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Browse Used Cars</h2>
            <Link to="/ads" style={{ color: 'var(--primary)', fontWeight: 600 }}>View All Used Cars</Link>
          </div>
          <div className="horizontal-scroll">
            {browseCategories.map((cat, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ minWidth: '180px', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a3b5d' }}>{cat.title}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{cat.count} Ads</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Featured Used Cars for Sale</h2>
            <Link to="/ads?featured=true" style={{ color: 'var(--primary)', fontWeight: 600 }}>View all featured cars</Link>
          </div>
          
          <div className="tabs-pakwheels">
            <div className={`tab-item ${featuredTab === 'popular' ? 'active' : ''}`} onClick={() => setFeaturedTab('popular')}>Popular</div>
            <div className={`tab-item ${featuredTab === 'upcoming' ? 'active' : ''}`} onClick={() => setFeaturedTab('upcoming')}>Upcoming</div>
            <div className={`tab-item ${featuredTab === 'newly' ? 'active' : ''}`} onClick={() => setFeaturedTab('newly')}>Newly Launched</div>
          </div>

          <div className="grid grid-4">
            {ads.map(ad => (
              <Link to={`/ads/${ad.id}`} key={ad.id} className="card-pakwheels hover-lift">
                <div style={{ position: 'relative' }}>
                  <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                  {ad.featured && <span className="badge-featured" style={{ position: 'absolute', top: '10px', left: '10px' }}>Featured</span>}
                </div>
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: 700, marginBottom: '5px' }}>{ad.title}</h4>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#1a3b5d', marginBottom: '8px' }}>PKR {ad.price}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{ad.city}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Managed by XtremeDrive */}
      <section className="section-padding" style={{ backgroundColor: '#f2f3f3' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield style={{ color: 'var(--primary)' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Managed by XtremeDrive</h2>
            </div>
            <Link to="/ads" style={{ color: 'var(--primary)', fontWeight: 600 }}>View all managed cars</Link>
          </div>
          <p style={{ color: '#666', marginBottom: '30px' }}>Cars inspected and managed by our experts for your peace of mind</p>
          <div className="horizontal-scroll">
            {ads.map(ad => (
              <Link to={`/ads/${ad.id}`} key={ad.id} className="card-pakwheels hover-lift" style={{ minWidth: '260px' }}>
                <img src={ad.image} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <div className="managed-badge"><CheckCircle size={14} /> Xtreme Managed</div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>{ad.title}</h4>
                  <div style={{ fontWeight: 800, color: '#1a3b5d' }}>PKR {ad.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Cars by Make */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '40px' }}>New Cars by Make</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
            {['Suzuki', 'Toyota', 'Honda', 'KIA', 'Hyundai', 'Changan'].map(make => (
              <Link to={`/ads?make=${make}`} key={make} className="card-pakwheels hover-lift" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#666' }}>{make}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Cars Section */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Compare Cars</h2>
            <Link to="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>View all comparisons</Link>
          </div>
          <div className="grid grid-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-pakwheels" style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <img src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '5px' }}>Corolla</div>
                  </div>
                  <div style={{ background: 'var(--primary)', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px', zIndex: 1 }}>VS</div>
                  <div style={{ flex: 1 }}>
                    <img src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=200" style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '5px' }}>Civic</div>
                  </div>
                </div>
                <button className="btn btn-outline-primary" style={{ width: '100%', fontSize: '14px' }}>View Comparison</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XtremeDrive Offerings */}
      <section className="section-padding" style={{ backgroundColor: '#f2f3f3' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '40px' }}>XtremeDrive Offerings</h2>
          <div className="grid grid-4">
            {offerings.map((off, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '30px', textAlign: 'center', background: off.color }}>
                <div style={{ color: '#1a3b5d', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{off.icon}</div>
                <h4 style={{ fontWeight: 700, color: '#1a3b5d', marginBottom: '10px' }}>{off.title}</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>{off.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, Car, Bike, Settings, CheckCircle, Smartphone, Play, 
  Users, Shield, DollarSign, FileText, Briefcase, ChevronRight, 
  MapPin, Tag, Star, Award, Zap, Globe
} from 'lucide-react';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);
  const [ads, setAds] = useState([]);
  const [featuredTab, setFeaturedTab] = useState('popular'); // popular, upcoming, newly
  const [activeComparison, setActiveComparison] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/makes')
      .then(res => res.json())
      .then(data => setMakes(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/cities')
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/ads')
      .then(res => res.json())
      .then(data => setAds(data.slice(0, 8)))
      .catch(err => console.error(err));
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
    { title: 'Japanese Cars', count: '12,450', icon: <Car size={24} /> },
    { title: '1000cc Cars', count: '8,200', icon: <Zap size={24} /> },
    { title: 'Imported Cars', count: '5,100', icon: <Globe size={24} /> },
    { title: 'Automatic Cars', count: '15,000', icon: <Settings size={24} /> },
    { title: 'Low Mileage', count: '3,200', icon: <Award size={24} /> },
    { title: 'SUV / 4x4', count: '4,500', icon: <Car size={24} /> },
  ];

  const brands = [
    { name: 'Suzuki', img: 'https://img.icons8.com/color/96/suzuki.png' },
    { name: 'Toyota', img: 'https://img.icons8.com/color/96/toyota.png' },
    { name: 'Honda', img: 'https://img.icons8.com/color/96/honda.png' },
    { name: 'Kia', img: 'https://img.icons8.com/color/96/kia.png' },
    { name: 'Hyundai', img: 'https://img.icons8.com/color/96/hyundai.png' },
    { name: 'Changan', img: 'https://img.icons8.com/color/96/changan.png' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3' }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 0',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '24px' }}>Find Used Cars in Pakistan</h1>
          <p style={{ fontSize: '18px', marginBottom: '40px' }}>With thousands of cars, we have just the right one for you</p>
          
          <div className="glass" style={{
            background: 'var(--white)',
            padding: '10px',
            borderRadius: '4px',
            display: 'flex',
            gap: '5px',
            boxShadow: 'var(--shadow-xl)',
            alignItems: 'center'
          }}>
            <input 
              type="text" 
              placeholder="Car Make or Model" 
              style={{ border: 'none', borderRadius: '0', flex: 2, height: '45px', color: 'var(--black)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select style={{ border: 'none', borderLeft: '1px solid #eee', borderRadius: '0', flex: 1, height: '45px', color: 'var(--black)' }}
              value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select style={{ border: 'none', borderLeft: '1px solid #eee', borderRadius: '0', flex: 1, height: '45px', color: 'var(--black)' }}
              value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">Price Range</option>
              <option value="10">Under 10 Lacs</option>
              <option value="20">10 - 20 Lacs</option>
            </select>
            <button 
              onClick={handleSearch}
              className="btn btn-primary" 
              style={{ borderRadius: '4px', height: '45px', padding: '0 30px' }}
            >
              <Search size={20} />
            </button>
          </div>
          <Link to="#" style={{ display: 'block', marginTop: '15px', color: 'var(--white)', fontSize: '14px', fontWeight: 600 }}>
            Advanced Filter &gt;
          </Link>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', marginBottom: '40px', color: '#1a3b5d' }}>Sell Your Car on XtremeDrive and Get the Best Price</h2>
          <div className="grid grid-2" style={{ gap: '40px' }}>
            <div className="card-pakwheels" style={{ padding: '40px', position: 'relative' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Post your Ad on XtremeDrive</h3>
              <ul style={{ listStyle: 'none', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> Post your Ad for Free in 3 Steps</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> Get Genuine offers from Verified Buyers</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> Sell your car Fast at the Best Price</li>
              </ul>
              <button onClick={() => navigate('/post-ad')} className="btn btn-primary" style={{ padding: '12px 40px', borderRadius: '4px', fontWeight: 700 }}>
                Post Your Ad
              </button>
              <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
                <Car size={100} />
              </div>
            </div>

            <div className="card-pakwheels" style={{ padding: '40px', position: 'relative' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Try XtremeDrive Sell It For Me</h3>
              <ul style={{ listStyle: 'none', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> Dedicated Sales Expert to Sell your Car</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> We Handle all Aspects from Listing to Sale</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle size={18} color="var(--primary)" /> We Ensure Safe & Secure Transaction</li>
              </ul>
              <button className="btn" style={{ backgroundColor: '#007bff', color: 'white', padding: '12px 40px', borderRadius: '4px', fontWeight: 700 }}>
                Register Your Car
              </button>
              <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
                <Users size={100} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Used Cars Categories */}
      <section style={{ backgroundColor: 'var(--white)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Browse Used Cars</h2>
            <Link to="/ads" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>View all used cars</Link>
          </div>
          
          <div className="horizontal-scroll">
            {browseCategories.map((cat, index) => (
              <div key={index} style={{ 
                minWidth: '180px', textAlign: 'center', padding: '20px', 
                backgroundColor: '#f8f9fa', borderRadius: '8px', cursor: 'pointer' 
              }}>
                <div style={{ color: 'var(--primary)', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                  {cat.icon}
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '5px' }}>{cat.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{cat.count} Ads</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XtremeDrive Offerings */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '40px', color: '#1a3b5d' }}>XtremeDrive Offerings</h2>
          <div className="grid grid-4">
            {offerings.map((off, index) => (
              <div key={index} className="card-pakwheels" style={{ padding: '30px', textAlign: 'center', backgroundColor: off.color, border: 'none' }}>
                <div style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  {off.icon}
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{off.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{off.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed by XtremeDrive */}
      <section style={{ backgroundColor: 'var(--white)', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Managed by XtremeDrive</h2>
              <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>VERIFIED</span>
            </div>
            <Link to="/ads" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>View all managed cars</Link>
          </div>

          <div className="grid grid-4">
            {ads.map(ad => (
              <div key={ad.id} className="card-pakwheels hover-lift" onClick={() => navigate(`/ads/${ad.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: '160px' }}>
                  <img src={ad.images.split(',')[0]} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="badge-featured" style={{ position: 'absolute', top: '10px', left: '10px' }}>Featured</div>
                </div>
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#1a3b5d' }}>{ad.title}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '16px', marginBottom: '10px' }}>PKR {ad.price.toLocaleString()}</p>
                  <div style={{ fontSize: '12px', color: 'var(--gray-500)', display: 'flex', gap: '10px' }}>
                    <span>{ad.city}</span>
                    <span>{ad.year}</span>
                    <span>{ad.mileage?.toLocaleString()} km</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured New Cars Tabs */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '30px', color: '#1a3b5d' }}>Featured New Cars</h2>
          <div className="tabs-pakwheels">
            <div className={`tab-item ${featuredTab === 'popular' ? 'active' : ''}`} onClick={() => setFeaturedTab('popular')}>Popular</div>
            <div className={`tab-item ${featuredTab === 'upcoming' ? 'active' : ''}`} onClick={() => setFeaturedTab('upcoming')}>Upcoming</div>
            <div className={`tab-item ${featuredTab === 'newly' ? 'active' : ''}`} onClick={() => setFeaturedTab('newly')}>Newly Launched</div>
          </div>

          <div className="grid grid-4">
            {ads.slice(0, 4).map((ad, idx) => (
              <div key={idx} className="card-pakwheels" style={{ textAlign: 'center', padding: '20px' }}>
                <img src={ad.images.split(',')[0]} alt={ad.title} style={{ width: '100%', height: '120px', objectFit: 'contain', marginBottom: '15px' }} />
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>{ad.title}</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 700 }}>PKR {ad.price.toLocaleString()}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= 4 ? "#f5a623" : "none"} color="#f5a623" />)}
                  <span style={{ fontSize: '11px', color: '#999' }}>(150 Reviews)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Cars by Make */}
      <section style={{ backgroundColor: 'var(--white)', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '40px', textAlign: 'center', color: '#1a3b5d' }}>New Cars by Make</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
            {brands.map(brand => (
              <div key={brand.name} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/new-cars`)}>
                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
                  <img src={brand.img} alt={brand.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto Store Accessories */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>XtremeDrive Auto Store</h2>
            <Link to="/ads?category=AUTOPART" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 600 }}>View all accessories</Link>
          </div>
          <div className="grid grid-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="card-pakwheels" style={{ padding: '15px' }}>
                <img src={`https://images.unsplash.com/photo-1611245831313-149497638853?w=400&auto=format&fit=crop`} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} />
                <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '5px' }}>Premium Alloy Rims</h4>
                <p style={{ color: 'var(--primary)', fontWeight: 700 }}>PKR 45,000</p>
                <button className="btn" style={{ width: '100%', marginTop: '15px', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '13px', padding: '8px' }}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare Cars Section */}
      <section className="section-padding" style={{ backgroundColor: '#f2f3f3' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '10px', color: '#1a3b5d' }}>Compare Cars</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '40px' }}>Choose the right car by comparing specs side by side</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { car1: 'Toyota Corolla', car2: 'Honda Civic', img1: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200', img2: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200' },
              { car1: 'Suzuki Alto', car2: 'Suzuki Cultus', img1: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200', img2: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200' }
            ].map((comp, index) => (
              <div
                key={index}
                className="card-pakwheels hover-lift"
                style={{
                  padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '20px', position: 'relative', cursor: 'pointer'
                }}
              >
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={comp.img1} alt={comp.car1} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#1a3b5d' }}>{comp.car1}</div>
                </div>
                <div style={{
                  backgroundColor: 'var(--primary)', color: 'var(--white)', width: '32px', height: '32px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '12px', zIndex: 1
                }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={comp.img2} alt={comp.car2} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#1a3b5d' }}>{comp.car2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Bikes by Make */}
      <section style={{ backgroundColor: 'var(--white)', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '40px', textAlign: 'center', color: '#1a3b5d' }}>New Bikes by Make</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
            {brands.slice(0, 3).map(brand => (
              <div key={brand.name} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/bikes`)}>
                <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginBottom: '10px' }}>
                  <img src={brand.img} alt={brand.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section style={{ background: 'linear-gradient(135deg, #043b3a 0%, var(--black) 100%)', color: 'var(--white)', padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '20px' }}>Get the XtremeDrive App</h2>
            <p style={{ color: '#ccc', marginBottom: '30px' }}>Buy & Sell faster and easier with our mobile app. Download now!</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <img src="https://w7.pngwing.com/pngs/314/367/png-transparent-google-play-apple-app-store-android-get-started-now-button-text-logo-google-play.png" style={{ height: '45px', cursor: 'pointer' }} />
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" style={{ height: '45px', cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Smartphone size={200} style={{ color: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>
      </section>

    </div>
  );
}

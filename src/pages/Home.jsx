import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car, Bike, Settings, CheckCircle, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);
  const [ads, setAds] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CAR');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
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
      .then(data => setAds(data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/ads?category=${selectedCategory}`;
    if (selectedMake) url += `&make=${selectedMake}`;
    if (selectedCity) url += `&city=${selectedCity}`;
    if (searchQuery) url += `&search=${searchQuery}`;
    navigate(url);
  };

  const brandList = ['Toyota', 'Honda', 'Suzuki', 'Kia', 'Hyundai', 'Changan'];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--black) 0%, #064E4D 100%)',
        color: 'var(--white)',
        padding: '80px 0',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '16px', color: 'var(--white)' }}>
            Find Your Dream Ride in Pakistan
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--gray-300)', marginBottom: '40px' }}>
            Browse thousands of used and new cars, bikes, and auto parts.
          </p>

          {/* Search Card */}
          <div className="glass" style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '30px',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-xl)',
          }}>
            {/* Category Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              {[
                { id: 'CAR', label: 'Cars', icon: <Car size={18} /> },
                { id: 'BIKE', label: 'Bikes', icon: <Bike size={18} /> },
                { id: 'AUTOPART', label: 'Auto Parts', icon: <Settings size={18} /> }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
                    borderRadius: 'var(--border-radius-full)', fontWeight: 600, fontSize: '15px',
                    background: selectedCategory === cat.id ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--white)', transition: 'all 0.3s'
                  }}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px', alignItems: 'end'
            }}>
              <div>
                <input
                  type="text" placeholder="Search Make or Model..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: 'var(--border-radius-md)' }}
                />
              </div>

              <div>
                <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: 'var(--border-radius-md)' }}>
                  <option value="">All Makes</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: 'var(--border-radius-md)' }}>
                  <option value="">All Cities</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ height: '48px', width: '100%', fontSize: '16px' }}>
                <Search size={20} /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Value Added Services: Car Inspection */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px', alignItems: 'center'
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop"
              alt="Car Inspection"
              style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <BadgeCheck size={20} /> XtremeDrive Certifications
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>
              XtremeDrive Car Inspection
            </h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '24px', fontSize: '16px', lineHeight: '1.7' }}>
              Don't buy a accidental car. Get a 200+ point comprehensive inspection report from our certified experts at your doorstep.
            </p>
            <button onClick={() => alert('Inspection Service Booking coming soon!')} className="btn btn-primary hover-lift" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Book Inspection Now
            </button>
          </div>
        </div>
      </section>

      {/* New Cars by Make Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>New Cars by Make</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: '40px' }}>Explore available models from official brands in Pakistan</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
            {brandList.map(brand => (
              <div
                key={brand}
                onClick={() => navigate(`/new-cars`)}
                className="hover-lift"
                style={{
                  padding: '24px', backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                  borderRadius: 'var(--border-radius-md)', cursor: 'pointer', fontWeight: 600, fontSize: '18px'
                }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px', alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Want to Sell Fast?</h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '24px', fontSize: '16px' }}>
              Post your ad for FREE on XtremeDrive and reach thousands of potential buyers every day.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px', fontWeight: 500 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={20} style={{ color: 'var(--primary)' }} /> 100% Free Ad Posting</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={20} style={{ color: 'var(--primary)' }} /> Secure and Verified Buyers</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={20} style={{ color: 'var(--primary)' }} /> Professional Photography Assistance</li>
            </ul>
            <button onClick={() => navigate('/post-ad')} className="btn btn-black hover-lift" style={{ padding: '14px 32px', fontSize: '16px' }}>
              Post Your Ad
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop"
              alt="Sell Car"
              style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Featured Ads</h2>
            <button onClick={() => navigate('/ads')} style={{ color: 'var(--primary)', fontWeight: 600 }}>View All</button>
          </div>

          <div className="grid grid-4">
            {ads.map(ad => (
              <div
                key={ad.id}
                className="hover-lift"
                onClick={() => navigate(`/ads/${ad.id}`)}
                style={{
                  background: 'var(--white)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden',
                  cursor: 'pointer', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={ad.images.split(',')[0]} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px', backgroundColor: ad.condition === 'New' ? '#D97706' : 'var(--primary)',
                    color: 'var(--white)', padding: '4px 10px', borderRadius: 'var(--border-radius-full)', fontSize: '12px', fontWeight: 600
                  }}>
                    {ad.condition}
                  </span>
                </div>
                
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ad.title}
                  </h3>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>
                    PKR {ad.price.toLocaleString()}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray-500)', borderTop: '1px solid var(--gray-100)', paddingTop: '12px' }}>
                    <span>{ad.city}</span>
                    {ad.year && <span>{ad.year}</span>}
                    {ad.mileage && <span>{ad.mileage.toLocaleString()} km</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

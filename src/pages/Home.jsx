import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Car, Bike, Settings, CheckCircle, Smartphone, Play, Users } from 'lucide-react';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);
  const [ads, setAds] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('CAR');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const [activeComparison, setActiveComparison] = useState(null);
  
  const navigate = useNavigate();

  const comparisonSpecs = {
    'Toyota Corolla': { engine: '1800cc', power: '138 hp', fuel: 'Petrol', transmission: 'CVT', price: 'PKR 7.5 Million', seats: '5' },
    'Honda Civic': { engine: '1500cc Turbo', power: '176 hp', fuel: 'Petrol', transmission: 'CVT', price: 'PKR 8.6 Million', seats: '5' },
    'Suzuki Alto': { engine: '660cc', power: '39 hp', fuel: 'Petrol', transmission: 'Manual/AGS', price: 'PKR 2.3 Million', seats: '4' },
    'Suzuki Cultus': { engine: '1000cc', power: '67 hp', fuel: 'Petrol', transmission: 'Manual/AGS', price: 'PKR 3.8 Million', seats: '5' }
  };

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

  const autoStoreItems = [
    { title: 'Alloy Rims', price: '45,000', img: 'https://images.unsplash.com/photo-1611245831313-149497638853?w=400', search: 'rims' },
    { title: 'LED Headlights', price: '8,500', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400', search: 'led' },
    { title: 'Seat Covers', price: '12,000', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400', search: 'covers' },
    { title: 'Android Panel', price: '15,000', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400', search: 'panel' }
  ];

  const popularComparisons = [
    { car1: 'Toyota Corolla', car2: 'Honda Civic', img1: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200', img2: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200' },
    { car1: 'Suzuki Alto', car2: 'Suzuki Cultus', img1: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200', img2: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200' }
  ];

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

      {/* 1. New Cars by Make Section */}
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

      {/* 2. Featured Ads */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-50)' }}>
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

      {/* 3. Auto Store Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Auto Parts & Accessories</h2>
            <button onClick={() => navigate('/ads?category=AUTOPART')} style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse Store</button>
          </div>

          <div className="grid grid-4">
            {autoStoreItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/ads?category=AUTOPART&search=${item.search}`)}
                className="hover-lift"
                style={{
                  background: 'var(--white)', borderRadius: 'var(--border-radius-md)', overflow: 'hidden',
                  cursor: 'pointer', border: '1px solid var(--gray-200)', boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ height: '160px', backgroundColor: 'var(--gray-100)' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 700 }}>PKR {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Comparison Section (PakWheels Style) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Compare Cars</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: '40px' }}>Choose the right car by comparing specs side by side</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {popularComparisons.map((comp, index) => (
              <div
                key={index}
                className="hover-lift"
                onClick={() => setActiveComparison(comp)}
                style={{
                  backgroundColor: 'var(--white)', padding: '30px', borderRadius: 'var(--border-radius-md)',
                  border: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '20px', position: 'relative', cursor: 'pointer'
                }}
              >
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={comp.img1} alt={comp.car1} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--gray-900)' }}>{comp.car1}</div>
                </div>
                <div style={{
                  backgroundColor: 'var(--primary)', color: 'var(--white)', width: '36px', height: '36px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '14px', zIndex: 1
                }}>VS</div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={comp.img2} alt={comp.car2} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--gray-900)' }}>{comp.car2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Want to Sell Fast Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
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
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop"
              alt="Sell Car"
              style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)' }}
            />
          </div>
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #043b3a 0%, var(--black) 100%)', color: 'var(--white)' }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px', alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Get the XtremeDrive App</h2>
            <p style={{ color: 'var(--gray-300)', marginBottom: '24px', fontSize: '16px' }}>
              Buy & Sell faster and easier from your smartphone. Track listings on the go.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} /> App Store
              </button>
              <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Play size={20} /> Google Play
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '120px', color: 'rgba(255,255,255,0.1)' }}>
            < Smartphone size={200} />
          </div>
        </div>
      </section>

      {/* Specifications Comparison Modal */}
      {activeComparison && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            zIndex: 1000, padding: '20px' 
          }} 
          onClick={() => setActiveComparison(null)}
        >
          <div 
            style={{ 
              backgroundColor: 'var(--white)', padding: '30px', borderRadius: '16px', 
              maxWidth: '600px', width: '100%', boxShadow: 'var(--shadow-2xl)', 
              position: 'relative', animation: 'scaleUp 0.3s ease' 
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActiveComparison(null)} 
              style={{ 
                position: 'absolute', top: '16px', right: '16px', border: 'none', 
                background: 'transparent', fontSize: '24px', cursor: 'pointer', color: 'var(--gray-400)' 
              }}
            >
              &times;
            </button>
            
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px', color: 'var(--gray-900)', textAlign: 'center' }}>
              Vehicle Specs Comparison
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', textAlign: 'center' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: 700 }}>{activeComparison.car1}</h4>
              </div>
              <div>
                <h4 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: 700 }}>{activeComparison.car2}</h4>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['price', 'engine', 'power', 'fuel', 'transmission', 'seats'].map(spec => {
                 const val1 = comparisonSpecs[activeComparison.car1]?.[spec] || 'N/A';
                 const val2 = comparisonSpecs[activeComparison.car2]?.[spec] || 'N/A';
                 return (
                   <div key={spec} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '12px 0', borderBottom: '1px solid var(--gray-100)', position: 'relative' }}>
                     <span style={{ 
                       position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', 
                       backgroundColor: 'var(--gray-100)', padding: '2px 8px', borderRadius: '4px', 
                       fontSize: '11px', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase' 
                     }}>
                       {spec}
                     </span>
                     <div style={{ textAlign: 'center', fontWeight: 600, color: 'var(--gray-800)', fontSize: '14px' }}>{val1}</div>
                     <div style={{ textAlign: 'center', fontWeight: 600, color: 'var(--gray-800)', fontSize: '14px' }}>{val2}</div>
                   </div>
                 );
              })}
            </div>

            <button 
              onClick={() => setActiveComparison(null)} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '30px', padding: '12px' }}
            >
              Close Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

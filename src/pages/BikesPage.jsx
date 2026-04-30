import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, MapPin, X, ChevronRight, Settings, 
  Bike, Shield, Zap, Tool, Award, Star
} from 'lucide-react';

export default function BikesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [condition, setCondition] = useState('Used');
  const [selectedCity, setSelectedCity] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/ads?category=BIKE')
      .then(res => res.json())
      .then(data => setListings(data.slice(0, 8)))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/ads?category=BIKE&condition=${condition}`;
    if (selectedCity) url += `&city=${selectedCity}`;
    if (searchQuery) url += `&search=${searchQuery}`;
    navigate(url);
  };

  const brands = [
    { name: 'Honda', img: 'https://img.icons8.com/color/96/honda.png' },
    { name: 'Yamaha', img: 'https://img.icons8.com/color/96/yamaha.png' },
    { name: 'Suzuki', img: 'https://img.icons8.com/color/96/suzuki.png' },
    { name: 'United', img: 'https://img.icons8.com/color/96/motorcycle.png' },
    { name: 'Road Prince', img: 'https://img.icons8.com/color/96/motorcycle.png' },
  ];

  const popularNewBikes = [
    { name: 'Honda CD 70', price: '157,900', engine: '70cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
    { name: 'Yamaha YBR 125', price: '466,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
    { name: 'Honda CG 125', price: '234,900', engine: '125cc', img: 'https://images.unsplash.com/photo-1558981457-4b0598a39f99?w=400' },
    { name: 'Suzuki GD 110S', price: '352,000', engine: '110cc', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Bike Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>Find New & Used Bikes in Pakistan</h1>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>Browse from over 10,000+ bike listings</p>
          
          <div className="glass" style={{ background: 'white', padding: '10px', borderRadius: '4px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <input 
              type="text" placeholder="Bike Make or Model" 
              style={{ border: 'none', flex: 2, height: '45px', color: 'black' }}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select style={{ border: 'none', borderLeft: '1px solid #eee', flex: 1, height: '45px', color: 'black' }}
              value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">All Cities</option>
              {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={handleSearch} className="btn btn-primary" style={{ padding: '0 30px', height: '45px', borderRadius: '4px' }}>
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* New Bikes by Brand */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px', textAlign: 'center' }}>New Bikes by Brand</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {brands.map(brand => (
              <div key={brand.name} className="card-pakwheels hover-lift" style={{ textAlign: 'center', padding: '20px', cursor: 'pointer' }} onClick={() => navigate('/ads?category=BIKE&make=' + brand.name)}>
                <img src={brand.img} alt={brand.name} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '15px' }} />
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#1a3b5d' }}>{brand.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured New Bikes */}
      <section style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Featured New Bikes</h2>
            <Link to="/ads?category=BIKE&condition=New" style={{ color: 'var(--primary)', fontWeight: 600 }}>View all new bikes</Link>
          </div>
          <div className="grid grid-4">
            {popularNewBikes.map((bike, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={bike.img} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1a3b5d', marginBottom: '5px' }}>{bike.name}</h4>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '15px' }}>PKR {bike.price}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '10px' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= 4 ? "#f5a623" : "none"} color="#f5a623" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Used Bikes by City */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px' }}>Used Bikes by City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad', 'Gujranwala'].map(city => (
              <div 
                key={city} 
                className="card-pakwheels hover-lift" 
                style={{ padding: '15px', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                onClick={() => navigate(`/ads?category=BIKE&city=${city}`)}
              >
                <MapPin size={16} color="var(--primary)" />
                <span style={{ fontWeight: 600 }}>Bikes in {city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bike Accessories */}
      <section style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Bike Accessories & Parts</h2>
            <Link to="/ads?category=AUTOPART" style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse Store</Link>
          </div>
          <div className="grid grid-4">
            {[
              { name: 'Helmets', img: 'https://images.unsplash.com/photo-1590528709736-233668854839?w=400' },
              { name: 'Engine Oil', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
              { name: 'Security Alarms', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
              { name: 'Tyres', img: 'https://images.unsplash.com/photo-1611245831313-149497638853?w=400' }
            ].map((item, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={item.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }}>{item.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

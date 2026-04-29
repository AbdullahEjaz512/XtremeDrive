import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bike, MapPin, CheckCircle } from 'lucide-react';

export default function BikesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [condition, setCondition] = useState('Used');
  const [selectedCity, setSelectedCity] = useState('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch all ads and filter for BIKE
    fetch('http://localhost:5000/api/ads?category=BIKE')
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/ads?category=BIKE&condition=${condition}`;
    if (selectedCity) url += `&city=${selectedCity}`;
    if (searchQuery) url += `&search=${searchQuery}`;
    navigate(url);
  };

  const makes = ['Honda', 'Yamaha', 'Suzuki', 'United', 'Road Prince'];
  const popularBikes = [
    { name: 'Honda CG 125', price: '234,900', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop' },
    { name: 'Yamaha YBR 125', price: '466,000', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&auto=format&fit=crop' },
    { name: 'Honda CD 70', price: '157,900', img: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=400&auto=format&fit=crop' },
    { name: 'Suzuki GS 150', price: '382,000', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400&auto=format&fit=crop' }
  ];

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--black) 0%, #043b3a 100%)',
        color: 'var(--white)',
        padding: '60px 0',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '12px' }}>
            Find Used & New Bikes in Pakistan
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--gray-300)', marginBottom: '30px' }}>
            Browse thousands of bikes or post a free ad to sell yours!
          </p>

          {/* Search Card */}
          <div style={{
            backgroundColor: 'var(--white)',
            padding: '24px',
            borderRadius: 'var(--border-radius-md)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            {/* Condition Tabs */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              {['Used', 'New'].map(type => (
                <button
                  key={type}
                  onClick={() => setCondition(type)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: 'var(--border-radius-full)',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '1px solid var(--gray-200)',
                    backgroundColor: condition === type ? 'var(--primary)' : 'var(--white)',
                    color: condition === type ? 'var(--white)' : 'var(--gray-700)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {type} Bikes
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '16px' }}>
              <input
                type="text"
                placeholder="Bike Make or Model (e.g. Honda 125)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: '1px solid var(--gray-200)',
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '15px'
                }}
              />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  border: '1px solid var(--gray-200)',
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '15px'
                }}
              >
                <option value="">All Cities</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <button type="submit" className="btn btn-primary" style={{ padding: '0 20px', fontSize: '15px' }}>
                <Search size={18} /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular New Bikes */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)' }}>Popular New Bikes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {popularBikes.map(bike => (
            <div
              key={bike.name}
              onClick={() => navigate(`/ads?category=BIKE&search=${bike.name.split(' ')[1]}`)}
              className="hover-lift"
              style={{
                backgroundColor: 'var(--white)',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-200)',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div style={{ height: '160px', backgroundColor: 'var(--gray-100)', position: 'relative' }}>
                <img src={bike.img} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{bike.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: 600 }}>PKR {bike.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Bikes by Make */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)' }}>New Bikes by Make</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {makes.map(make => (
            <div
              key={make}
              onClick={() => navigate(`/ads?category=BIKE&make=${make}`)}
              className="hover-lift"
              style={{
                padding: '20px',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-md)',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '18px'
              }}
            >
              {make}
            </div>
          ))}
        </div>
      </section>

      {/* Used Bikes by City */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)' }}>Used Bikes by City</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {cities.map(city => (
            <div
              key={city}
              onClick={() => navigate(`/ads?category=BIKE&city=${city}`)}
              className="hover-lift"
              style={{
                padding: '12px 24px',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-full)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 500
              }}
            >
              <MapPin size={16} style={{ color: 'var(--primary)' }} />
              {city}
            </div>
          ))}
        </div>
      </section>

      {/* Recent Bike Listings */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)' }}>Recent Bike Listings</h2>
        {listings.length === 0 ? (
          <p style={{ color: 'var(--gray-500)', fontStyle: 'italic' }}>No active bike listings found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {listings.map(ad => (
              <div
                key={ad.id}
                className="hover-lift"
                onClick={() => navigate(`/ads/${ad.id}`)}
                style={{
                  background: 'var(--white)',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--gray-200)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  <img
                    src={ad.images.split(',')[0]}
                    alt={ad.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: ad.condition === 'New' ? '#D97706' : 'var(--primary)',
                    color: 'var(--white)',
                    padding: '4px 10px',
                    borderRadius: 'var(--border-radius-full)',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    {ad.condition}
                  </span>
                </div>
                
                <div style={{ padding: '16px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: 'var(--gray-900)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {ad.title}
                  </h3>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary)', marginBottom: '12px' }}>
                    PKR {ad.price.toLocaleString()}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: 'var(--gray-500)',
                    borderTop: '1px solid var(--gray-100)',
                    paddingTop: '12px'
                  }}>
                    <span>{ad.city}</span>
                    <span>{ad.mileage ? `${ad.mileage.toLocaleString()} km` : 'New'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

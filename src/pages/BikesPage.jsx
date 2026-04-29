import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X, ChevronRight, Settings } from 'lucide-react';

export default function BikesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [condition, setCondition] = useState('Used');
  const [selectedCity, setSelectedCity] = useState('');
  const [listings, setListings] = useState([]);

  // Brand expansion state
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [expandedCondition, setExpandedCondition] = useState('New');

  useEffect(() => {
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
  
  const bikeModels = {
    Honda: ['CD 70', 'CG 125', 'Pridor', 'CB 125F', 'CB 150F'],
    Yamaha: ['YBR 125', 'YBR 125G', 'YB 125Z'],
    Suzuki: ['GS 150', 'GR 150', 'GSX 125', 'GD 110S'],
    United: ['US 70', 'US 100', 'US 125'],
    'Road Prince': ['RP 70', 'RP 110', 'RP 125']
  };

  const newBikeCatalog = {
    Honda: [
      { name: 'Honda CD 70', price: '157,900', engine: '70cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'Honda CG 125', price: '234,900', engine: '125cc', img: 'https://images.unsplash.com/photo-1558981457-4b0598a39f99?w=400' },
      { name: 'Honda Pridor', price: '208,900', engine: '100cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'Honda CB 125F', price: '390,900', engine: '125cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'Honda CB 150F', price: '493,900', engine: '150cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' }
    ],
    Yamaha: [
      { name: 'Yamaha YBR 125', price: '466,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
      { name: 'Yamaha YBR 125G', price: '485,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
      { name: 'Yamaha YB 125Z', price: '424,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' }
    ],
    Suzuki: [
      { name: 'Suzuki GD 110S', price: '352,000', engine: '110cc', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400' },
      { name: 'Suzuki GS 150', price: '382,000', engine: '150cc', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400' },
      { name: 'Suzuki GR 150', price: '547,000', engine: '150cc', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400' },
      { name: 'Suzuki GSX 125', price: '499,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400' }
    ],
    United: [
      { name: 'United US 70', price: '109,500', engine: '70cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'United US 100', price: '117,000', engine: '100cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'United US 125', price: '165,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' }
    ],
    'Road Prince': [
      { name: 'Road Prince RP 70', price: '109,500', engine: '70cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'Road Prince RP 110', price: '119,500', engine: '110cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' },
      { name: 'Road Prince RP 125', price: '165,000', engine: '125cc', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400' }
    ]
  };

  const popularBikes = [
    { name: 'Honda CG 125', price: '234,900', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop' },
    { name: 'Yamaha YBR 125', price: '466,000', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&auto=format&fit=crop' },
    { name: 'Honda CD 70', price: '157,900', img: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=400&auto=format&fit=crop' },
    { name: 'Suzuki GS 150', price: '382,000', img: 'https://images.unsplash.com/photo-1471450411576-17c058114bfc?w=400&auto=format&fit=crop' }
  ];

  const bikeAccessories = [
    { name: 'Bike Parts', search: 'Parts', icon: '🔧' },
    { name: 'Bike Accessories', search: 'Accessories', icon: '🎒' },
    { name: 'Bike Exhaust', search: 'Exhaust', icon: '💨' },
    { name: 'Bike Helmet', search: 'Helmet', icon: '🪖' },
    { name: 'Bike Air Filter', search: 'Filter', icon: '🌪️' },
    { name: 'Bike Brake Shoe', search: 'Brake', icon: '🛑' },
    { name: 'Bike Gloves', search: 'Gloves', icon: '🧤' },
    { name: 'Bike Headlights', search: 'Headlight', icon: '💡' },
    { name: 'All Purpose Cleaner', search: 'Cleaner', icon: '🧴' },
    { name: 'Microfiber Cloth', search: 'Cloth', icon: '🧹' },
    { name: 'Engine Oil', search: 'Oil', icon: '🛢️' },
    { name: 'GPS Tracker', search: 'Tracker', icon: '📍' }
  ];

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'];

  const handleBrandClick = (brandName, type) => {
    setExpandedBrand(brandName);
    setExpandedCondition(type);
  };

  const handleModelSelect = (modelName) => {
    // ONLY for used bikes, redirect to filtering ads
    navigate(`/ads?category=BIKE&condition=Used&make=${expandedBrand}&search=${modelName}`);
    setExpandedBrand(null);
  };

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

      {/* Brand Overlay Selector */}
      {expandedBrand && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 110, display: 'flex',
          alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: 'var(--white)', padding: '30px', borderRadius: 'var(--border-radius-lg)',
            maxWidth: '650px', width: '90%', maxHeight: '80vh', overflowY: 'auto',
            boxShadow: 'var(--shadow-2xl)', position: 'relative'
          }}>
            <button onClick={() => setExpandedBrand(null)} style={{
              position: 'absolute', top: '20px', right: '20px', color: 'var(--gray-500)',
              background: 'none', border: 'none', cursor: 'pointer'
            }}>
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: 'var(--black)' }}>
              {expandedBrand} - Available {expandedCondition} Bikes
            </h3>

            {expandedCondition === 'New' ? (
              /* New Bike Catalog Showroom style */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {newBikeCatalog[expandedBrand]?.map(bike => (
                  <div
                    key={bike.name}
                    style={{
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--border-radius-md)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--gray-50)'
                    }}
                  >
                    <div style={{ height: '140px', backgroundColor: 'var(--gray-200)' }}>
                      <img src={bike.img} alt={bike.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--black)' }}>{bike.name}</h4>
                      <p style={{ fontSize: '13px', color: 'var(--gray-500)', margin: '4px 0' }}>Engine: {bike.engine}</p>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)', marginTop: '8px' }}>
                        PKR {bike.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Used Bike Models array style (links to search ads) */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bikeModels[expandedBrand]?.map(model => (
                  <div
                    key={model}
                    onClick={() => handleModelSelect(model)}
                    className="hover-lift"
                    style={{
                      padding: '16px 20px', backgroundColor: 'var(--gray-50)',
                      borderRadius: 'var(--border-radius-md)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontWeight: 600, border: '1px solid var(--gray-200)'
                    }}
                  >
                    <span>{model}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--primary)' }}>
                      View Ads <ChevronRight size={18} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

      {/* Bike Accessories Section */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={26} style={{ color: 'var(--primary)' }} />
          Bike Accessories
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '20px'
        }}>
          {bikeAccessories.map(acc => (
            <div
              key={acc.name}
              onClick={() => navigate(`/ads?category=AUTOPART&search=${acc.search}`)}
              className="hover-lift"
              style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-md)',
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.target.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{acc.icon}</div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-800)' }}>{acc.name}</h4>
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
              onClick={() => handleBrandClick(make, 'New')}
              className="hover-lift"
              style={{
                padding: '24px 20px',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-md)',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '18px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.borderColor = 'var(--gray-200)'}
            >
              {make}
            </div>
          ))}
        </div>
      </section>

      {/* Used Bikes by Make */}
      <section className="container" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--black)' }}>Used Bikes by Make</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {makes.map(make => (
            <div
              key={make}
              onClick={() => handleBrandClick(make, 'Used')}
              className="hover-lift"
              style={{
                padding: '24px 20px',
                backgroundColor: 'var(--white)',
                border: '1px solid var(--gray-200)',
                borderRadius: 'var(--border-radius-md)',
                textAlign: 'center',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '18px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.target.style.borderColor = 'var(--primary)'}
              onMouseOut={(e) => e.target.style.borderColor = 'var(--gray-200)'}
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

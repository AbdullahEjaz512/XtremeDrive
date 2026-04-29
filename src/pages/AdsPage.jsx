import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Sliders, ChevronDown } from 'lucide-react';

export default function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);

  // Filter states
  const category = searchParams.get('category') || '';
  const make = searchParams.get('make') || '';
  const city = searchParams.get('city') || '';
  const condition = searchParams.get('condition') || '';
  const search = searchParams.get('search') || '';
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    // Build API query string
    let query = 'http://localhost:5000/api/ads?';
    if (category) query += `category=${category}&`;
    if (make) query += `make=${make}&`;
    if (city) query += `city=${city}&`;
    if (condition) query += `condition=${condition}&`;
    if (search) query += `search=${search}&`;
    if (minPrice) query += `minPrice=${minPrice}&`;
    if (maxPrice) query += `maxPrice=${maxPrice}&`;

    fetch(query)
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error(err));
  }, [searchParams, category, make, city, condition, search]);

  useEffect(() => {
    fetch('http://localhost:5000/api/makes')
      .then(res => res.json())
      .then(data => setMakes(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/cities')
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error(err));
  }, []);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (minPrice) newParams.set('minPrice', minPrice);
    else newParams.delete('minPrice');
    if (maxPrice) newParams.set('maxPrice', maxPrice);
    else newParams.delete('maxPrice');
    setSearchParams(newParams);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Page Header */}
      <section style={{ backgroundColor: 'var(--white)', borderBottom: '1px solid var(--gray-200)', padding: '30px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: 'var(--black)' }}>
            Browse {category ? `${category.charAt(0) + category.slice(1).toLowerCase()}s` : 'Listings'}
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
            Showing {ads.length} ads
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding" style={{ backgroundColor: 'var(--gray-50)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
        }}>
          {/* Sidebar Filters */}
          <div style={{
            backgroundColor: 'var(--white)',
            padding: '24px',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--gray-200)',
            height: 'fit-content',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>
              <Sliders size={20} style={{ color: 'var(--primary)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Filters</h3>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>Category</label>
              <select value={category} onChange={(e) => updateFilter('category', e.target.value)}>
                <option value="">All Categories</option>
                <option value="CAR">Cars</option>
                <option value="BIKE">Bikes</option>
                <option value="AUTOPART">Auto Parts</option>
              </select>
            </div>

            {/* Make Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>Make</label>
              <select value={make} onChange={(e) => updateFilter('make', e.target.value)}>
                <option value="">All Makes</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* City Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>City</label>
              <select value={city} onChange={(e) => updateFilter('city', e.target.value)}>
                <option value="">All Cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Condition Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>Condition</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['New', 'Used'].map(cond => (
                  <button
                    key={cond}
                    onClick={() => updateFilter('condition', condition === cond ? '' : cond)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontWeight: 600,
                      fontSize: '13px',
                      backgroundColor: condition === cond ? 'var(--primary)' : 'var(--gray-100)',
                      color: condition === cond ? 'var(--white)' : 'var(--gray-700)',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>Price Range (PKR)</label>
              <form onSubmit={handlePriceSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} style={{ padding: '8px', fontSize: '13px' }} />
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} style={{ padding: '8px', fontSize: '13px' }} />
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 12px', fontSize: '13px', borderRadius: 'var(--border-radius-sm)' }}>Go</button>
              </form>
            </div>

            {/* Clear All */}
            <button
              onClick={() => {
                setSearchParams({});
                setMinPrice('');
                setMaxPrice('');
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--border-radius-md)',
                color: 'var(--gray-500)',
                fontWeight: 600,
                fontSize: '14px',
                textAlign: 'center',
                border: '1px dashed var(--gray-300)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { e.target.style.backgroundColor = 'var(--gray-50)'; e.target.style.color = 'var(--black)' }}
              onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--gray-500)' }}
            >
              Clear All Filters
            </button>
          </div>

          {/* Listings */}
          <div style={{ gridColumn: 'span 2' }}>
            {ads.length === 0 ? (
              <div style={{
                textAlign: 'center',
                backgroundColor: 'var(--white)',
                padding: '60px',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-200)',
              }}>
                <Search size={48} style={{ color: 'var(--gray-400)', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '8px' }}>No Ads Found</h3>
                <p style={{ color: 'var(--gray-500)' }}>Try clearing your filters or posting a new ad!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {ads.map(ad => (
                  <div
                    key={ad.id}
                    className="hover-lift"
                    onClick={() => navigate(`/ads/${ad.id}`)}
                    style={{
                      backgroundColor: 'var(--white)',
                      borderRadius: 'var(--border-radius-md)',
                      border: '1px solid var(--gray-200)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      flex: '1 1 250px',
                      height: '200px',
                      position: 'relative'
                    }}>
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

                    <div style={{
                      flex: '2 1 300px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--black)' }}>
                          {ad.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {ad.description}
                        </p>
                      </div>

                      <div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px' }}>
                          PKR {ad.price.toLocaleString()}
                        </div>

                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '12px 24px',
                          fontSize: '13px',
                          color: 'var(--gray-600)',
                          borderTop: '1px solid var(--gray-100)',
                          paddingTop: '12px'
                        }}>
                          <span><strong>City:</strong> {ad.city}</span>
                          {ad.year && <span><strong>Year:</strong> {ad.year}</span>}
                          {ad.mileage && <span><strong>Mileage:</strong> {ad.mileage.toLocaleString()} km</span>}
                          {ad.fuelType && <span><strong>Fuel:</strong> {ad.fuelType}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

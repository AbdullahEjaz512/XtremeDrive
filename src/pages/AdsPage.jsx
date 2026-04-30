import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Search, Filter, Sliders, ChevronDown, MapPin, 
  Calendar, Gauge, Fuel, Settings, User, 
  CheckCircle, ChevronRight, X
} from 'lucide-react';

export default function AdsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [makes, setMakes] = useState([]);
  const [cities, setCities] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  // Filter states from URL
  const category = searchParams.get('category') || '';
  const make = searchParams.get('make') || '';
  const city = searchParams.get('city') || '';
  const condition = searchParams.get('condition') || '';
  const search = searchParams.get('search') || '';
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
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
      .then(data => {
        // Simple client-side sorting for demo
        let sorted = [...data];
        if (sortBy === 'price_low') sorted.sort((a, b) => a.price - b.price);
        if (sortBy === 'price_high') sorted.sort((a, b) => b.price - a.price);
        setAds(sorted);
      })
      .catch(err => console.error(err));
  }, [searchParams, sortBy]);

  useEffect(() => {
    fetch('http://localhost:5000/api/makes').then(res => res.json()).then(setMakes);
    fetch('http://localhost:5000/api/cities').then(res => res.json()).then(setCities);
  }, []);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const removeFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  const activeFilters = [];
  if (category) activeFilters.push({ key: 'category', label: category });
  if (make) activeFilters.push({ key: 'make', label: make });
  if (city) activeFilters.push({ key: 'city', label: city });
  if (condition) activeFilters.push({ key: 'condition', label: condition });

  return (
    <div style={{ backgroundColor: '#f2f3f3', minHeight: '100vh', animation: 'fadeIn 0.5s ease' }}>
      
      {/* Search Header / Breadcrumbs */}
      <section style={{ backgroundColor: 'var(--white)', padding: '20px 0', borderBottom: '1px solid #e1e1e1' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
            <Link to="/" style={{ color: 'var(--primary)' }}>Home</Link> / 
            <Link to="/ads" style={{ color: 'var(--primary)', marginLeft: '5px' }}>Used Cars</Link> / 
            <span style={{ marginLeft: '5px' }}>{make || 'All Makes'}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>
            {make ? `${make} Cars for Sale in Pakistan` : 'Used Cars for Sale in Pakistan'}
          </h1>
        </div>
      </section>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px', padding: '30px 0' }}>
        
        {/* Sidebar Filters - Accordion Style */}
        <aside>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '4px', border: '1px solid #e1e1e1', overflow: 'hidden' }}>
            <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#1a3b5d' }}>Show Results By:</span>
              <button onClick={() => setSearchParams({})} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>Clear All</button>
            </div>

            {/* Price Filter */}
            <div style={{ borderBottom: '1px solid #eee', padding: '15px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                Price Range (PKR) <ChevronDown size={16} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number" placeholder="Min" value={minPrice} 
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ flex: 1, padding: '8px', fontSize: '12px', border: '1px solid #ddd' }}
                />
                <input 
                  type="number" placeholder="Max" value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ flex: 1, padding: '8px', fontSize: '12px', border: '1px solid #ddd' }}
                />
                <button 
                  onClick={() => {
                    const p = new URLSearchParams(searchParams);
                    if (minPrice) p.set('minPrice', minPrice);
                    if (maxPrice) p.set('maxPrice', maxPrice);
                    setSearchParams(p);
                  }}
                  className="btn btn-primary" style={{ padding: '0 12px', borderRadius: '4px' }}>Go</button>
              </div>
            </div>

            {/* Make Filter */}
            <div style={{ borderBottom: '1px solid #eee', padding: '15px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '15px' }}>Make</div>
              <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {makes.map(m => (
                  <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" checked={make === m} 
                      onChange={() => updateFilter('make', make === m ? '' : m)} 
                    /> {m}
                  </label>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div style={{ borderBottom: '1px solid #eee', padding: '15px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '15px' }}>City</div>
              <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cities.map(c => (
                  <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" checked={city === c} 
                      onChange={() => updateFilter('city', city === c ? '' : c)} 
                    /> {c}
                  </label>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div style={{ padding: '15px' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '15px' }}>Condition</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['New', 'Used'].map(cond => (
                  <label key={cond} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" checked={condition === cond} 
                      onChange={() => updateFilter('condition', condition === cond ? '' : cond)} 
                    /> {cond}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main>
          {/* Active Filters & Sort */}
          <div style={{ backgroundColor: 'var(--white)', padding: '15px', borderRadius: '4px', border: '1px solid #e1e1e1', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeFilters.length > 0 ? (
                activeFilters.map(f => (
                  <span key={f.key} style={{ 
                    backgroundColor: '#eee', padding: '4px 10px', borderRadius: '20px', 
                    fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' 
                  }}>
                    {f.label} <X size={14} style={{ cursor: 'pointer' }} onClick={() => removeFilter(f.key)} />
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '13px', color: '#666' }}>Showing all listings</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: '#666' }}>Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '5px', fontSize: '13px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Ad Listings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ads.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0', backgroundColor: 'var(--white)', borderRadius: '4px' }}>
                <Search size={48} color="#ccc" style={{ marginBottom: '20px' }} />
                <h3 style={{ color: '#1a3b5d' }}>No cars found matching your criteria</h3>
                <p style={{ color: '#666' }}>Try adjusting your filters or clear all</p>
              </div>
            ) : (
              ads.map(ad => (
                <div 
                  key={ad.id} 
                  className="card-pakwheels hover-lift" 
                  onClick={() => navigate(`/ads/${ad.id}`)}
                  style={{ display: 'grid', gridTemplateColumns: '250px 1fr', overflow: 'hidden', cursor: 'pointer', padding: '0' }}
                >
                  <div style={{ position: 'relative' }}>
                    <img src={ad.images.split(',')[0]} alt={ad.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 8px', fontSize: '11px', borderRadius: '2px' }}>
                      {ad.images.split(',').length} Photos
                    </div>
                  </div>
                  
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1a3b5d', marginBottom: '10px' }}>{ad.title}</h3>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>PKR {ad.price.toLocaleString()}</div>
                          <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Updated 2 hours ago</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} color="var(--primary)" /> {ad.city}</span>
                        <span>{ad.year}</span>
                        <span>{ad.mileage?.toLocaleString()} km</span>
                        <span>{ad.fuelType || 'Petrol'}</span>
                        <span>Manual</span>
                      </div>
                      
                      <p style={{ fontSize: '13px', color: '#666', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                        {ad.description || 'No description provided for this vehicle.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
                        <User size={14} /> Individual
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn" style={{ padding: '6px 15px', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>
                          View Number
                        </button>
                        <button className="btn btn-primary" style={{ padding: '6px 15px', fontSize: '12px', fontWeight: 600 }}>
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Placeholder */}
          {ads.length > 0 && (
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button style={{ padding: '8px 15px', border: '1px solid #ddd', backgroundColor: 'white', borderRadius: '4px' }}>Previous</button>
              <button style={{ padding: '8px 15px', border: '1px solid var(--primary)', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '4px' }}>1</button>
              <button style={{ padding: '8px 15px', border: '1px solid #ddd', backgroundColor: 'white', borderRadius: '4px' }}>2</button>
              <button style={{ padding: '8px 15px', border: '1px solid #ddd', backgroundColor: 'white', borderRadius: '4px' }}>Next</button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

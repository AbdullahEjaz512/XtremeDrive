import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Search, Filter, MapPin, Calendar, Gauge, Fuel, 
  Settings, ChevronDown, Grid, List, Heart, Phone, X, Save
} from 'lucide-react';

export default function AdsPage() {
  const location = useLocation();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list'); // list or grid
  const [activeFilters, setActiveFilters] = useState([]);

  // Filter States
  const [keyword, setKeyword] = useState('');
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedTransmission, setSelectedTransmission] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filters = [];
    params.forEach((value, key) => filters.push({ key, value }));
    setActiveFilters(filters);

    setLoading(true);
    fetch(`http://localhost:5000/api/ads${location.search}`)
      .then(res => res.json())
      .then(data => {
        setAds(data);
        setLoading(false);
      })
      .catch(() => {
        // Mock Data Fallback
        setAds([
          { id: 1, title: 'Toyota Corolla Altis 1.6', price: '6,500,000', city: 'Lahore', year: 2022, mileage: '15,000', fuel: 'Petrol', transmission: 'Automatic', engine: '1600cc', featured: true, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800' },
          { id: 2, title: 'Honda Civic RS 2024', price: '9,800,000', city: 'Karachi', year: 2024, mileage: '1,200', fuel: 'Petrol', transmission: 'Automatic', engine: '1500cc', featured: true, image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800' },
          { id: 3, title: 'Suzuki Alto VXL', price: '2,800,000', city: 'Islamabad', year: 2021, mileage: '35,000', fuel: 'Petrol', transmission: 'Manual', engine: '660cc', featured: false, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' },
          { id: 4, title: 'KIA Sportage AWD', price: '8,200,000', city: 'Lahore', year: 2023, mileage: '8,500', fuel: 'Petrol', transmission: 'Automatic', engine: '2000cc', featured: true, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800' },
          { id: 5, title: 'Toyota Fortuner Legender', price: '18,500,000', city: 'Peshawar', year: 2023, mileage: '5,000', fuel: 'Diesel', transmission: 'Automatic', engine: '2800cc', featured: true, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800' }
        ]);
        setLoading(false);
      });
  }, [location.search]);

  const FilterSection = ({ title, children }) => (
    <div style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#333' }}>{title}</h4>
        <ChevronDown size={14} color="#999" />
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ backgroundColor: '#f2f3f3', minHeight: '100vh', padding: '30px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
        
        {/* Sidebar Filters */}
        <aside style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Show Results By:</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input 
                type="text" placeholder="Search by Keyword" 
                style={{ height: '35px', fontSize: '13px', padding: '0 10px', flex: 1 }}
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-primary" style={{ padding: '0 15px', height: '35px' }}>Go</button>
            </div>
          </div>

          <FilterSection title="Make">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {['Toyota', 'Honda', 'Suzuki', 'KIA', 'Hyundai'].map(make => (
                <li key={make} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#666' }}>
                  <input type="checkbox" /> {make}
                </li>
              ))}
            </ul>
          </FilterSection>

          <FilterSection title="Price Range">
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <input type="number" placeholder="Min" style={{ height: '35px', padding: '0 8px' }} />
              <span>-</span>
              <input type="number" placeholder="Max" style={{ height: '35px', padding: '0 8px' }} />
            </div>
          </FilterSection>

          <FilterSection title="Year">
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <select style={{ height: '35px', padding: '0 8px', flex: 1, fontSize: '12px' }}>
                <option>Min Year</option>
                {[2024,2023,2022,2021,2020].map(y => <option key={y}>{y}</option>)}
              </select>
              <select style={{ height: '35px', padding: '0 8px', flex: 1, fontSize: '12px' }}>
                <option>Max Year</option>
                {[2024,2023,2022,2021,2020].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </FilterSection>

          <FilterSection title="Transmission">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {['Automatic', 'Manual'].map(t => (
                <li key={t} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#666' }}>
                  <input type="checkbox" /> {t}
                </li>
              ))}
            </ul>
          </FilterSection>

          <FilterSection title="Engine Type">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              {['Petrol', 'Diesel', 'Hybrid', 'CNG'].map(f => (
                <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#666' }}>
                  <input type="checkbox" /> {f}
                </li>
              ))}
            </ul>
          </FilterSection>
        </aside>

        {/* Main Content */}
        <main>
          {/* Header & Sorting */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Used Cars for Sale in Pakistan</h1>
                <p style={{ fontSize: '14px', color: '#666' }}>Showing {ads.length} of {ads.length * 10} Results</p>
              </div>
              <button className="btn btn-outline-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <Save size={16} /> Save Search
              </button>
            </div>

            {/* Active Filters */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {activeFilters.map((f, i) => (
                <div key={i} style={{ background: '#eee', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 700 }}>{f.key}:</span> {f.value}
                  <X size={12} style={{ cursor: 'pointer' }} />
                </div>
              ))}
              {activeFilters.length > 0 && <button style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 700 }}>Clear All</button>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button onClick={() => setViewMode('list')} style={{ color: viewMode === 'list' ? 'var(--primary)' : '#999' }}><List size={20} /></button>
                <button onClick={() => setViewMode('grid')} style={{ color: viewMode === 'grid' ? 'var(--primary)' : '#999' }}><Grid size={20} /></button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <span>Sort by:</span>
                <select style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <option>Updated Date: Recent First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Mileage: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ads.map(ad => (
              <div key={ad.id} className="card-pakwheels" style={{ display: 'flex', padding: '0', position: 'relative' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                  <img src={ad.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  {ad.featured && (
                    <div style={{
                      position: 'absolute', top: '15px', left: '-5px',
                      background: '#f5a623', color: 'white', padding: '2px 15px',
                      fontSize: '11px', fontWeight: 800, transform: 'rotate(-45deg)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>FEATURED</div>
                  )}
                </div>
                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Link to={`/ads/${ad.id}`}><h3 style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 700 }}>{ad.title}</h3></Link>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#1a3b5d' }}>PKR {ad.price}</div>
                  </div>
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>{ad.city}</div>
                  
                  {/* Spec Icons Row */}
                  <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '13px', marginBottom: 'auto' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {ad.year}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Gauge size={14} /> {ad.mileage} km</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Fuel size={14} /> {ad.fuel}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Settings size={14} /> {ad.transmission}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <span style={{ fontSize: '12px', color: '#999' }}>Updated 2 hours ago</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn" style={{ padding: '8px', color: '#999' }}><Heart size={20} /></button>
                      <button className="btn" style={{ 
                        background: '#3bb54a', color: 'white', padding: '8px 20px', 
                        fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' 
                      }}>
                        <Phone size={16} /> Show Phone No.
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, Star, ChevronRight, 
  Settings, Zap, Shield, Award, Package, Filter
} from 'lucide-react';

export default function AutoStorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Car Care', icon: '🧼', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
    { name: 'Electronics', icon: '📺', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400' },
    { name: 'Exterior', icon: '🚗', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' },
    { name: 'Interior', icon: '💺', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400' }
  ];

  const featuredParts = [
    { name: 'Shell Helix Ultra 5W-40', price: '12,500', rating: 4.8, reviews: 124, img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
    { name: 'Android Panel for Civic', price: '25,000', rating: 4.5, reviews: 86, img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400' },
    { name: 'LED Headlight Bulbs', price: '4,500', rating: 4.2, reviews: 52, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' },
    { name: '7D Floor Mats', price: '8,500', rating: 4.7, reviews: 210, img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Store Hero */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1486006920555-c77dcf18193b?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '15px' }}>Pakistan's Largest Auto Store</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>Original Parts & Accessories delivered at your doorstep</p>
          
          <div className="glass" style={{ background: 'white', padding: '10px', borderRadius: '4px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <input 
              type="text" placeholder="Search for Parts, Oil, Accessories..." 
              style={{ border: 'none', flex: 1, height: '45px', color: 'black' }}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => navigate(`/ads?category=AUTOPART&search=${searchQuery}`)} className="btn btn-primary" style={{ padding: '0 30px', height: '45px', borderRadius: '4px' }}>
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px' }}>Shop by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {categories.map((cat, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/ads?category=AUTOPART&search=${cat.name}`)}>
                <img src={cat.img} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '15px', textAlign: 'center', fontWeight: 700, color: '#1a3b5d' }}>
                  {cat.icon} {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Best Selling Items</h2>
            <Link to="/ads?category=AUTOPART" style={{ color: 'var(--primary)', fontWeight: 600 }}>View All Store</Link>
          </div>
          <div className="grid grid-4">
            {featuredParts.map((part, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
                <img src={part.img} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1a3b5d', marginBottom: '10px', height: '40px', overflow: 'hidden' }}>{part.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= 4 ? "#f5a623" : "none"} color="#f5a623" />)}
                    </div>
                    <span style={{ fontSize: '12px', color: '#999' }}>({part.reviews})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>PKR {part.price}</div>
                    <button className="btn" style={{ padding: '8px', borderRadius: '50%', background: '#f2f3f3', color: 'var(--primary)' }}>
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Features */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#e6f4f4', padding: '15px', borderRadius: '50%', color: 'var(--primary)' }}><Package size={24} /></div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1a3b5d' }}>Free Delivery</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>On all orders above PKR 5,000</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#e6f4f4', padding: '15px', borderRadius: '50%', color: 'var(--primary)' }}><Shield size={24} /></div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1a3b5d' }}>Safe Payment</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>100% secure payment methods</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#e6f4f4', padding: '15px', borderRadius: '50%', color: 'var(--primary)' }}><Award size={24} /></div>
              <div>
                <h4 style={{ fontWeight: 700, color: '#1a3b5d' }}>Authentic Parts</h4>
                <p style={{ fontSize: '13px', color: '#666' }}>Genuine parts with warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

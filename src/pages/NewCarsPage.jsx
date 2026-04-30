import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, Car, Search, Shield, DollarSign, 
  Settings, Award, Star, Info, Zap
} from 'lucide-react';

const brandsData = [
  { name: 'Suzuki', img: 'https://img.icons8.com/color/96/suzuki.png' },
  { name: 'Toyota', img: 'https://img.icons8.com/color/96/toyota.png' },
  { name: 'Honda', img: 'https://img.icons8.com/color/96/honda.png' },
  { name: 'Kia', img: 'https://img.icons8.com/color/96/kia.png' },
  { name: 'Hyundai', img: 'https://img.icons8.com/color/96/hyundai.png' },
  { name: 'Changan', img: 'https://img.icons8.com/color/96/changan.png' },
];

const popularNewCars = [
  { name: 'Toyota Corolla', price: '61.7 - 75.5 Lacs', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
  { name: 'Honda Civic', price: '83.3 - 99.0 Lacs', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' },
  { name: 'Suzuki Alto', price: '23.3 - 30.5 Lacs', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
  { name: 'Kia Sportage', price: '73.0 - 90.0 Lacs', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' }
];

export default function NewCarsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* New Car Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px' }}>Find New Cars in Pakistan</h1>
          <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9 }}>Get latest prices, specs and features of all new cars</p>
          
          <div className="glass" style={{ background: 'white', padding: '10px', borderRadius: '4px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            <input 
              type="text" placeholder="Car Make or Model (e.g. Corolla)" 
              style={{ border: 'none', flex: 2, height: '45px', color: 'black' }}
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={() => navigate(`/ads?category=CAR&condition=New&search=${searchQuery}`)} className="btn btn-primary" style={{ padding: '0 30px', height: '45px', borderRadius: '4px' }}>
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* New Cars by Brand Logo Grid */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px', textAlign: 'center' }}>New Cars by Brand</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
            {brandsData.map(brand => (
              <div key={brand.name} className="card-pakwheels hover-lift" style={{ textAlign: 'center', padding: '20px', cursor: 'pointer' }} onClick={() => navigate(`/ads?category=CAR&condition=New&make=${brand.name}`)}>
                <img src={brand.img} alt={brand.name} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '15px' }} />
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#1a3b5d' }}>{brand.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular New Cars Section */}
      <section style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d' }}>Popular New Cars</h2>
            <Link to="/ads?category=CAR&condition=New" style={{ color: 'var(--primary)', fontWeight: 600 }}>View all new cars</Link>
          </div>
          <div className="grid grid-4">
            {popularNewCars.map((car, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '0', overflow: 'hidden' }}>
                <img src={car.img} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1a3b5d', marginBottom: '5px' }}>{car.name}</h4>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '15px' }}>PKR {car.price}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '10px' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= 4 ? "#f5a623" : "none"} color="#f5a623" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Cars by Body Type */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px' }}>Browse New Cars by Body Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            {[
              { name: 'Sedan', icon: <Car size={32} /> },
              { name: 'Hatchback', icon: <Zap size={32} /> },
              { name: 'SUV', icon: <Car size={32} /> },
              { name: 'Crossover', icon: <Car size={32} /> },
              { name: 'Pickup', icon: <Car size={32} /> }
            ].map((type, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '25px', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/ads?category=CAR&condition=New')}>
                <div style={{ color: 'var(--primary)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{type.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{type.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Cars by Price Range */}
      <section style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '30px' }}>New Cars by Price</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
            {['Under 20 Lacs', '20 - 35 Lacs', '35 - 50 Lacs', '50 - 70 Lacs', '70 Lacs - 1 Crore', '1 - 1.5 Crore', '1.5 - 2 Crore', 'Above 2 Crore'].map(range => (
              <div 
                key={range} 
                className="card-pakwheels hover-lift" 
                style={{ padding: '15px', textAlign: 'center', cursor: 'pointer', fontWeight: 600, color: '#1a3b5d' }}
                onClick={() => navigate('/ads?category=CAR&condition=New')}
              >
                {range}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

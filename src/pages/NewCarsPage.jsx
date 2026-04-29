import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Car, Search, Shield, DollarSign } from 'lucide-react';

const brandsData = [
  {
    name: 'Toyota',
    logo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&auto=format&fit=crop',
    models: [
      { name: 'Toyota Corolla', priceRange: 'PKR 61.7 - 75.5 Lacs', specs: '1.6L - 1.8L, Automatic', img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400' },
      { name: 'Toyota Yaris', priceRange: 'PKR 44.8 - 47.6 Lacs', specs: '1.3L - 1.5L, CVT', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' },
      { name: 'Toyota Fortuner', priceRange: 'PKR 1.45 - 1.99 Crore', specs: '2.7L - 2.8L, 4x4 Diesel', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400' },
      { name: 'Toyota Hilux Revo', priceRange: 'PKR 1.14 - 1.62 Crore', specs: '2.8L Diesel Turbo', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400' }
    ]
  },
  {
    name: 'Honda',
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&auto=format&fit=crop',
    models: [
      { name: 'Honda Civic', priceRange: 'PKR 83.3 - 99.0 Lacs', specs: '1.5L VTEC Turbo, CVT', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' },
      { name: 'Honda City', priceRange: 'PKR 46.5 - 58.5 Lacs', specs: '1.2L - 1.5L i-VTEC', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400' },
      { name: 'Honda HR-V', priceRange: 'PKR 76.5 - 79.0 Lacs', specs: '1.5L DOHC i-VTEC', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400' },
      { name: 'Honda BR-V', priceRange: 'PKR 62.9 Lacs', specs: '1.5L i-VTEC CVT', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400' }
    ]
  },
  {
    name: 'Suzuki',
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&auto=format&fit=crop',
    models: [
      { name: 'Suzuki Alto', priceRange: 'PKR 23.3 - 30.5 Lacs', specs: '660cc, Manual/AGS', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
      { name: 'Suzuki Cultus', priceRange: 'PKR 38.6 - 43.7 Lacs', specs: '1.0L K-Series Engine', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
      { name: 'Suzuki Swift', priceRange: 'PKR 43.4 - 47.2 Lacs', specs: '1.2L K12M, CVT', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
      { name: 'Suzuki Wagon R', priceRange: 'PKR 32.1 - 37.4 Lacs', specs: '1.0L, Manual/AGS', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' }
    ]
  },
  {
    name: 'Kia',
    logo: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&auto=format&fit=crop',
    models: [
      { name: 'Kia Sportage', priceRange: 'PKR 73.0 - 90.0 Lacs', specs: '2.0L MPI Engine, AWD', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' },
      { name: 'Kia Picanto', priceRange: 'PKR 33.5 - 38.5 Lacs', specs: '1.0L MPI, Automatic', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' },
      { name: 'Kia Stonic', priceRange: 'PKR 62.8 Lacs', specs: '1.4L MPI, Automatic', img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400' }
    ]
  },
  {
    name: 'Hyundai',
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&auto=format&fit=crop',
    models: [
      { name: 'Hyundai Tucson', priceRange: 'PKR 71.6 - 86.5 Lacs', specs: '2.0L Engine, AWD/FWD', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' },
      { name: 'Hyundai Elantra', priceRange: 'PKR 63.9 - 69.3 Lacs', specs: '1.6L - 2.0L Automatic', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' },
      { name: 'Hyundai Sonata', priceRange: 'PKR 99.7 - 1.09 Crore', specs: '2.0L - 2.5L CVT', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400' }
    ]
  }
];

export default function NewCarsPage() {
  const [selectedBrand, setSelectedBrand] = useState(brandsData[0].name);
  const navigate = useNavigate();

  const handleModelClick = (brandName, modelName) => {
    // Navigate straight to classified ads or model showroom
    navigate(`/ads?category=CAR&condition=New&make=${brandName}&search=${modelName.split(' ')[1]}`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: 'var(--gray-50)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--black) 0%, #043b3a 100%)',
        color: 'var(--white)',
        padding: '50px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
            New Cars in Pakistan
          </h1>
          <p style={{ color: 'var(--gray-300)', fontSize: '16px' }}>
            Explore specifications, variants, and up-to-date pricing on all showroom vehicles.
          </p>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
          
          {/* Brand Sidebar (PakWheels Style) */}
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--border-radius-md)',
            border: '1px solid var(--gray-200)',
            padding: '20px',
            alignSelf: 'start',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Car size={20} style={{ color: 'var(--primary)' }} />
              All Car Brands
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {brandsData.map((brand) => (
                <div
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--border-radius-sm)',
                    backgroundColor: selectedBrand === brand.name ? 'var(--primary-light)' : 'transparent',
                    color: selectedBrand === brand.name ? 'var(--primary)' : 'var(--gray-700)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    borderLeft: selectedBrand === brand.name ? '4px solid var(--primary)' : '4px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    if (selectedBrand !== brand.name) e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                  }}
                  onMouseOut={(e) => {
                    if (selectedBrand !== brand.name) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span>{brand.name}</span>
                  <ChevronRight size={18} style={{ opacity: selectedBrand === brand.name ? 1 : 0.5 }} />
                </div>
              ))}
            </div>
          </div>

          {/* New Cars Catalog Display Grid */}
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '24px', borderBottom: '2px solid var(--gray-200)', paddingBottom: '12px'
            }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--black)' }}>
                {selectedBrand} Models Catalog
              </h3>
              <span style={{ fontSize: '14px', color: 'var(--gray-500)', fontWeight: 500 }}>
                Showing {brandsData.find(b => b.name === selectedBrand)?.models.length} models
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {brandsData.find(b => b.name === selectedBrand)?.models.map((car) => (
                <div
                  key={car.name}
                  className="hover-lift"
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--border-radius-md)',
                    overflow: 'hidden',
                    display: 'flex',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  onClick={() => handleModelClick(selectedBrand, car.name)}
                >
                  {/* Left: Car Image */}
                  <div style={{ width: '260px', height: '170px', backgroundColor: 'var(--gray-100)', position: 'relative' }}>
                    <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Right: Specs & Price */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--black)', marginBottom: '8px' }}>
                        {car.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={16} style={{ color: 'var(--primary)' }} />
                        {car.specs}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--gray-400)', display: 'block', marginBottom: '2px' }}>EX-FACTORY PRICE</span>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)' }}>
                          {car.priceRange}
                        </span>
                      </div>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)',
                          display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px'
                        }}
                      >
                        <Search size={16} /> View Ads
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

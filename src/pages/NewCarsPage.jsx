import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Car, Search } from 'lucide-react';

const brandsData = [
  {
    name: 'Toyota',
    models: ['Corolla', 'Yaris', 'Fortuner', 'Hilux', 'Camry', 'Land Cruiser', 'Prado'],
    logo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&auto=format&fit=crop'
  },
  {
    name: 'Honda',
    models: ['Civic', 'City', 'BR-V', 'HR-V'],
    logo: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&auto=format&fit=crop'
  },
  {
    name: 'Suzuki',
    models: ['Alto', 'Cultus', 'Wagon R', 'Swift', 'Bolan', 'Ravi'],
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&auto=format&fit=crop'
  },
  {
    name: 'Kia',
    models: ['Sportage', 'Picanto', 'Stonic', 'Sorento', 'Carnival'],
    logo: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&auto=format&fit=crop'
  },
  {
    name: 'Hyundai',
    models: ['Tucson', 'Elantra', 'Sonata', 'Porter'],
    logo: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&auto=format&fit=crop'
  },
  {
    name: 'Changan',
    models: ['Alsvin', 'Karvaan', 'Oshan X7'],
    logo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&auto=format&fit=crop'
  },
  {
    name: 'MG',
    models: ['HS', 'ZS', 'ZS EV'],
    logo: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&auto=format&fit=crop'
  },
  {
    name: 'Haval',
    models: ['H6', 'Jolion'],
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&auto=format&fit=crop'
  },
  {
    name: 'Chery',
    models: ['Tiggo 4 Pro', 'Tiggo 8 Pro'],
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop'
  }
];

export default function NewCarsPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();

  const handleModelClick = (brandName, modelName) => {
    navigate(`/ads?category=CAR&condition=New&make=${brandName}&search=${modelName}`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: 'var(--gray-50)', minHeight: '80svh', paddingBottom: '60px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--white)', padding: '40px 0', borderBottom: '1px solid var(--gray-200)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--black)', marginBottom: '12px' }}>
            New Cars in Pakistan
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Explore available models, prices, and specifications of all official car brands in Pakistan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: selectedBrand ? '1fr 2fr' : '1fr', gap: '30px' }}>
          
          {/* Brands List/Grid */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Car size={24} style={{ color: 'var(--primary)' }} />
              {selectedBrand ? 'Brands' : 'Choose a Brand'}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedBrand ? '1fr' : 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              {brandsData.map((brand) => (
                <div
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name === selectedBrand ? null : brand.name)}
                  className="hover-lift"
                  style={{
                    backgroundColor: 'var(--white)',
                    border: selectedBrand === brand.name ? '2px solid var(--primary)' : '1px solid var(--gray-200)',
                    borderRadius: 'var(--border-radius-md)',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: selectedBrand ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: selectedBrand ? 'space-between' : 'center',
                    gap: '12px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: selectedBrand ? '40px' : '60px',
                      height: selectedBrand ? '40px' : '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      fontSize: selectedBrand ? '16px' : '20px'
                    }}>
                      {brand.name.charAt(0)}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>{brand.name}</div>
                  </div>

                  {selectedBrand ? (
                    <ChevronRight size={20} style={{ color: selectedBrand === brand.name ? 'var(--primary)' : 'var(--gray-400)' }} />
                  ) : (
                    <div style={{ fontSize: '13px', color: 'var(--gray-400)' }}>{brand.models.length} models</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Models List (Shows when a brand is selected) */}
          {selectedBrand && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={24} style={{ color: 'var(--primary)' }} />
                Available Models for {selectedBrand}
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {brandsData.find(b => b.name === selectedBrand)?.models.map((model) => (
                  <div
                    key={model}
                    onClick={() => handleModelClick(selectedBrand, model)}
                    className="hover-lift"
                    style={{
                      backgroundColor: 'var(--white)',
                      border: '1px solid var(--gray-200)',
                      borderRadius: 'var(--border-radius-md)',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      height: '100px',
                      backgroundColor: 'var(--gray-50)',
                      borderRadius: 'var(--border-radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      color: 'var(--gray-400)',
                      fontWeight: 500
                    }}>
                      No Image Available
                    </div>
                    
                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--black)', marginBottom: '6px' }}>
                      {model}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600 }}>
                      View Available Listings
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

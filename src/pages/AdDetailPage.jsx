import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, Calendar, Gauge, Fuel, ShieldAlert, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [revealPhone, setRevealPhone] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/ads/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setAd(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--gray-500)' }}>Loading Ad Details...</h2>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--gray-700)', marginBottom: '16px' }}>Ad Not Found</h2>
        <button onClick={() => navigate('/ads')} className="btn btn-primary">Back to Listings</button>
      </div>
    );
  }

  const images = ad.images.split(',');

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: 'var(--gray-50)', paddingBottom: '60px' }}>
      {/* Detail Header */}
      <section style={{ backgroundColor: 'var(--white)', padding: '24px 0', borderBottom: '1px solid var(--gray-200)' }}>
        <div className="container">
          <button onClick={() => navigate(-1)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--gray-600)',
            fontWeight: 600,
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            <ChevronLeft size={18} /> Back
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--black)', marginBottom: '8px' }}>
                {ad.title}
              </h1>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--gray-600)', fontSize: '14px' }}>
                <span><strong>City:</strong> {ad.city}</span>
                <span>|</span>
                <span><strong>Condition:</strong> {ad.condition}</span>
                {ad.createdAt && (
                  <>
                    <span>|</span>
                    <span>Posted on {new Date(ad.createdAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', lineHeight: '1.2' }}>
                PKR {ad.price.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content split */}
      <section className="container" style={{ marginTop: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 3fr))',
          gap: '30px'
        }}>
          {/* Left Column: Media & Specs */}
          <div style={{ gridColumn: 'span 2' }}>
            {/* Image Slider */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-200)',
              padding: '16px',
              marginBottom: '30px'
            }}>
              <div style={{
                position: 'relative',
                height: '400px',
                backgroundColor: 'var(--black)',
                borderRadius: 'var(--border-radius-sm)',
                overflow: 'hidden'
              }}>
                <img
                  src={images[activeImageIdx]}
                  alt={`${ad.title} ${activeImageIdx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />

                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} style={{
                      position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '50%'
                    }}><ChevronLeft size={20} /></button>

                    <button onClick={nextImage} style={{
                      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '50%'
                    }}><ChevronRight size={20} /></button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="thumbnail"
                      onClick={() => setActiveImageIdx(idx)}
                      style={{
                        width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)',
                        cursor: 'pointer', border: activeImageIdx === idx ? '3px solid var(--primary)' : '1px solid var(--gray-200)',
                        transition: 'border 0.2s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Grid */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-200)',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>
                Specifications
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '24px'
              }}>
                {ad.year && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={24} style={{ color: 'var(--primary)' }} />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Year</div>
                      <div style={{ fontWeight: 600 }}>{ad.year}</div>
                    </div>
                  </div>
                )}
                {ad.mileage !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Gauge size={24} style={{ color: 'var(--primary)' }} />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Mileage</div>
                      <div style={{ fontWeight: 600 }}>{ad.mileage.toLocaleString()} km</div>
                    </div>
                  </div>
                )}
                {ad.fuelType && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Fuel size={24} style={{ color: 'var(--primary)' }} />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Fuel Type</div>
                      <div style={{ fontWeight: 600 }}>{ad.fuelType}</div>
                    </div>
                  </div>
                )}
                {ad.transmission && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Car size={24} style={{ color: 'var(--primary)' }} />
                    <div>
                      <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>Transmission</div>
                      <div style={{ fontWeight: 600 }}>{ad.transmission}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-200)',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>
                Seller's Description
              </h3>
              <p style={{ color: 'var(--gray-700)', fontSize: '15px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                {ad.description}
              </p>
            </div>

            {/* Features */}
            {ad.features && (
              <div style={{
                backgroundColor: 'var(--white)',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--gray-200)',
                padding: '30px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '12px' }}>
                  Features
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {ad.features.split(',').map(feat => (
                    <span key={feat} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      backgroundColor: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                      padding: '8px 16px', borderRadius: 'var(--border-radius-full)',
                      fontSize: '14px', color: 'var(--gray-800)', fontWeight: 500
                    }}>
                      <CheckCircle size={16} style={{ color: 'var(--primary)' }} />
                      {feat.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Seller Profile & Safety */}
          <div>
            {/* Seller Contact Card */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid var(--gray-200)',
              padding: '30px',
              position: 'sticky',
              top: '90px',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'var(--gray-900)' }}>
                Seller Information
              </h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  backgroundColor: 'var(--primary)', color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 700
                }}>
                  {ad.sellerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>{ad.sellerName}</div>
                  {ad.sellerEmail && <div style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{ad.sellerEmail}</div>}
                </div>
              </div>

              {revealPhone ? (
                <div style={{
                  backgroundColor: 'var(--primary-light)', color: 'var(--primary)',
                  border: '1px solid var(--primary-border)', padding: '16px',
                  borderRadius: 'var(--border-radius-md)', textAlign: 'center',
                  fontWeight: 700, fontSize: '20px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '10px', animation: 'fadeIn 0.3s ease'
                }}>
                  <Phone size={20} />
                  {ad.sellerPhone}
                </div>
              ) : (
                <button
                  onClick={() => setRevealPhone(true)}
                  className="btn btn-primary hover-lift"
                  style={{ width: '100%', padding: '16px', fontSize: '16px' }}
                >
                  <Phone size={20} />
                  Contact Seller
                </button>
              )}
            </div>

            {/* Safety Tips */}
            <div style={{
              backgroundColor: 'rgba(217, 119, 6, 0.05)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid rgba(217, 119, 6, 0.2)',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D97706', fontWeight: 600, marginBottom: '12px' }}>
                <ShieldAlert size={20} />
                Safety Tips for Buyers
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: '#B45309', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                <li>• Avoid paying advance payment.</li>
                <li>• Meet the seller in a safe, public location.</li>
                <li>• Inspect the vehicle/part carefully before buying.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Bike, Shield, PlusCircle, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--gray-200)',
      background: 'rgba(255, 255, 255, 0.9)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Car size={32} />
          <span>Xtreme<span style={{ color: 'var(--black)' }}>Drive</span></span>
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'none',
          gap: '32px',
          alignItems: 'center',
          fontWeight: 500,
        }} className="desktop-nav">
          <Link to="/ads?category=CAR" style={{ color: 'var(--gray-700)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-700)'}>Used Cars</Link>
          <Link to="/new-cars" style={{ color: 'var(--gray-700)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-700)'}>New Cars</Link>
          <Link to="/ads?category=BIKE" style={{ color: 'var(--gray-700)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-700)'}>Bikes</Link>
          <Link to="/ads?category=AUTOPART" style={{ color: 'var(--gray-700)', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-700)'}>Auto Parts</Link>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'none',
          gap: '16px',
          alignItems: 'center',
        }} className="desktop-nav">
          <button onClick={() => navigate('/ads')} style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--gray-700)',
            gap: '6px',
          }}>
            <Search size={20} />
          </button>
          <Link to="/post-ad" className="btn btn-primary" style={{
            padding: '10px 20px',
            fontSize: '15px',
          }}>
            <PlusCircle size={18} />
            Post an Ad
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{
          display: 'none',
          color: 'var(--gray-800)',
        }} className="mobile-toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="animate-fade" style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          width: '100%',
          background: 'var(--white)',
          borderBottom: '1px solid var(--gray-200)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <Link to="/ads?category=CAR" onClick={() => setIsOpen(false)}>Used Cars</Link>
          <Link to="/new-cars" onClick={() => setIsOpen(false)}>New Cars</Link>
          <Link to="/ads?category=BIKE" onClick={() => setIsOpen(false)}>Bikes</Link>
          <Link to="/ads?category=AUTOPART" onClick={() => setIsOpen(false)}>Auto Parts</Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
          <Link to="/post-ad" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ width: '100%' }}>
            <PlusCircle size={18} />
            Post an Ad
          </Link>
        </div>
      )}

      {/* Injected responsive styles for navbar */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

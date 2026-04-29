import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Bike, Settings, PlusCircle, Search, Menu, X, Shield, DollarSign, MapPin, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'used', 'new', 'bikes', 'parts'
  const navigate = useNavigate();

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const navItemStyle = {
    color: 'var(--gray-700)',
    fontSize: '15px',
    fontWeight: 600,
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    padding: '0 10px',
    transition: 'color 0.2s',
    borderBottom: '2px solid transparent',
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    color: 'var(--primary)',
    borderBottom: '2px solid var(--primary)',
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--gray-200)',
      background: 'rgba(255, 255, 255, 0.95)',
    }} onMouseLeave={handleMenuLeave}>
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
        }} onClick={handleMenuLeave}>
          <Car size={32} />
          <span>Xtreme<span style={{ color: 'var(--black)' }}>Drive</span></span>
        </Link>

        {/* Desktop Links with Hover Mega Dropdown */}
        <div style={{
          display: 'none',
          gap: '16px',
          alignItems: 'center',
          height: '100%',
        }} className="desktop-nav">
          
          <div style={activeMenu === 'used' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('used')}>
            Used Cars <ChevronDown size={14} />
          </div>

          <div style={activeMenu === 'new' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('new')}>
            New Cars <ChevronDown size={14} />
          </div>

          <div style={activeMenu === 'bikes' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('bikes')}>
            Bikes <ChevronDown size={14} />
          </div>

          <div style={activeMenu === 'parts' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('parts')}>
            Auto Parts <ChevronDown size={14} />
          </div>

        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'none',
          gap: '16px',
          alignItems: 'center',
        }} className="desktop-nav">
          <button onClick={() => { handleMenuLeave(); navigate('/ads'); }} style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--gray-700)',
            gap: '6px',
          }}>
            <Search size={20} />
          </button>
          <Link to="/post-ad" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '15px' }} onClick={handleMenuLeave}>
            <PlusCircle size={18} /> Post an Ad
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', color: 'var(--gray-800)' }} className="mobile-toggle">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mega Menus Dropdown Panel */}
      {activeMenu && (
        <div className="animate-fade" style={{
          position: 'absolute', top: '70px', left: 0, width: '100%',
          background: 'var(--white)', borderBottom: '4px solid var(--primary)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)', padding: '30px 0',
          animation: 'fadeIn 0.2s ease-out'
        }} onMouseEnter={() => handleMenuHover(activeMenu)}>
          <div className="container grid grid-4" style={{ gap: '30px' }}>
            
            {/* Used Cars Menu */}
            {activeMenu === 'used' && (
              <>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Find Used Cars</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/ads?category=CAR" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Search size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>Find Used Cars</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Find your dream car</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Our Services</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Shield size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>Car Inspection</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>200+ point inspection check</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/post-ad" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <DollarSign size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>Sell Your Car</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Free posting online</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular Models</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=CAR&search=Corolla" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Toyota Corolla</Link></li>
                    <li><Link to="/ads?category=CAR&search=Civic" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Civic</Link></li>
                    <li><Link to="/ads?category=CAR&search=Alto" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Suzuki Alto</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular Cities</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=CAR&city=Lahore" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> Lahore</Link></li>
                    <li><Link to="/ads?category=CAR&city=Karachi" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> Karachi</Link></li>
                    <li><Link to="/ads?category=CAR&city=Islamabad" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> Islamabad</Link></li>
                  </ul>
                </div>
              </>
            )}

            {/* New Cars Menu */}
            {activeMenu === 'new' && (
              <>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Find New Cars</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/new-cars" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Car size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>New Cars</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>See models in Pakistan</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Brand Quick Links</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=CAR&condition=New&make=Toyota" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Toyota Cars</Link></li>
                    <li><Link to="/ads?category=CAR&condition=New&make=Honda" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Cars</Link></li>
                    <li><Link to="/ads?category=CAR&condition=New&make=Suzuki" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Suzuki Cars</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular New Cars</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=CAR&condition=New&search=Civic" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Civic</Link></li>
                    <li><Link to="/ads?category=CAR&condition=New&search=Sportage" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Kia Sportage</Link></li>
                  </ul>
                </div>

                <div>{/* Empty column */}</div>
              </>
            )}

            {/* Bikes Menu */}
            {activeMenu === 'bikes' && (
              <>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Used Bikes</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/bikes" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Search size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>Find Bikes</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Explore all segments</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Brand Quick Links</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/ads?category=BIKE&condition=New" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Bike size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>New Bike Prices</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Latest models</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Popular Bikes</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=BIKE&search=CG125" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda CG 125</Link></li>
                    <li><Link to="/ads?category=BIKE&search=YBR" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Yamaha YBR 125</Link></li>
                    <li><Link to="/ads?category=BIKE&search=CD70" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda CD 70</Link></li>
                  </ul>
                </div>

                <div>{/* Empty column */}</div>
              </>
            )}

            {/* Auto Parts Menu */}
            {activeMenu === 'parts' && (
              <>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Auto Store</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li>
                      <Link to="/ads?category=AUTOPART" onClick={handleMenuLeave} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gray-700)' }}>
                        <Settings size={16} style={{ color: 'var(--primary)' }} />
                        <div>
                          <span style={{ fontWeight: 600, display: 'block', fontSize: '14px' }}>Browse Auto Parts</span>
                          <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Top-rated accessories</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--black)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Parts by Car Model</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                    <li><Link to="/ads?category=AUTOPART&search=Corolla" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Toyota Corolla</Link></li>
                    <li><Link to="/ads?category=AUTOPART&search=Civic" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Civic</Link></li>
                  </ul>
                </div>

                <div>{/* Empty column */}</div>
                <div>{/* Empty column */}</div>
              </>
            )}

          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="animate-fade" style={{
          position: 'absolute', top: '70px', left: 0, width: '100%',
          background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
          padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px',
          boxShadow: 'var(--shadow-lg)',
        }}>
          <Link to="/ads?category=CAR" onClick={() => setIsOpen(false)}>Used Cars</Link>
          <Link to="/new-cars" onClick={() => setIsOpen(false)}>New Cars</Link>
          <Link to="/bikes" onClick={() => setIsOpen(false)}>Bikes</Link>
          <Link to="/ads?category=AUTOPART" onClick={() => setIsOpen(false)}>Auto Parts</Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
          <Link to="/post-ad" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ width: '100%' }}>
            <PlusCircle size={18} /> Post an Ad
          </Link>
        </div>
      )}

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

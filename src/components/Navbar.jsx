import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, Bike, Settings, PlusCircle, Search, Menu, X, Shield, 
  DollarSign, MapPin, ChevronDown, Smartphone, User, Bell, 
  MessageSquare, Heart, ShoppingCart, Globe, PlayCircle, BookOpen, Users 
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); 
  const navigate = useNavigate();
  const [navSearch, setNavSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleMenuHover = (menu) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const navItemStyle = {
    color: 'var(--white)',
    fontSize: '14px',
    fontWeight: 600,
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    padding: '0 12px',
    transition: 'background 0.2s',
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    background: 'rgba(0,0,0,0.1)',
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar desktop-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Smartphone size={14} /> Download App via SMS
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="#" style={{ color: 'var(--primary)', fontWeight: 700 }}>اردو</Link>
            <span style={{ color: 'var(--gray-600)' }}>|</span>
            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Sign Up</Link>
            <span style={{ color: 'var(--gray-600)' }}>|</span>
            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Sign In</Link>
          </div>
        </div>
      </div>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--black)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }} onMouseLeave={handleMenuLeave}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontSize: '22px',
            fontWeight: 800,
            color: 'var(--white)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginRight: '20px'
          }} onClick={handleMenuLeave}>
            <Car size={28} style={{ color: 'var(--primary)' }} />
            <span>XTREME<span style={{ color: 'var(--primary)' }}>DRIVE</span></span>
          </Link>

          {/* Desktop Wrapper */}
          <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', height: '100%', flex: 1 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div
                style={activeMenu === 'used' ? activeNavItemStyle : navItemStyle}
                onMouseEnter={() => handleMenuHover('used')}
              >
                Used Cars <ChevronDown size={14} />
              </div>

              <div
                style={activeMenu === 'new' ? activeNavItemStyle : navItemStyle}
                onMouseEnter={() => handleMenuHover('new')}
              >
                New Cars <ChevronDown size={14} />
              </div>

              <div
                style={activeMenu === 'bikes' ? activeNavItemStyle : navItemStyle}
                onMouseEnter={() => handleMenuHover('bikes')}
              >
                Bikes <ChevronDown size={14} />
              </div>

              <div
                style={activeMenu === 'parts' ? activeNavItemStyle : navItemStyle}
                onMouseEnter={() => handleMenuHover('parts')}
              >
                Auto Store <ChevronDown size={14} />
              </div>

              <div style={navItemStyle}>Videos</div>
              <div style={navItemStyle}>Forums</div>
              <div style={navItemStyle}>Blog</div>
              <div style={navItemStyle} onMouseEnter={() => handleMenuHover('more')}>More <ChevronDown size={14} /></div>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', color: 'var(--white)' }}>
                <Bell size={20} style={{ cursor: 'pointer' }} />
                <MessageSquare size={20} style={{ cursor: 'pointer' }} />
                <Heart size={20} style={{ cursor: 'pointer' }} />
                <ShoppingCart size={20} style={{ cursor: 'pointer' }} />
              </div>
              <Link to="/post-ad" className="btn btn-primary" style={{ 
                padding: '8px 20px', 
                fontSize: '14px', 
                borderRadius: '4px',
                fontWeight: 700
              }} onClick={handleMenuLeave}>
                Post an Ad <ChevronDown size={14} />
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', color: 'var(--white)' }} className="mobile-toggle">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mega Menus Dropdown Panel */}
        {activeMenu && (
          <div className="animate-fade" style={{
            position: 'absolute', top: '60px', left: 0, width: '100%',
            background: 'var(--white)', borderTop: '1px solid var(--gray-200)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)', padding: '30px 0',
            animation: 'fadeIn 0.2s ease-out',
            zIndex: 99
          }} onMouseEnter={() => handleMenuHover(activeMenu)}>
            <div className="container grid grid-4" style={{ gap: '30px' }}>
              
              {activeMenu === 'used' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>FIND USED CARS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/ads?category=CAR" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Find Used Cars for Sale</Link></li>
                      <li><Link to="/ads?category=CAR&featured=true" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>Featured Used Cars</Link></li>
                      <li><Link to="#" style={{ color: 'var(--gray-700)' }}>Price Calculator</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>SELL YOUR CAR</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/post-ad" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Post an Ad</Link></li>
                      <li><Link to="#" style={{ color: 'var(--gray-700)' }}>Sell It For Me</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>POPULAR CITIES</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <li><Link to="/ads?city=Lahore" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Lahore</Link></li>
                      <li><Link to="/ads?city=Karachi" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Karachi</Link></li>
                      <li><Link to="/ads?city=Islamabad" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Islamabad</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>POPULAR MODELS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <li><Link to="/ads?search=Corolla" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Toyota Corolla</Link></li>
                      <li><Link to="/ads?search=Civic" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Civic</Link></li>
                      <li><Link to="/ads?search=Alto" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Suzuki Alto</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {activeMenu === 'new' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>NEW CARS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/new-cars" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Find New Cars</Link></li>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>Compare Cars</Link></li>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>New Car Prices</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>POPULAR BRANDS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <li><Link to="/ads?make=Suzuki" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Suzuki Cars</Link></li>
                      <li><Link to="/ads?make=Toyota" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Toyota Cars</Link></li>
                      <li><Link to="/ads?make=Honda" onClick={handleMenuLeave} style={{ color: 'var(--gray-600)' }}>Honda Cars</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {activeMenu === 'bikes' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>USED BIKES</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/bikes" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Find Used Bikes</Link></li>
                      <li><Link to="/post-ad" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>Sell Your Bike</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>NEW BIKES</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>New Bike Prices</Link></li>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>Compare Bikes</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {activeMenu === 'parts' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>AUTO STORE</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/ads?category=AUTOPART" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)', fontWeight: 600 }}>Buy Auto Parts</Link></li>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: 'var(--gray-700)' }}>Car Accessories</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {activeMenu === 'more' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>SERVICES</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="#" style={{ color: 'var(--gray-700)' }}>Car Insurance</Link></li>
                      <li><Link to="#" style={{ color: 'var(--gray-700)' }}>Car Finance</Link></li>
                      <li><Link to="#" style={{ color: 'var(--gray-700)' }}>Registration Tracking</Link></li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="animate-fade" style={{
            position: 'absolute', top: '60px', left: 0, width: '100%',
            background: 'var(--white)', borderBottom: '1px solid var(--gray-200)',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 99,
            color: 'var(--black)'
          }}>
            <Link to="/ads?category=CAR" onClick={() => setIsOpen(false)}>Used Cars</Link>
            <Link to="/new-cars" onClick={() => setIsOpen(false)}>New Cars</Link>
            <Link to="/bikes" onClick={() => setIsOpen(false)}>Bikes</Link>
            <Link to="/ads?category=AUTOPART" onClick={() => setIsOpen(false)}>Auto Parts</Link>
            <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
            <Link to="/post-ad" className="btn btn-primary" onClick={() => setIsOpen(false)} style={{ width: '100%', borderRadius: '4px' }}>
              Post an Ad
            </Link>
          </div>
        )}

        <style>{`
          @media (min-width: 992px) {
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
          @media (max-width: 991px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: block !important; }
          }
        `}</style>
      </nav>
    </>
  );
}

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
  const [isUrdu, setIsUrdu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleMenuHover = (menu) => {
    if (window.innerWidth > 768) setActiveMenu(menu);
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
      <div className="top-bar desktop-only" style={{ background: '#23292f' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Smartphone size={14} /> Download App via SMS
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button 
              onClick={() => setIsUrdu(!isUrdu)} 
              style={{ color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', background: 'none', border: 'none' }}
            >
              {isUrdu ? 'English' : 'اردو'}
            </button>
            <span style={{ color: 'var(--gray-600)' }}>|</span>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} /> <span>{isUrdu ? 'ان باکس' : 'Inbox'}</span>
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ position: 'relative' }}>
                  <Heart size={16} />
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', fontSize: '10px', padding: '0 4px', borderRadius: '10px' }}>0</span>
                </div>
                <span>{isUrdu ? 'محفوظ کردہ' : 'Saved'}</span>
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ position: 'relative' }}>
                  <ShoppingCart size={16} />
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', fontSize: '10px', padding: '0 4px', borderRadius: '10px' }}>{cartCount}</span>
                </div>
                <span>{isUrdu ? 'کارٹ' : 'Cart'}</span>
              </Link>
              <button onClick={() => setShowAuthModal(true)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                {isUrdu ? 'سائن اپ' : 'Sign Up'}
              </button>
              <span style={{ color: 'var(--gray-600)' }}>|</span>
              <button onClick={() => setShowAuthModal(true)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                {isUrdu ? 'سائن ان' : 'Sign In'}
              </button>
            </div>
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
          }} onClick={() => { setIsOpen(false); handleMenuLeave(); }}>
            <Car size={28} style={{ color: 'var(--primary)' }} />
            <span>XTREME<span style={{ color: 'var(--primary)' }}>DRIVE</span></span>
          </Link>

          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', height: '100%', flex: 1 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <Link to="/ads" style={activeMenu === 'used' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('used')}>
                Used Cars <ChevronDown size={14} />
              </Link>
              <Link to="/new-cars" style={activeMenu === 'new' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('new')}>
                New Cars <ChevronDown size={14} />
              </Link>
              <Link to="/bikes" style={activeMenu === 'bikes' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('bikes')}>
                Bikes <ChevronDown size={14} />
              </Link>
              <Link to="/auto-store" style={activeMenu === 'parts' ? activeNavItemStyle : navItemStyle} onMouseEnter={() => handleMenuHover('parts')}>
                Auto Store <ChevronDown size={14} />
              </Link>
              <Link to="#" style={navItemStyle}>Videos</Link>
              <Link to="#" style={navItemStyle}>Forums</Link>
              <Link to="#" style={navItemStyle}>Blog</Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => { setIsOpen(false); navigate('/sell'); }}
              className="btn" 
              style={{ 
                padding: '10px 24px', 
                borderRadius: '4px', 
                fontSize: '14px', 
                fontWeight: 700,
                backgroundColor: '#b73439', // Dark red for Post an Ad
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Post an Ad <ChevronDown size={14} />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-only" 
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: 'var(--white)' }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mega Menus Dropdown Panel (Desktop) */}
        {activeMenu && (
          <div className="desktop-only" style={{
            position: 'absolute', top: '60px', left: 0, width: '100%',
            background: 'var(--white)', borderTop: '1px solid var(--gray-200)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)', padding: '30px 0',
            zIndex: 99
          }} onMouseEnter={() => handleMenuHover(activeMenu)}>
            <div className="container grid grid-4" style={{ gap: '30px' }}>
              {activeMenu === 'used' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>FIND USED CARS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/ads?category=CAR" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Find Used Cars for Sale</Link></li>
                      <li><Link to="/ads?category=CAR&featured=true" onClick={handleMenuLeave} style={{ color: '#444' }}>Featured Used Cars</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>SELL YOUR CAR</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/sell" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Post an Ad</Link></li>
                    </ul>
                  </div>
                </>
              )}
              {activeMenu === 'new' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>NEW CARS</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/new-cars" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Find New Cars</Link></li>
                      <li><Link to="#" onClick={handleMenuLeave} style={{ color: '#444' }}>Compare Cars</Link></li>
                    </ul>
                  </div>
                </>
              )}
              {activeMenu === 'bikes' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>BIKES</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/bikes" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Find Used Bikes</Link></li>
                      <li><Link to="/post-ad" onClick={handleMenuLeave} style={{ color: '#444' }}>Sell Your Bike</Link></li>
                    </ul>
                  </div>
                </>
              )}
              {activeMenu === 'parts' && (
                <>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginBottom: '15px' }}>AUTO STORE</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                      <li><Link to="/auto-store" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Buy Auto Parts</Link></li>
                      <li><Link to="/auto-store" onClick={handleMenuLeave} style={{ color: '#444' }}>Car Accessories</Link></li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="mobile-only" style={{
            position: 'absolute', top: '60px', left: 0, width: '100%',
            background: 'var(--white)', padding: '20px', borderTop: '1px solid #eee',
            boxShadow: '0 10px 10px rgba(0,0,0,0.1)', zIndex: 98
          }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '16px', fontWeight: 600, color: '#333' }}>
              <li><Link to="/ads" onClick={() => setIsOpen(false)}>Used Cars</Link></li>
              <li><Link to="/new-cars" onClick={() => setIsOpen(false)}>New Cars</Link></li>
              <li><Link to="/bikes" onClick={() => setIsOpen(false)}>Bikes</Link></li>
              <li><Link to="/auto-store" onClick={() => setIsOpen(false)}>Auto Store</Link></li>
              <li><Link to="/sell" onClick={() => setIsOpen(false)} style={{ color: 'var(--primary)' }}>Sell Your Car</Link></li>
            </ul>
          </div>
        )}
        {/* Auth Modal */}
        {showAuthModal && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} onClick={() => setShowAuthModal(false)}>
            <div className="card-pakwheels animate-fade" style={{
              width: '400px', padding: '40px', background: 'white',
              position: 'relative', cursor: 'default'
            }} onClick={e => e.stopPropagation()}>
              <button style={{ position: 'absolute', top: '15px', right: '15px', color: '#999' }} onClick={() => setShowAuthModal(false)}>
                <X size={24} />
              </button>
              <h2 style={{ textAlign: 'center', color: '#1a3b5d', marginBottom: '30px' }}>Sign In</h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); setShowAuthModal(false); }}>
                <input type="email" placeholder="Email Address" required />
                <input type="password" placeholder="Password" required />
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Continue</button>
                <div style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
                  Don't have an account? <Link to="#" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

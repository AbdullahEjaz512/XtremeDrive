import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Car, Settings, Search, Menu, X, ShieldCheck, 
  DollarSign, ChevronDown, Smartphone, Globe, Star, 
  Battery, FileText, CheckCircle, Zap, Map, Users, Layout
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); 
  const [isUrdu, setIsUrdu] = useState(false);
  const [authModalType, setAuthModalType] = useState(null); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleMenuHover = (menu) => {
    if (window.innerWidth > 768) setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const closeAuthModal = () => {
    setAuthModalType(null);
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setCity('');
    setAuthError('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      await login(email, password);
      closeAuthModal();
      navigate('/');
    } catch (error) {
      setAuthError(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      await signup(email, password, name, phone, city);
      closeAuthModal();
      navigate('/');
    } catch (error) {
      setAuthError(error.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    transition: 'all 0.2s',
    borderBottom: '3px solid transparent',
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    background: 'rgba(0,0,0,0.1)',
    borderBottom: '3px solid var(--primary)',
  };

  const moreItems = [
    { title: 'Cool Rides', sub: 'Member Rides Cars & Bikes', icon: <Star size={18} /> },
    { title: 'Car Import', sub: 'Import your favourite Car', icon: <Globe size={18} /> },
    { title: 'Car Battery', sub: 'Built for Every Drive', icon: <Battery size={18} /> },
    { title: 'Car Insurance', sub: 'Get car insurance quote', icon: <ShieldCheck size={18} /> },
    { title: 'Car Finance', sub: 'Compare plans and apply for car loan', icon: <DollarSign size={18} /> },
    { title: 'PakWheels Service Centers', sub: 'Car maintenance & repair by certified experts', icon: <Settings size={18} /> },
    { title: 'MTMIS Pakistan', sub: 'Online Vehicle Verification', icon: <CheckCircle size={18} /> },
    { title: 'DLIMS Pakistan', sub: 'Driving License Verification System', icon: <FileText size={18} /> },
    { title: 'Current Petrol Prices', sub: 'Check latest Petrol, Diesel and CNG Price', icon: <Zap size={18} /> },
    { title: 'Car Registration', sub: 'Hassle-free Car Registration', icon: <Map size={18} /> },
    { title: 'Car Ownership Transfer', sub: 'Hassle-free Car Transfer', icon: <Users size={18} /> },
    { title: 'Auto Show', sub: 'Series of Annual Auto Shows', icon: <Layout size={18} /> },
  ];

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
              اردو
            </button>
            <span style={{ color: 'var(--gray-600)' }}>|</span>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <button onClick={() => setAuthModalType('signup')} style={{ color: 'white', fontWeight: 600 }}>Sign Up</button>
              <span style={{ color: 'var(--gray-600)' }}>|</span>
              <button onClick={() => setAuthModalType('signin')} style={{ color: 'white', fontWeight: 600 }}>Sign In</button>
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
        height: '60px',
      }} onMouseLeave={handleMenuLeave}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
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
          }}>
            <Car size={28} style={{ color: 'var(--primary)' }} />
            <span>XTREME<span style={{ color: 'var(--primary)' }}>DRIVE</span></span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', height: '100%', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', height: '100%', gap: '5px' }}>
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
              <Link to="/videos" style={navItemStyle}>Videos</Link>
              <Link to="/forums" style={navItemStyle}>Forums</Link>
              <Link to="/blog" style={navItemStyle}>Blog</Link>
              
              <div style={{ position: 'relative', height: '100%', marginRight: '15px' }} onMouseEnter={() => handleMenuHover('more')}>
                <div style={activeMenu === 'more' ? activeNavItemStyle : navItemStyle}>
                  <div style={{ position: 'relative' }}>
                    More <ChevronDown size={14} />
                    <span style={{ 
                      position: 'absolute', top: '-15px', right: '-5px', 
                      background: 'var(--primary)', color: 'white', fontSize: '9px', 
                      padding: '1px 4px', borderRadius: '10px', fontWeight: 800 
                    }}>New</span>
                  </div>
                </div>
                
                {/* More Dropdown */}
                {activeMenu === 'more' && (
                  <div style={{
                    position: 'absolute', top: '60px', left: '0', width: '320px',
                    background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    borderRadius: '0 0 8px 8px', borderTop: '3px solid var(--primary)',
                    maxHeight: '450px', overflowY: 'auto', zIndex: 101
                  }}>
                    {moreItems.map((item, idx) => (
                      <Link key={idx} to="/compare" onClick={handleMenuLeave} style={{
                        display: 'flex', gap: '15px', padding: '15px 20px',
                        borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s',
                        textDecoration: 'none'
                      }} onMouseOver={(e) => e.currentTarget.style.background = '#f9f9f9'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
                        <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#333' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: '#999' }}>{item.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Post Ad Button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => navigate('/sell')}
              className="btn" 
              style={{ 
                padding: '10px 24px', 
                borderRadius: '4px', 
                fontSize: '14px', 
                fontWeight: 700,
                backgroundColor: '#b73439',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Post an Ad <ChevronDown size={14} />
            </button>
            
            <button className="mobile-only" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--white)', marginLeft: '15px' }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mega Menus Dropdown Panel (Desktop) */}
        {activeMenu && activeMenu !== 'more' && (
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
                      <li><Link to="/ads" onClick={handleMenuLeave} style={{ color: '#444', fontWeight: 600 }}>Find Used Cars for Sale</Link></li>
                      <li><Link to="/ads?featured=true" onClick={handleMenuLeave} style={{ color: '#444' }}>Featured Used Cars</Link></li>
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
                      <li><Link to="/compare" onClick={handleMenuLeave} style={{ color: '#444' }}>Compare Cars</Link></li>
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
                      <li><Link to="/sell" onClick={handleMenuLeave} style={{ color: '#444' }}>Sell Your Bike</Link></li>
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
              <li><Link to="/sell" onClick={() => setIsOpen(false)} style={{ color: '#b73439' }}>Sell Your Car</Link></li>
            </ul>
          </div>
        )}

        {/* Auth Modal */}
        {authModalType && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }} onClick={closeAuthModal}>
            <div className="card-pakwheels animate-fade" style={{
              width: '400px', padding: '40px', background: 'white',
              position: 'relative', cursor: 'default'
            }} onClick={e => e.stopPropagation()}>
              <button style={{ position: 'absolute', top: '15px', right: '15px', color: '#999', background: 'none', border: 'none', cursor: 'pointer' }} onClick={closeAuthModal}>
                <X size={24} />
              </button>
              
              <h2 style={{ textAlign: 'center', color: '#1a3b5d', marginBottom: '30px' }}>
                {authModalType === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>

              {authError && (
                <div style={{ 
                  background: '#fee', 
                  color: '#c33', 
                  padding: '12px', 
                  borderRadius: '4px', 
                  marginBottom: '20px',
                  fontSize: '14px',
                  border: '1px solid #fcc'
                }}>
                  {authError}
                </div>
              )}

              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={authModalType === 'signin' ? handleSignIn : handleSignUp}>
                {authModalType === 'signup' && (
                  <>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number (Optional)" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                      style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                    />
                    <input 
                      type="text" 
                      placeholder="City (Optional)" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={isLoading}
                      style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                    />
                  </>
                )}

                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                />
                
                <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                />

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isLoading}
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    opacity: isLoading ? 0.6 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isLoading ? 'Loading...' : (authModalType === 'signin' ? 'Continue' : 'Create Account')}
                </button>

                <div style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
                  {authModalType === 'signin' ? (
                    <>
                      Don't have an account? <button 
                        type="button"
                        onClick={() => setAuthModalType('signup')}
                        style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account? <button 
                        type="button"
                        onClick={() => setAuthModalType('signin')}
                        style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

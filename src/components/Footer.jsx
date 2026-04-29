import React from 'react';
import { Car, Mail, Phone, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--black)',
      color: 'var(--gray-300)',
      padding: '60px 0 30px 0',
      marginTop: 'auto',
    }}>
      <div className="container grid grid-4" style={{ marginBottom: '40px' }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--white)',
            marginBottom: '16px'
          }}>
            <Car size={32} style={{ color: 'var(--primary)' }} />
            <span>Xtreme<span style={{ color: 'var(--primary)' }}>Drive</span></span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            Pakistan's leading automotive portal. Buy and sell cars, bikes, and auto parts with extreme ease and speed.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="/ads?category=CAR" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Used Cars</a></li>
            <li><a href="/ads?category=CAR&condition=New" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>New Cars</a></li>
            <li><a href="/ads?category=BIKE" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Bikes</a></li>
            <li><a href="/ads?category=AUTOPART" style={{ transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'inherit'}>Auto Parts</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '16px' }}>Contact Us</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> 0300-1234567</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> support@xtremedrive.com</li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--white)', fontSize: '18px', marginBottom: '16px' }}>Connect</h4>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'var(--gray-400)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}><Globe size={18} /> Website</a>
            <a href="#" style={{ color: 'var(--gray-400)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }} onMouseOver={(e) => e.target.style.color = 'var(--primary)'} onMouseOut={(e) => e.target.style.color = 'var(--gray-400)'}><Share2 size={18} /> Socials</a>
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--gray-800)',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--gray-500)',
      }}>
        <div className="container">
          &copy; {new Date().getFullYear()} XtremeDrive (Pvt) Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

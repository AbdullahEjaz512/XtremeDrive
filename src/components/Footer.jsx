import React from 'react';
import { 
  Car, Mail, Phone, Globe, Share2, Send, Smartphone 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerSections = [
    {
      title: 'Cars by Make',
      links: [
        { name: 'Toyota Cars', path: '/ads?make=Toyota' },
        { name: 'Honda Cars', path: '/ads?make=Honda' },
        { name: 'Suzuki Cars', path: '/ads?make=Suzuki' },
        { name: 'KIA Cars', path: '/ads?make=KIA' },
        { name: 'Hyundai Cars', path: '/ads?make=Hyundai' },
        { name: 'Changan Cars', path: '/ads?make=Changan' },
        { name: 'MG Cars', path: '/ads?make=MG' },
        { name: 'Prince Cars', path: '/ads?make=Prince' }
      ]
    },
    {
      title: 'Cars by City',
      links: [
        { name: 'Cars in Lahore', path: '/ads?city=Lahore' },
        { name: 'Cars in Karachi', path: '/ads?city=Karachi' },
        { name: 'Cars in Islamabad', path: '/ads?city=Islamabad' },
        { name: 'Cars in Faisalabad', path: '/ads?city=Faisalabad' },
        { name: 'Cars in Peshawar', path: '/ads?city=Peshawar' },
        { name: 'Cars in Multan', path: '/ads?city=Multan' },
        { name: 'Cars in Rawalpindi', path: '/ads?city=Rawalpindi' },
        { name: 'Cars in Gujranwala', path: '/ads?city=Gujranwala' }
      ]
    },
    {
      title: 'Explore XtremeDrive',
      links: [
        { name: 'Used Cars', path: '/ads' },
        { name: 'Used Bikes', path: '/bikes' },
        { name: 'New Cars', path: '/new-cars' },
        { name: 'Auto Parts', path: '/auto-store' },
        { name: 'Car Comparison', path: '/' },
        { name: 'Car Reviews', path: '/' },
        { name: 'Prices', path: '/' },
        { name: 'Car Inspection', path: '/' }
      ]
    },
    {
      title: 'XtremeDrive Sell',
      links: [
        { name: 'Post an Ad', path: '/sell' },
        { name: 'Sell It For Me', path: '/sell' },
        { name: 'Auction Sheet', path: '/' },
        { name: 'Car Insurance', path: '/' },
        { name: 'Car Finance', path: '/' },
        { name: 'Registration', path: '/' },
        { name: 'Ownership Transfer', path: '/' }
      ]
    },
    {
      title: 'XtremeDrive Bikes',
      links: [
        { name: 'Honda Bikes', path: '/bikes' },
        { name: 'Yamaha Bikes', path: '/bikes' },
        { name: 'Suzuki Bikes', path: '/bikes' },
        { name: 'Used Bikes', path: '/bikes' },
        { name: 'New Bikes', path: '/bikes' },
        { name: 'Bikes Comparison', path: '/bikes' },
        { name: 'Bikes Reviews', path: '/bikes' }
      ]
    }
  ];

  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: '#999',
      padding: '80px 0 30px 0',
      marginTop: 'auto',
      borderTop: '1px solid #333'
    }}>
      <div className="container">
        
        {/* SEO Link Grids */}
        <div className="grid grid-5" style={{ gap: '30px', marginBottom: '60px' }}>
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 style={{ color: 'white', fontSize: '15px', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase' }}>{section.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link to={link.path} style={{ transition: 'color 0.2s', color: '#999' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#999'}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Contact */}
        <div style={{ 
          borderTop: '1px solid #333', 
          borderBottom: '1px solid #333', 
          padding: '40px 0', 
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          <div style={{ maxWidth: '400px' }}>
            <h4 style={{ color: 'white', marginBottom: '15px' }}>Subscribe to our Newsletter</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" placeholder="Enter Email Address" 
                style={{ flex: 1, backgroundColor: '#333', border: 'none', padding: '10px 15px', color: 'white', borderRadius: '4px' }} 
              />
              <button className="btn btn-primary" style={{ padding: '10px 20px' }}>Subscribe</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Link to="#" style={{ color: '#999' }}><Share2 size={20} /></Link>
                <Link to="#" style={{ color: '#999' }}><Share2 size={20} /></Link>
                <Link to="#" style={{ color: '#999' }}><Share2 size={20} /></Link>
                <Link to="#" style={{ color: '#999' }}><Share2 size={20} /></Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '14px' }}>Download App</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Smartphone size={24} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '12px' }}>Available on Play Store & App Store</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Logo & Copyright */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '28px',
            fontWeight: 800,
            color: 'white',
            marginBottom: '20px'
          }}>
            <Car size={36} style={{ color: 'var(--primary)' }} />
            <span>Xtreme<span style={{ color: 'var(--primary)' }}>Drive</span></span>
          </div>
          <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            XtremeDrive is Pakistan's largest automotive portal, helping millions of buyers and sellers to buy and sell cars, bikes and auto parts. 
            We provide our users with the latest information on the automotive industry, including news, reviews, specifications, and prices.
          </p>
          <div style={{ marginTop: '30px', fontSize: '11px', color: '#444' }}>
            &copy; {new Date().getFullYear()} XtremeDrive.com - All rights reserved. 
            <span style={{ margin: '0 10px' }}>|</span> 
            Terms of Service <span style={{ margin: '0 10px' }}>|</span> 
            Privacy Policy
          </div>
        </div>

      </div>
    </footer>
  );
}

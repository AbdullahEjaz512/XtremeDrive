import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Shield, CheckCircle, Clock, Zap, Users } from 'lucide-react';

export default function SellLandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', backgroundColor: '#f2f3f3', paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <section style={{ backgroundColor: '#1a3b5d', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '15px' }}>Sell Your Car in Pakistan</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Get the best price for your car with XtremeDrive</p>
        </div>
      </section>

      <section className="container" style={{ marginTop: '-40px' }}>
        <div className="grid grid-2" style={{ gap: '30px' }}>
          
          {/* Option 1: Sell It Myself */}
          <div className="card-pakwheels" style={{ padding: '40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '20px' }}>
              <Tag size={48} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px' }}>Sell It Myself</h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '15px' }}>
              Post your ad for free and manage the sale yourself. Ideal for those who want full control.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="var(--primary)" /> Post your ad for free in 3 easy steps
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="var(--primary)" /> Get genuine offers from verified buyers
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="var(--primary)" /> Sell your car fast at the best price
              </li>
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <button 
                onClick={() => navigate('/post-ad')}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '15px', fontSize: '16px', fontWeight: 700 }}
              >
                Post Your Ad
              </button>
            </div>
          </div>

          {/* Option 2: Sell It For Me */}
          <div className="card-pakwheels" style={{ padding: '40px', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '5px solid #b73439' }}>
            <div style={{ color: '#b73439', marginBottom: '20px' }}>
              <Shield size={48} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1a3b5d', marginBottom: '20px' }}>Sell It For Me</h2>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '15px' }}>
              Let XtremeDrive experts handle the entire selling process for you. Safe, secure, and hassle-free.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="#b73439" /> Dedicated Sales Expert to sell your car
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="#b73439" /> We take care of advertising & buyers
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#444' }}>
                <CheckCircle size={18} color="#b73439" /> We ensure safe & secure transaction
              </li>
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <button 
                className="btn" 
                style={{ width: '100%', padding: '15px', fontSize: '16px', fontWeight: 700, background: '#b73439', color: 'white' }}
              >
                Register Your Car
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Why Sell with Us? */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#1a3b5d' }}>Why Sell with XtremeDrive?</h2>
          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Zap size={32} />
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '10px' }}>Fast Sale</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Most cars sell within 48 hours of posting.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Users size={32} />
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '10px' }}>Millions of Buyers</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Reach the largest network of car buyers in Pakistan.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Clock size={32} />
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '10px' }}>Save Time</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>Manage everything from your phone, anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

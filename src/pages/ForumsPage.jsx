import React from 'react';
import { MessageSquare, Users, TrendingUp, Search, Plus, Filter, Layout, ShieldCheck, Zap, Map } from 'lucide-react';

export default function ForumsPage() {
  const categories = [
    { title: 'General Car Discussion', icon: <Layout />, count: '245k', color: '#1a3b5d', sub: 'Talk about anything related to cars.' },
    { title: 'Mechanical & Technical', icon: <Settings />, count: '180k', color: '#b73439', sub: 'Engine, transmission, and more.' },
    { title: 'Wheels & Tyres', icon: <Zap />, count: '45k', color: '#069694', sub: 'The right shoes for your ride.' },
    { title: 'Travel & Touring', icon: <Map />, count: '92k', color: '#f5a623', sub: 'Road trips, motels and routes.' }
  ];

  const latestTopics = [
    { title: 'Honda Civic RS 2024 - Real World Fuel Average?', category: 'General', author: 'Hamza_CarGuy', replies: 42, views: '1.2k', time: '5m' },
    { title: 'Need advice: Toyota Corolla Altis 1.6 vs 1.8', category: 'Buying Advice', author: 'Zeeshan99', replies: 15, views: '800', time: '12m' },
    { title: 'Brake pad replacement cost for Suzuki Alto?', category: 'Technical', author: 'Ali_786', replies: 8, views: '450', time: '45m' },
    { title: 'Driving License Verification - Online Portal Down?', category: 'Registration', author: 'Sajid_Khan', replies: 31, views: '2.1k', time: '1h' },
    { title: 'Karakoram Highway Road Condition June 2024', category: 'Travel', author: 'AdventurerPak', replies: 56, views: '5.4k', time: '2h' }
  ];

  return (
    <div className="animate-fade" style={{ backgroundColor: '#f5f7f9', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Community Header */}
      <section style={{ backgroundColor: '#1a3b5d', color: 'white', padding: '60px 0', borderBottom: '4px solid #b73439' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Automotive Community</h1>
              <p style={{ fontSize: '18px', opacity: 0.85 }}>Share, Discuss, and Connect with experts across Pakistan.</p>
              <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>1.2M</div>
                  <div style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Posts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>450K</div>
                  <div style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Members</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800 }}>2.5K</div>
                  <div style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase' }}>Online Now</div>
                </div>
              </div>
            </div>
            <div className="desktop-only">
              <button className="btn" style={{ backgroundColor: 'white', color: '#1a3b5d', padding: '15px 30px', borderRadius: '4px', fontWeight: 800, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Plus size={20} /> START NEW TOPIC
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
          
          <main>
            {/* Top Categories Grid */}
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#333', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               Main Categories
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '50px' }}>
              {categories.map((cat, i) => (
                <div key={i} className="card-pakwheels hover-lift" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ backgroundColor: cat.color, color: 'white', padding: '12px', borderRadius: '8px' }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#1a3b5d', marginBottom: '4px' }}>{cat.title}</h4>
                    <p style={{ fontSize: '12px', color: '#666' }}>{cat.sub}</p>
                    <div style={{ fontSize: '11px', color: cat.color, fontWeight: 700, marginTop: '8px' }}>{cat.count} Topics</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Topics Filter & List */}
            <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #eee', overflow: 'hidden' }}>
              <div style={{ padding: '15px 25px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#b73439', borderBottom: '2px solid #b73439', paddingBottom: '4px', cursor: 'pointer' }}>LATEST</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#666', cursor: 'pointer' }}>TRENDING</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#666', cursor: 'pointer' }}>TOP</span>
                </div>
                <div style={{ position: 'relative', width: '250px' }}>
                  <input type="text" placeholder="Search discussions..." style={{ padding: '10px 15px 10px 40px', fontSize: '13px', backgroundColor: 'white' }} />
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
                </div>
              </div>

              <div>
                {latestTopics.map((topic, i) => (
                  <div key={i} style={{ padding: '20px 25px', borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#eee', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontWeight: 700 }}>
                        {topic.author[0]}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1a3b5d', cursor: 'pointer', lineHeight: '1.4' }}>{topic.title}</h4>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#999', marginTop: '6px' }}>
                          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{topic.category}</span>
                          <span>•</span>
                          <span>Started by <b style={{ color: '#666' }}>{topic.author}</b></span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '40px', textAlign: 'center', flexShrink: 0, paddingLeft: '20px' }}>
                      <div>
                        <div style={{ fontWeight: 800, color: '#333' }}>{topic.replies}</div>
                        <div style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>Replies</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, color: '#333' }}>{topic.views}</div>
                        <div style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>Views</div>
                      </div>
                      <div style={{ minWidth: '60px' }}>
                        <div style={{ fontWeight: 800, color: '#b73439' }}>{topic.time}</div>
                        <div style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>Ago</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                <button style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>LOAD MORE DISCUSSIONS</button>
              </div>
            </div>
          </main>

          <aside>
            {/* Top Contributors */}
            <div className="card-pakwheels" style={{ padding: '25px', marginBottom: '30px' }}>
              <h4 style={{ fontWeight: 800, fontSize: '16px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Top Contributors</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { name: 'Dr_Autos', points: '15,420', active: true },
                  { name: 'Xtreme_Rider', points: '12,100', active: false },
                  { name: 'Pak_Petrol_Head', points: '9,800', active: true }
                ].map((user, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: '#eee', borderRadius: '50%' }}></div>
                      {user.active && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', backgroundColor: '#4caf50', border: '2px solid white', borderRadius: '50%' }}></div>}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>{user.name}</div>
                      <div style={{ fontSize: '11px', color: '#999' }}>{user.points} points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Tags */}
            <div className="card-pakwheels" style={{ padding: '25px', marginBottom: '30px' }}>
              <h4 style={{ fontWeight: 800, fontSize: '16px', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Trending Tags</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['CivicRS', 'HybridTech', 'LHR_Auto_Show', 'New_EV_Policy', 'SuzukiAlto', 'Modification', 'TravelPak'].map(tag => (
                  <span key={tag} style={{ padding: '6px 12px', backgroundColor: '#f0f4f8', color: '#1a3b5d', fontSize: '11px', fontWeight: 700, borderRadius: '20px', cursor: 'pointer' }}>#{tag}</span>
                ))}
              </div>
            </div>

            {/* Community Rules */}
            <div style={{ padding: '20px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#856404', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} /> Community Guidelines
              </h4>
              <p style={{ fontSize: '12px', color: '#856404', lineHeight: '1.5' }}>
                Please maintain respect and follow automotive safety standards in all discussions. No spamming or promotion allowed.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

// Missing Lucide icons shim for this specific component
const Settings = () => <MessageSquare size={18} />;

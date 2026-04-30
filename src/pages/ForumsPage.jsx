import React from 'react';
import { MessageSquare, Users, TrendingUp, Search } from 'lucide-react';

export default function ForumsPage() {
  const topics = [
    { title: 'Toyota Corolla Owners & Fan Club', posts: '15.2K', members: '8.4K', lastPost: '2 mins ago' },
    { title: 'Used Car Buying Advice', posts: '42.1K', members: '12K', lastPost: '10 mins ago' },
    { title: 'Mechanical & Electrical Repairs', posts: '28.5K', members: '6.2K', lastPost: '15 mins ago' },
    { title: 'New Car Launches in Pakistan', posts: '5.6K', members: '3.1K', lastPost: '1 hour ago' }
  ];

  return (
    <div className="animate-fade" style={{ backgroundColor: '#f2f3f3', paddingBottom: '60px' }}>
      <section style={{ backgroundColor: '#1a3b5d', color: 'white', padding: '60px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px' }}>XtremeDrive Forums</h1>
          <p style={{ opacity: 0.8 }}>Join the largest automotive community in Pakistan</p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
          
          <div>
            <div className="card-pakwheels" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '15px 20px', backgroundColor: '#fafafa', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1a3b5d' }}>Recent Topics</h3>
                <div style={{ position: 'relative', width: '200px' }}>
                  <input type="text" placeholder="Search forum..." style={{ padding: '8px 30px 8px 15px', fontSize: '13px' }} />
                  <Search size={14} style={{ position: 'absolute', right: '10px', top: '10px', color: '#999' }} />
                </div>
              </div>
              <div style={{ padding: '0 20px' }}>
                {topics.map((topic, idx) => (
                  <div key={idx} style={{ padding: '20px 0', borderBottom: idx === topics.length - 1 ? 'none' : '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--primary)', marginBottom: '5px', cursor: 'pointer' }}>{topic.title}</h4>
                      <p style={{ fontSize: '12px', color: '#666' }}>Last post: {topic.lastPost}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '30px', textAlign: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{topic.posts}</div>
                        <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase' }}>Posts</div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{topic.members}</div>
                        <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase' }}>Members</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="card-pakwheels" style={{ padding: '20px', marginBottom: '20px' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="var(--primary)" /> Trending Now
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ color: '#444', cursor: 'pointer' }}>• Electric Vehicle policy 2024</li>
                <li style={{ color: '#444', cursor: 'pointer' }}>• Best engine oil for Honda City</li>
                <li style={{ color: '#444', cursor: 'pointer' }}>• Car registration issues LHR</li>
              </ul>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 700 }}>
              Start New Topic
            </button>
          </aside>

        </div>
      </div>
    </div>
  );
}

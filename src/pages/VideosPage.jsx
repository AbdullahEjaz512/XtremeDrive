import React from 'react';
import { Play, Filter, Clock, Eye } from 'lucide-react';

export default function VideosPage() {
  const videos = [
    { id: 1, title: 'Toyota Corolla Altis X 1.6 - Expert Review', views: '250K', time: '2 days ago', duration: '12:45' },
    { id: 2, title: 'Honda Civic RS 2024 - 0 to 100 Test', views: '1.2M', time: '1 week ago', duration: '08:20' },
    { id: 3, title: 'Top 5 Used Cars under 20 Lakhs', views: '450K', time: '3 days ago', duration: '15:10' },
    { id: 4, title: 'Suzuki Swift vs Hyundai i20 - Drag Race', views: '890K', time: '5 days ago', duration: '10:30' }
  ];

  return (
    <div className="animate-fade" style={{ backgroundColor: '#f2f3f3', paddingBottom: '60px' }}>
      <section style={{ backgroundColor: '#1a3b5d', color: 'white', padding: '60px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px' }}>Automotive Videos</h1>
          <p style={{ opacity: 0.8 }}>Expert reviews, drag races, and car comparisons</p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        <div className="grid grid-4" style={{ gap: '25px' }}>
          {videos.map(video => (
            <div key={video.id} className="card-pakwheels hover-lift" style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative', background: '#000', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={48} color="white" style={{ opacity: 0.8 }} />
                <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '12px', padding: '2px 6px', borderRadius: '4px' }}>
                  {video.duration}
                </span>
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1a3b5d', marginBottom: '10px', height: '40px', overflow: 'hidden' }}>{video.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} /> {video.views}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {video.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

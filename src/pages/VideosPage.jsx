import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Search, Clock, Eye, ChevronRight, Share2, MoreHorizontal } from 'lucide-react';

const VideoCard = ({ title, views, date, duration, img, category }) => (
  <div className="card-pakwheels hover-lift" style={{ cursor: 'pointer', overflow: 'hidden' }}>
    <div style={{ position: 'relative', background: '#000', aspectRatio: '16/9', overflow: 'hidden' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(183, 52, 57, 0.9)', borderRadius: '50%', padding: '12px' }}>
        <Play size={24} color="white" fill="white" />
      </div>
      <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '11px', padding: '2px 6px', borderRadius: '2px', fontWeight: 700 }}>
        {duration}
      </span>
      {category && (
        <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#b73439', color: 'white', fontSize: '10px', padding: '3px 8px', borderRadius: '2px', fontWeight: 800 }}>
          {category}
        </span>
      )}
    </div>
    <div style={{ padding: '15px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1a3b5d', marginBottom: '8px', lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#888', fontWeight: 600 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={13} /> {views}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {date}</span>
      </div>
    </div>
  </div>
);

const VideoSection = ({ title, videos }) => (
  <div style={{ marginBottom: '60px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '12px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1a3b5d' }}>{title}</h2>
      <Link to="#" style={{ color: '#b73439', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
        View All <ChevronRight size={16} />
      </Link>
    </div>
    <div className="grid grid-4" style={{ gap: '20px' }}>
      {videos.map((video, idx) => (
        <VideoCard key={idx} {...video} />
      ))}
    </div>
  </div>
);

export default function VideosPage() {
  const expertReviews = [
    { title: 'Toyota Corolla Altis X 1.6 - Expert Review', views: '250K', date: '2 days ago', duration: '15:20', img: '/oshan_x7_suv_1777553388111.png', category: 'EXPERT REVIEW' },
    { title: 'Honda Civic RS 2024 - Full In-depth Review', views: '1.2M', date: '1 week ago', duration: '22:10', img: '/honda_civic_white_1777553410229.png', category: 'EXPERT REVIEW' },
    { title: 'Changan Oshan X7 - Future of SUVs in Pakistan?', views: '450K', date: '3 days ago', duration: '18:45', img: '/oshan_x7_suv_1777553388111.png', category: 'EXPERT REVIEW' },
    { id: 4, title: 'Suzuki Swift vs Hyundai i20 - Drag Race', views: '890K', date: '5 days ago', duration: '12:15', img: '/video_drag_race_1777553883991.png', category: 'DRAG RACE' }
  ];

  const ownersReviews = [
    { title: 'Suzuki Alto VXL - Owner Honest Review after 50,000km', views: '180K', date: '4 days ago', duration: '10:30', img: '/owner_review_alto_1777553907159.png', category: 'OWNER REVIEW' },
    { title: 'Kia Sportage AWD - 2 Years Ownership Experience', views: '95K', date: '2 weeks ago', duration: '14:20', img: '/video_drag_race_1777553883991.png', category: 'OWNER REVIEW' },
    { title: 'Honda City 1.2 LS - Fuel Average & Maintenance', views: '210K', date: '1 month ago', duration: '12:50', img: '/honda_civic_white_1777553410229.png', category: 'OWNER REVIEW' },
    { title: 'Toyota Yaris ATIV X - Why I bought it?', views: '150K', date: '3 weeks ago', duration: '11:45', img: '/oshan_x7_suv_1777553388111.png', category: 'OWNER REVIEW' }
  ];

  const tipsHacks = [
    { title: 'How to clean your car engine like a Pro!', views: '320K', date: '5 days ago', duration: '08:15', img: '/tips_hacks_engine_1777553928970.png', category: 'TIPS & HACKS' },
    { title: '5 Secret Features of your Car you didn\'t know!', views: '500K', date: '1 week ago', duration: '06:40', img: '/car_maintenance_tips_1777553474865.png', category: 'TIPS & HACKS' },
    { title: 'Summer Maintenance Guide for your Vehicle', views: '120K', date: '2 days ago', duration: '15:30', img: '/car_maintenance_tips_1777553474865.png', category: 'TIPS & HACKS' },
    { title: 'How to improve fuel average of any car?', views: '1M', date: '1 year ago', duration: '10:10', img: '/suzuki_alto_eco_1777553431477.png', category: 'TIPS & HACKS' }
  ];

  return (
    <div className="videos-container animate-fade" style={{ backgroundColor: '#fff', color: '#333' }}>
      
      {/* Search Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
            <input 
              type="text" 
              placeholder="Search videos, reviews, drag races..." 
              style={{ 
                flex: 1, padding: '15px 25px', fontSize: '16px', border: '1px solid #ddd', 
                borderRadius: '4px 0 0 4px', outline: 'none' 
              }} 
            />
            <button style={{ 
              backgroundColor: '#b73439', color: 'white', padding: '0 30px', 
              borderRadius: '0 4px 4px 0', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700
            }}>
              <Search size={20} /> SEARCH
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        
        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '15px', marginBottom: '60px', height: '520px' }}>
          {/* Main Video */}
          <div style={{ position: 'relative', background: '#000', overflow: 'hidden', borderRadius: '4px' }}>
            <img src="/deepal_s07_electric_1777553454321.png" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(183, 52, 57, 0.95)', borderRadius: '50%', padding: '25px', cursor: 'pointer' }}>
              <Play size={48} color="white" fill="white" />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '50px 35px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', color: 'white' }}>
              <span style={{ backgroundColor: '#b73439', padding: '5px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '2px' }}>EXPERT REVIEW</span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, marginTop: '20px', lineHeight: '1.2' }}>Deepal S07 SUV - First Look & In-depth Review</h1>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', marginTop: '15px', opacity: 0.9, fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> 1.5M Views</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> 1 day ago</span>
              </div>
            </div>
          </div>

          {/* Side List */}
          <div style={{ background: '#f9f9f9', borderRadius: '4px', border: '1px solid #eee', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1a3b5d' }}>Recently Added</h3>
              <MoreHorizontal size={20} color="#888" cursor="pointer" />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {expertReviews.map((video, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '15px', padding: '10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }} className="hover-bg-gray">
                  <div style={{ width: '120px', height: '70px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img src={video.img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '9px', padding: '1px 4px', borderRadius: '2px' }}>{video.duration}</div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#333', lineHeight: '1.3', height: '34px', overflow: 'hidden' }}>{video.title}</h4>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '5px' }}>{video.views} views • {video.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="#" style={{ padding: '15px', textAlign: 'center', background: '#fff', borderTop: '1px solid #eee', fontSize: '13px', fontWeight: 800, color: '#b73439' }}>VIEW ALL VIDEOS</Link>
          </div>
        </div>

        {/* Video Categories */}
        <VideoSection title="Expert Car Reviews" videos={expertReviews} />
        <VideoSection title="Owners' Reviews" videos={ownersReviews} />
        
        {/* Banner Section (Optional placeholder for ads or featured series) */}
        <div style={{ width: '100%', height: '120px', backgroundColor: '#1a3b5d', borderRadius: '4px', marginBottom: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>XtremeDrive Original Series</h3>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>Coming Soon: Project Car Build Season 2</p>
          </div>
        </div>

        <VideoSection title="Tips, Hacks & DIYs" videos={tipsHacks} />

      </div>

      {/* Footer Top Strip (Vlogs) */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Vlogs & Events</h2>
            <Link to="#" style={{ color: '#b73439', fontSize: '14px', fontWeight: 700 }}>Explore More</Link>
          </div>
          <div className="grid grid-3" style={{ gap: '25px' }}>
            {[
              { title: 'PakWheels Auto Show Lahore 2024 - Mega Coverage', views: '800K', date: '3 months ago', duration: '45:00', img: '/video_drag_race_1777553883991.png' },
              { title: 'Off-Roading Challenge in Cholistan Desert', views: '450K', date: '1 month ago', duration: '32:15', img: '/oshan_x7_suv_1777553388111.png' },
              { title: 'Classic Car Rally - Islamabad to Peshawar', views: '120K', date: '2 weeks ago', duration: '28:40', img: '/honda_civic_white_1777553410229.png' }
            ].map((v, i) => (
              <div key={i} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '220px' }}>
                <img src={v.img} alt="vlog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px' }}>
                  <h4 style={{ color: 'white', fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{v.title}</h4>
                  <div style={{ color: 'white', opacity: 0.8, fontSize: '12px' }}>{v.views} views • {v.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

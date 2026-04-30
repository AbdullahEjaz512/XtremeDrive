import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, Users, Star, Layout, Clock, ChevronRight, MessageSquare } from 'lucide-react';

export default function BlogPage() {
  const featuredNews = [
    { id: 1, title: 'Deepal S07 and L07 Prices in Pakistan Revealed!', category: 'PRICES', date: 'May 16, 2024', img: '/oshan_x7_suv_1777553388111.png' }, // Using a high-quality SUV image
    { id: 2, title: 'Hyundai Santa Fe Hybrid Price Decreased', category: 'NEWS', date: 'May 15, 2024', img: '/deepal_s07_electric_1777553454321.png' },
    { id: 3, title: 'Kia Lucky Motors Announces Big Price Cut', category: 'PRICES', date: 'May 14, 2024', img: '/honda_civic_white_1777553410229.png' }
  ];

  const mainNewsList = [
    { id: 4, title: 'Oshan X7 Price Slashed by Up to Rs. 400,000', excerpt: 'Changan Pakistan has announced a significant price reduction for its popular SUV...', date: '1 day ago', category: 'PRICES', img: '/oshan_x7_suv_1777553388111.png' },
    { id: 5, title: 'Honda City & Civic Prices Also Going Down?', excerpt: 'Speculations are high as competitors reduce prices. Here is what we know...', date: '2 days ago', category: 'NEWS', img: '/honda_civic_white_1777553410229.png' },
    { id: 6, title: '5 Best Fuel Efficient Cars in Pakistan 2024', excerpt: 'With rising petrol prices, these cars will save your wallet. Check our top picks...', date: '3 days ago', category: 'TIPS', img: '/suzuki_alto_eco_1777553431477.png' },
    { id: 7, title: 'Deepal S07 SUV - First Look & Review', excerpt: 'Master Changan is bringing pure electric SUVs to Pakistan. Is it worth it?', date: '4 days ago', category: 'REVIEWS', img: '/deepal_s07_electric_1777553454321.png' }
  ];

  const popularTags = ['Price', 'Suzuki', 'Toyota', 'Honda', 'Review', 'Used Car', 'Electric', 'Hybrid', 'Tips'];

  return (
    <div className="blog-container animate-fade" style={{ backgroundColor: '#fff', color: '#333' }}>
      
      {/* Search Header */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
            <input 
              type="text" 
              placeholder="Search news, reviews, blogs..." 
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
        
        {/* Featured Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '8px', marginBottom: '50px', height: '480px' }}>
          <div style={{ position: 'relative', background: '#333', overflow: 'hidden', borderRadius: '4px' }}>
            <img src={featuredNews[0].img} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '50px 35px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', color: 'white' }}>
              <span style={{ backgroundColor: '#b73439', padding: '5px 12px', fontSize: '12px', fontWeight: 800, borderRadius: '2px' }}>{featuredNews[0].category}</span>
              <h1 style={{ fontSize: '32px', fontWeight: 800, marginTop: '20px', lineHeight: '1.2' }}>{featuredNews[0].title}</h1>
              <div style={{ fontSize: '14px', marginTop: '12px', opacity: 0.9 }}>{featuredNews[0].date}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {featuredNews.slice(1).map(news => (
              <div key={news.id} style={{ position: 'relative', background: '#333', flex: 1, overflow: 'hidden', borderRadius: '4px' }}>
                <img src={news.img} alt="Side" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '25px', background: 'linear-gradient(transparent, rgba(0,0,0,0.95))', color: 'white' }}>
                  <span style={{ backgroundColor: '#b73439', padding: '4px 10px', fontSize: '11px', fontWeight: 800, borderRadius: '2px' }}>{news.category}</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '12px', lineHeight: '1.3' }}>{news.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Body Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '60px' }}>
          
          {/* Left: News List */}
          <main>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#b73439', borderBottom: '3px solid #b73439', paddingBottom: '12px', marginBottom: '35px', display: 'inline-block' }}>Latest News</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {mainNewsList.map(news => (
                <div key={news.id} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '25px' }}>
                  <div style={{ backgroundColor: '#eee', aspectRatio: '16/10', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={news.img} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <span style={{ color: '#b73439', fontSize: '11px', fontWeight: 800 }}>{news.category}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '8px 0', color: '#1a3b5d', cursor: 'pointer' }}>{news.title}</h3>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', height: '42px', overflow: 'hidden' }}>{news.excerpt}</p>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#999', marginTop: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {news.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={12} /> 12 Comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '12px', marginTop: '40px', backgroundColor: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
              Load More
            </button>
          </main>

          {/* Right: Sidebar */}
          <aside>
            {/* Social Connect */}
            <div style={{ backgroundColor: '#1a3b5d', padding: '25px', color: 'white', borderRadius: '4px', marginBottom: '35px' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '20px', fontSize: '16px' }}>Connect with Us</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Globe size={24} style={{ cursor: 'pointer' }} />
                <Users size={24} style={{ cursor: 'pointer' }} />
                <Star size={24} style={{ cursor: 'pointer' }} />
                <Layout size={24} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Car Search Widget */}
            <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #eee', padding: '25px', borderRadius: '4px', marginBottom: '35px' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '20px', fontSize: '16px', color: '#b73439' }}>Used Car Search</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <select style={{ padding: '10px', fontSize: '13px' }}><option>Select Make</option></select>
                <select style={{ padding: '10px', fontSize: '13px' }}><option>Select Model</option></select>
                <button className="btn btn-primary" style={{ backgroundColor: '#1a3b5d', width: '100%' }}>Search</button>
              </div>
            </div>

            {/* Popular Tags */}
            <div style={{ marginBottom: '35px' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '20px', fontSize: '16px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Popular Tags</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(tag => (
                  <span key={tag} style={{ padding: '5px 12px', border: '1px solid #ddd', fontSize: '12px', borderRadius: '20px', cursor: 'pointer' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            <div>
              <h4 style={{ fontWeight: 800, marginBottom: '20px', fontSize: '16px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Featured Blogs</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: 'How to protect your car paint in Summer heat?', img: '/car_maintenance_tips_1777553474865.png' },
                  { title: 'Top 10 Car Accessories for 2024', img: '/honda_civic_white_1777553410229.png' },
                  { title: 'Best Electric Cars in Pakistan', img: '/deepal_s07_electric_1777553454321.png' }
                ].map((blog, i) => (
                  <div key={i} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '60px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={blog.img} alt="blog" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: '1.3', cursor: 'pointer' }}>{blog.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>

        {/* Section: News & Tips Horizontal */}
        <div style={{ marginTop: '80px', paddingBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Tips & Advice</h2>
            <Link to="#" style={{ color: '#b73439', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center' }}>View All <ChevronRight size={16} /></Link>
          </div>
          <div className="grid grid-4" style={{ gap: '20px' }}>
            {[
              { title: 'Essential Car Maintenance Tips for Beginners', img: '/car_maintenance_tips_1777553474865.png' },
              { title: 'How to improve your car fuel average?', img: '/suzuki_alto_eco_1777553431477.png' },
              { title: 'Signs your car battery needs replacement', img: '/honda_civic_white_1777553410229.png' },
              { title: 'Top safest cars available in Pakistan', img: '/oshan_x7_suv_1777553388111.png' }
            ].map((tip, i) => (
              <div key={i} className="card-pakwheels hover-lift" style={{ cursor: 'pointer' }}>
                <div style={{ height: '160px', backgroundColor: '#ddd', overflow: 'hidden' }}>
                  <img src={tip.img} alt="tip" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, lineHeight: '1.4' }}>{tip.title}</h4>
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}>May 10, 2024</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

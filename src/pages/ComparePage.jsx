import React from 'react';
import { Plus, X, Search, GitCompare } from 'lucide-react';

export default function ComparePage() {
  return (
    <div className="animate-fade" style={{ backgroundColor: '#f2f3f3', paddingBottom: '80px' }}>
      <section style={{ backgroundColor: '#1a3b5d', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <GitCompare size={48} style={{ marginBottom: '20px', color: 'var(--primary)' }} />
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '15px' }}>Compare Cars</h1>
          <p style={{ fontSize: '18px', opacity: 0.9 }}>Compare features, specs and prices of cars in Pakistan</p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-40px' }}>
        <div className="card-pakwheels" style={{ padding: '40px', background: 'white' }}>
          <div className="grid grid-3" style={{ gap: '20px' }}>
            
            {/* Slot 1 */}
            <div style={{ border: '2px dashed #ddd', borderRadius: '8px', padding: '40px', textAlign: 'center', backgroundColor: '#fafafa' }}>
              <div style={{ background: '#eee', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#999' }}>
                <Plus size={32} />
              </div>
              <p style={{ fontWeight: 700, color: '#666' }}>Add Car 1</p>
              <div style={{ marginTop: '20px', position: 'relative' }}>
                <input type="text" placeholder="Select Make/Model" style={{ fontSize: '13px' }} />
                <Search size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
              </div>
            </div>

            {/* Slot 2 */}
            <div style={{ border: '2px dashed #ddd', borderRadius: '8px', padding: '40px', textAlign: 'center', backgroundColor: '#fafafa' }}>
              <div style={{ background: '#eee', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#999' }}>
                <Plus size={32} />
              </div>
              <p style={{ fontWeight: 700, color: '#666' }}>Add Car 2</p>
              <div style={{ marginTop: '20px', position: 'relative' }}>
                <input type="text" placeholder="Select Make/Model" style={{ fontSize: '13px' }} />
                <Search size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
              </div>
            </div>

            {/* Slot 3 */}
            <div style={{ border: '2px dashed #ddd', borderRadius: '8px', padding: '40px', textAlign: 'center', backgroundColor: '#fafafa' }}>
              <div style={{ background: '#eee', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#999' }}>
                <Plus size={32} />
              </div>
              <p style={{ fontWeight: 700, color: '#666' }}>Add Car 3</p>
              <div style={{ marginTop: '20px', position: 'relative' }}>
                <input type="text" placeholder="Select Make/Model" style={{ fontSize: '13px' }} />
                <Search size={16} style={{ position: 'absolute', right: '12px', top: '12px', color: '#999' }} />
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="btn btn-primary" style={{ padding: '15px 60px', fontSize: '18px', fontWeight: 800 }}>
              Compare
            </button>
          </div>
        </div>

        {/* Popular Comparisons */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1a3b5d', marginBottom: '30px' }}>Popular Comparisons</h2>
          <div className="grid grid-2" style={{ gap: '20px' }}>
            {[
              ['Honda Civic', 'Toyota Corolla'],
              ['Suzuki Swift', 'Hyundai Tucson'],
              ['KIA Sportage', 'Hyundai Tucson'],
              ['Toyota Yaris', 'Honda City']
            ].map((pair, idx) => (
              <div key={idx} className="card-pakwheels hover-lift" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#f5f5f5', width: '60px', height: '40px', borderRadius: '4px', marginBottom: '5px' }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{pair[0]}</span>
                  </div>
                  <div style={{ color: '#999', fontSize: '12px', fontWeight: 800 }}>VS</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ background: '#f5f5f5', width: '60px', height: '40px', borderRadius: '4px', marginBottom: '5px' }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 700 }}>{pair[1]}</span>
                  </div>
                </div>
                <button className="btn btn-outline-primary" style={{ padding: '5px 15px', fontSize: '12px' }}>View Comparison</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

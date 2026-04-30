import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdsPage from './pages/AdsPage';
import AdDetailPage from './pages/AdDetailPage';
import PostAdPage from './pages/PostAdPage';
import NewCarsPage from './pages/NewCarsPage';
import BikesPage from './pages/BikesPage';
import AutoStorePage from './pages/AutoStorePage';
import SellLandingPage from './pages/SellLandingPage';
import VideosPage from './pages/VideosPage';
import ForumsPage from './pages/ForumsPage';
import BlogPage from './pages/BlogPage';
import ComparePage from './pages/ComparePage';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/ads/:id" element={<AdDetailPage />} />
          <Route path="/sell" element={<SellLandingPage />} />
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/new-cars" element={<NewCarsPage />} />
          <Route path="/bikes" element={<BikesPage />} />
          <Route path="/auto-store" element={<AutoStorePage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/forums" element={<ForumsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

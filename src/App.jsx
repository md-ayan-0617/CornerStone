import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CornerstoneMotif from './components/CornerstoneMotif';

// Dedicated Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || "/");
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Minimal refined loader per Section 43
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Listen for browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsTransitioning(true);
    window.history.pushState({}, '', path);

    setTimeout(() => {
      setCurrentPath(path);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 220);
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case "/services":
        return <ServicesPage onNavigate={navigate} />;
      case "/work":
        return <WorkPage onNavigate={navigate} />;
      case "/about":
        return <AboutPage onNavigate={navigate} />;
      case "/contact":
        return <ContactPage onNavigate={navigate} />;
      case "/":
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
          <CornerstoneMotif size={28} variant="mark" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: '#F4F3EF'
            }}
          >
            CORNERSTONE
          </span>
        </div>

        {/* Minimal architectural line loading indicator */}
        <div style={{ width: '120px', height: '1.5px', backgroundColor: '#222', position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '45%',
              backgroundColor: '#B8FF3D',
              animation: 'loadLine 0.5s ease-in-out infinite'
            }}
          />
        </div>

        <style>{`
          @keyframes loadLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'var(--color-near-black)',
        color: 'var(--color-warm-white)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Desktop Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Global Architectural Navigation */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Page Content with Transition Fade */}
      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: '100vw',
          overflowX: 'hidden',
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.22s ease-out, transform 0.22s ease-out'
        }}
      >
        {renderCurrentPage()}
      </main>

      {/* Global Large Editorial Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;

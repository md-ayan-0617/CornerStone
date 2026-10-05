import React, { useEffect, useRef } from 'react';
import CornerstoneMotif from './CornerstoneMotif';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

export const Hero = ({ onExploreWork, onStartProject }) => {
  const canvasRef = useRef(null);

  // Cinematic architectural background canvas: subtle structural grid, subtle moving beam, precision coordinates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let tick = 0;

    const render = () => {
      tick += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      // Architectural faint grid
      const gridSize = Math.max(50, Math.floor(width / 14));
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Subtle dynamic architectural beam / gradient sweep
      const sweepX = (Math.sin(tick) * 0.5 + 0.5) * width;
      const gradient = ctx.createRadialGradient(
        sweepX,
        height * 0.45,
        20,
        sweepX,
        height * 0.45,
        Math.min(width * 0.6, 600)
      );
      gradient.addColorStop(0, 'rgba(184, 255, 61, 0.035)');
      gradient.addColorStop(0.5, 'rgba(20, 20, 20, 0.015)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle architectural crosshairs at key intersections
      ctx.fillStyle = 'rgba(244, 243, 239, 0.15)';
      ctx.font = '10px monospace';
      for (let x = gridSize; x < width; x += gridSize * 3) {
        for (let y = gridSize; y < height; y += gridSize * 3) {
          ctx.fillText('+', x - 3, y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(5.5rem, 12vh, 8.5rem)',
        paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
        backgroundColor: 'var(--color-near-black)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Hero Content Layer */}
      <div className="site-container" style={{ position: 'relative', zIndex: 2, width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Top Eyebrow / Architectural Coordinate */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: 'clamp(1.5rem, 3.5vh, 2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label" style={{ letterSpacing: '0.16em', color: 'var(--color-warm-white)' }}>
              CORNERSTONE / DIGITAL SYSTEMS + CREATIVE
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
              EST. 2026 • ARCHITECTURAL AI
            </span>
            <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
          </div>
        </div>

        {/* Main Massive Headline */}
        <h1
          className="display-mega"
          style={{
            margin: '0 0 clamp(1.5rem, 3.5vh, 2.5rem) 0',
            maxWidth: '12ch',
            color: 'var(--color-warm-white)'
          }}
        >
          BUILD<br />
          WHAT'S<br />
          NEXT.
        </h1>

        {/* Supporting Copy & Grid Intersect */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 4vw, 3.5rem)',
            alignItems: 'end',
            paddingTop: 'clamp(1rem, 2vh, 2rem)',
            borderTop: '1px solid var(--color-border-gray)'
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
                lineHeight: 1.45,
                color: 'var(--color-warm-white)',
                maxWidth: '38ch',
                margin: 0
              }}
            >
              AI systems, digital experiences and creative built for modern businesses.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
                lineHeight: 1.6,
                color: 'var(--color-muted-gray)',
                maxWidth: '44ch',
                marginTop: '0.75rem'
              }}
            >
              We engineer the digital foundation behind customer acquisition, 24/7 autonomous communication, and business scale.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onStartProject}
              className="btn-cornerstone"
              style={{ padding: '1rem 1.85rem' }}
              data-cursor="CONTACT"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={onExploreWork}
              className="btn-cornerstone-secondary"
              style={{ padding: '1rem 1.85rem' }}
              data-cursor="PORTFOLIO"
            >
              <span>EXPLORE WORK</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Technical Telemetry Bar */}
      <div className="site-container" style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span className="micro-label">LATENCY &lt; 600MS</span>
            <span className="micro-label">FULL-FUNNEL SYNCHRONIZATION</span>
            <span className="micro-label">ENTERPRISE COMPLIANT</span>
          </div>

          <button
            onClick={onExploreWork}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-muted-gray)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0
            }}
          >
            <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>SCROLL TO DISCOVER</span>
            <ArrowDown size={14} color="#B8FF3D" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

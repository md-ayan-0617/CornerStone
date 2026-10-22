import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LOCAL_ADS_IMAGES } from '../data/adsProjects';
import CornerstoneMotif from './CornerstoneMotif';
import { Maximize2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HomePhotographyGrid = ({ onSelectImage, onNavigate }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.home-photo-reveal, .home-photo-card', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'all'
        });
        return;
      }

      // Section Header Entrance
      gsap.fromTo(
        '.home-photo-reveal',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Editorial Image Cards Staggered Reveal
      gsap.fromTo(
        '.home-photo-card',
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: '#home-photography-mosaic',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home-photography-grid"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        borderBottom: '1px solid var(--color-border-gray)',
        paddingTop: 'clamp(4.5rem, 8vw, 7rem)',
        paddingBottom: 'clamp(5rem, 9vw, 7.5rem)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container">
        {/* Section Header: Minimal Single-Line Focus */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div
            className="home-photo-reveal"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.65rem' }}
          >
            <CornerstoneMotif size={14} variant="bracket" />
            <span
              className="micro-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--color-lime)',
                letterSpacing: '0.14em',
                fontWeight: 600
              }}
            >
              CAMPAIGNS / 001—010
            </span>
          </div>

          <div
            className="home-photo-reveal"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <h2
              className="display-large"
              style={{
                margin: 0,
                fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
                lineHeight: 1.1,
                whiteSpace: 'nowrap'
              }}
            >
              DIRECTED TO RETAIN DESIRE.
            </h2>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/ads')}
                className="btn-cornerstone-ghost"
                style={{
                  padding: '0.55rem 1.15rem',
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>VIEW COMPLETE ADS PORTFOLIO</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>

          <p
            className="home-photo-reveal"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-muted-gray)',
              margin: '0.65rem 0 0 0'
            }}
          >
            Ten commercial campaign stills engineered with precision lighting and luxury art direction.
          </p>
        </div>

        {/* ===================================================================
            EDITORIAL STATIC IMAGE MOSAIC (ALL 10 VERIFIED LOCAL IMAGES)
            Responsive, varying proportions, no horizontal scrolling or pinning
            =================================================================== */}
        <div id="home-photography-mosaic" className="home-photo-mosaic-layout">
          {/* Row 1: Featured 9:16 Tall Portrait (Image 01) + 2 Editorial Stills (Images 02 & 03) */}
          <div className="home-mosaic-row-1">
            {/* Card 01: Featured Tall (Lumière) */}
            <div
              className="home-photo-card group featured-tall"
              onClick={() => onSelectImage && onSelectImage(LOCAL_ADS_IMAGES[0])}
              role="button"
              tabIndex={0}
              aria-label={`View ${LOCAL_ADS_IMAGES[0].title}`}
            >
              <div className="card-media-wrapper">
                <img
                  src={LOCAL_ADS_IMAGES[0].imageUrl}
                  alt={LOCAL_ADS_IMAGES[0].title}
                  loading="eager"
                  className="photo-img"
                />
                <div className="photo-vignette" />
              </div>

              {/* Floating Minimal Info */}
              <div className="photo-card-top">
                <span className="photo-badge">{LOCAL_ADS_IMAGES[0].number} // {LOCAL_ADS_IMAGES[0].category}</span>
                <div className="photo-expand-btn"><Maximize2 size={13} /></div>
              </div>

              <div className="photo-card-bottom">
                <span className="photo-client">{LOCAL_ADS_IMAGES[0].client}</span>
                <h3 className="photo-title">{LOCAL_ADS_IMAGES[0].title}</h3>
              </div>
            </div>

            {/* Cards 02 & 03: Stacked or Side-by-Side (Dot & Key, Dior) */}
            <div className="home-mosaic-subgrid-2">
              {[LOCAL_ADS_IMAGES[1], LOCAL_ADS_IMAGES[2]].map((img) => (
                <div
                  key={img.id}
                  className="home-photo-card group"
                  onClick={() => onSelectImage && onSelectImage(img)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${img.title}`}
                >
                  <div className="card-media-wrapper">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      loading="lazy"
                      className="photo-img"
                    />
                    <div className="photo-vignette" />
                  </div>

                  <div className="photo-card-top">
                    <span className="photo-badge">{img.number} // {img.category}</span>
                    <div className="photo-expand-btn"><Maximize2 size={13} /></div>
                  </div>

                  <div className="photo-card-bottom">
                    <span className="photo-client">{img.client}</span>
                    <h3 className="photo-title">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: 3-Column Balanced Triad (Images 04, 05, 06 - Aurora, Minimalist, Solitaire) */}
          <div className="home-mosaic-row-3col">
            {[LOCAL_ADS_IMAGES[3], LOCAL_ADS_IMAGES[4], LOCAL_ADS_IMAGES[5]].map((img) => (
              <div
                key={img.id}
                className="home-photo-card group"
                onClick={() => onSelectImage && onSelectImage(img)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.title}`}
              >
                <div className="card-media-wrapper">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    loading="lazy"
                    className="photo-img"
                  />
                  <div className="photo-vignette" />
                </div>

                <div className="photo-card-top">
                  <span className="photo-badge">{img.number} // {img.category}</span>
                  <div className="photo-expand-btn"><Maximize2 size={13} /></div>
                </div>

                <div className="photo-card-bottom">
                  <span className="photo-client">{img.client}</span>
                  <h3 className="photo-title">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Complementary Editorial Pair + Featured Hero (Images 07, 08, 09) */}
          <div className="home-mosaic-row-3">
            {/* Cards 07 & 08: 2 Stills (Fashion Week & House of Quirk) */}
            <div className="home-mosaic-subgrid-2">
              {[LOCAL_ADS_IMAGES[6], LOCAL_ADS_IMAGES[7]].map((img) => (
                <div
                  key={img.id}
                  className="home-photo-card group"
                  onClick={() => onSelectImage && onSelectImage(img)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${img.title}`}
                >
                  <div className="card-media-wrapper">
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      loading="lazy"
                      className="photo-img"
                    />
                    <div className="photo-vignette" />
                  </div>

                  <div className="photo-card-top">
                    <span className="photo-badge">{img.number} // {img.category}</span>
                    <div className="photo-expand-btn"><Maximize2 size={13} /></div>
                  </div>

                  <div className="photo-card-bottom">
                    <span className="photo-client">{img.client}</span>
                    <h3 className="photo-title">{img.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Card 09: Featured Large (Gucci Monograph) */}
            <div
              className="home-photo-card group featured-tall"
              onClick={() => onSelectImage && onSelectImage(LOCAL_ADS_IMAGES[8])}
              role="button"
              tabIndex={0}
              aria-label={`View ${LOCAL_ADS_IMAGES[8].title}`}
            >
              <div className="card-media-wrapper">
                <img
                  src={LOCAL_ADS_IMAGES[8].imageUrl}
                  alt={LOCAL_ADS_IMAGES[8].title}
                  loading="lazy"
                  className="photo-img"
                />
                <div className="photo-vignette" />
              </div>

              <div className="photo-card-top">
                <span className="photo-badge">{LOCAL_ADS_IMAGES[8].number} // {LOCAL_ADS_IMAGES[8].category}</span>
                <div className="photo-expand-btn"><Maximize2 size={13} /></div>
              </div>

              <div className="photo-card-bottom">
                <span className="photo-client">{LOCAL_ADS_IMAGES[8].client}</span>
                <h3 className="photo-title">{LOCAL_ADS_IMAGES[8].title}</h3>
              </div>
            </div>
          </div>

          {/* Row 4: Grand Finale Card (Image 10 - Crumbl California Cruise) */}
          <div className="home-mosaic-row-single">
            <div
              className="home-photo-card group featured-wide"
              onClick={() => onSelectImage && onSelectImage(LOCAL_ADS_IMAGES[9])}
              role="button"
              tabIndex={0}
              aria-label={`View ${LOCAL_ADS_IMAGES[9].title}`}
            >
              <div className="card-media-wrapper">
                <img
                  src={LOCAL_ADS_IMAGES[9].imageUrl}
                  alt={LOCAL_ADS_IMAGES[9].title}
                  loading="lazy"
                  className="photo-img"
                />
                <div className="photo-vignette" />
              </div>

              <div className="photo-card-top">
                <span className="photo-badge">{LOCAL_ADS_IMAGES[9].number} // {LOCAL_ADS_IMAGES[9].category}</span>
                <div className="photo-expand-btn"><Maximize2 size={13} /></div>
              </div>

              <div className="photo-card-bottom">
                <span className="photo-client">{LOCAL_ADS_IMAGES[9].client}</span>
                <h3 className="photo-title">{LOCAL_ADS_IMAGES[9].title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Grid Styling & Micro-Interactions */}
      <style>{`
        .home-photo-mosaic-layout {
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 3.5vw, 3rem);
          width: 100%;
        }
        .home-mosaic-row-1, .home-mosaic-row-3 {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
          align-items: stretch;
        }
        .home-mosaic-row-3 {
          grid-template-columns: 7fr 5fr;
        }
        .home-mosaic-subgrid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }
        .home-mosaic-row-3col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 2.5vw, 2.5rem);
        }
        .home-mosaic-row-single {
          width: 100%;
        }
        .home-photo-card {
          position: relative;
          background-color: #0E0E0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: clamp(18px, 2.2vw, 24px);
          overflow: hidden;
          cursor: pointer;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .home-photo-card.featured-tall {
          min-height: clamp(480px, 60vh, 580px);
        }
        .home-photo-card.featured-wide {
          min-height: clamp(340px, 45vh, 440px);
        }
        .card-media-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .photo-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.2) 65%, rgba(0, 0, 0, 0.88) 100%);
          pointer-events: none;
        }
        .photo-card-top {
          position: relative;
          z-index: 2;
          padding: 1.15rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          pointer-events: none;
        }
        .photo-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--color-lime);
          background-color: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.3rem 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(184, 255, 61, 0.25);
          letter-spacing: 0.12em;
          font-weight: 600;
        }
        .photo-expand-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-warm-white);
          transition: all 0.3s ease;
        }
        .photo-card-bottom {
          position: relative;
          z-index: 2;
          padding: 1.25rem;
          pointer-events: none;
        }
        .photo-client {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 0.2rem;
        }
        .photo-title {
          font-family: var(--font-heading);
          font-size: clamp(0.95rem, 1.4vw, 1.2rem);
          font-weight: 600;
          color: var(--color-warm-white);
          margin: 0;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home-photo-card:hover {
          border-color: rgba(184, 255, 61, 0.4) !important;
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.85), 0 0 35px -10px rgba(184, 255, 61, 0.15);
        }
        .home-photo-card:hover .photo-img {
          transform: scale(1.035);
        }
        .home-photo-card:hover .photo-expand-btn {
          background-color: var(--color-lime);
          color: #000;
          border-color: var(--color-lime);
          transform: scale(1.1);
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .home-mosaic-row-1, .home-mosaic-row-3 {
            grid-template-columns: 1fr;
          }
          .home-mosaic-row-3col {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 640px) {
          .home-mosaic-subgrid-2, .home-mosaic-row-3col {
            grid-template-columns: 1fr;
          }
          .home-photo-card {
            min-height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HomePhotographyGrid;

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Eye } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const CampaignCarousel = ({ collection, onSelectImage }) => {
  if (!collection || !collection.items || collection.items.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const items = collection.items;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#0C0C0C',
        border: '1px solid var(--color-border-gray)',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        overflow: 'hidden'
      }}
    >
      {/* Corner Bracket */}
      <div className="corner-bracket-tl" />
      <div className="corner-bracket-br" />

      {/* Header Info */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-border-gray)',
          paddingBottom: '1.25rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <CornerstoneMotif size={14} variant="mark" />
            <span className="micro-label-lime">{collection.category?.toUpperCase() || 'COLLECTION'}</span>
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 800,
              color: 'var(--color-warm-white)',
              margin: '0 0 0.4rem 0',
              letterSpacing: '-0.02em'
            }}
          >
            {collection.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: 'var(--color-muted-gray)',
              maxWidth: '56ch',
              margin: 0
            }}
          >
            {collection.description}
          </p>
        </div>

        {/* Prev / Next Navigation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-muted-gray)',
              marginRight: '8px'
            }}
          >
            0{activeIndex + 1} / 0{items.length}
          </span>
          <button
            onClick={handlePrev}
            className="carousel-nav-btn"
            aria-label="Previous Slide"
            title="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="carousel-nav-btn"
            aria-label="Next Slide"
            title="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: `translateX(-${activeIndex * 100}%)`
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                minWidth: '100%',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.4fr) minmax(260px, 1fr)',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                alignItems: 'center'
              }}
              className="carousel-slide-grid"
            >
              {/* Image Frame */}
              <div
                onClick={() => onSelectImage && onSelectImage({
                  title: item.title,
                  client: item.subtitle,
                  mediaUrl: item.image,
                  mediaType: 'image',
                  category: collection.category
                })}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(300px, 46vh, 460px)',
                  backgroundColor: '#070707',
                  border: '1px solid var(--color-border-gray)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                className="carousel-image-card"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/services/service-ai-photography.jpg';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#B8FF3D'
                  }}
                  className="carousel-card-hover"
                >
                  <Eye size={18} />
                  <span>EXPAND STILL</span>
                </div>
              </div>

              {/* Slide Meta Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span className="micro-label" style={{ color: 'var(--color-accent-lime)' }}>
                  PORTFOLIO SELECTION // 0{idx + 1}
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.65rem)',
                    fontWeight: 700,
                    color: 'var(--color-warm-white)',
                    margin: 0
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: 'var(--color-muted-gray)',
                    margin: 0
                  }}
                >
                  {item.subtitle}
                </p>

                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => onSelectImage && onSelectImage({
                      title: item.title,
                      client: item.subtitle,
                      mediaUrl: item.image,
                      mediaType: 'image',
                      category: collection.category
                    })}
                    className="btn-cornerstone"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.72rem' }}
                  >
                    <span>VIEW HIGH RESOLUTION</span>
                    <Eye size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '1.75rem'
        }}
      >
        {items.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setActiveIndex(dotIdx)}
            style={{
              width: activeIndex === dotIdx ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: activeIndex === dotIdx ? 'var(--color-accent-lime)' : '#333',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              padding: 0
            }}
            aria-label={`Go to slide ${dotIdx + 1}`}
          />
        ))}
      </div>

      <style>{`
        .carousel-nav-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #161616;
          border: 1px solid var(--color-border-gray);
          color: var(--color-warm-white);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .carousel-nav-btn:hover {
          background: #222;
          border-color: #555;
          color: #B8FF3D;
        }
        .carousel-image-card:hover img {
          transform: scale(1.03);
        }
        .carousel-image-card:hover .carousel-card-hover {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .carousel-slide-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CampaignCarousel;

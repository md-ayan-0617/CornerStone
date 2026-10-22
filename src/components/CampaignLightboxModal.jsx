import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, ExternalLink, Sparkles, Film, Image as ImageIcon } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';
import { getEmbedUrl } from '../data/visualCampaigns';

export const CampaignLightboxModal = ({
  project,
  allProjects = [],
  onClose,
  onSelectProject,
  onNavigate
}) => {
  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allProjects.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev && onSelectProject) {
      onSelectProject(allProjects[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, allProjects, onSelectProject]);

  const handleNext = useCallback(() => {
    if (hasNext && onSelectProject) {
      onSelectProject(allProjects[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, allProjects, onSelectProject]);

  // Keyboard navigation: Escape to close, Left/Right for pagination
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, handlePrev, handleNext]);

  const isVideo = project.mediaType === 'video';
  const embedUrl = isVideo ? getEmbedUrl(project.mediaUrl) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 5, 5, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'lightboxFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Container Box */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '92vh',
          backgroundColor: '#0E0E0E',
          border: '1px solid var(--color-border-gray)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Architectural Corner Accents */}
        <div className="corner-bracket-tl" />
        <div className="corner-bracket-tr" />
        <div className="corner-bracket-bl" />
        <div className="corner-bracket-br" />

        {/* Modal Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--color-border-gray)',
            backgroundColor: '#141414'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={16} variant="mark" />
            <span className="micro-label-lime">
              {project.category?.toUpperCase() || 'VISUAL CAMPAIGN'}
            </span>
            <span style={{ color: '#444' }}>•</span>
            <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>
              {project.client || 'CORNERSTONE CREATIVE'} ({project.year || '2026'})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {hasPrev && (
              <button
                onClick={handlePrev}
                className="lightbox-nav-btn"
                aria-label="Previous Campaign"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {hasNext && (
              <button
                onClick={handleNext}
                className="lightbox-nav-btn"
                aria-label="Next Campaign"
                title="Next (Right Arrow)"
              >
                <ChevronRight size={16} />
              </button>
            )}

            <button
              onClick={onClose}
              className="lightbox-nav-btn"
              style={{ borderColor: 'rgba(255, 85, 85, 0.35)', color: '#FF6B6B' }}
              aria-label="Close Lightbox"
              title="Close (Escape)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split Media + Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isVideo ? '1fr' : 'minmax(0, 1.4fr) minmax(320px, 1fr)',
            flex: 1,
            overflowY: 'auto'
          }}
          className="lightbox-body-grid"
        >
          {/* Media Player / Image Viewer */}
          <div
            style={{
              backgroundColor: '#070707',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isVideo ? 'min(58vh, 520px)' : '380px',
              position: 'relative',
              borderRight: isVideo ? 'none' : '1px solid var(--color-border-gray)',
              borderBottom: isVideo ? '1px solid var(--color-border-gray)' : 'none'
            }}
          >
            {isVideo && embedUrl ? (
              <iframe
                src={embedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  minHeight: 'min(58vh, 520px)'
                }}
              />
            ) : (
              <img
                src={project.mediaUrl || project.thumbnailUrl}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={(e) => {
                  e.currentTarget.src = '/images/services/service-ad-creative-design.jpg';
                }}
              />
            )}
          </div>

          {/* Campaign Details Column */}
          <div
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#0F0F0F'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span className="micro-label" style={{ fontSize: '0.68rem' }}>
                  {isVideo ? 'CINEMATIC VIDEO AD' : 'COMMERCIAL STILL SUITE'}
                </span>
                {project.badge && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--color-accent-lime)',
                      backgroundColor: 'rgba(184, 255, 61, 0.1)',
                      border: '1px solid rgba(184, 255, 61, 0.3)',
                      padding: '2px 6px'
                    }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                  fontWeight: 800,
                  color: 'var(--color-warm-white)',
                  margin: '0 0 0.5rem 0',
                  lineHeight: 1.15
                }}
              >
                {project.title}
              </h3>

              {project.tagline && (
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--color-accent-lime)',
                    margin: '0 0 1.25rem 0',
                    lineHeight: 1.4
                  }}
                >
                  {project.tagline}
                </p>
              )}

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'var(--color-muted-gray)',
                  margin: '0 0 1.5rem 0'
                }}
              >
                {project.description}
              </p>

              {/* Deliverables List */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="micro-label" style={{ display: 'block', marginBottom: '0.65rem' }}>
                    CAMPAIGN DELIVERABLES
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          padding: '4px 8px',
                          backgroundColor: '#161616',
                          border: '1px solid var(--color-border-gray)',
                          color: 'var(--color-warm-white)'
                        }}
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--color-border-gray)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                <span className="micro-label" style={{ fontSize: '0.65rem' }}>
                  ASSET ARCHIVE // PRODUCTION VERIFIED
                </span>
              </div>

              {onNavigate && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/contact');
                  }}
                  className="btn-cornerstone"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.72rem' }}
                >
                  <span>INQUIRE THIS STYLE</span>
                  <ExternalLink size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .lightbox-nav-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1A1A1A;
          border: 1px solid var(--color-border-gray);
          color: var(--color-warm-white);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lightbox-nav-btn:hover {
          background: #252525;
          border-color: #444;
        }
        @media (max-width: 820px) {
          .lightbox-body-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CampaignLightboxModal;

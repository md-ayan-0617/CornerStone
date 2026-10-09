import React, { useEffect } from 'react';
import { X, ArrowUpRight, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const PreviewLightboxModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(5, 5, 5, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1240px',
          maxHeight: '92vh',
          backgroundColor: '#0D0D0D',
          border: '1px solid var(--color-border-gray)',
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${project.accentColor}22`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Corner Brackets */}
        <div className="corner-bracket-tl" style={{ borderColor: project.accentColor }} />
        <div className="corner-bracket-br" style={{ borderColor: project.accentColor }} />

        {/* Modal Topbar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--color-border-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#121212',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CornerstoneMotif size={18} variant="mark" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    margin: 0,
                    color: 'var(--color-warm-white)'
                  }}
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: project.accentColor,
                    backgroundColor: `${project.accentColor}18`,
                    border: `1px solid ${project.accentColor}44`,
                    padding: '2px 6px'
                  }}
                >
                  {project.badge}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-muted-gray)' }}>
                {project.industry} • {project.domain}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cornerstone"
              style={{
                backgroundColor: project.accentColor,
                color: '#0A0A0A',
                padding: '0.65rem 1.25rem',
                fontSize: '0.72rem'
              }}
            >
              <span>OPEN LIVE DEMO</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={onClose}
              style={{
                background: '#1A1A1A',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image Scrollable View */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            backgroundColor: '#050505',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1160px',
              border: '1px solid var(--color-border-gray)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
              overflow: 'hidden'
            }}
          >
            {/* Browser chrome simulation */}
            <div
              style={{
                backgroundColor: '#1E1E1E',
                borderBottom: '1px solid #333',
                padding: '8px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </div>
              <div
                style={{
                  flex: 1,
                  maxWidth: '480px',
                  backgroundColor: '#121212',
                  border: '1px solid #333',
                  borderRadius: '3px',
                  padding: '3px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Globe size={11} color="#888" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#AAA' }}>
                  {project.liveUrl}
                </span>
              </div>
            </div>

            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewLightboxModal;

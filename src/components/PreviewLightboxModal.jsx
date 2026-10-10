import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, Monitor, Tablet, Smartphone } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';
import WebsitePreviewFrame from './WebsitePreviewFrame';

export const PreviewLightboxModal = ({ project, onClose }) => {
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

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

  const accentColor = project.accentColor || 'var(--color-accent-lime)';

  return createPortal(
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
        padding: 'clamp(0.75rem, 2.5vw, 2rem)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          height: '92vh',
          maxHeight: '92vh',
          backgroundColor: '#0D0D0D',
          border: '1px solid var(--color-border-gray)',
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px ${accentColor}22`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Corner Brackets */}
        <div className="corner-bracket-tl" style={{ borderColor: accentColor }} />
        <div className="corner-bracket-br" style={{ borderColor: accentColor }} />

        {/* Modal Topbar */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid var(--color-border-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#121212',
            gap: '1rem',
            flexWrap: 'wrap',
            zIndex: 10
          }}
        >
          {/* Project Details */}
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
                    color: accentColor,
                    backgroundColor: `${accentColor}18`,
                    border: `1px solid ${accentColor}44`,
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

          {/* Center: Device Viewport Mode Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0A0A0A',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '3px',
              padding: '2px'
            }}
          >
            <button
              onClick={() => setDeviceMode('desktop')}
              title="Desktop viewport (100% width)"
              style={{
                background: deviceMode === 'desktop' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: deviceMode === 'desktop' ? accentColor : 'var(--color-muted-gray)',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Monitor size={12} />
              <span className="hide-on-mobile">DESKTOP</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              title="Tablet viewport (768px)"
              style={{
                background: deviceMode === 'tablet' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: deviceMode === 'tablet' ? accentColor : 'var(--color-muted-gray)',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Tablet size={12} />
              <span className="hide-on-mobile">TABLET</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              title="Mobile viewport (390px)"
              style={{
                background: deviceMode === 'mobile' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                color: deviceMode === 'mobile' ? accentColor : 'var(--color-muted-gray)',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                transition: 'all 0.15s ease'
              }}
            >
              <Smartphone size={12} />
              <span className="hide-on-mobile">MOBILE</span>
            </button>
          </div>

          {/* Right Actions: Open Live Demo + Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cornerstone"
              style={{
                backgroundColor: accentColor,
                color: '#0A0A0A',
                padding: '0.55rem 1.15rem',
                fontSize: '0.72rem'
              }}
            >
              <span>OPEN FULL WEBSITE</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={onClose}
              style={{
                background: '#1A1A1A',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              aria-label="Close preview"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-gray)';
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Interactive Viewport */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            backgroundColor: '#050505',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            padding: 'clamp(0.75rem, 1.5vw, 1.25rem)'
          }}
        >
          <WebsitePreviewFrame
            project={project}
            mode="modal"
            deviceMode={deviceMode}
            height="100%"
            minHeight="100%"
            showExpandButton={false}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PreviewLightboxModal;

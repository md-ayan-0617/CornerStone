import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Maximize2,
  RotateCw,
  Lock,
  AlertCircle
} from 'lucide-react';

/**
 * WebsitePreviewFrame
 * Reusable, high-fidelity interactive browser preview frame for live websites.
 * Embeds the project's actual live URL via an interactive, scrollable iframe
 * with dedicated browser chrome, internal padding, reload, expand, and fallback states.
 */
export const WebsitePreviewFrame = ({
  project,
  height = '420px',
  minHeight = '360px',
  onOpenFullscreen,
  mode = 'card', // 'card' | 'modal'
  deviceMode = 'desktop', // 'desktop' | 'tablet' | 'mobile'
  showExpandButton = true,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const iframeRef = useRef(null);

  // Auto-hide the scroll hint after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  if (!project) return null;

  const handleReload = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setHasError(false);
    setReloadKey((prev) => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Compute container width depending on device simulation in modal mode
  const getDeviceWidth = () => {
    if (mode !== 'modal') return '100%';
    switch (deviceMode) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const accentColor = project.accentColor || '#B8FF3D';

  return (
    <div
      className={`website-preview-chassis ${className}`}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      data-lenis-prevent="true"
      style={{
        width: '100%',
        maxWidth: getDeviceWidth(),
        height: height,
        minHeight: minHeight,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#070707',
        border: '1px solid var(--color-border-gray)',
        borderRadius: '6px',
        padding: mode === 'modal' ? '12px' : 'clamp(8px, 1.4vw, 12px)', // Essential internal padding to prevent website touching container borders
        boxSizing: 'border-box',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8), 0 12px 30px rgba(0, 0, 0, 0.6)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      {/* Cornerstone Architectural Corner Accents */}
      <div
        className="corner-bracket-tl"
        style={{
          borderColor: accentColor,
          top: '6px',
          left: '6px',
          width: '10px',
          height: '10px'
        }}
      />
      <div
        className="corner-bracket-br"
        style={{
          borderColor: accentColor,
          bottom: '6px',
          right: '6px',
          width: '10px',
          height: '10px'
        }}
      />

      {/* Simulated Browser Window Chrome Header */}
      <div
        className="preview-browser-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '7px 12px',
          backgroundColor: '#121212',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '4px 4px 0 0',
          gap: '10px',
          userSelect: 'none',
          zIndex: 5
        }}
      >
        {/* Left: Window Traffic Dots & Protocol Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          {/* Traffic Light Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#FF5F56',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(255, 95, 86, 0.4)'
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#FFBD2E',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(255, 189, 46, 0.4)'
              }}
            />
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#27C93F',
                display: 'inline-block',
                boxShadow: '0 0 6px rgba(39, 201, 63, 0.4)'
              }}
            />
          </div>

          {/* Interactive URL Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0A0A0A',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '3px 9px',
              borderRadius: '3px',
              maxWidth: 'clamp(140px, 28vw, 320px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            <Lock size={10} color="#10B981" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.64rem',
                color: 'var(--color-warm-white)',
                letterSpacing: '0.02em',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {project.domain || project.liveUrl}
            </span>
          </div>

          {/* Pulse Live Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '2px 6px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '2px'
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 6px #10B981'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: '#10B981',
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Reload / Reset Iframe Button */}
          <button
            onClick={handleReload}
            title="Reload website preview"
            aria-label="Reload preview"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--color-muted-gray)',
              padding: '4px 6px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFF';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-muted-gray)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <RotateCw size={11} className={isLoading ? 'spin-anim' : ''} />
          </button>

          {/* Expand to Fullscreen Lightbox Modal Button */}
          {showExpandButton && onOpenFullscreen && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenFullscreen(project);
              }}
              title="Expand interactive preview to full screen"
              aria-label="Expand preview"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--color-muted-gray)',
                padding: '4px 6px',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = accentColor;
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-muted-gray)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <Maximize2 size={11} />
            </button>
          )}

          {/* Open Full Live Site in New Browser Tab */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Open complete website in new tab"
            aria-label="Open in new tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: 'var(--color-warm-white)',
              padding: '3px 8px',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
              e.currentTarget.style.color = '#0A0A0A';
              e.currentTarget.style.borderColor = accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.color = 'var(--color-warm-white)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
            }}
          >
            <span>OPEN TAB</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div
        className="preview-viewport"
        data-lenis-prevent="true"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          backgroundColor: '#0A0A0A',
          overflow: 'hidden',
          borderRadius: '0 0 4px 4px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderTop: 'none',
          boxSizing: 'border-box'
        }}
      >
        {/* Loading Spinner & Status Indicator */}
        {isLoading && !hasError && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0D0D0D',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
              gap: '12px',
              padding: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.12)',
                borderTopColor: accentColor,
                animation: 'spin 0.8s linear infinite'
              }}
            />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-warm-white)',
                  letterSpacing: '0.08em',
                  display: 'block'
                }}
              >
                CONNECTING TO LIVE DEPLOYMENT...
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: 'var(--color-muted-gray)',
                  marginTop: '4px',
                  display: 'block'
                }}
              >
                {project.domain}
              </span>
            </div>
          </div>
        )}

        {/* Fallback View (Shown if remote host blocks iframes or connection fails) */}
        {hasError ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#0B0B0B',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 4,
              padding: '2rem',
              textAlign: 'center',
              gap: '14px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertCircle size={20} color={accentColor} />
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--color-warm-white)',
                  display: 'block',
                  marginBottom: '6px'
                }}
              >
                EXTERNAL EMBEDDING RESTRICTED
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted-gray)',
                  maxWidth: '38ch',
                  margin: 0,
                  lineHeight: 1.5
                }}
              >
                {project.title} enforces strict origin headers or takes longer to connect. Browse the full interactive experience directly on its production domain:
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 18px',
                  backgroundColor: accentColor,
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase'
                }}
              >
                <span>OPEN LIVE WEBSITE</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                onClick={handleReload}
                style={{
                  padding: '9px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: 'var(--color-warm-white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  cursor: 'pointer'
                }}
              >
                RETRY PREVIEW
              </button>
            </div>
          </div>
        ) : (
          /* Live Interactive Embedded Website Iframe */
          <iframe
            key={reloadKey}
            ref={iframeRef}
            src={project.liveUrl}
            title={`${project.title} — Live Interactive Website Preview`}
            loading="lazy"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            data-lenis-prevent="true"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              backgroundColor: '#0A0A0A',
              colorScheme: 'dark',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch'
            }}
          />
        )}

        {/* Floating Interactive Scroll Hint Badge */}
        {showScrollHint && !isLoading && !hasError && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              backgroundColor: 'rgba(10, 10, 10, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '4px 8px',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
              transition: 'opacity 0.4s ease',
              zIndex: 3
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: accentColor
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-warm-white)',
                letterSpacing: '0.04em'
              }}
            >
              SCROLL &amp; EXPLORE INSIDE
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsitePreviewFrame;

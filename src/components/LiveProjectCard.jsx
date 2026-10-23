import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Layers } from 'lucide-react';
import WebsitePreviewFrame from './WebsitePreviewFrame';

export const LiveProjectCard = ({
  project,
  onSelectProject,
  onOpenModal,
  onOpenZoom,
  layoutMode = 'grid'
}) => {
  const selectHandler = onSelectProject || onOpenModal;
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  // GSAP ScrollTrigger entrance reveal
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal on scroll into viewport
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 35, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          onComplete: () => {
            gsap.set(cardRef.current, { clearProps: 'transform,opacity' });
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isHoveringPreview) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle, elegant 3D tilt capped at 2.5 degrees when not interacting with iframe
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    
    setTilt({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHoveringPreview(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const isWide = layoutMode === 'bento' && project.layoutSpan === 'span-2';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => selectHandler && selectHandler(project)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-charcoal)',
        border: '1px solid',
        borderColor: isHovered ? project.accentColor : 'var(--color-border-gray)',
        transform: isHovered && !isHoveringPreview
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease' : 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isHovered
          ? `0 24px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px -10px ${project.accentColor}33`
          : '0 8px 24px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        willChange: 'transform'
      }}
      className="live-project-card"
      data-cursor="INSPECT"
    >
      {/* Corner Brackets */}
      <div
        className="corner-bracket-tl"
        style={{ borderColor: isHovered ? project.accentColor : 'var(--color-accent-lime)' }}
      />
      <div
        className="corner-bracket-br"
        style={{ borderColor: isHovered ? project.accentColor : 'var(--color-accent-lime)' }}
      />

      {/* Subtle Dynamic Glare Overlay (disabled when over preview) */}
      {isHovered && !isHoveringPreview && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.04) 0%, transparent 60%)`
          }}
        />
      )}

      {/* 1. Card Header Bar / Status Bar */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--color-border-gray)',
          backgroundColor: '#0E0E0E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: project.accentColor,
              letterSpacing: '0.08em'
            }}
          >
            {project.number}
          </span>
          <div style={{ height: '12px', width: '1px', backgroundColor: 'var(--color-border-gray)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--color-warm-white)',
                textTransform: 'uppercase'
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Live URL Domain Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2px 8px',
            borderRadius: '2px'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--color-muted-gray)',
              letterSpacing: '0.04em'
            }}
          >
            {project.domain}
          </span>
        </div>
      </div>

      {/* 2. Website Preview Container — Dominant, Expansive 16:10 Live Frame */}
      <div
        onMouseEnter={() => {
          setIsHoveringPreview(true);
          setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
        }}
        onMouseLeave={() => setIsHoveringPreview(false)}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          minHeight: 'clamp(340px, 46vh, 480px)',
          maxHeight: '560px',
          backgroundColor: '#070707',
          borderBottom: '1px solid var(--color-border-gray)',
          padding: 'clamp(4px, 0.8vw, 8px)',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
        className="live-preview-container"
      >
        <WebsitePreviewFrame
          project={project}
          height="100%"
          minHeight="0"
          onOpenFullscreen={onOpenZoom}
        />
      </div>

      {/* 3. Compact Project Information Body — Subordinated to the Large Preview Above */}
      <div
        style={{
          padding: 'clamp(1rem, 1.6vw, 1.35rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '0.85rem',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div>
          {/* Category & Industry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: project.accentColor,
                textTransform: 'uppercase'
              }}
            >
              {project.category}
            </span>
            <span style={{ color: 'var(--color-border-gray)', fontSize: '0.6rem' }}>•</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--color-muted-gray)',
                letterSpacing: '0.06em'
              }}
            >
              {project.industry}
            </span>
          </div>

          {/* Project Title — Secondary Hierarchy */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--color-warm-white)',
              marginBottom: '0.35rem'
            }}
          >
            {project.title}
          </h3>

          {/* Compact Supporting Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              color: 'var(--color-muted-gray)',
              margin: '0 0 0.75rem 0'
            }}
          >
            {project.shortDescription}
          </p>

          {/* Tech Stack Tags — Compact Metadata */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '5px'
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '2px 7px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  color: '#AAA',
                  letterSpacing: '0.04em',
                  borderRadius: '2px'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Project Actions — Small, Clear Controls */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--color-border-gray)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          {/* Inspect Specs Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectHandler && selectHandler(project);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-warm-white)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 0',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = project.accentColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-warm-white)';
            }}
          >
            <span>INSPECT SYSTEM</span>
            <Layers size={12} />
          </button>

          {/* Live External Demo Link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: isHovered ? project.accentColor : 'rgba(255, 255, 255, 0.08)',
              color: isHovered ? '#0A0A0A' : 'var(--color-warm-white)',
              border: `1px solid ${isHovered ? project.accentColor : 'rgba(255, 255, 255, 0.15)'}`,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap'
            }}
            className="live-demo-btn"
          >
            <span>VIEW LIVE DEMO</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveProjectCard;

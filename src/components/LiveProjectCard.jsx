import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink, Maximize2, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

export const LiveProjectCard = ({
  project,
  onSelectProject,
  onOpenZoom,
  layoutMode = 'bento' // 'bento' | 'grid'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  // GSAP ScrollTrigger entrance reveal & parallax image scrub
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal on scroll into viewport
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
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

      // Silky parallax scrub on the preview image
      if (imageWrapperRef.current) {
        gsap.fromTo(imageWrapperRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle, elegant 3D tilt capped at 3.5 degrees
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    
    setTilt({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const isWide = layoutMode === 'bento' && project.layoutSpan === 'span-2';

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectProject(project)}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-charcoal)',
        border: '1px solid',
        borderColor: isHovered ? project.accentColor : 'var(--color-border-gray)',
        transform: isHovered
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
        minHeight: isWide ? '480px' : '520px',
        willChange: 'transform'
      }}
      className={`live-project-card ${isWide ? 'live-card-span-2' : 'live-card-span-1'}`}
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

      {/* Subtle Dynamic Glare Overlay */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)`
          }}
        />
      )}

      {/* Card Header Bar */}
      <div
        style={{
          padding: '1rem 1.25rem',
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

      {/* Card Layout: Grid or Bento Split */}
      <div
        className={isWide ? 'live-card-split' : ''}
        style={{
          display: isWide ? 'grid' : 'flex',
          gridTemplateColumns: isWide ? '1.15fr 0.85fr' : 'none',
          flexDirection: isWide ? 'row' : 'column',
          flex: 1
        }}
      >
        {/* Preview Frame with Authentic Screenshot & GSAP Parallax */}
        <div
          style={{
            position: 'relative',
            height: isWide ? '100%' : '260px',
            minHeight: '260px',
            overflow: 'hidden',
            backgroundColor: '#0A0A0A',
            borderBottom: isWide ? 'none' : '1px solid var(--color-border-gray)',
            borderRight: isWide ? '1px solid var(--color-border-gray)' : 'none'
          }}
          className="img-hover-frame live-parallax-container"
        >
          <div
            ref={imageWrapperRef}
            className="live-parallax-inner"
          >
            <img
              ref={imageRef}
              src={project.image}
              alt={`${project.title} live preview`}
              className="img-hover-zoom"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                display: 'block'
              }}
              loading="lazy"
            />
          </div>

          {/* Website Identity Accent Glow Strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: project.accentColor
            }}
          />

          {/* Quick Zoom Action Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenZoom) onOpenZoom(project);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(10, 10, 10, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-warm-white)',
              padding: '6px',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: isHovered ? 1 : 0.6
            }}
            title="Inspect full-resolution capture"
            aria-label="Inspect capture"
          >
            <Maximize2 size={13} />
          </button>

          {/* Bottom badge on preview image */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(10, 10, 10, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '2px'
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: project.accentColor
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--color-warm-white)',
                letterSpacing: '0.06em'
              }}
            >
              {project.metricsHighlight}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            gap: '1.25rem'
          }}
        >
          <div>
            {/* Category & Industry */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: project.accentColor,
                  textTransform: 'uppercase'
                }}
              >
                {project.category}
              </span>
              <span style={{ color: 'var(--color-border-gray)' }}>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-muted-gray)',
                  letterSpacing: '0.06em'
                }}
              >
                {project.industry}
              </span>
            </div>

            {/* Title & Tagline */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isWide ? 'clamp(1.6rem, 2.2vw, 2.1rem)' : 'clamp(1.35rem, 2vw, 1.65rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                color: 'var(--color-warm-white)',
                marginBottom: '0.35rem'
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'rgba(244, 243, 239, 0.75)',
                marginBottom: '0.85rem'
              }}
            >
              "{project.tagline}"
            </p>

            {/* Short Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                lineHeight: 1.55,
                color: 'var(--color-muted-gray)',
                margin: 0
              }}
            >
              {project.shortDescription}
            </p>

            {/* Tech Stack Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '1rem'
              }}
            >
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '3px 7px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: '#CCC',
                    letterSpacing: '0.04em'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions: View Live Demo & View Specs */}
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border-gray)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            {/* View Project Specs Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectProject(project);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-warm-white)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 0',
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
              <Layers size={13} />
            </button>

            {/* Prominent View Live Demo Anchor */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 14px',
                backgroundColor: isHovered ? project.accentColor : 'rgba(255, 255, 255, 0.08)',
                color: isHovered ? '#0A0A0A' : 'var(--color-warm-white)',
                border: `1px solid ${isHovered ? project.accentColor : 'rgba(255, 255, 255, 0.15)'}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap'
              }}
              className="live-demo-btn"
            >
              <span>VIEW LIVE DEMO</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveProjectCard;

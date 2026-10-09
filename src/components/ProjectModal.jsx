import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const ProjectModal = ({ project, onClose, onStartProject }) => {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
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
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.5rem, 2vw, 2rem)',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-charcoal)',
          border: '1px solid var(--color-border-gray)',
          overflowY: 'auto',
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Corner Brackets */}
        <div className="corner-bracket-tl" />
        <div className="corner-bracket-br" />

        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1.25rem', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CornerstoneMotif size={20} variant="mark" />
            <span className="micro-label-lime">{project.badge}</span>
            <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>• {project.category}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: project.accentColor || 'var(--color-accent-lime)',
                  color: '#0A0A0A',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: '0.06em'
                }}
              >
                <span>LAUNCH LIVE DEMO</span>
                <ArrowUpRight size={13} />
              </a>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'var(--color-near-black)',
                border: '1px solid var(--color-border-gray)',
                color: 'var(--color-warm-white)',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Project Title & Industry */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="micro-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
            SYSTEM SPECIFICATION 0{project.number} {project.domain ? `// ${project.domain}` : ''}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--color-warm-white)',
              lineHeight: 1.1,
              marginBottom: '0.75rem'
            }}
          >
            {project.title}
          </h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-accent-lime)', display: 'block', marginBottom: '1.5rem' }}>
            Domain: {project.industry}
          </span>

          {/* Project Visual Showcase with Hover Effect */}
          {project.image && (
            <div
              className="img-hover-frame"
              style={{
                height: 'clamp(220px, 38vh, 380px)',
                width: '100%',
                marginBottom: '1rem'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="img-hover-zoom"
                loading="lazy"
              />
              <div className="corner-bracket-tl" />
              <div className="corner-bracket-br" />
              <div className="img-overlay-badge">
                <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-accent-lime)' }}>
                  {project.metricsHighlight}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 5-Stage Project Detail Template per Prompt Section 18 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderTop: '1px solid var(--color-border-gray)', paddingTop: '2rem' }}>
          
          {/* 01 OVERVIEW */}
          <div>
            <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.5rem' }}>01 / OVERVIEW</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-warm-white)', margin: 0 }}>
              {project.overview}
            </p>
          </div>

          {/* 02 THE CHALLENGE */}
          <div style={{ backgroundColor: 'var(--color-near-black)', border: '1px solid var(--color-border-gray)', padding: '1.5rem' }}>
            <span className="micro-label" style={{ display: 'block', marginBottom: '0.5rem', color: '#B8FF3D' }}>02 / THE CHALLENGE</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-muted-gray)', margin: 0 }}>
              {project.challenge}
            </p>
          </div>

          {/* 03 THE SYSTEM */}
          <div>
            <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.5rem' }}>03 / THE SYSTEM</span>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-warm-white)', margin: 0 }}>
              {project.system}
            </p>
          </div>

          {/* 04 THE EXPERIENCE */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: '#181818', padding: '1rem', border: '1px solid #282828' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>DEPLOYMENT STATUS</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#B8FF3D', margin: '4px 0 0 0' }}>
                {project.status}
              </p>
            </div>
            <div style={{ backgroundColor: '#181818', padding: '1rem', border: '1px solid #282828' }}>
              <span className="micro-label" style={{ fontSize: '0.62rem' }}>BENCHMARK METRICS</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFF', margin: '4px 0 0 0' }}>
                {project.metricsHighlight}
              </p>
            </div>
          </div>

          {/* 05 IMPLEMENTATION & DELIVERABLES */}
          <div>
            <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.75rem' }}>05 / DELIVERABLES &amp; INTEGRATIONS</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(10, 10, 10, 0.5)',
                    border: '1px solid var(--color-border-gray)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#B8FF3D' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-white)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 06 TECH STACK & ARCHITECTURE (If available) */}
          {project.techStack && (
            <div>
              <span className="micro-label-lime" style={{ display: 'block', marginBottom: '0.75rem' }}>06 / TECHNOLOGY STACK &amp; CORE MODULES</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--color-border-gray)',
                      padding: '6px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-warm-white)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom CTAs */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
            {project.liveUrl ? `LIVE PRODUCTION DOMAIN • https://${project.domain}` : 'REPLACEABLE CASE SPECIFICATION • CORNERSTONE ARCHITECTURE'}
          </span>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cornerstone"
                style={{
                  backgroundColor: project.accentColor || 'var(--color-accent-lime)',
                  color: '#0A0A0A'
                }}
              >
                <span>OPEN LIVE WEBSITE</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                if (onStartProject) onStartProject();
              }}
              className={project.liveUrl ? "btn-cornerstone-secondary" : "btn-cornerstone"}
            >
              <span>COMMISSION SIMILAR PROJECT</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;

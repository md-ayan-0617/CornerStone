import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/siteContent';
import ProjectModal from '../components/ProjectModal';
import FinalCTA from '../components/FinalCTA';
import CornerstoneMotif from '../components/CornerstoneMotif';
import { ArrowUpRight, Filter } from 'lucide-react';

export const WorkPage = ({ onNavigate }) => {
  const [filter, setFilter] = useState("ALL");
  const [activeProject, setActiveProject] = useState(null);

  const categories = ["ALL", "AI + AUTOMATION", "DIGITAL", "CREATIVE", "GROWTH"];

  const filteredProjects = filter === "ALL" 
    ? FEATURED_PROJECTS 
    : FEATURED_PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* Work Page Hero */}
      <section
        style={{
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
          paddingBottom: 'clamp(3.5rem, 7vh, 5.5rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label-lime">PROJECT PORTFOLIO &amp; DEMONSTRATIONS</span>
          </div>

          <h1
            className="display-mega"
            style={{
              color: 'var(--color-warm-white)',
              margin: '0 0 1.5rem 0',
              maxWidth: '14ch'
            }}
          >
            SELECTED<br />WORK.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              lineHeight: 1.5,
              color: 'var(--color-muted-gray)',
              maxWidth: '48ch',
              margin: 0
            }}
          >
            An archive of deployed systems, production architectures, and concept demonstrations built with foundational precision.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section
        style={{
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          position: 'sticky',
          top: '76px',
          zIndex: 400,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={14} color="#9B9A96" style={{ marginRight: '6px' }} />
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    background: isSelected ? 'var(--color-accent-lime)' : 'transparent',
                    color: isSelected ? 'var(--color-near-black)' : 'var(--color-muted-gray)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="micro-label">
            SHOWING {filteredProjects.length} OF {FEATURED_PROJECTS.length} SYSTEMS
          </span>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        style={{
          paddingTop: 'clamp(3.5rem, 8vw, 6rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-near-black)'
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)'
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="arch-box"
                style={{
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '440px',
                  backgroundColor: 'var(--color-charcoal)'
                }}
                data-cursor="INSPECT"
              >
                {/* Corner highlight */}
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="micro-label-lime">{project.number} / 04</span>
                    <span className="micro-label" style={{ border: '1px solid var(--color-border-gray)', padding: '2px 8px' }}>
                      {project.badge}
                    </span>
                  </div>

                  <span className="micro-label" style={{ color: 'var(--color-muted-gray)', display: 'block', marginBottom: '0.5rem' }}>
                    {project.category} • {project.industry}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.025em',
                      color: 'var(--color-warm-white)',
                      lineHeight: 1.15,
                      marginBottom: '1rem'
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      color: 'var(--color-muted-gray)',
                      margin: 0
                    }}
                  >
                    {project.shortDescription}
                  </p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-gray)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="micro-label" style={{ fontSize: '0.65rem', color: 'var(--color-accent-lime)' }}>
                      {project.metricsHighlight}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="micro-label" style={{ color: 'var(--color-warm-white)' }}>SPECS</span>
                      <ArrowUpRight size={14} color="#B8FF3D" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <FinalCTA onStartProject={() => onNavigate('/contact')} />

      {/* Case Study Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onStartProject={() => {
            setActiveProject(null);
            onNavigate('/contact');
          }}
        />
      )}

    </div>
  );
};

export default WorkPage;

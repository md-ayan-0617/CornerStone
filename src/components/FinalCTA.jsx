import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CornerstoneMotif from './CornerstoneMotif';

export const FinalCTA = ({ onStartProject }) => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(6rem, 14vw, 11rem)',
        paddingBottom: 'clamp(6rem, 14vw, 11rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container" style={{ position: 'relative' }}>
        
        {/* Subtle geometric motif background */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            bottom: '10%',
            opacity: 0.05,
            pointerEvents: 'none'
          }}
        >
          <CornerstoneMotif size={220} variant="mark" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
          <CornerstoneMotif size={16} variant="bracket" />
          <span className="micro-label" style={{ letterSpacing: '0.18em', color: 'var(--color-warm-white)' }}>
            CORNERSTONE / THE INVITATION
          </span>
        </div>

        <div style={{ maxWidth: '24ch', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2
            className="display-large"
            style={{
              color: 'var(--color-warm-white)',
              margin: 0
            }}
          >
            HAVE SOMETHING<br />
            WORTH BUILDING?
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <button
            onClick={onStartProject}
            className="btn-cornerstone"
            style={{ padding: '1.25rem 2.25rem', fontSize: '0.9rem' }}
            data-cursor="LET'S TALK"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={18} />
          </button>

          <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
            DIRECT CONSULTATION WITH SYSTEMS DIRECTORS • NO OBLIGATION
          </span>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;

import React from 'react';
import CornerstoneMotif from '../components/CornerstoneMotif';
import FinalCTA from '../components/FinalCTA';
import { APPROACH_STAGES, PHILOSOPHY } from '../data/siteContent';
import { ArrowUpRight } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      
      {/* About Hero */}
      <section
        style={{
          paddingTop: 'clamp(7rem, 15vh, 10rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <CornerstoneMotif size={16} variant="bracket" />
            <span className="micro-label-lime">ABOUT THE STUDIO</span>
          </div>

          <h1
            className="display-mega"
            style={{
              color: 'var(--color-warm-white)',
              margin: '0 0 2rem 0',
              maxWidth: '14ch'
            }}
          >
            A DIGITAL<br />
            FOUNDATION<br />
            FOR MODERN<br />
            BUSINESS.
          </h1>

          <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '2rem', maxWidth: '48ch' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                lineHeight: 1.55,
                color: 'var(--color-warm-white)',
                margin: 0
              }}
            >
              Cornerstone combines technology, design and creativity to help businesses build better ways to attract, communicate with and serve their customers.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-charcoal)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
            <span className="micro-label-lime">OUR FOUR BELIEFS</span>
            <span className="micro-label">THE CORNERSTONE MANIFESTO</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1px',
              backgroundColor: 'var(--color-border-gray)',
              border: '1px solid var(--color-border-gray)'
            }}
          >
            {PHILOSOPHY.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-near-black)',
                  padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="micro-label-lime">PRINCIPLE 0{idx + 1}</span>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#B8FF3D' }} />
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.3rem, 2vw, 1.65rem)',
                      fontWeight: 800,
                      color: 'var(--color-warm-white)',
                      lineHeight: 1.2,
                      marginBottom: '1rem'
                    }}
                  >
                    {item.statement}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--color-muted-gray)',
                      lineHeight: 1.55,
                      margin: 0
                    }}
                  >
                    {item.elaboration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Stage Approach: DISCOVER, DESIGN, BUILD, CONNECT */}
      <section
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
          backgroundColor: 'var(--color-near-black)',
          borderBottom: '1px solid var(--color-border-gray)'
        }}
      >
        <div className="site-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
            <div>
              <span className="micro-label-lime">OUR APPROACH</span>
              <h2
                className="display-large"
                style={{
                  color: 'var(--color-warm-white)',
                  margin: '0.5rem 0 0 0'
                }}
              >
                HOW WE BUILD.
              </h2>
            </div>
            <CornerstoneMotif size={24} variant="foundation" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {APPROACH_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="arch-box"
                style={{
                  padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  backgroundColor: 'var(--color-charcoal)'
                }}
              >
                <div className="corner-bracket-tl" />
                <div className="corner-bracket-br" />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '2rem',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                      <span className="micro-label-lime">STAGE {stage.number} / 04</span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                        fontWeight: 800,
                        color: 'var(--color-warm-white)',
                        margin: '0 0 0.5rem 0'
                      }}
                    >
                      {stage.title}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-accent-lime)' }}>
                      {stage.subtitle}
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: 'var(--color-muted-gray)',
                        margin: '0 0 1rem 0'
                      }}
                    >
                      {stage.description}
                    </p>
                    <div style={{ borderTop: '1px solid var(--color-border-gray)', paddingTop: '0.75rem' }}>
                      <span className="micro-label" style={{ fontSize: '0.62rem' }}>KEY DELIVERABLE: </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-white)' }}>
                        {stage.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Philosophy Statement from Section 17 */}
          <div style={{ marginTop: 'clamp(4rem, 8vw, 6rem)', paddingTop: '2.5rem', borderTop: '1px solid var(--color-border-gray)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h3
              className="display-large"
              style={{
                color: 'var(--color-warm-white)',
                margin: 0
              }}
            >
              WE BUILD<br />WHAT COMES NEXT.
            </h3>

            <button
              onClick={() => onNavigate('/contact')}
              className="btn-cornerstone"
            >
              <span>DISCUSS YOUR FOUNDATION</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA */}
      <FinalCTA onStartProject={() => onNavigate('/contact')} />

    </div>
  );
};

export default AboutPage;

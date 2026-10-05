import React, { useState } from 'react';
import { SYSTEM_NODES } from '../data/siteContent';
import CornerstoneMotif from './CornerstoneMotif';

export const SystemDiagram = () => {
  const [selectedNode, setSelectedNode] = useState(SYSTEM_NODES[0]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        backgroundColor: 'var(--color-near-black)',
        paddingTop: 'clamp(5rem, 11vw, 9rem)',
        paddingBottom: 'clamp(5rem, 11vw, 9rem)',
        borderBottom: '1px solid var(--color-border-gray)'
      }}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(2rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--color-border-gray)', paddingBottom: '1rem' }}>
          <div>
            <span className="micro-label-lime">06 / ARCHITECTURAL TOPOLOGY</span>
            <h2
              className="display-large"
              style={{
                color: 'var(--color-warm-white)',
                marginTop: '0.5rem',
                margin: 0
              }}
            >
              THE PIECES<br />
              WORK BETTER TOGETHER.
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="micro-label" style={{ color: 'var(--color-muted-gray)' }}>
              8 SYNCHRONIZED NODES
            </span>
            <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
          </div>
        </div>

        {/* Connected Node Circuit Layout */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-charcoal)',
            border: '1px solid var(--color-border-gray)',
            padding: 'clamp(1.5rem, 3.5vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)'
          }}
        >
          {/* Top Corner brackets */}
          <div className="corner-bracket-tl" />
          <div className="corner-bracket-br" />

          {/* Node Grid Layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: '12px',
              marginBottom: '2rem'
            }}
          >
            {SYSTEM_NODES.map((node, i) => {
              const isActive = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setSelectedNode(node)}
                  style={{
                    position: 'relative',
                    backgroundColor: isActive ? 'var(--color-near-black)' : 'rgba(10, 10, 10, 0.45)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-accent-lime)' : 'var(--color-border-gray)',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '130px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="micro-label" style={{ color: isActive ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)' }}>
                      NODE {node.step}
                    </span>
                    {isActive ? (
                      <span className="lime-dot" style={{ width: '5px', height: '5px' }} />
                    ) : (
                      <span style={{ fontSize: '10px', color: '#444' }}>→</span>
                    )}
                  </div>

                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-warm-white)' : 'rgba(244, 243, 239, 0.7)',
                        margin: '0 0 4px 0'
                      }}
                    >
                      {node.name}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: isActive ? 'var(--color-accent-lime)' : 'var(--color-muted-gray)',
                        display: 'block'
                      }}
                    >
                      {node.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Node Deep Inspector */}
          <div
            style={{
              borderTop: '1px solid var(--color-border-gray)',
              paddingTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <span className="micro-label-lime">INSPECTING: NODE {selectedNode.step} — {selectedNode.name}</span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-warm-white)', margin: '4px 0 0 0' }}>
                {selectedNode.detail}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CornerstoneMotif size={18} variant="bracket" />
              <span className="micro-label">TELEMETRY SYNCHRONIZED</span>
            </div>
          </div>
        </div>

        {/* Final Visually Dominant Statement from Section 15 */}
        <div style={{ maxWidth: '28ch', borderLeft: '3px solid var(--color-accent-lime)', paddingLeft: 'clamp(1rem, 3vw, 2rem)' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--color-muted-gray)',
              marginBottom: '0.75rem',
              letterSpacing: '0.1em'
            }}
          >
            WE DON'T JUST BUILD THE PIECES.
          </p>
          <h3
            className="display-large"
            style={{
              color: 'var(--color-warm-white)',
              lineHeight: 0.95,
              margin: 0
            }}
          >
            WE CONNECT THEM.
          </h3>
        </div>

      </div>
    </section>
  );
};

export default SystemDiagram;

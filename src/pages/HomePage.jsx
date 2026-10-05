import React, { useState } from 'react';
import Hero from '../components/Hero';
import StatementSection from '../components/StatementSection';
import CapabilitySection from '../components/CapabilitySection';
import HorizontalServices from '../components/HorizontalServices';
import ScrollJourneyVideo from '../components/ScrollJourneyVideo';
import SelectedWork from '../components/SelectedWork';
import SystemDiagram from '../components/SystemDiagram';
import FinalCTA from '../components/FinalCTA';
import ProjectModal from '../components/ProjectModal';

export const HomePage = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* 1. Full 100vh Cinematic Hero */}
      <Hero
        onExploreWork={() => {
          const el = document.getElementById('selected-work');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else onNavigate('/work');
        }}
        onStartProject={() => onNavigate('/contact')}
      />

      {/* 2. The Editorial Statement Section */}
      <StatementSection />

      {/* 3. What Cornerstone Does - 4 Core Interactive Panels */}
      <CapabilitySection
        onSelectCapability={() => onNavigate('/services')}
      />

      {/* 4. Horizontal Service Deep Dive Experience */}
      <HorizontalServices />

      {/* 5. Signature Scroll Journey Video Experience */}
      <ScrollJourneyVideo />

      {/* 6. Selected Work (Demonstrations & Concept Systems) */}
      <div id="selected-work">
        <SelectedWork
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      </div>

      {/* 7. The Architectural Node System ("We connect them") */}
      <SystemDiagram />

      {/* 8. Quiet Cinematic Pre-Footer CTA */}
      <FinalCTA
        onStartProject={() => onNavigate('/contact')}
      />

      {/* Deep-dive Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartProject={() => {
            setSelectedProject(null);
            onNavigate('/contact');
          }}
        />
      )}
    </div>
  );
};

export default HomePage;

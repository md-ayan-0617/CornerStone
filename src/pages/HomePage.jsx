import React from 'react';
import Hero from '../components/Hero';
import HomeAboutSection from '../components/HomeAboutSection';
import HomeServicesOverview from '../components/HomeServicesOverview';
import HomeCapabilitiesSection from '../components/HomeCapabilitiesSection';
import HomeWebsitesShowcase from '../components/HomeWebsitesShowcase';
import HomeProcessSection from '../components/HomeProcessSection';
import FinalCTA from '../components/FinalCTA';

export const HomePage = ({ onNavigate }) => {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* =========================================================================
          SECTION 1: HERO
          Distinctive primary headline, supporting statement, primary CTA to discuss
          project, and secondary CTA exploring work and services.
          ========================================================================= */}
      <Hero
        onExploreWork={() => onNavigate && onNavigate('/work')}
        onStartProject={() => onNavigate && onNavigate('/contact')}
        onExploreServices={() => onNavigate && onNavigate('/services')}
      />

      {/* =========================================================================
          SECTION 2: ABOUT CORNERSTONE
          Studio approach, three foundational pillars (Creative Thinking,
          Modern Technology, Precision Execution), and architectural studio visual.
          ========================================================================= */}
      <HomeAboutSection />

      {/* =========================================================================
          SECTION 3: OUR SERVICES
          The three core disciplines: AI Automation, Website Development,
          and Creative Production, with interactive cards & hover states.
          ========================================================================= */}
      <HomeServicesOverview onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 4: WHAT WE CAN BUILD (CAPABILITIES)
          Concrete deliverables: Website Experiences, Interactive Digital Interfaces,
          AI-Assisted Workflow Automation, Creative Digital Experiences, Brand Systems.
          ========================================================================= */}
      <HomeCapabilitiesSection onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 5: SELECTED WEBSITE WORK
          Curated website projects (Noise Dept, Spinform, Paloma Social House,
          Vale Selvatico) with 16:10 preview on top, project info directly below.
          ========================================================================= */}
      <HomeWebsitesShowcase onNavigate={onNavigate} />

      {/* =========================================================================
          SECTION 6: OUR PROCESS
          Four-stage execution framework: 01 Discover, 02 Plan, 03 Create, 04 Deliver.
          ========================================================================= */}
      <HomeProcessSection />

      {/* =========================================================================
          SECTION 7: FINAL CTA
          Strong closing invitation with working direct link to Contact.
          ========================================================================= */}
      <FinalCTA onStartProject={() => onNavigate && onNavigate('/contact')} />
    </div>
  );
};

export default HomePage;

// ==============================================================================
// CORNERSTONE — Unified WORK Portfolio Page
// Combines the complete existing WEB (DigitalExperiencesPage) and ADS (AdsPage)
// portfolio experiences into a single seamless WORK page at /work.
//
// EXISTING WEB CONTENT + EXISTING ADS CONTENT = ONE WORK PAGE
// ==============================================================================

import React, { useEffect } from 'react';
import DigitalExperiencesPage from './DigitalExperiencesPage';
import AdsPage from './AdsPage';

export const WorkPage = ({ onNavigate }) => {
  useEffect(() => {
    // If arriving with a hash, e.g. /work#ads or /work#web, scroll smoothly
    if (window.location.hash === '#ads') {
      const el = document.getElementById('ads-portfolio-section');
      if (el) {
        setTimeout(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else if (window.location.hash === '#web') {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'clip' }}>
      {/* =====================================================================
          SECTION A: EXISTING WEB CONTENT (Websites & Digital Experiences)
          Complete original WEB portfolio implementation reused directly.
          ===================================================================== */}
      <section id="web-portfolio-section" aria-label="Websites and Digital Experiences Portfolio">
        <DigitalExperiencesPage onNavigate={onNavigate} hideCTA={true} />
      </section>

      {/* =====================================================================
          SECTION B: EXISTING ADS CONTENT (Commercial Campaigns, Videos & Stills)
          Complete original ADS portfolio implementation reused directly.
          ===================================================================== */}
      <section id="ads-portfolio-section" aria-label="Advertising and Commercial Campaigns Portfolio">
        <AdsPage onNavigate={onNavigate} />
      </section>
    </div>
  );
};

export default WorkPage;

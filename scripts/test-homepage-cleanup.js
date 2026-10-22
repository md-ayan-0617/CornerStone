// ==============================================================================
// CORNERSTONE — Homepage Cleanup & Cinematic ADS Showcase Verification Suite
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASS: ${message}`);
}

console.log('\n--- VERIFYING HOMEPAGE CLEANUP & CINEMATIC ADS SHOWCASE ---');

// 1. Verify src/pages/HomePage.jsx scope and content
const homePath = path.join(rootDir, 'src', 'pages', 'HomePage.jsx');
const homeContent = fs.readFileSync(homePath, 'utf-8');

// Screenshot matching sections REMOVED from Home
assert(!homeContent.includes('StatementSection'), 'Philosophy section (StatementSection) REMOVED from HomePage');
assert(!homeContent.includes('CapabilitySection'), 'Three capability cards (CapabilitySection) REMOVED from HomePage');
assert(!homeContent.includes('HorizontalServices'), 'Service disciplines carousel (HorizontalServices) REMOVED from HomePage');
assert(!homeContent.includes('ScrollJourneyVideo'), 'Attract-to-Grow funnel (ScrollJourneyVideo) REMOVED from HomePage');
assert(!homeContent.includes('SelectedWork'), 'Website demo cards (SelectedWork) REMOVED from HomePage');

// New visual showcase sections ADDED to Home
assert(homeContent.includes('HomeVideoShowcase'), 'HomeVideoShowcase imported and rendered in HomePage');
assert(homeContent.includes('HomeHorizontalGallery'), 'HomeHorizontalGallery imported and rendered in HomePage');
assert(homeContent.includes('SystemDiagram'), 'SystemDiagram preserved on HomePage');
assert(homeContent.includes('FinalCTA'), 'FinalCTA preserved on HomePage');
assert(homeContent.includes('CampaignLightboxModal'), 'CampaignLightboxModal integrated for both videos and stills');

// 2. Verify HomeVideoShowcase.jsx Implementation
const videoShowcasePath = path.join(rootDir, 'src', 'components', 'HomeVideoShowcase.jsx');
assert(fs.existsSync(videoShowcasePath), 'HomeVideoShowcase.jsx exists');
const videoShowcaseContent = fs.readFileSync(videoShowcasePath, 'utf-8');

assert(videoShowcaseContent.includes('ADS / SELECTED FILMS'), 'Section label "ADS / SELECTED FILMS" present');
assert(videoShowcaseContent.includes('MADE TO MAKE YOU LOOK.'), 'Heading "MADE TO MAKE YOU LOOK." present');
const adsProjectsPath = path.join(rootDir, 'src', 'data', 'adsProjects.js');
const adsProjectsContent = fs.readFileSync(adsProjectsPath, 'utf-8');

assert(adsProjectsContent.includes('n7i5_lQkq9k'), 'YouTube Short ID n7i5_lQkq9k present in adsProjects');
assert(adsProjectsContent.includes('aO1ADthWkjk'), 'YouTube Short ID aO1ADthWkjk present in adsProjects');
assert(adsProjectsContent.includes('yrpbqVTbGd4'), 'YouTube Short ID yrpbqVTbGd4 present in adsProjects');
assert(videoShowcaseContent.includes('FEATURED_SHORTS'), 'HomeVideoShowcase imports and uses FEATURED_SHORTS');
assert(videoShowcaseContent.includes('aspectRatio: \'9 / 16\''), '9:16 portrait aspect ratio container present');
assert(videoShowcaseContent.includes('IntersectionObserver'), 'IntersectionObserver visibility detection present');
assert(videoShowcaseContent.includes('playVideo'), 'Muted autoplay on scroll entrance present');
assert(videoShowcaseContent.includes('pauseVideo'), 'Auto-pause on scroll exit present');
assert(videoShowcaseContent.includes('clamp(18px, 2.2vw, 24px)'), 'Rounded borders (18-24px) present');

// 3. Verify HomeHorizontalGallery.jsx Implementation
const galleryPath = path.join(rootDir, 'src', 'components', 'HomeHorizontalGallery.jsx');
assert(fs.existsSync(galleryPath), 'HomeHorizontalGallery.jsx exists');
const galleryContent = fs.readFileSync(galleryPath, 'utf-8');

assert(galleryContent.includes('CAMPAIGNS / 001—010'), 'Section label "CAMPAIGNS / 001—010" present');
assert(galleryContent.includes('LOCAL_ADS_IMAGES'), 'Uses LOCAL_ADS_IMAGES from adsProjects');
assert(galleryContent.includes('ScrollTrigger'), 'GSAP ScrollTrigger used for horizontal scroll');
assert(galleryContent.includes('pin: true'), 'Gallery section pinned for horizontal animation');
assert(galleryContent.includes('gsap.matchMedia()'), 'Responsive matchMedia setup present');
assert(galleryContent.includes('prefers-reduced-motion'), 'prefers-reduced-motion fallback implemented');
assert(galleryContent.includes('clamp(18px, 2.2vw, 24px)'), 'Rounded image borders (18-24px) present');

// 4. Verify All 10 Local Images exist in public/images/
for (let i = 1; i <= 10; i++) {
  const imgPath = path.join(rootDir, 'public', 'images', `${i}.png`);
  assert(fs.existsSync(imgPath), `Image /images/${i}.png exists in public/images/`);
}

// 5. Verify Critical Scope Restriction: Shared components not deleted globally
assert(fs.existsSync(path.join(rootDir, 'src', 'components', 'StatementSection.jsx')), 'StatementSection.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'components', 'CapabilitySection.jsx')), 'CapabilitySection.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'components', 'HorizontalServices.jsx')), 'HorizontalServices.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'components', 'ScrollJourneyVideo.jsx')), 'ScrollJourneyVideo.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'components', 'SelectedWork.jsx')), 'SelectedWork.jsx preserved');

// 6. Verify Services, WEB, and ADS pages are intact
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'ServicesPage.jsx')), 'ServicesPage.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'DigitalExperiencesPage.jsx')), 'DigitalExperiencesPage.jsx (WEB) preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'AdsPage.jsx')), 'AdsPage.jsx preserved');

// 7. Verify Global Navigation preserves exact labels: HOME | SERVICES | WEB | ADS | ABOUT | CONTACT
const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
assert(navbarContent.includes('HOME'), 'Navbar contains HOME');
assert(navbarContent.includes('SERVICES'), 'Navbar contains SERVICES');
assert(navbarContent.includes('WEB'), 'Navbar contains WEB');
assert(navbarContent.includes('ADS'), 'Navbar contains ADS');
assert(navbarContent.includes('ABOUT'), 'Navbar contains ABOUT');
assert(navbarContent.includes('CONTACT'), 'Navbar contains CONTACT');

console.log('\n======================================================');
console.log('ALL HOMEPAGE CLEANUP & CINEMATIC SHOWCASE CHECKS PASSED');
console.log('======================================================\n');

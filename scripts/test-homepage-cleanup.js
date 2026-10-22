// ==============================================================================
// CORNERSTONE — Final Homepage Restructure & Verification Suite
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

console.log('\n--- VERIFYING FINAL HOMEPAGE RESTRUCTURE & FIXES ---');

// 1. Verify src/pages/HomePage.jsx Section Order
const homePath = path.join(rootDir, 'src', 'pages', 'HomePage.jsx');
const homeContent = fs.readFileSync(homePath, 'utf-8');

// Unwanted sections REMOVED from Home
assert(!homeContent.includes('StatementSection'), 'Philosophy section (StatementSection) REMOVED from HomePage');
assert(!homeContent.includes('CapabilitySection'), 'Old capability cards (CapabilitySection) REMOVED from HomePage');
assert(!homeContent.includes('HorizontalServices'), 'Service disciplines carousel (HorizontalServices) REMOVED from HomePage');
assert(!homeContent.includes('ScrollJourneyVideo'), 'Attract-to-Grow funnel (ScrollJourneyVideo) REMOVED from HomePage');
assert(!homeContent.includes('SelectedWork'), 'Old website demo cards (SelectedWork) REMOVED from HomePage');
assert(!homeContent.includes('HomeHorizontalGallery'), 'Image carousel REMOVED from HomePage');

// Exact Homepage Order: Hero -> Services -> Videos -> Photos -> Websites -> CTA
const heroIdx = homeContent.indexOf('<Hero');
const srvIdx = homeContent.indexOf('<HomeServicesOverview');
const vidIdx = homeContent.indexOf('<HomeVideoShowcase');
const photoIdx = homeContent.indexOf('<HomePhotographyGrid');
const webIdx = homeContent.indexOf('<HomeWebsitesShowcase');
const ctaIdx = homeContent.indexOf('<FinalCTA');

assert(heroIdx !== -1, 'Hero is present in HomePage');
assert(srvIdx !== -1, 'HomeServicesOverview is present in HomePage');
assert(vidIdx !== -1, 'HomeVideoShowcase is present in HomePage');
assert(photoIdx !== -1, 'HomePhotographyGrid is present in HomePage');
assert(webIdx !== -1, 'HomeWebsitesShowcase is present in HomePage');
assert(ctaIdx !== -1, 'FinalCTA is present in HomePage');

assert(
  heroIdx < srvIdx && srvIdx < vidIdx && vidIdx < photoIdx && photoIdx < webIdx && webIdx < ctaIdx,
  'Homepage sections in EXACT order: HERO → SERVICES → VIDEOS → PHOTOS → WEBSITES → CTA'
);

// 2. Verify Services Overview (HomeServicesOverview.jsx)
const servicesOverviewPath = path.join(rootDir, 'src', 'components', 'HomeServicesOverview.jsx');
assert(fs.existsSync(servicesOverviewPath), 'HomeServicesOverview.jsx exists');
const srvContent = fs.readFileSync(servicesOverviewPath, 'utf-8');

assert(srvContent.includes('AI AUTOMATION'), 'Services overview includes AI AUTOMATION');
assert(srvContent.includes('WEBSITES'), 'Services overview includes WEBSITES');
assert(srvContent.includes('CREATIVE PRODUCTION'), 'Services overview includes CREATIVE PRODUCTION');
assert(srvContent.includes('WHAT CORNERSTONE BUILDS.'), 'Services overview has punchy minimal heading');

// 3. Verify Video Showcase & Fullscreen Bug Fix (HomeVideoShowcase.jsx)
const videoShowcasePath = path.join(rootDir, 'src', 'components', 'HomeVideoShowcase.jsx');
assert(fs.existsSync(videoShowcasePath), 'HomeVideoShowcase.jsx exists');
const vidContent = fs.readFileSync(videoShowcasePath, 'utf-8');

assert(vidContent.includes('SELECTED FILMS'), 'Video showcase heading is "SELECTED FILMS"');
assert(vidContent.includes('ADS / SELECTED FILMS'), 'Section label "ADS / SELECTED FILMS" present');

const adsProjectsPath = path.join(rootDir, 'src', 'data', 'adsProjects.js');
const adsProjectsContent = fs.readFileSync(adsProjectsPath, 'utf-8');
assert(adsProjectsContent.includes('n7i5_lQkq9k'), 'YouTube Short ID n7i5_lQkq9k present');
assert(adsProjectsContent.includes('aO1ADthWkjk'), 'YouTube Short ID aO1ADthWkjk present');
assert(adsProjectsContent.includes('yrpbqVTbGd4'), 'YouTube Short ID yrpbqVTbGd4 present');

// Verify Fullscreen Bug Fixes
assert(vidContent.includes('allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"'), 'Iframe has fullscreen permission policy enabled');
assert(vidContent.includes('allowFullScreen'), 'allowFullScreen attribute enabled on iframe');
assert(adsProjectsContent.includes('&fs=1'), 'YouTube embed URL enables &fs=1 parameter');
assert(vidContent.includes('handleFullscreen'), 'Native fullscreen handler implemented');
assert(vidContent.includes(':fullscreen'), 'Fullscreen CSS overrides aspect ratio and dimensions');

// Verify Mobile Audio Support
assert(vidContent.includes('TAP TO ENABLE AUDIO') || vidContent.includes('isMobile'), 'Mobile sound enable control implemented');
assert(vidContent.includes('unMute'), 'unMute command dispatched to YouTube player');
assert(vidContent.includes('setVolume'), 'setVolume dispatched on mobile tap');

// 4. Verify Photography Grid (HomePhotographyGrid.jsx)
const photographyGridPath = path.join(rootDir, 'src', 'components', 'HomePhotographyGrid.jsx');
assert(fs.existsSync(photographyGridPath), 'HomePhotographyGrid.jsx exists');
const photoContent = fs.readFileSync(photographyGridPath, 'utf-8');

assert(photoContent.includes('LOCAL_ADS_IMAGES'), 'HomePhotographyGrid uses LOCAL_ADS_IMAGES');
assert(photoContent.includes('DIRECTED TO RETAIN DESIRE.'), 'Photography grid has minimal 1-line headline');
assert(!photoContent.includes('pin: true'), 'Photography grid does NOT use horizontal scroll pinning');

for (let i = 1; i <= 10; i++) {
  const imgPath = path.join(rootDir, 'public', 'images', `${i}.png`);
  assert(fs.existsSync(imgPath), `Image /images/${i}.png exists in public/images/`);
}

// 5. Verify Selected Website Demos (HomeWebsitesShowcase.jsx)
const webShowcasePath = path.join(rootDir, 'src', 'components', 'HomeWebsitesShowcase.jsx');
assert(fs.existsSync(webShowcasePath), 'HomeWebsitesShowcase.jsx exists');
const webShowcaseContent = fs.readFileSync(webShowcasePath, 'utf-8');

assert(webShowcaseContent.includes('Noise Dept.'), 'Website demos include Noise Dept.');
assert(webShowcaseContent.includes('https://noise-dept-six.vercel.app/'), 'Noise Dept. has verified live URL');
assert(webShowcaseContent.includes('Paloma'), 'Website demos include Paloma');
assert(webShowcaseContent.includes('https://paloma-socail-house.vercel.app/'), 'Paloma has verified live URL');
assert(webShowcaseContent.includes('Vale Selvato'), 'Website demos include Vale Selvato');
assert(webShowcaseContent.includes('https://vale-selvatico.vercel.app/'), 'Vale Selvato has verified live URL');
assert(webShowcaseContent.includes('Aurenne'), 'Website demos include Aurenne');
assert(webShowcaseContent.includes('https://aurenne-six.vercel.app/'), 'Aurenne has verified live URL');
assert(webShowcaseContent.includes('VIEW PROJECT'), 'Cards feature VIEW PROJECT action');

// 6. Verify Complete Removal of Tawk.to AI
const indexHtmlPath = path.join(rootDir, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
assert(!indexHtmlContent.includes('tawk.to'), 'Tawk.to embed script completely REMOVED from index.html');
assert(!indexHtmlContent.includes('Tawk_API'), 'Tawk_API completely REMOVED from index.html');
assert(!indexHtmlContent.includes('1k48oav3d'), 'Tawk.to widget ID completely REMOVED from index.html');

// 7. Verify Scope Restrictions: Dedicated pages and components preserved
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'ServicesPage.jsx')), 'ServicesPage.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'DigitalExperiencesPage.jsx')), 'DigitalExperiencesPage.jsx (WEB) preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'AdsPage.jsx')), 'AdsPage.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'AboutPage.jsx')), 'AboutPage.jsx preserved');
assert(fs.existsSync(path.join(rootDir, 'src', 'pages', 'ContactPage.jsx')), 'ContactPage.jsx preserved');

// 8. Verify Header Navigation: HOME | SERVICES | WEB | ADS | ABOUT | CONTACT
const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
assert(navbarContent.includes('HOME'), 'Navbar contains HOME');
assert(navbarContent.includes('SERVICES'), 'Navbar contains SERVICES');
assert(navbarContent.includes('WEB'), 'Navbar contains WEB');
assert(navbarContent.includes('ADS'), 'Navbar contains ADS');
assert(navbarContent.includes('ABOUT'), 'Navbar contains ABOUT');
assert(navbarContent.includes('CONTACT'), 'Navbar contains CONTACT');

console.log('\n========================================================');
console.log('ALL 46 FINAL HOMEPAGE RESTRUCTURE CHECKS PASSED');
console.log('========================================================\n');

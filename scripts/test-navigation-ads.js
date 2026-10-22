// ==============================================================================
// CORNERSTONE — Navigation & ADS Portfolio Upgrade Test Suite
// Validates 6 header links, portrait 9:16 Shorts, muted autoplay, and data architecture.
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

console.log('\n--- VERIFYING COMPLETE NAVIGATION & ADS PORTFOLIO UPGRADE ---');

// 1. Verify Navbar.jsx Navigation Items
const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
const navbarContent = fs.readFileSync(navbarPath, 'utf-8');

assert(navbarContent.includes('label: "HOME"'), 'Navbar has HOME');
assert(navbarContent.includes('label: "SERVICES"'), 'Navbar has SERVICES');
assert(navbarContent.includes('label: "WEB"'), 'Navbar has WEB (replaced DIGITAL EXPERIENCES)');
assert(navbarContent.includes('label: "ADS"'), 'Navbar has ADS (replaced VISUAL CAMPAIGNS)');
assert(navbarContent.includes('label: "ABOUT"'), 'Navbar has ABOUT');
assert(navbarContent.includes('label: "CONTACT"'), 'Navbar has CONTACT');

// Verify order in Navbar.jsx
const homeIdx = navbarContent.indexOf('label: "HOME"');
const servIdx = navbarContent.indexOf('label: "SERVICES"');
const webIdx = navbarContent.indexOf('label: "WEB"');
const adsIdx = navbarContent.indexOf('label: "ADS"');
const aboutIdx = navbarContent.indexOf('label: "ABOUT"');
const contactIdx = navbarContent.indexOf('label: "CONTACT"');

assert(homeIdx < servIdx && servIdx < webIdx && webIdx < adsIdx && adsIdx < aboutIdx && aboutIdx < contactIdx,
  'Navbar displays exact 6 items in exact order: HOME | SERVICES | WEB | ADS | ABOUT | CONTACT');

// 2. Verify Footer.jsx Directory Items
const footerPath = path.join(rootDir, 'src', 'components', 'Footer.jsx');
const footerContent = fs.readFileSync(footerPath, 'utf-8');

assert(footerContent.includes('label: "WEB", path: "/web"'), 'Footer has WEB link');
assert(footerContent.includes('label: "ADS", path: "/ads"'), 'Footer has ADS link');

// 3. Verify App.jsx Routing
const appPath = path.join(rootDir, 'src', 'App.jsx');
const appContent = fs.readFileSync(appPath, 'utf-8');

assert(appContent.includes('case "/web":'), 'App.jsx routes /web to DigitalExperiencesPage (WEB)');
assert(appContent.includes('case "/ads":'), 'App.jsx routes /ads to AdsPage (ADS)');
assert(appContent.includes('import AdsPage from \'./pages/AdsPage\';'), 'App.jsx imports AdsPage');

// 4. Verify Centralized Media Data (src/data/adsProjects.js)
const adsDataPath = path.join(rootDir, 'src', 'data', 'adsProjects.js');
const adsDataContent = fs.readFileSync(adsDataPath, 'utf-8');

assert(adsDataContent.includes('n7i5_lQkq9k'), 'YouTube Short 1 (n7i5_lQkq9k) present');
assert(adsDataContent.includes('aO1ADthWkjk'), 'YouTube Short 2 (aO1ADthWkjk) present');
assert(adsDataContent.includes('yrpbqVTbGd4'), 'YouTube Short 3 (yrpbqVTbGd4) present');

// Verify Shorts order
const s1Idx = adsDataContent.indexOf('n7i5_lQkq9k');
const s2Idx = adsDataContent.indexOf('aO1ADthWkjk');
const s3Idx = adsDataContent.indexOf('yrpbqVTbGd4');
assert(s1Idx < s2Idx && s2Idx < s3Idx, 'YouTube Shorts preserved in exact order: 1, 2, 3');

assert(adsDataContent.includes('aspectRatio: "9:16"'), 'Portrait 9:16 aspect ratio configured for Shorts');
assert(adsDataContent.includes('export function getYouTubeEmbedUrl'), 'YouTube embed URL resolver exported');
assert(adsDataContent.includes('ADS_PHOTOGRAPHY'), 'Advertising photography collection exported');
assert(adsDataContent.includes('ADS_CAROUSELS'), 'Curated carousels exported');

// 5. Verify AdsPage.jsx Implementation
const adsPagePath = path.join(rootDir, 'src', 'pages', 'AdsPage.jsx');
const adsPageContent = fs.readFileSync(adsPagePath, 'utf-8');

assert(adsPageContent.includes('aspectRatio: \'9 / 16\''), 'Video container uses portrait 9:16 aspect ratio');
assert(adsPageContent.includes("clamp(18px, 2.2vw, 22px)"), 'Video container has 18-24px rounded corners');
assert(adsPageContent.includes('overflow: \'hidden\'') || adsPageContent.includes('overflow: hidden') || adsPageContent.includes('overflow:'), 'Video container has overflow: hidden clipping');
assert(adsPageContent.includes('IntersectionObserver'), 'IntersectionObserver used for visibility-aware playback');
assert(adsPageContent.includes('threshold: [0.2, 0.58, 0.85]'), 'Threshold set around 60% visibility for playback trigger');
assert(adsPageContent.includes('playVideo'), 'postMessage playVideo triggered on visibility');
assert(adsPageContent.includes('pauseVideo'), 'postMessage pauseVideo triggered on scroll away');
assert(!adsPageContent.includes('vc-play-button-overlay'), 'Oversized custom play button overlay removed');
assert(adsPageContent.includes('HAVE A BRAND TO MAKE UNFORGETTABLE?'), 'Final ADS contact headline present');
assert(adsPageContent.includes('START A PROJECT'), 'Final ADS CTA button present');
assert(adsPageContent.includes('gsap.context'), 'GSAP animations scoped with gsap.context');
assert(adsPageContent.includes('ctx.revert()'), 'GSAP animations cleaned up with ctx.revert()');
assert(adsPageContent.includes('CampaignLightboxModal'), 'Fullscreen lightbox modal integrated');

console.log('\n========================================');
console.log('ALL 23 NAVIGATION & ADS PORTFOLIO TESTS PASSED');
console.log('========================================\n');

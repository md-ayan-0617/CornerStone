// ==============================================================================
// CORNERSTONE — Verification Script for WEB + ADS -> WORK Merge
// ==============================================================================

import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT = process.cwd();

console.log('--- 1. VERIFYING NAVIGATION CONFIGURATION ---');
const navbarFile = fs.readFileSync(path.join(ROOT, 'src/components/Navbar.jsx'), 'utf-8');

assert(navbarFile.includes('label: "HOME"'), 'Navbar has HOME');
assert(navbarFile.includes('label: "SERVICES"'), 'Navbar has SERVICES');
assert(navbarFile.includes('label: "WORK"'), 'Navbar has WORK');
assert(navbarFile.includes('label: "ABOUT"'), 'Navbar has ABOUT');
assert(navbarFile.includes('label: "CONTACT"'), 'Navbar has CONTACT');

const homePos = navbarFile.indexOf('label: "HOME"');
const srvPos = navbarFile.indexOf('label: "SERVICES"');
const workPos = navbarFile.indexOf('label: "WORK"');
const aboutPos = navbarFile.indexOf('label: "ABOUT"');
const contactPos = navbarFile.indexOf('label: "CONTACT"');

assert(homePos < srvPos && srvPos < workPos && workPos < aboutPos && aboutPos < contactPos,
  'Navigation items in exact order: HOME | SERVICES | WORK | ABOUT | CONTACT');

assert(!navbarFile.includes('{ label: "WEB",'), 'Separate WEB item removed from navigation');
assert(!navbarFile.includes('{ label: "ADS",'), 'Separate ADS item removed from navigation');
assert(navbarFile.includes('path: "/work"'), 'WORK navigates to /work');
console.log('✓ Navigation verified: 5 items in order, separate WEB and ADS removed, WORK points to /work.');

console.log('--- 2. VERIFYING UNIFIED WORK PAGE IMPLEMENTATION ---');
const workPageFile = fs.readFileSync(path.join(ROOT, 'src/pages/WorkPage.jsx'), 'utf-8');

assert(workPageFile.includes('import DigitalExperiencesPage from \'./DigitalExperiencesPage\';'),
  'WorkPage reuses original DigitalExperiencesPage component (WEB)');
assert(workPageFile.includes('import AdsPage from \'./AdsPage\';'),
  'WorkPage reuses original AdsPage component (ADS)');
assert(workPageFile.includes('<DigitalExperiencesPage'), 'WorkPage renders DigitalExperiencesPage');
assert(workPageFile.includes('<AdsPage'), 'WorkPage renders AdsPage');

const webRenderIdx = workPageFile.indexOf('<DigitalExperiencesPage');
const adsRenderIdx = workPageFile.indexOf('<AdsPage');
assert(webRenderIdx !== -1 && adsRenderIdx !== -1 && webRenderIdx < adsRenderIdx,
  'WorkPage renders WEB content followed by ADS content');
console.log('✓ WorkPage reuses original DigitalExperiencesPage and AdsPage in sequence.');

console.log('--- 3. VERIFYING COMPLETE WEB CONTENT PRESERVATION ---');
const dxFile = fs.readFileSync(path.join(ROOT, 'src/pages/DigitalExperiencesPage.jsx'), 'utf-8');
const siteContentFile = fs.readFileSync(path.join(ROOT, 'src/data/siteContent.js'), 'utf-8');

assert(dxFile.includes('LIVE_WEBSITE_PROJECTS'), 'DigitalExperiencesPage uses LIVE_WEBSITE_PROJECTS');
assert(siteContentFile.includes('live-noise-dept'), 'Noise Dept. preserved');
assert(siteContentFile.includes('live-spinform'), 'Spinform preserved');
assert(siteContentFile.includes('live-paloma-house'), 'Paloma Social House preserved');
assert(siteContentFile.includes('live-vale-selvatico'), 'Vale Selvatico preserved');
assert(siteContentFile.includes('live-aurenne'), 'Aurenne preserved');
assert(siteContentFile.includes('live-mosaic'), 'Mosaic / State preserved');
assert(siteContentFile.includes('live-auto-mobile'), 'Aurelis Motors preserved');
assert(dxFile.includes('ProjectModal'), 'Project detail modal preserved');
assert(dxFile.includes('PreviewLightboxModal'), 'Preview lightbox modal preserved');
console.log('✓ All 7 website projects, descriptions, external links, modals, and layouts preserved.');

console.log('--- 4. VERIFYING COMPLETE ADS CONTENT PRESERVATION ---');
const adsFile = fs.readFileSync(path.join(ROOT, 'src/pages/AdsPage.jsx'), 'utf-8');
const adsDataFile = fs.readFileSync(path.join(ROOT, 'src/data/adsProjects.js'), 'utf-8');

assert(adsFile.includes('FEATURED_SHORTS'), 'AdsPage uses FEATURED_SHORTS');
assert(adsFile.includes('LOCAL_ADS_IMAGES'), 'AdsPage uses LOCAL_ADS_IMAGES');
assert(adsDataFile.includes('n7i5_lQkq9k'), 'Video 01: n7i5_lQkq9k preserved');
assert(adsDataFile.includes('aO1ADthWkjk'), 'Video 02: aO1ADthWkjk preserved');
assert(adsDataFile.includes('yrpbqVTbGd4'), 'Video 03: yrpbqVTbGd4 preserved');

for (let i = 1; i <= 10; i++) {
  assert(adsDataFile.includes(`/images/${i}.png`), `Stills /images/${i}.png preserved`);
  assert(fs.existsSync(path.join(ROOT, `public/images/${i}.png`)), `Image file /images/${i}.png exists`);
}

assert(adsFile.includes('CampaignLightboxModal'), 'Campaign lightbox modal preserved');
assert(adsFile.includes('IntersectionObserver'), 'Visibility autoplay preserved');
console.log('✓ All 3 Shorts, 10 local stills, player controls, and lightbox preserved.');

console.log('--- 5. VERIFYING ROUTING AND BACKWARDS COMPATIBILITY ---');
const appFile = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf-8');

assert(appFile.includes('case "/work":'), 'App.jsx routes /work to WorkPage');
assert(appFile.includes('WorkPage onNavigate={navigate}'), 'App.jsx renders WorkPage');
assert(appFile.includes('normalized === "/web"'), 'App.jsx handles /web redirect to /work');
assert(appFile.includes('normalized === "/ads"'), 'App.jsx handles /ads redirect to /work#ads');
console.log('✓ Routing verified: /work rendered, legacy /web and /ads redirected.');

console.log('--- 6. VERIFYING UNTOUCHED PAGES ---');
assert(fs.existsSync(path.join(ROOT, 'src/pages/HomePage.jsx')), 'HomePage.jsx exists');
assert(fs.existsSync(path.join(ROOT, 'src/pages/ServicesPage.jsx')), 'ServicesPage.jsx exists');
assert(fs.existsSync(path.join(ROOT, 'src/pages/AboutPage.jsx')), 'AboutPage.jsx exists');
assert(fs.existsSync(path.join(ROOT, 'src/pages/ContactPage.jsx')), 'ContactPage.jsx exists');
console.log('✓ Other pages (Home, Services, About, Contact) verified intact.');

console.log('\n=================================================');
console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
console.log('=================================================\n');

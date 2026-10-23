// ==============================================================================
// CORNERSTONE — Verification Script for WORK Grid Fix + Homepage Improvement
// ==============================================================================

import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT = process.cwd();

console.log('--- 1. VERIFYING TASK 1: WORK PAGE LAYOUT & PREVIEW SIZING ---');
const liveCardFile = fs.readFileSync(path.join(ROOT, 'src/components/LiveProjectCard.jsx'), 'utf-8');
const dxFile = fs.readFileSync(path.join(ROOT, 'src/pages/DigitalExperiencesPage.jsx'), 'utf-8');

// Preview on top with 16:10 aspect ratio
assert(liveCardFile.includes("aspectRatio: '16 / 10'"), 'Website preview container enforces 16:10 aspect ratio');

// No side-by-side split layout
assert(!liveCardFile.includes("gridTemplateColumns: isWide ? '1.2fr 0.8fr' : 'none'"), 'Side-by-side bento split removed');
assert(!liveCardFile.includes('live-card-split'), 'live-card-split class removed');

// Layout structure: Preview comes BEFORE content body
const previewIdx = liveCardFile.indexOf('live-preview-container');
const contentIdx = liveCardFile.indexOf('Project Title');
assert(previewIdx !== -1 && contentIdx !== -1 && previewIdx < contentIdx, 'Preview comes before project information body');

// Clean 2-column desktop grid
assert(dxFile.includes('dx-websites-grid'), 'DigitalExperiencesPage uses dx-websites-grid');
assert(dxFile.includes('grid-template-columns: repeat(2, minmax(0, 1fr))'), '2-column grid on desktop');

// Noise Dept and Vale Selvatico verified
const siteContent = fs.readFileSync(path.join(ROOT, 'src/data/siteContent.js'), 'utf-8');
assert(siteContent.includes('live-noise-dept'), 'Noise Dept. preserved');
assert(siteContent.includes('live-vale-selvatico'), 'Vale Selvatico preserved');
console.log('✓ WORK layout verified: 16:10 preview on top, project info below, 2-col desktop grid.');

console.log('--- 2. VERIFYING TASK 2: REMOVAL OF ADS FROM HOMEPAGE ---');
const homeFile = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.jsx'), 'utf-8');

assert(!homeFile.includes('HomeVideoShowcase'), 'HomeVideoShowcase removed from HomePage');
assert(!homeFile.includes('HomePhotographyGrid'), 'HomePhotographyGrid removed from HomePage');
assert(!homeFile.includes('CampaignLightboxModal'), 'CampaignLightboxModal removed from HomePage');
assert(!homeFile.includes('FEATURED_SHORTS'), 'FEATURED_SHORTS removed from HomePage');
assert(!homeFile.includes('LOCAL_ADS_IMAGES'), 'LOCAL_ADS_IMAGES removed from HomePage');
console.log('✓ Advertising videos and photo galleries completely removed from HomePage.');

console.log('--- 3. VERIFYING TASK 3: NEW HOMEPAGE SECTIONS & ORDER ---');
assert(homeFile.includes('<Hero'), 'Section 1: Hero present');
assert(homeFile.includes('<HomeAboutSection'), 'Section 2: HomeAboutSection present');
assert(homeFile.includes('<HomeServicesOverview'), 'Section 3: HomeServicesOverview present');
assert(homeFile.includes('<HomeCapabilitiesSection'), 'Section 4: HomeCapabilitiesSection present');
assert(homeFile.includes('<HomeWebsitesShowcase'), 'Section 5: HomeWebsitesShowcase present');
assert(homeFile.includes('<HomeProcessSection'), 'Section 6: HomeProcessSection present');
assert(homeFile.includes('<FinalCTA'), 'Section 7: FinalCTA present');

const s1 = homeFile.indexOf('<Hero');
const s2 = homeFile.indexOf('<HomeAboutSection');
const s3 = homeFile.indexOf('<HomeServicesOverview');
const s4 = homeFile.indexOf('<HomeCapabilitiesSection');
const s5 = homeFile.indexOf('<HomeWebsitesShowcase');
const s6 = homeFile.indexOf('<HomeProcessSection');
const s7 = homeFile.indexOf('<FinalCTA');

assert(s1 < s2 && s2 < s3 && s3 < s4 && s4 < s5 && s5 < s6 && s6 < s7, 'All 7 homepage sections in exact specified order');
console.log('✓ Homepage sections order verified: Hero -> About -> Services -> Capabilities -> Websites -> Process -> CTA.');

console.log('--- 4. VERIFYING SELECTED WEBSITE WORK SECTION ---');
const homeWebFile = fs.readFileSync(path.join(ROOT, 'src/components/HomeWebsitesShowcase.jsx'), 'utf-8');
assert(homeWebFile.includes('Noise Dept.'), 'Selected websites include Noise Dept.');
assert(homeWebFile.includes('Spinform™'), 'Selected websites include Spinform™');
assert(homeWebFile.includes('Paloma Social House'), 'Selected websites include Paloma Social House');
assert(homeWebFile.includes('Vale Selvatico'), 'Selected websites include Vale Selvatico');
assert(homeWebFile.includes("onNavigate('/work')"), 'Link points to /work');
console.log('✓ Selected website work verified with Noise Dept, Spinform, Paloma, Vale Selvatico.');

console.log('--- 5. VERIFYING ASSET & WORK PAGE PRESERVATION ---');
// Advertising assets and page preserved
const adsPageFile = fs.readFileSync(path.join(ROOT, 'src/pages/AdsPage.jsx'), 'utf-8');
assert(adsPageFile.includes('FEATURED_SHORTS'), 'AdsPage retains FEATURED_SHORTS');
assert(adsPageFile.includes('LOCAL_ADS_IMAGES'), 'AdsPage retains LOCAL_ADS_IMAGES');
assert(fs.existsSync(path.join(ROOT, 'public/images/1.png')), 'Ad image /images/1.png preserved');
assert(fs.existsSync(path.join(ROOT, 'src/data/adsProjects.js')), 'adsProjects.js preserved');

// Unrelated pages preserved
assert(fs.existsSync(path.join(ROOT, 'src/pages/ServicesPage.jsx')), 'ServicesPage.jsx preserved');
assert(fs.existsSync(path.join(ROOT, 'src/pages/AboutPage.jsx')), 'AboutPage.jsx preserved');
assert(fs.existsSync(path.join(ROOT, 'src/pages/ContactPage.jsx')), 'ContactPage.jsx preserved');
console.log('✓ Advertising content on WORK and all unrelated pages preserved intact.');

console.log('\n=================================================');
console.log('ALL WORK GRID & HOMEPAGE CHECKS PASSED (100%)!');
console.log('=================================================\n');

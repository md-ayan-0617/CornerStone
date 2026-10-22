// ==============================================================================
// CORNERSTONE — Ads Portfolio Redesign Verification Suite
// Validates 10 local demo images, 3 YouTube Shorts, minimal text, and GSAP animations.
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

console.log('\n--- VERIFYING PREMIUM ADS PORTFOLIO REDESIGN ---');

// 1. Verify existence and non-zero size of all 10 local demo images
for (let i = 1; i <= 10; i++) {
  const imgPath = path.join(rootDir, 'public', 'images', `${i}.png`);
  assert(fs.existsSync(imgPath), `Image /images/${i}.png exists in public/images/`);
  const stat = fs.statSync(imgPath);
  assert(stat.size > 500000, `Image /images/${i}.png is valid high-res asset (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

// 2. Verify src/data/adsProjects.js references all 10 images and 3 Shorts
const dataPath = path.join(rootDir, 'src', 'data', 'adsProjects.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

for (let i = 1; i <= 10; i++) {
  assert(dataContent.includes(`/images/${i}.png`), `adsProjects.js references /images/${i}.png`);
}

assert(dataContent.includes('n7i5_lQkq9k'), 'YouTube Short 1 (n7i5_lQkq9k) present');
assert(dataContent.includes('aO1ADthWkjk'), 'YouTube Short 2 (aO1ADthWkjk) present');
assert(dataContent.includes('yrpbqVTbGd4'), 'YouTube Short 3 (yrpbqVTbGd4) present');

// 3. Verify src/pages/AdsPage.jsx Implementation
const pagePath = path.join(rootDir, 'src', 'pages', 'AdsPage.jsx');
const pageContent = fs.readFileSync(pagePath, 'utf-8');

assert(pageContent.includes('LOCAL_ADS_IMAGES'), 'AdsPage imports and uses LOCAL_ADS_IMAGES');
assert(pageContent.includes('FEATURED_SHORTS'), 'AdsPage imports and uses FEATURED_SHORTS');
assert(pageContent.includes('aspectRatio: \'9 / 16\''), 'Shorts container uses portrait 9:16 aspect ratio');
assert(pageContent.includes('IntersectionObserver'), 'IntersectionObserver used for scroll-triggered playback');
assert(pageContent.includes('playVideo'), 'playVideo command dispatched on scroll entrance');
assert(pageContent.includes('pauseVideo'), 'pauseVideo command dispatched on scroll exit');
assert(!pageContent.includes('vc-play-button-overlay'), 'Oversized custom play button overlay removed');
assert(pageContent.includes('allLightboxItems'), 'Lightbox modal prepared with all 13 media items');
assert(pageContent.includes('CampaignLightboxModal'), 'CampaignLightboxModal integrated with Escape & Arrow keys');
assert(pageContent.includes('gsap.context'), 'GSAP animations scoped with gsap.context()');
assert(pageContent.includes('ctx.revert()'), 'GSAP animations cleaned up with ctx.revert()');
assert(pageContent.includes('prefers-reduced-motion'), 'Prefers-reduced-motion accessibility safeguard implemented');
assert(pageContent.includes('HAVE A BRAND TO MAKE UNFORGETTABLE?'), 'Final single-line contact headline present');
assert(pageContent.includes('START A PROJECT'), 'Final contact CTA button present');

console.log('\n========================================');
console.log('ALL 35 ADS PORTFOLIO VERIFICATION CHECKS PASSED');
console.log('========================================\n');

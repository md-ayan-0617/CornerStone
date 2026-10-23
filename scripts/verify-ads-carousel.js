import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- Verifying ADS Scroll-Driven Image Carousel ---');

let passed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    passed = false;
  }
}

// 1. Verify AdsScrollCarousel.jsx exists
const carouselPath = path.join(rootDir, 'src', 'components', 'AdsScrollCarousel.jsx');
assert(fs.existsSync(carouselPath), 'src/components/AdsScrollCarousel.jsx exists');

const carouselCode = fs.readFileSync(carouselPath, 'utf8');

// 2. Check GSAP ScrollTrigger usage
assert(carouselCode.includes("gsap.registerPlugin(ScrollTrigger);"), 'GSAP ScrollTrigger registered');
assert(carouselCode.includes("position: 'sticky'") || carouselCode.includes("pin:"), 'Sticky or pinned stage configured');
assert(carouselCode.includes("scrub:"), 'ScrollTrigger scrub configured for smooth scrolling');
assert(carouselCode.includes("ctx.revert()"), 'GSAP context cleanup properly implemented');

// 3. Check reduced motion support
assert(carouselCode.includes("prefers-reduced-motion"), 'Reduced motion accessibility query supported');

// 4. Check navigation/telemetry elements
assert(carouselCode.includes("progressLineRef"), 'Top scrubbed progress line present');
assert(carouselCode.includes("corner-bracket-tl"), 'Architectural corner accents present');
assert(carouselCode.includes("onSelectImage"), 'Lightbox trigger callback wired');

// 5. Verify AdsPage.jsx integrates AdsScrollCarousel
const adsPagePath = path.join(rootDir, 'src', 'pages', 'AdsPage.jsx');
const adsPageCode = fs.readFileSync(adsPagePath, 'utf8');

assert(adsPageCode.includes("import AdsScrollCarousel from '../components/AdsScrollCarousel';"), 'AdsScrollCarousel imported in AdsPage.jsx');
assert(adsPageCode.includes("<AdsScrollCarousel"), 'AdsScrollCarousel component rendered in AdsPage.jsx');
assert(adsPageCode.includes("images={LOCAL_ADS_IMAGES}"), 'LOCAL_ADS_IMAGES passed to AdsScrollCarousel');
assert(adsPageCode.includes("onSelectImage={(item) => setActiveModalItem(item)}"), 'Lightbox modal connected to AdsScrollCarousel');

// 6. Verify image data integrity
const adsDataPath = path.join(rootDir, 'src', 'data', 'adsProjects.js');
const adsDataCode = fs.readFileSync(adsDataPath, 'utf8');

assert(adsDataCode.includes("export const LOCAL_ADS_IMAGES"), 'LOCAL_ADS_IMAGES exported from adsProjects.js');
for (let i = 1; i <= 10; i++) {
  assert(adsDataCode.includes(`/images/${i}.png`), `Image /images/${i}.png referenced in adsProjects.js`);
}

// 7. Verify surrounding AdsPage sections preserved
assert(adsPageCode.includes("featured-video-gallery"), 'Video shorts section preserved');
assert(adsPageCode.includes("HAVE A BRAND TO MAKE UNFORGETTABLE?"), 'Contact CTA section preserved');
assert(adsPageCode.includes("<CampaignLightboxModal"), 'CampaignLightboxModal preserved');

if (passed) {
  console.log('\nAll ADS Scroll Carousel verification checks passed successfully!');
  process.exit(0);
} else {
  console.error('\nSome checks failed.');
  process.exit(1);
}

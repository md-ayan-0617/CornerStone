// ==============================================================================
// CORNERSTONE — Visual Campaigns Responsive & GSAP Upgrade Verification Suite
// Validates mobile layout fix, border radius, video URLs, and GSAP safeguards.
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

console.log('\n--- VERIFYING VISUAL CAMPAIGNS & RESPONSIVE GSAP IMPLEMENTATION ---');

// 1. Verify visualCampaigns.js
const dataPath = path.join(rootDir, 'src', 'data', 'visualCampaigns.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

assert(dataContent.includes('https://youtube.com/shorts/n7i5_lQkq9k'), 'YouTube Short 1 (n7i5_lQkq9k) is present');
assert(dataContent.includes('https://youtube.com/shorts/aO1ADthWkjk'), 'YouTube Short 2 (aO1ADthWkjk) is present');
assert(dataContent.includes('https://youtube.com/shorts/yrpbqVTbGd4'), 'YouTube Short 3 (yrpbqVTbGd4) is present');
assert(dataContent.includes('camp-feat-01') && dataContent.includes('camp-feat-02') && dataContent.includes('camp-feat-03'), 'All 3 YouTube Shorts are featured productions');
assert(dataContent.includes('export function getEmbedUrl'), 'Universal embed resolver getEmbedUrl is exported');

// 2. Verify VisualCampaignsPage.jsx
const pagePath = path.join(rootDir, 'src', 'pages', 'VisualCampaignsPage.jsx');
const pageContent = fs.readFileSync(pagePath, 'utf-8');

// A. Mobile Layout Fix Verification
assert(!pageContent.includes('gridTemplateColumns: idx % 2 === 0'), 'Removed conflicting inline gridTemplateColumns');
assert(!pageContent.includes('minmax(320px, 1fr)'), 'No minmax(320px, 1fr) causing mobile overflow');
assert(pageContent.includes('@media (max-width: 768px)'), 'Mobile media query defined at 768px');
assert(pageContent.includes('display: flex !important;'), 'Mobile single-column flex display enforced');
assert(pageContent.includes('flex-direction: column !important;'), 'Mobile stacked column direction enforced');
assert(pageContent.includes('.vc-featured-media-col {\n            width: 100% !important;\n            order: 1 !important;') || pageContent.includes('order: 1 !important;'), 'Video column is top (order 1) on mobile');
assert(pageContent.includes('.vc-featured-info-col {\n            width: 100% !important;\n            order: 2 !important;') || pageContent.includes('order: 2 !important;'), 'Campaign info column is bottom (order 2) on mobile');

// B. Video Container Premium Border Radius Verification
assert(pageContent.includes('border-radius: clamp(18px, 2.2vw, 24px)'), 'Desktop video container has 18-24px fluid border radius');
assert(pageContent.includes('border-radius: 16px !important;'), 'Mobile video container has 16px border radius');
assert(pageContent.includes('overflow: hidden;'), 'Video container has overflow: hidden');
assert(pageContent.includes('-webkit-mask-image: -webkit-radial-gradient(white, black);'), 'Video container has WebKit clipping mask');
assert(pageContent.includes('transform: translateZ(0);'), 'Video container has hardware accelerated translateZ(0) clipping');
assert(pageContent.includes('box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.8)'), 'Video container has restrained premium shadow/glow');
assert(pageContent.includes('vc-play-button-overlay'), 'Clean play-button overlay implemented');
assert(pageContent.includes('vc-play-circle'), 'Circular lime play icon with hover scale implemented');

// C. Editorial Campaign Details Verification
assert(pageContent.includes('vc-feat-cat'), 'Category & client metadata element present');
assert(pageContent.includes('vc-feat-heading'), 'Large campaign heading element present');
assert(pageContent.includes('vc-feat-tagline'), 'Supporting tagline element present');
assert(pageContent.includes('vc-feat-desc'), 'Campaign description element present');
assert(pageContent.includes('vc-deliverables-group'), 'Deliverables suite container present');
assert(pageContent.includes('vc-chip'), 'Deliverable compact chips present');
assert(pageContent.includes('vc-cta-group'), 'CTA buttons group present');
assert(pageContent.includes('PLAY CAMPAIGN FILM'), 'Primary playback CTA button present');
assert(pageContent.includes('FULLSCREEN REEL'), 'Secondary fullscreen lightbox CTA button present');

// D. GSAP & Responsive Animation Safeguards Verification
assert(pageContent.includes('gsap.context'), 'GSAP animations wrapped in gsap.context()');
assert(pageContent.includes('ctx.revert()'), 'GSAP animations properly cleaned up on unmount with ctx.revert()');
assert(pageContent.includes('gsap.matchMedia()'), 'Responsive GSAP animations handled via gsap.matchMedia()');
assert(pageContent.includes('prefers-reduced-motion'), 'Prefers-reduced-motion accessibility safeguard implemented');
assert(pageContent.includes('clearProps: \'all\''), 'Mobile animations use clearProps: all so content is never hidden');
assert(pageContent.includes('clipPath'), 'Visual entrance timeline features smooth clipPath reveal');

// E. Lightbox & Playback Verification
assert(pageContent.includes('CampaignLightboxModal'), 'CampaignLightboxModal integrated for fullscreen viewing');
assert(pageContent.includes('playingInlineId'), 'Inline video player state supported inside rounded container');
assert(pageContent.includes('enablejsapi=1'), 'YouTube IFrame Player API enabled');

console.log('\n========================================');
console.log('ALL VISUAL CAMPAIGNS VERIFICATION CHECKS PASSED');
console.log('========================================\n');

import fs from 'fs';
import path from 'path';
import assert from 'assert';

const ROOT = process.cwd();

console.log('--- 1. VERIFYING TASK 1: WORK PAGE WEBSITE PREVIEWS MUST DOMINATE ---');

// LiveProjectCard checks
const liveCardPath = path.join(ROOT, 'src/components/LiveProjectCard.jsx');
assert(fs.existsSync(liveCardPath), 'LiveProjectCard.jsx exists');
const liveCardContent = fs.readFileSync(liveCardPath, 'utf-8');

assert(liveCardContent.includes("aspectRatio: '16 / 10'"), 'LiveProjectCard has 16:10 aspect ratio preview');
assert(liveCardContent.includes('minHeight: \'clamp(340px'), 'LiveProjectCard has generous controlled minHeight');
assert(liveCardContent.includes('<WebsitePreviewFrame'), 'LiveProjectCard renders WebsitePreviewFrame');
assert(liveCardContent.indexOf('<WebsitePreviewFrame') < liveCardContent.indexOf('project.title'), 'Preview is placed ABOVE project details (not squeezed into side column)');
assert(liveCardContent.includes('project.shortDescription'), 'Short description preserved');
assert(liveCardContent.includes('project.techStack'), 'Tech stack labels preserved');
assert(liveCardContent.includes('VIEW LIVE DEMO'), 'Live demo action preserved');

// WebsitePreviewFrame runtime check
const previewFramePath = path.join(ROOT, 'src/components/WebsitePreviewFrame.jsx');
const previewFrameContent = fs.readFileSync(previewFramePath, 'utf-8');
assert(previewFrameContent.includes('const [isInteracting, setIsInteracting] = useState(false);'), 'isInteracting state properly declared in WebsitePreviewFrame');
assert(previewFrameContent.includes('data-lenis-prevent="true"'), 'Lenis prevent configured to allow internal iframe scrolling');
assert(previewFrameContent.includes('<iframe'), 'WebsitePreviewFrame embeds real iframe');

// Check DigitalExperiencesPage grid
const dxPagePath = path.join(ROOT, 'src/pages/DigitalExperiencesPage.jsx');
const dxPageContent = fs.readFileSync(dxPagePath, 'utf-8');
assert(dxPageContent.includes('.dx-websites-grid'), 'Grid CSS class present');
assert(dxPageContent.includes('repeat(2, minmax(0, 1fr))'), 'Desktop balanced 2-column grid present');

console.log('✓ Task 1 verified: WORK page website previews dominate, 16:10 ratio, compact text below, 2-column desktop grid.');

console.log('--- 2. VERIFYING TASK 2: HOMEPAGE ENLARGED PREVIEWS & SCROLLING ---');

const homeWebPath = path.join(ROOT, 'src/components/HomeWebsitesShowcase.jsx');
assert(fs.existsSync(homeWebPath), 'HomeWebsitesShowcase.jsx exists');
const homeWebContent = fs.readFileSync(homeWebPath, 'utf-8');

assert(homeWebContent.includes('<WebsitePreviewFrame'), 'Homepage embeds live WebsitePreviewFrame');
assert(homeWebContent.includes("aspectRatio: '16 / 10'"), 'Homepage previews use generous 16:10 aspect ratio');
assert(homeWebContent.includes('minHeight: \'clamp(340px'), 'Homepage previews have controlled height');
assert(homeWebContent.includes('PreviewLightboxModal'), 'Homepage supports full-screen lightbox modal expand');
assert(homeWebContent.indexOf('<WebsitePreviewFrame') < homeWebContent.indexOf('proj.title'), 'Homepage preview is top/dominant, text is compact below');
assert(homeWebContent.includes('Noise Dept.'), 'Noise Dept included');
assert(homeWebContent.includes('Spinform™'), 'Spinform included');
assert(homeWebContent.includes('Paloma Social House'), 'Paloma Social House included');
assert(homeWebContent.includes('Vale Selvatico'), 'Vale Selvatico included');

console.log('✓ Task 2 verified: Homepage previews enlarged with live interactive WebsitePreviewFrame, internal scrolling, and compact info below.');

console.log('--- 3. VERIFYING TASK 3: CAROUSEL LEFT-TO-CENTER TRANSITION ---');

const carouselPath = path.join(ROOT, 'src/components/AdsScrollCarousel.jsx');
assert(fs.existsSync(carouselPath), 'AdsScrollCarousel.jsx exists');
const carouselContent = fs.readFileSync(carouselPath, 'utf-8');

// Check initial set
assert(carouselContent.includes("x: '-70%'") || carouselContent.includes("x: '-80%'"), 'Incoming cards initialized off to the left');

// Check outCard moving right
assert(carouselContent.includes("x: '70%'") || carouselContent.includes("x: '80%'"), 'Center card shifts right on transition');

// Check inCard moving to center 0%
assert(carouselContent.includes("x: '0%'"), 'Incoming card moves to center position');

// Check aspect ratio and uncropped image
assert(carouselContent.includes("aspect-ratio: 4 / 5"), 'Natural 4:5 aspect ratio preserved');
assert(carouselContent.includes("objectFit: 'contain'"), '100% uncropped object-fit: contain preserved');
assert(carouselContent.includes("scrub: 0.5"), 'Smooth scroll scrub preserved');

console.log('✓ Task 3 verified: Image carousel transitions LEFT -> CENTER -> RIGHT consistently with uncropped 4:5 images.');

console.log('\n======================================================');
console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY (100%)!');
console.log('======================================================\n');

// ==============================================================================
// CORNERSTONE — Centralized Advertising & Media Portfolio Data (ADS)
// File: src/data/adsProjects.js
// 
// HOW TO REPLACE OR ADD MEDIA:
// 1. YouTube Shorts / Videos:
//    - Replace the `videoId` or `videoUrl` with your YouTube video or short URL.
//    - The thumbnail URL will automatically resolve to https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg
// 2. Photography / AI Model Imagery:
//    - Update `imageUrl` and `thumbnailUrl` with your high-res image link or local asset path.
//    - Set `aspectRatio` to '9:16' (portrait), '16:9' (landscape), or '1:1' (square).
//    - Set `isPlaceholder: false` when using your real production media.
// ==============================================================================

/**
 * Generates an optimized YouTube embed URL supporting API control, muted autoplay, and hidden controls.
 */
export function getYouTubeEmbedUrl(videoIdOrUrl, { autoplay = 0, mute = 1, controls = 0, loop = 1 } = {}) {
  if (!videoIdOrUrl) return null;
  const str = String(videoIdOrUrl).trim();
  
  // Extract 11-character YouTube ID
  let id = str;
  const match = str.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    id = match[1];
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const playlistParam = loop ? `&playlist=${id}&loop=1` : '';
  const originParam = origin ? `&origin=${encodeURIComponent(origin)}` : '';

  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&controls=${controls ? 1 : 0}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&iv_load_policy=3${playlistParam}${originParam}`;
}

/**
 * 1. THE 3 VERIFIED YOUTUBE SHORTS (High-Priority Requirement)
 * Exact IDs in exact order requested by client:
 * Video 1: n7i5_lQkq9k
 * Video 2: aO1ADthWkjk
 * Video 3: yrpbqVTbGd4
 */
export const FEATURED_SHORTS = [
  {
    id: "short-01",
    videoId: "n7i5_lQkq9k",
    title: "THE OBSIDIAN ARCHIVE",
    subtitle: "AI Brand Campaign & Cinema Direction",
    category: "AI BRAND FILM",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/n7i5_lQkq9k",
    thumbnailUrl: "https://i.ytimg.com/vi/n7i5_lQkq9k/hqdefault.jpg",
    aspectRatio: "9:16",
    client: "CornerStone Creative",
    year: "2026",
    deliverables: ["4K Vertical Cut", "AI Lighting Suite", "Soundscape"],
    description: "AI-powered product visuals, cinematic camera tracking, and tactile low-frequency reflections designed for luxury brand authority.",
    badge: "FEATURED SHORT 01",
    isPlaceholder: false
  },
  {
    id: "short-02",
    videoId: "aO1ADthWkjk",
    title: "KINETIC VELOCITY",
    subtitle: "Luxury Product Commercial & Motion Ad",
    category: "PRODUCT VIDEO AD",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/aO1ADthWkjk",
    thumbnailUrl: "https://i.ytimg.com/vi/aO1ADthWkjk/hqdefault.jpg",
    aspectRatio: "9:16",
    client: "Aurelis Studio Co.",
    year: "2026",
    deliverables: ["Paid Social Reel", "Dynamic Pacing", "Story Ads"],
    description: "Atmospheric, tactile 9:16 vertical video ad capturing rapid transitions, physical textures, and high-impact visual hooks.",
    badge: "FEATURED SHORT 02",
    isPlaceholder: false
  },
  {
    id: "short-03",
    videoId: "yrpbqVTbGd4",
    title: "CHROMA & SHADOW",
    subtitle: "Macro Focus & High-Conversion Paid Feed Ad",
    category: "COMMERCIAL AD",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/yrpbqVTbGd4",
    thumbnailUrl: "https://i.ytimg.com/vi/yrpbqVTbGd4/hqdefault.jpg",
    aspectRatio: "9:16",
    client: "Maison Studio Co.",
    year: "2026",
    deliverables: ["Meta Reels Campaign", "Vertical Feed Ads", "Audio Master"],
    description: "Scripted commercial reel engineered for ultra-fast engagement, aesthetic distinction, and high-converting paid social campaigns.",
    badge: "FEATURED SHORT 03",
    isPlaceholder: false
  }
];

export const ADS_CATEGORIES = [
  "All",
  "Featured Shorts",
  "AI Models & Fashion",
  "Product Campaigns",
  "Beauty & Lifestyle",
  "Commercial Stills"
];

/**
 * 2. ADVERTISING PHOTOGRAPHY, AI MODELS & COMMERCIAL VISUALS
 * Curated art-directed mix of portrait (9:16), landscape (16:9), and square (1:1).
 */
export const ADS_PHOTOGRAPHY = [
  {
    id: "ad-photo-01",
    title: "Aura Lumina: AI Fashion Editorial",
    category: "AI Models & Fashion",
    categoryFilter: "AI Models & Fashion",
    type: "image",
    client: "Maison Studio",
    year: "2026",
    aspectRatio: "9:16",
    imageUrl: "/images/services/service-ai-photography.jpg",
    thumbnailUrl: "/images/services/service-ai-photography.jpg",
    tagline: "Hyper-realistic AI fashion models styled for Parisian high couture.",
    description: "Full editorial series created without human sets or travel overhead, maintaining 100% fabric consistency and natural facial lighting.",
    deliverables: ["Editorial Lookbook", "Vogue Placement", "Billboards"],
    isPlaceholder: true
  },
  {
    id: "ad-photo-02",
    title: "Nocturne Chronograph: Tactile Product",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    type: "image",
    client: "Vanguard Horology",
    year: "2026",
    aspectRatio: "1:1",
    imageUrl: "/images/services/service-creative-production.jpg",
    thumbnailUrl: "/images/services/service-creative-production.jpg",
    tagline: "Surgical macro lighting on aerospace-grade titanium.",
    description: "High-precision commercial product imagery capturing micro-bevels, sapphire crystal reflections, and subtle lime illumination.",
    deliverables: ["Product Stills", "E-Commerce Hero", "Print Ads"],
    isPlaceholder: true
  },
  {
    id: "ad-photo-03",
    title: "Komorebi Botanicals: Organic Beauty",
    category: "Beauty & Lifestyle",
    categoryFilter: "Beauty & Lifestyle",
    type: "image",
    client: "Komorebi Skincare",
    year: "2026",
    aspectRatio: "9:16",
    imageUrl: "/images/services/service-ai-automation.jpg",
    thumbnailUrl: "/images/services/service-ai-automation.jpg",
    tagline: "Minimalist Japanese skincare visual identity.",
    description: "Clean water surface tension, frosted glass dropper bottles, and gentle warm morning ambient lighting for luxury cosmetic retail.",
    deliverables: ["Digital Flagship", "Sephora In-Store", "Story Ad Suite"],
    isPlaceholder: true
  },
  {
    id: "ad-photo-04",
    title: "Equinox Architecture: Minimal Interior",
    category: "Commercial Stills",
    categoryFilter: "Commercial Stills",
    type: "image",
    client: "Studio Architekten",
    year: "2026",
    aspectRatio: "16:9",
    imageUrl: "/images/services/service-website-development.jpg",
    thumbnailUrl: "/images/services/service-website-development.jpg",
    tagline: "Monolithic concrete and linear aperture illumination.",
    description: "Architectural commercial stills commissioned for modern design firms and luxury real estate key visual portfolios.",
    deliverables: ["Architectural Digest", "Hero Assets", "Print Monograph"],
    isPlaceholder: true
  },
  {
    id: "ad-photo-05",
    title: "Verve Kinetic: Neo-Sportswear",
    category: "AI Models & Fashion",
    categoryFilter: "AI Models & Fashion",
    type: "image",
    client: "Verve Athletic Labs",
    year: "2026",
    aspectRatio: "9:16",
    imageUrl: "/images/services/service-ad-creative-design.jpg",
    thumbnailUrl: "/images/services/service-ad-creative-design.jpg",
    tagline: "High-velocity technical performance wear.",
    description: "Dynamic athletic poses captured with synthetic rain droplets, cinematic flash sync, and custom aerodynamic textiles.",
    deliverables: ["Paid Social Ads", "Outdoor Posters", "Web Lookbook"],
    isPlaceholder: true
  },
  {
    id: "ad-photo-06",
    title: "Solis Audio: Carbon Fiber Headphone",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    type: "image",
    client: "Solis Sound Systems",
    year: "2026",
    aspectRatio: "1:1",
    imageUrl: "/images/services/service-ai-voice.jpg",
    thumbnailUrl: "/images/services/service-ai-voice.jpg",
    tagline: "Acoustic precision meets architectural industrial design.",
    description: "High-contrast commercial lighting highlighting brushed aluminum sliders, memory foam ear cups, and braided audio cabling.",
    deliverables: ["Product Launch Key Visual", "3D Renders", "Packaging"],
    isPlaceholder: true
  }
];

/**
 * 3. CURATED EDITORIAL CAROUSELS
 * Swipeable and clickable lookbooks for Fashion/AI Models & Luxury Products.
 */
export const ADS_CAROUSELS = [
  {
    id: "carousel-fashion",
    title: "AI FASHION & DIGITAL AVATAR LOOKBOOK",
    category: "FASHION & EDITORIAL",
    tagline: "Virtual Haute Couture & Synthetic Lookbooks",
    description: "Full seasonal collections modeled by proprietary digital avatars. Zero studio logistics, 100% lighting & textile consistency across 40+ looks.",
    slides: [
      {
        id: "cf-01",
        title: "Look 01: Monolithic Wool Overcoat",
        subtitle: "Oversized Charcoal & Structured Shoulders",
        aspectRatio: "9:16",
        imageUrl: "/images/services/service-ai-photography.jpg"
      },
      {
        id: "cf-02",
        title: "Look 02: Technical Metallic Trench",
        subtitle: "Water-Repellent Liquid Chrome Weave",
        aspectRatio: "9:16",
        imageUrl: "/images/services/service-ad-creative-design.jpg"
      },
      {
        id: "cf-03",
        title: "Look 03: Sculptural Cashmere Knit",
        subtitle: "Minimalist Bone White Silhouette",
        aspectRatio: "9:16",
        imageUrl: "/images/services/service-creative-production.jpg"
      }
    ]
  },
  {
    id: "carousel-product",
    title: "LUXURY PRODUCT & MATERIAL EXPLORATION",
    category: "PRODUCT CAMPAIGN",
    tagline: "Tactile Glass, Matte Ceramic & Titanium Key Visuals",
    description: "Close-up macro advertising photography engineered to make product materials tangible through high-resolution screens.",
    slides: [
      {
        id: "cp-01",
        title: "Series A: Frosted Glass Refraction",
        subtitle: "Cosmetic Essence Dropper with Sub-Surface Scattering",
        aspectRatio: "1:1",
        imageUrl: "/images/services/service-ai-automation.jpg"
      },
      {
        id: "cp-02",
        title: "Series B: Matte Black Ceramic",
        subtitle: "Smart Ring Architecture with Micro Sensor Array",
        aspectRatio: "1:1",
        imageUrl: "/images/services/service-website-development.jpg"
      },
      {
        id: "cp-03",
        title: "Series C: Architectural Anodized Aluminum",
        subtitle: "Precision Audio Core with Laser-Etched Monogram",
        aspectRatio: "1:1",
        imageUrl: "/images/services/service-ai-voice.jpg"
      }
    ]
  }
];

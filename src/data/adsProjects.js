// ==============================================================================
// CORNERSTONE — Centralized Advertising & Media Portfolio Data (ADS)
// File: src/data/adsProjects.js
// 
// Uses local demo images: /images/1.png through /images/10.png
// Uses verified YouTube Shorts: n7i5_lQkq9k, aO1ADthWkjk, yrpbqVTbGd4
// ==============================================================================

/**
 * Generates an optimized YouTube embed URL supporting API control, muted autoplay, and hidden controls.
 */
export function getYouTubeEmbedUrl(videoIdOrUrl, { autoplay = 0, mute = 1, controls = 0, loop = 1 } = {}) {
  if (!videoIdOrUrl) return null;
  const str = String(videoIdOrUrl).trim();
  
  let id = str;
  const match = str.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    id = match[1];
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const playlistParam = loop ? `&playlist=${id}&loop=1` : '';
  const originParam = origin ? `&origin=${encodeURIComponent(origin)}` : '';

  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}&controls=${controls ? 1 : 0}&fs=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&iv_load_policy=3${playlistParam}${originParam}`;
}

/**
 * 1. THE 3 VERIFIED YOUTUBE SHORTS (Native 9:16 Portrait Aspect Ratio)
 */
export const FEATURED_SHORTS = [
  {
    id: "short-01",
    videoId: "n7i5_lQkq9k",
    title: "THE OBSIDIAN ARCHIVE",
    category: "AI BRAND FILM",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/n7i5_lQkq9k",
    thumbnailUrl: "https://i.ytimg.com/vi/n7i5_lQkq9k/hqdefault.jpg",
    aspectRatio: "9:16",
    badge: "01 // FILM",
    isPlaceholder: false
  },
  {
    id: "short-02",
    videoId: "aO1ADthWkjk",
    title: "KINETIC VELOCITY",
    category: "PRODUCT VIDEO AD",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/aO1ADthWkjk",
    thumbnailUrl: "https://i.ytimg.com/vi/aO1ADthWkjk/hqdefault.jpg",
    aspectRatio: "9:16",
    badge: "02 // MOTION",
    isPlaceholder: false
  },
  {
    id: "short-03",
    videoId: "yrpbqVTbGd4",
    title: "CHROMA & SHADOW",
    category: "COMMERCIAL AD",
    type: "video",
    platform: "youtube",
    videoUrl: "https://youtube.com/shorts/yrpbqVTbGd4",
    thumbnailUrl: "https://i.ytimg.com/vi/yrpbqVTbGd4/hqdefault.jpg",
    aspectRatio: "9:16",
    badge: "03 // REEL",
    isPlaceholder: false
  }
];

/**
 * 2. THE 10 LOCAL DEMO IMAGES (/images/1.png to /images/10.png)
 * Ultra-high-resolution luxury, beauty, lifestyle, and fashion editorial advertising visuals.
 */
export const LOCAL_ADS_IMAGES = [
  {
    id: "ad-img-01",
    number: "01",
    title: "LUMIÈRE EAU DE PARFUM",
    category: "LUXURY PERFUME",
    client: "Independent Concept",
    imageUrl: "/images/1.png",
    thumbnailUrl: "/images/1.png",
    aspectRatio: "9:16",
    badge: "INDEPENDENT CONCEPT",
    tagline: "Amber glass reflections and couture perfume visual exploration (Independent Concept)."
  },
  {
    id: "ad-img-02",
    number: "02",
    title: "DOT & KEY SUNSCREEN",
    category: "BEAUTY & SKINCARE",
    client: "Speculative Concept",
    imageUrl: "/images/2.png",
    thumbnailUrl: "/images/2.png",
    aspectRatio: "4:5",
    badge: "SPECULATIVE CREATIVE CONCEPT",
    tagline: "Watermelon cooling sunscreen commercial visuals (Speculative Creative Concept — Unofficial Brand Study)."
  },
  {
    id: "ad-img-03",
    number: "03",
    title: "MISS DIOR EAU DE PARFUM",
    category: "FASHION FRAGRANCE",
    client: "Unofficial Brand Concept",
    imageUrl: "/images/3.png",
    thumbnailUrl: "/images/3.png",
    aspectRatio: "4:5",
    badge: "UNOFFICIAL BRAND CONCEPT",
    tagline: "Courtyard natural daylight and fragrance styling (Unofficial Brand Concept — Not commissioned by or affiliated with Dior)."
  },
  {
    id: "ad-img-04",
    number: "04",
    title: "AURORA FINE JEWELRY",
    category: "HIGH JEWELRY",
    client: "Independent Concept",
    imageUrl: "/images/4.png",
    thumbnailUrl: "/images/4.png",
    aspectRatio: "4:5",
    badge: "INDEPENDENT CONCEPT",
    tagline: "Gold and pearl layering with minimalist linen contrast (Independent Creative Concept)."
  },
  {
    id: "ad-img-05",
    number: "05",
    title: "MINIMALIST VITAMIN C SERUM",
    category: "CLEAN COSMETICS",
    client: "Speculative Concept",
    imageUrl: "/images/5.png",
    thumbnailUrl: "/images/5.png",
    aspectRatio: "4:5",
    badge: "SPECULATIVE CREATIVE CONCEPT",
    tagline: "Sunlight warmth and active clinical skincare aesthetics (Speculative Creative Concept — Unofficial Brand Study)."
  },
  {
    id: "ad-img-06",
    number: "06",
    title: "SOLITAIRE HAUTE JOAILLERIE",
    category: "HAUTE JOAILLERIE",
    client: "Independent Concept",
    imageUrl: "/images/6.png",
    thumbnailUrl: "/images/6.png",
    aspectRatio: "4:5",
    badge: "INDEPENDENT CONCEPT",
    tagline: "Pear-cut diamond brilliance on draped bronze silk (Independent Creative Concept)."
  },
  {
    id: "ad-img-07",
    number: "07",
    title: "FASHION WEEK: THE NEW MOOD",
    category: "EDITORIAL MONOGRAPH",
    client: "Independent Concept",
    imageUrl: "/images/7.png",
    thumbnailUrl: "/images/7.png",
    aspectRatio: "4:5",
    badge: "INDEPENDENT CONCEPT",
    tagline: "Structured chocolate blazer and studio aperture lighting (Independent Editorial Concept)."
  },
  {
    id: "ad-img-08",
    number: "08",
    title: "HOUSE OF QUIRK: SIP PERSONALITY",
    category: "LIFESTYLE PRODUCT",
    client: "Speculative Concept",
    imageUrl: "/images/8.png",
    thumbnailUrl: "/images/8.png",
    aspectRatio: "4:5",
    badge: "SPECULATIVE CREATIVE CONCEPT",
    tagline: "Playful pastel tumblers and commercial pop visuals (Speculative Creative Concept — Unofficial Brand Study)."
  },
  {
    id: "ad-img-09",
    number: "09",
    title: "GUCCI: THE POETRY OF MOVEMENT",
    category: "LUXURY COUTURE",
    client: "Unofficial Brand Concept",
    imageUrl: "/images/9.png",
    thumbnailUrl: "/images/9.png",
    aspectRatio: "4:5",
    badge: "UNOFFICIAL BRAND CONCEPT",
    tagline: "Burgundy chiffon gown in sculpted architectural alcove (Unofficial Brand Concept — Not commissioned by or affiliated with Gucci)."
  },
  {
    id: "ad-img-10",
    number: "10",
    title: "CRUMBL: TAKE THE SCENIC SIP",
    category: "BEVERAGE & LIFESTYLE",
    client: "Speculative Concept",
    imageUrl: "/images/10.png",
    thumbnailUrl: "/images/10.png",
    aspectRatio: "4:5",
    badge: "SPECULATIVE CREATIVE CONCEPT",
    tagline: "Pink vintage convertible and sunny coastal lifestyle (Speculative Creative Concept — Unofficial Brand Study)."
  }
];

// Backwards-compatible aliases for any older references
export const ADS_PHOTOGRAPHY = LOCAL_ADS_IMAGES;
export const ADS_CAROUSELS = LOCAL_ADS_IMAGES;

// ==============================================================================
// CORNERSTONE — Visual Campaigns & Advertising Portfolio Data
// Centralized media directory for commercial advertising, videos, photography & AI models.
// Replace any mediaUrl or thumbnailUrl with your own URLs without touching layout components.
// ==============================================================================

/**
 * Universal video embed resolver:
 * Converts YouTube (watch, short, youtu.be), Vimeo, or direct video URLs into safe embed URLs.
 */
export function getEmbedUrl(url) {
  if (!url) return null;
  const str = String(url).trim();

  // YouTube watch: https://www.youtube.com/watch?v=VIDEO_ID
  const ytWatch = str.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytWatch && ytWatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytWatch[1]}?autoplay=1&fs=1&playsinline=1&rel=0&modestbranding=1`;
  }

  // Vimeo: https://vimeo.com/VIDEO_ID
  const vimeoMatch = str.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`;
  }

  // Already an embed or direct video file
  return str;
}

export const CAMPAIGN_CATEGORIES = [
  "All",
  "Video Ads",
  "Product Campaigns",
  "Fashion & Models",
  "Beauty",
  "Lifestyle",
  "Brand Films",
  "AI Creative",
  "Social Media Ads"
];

export const FEATURED_CAMPAIGNS = [
  {
    id: "camp-feat-01",
    title: "THE OBSIDIAN ARCHIVE // AI BRAND CAMPAIGN",
    client: "CornerStone Creative Studio",
    year: "2026",
    category: "Brand Films",
    categoryFilter: "Brand Films",
    tagline: "AI-Powered Product Visuals & Modern Commercial Direction",
    description: "Created as a creative advertising concept to explore AI-powered product visuals, cinematic camera tracking, and modern brand prestige. Engineered to command attention across broadcast and high-velocity digital feeds.",
    deliverables: ["4K Master Film", "9:16 Vertical Cutdown", "AI Model Lookbook", "Paid Social Ad Suite"],
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/n7i5_lQkq9k",
    thumbnailUrl: "https://i.ytimg.com/vi/n7i5_lQkq9k/hqdefault.jpg",
    badge: "FEATURED PRODUCTION",
    isPlaceholder: false
  },
  {
    id: "camp-feat-02",
    title: "KINETIC FORM // LUXURY PRODUCT CAMPAIGN",
    client: "Aurelis Luxury & Studio Co.",
    year: "2026",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    tagline: "Tactile Light Reflection & Dynamic High-End Commercial Stills",
    description: "A high-octane visual exploration of materials, light refraction, and dynamic pacing crafted for prestige product launches and luxury digital flagships.",
    deliverables: ["Social Video Ad (9:16)", "E-Commerce Key Visuals", "Hero Billboard Stills", "Story Suite"],
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/aO1ADthWkjk",
    thumbnailUrl: "https://i.ytimg.com/vi/aO1ADthWkjk/hqdefault.jpg",
    badge: "GLOBAL CAMPAIGN",
    isPlaceholder: false
  },
  {
    id: "camp-feat-03",
    title: "CHROMA & SHADOW // HIGH-IMPACT COMMERCIAL CUT",
    client: "Maison Studio Co.",
    year: "2026",
    category: "Video Ads",
    categoryFilter: "Video Ads",
    tagline: "Sub-Macro Focus, Tactile Textures & High-Impact Commercial Direction",
    description: "Scripted commercial reel engineered for ultra-fast engagement, aesthetic distinction, and high-converting paid social feeds. Designed to maximize watch-time and brand prestige.",
    deliverables: ["Meta Reels Campaign", "Vertical Feed Ads", "Display Assets", "Audio Mix"],
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/yrpbqVTbGd4",
    thumbnailUrl: "https://i.ytimg.com/vi/yrpbqVTbGd4/hqdefault.jpg",
    badge: "DIRECTOR'S CUT",
    isPlaceholder: false
  }
];

export const VISUAL_CAMPAIGNS = [
  // 1. VIDEO ADS & BRAND FILMS (Featuring the 3 Verified YouTube Shorts)
  {
    id: "vc-01",
    title: "The Obsidian Archive: AI Brand Visuals",
    client: "CornerStone Creative Studio",
    year: "2026",
    category: "Brand Films",
    categoryFilter: "Brand Films",
    tagline: "AI-powered product visuals and modern brand prestige in motion.",
    description: "A cinematic commercial exploring light reflection across sculptural forms, deep low-frequency soundscapes, and high-velocity camera tracking.",
    aspectRatio: "9:16",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/n7i5_lQkq9k",
    thumbnailUrl: "https://i.ytimg.com/vi/n7i5_lQkq9k/hqdefault.jpg",
    duration: "0:30",
    deliverables: ["4K Master", "9:16 Vertical Cut", "Sound Design"],
    isPlaceholder: false
  },
  {
    id: "vc-02",
    title: "Kinetic Velocity: High-Impact Video Ad",
    client: "Aurelis Studio Co.",
    year: "2026",
    category: "Video Ads",
    categoryFilter: "Video Ads",
    tagline: "High-octane pacing crafted for modern digital audiences.",
    description: "Atmospheric, tactile 9:16 vertical video ad capturing rapid transitions, physical textures, and dynamic visual hooks.",
    aspectRatio: "9:16",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/aO1ADthWkjk",
    thumbnailUrl: "https://i.ytimg.com/vi/aO1ADthWkjk/hqdefault.jpg",
    duration: "0:30",
    deliverables: ["Paid TikTok/Reels Campaign", "Story Ads", "Commercial Cut"],
    isPlaceholder: false
  },
  {
    id: "vc-03",
    title: "Chroma & Shadow: Creative Experiment",
    client: "Maison Studio",
    year: "2026",
    category: "Video Ads",
    categoryFilter: "Video Ads",
    tagline: "Sub-macro focus, tactile textures, and high-impact pacing.",
    description: "Scripted commercial reel engineered for ultra-fast engagement, aesthetic distinction, and high-converting paid social feeds.",
    aspectRatio: "9:16",
    mediaType: "video",
    mediaUrl: "https://youtube.com/shorts/yrpbqVTbGd4",
    thumbnailUrl: "https://i.ytimg.com/vi/yrpbqVTbGd4/hqdefault.jpg",
    duration: "0:30",
    deliverables: ["Meta Reels Campaign", "Vertical Feed Ads", "Display Assets"],
    isPlaceholder: false
  },
  {
    id: "vc-04",
    title: "Tactile Form: 3D Motion Extruder",
    client: "Spinform Studio",
    year: "2026",
    category: "AI Creative",
    categoryFilter: "AI Creative",
    tagline: "Transforming 2D brand identities into liquid chrome & clay.",
    description: "A mesmerizing 3D animation loop illustrating real-time vector extrusion and PBR material responsiveness in WebGL.",
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnailUrl: "/images/projects/spinform.jpg",
    duration: "0:35",
    deliverables: ["3D Product Demo", "Organic Materials Loop", "WebGL Embed"],
    isPlaceholder: true
  },

  // 2. PRODUCT CAMPAIGNS & BEAUTY
  {
    id: "vc-05",
    title: "Vale Selvatico Cold-Pressed Olive Harvest",
    client: "Vale Selvatico Estate",
    year: "2026",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    tagline: "Sunlit Sicilian amber and cold-pressed extra virgin culinary oils.",
    description: "Artisanal commercial still series capturing droplets of bergamot-infused olive oil against porous volcanic stone.",
    aspectRatio: "4:5",
    mediaType: "image",
    mediaUrl: "/images/projects/vale-selvatico.jpg",
    thumbnailUrl: "/images/projects/vale-selvatico.jpg",
    deliverables: ["E-Commerce Hero Imagery", "Packaging Still Suite", "DTC Ad Banners"],
    isPlaceholder: true
  },
  {
    id: "vc-06",
    title: "Lumière Botanique // Clinical Serum",
    client: "Lumière Skincare",
    year: "2026",
    category: "Beauty",
    categoryFilter: "Beauty",
    tagline: "Ultra-pure botanical hydration captured in sub-macro detail.",
    description: "Beauty campaign exploring translucent textures, light refraction through glass pipettes, and dewy botanical moisture.",
    aspectRatio: "3:4",
    mediaType: "image",
    mediaUrl: "/images/services/service-ai-photography.jpg",
    thumbnailUrl: "/images/services/service-ai-photography.jpg",
    deliverables: ["Beauty Stills Suite", "Macro Texture Highlights", "Sephora Retail Displays"],
    isPlaceholder: true
  },
  {
    id: "vc-07",
    title: "Obsidian Pavé & Emerald Solitaire",
    client: "Aurenne Haute Joaillerie",
    year: "2026",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    tagline: "Precision gemstone facets bathed in architectural chiaroscuro.",
    description: "High jewellery macro photography revealing the micro-pave prongs and internal emerald crystal gardens.",
    aspectRatio: "1:1",
    mediaType: "image",
    mediaUrl: "/images/projects/aurenne.jpg",
    thumbnailUrl: "/images/projects/aurenne.jpg",
    deliverables: ["Catalogue Imagery", "VIP Lookbook Stills", "Instagram Grid Suite"],
    isPlaceholder: true
  },

  // 3. FASHION & MODELS (AI & STUDIO)
  {
    id: "vc-08",
    title: "Monochrome Haute Couture // Autumn Lookbook",
    client: "Maison V",
    year: "2026",
    category: "Fashion & Models",
    categoryFilter: "Fashion & Models",
    tagline: "Sculptural tailoring and minimalist silhouettes in charcoal space.",
    description: "Virtual AI model campaign combining photorealistic skin tones, flowing silk drapery, and stark editorial lighting.",
    aspectRatio: "3:4",
    mediaType: "image",
    mediaUrl: "/images/services/service-ad-creative-design.jpg",
    thumbnailUrl: "/images/services/service-ad-creative-design.jpg",
    deliverables: ["Complete Lookbook", "Billboard Stills", "Editorial Lookbook Spread"],
    isPlaceholder: true
  },
  {
    id: "vc-09",
    title: "Atelier Solstice: Model Campaign Concept",
    client: "Solstice Studio",
    year: "2026",
    category: "Fashion & Models",
    categoryFilter: "Fashion & Models",
    tagline: "Natural sunlight, raw linen textures, and expressive model portraits.",
    description: "Studio portraits exploring warm analog film grain, high dynamic range highlights, and contemporary editorial poses.",
    aspectRatio: "4:5",
    mediaType: "image",
    mediaUrl: "/images/services/service-ugc-video-ads.jpg",
    thumbnailUrl: "/images/services/service-ugc-video-ads.jpg",
    deliverables: ["Editorial Campaign", "Lookbook Magazine", "Social Paid Ads"],
    isPlaceholder: true
  },

  // 4. LIFESTYLE & SOCIAL MEDIA ADS
  {
    id: "vc-10",
    title: "Nocturne Rooftop Hours // Paloma Disco",
    client: "Paloma Social House",
    year: "2026",
    category: "Lifestyle",
    categoryFilter: "Lifestyle",
    tagline: "Golden hour energy and late-night vinyl lounge culture.",
    description: "Lifestyle photo series capturing laughter, cocktail service, candlelight on terrazzo tables, and intimate music sessions.",
    aspectRatio: "16:9",
    mediaType: "image",
    mediaUrl: "/images/projects/paloma-house.jpg",
    thumbnailUrl: "/images/projects/paloma-house.jpg",
    deliverables: ["Social Media Content Package", "Event Promotion Stills", "Website Lifestyle Stills"],
    isPlaceholder: true
  },
  {
    id: "vc-11",
    title: "Mosaic / Structured Data in Motion",
    client: "Mosaic / State",
    year: "2026",
    category: "AI Creative",
    categoryFilter: "AI Creative",
    tagline: "Generative data spatial topologies rendered for enterprise boards.",
    description: "Abstract visual representations of organizational knowledge nodes, animated with precision coordinate telemetry.",
    aspectRatio: "16:9",
    mediaType: "image",
    mediaUrl: "/images/projects/mosaic.jpg",
    thumbnailUrl: "/images/projects/mosaic.jpg",
    deliverables: ["Key Visuals", "Annual Report Graphics", "Interactive Header Visuals"],
    isPlaceholder: true
  },
  {
    id: "vc-12",
    title: "Velocity UGC Suite: Performance Conversion",
    client: "Direct Consumer Co.",
    year: "2026",
    category: "Social Media Ads",
    categoryFilter: "Social Media Ads",
    tagline: "High-hook scripted video ad assets designed for paid TikTok & Meta feeds.",
    description: "Scripted direct-response video creative built to command instant attention, demonstrate product value, and scale ROAS.",
    aspectRatio: "9:16",
    mediaType: "image",
    mediaUrl: "/images/services/service-ugc-video-ads.jpg",
    thumbnailUrl: "/images/services/service-ugc-video-ads.jpg",
    deliverables: ["10 Scripted Hooks", "Dynamic Subtitle Variants", "Conversion Creative Kit"],
    isPlaceholder: true
  }
];

// Curated carousels for specific collections
export const CAROUSEL_COLLECTIONS = [
  {
    id: "carousel-fashion-models",
    title: "FASHION & VIRTUAL MODEL DIRECTORY",
    category: "Fashion & Models",
    description: "Photorealistic AI model photography calibrated for global apparel, jewelry, and runway campaigns without physical studio bottlenecks.",
    items: [
      {
        title: "Obsidian Silk Suit",
        subtitle: "Maison V Autumn 2026",
        image: "/images/services/service-ad-creative-design.jpg",
        aspectRatio: "3:4"
      },
      {
        title: "High Jewellery Salon Model",
        subtitle: "Aurenne Haute Joaillerie",
        image: "/images/projects/aurenne.jpg",
        aspectRatio: "3:4"
      },
      {
        title: "Linen & Warm Sunlight",
        subtitle: "Solstice Studio Lookbook",
        image: "/images/services/service-ugc-video-ads.jpg",
        aspectRatio: "3:4"
      },
      {
        title: "Editorial Beauty Portrait",
        subtitle: "Clinical Skincare Series",
        image: "/images/services/service-ai-photography.jpg",
        aspectRatio: "3:4"
      }
    ]
  },
  {
    id: "carousel-product-campaigns",
    title: "PRODUCT & LUXURY COMMERCIAL STILLS",
    category: "Product Campaigns",
    description: "Editorial product photography engineered with ray-traced lighting, tactile physical materials, and macro precision.",
    items: [
      {
        title: "Aurelis GT Wind Tunnel Aerodynamics",
        subtitle: "Automotive Lighting Simulation",
        image: "/images/projects/auto-mobile.jpg",
        aspectRatio: "16:9"
      },
      {
        title: "Vale Selvatico Harvest Bottle",
        subtitle: "Cold-Pressed Sicilian Apothecary",
        image: "/images/projects/vale-selvatico.jpg",
        aspectRatio: "4:5"
      },
      {
        title: "Spinform 3D Motion Vector",
        subtitle: "PBR Material Extrusion",
        image: "/images/projects/spinform.jpg",
        aspectRatio: "16:9"
      },
      {
        title: "Aurenne Pavé Diamond Macro",
        subtitle: "Fine Jewellery Chiaroscuro",
        image: "/images/projects/aurenne.jpg",
        aspectRatio: "1:1"
      }
    ]
  }
];

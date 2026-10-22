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
    return `https://www.youtube-nocookie.com/embed/${ytWatch[1]}?autoplay=1&rel=0&modestbranding=1`;
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
    title: "KINETIC FLUIDITY // AURELIS EV",
    client: "Aurelis Motor Co.",
    year: "2026",
    category: "Brand Films",
    categoryFilter: "Brand Films",
    tagline: "Aerodynamics in Pure Obsidian — The AML-09GT Launch Film",
    description: "A cinematic commercial exploring light reflection across bespoke carbon chasses. Crafted with hyper-realistic aerodynamic wind tunnels, deep low-frequency soundscapes, and high-velocity camera tracking.",
    deliverables: ["4K Cinema Brand Film", "9:16 Vertical Cutdowns for Paid Media", "Digital Billboards", "Key Visual Still Series"],
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Replaceable YouTube / Vimeo / MP4
    thumbnailUrl: "/images/projects/auto-mobile.jpg",
    badge: "FEATURED CAMPAIGN",
    isPlaceholder: true
  },
  {
    id: "camp-feat-02",
    title: "OBJECTS OF OBSIDIAN & GOLD",
    client: "Aurenne Haute Joaillerie",
    year: "2026",
    category: "Product Campaigns",
    categoryFilter: "Product Campaigns",
    tagline: "Sculptural 18K High Jewellery Emerging from Shadow",
    description: "Editorial luxury campaign showcasing rare Colombian emeralds and fluid gold cuffs. Shot with microscopic focal depths and volumetric ray-traced caustics to convey tactile prestige.",
    deliverables: ["Print & Digital Campaign", "Virtual Model Lookbook", "Interactive Web Visuals", "Social Carousel Suite"],
    aspectRatio: "4:5",
    mediaType: "image",
    mediaUrl: "/images/projects/aurenne.jpg",
    thumbnailUrl: "/images/projects/aurenne.jpg",
    badge: "GLOBAL CAMPAIGN",
    isPlaceholder: true
  }
];

export const VISUAL_CAMPAIGNS = [
  // 1. VIDEO ADS & BRAND FILMS
  {
    id: "vc-01",
    title: "Aurelis GT: The Electric Genesis",
    client: "Aurelis Automotive",
    year: "2026",
    category: "Brand Films",
    categoryFilter: "Brand Films",
    tagline: "High-octane aerodynamic film tracking zero-emission performance.",
    description: "A fast-paced commercial celebrating pure mechanical poise and high-speed telemetry through atmospheric mist.",
    aspectRatio: "16:9",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnailUrl: "/images/projects/auto-mobile.jpg",
    duration: "0:45",
    deliverables: ["4K Master", "Social Cuts 9:16", "Sound Design"],
    isPlaceholder: true
  },
  {
    id: "vc-02",
    title: "L'Heure Dorée // Paloma Summer Rooftop",
    client: "Paloma Social House",
    year: "2026",
    category: "Video Ads",
    categoryFilter: "Video Ads",
    tagline: "Golden hour aperitivo and Mediterranean wood-fired dining.",
    description: "Atmospheric, tactile 9:16 vertical video ad capturing the shift from sunset spritzes to late-night vinyl music.",
    aspectRatio: "9:16",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnailUrl: "/images/projects/paloma-house.jpg",
    duration: "0:30",
    deliverables: ["Paid TikTok/Reels Campaign", "Story Ads", "Soundtrack"],
    isPlaceholder: true
  },
  {
    id: "vc-03",
    title: "Noise Dept: Controlled Disorder Anthem",
    client: "Noise Dept. Studio",
    year: "2026",
    category: "Social Media Ads",
    categoryFilter: "Social Media Ads",
    tagline: "Raw editorial brutalism and kinetic typography in motion.",
    description: "A punchy promotional trailer showcasing the studio's digital philosophy, engineered with rapid-fire cuts and glitch dynamics.",
    aspectRatio: "1:1",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    thumbnailUrl: "/images/projects/noise-dept.jpg",
    duration: "0:25",
    deliverables: ["Meta Feed Ads", "Square Promo", "Display Assets"],
    isPlaceholder: true
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

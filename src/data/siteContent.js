// Cornerstone - Brand & Content Data Source
// Clean separation of content from presentation

export const BRAND = {
  name: "CORNERSTONE",
  tagline: "BUILD WHAT'S NEXT.",
  descriptor: "AI AUTOMATION • WEBSITES • CREATIVE PRODUCTION",
  corePositioning: "Cornerstone provides AI automation, websites and creative production that help modern businesses attract, convert and serve customers.",
  supportingStatement: "Intelligent systems, modern web platforms and commercial creative engineered for businesses ready to scale.",
  concept: "A cornerstone is the foundational element that supports everything built on top of it. Build the right foundation. Everything else becomes possible.",
  email: "cornerstonesocialpresence@gmail.com",
  copyrightYear: 2026,
  location: "Global Studio / Remote Architecture",
};

export const SOCIAL_LINKS = {
  email: "cornerstonesocialpresence@gmail.com",
  linkedin: "https://www.linkedin.com/in/cornerstone-agency-182293446?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/the.cornerstoneee/"
};

export const CAPABILITIES = [
  {
    id: "01",
    code: "AI_AUTOMATION",
    title: "AI AUTOMATION",
    categoryLabel: "SERVICE 01",
    subtitle: "Make your business respond instantly 24/7.",
    description: "Intelligent receptionists, voice assistants, and WhatsApp automation that capture enquiries and book appointments without human delay.",
    targetAudience: "Salons, clinics, restaurants, real estate and service businesses.",
    subServices: [
      {
        name: "AI Receptionist & Voice Assistant",
        description: "Answer incoming calls, handle FAQs, capture enquiries, book appointments and route calls.",
        image: "/images/services/service-ai-receptionist.jpg"
      },
      {
        name: "WhatsApp Automation",
        description: "Automated replies, lead collection, booking updates and order enquiries.",
        image: "/images/services/service-whatsapp-automation.jpg"
      }
    ],
    services: [
      "AI Receptionist & Voice Assistant",
      "WhatsApp Automation",
      "24/7 Call Answering & FAQs",
      "Enquiry Capture & Routing",
      "Automated Appointment Booking"
    ],
    image: "/images/services/service-ai-receptionist.jpg",
    secondaryImage: "/images/services/service-whatsapp-automation.jpg",
    accent: "Automated call answering, inquiry capture, and calendar sync.",
    metrics: "24/7 Availability • Automated Inquiry Routing"
  },
  {
    id: "02",
    code: "WEBSITES",
    title: "WEBSITES",
    categoryLabel: "SERVICE 02",
    subtitle: "Make your business look the part and convert.",
    description: "Professional business websites and high-converting landing pages built with seamless enquiry forms and booking integrations.",
    targetAudience: "New businesses and companies with outdated websites.",
    subServices: [
      {
        name: "Business Websites",
        description: "Professional websites with enquiry forms and booking integrations.",
        image: "/images/services/service-business-websites.jpg"
      },
      {
        name: "Landing Pages",
        description: "Focused pages for specific products, services and campaigns.",
        image: "/images/services/service-landing-pages.jpg"
      }
    ],
    services: [
      "Business Websites",
      "Landing Pages",
      "Enquiry Forms & Workflows",
      "Booking Integrations",
      "Website Redesign & Upgrades"
    ],
    image: "/images/services/service-business-websites.jpg",
    secondaryImage: "/images/services/service-landing-pages.jpg",
    accent: "Fast page performance, editorial typography, and seamless inquiry and booking flows.",
    metrics: "High Performance • Optimized for Conversion"
  },
  {
    id: "03",
    code: "CREATIVE_PRODUCTION",
    title: "CREATIVE PRODUCTION",
    categoryLabel: "SERVICE 03",
    subtitle: "Make people stop, pay attention, and take action.",
    description: "Commercial-grade AI product & model photography, scripted UGC-style video ads, and coordinated ad creative designs sized for every platform.",
    targetAudience: "Jewellery, fashion, beauty and ecommerce brands, and businesses running digital ads.",
    subServices: [
      {
        name: "AI Product & Model Photography",
        description: "Product visuals, virtual model shoots, jewellery and fashion campaigns, and lifestyle imagery.",
        image: "/images/services/service-ai-photography.jpg"
      },
      {
        name: "AI UGC-Style Video Ads",
        description: "Scripted product demos, AI spokesperson videos and short promotional videos.",
        image: "/images/services/service-ugc-video-ads.jpg"
      },
      {
        name: "Ad Creative Design",
        description: "Static ads, carousels, campaign concepts and versions sized for different placements.",
        image: "/images/services/service-ad-creative-design.jpg"
      }
    ],
    services: [
      "AI Product & Model Photography",
      "AI UGC-Style Video Ads",
      "Ad Creative Design",
      "Virtual Model Shoots & Fashion",
      "Static Ads & Multi-Size Carousels"
    ],
    image: "/images/services/service-ai-photography.jpg",
    secondaryImage: "/images/services/service-ugc-video-ads.jpg",
    tertiaryImage: "/images/services/service-ad-creative-design.jpg",
    accent: "Cinematic commercial lighting, scripted AI spokespersons, high-conversion visual hooks.",
    metrics: "Multi-Format • Production Velocity"
  }
];

export const JOURNEY_STAGES = [
  {
    step: "01",
    name: "ATTRACT",
    headline: "Creative Production & Visual Hook",
    description: "AI product photography, UGC-style video ads, and static campaign creatives stop the scroll across digital platforms.",
    channel: "Paid Social / Meta / Search / Video",
    systemRole: "Top-of-funnel precision acquisition"
  },
  {
    step: "02",
    name: "ENGAGE",
    headline: "Business Website & Landing Page",
    description: "Prospects land on an ultra-fast, editorial web presence with clear positioning, enquiry forms, and booking integrations.",
    channel: "Flagship Web Platform",
    systemRole: "Immediate positioning & clarity"
  },
  {
    step: "03",
    name: "RESPOND",
    headline: "WhatsApp Automation Instant Reply",
    description: "Automated replies, lead collection, booking updates and order enquiries trigger the second interest is signaled.",
    channel: "Conversational Gateway",
    systemRole: "Immediate touchpoint verification"
  },
  {
    step: "04",
    name: "HANDLE",
    headline: "AI Receptionist & Voice Assistant",
    description: "Context-aware voice agents answer incoming calls, handle FAQs, capture enquiries, book appointments and route calls.",
    channel: "AI Voice / Telephony",
    systemRole: "24/7 call dispatch & resolution"
  },
  {
    step: "05",
    name: "CONVERT",
    headline: "Direct Booking & CRM Insertion",
    description: "Qualified appointments and customer orders are synced directly into team calendars, CRM pipelines, and operations.",
    channel: "Automated Booking Engine",
    systemRole: "High-intent transaction handoff"
  },
  {
    step: "06",
    name: "GROW",
    headline: "End-to-End Operational Telemetry",
    description: "Continuous automated updates, client communication flows, and performance data refine the entire business engine.",
    channel: "Growth Telemetry Stack",
    systemRole: "Predictable revenue architecture"
  }
];

export const FEATURED_PROJECTS = [
  {
    id: "proj-01",
    number: "01",
    title: "AI Receptionist & Voice Assistant",
    category: "AI AUTOMATION",
    industry: "Salons, Clinics & Service Businesses",
    badge: "PRODUCTION SYSTEM",
    image: "/images/services/service-ai-receptionist.jpg",
    shortDescription: "Autonomous voice assistant answering incoming calls, resolving FAQs, capturing enquiries, booking appointments and routing calls 24/7.",
    overview: "Service businesses, specialized clinics, and salons lose upwards of 35% of prospective clients due to missed calls after hours and busy front desks. This system implements a low-latency AI voice receptionist that communicates naturally, books appointments directly into calendars, and routes urgent calls instantly.",
    challenge: "High call volume during peak hours led to long ring times, missed enquiries, and zero inbound call coverage during evenings and weekends.",
    system: "Conversational voice assistant, automated FAQ resolution, caller inquiry capture, and direct calendar appointment booking.",
    deliverables: [
      "AI Voice Receptionist Trained on Business FAQs",
      "Automated Appointment Booking & Calendar Sync",
      "Intelligent Enquiry Capture & Call Routing",
      "SMS Booking Confirmation & Reminder Pipeline"
    ],
    status: "AUTOMATION WORKFLOW / READY FOR DEPLOYMENT",
    metricsHighlight: "24/7 Call Answering • Direct Booking",
    accentColor: "#B8FF3D"
  },
  {
    id: "proj-02",
    number: "02",
    title: "WhatsApp Automation System",
    category: "AI AUTOMATION",
    industry: "Restaurants, Real Estate & Ecommerce",
    badge: "AUTOMATION ENGINE",
    image: "/images/services/service-whatsapp-automation.jpg",
    shortDescription: "Automated replies, lead collection, booking updates and order enquiries operating in real time on WhatsApp.",
    overview: "Modern customers expect instant answers on WhatsApp. This system connects directly to the business messaging workflow to provide automated instant replies, capture lead contact information, confirm reservations, and resolve customer order enquiries.",
    challenge: "Delays in replying to customer messaging caused lost bookings and abandoned enquiries during high-demand periods.",
    system: "Official WhatsApp Cloud API backend, automated enquiry routing, lead collection logic, and automated booking updates.",
    deliverables: [
      "WhatsApp Business Automation Infrastructure",
      "Automated Customer Reply & FAQ Workflows",
      "Frictionless Lead Collection & Qualification",
      "Real-time Booking Updates & Order Tracking"
    ],
    status: "PRODUCTION ENGINE / VERIFIED",
    metricsHighlight: "Instant Replies • 100% Lead Capture",
    accentColor: "#F4F3EF"
  },
  {
    id: "proj-03",
    number: "03",
    title: "Business Websites & Landing Pages",
    category: "WEBSITES",
    industry: "New Businesses & Enterprise Modernization",
    badge: "DIGITAL PRESENCE",
    image: "/images/services/service-business-websites.jpg",
    shortDescription: "Professional business websites with enquiry forms and booking integrations, plus high-converting campaign landing pages.",
    overview: "Outdated websites fail to convey market authority and leak prospective customers through slow loading and broken enquiry flows. We engineer bespoke business websites and focused landing pages with integrated booking and sub-second load times.",
    challenge: "Outdated legacy templates took 5+ seconds to load, failed on mobile, and had no automated booking or enquiry integrations.",
    system: "Modern React/Vite architecture, responsive mobile-first typography, frictionless enquiry forms, and integrated calendar booking widgets.",
    deliverables: [
      "Custom Business Website Architecture & Redesign",
      "High-Converting Campaign Landing Pages",
      "Integrated Enquiry Forms & Calendar Schedulers",
      "Sub-Second Performance & SEO Optimization"
    ],
    status: "WEB PLATFORM / READY FOR DEPLOYMENT",
    metricsHighlight: "Mobile-Optimized • Integrated Booking",
    accentColor: "#B8FF3D"
  },
  {
    id: "proj-04",
    number: "04",
    title: "AI Creative Production Suite",
    category: "CREATIVE PRODUCTION",
    industry: "Jewellery, Fashion, Beauty & Ecommerce",
    badge: "CREATIVE ENGINE",
    image: "/images/services/service-ai-photography.jpg",
    shortDescription: "AI product & model photography, scripted UGC-style video ads, and static ad creative design across multiple aspect ratios.",
    overview: "Ecommerce and consumer brands need hundreds of fresh visual assets to scale digital advertising without massive production studio overhead. This creative suite delivers virtual model shoots, scripted AI spokesperson videos, and coordinated multi-placement ad creative.",
    challenge: "Traditional commercial photo and video shoots required massive budgets and 6-week production timelines for assets that fatigued within days.",
    system: "Generative AI photo pipeline calibrated to brand aesthetics, scripted video ads with natural AI spokespersons, and multi-ratio ad creative suites.",
    deliverables: [
      "AI Product & Virtual Model Photography",
      "Scripted AI UGC-Style Video Ads (9:16 Vertical)",
      "Coordinated Ad Creative Design & Carousels",
      "Multi-Placement Campaign Asset Packages"
    ],
    status: "CREATIVE PIPELINE / PRODUCTION READY",
    metricsHighlight: "10x Asset Velocity • Multi-Format Suite",
    accentColor: "#F4F3EF"
  }
];

export const SYSTEM_NODES = [
  { id: "creative", step: "01", name: "CREATIVE PRODUCTION", subtitle: "Scroll-stopping attention", detail: "AI product photography, UGC video ads, static campaign designs" },
  { id: "website", step: "02", name: "BUSINESS WEBSITES", subtitle: "Authoritative digital anchor", detail: "Fast editorial design, clear positioning, campaign landing pages" },
  { id: "lead", step: "03", name: "ENQUIRY CAPTURE", subtitle: "Frictionless touchpoint", detail: "Integrated enquiry forms, appointment booking links" },
  { id: "whatsapp", step: "04", name: "WHATSAPP AUTOMATION", subtitle: "Instant communication", detail: "Automated replies, lead collection, booking updates" },
  { id: "ai_reception", step: "05", name: "AI RECEPTIONIST", subtitle: "24/7 voice assistant", detail: "Answer incoming calls, handle FAQs, book appointments, route calls" },
  { id: "qualification", step: "06", name: "LEAD QUALIFICATION", subtitle: "Automated triage", detail: "Customer requirement, service interest, scope verification" },
  { id: "booking", step: "07", name: "BOOKING INTEGRATION", subtitle: "Calendar synchronization", detail: "Direct scheduling into team operations and CRM" },
  { id: "followup", step: "08", name: "CLOSED-LOOP NURTURE", subtitle: "Customer continuity", detail: "Order enquiries, automated follow-ups, retention flows" }
];

export const APPROACH_STAGES = [
  {
    number: "01",
    title: "SCOPING & ALIGNMENT",
    subtitle: "Direct alignment on goals and constraints.",
    description: "We work directly with your team to clarify operational requirements, technical constraints, and priorities before establishing the project roadmap and deliverables.",
    deliverable: "Agreed Scope & Project Specification"
  },
  {
    number: "02",
    title: "PROTOTYPING & REVIEW",
    subtitle: "Interactive previews and structured feedback.",
    description: "We share interactive design prototypes and conversational logic flows early, ensuring visual identity, copy, and customer journeys match your standards before full buildout.",
    deliverable: "Interactive Prototypes & Flow Walkthroughs"
  },
  {
    number: "03",
    title: "INTEGRATION & TESTING",
    subtitle: "End-to-end quality and device verification.",
    description: "Websites, voice agents, and automation workflows undergo rigorous testing across mobile and desktop environments, network conditions, and simulated user scenarios.",
    deliverable: "Staging Preview & Verification Sign-Off"
  },
  {
    number: "04",
    title: "DEPLOYMENT & HANDOFF",
    subtitle: "Seamless launch and operational independence.",
    description: "We manage production domain deployment, hand over system documentation and access credentials, and review workflows with your team for effortless ongoing management.",
    deliverable: "Live Deployment & Operational Handover"
  }
];

export const PHILOSOPHY = [
  {
    statement: "Simplicity over unnecessary complexity.",
    elaboration: "Systems should save time, not create overhead. We build straightforward, reliable tools that handle customer communication and inquiries without bloated software stacks."
  },
  {
    statement: "Design builds trust and credibility.",
    elaboration: "A thoughtful digital presence establishes immediate authority. Fast loading, clear typography, and intuitive navigation give prospects confidence from the first click."
  },
  {
    statement: "Responsiveness captures opportunities.",
    elaboration: "Potential clients rarely wait for delayed follow-ups. Automated messaging and AI voice reception ensure questions are answered and appointments are booked when interest is highest."
  },
  {
    statement: "Creative content must drive action.",
    elaboration: "Visual assets should do more than look polished—they must communicate product value clearly and generate measurable engagement across digital channels."
  }
];

export const CONTACT_BUDGETS = [
  "Under $3,000",
  "$3,000 — $7,500",
  "$7,500 — $15,000",
  "$15,000 — $30,000",
  "$30,000+"
];

export const CONTACT_TIMELINES = [
  "Immediate (Within 2 weeks)",
  "Next 30–60 Days",
  "Quarterly Planning",
  "Exploring Options"
];

export const CONTACT_SERVICES = [
  "AI Receptionist & Voice Assistant",
  "WhatsApp Automation",
  "Business Websites",
  "Landing Pages",
  "AI Product & Model Photography",
  "AI UGC-Style Video Ads",
  "Ad Creative Design",
  "General Enquiry"
];

// 7 Flagship Live Website Projects deployed on Vercel (Reordered)
export const LIVE_WEBSITE_PROJECTS = [
  {
    id: "live-noise-dept",
    number: "01",
    title: "Noise Dept.",
    brand: "Noise Dept.",
    tagline: "Independent Digital Studio // Controlled Disorder",
    category: "CREATIVE STUDIO",
    categoryFilter: "CREATIVE STUDIOS",
    industry: "Independent Design, Creative Technology & Development",
    liveUrl: "https://noise-dept-six.vercel.app/",
    domain: "noise-dept-six.vercel.app",
    image: "/images/projects/noise-dept.jpg",
    accentColor: "#EC3D31", // Kinetic Signal Red
    badge: "INTERACTIVE DEMO",
    status: "ONLINE // DEMO",
    shortDescription: "An unapologetically bold, experimental digital studio platform building high-impact digital systems for brands that refuse to blend in.",
    overview: "Noise Dept champions controlled disorder—rejecting sterile corporate conventions in favor of raw editorial brutalism, kinetic typography, and tactile digital artifacts. Built for creative leaders and disruptor brands seeking cultural resonance.",
    challenge: "Breaking away from ubiquitous minimalist templates while preserving razor-sharp readability, accessibility, and high conversion for client inquiries.",
    system: "Variable-width Anybody and Space Mono typography, dynamic audio-visual feedback, glitch-resilient CSS grid compositions, and interactive case study exploration.",
    deliverables: [
      "Brutalist Kinetic Studio Design System",
      "Interactive Audio & Dynamic Micro-Interactions",
      "High-Conversion Client Pitch Project Ingestion",
      "Experimental Monospace Brand Grid System"
    ],
    techStack: ["React", "Anybody Variable Font", "Space Mono", "CSS Grid", "Vercel"],
    metricsHighlight: "0% Generic Templates • Maximum Cultural Impact",
    layoutSpan: "span-2"
  },
  {
    id: "live-spinform",
    number: "02",
    title: "Spinform™",
    brand: "Spinform Studio",
    tagline: "3D Identity + Motion Studio — Turn Flat Into Form",
    category: "3D & CREATIVE TOOLS",
    categoryFilter: "3D & WEB TECH",
    industry: "Browser-Based 3D Brand Extruder & Motion Application",
    liveUrl: "https://spinform-eight.vercel.app/",
    domain: "spinform-eight.vercel.app",
    image: "/images/projects/spinform.jpg",
    accentColor: "#3B82F6", // High-Tech Cobalt Blue
    badge: "INTERACTIVE DEMO",
    status: "ONLINE // WEBGL DEMO",
    shortDescription: "A browser-based 3D motion application enabling designers to extrude flat vector logos, icons, and wordmarks into tactile 3D objects, animated brand loops, and GLB exports.",
    overview: "Spinform transforms 2D brand assets into tangible, interactive 3D models directly in WebGL. Users can assign ceramic, chrome, clay, glass, and rubber materials, animate camera paths, and export transparent video loops or 3D embeds in real time.",
    challenge: "3D software like Blender and Cinema 4D has an immense learning curve; designers needed an immediate, browser-native tool for instant 3D brand asset production.",
    system: "Real-time Three.js SVG extrusion engine, custom PBR material shaders, browser-side canvas recording pipeline, and responsive multi-viewport layout.",
    deliverables: [
      "Real-time Browser SVG Vector Extrusion Engine",
      "5 PBR Material Shaders (Ceramic, Chrome, Clay, Glass, Rubber)",
      "Interactive Camera Orbit & Brand Loop Controller",
      "One-Click GLB & Transparent MP4 Export Pipeline"
    ],
    techStack: ["Three.js", "WebGL", "React 19", "Bricolage Grotesque", "Chivo Mono"],
    metricsHighlight: "Zero Install • Real-time WebGL PBR Engine",
    layoutSpan: "span-1"
  },
  {
    id: "live-paloma-house",
    number: "03",
    title: "Paloma Social House",
    brand: "Paloma Social House",
    tagline: "Lunch Turns Into Late — One Place. Four Moods. All Day.",
    category: "HOSPITALITY & DINING",
    categoryFilter: "HOSPITALITY & DINING",
    industry: "All-Day Restaurant, Cocktail Bar & Music-Led Social Club",
    liveUrl: "https://paloma-socail-house.vercel.app/",
    domain: "paloma-socail-house.vercel.app",
    image: "/images/projects/paloma-house.jpg",
    accentColor: "#D9492F", // Terracotta Red
    badge: "CONCEPT PROJECT",
    status: "ONLINE // RESTAURANT CONCEPT",
    shortDescription: "An energetic, multi-mood Mediterranean hospitality flagship spanning all-day wood-fired dining, golden-hour rooftop spritzes, and a late-night music-led social club.",
    overview: "Paloma Social House bridges morning espresso culture, golden-hour rooftop drinks, and late-night vinyl disco into one seamless digital destination. An interactive time-of-day selector dynamically transforms the aesthetic and menu offerings based on the venue's active mood.",
    challenge: "Hospitality websites often feel static and fail to communicate the shifting day-to-night ambiance of high-energy urban dining venues.",
    system: "Dynamic diurnal theme shifts, interactive 3D culinary hearth showcases, instant table reservation engine with party size filtering, and integrated live vinyl programming schedule.",
    deliverables: [
      "Diurnal Time-Shift Ambiance Engine",
      "Interactive Wood-Fired Menu & Cocktails Portal",
      "Seamless Direct Table Reservation Integration",
      "Rooftop DJ & Live Music Event Schedule"
    ],
    techStack: ["React", "Syne & Fraunces Type System", "Tailwind CSS", "Vercel"],
    metricsHighlight: "Instant Table Reservation • 4 Dynamic Moods",
    layoutSpan: "span-1"
  },
  {
    id: "live-vale-selvatico",
    number: "04",
    title: "Vale Selvatico",
    brand: "Vale Selvatico",
    tagline: "Mediterranean Botanical Estate & Small-Batch Apothecary",
    category: "LUXURY & BOTANICAL",
    categoryFilter: "LUXURY & E-COMMERCE",
    industry: "Artisanal Agriculture & Botanical Apothecary",
    liveUrl: "https://vale-selvatico.vercel.app/",
    domain: "vale-selvatico.vercel.app",
    image: "/images/projects/vale-selvatico.jpg",
    accentColor: "#C6923C", // Sunlit Sicilian Amber & Olive
    badge: "CONCEPT PROJECT",
    status: "ONLINE // APOTHECARY CONCEPT",
    shortDescription: "An editorial Mediterranean estate in Sicily cultivating bergamot, olives, and wild botanicals, transformed through patient craftsmanship into small-batch culinary oils and apothecary preserves.",
    overview: "Vale Selvatico is an editorial digital sanctuary conceived to reflect generations of patient cultivation beneath the Sicilian sun. The experience combines evocative land storytelling, seasonal solar harvest timelines, and a sensory e-commerce catalog featuring cold-pressed extra virgin oils and small-batch infusions.",
    challenge: "Artisanal heritage estates often struggle to convey tactile sensory authenticity online without falling into generic e-commerce templates that dilute brand prestige.",
    system: "Bespoke editorial typography engine utilizing Instrument Serif and Azeret Mono, earthy organic tonal grading, fluid parallax image treatments, and frictionless direct-to-consumer order workflows.",
    deliverables: [
      "Editorial Brand Identity & Typography System",
      "Seasonal Harvest Timeline & Archive Explorer",
      "Small-Batch Apothecary E-Commerce Storefront",
      "Mobile-Optimized Botanical Tasting Dossier"
    ],
    techStack: ["React 19", "Vite", "Instrument Serif", "Azeret Mono", "Vercel Edge"],
    metricsHighlight: "100% Organic Sourcing • Sub-500ms TTFB",
    layoutSpan: "span-2"
  },
  {
    id: "live-aurenne",
    number: "05",
    title: "Aurenne",
    brand: "Aurenne Maison de Joaillerie",
    tagline: "Objects of Light — Sculptural Fine Jewellery",
    category: "HAUTE JOAILLERIE",
    categoryFilter: "LUXURY & E-COMMERCE",
    industry: "Contemporary European Fine Jewellery & Rare Gemstones",
    liveUrl: "https://aurenne-six.vercel.app/",
    domain: "aurenne-six.vercel.app",
    image: "/images/projects/aurenne.jpg",
    accentColor: "#D4AF37", // Imperial Gold
    badge: "CONCEPT PROJECT",
    status: "ONLINE // JEWELLERY CONCEPT",
    shortDescription: "A contemporary Parisian high-jewellery maison digital flagship showcasing sculptural 18k gold creations, rare Colombian emeralds, and limited-edition high jewellery emerging from architectural darkness.",
    overview: "Aurenne creates an immersive digital salon where fine jewellery is experienced as wearable sculpture. Emerging from obsidian darkness, 3D interactive gold rings and gemstone facets respond to user motion, accompanied by editorial exhibition essays and private salon appointment booking.",
    challenge: "Conveying the physical luster, depth, and prestige of high-end precious gemstones and polished metals in a browser environment.",
    system: "Hardware-accelerated Three.js WebGL lighting pipeline, tactile luxury cursor dynamics, Bodoni Moda and Italiana typography hierarchy, and private salon concierge scheduling.",
    deliverables: [
      "Interactive 3D WebGL Gemstone Lighting Engine",
      "Editorial Exhibition Chapters & Archive Essays",
      "Private Salon Consultation Booking Pipeline",
      "High-Net-Worth VIP Collector Experience"
    ],
    techStack: ["Three.js", "WebGL", "Framer Motion", "Bodoni Moda", "React 19"],
    metricsHighlight: "60FPS WebGL • Zero Commission VIP Gateway",
    layoutSpan: "span-1"
  },
  {
    id: "live-mosaic",
    number: "06",
    title: "Mosaic / State",
    brand: "Mosaic / State",
    tagline: "Interactive Systems & Digital Experiences — Structured Wonder",
    category: "INTERACTIVE SYSTEMS",
    categoryFilter: "CREATIVE STUDIOS",
    industry: "Digital Platforms, Spatial Exhibits & Data Visualization",
    liveUrl: "https://mosaic-state.vercel.app/",
    domain: "mosaic-state.vercel.app",
    image: "/images/projects/mosaic.jpg",
    accentColor: "#2454FF", // Electric Cobalt
    badge: "INTERACTIVE DEMO",
    status: "ONLINE // SYSTEMS DEMO",
    shortDescription: "An independent digital engineering and design practice turning complex data, stories, and organizational platforms into intuitive, structured experiences.",
    overview: "Mosaic / State operates at the intersection of technical architecture and visual clarity under the philosophy that 'Complex doesn't have to feel complicated.' The platform showcases interactive node networks, museum installations, and cartographic data visualization.",
    challenge: "Displaying multi-dimensional organizational data and complex technical concepts without overwhelming prospective enterprise clients.",
    system: "Architectural coordinate grid system, interactive node graph connecting concept points, precision typographic scales, and dynamic case study dossiers.",
    deliverables: [
      "Interactive Node Graph Visualization Engine",
      "Architectural Technical Dossier Architecture",
      "Spatial Exhibit & Digital Platform Showcase",
      "Modular Studio Capabilities Matrix"
    ],
    techStack: ["React", "Schibsted Grotesk", "Fragment Mono", "Canvas API", "Vercel"],
    metricsHighlight: "Complex Systems Simplified • Interactive Node Engine",
    layoutSpan: "span-1"
  },
  {
    id: "live-auto-mobile",
    number: "07",
    title: "Aurelis Motors",
    brand: "Aurelis Motor Company",
    tagline: "Engineered to be Remembered — Flagship Grand Tourer AML-09GT",
    category: "AUTOMOTIVE & TECH",
    categoryFilter: "AUTOMOTIVE",
    industry: "Luxury Automotive Showroom, Grand Tourers & Performance Vehicles",
    liveUrl: "https://auto-mobile-black.vercel.app/",
    domain: "auto-mobile-black.vercel.app",
    image: "/images/projects/auto-mobile.jpg",
    accentColor: "#60A5FA", // Aero Vector Metallic Blue
    badge: "CONCEPT DEMO",
    status: "ONLINE // SHOWROOM CONCEPT",
    shortDescription: "A high-performance digital automotive showroom and vehicle configurator engineered with tactile chassis telemetry, aerodynamic optics, and bespoke specification tools.",
    overview: "Aurelis Motors presents an automotive flagship combining visceral vehicle photography, aerodynamic simulation data, and a live 3D paint and interior specification customizer for modern grand tourers and electric hyper-vehicles.",
    challenge: "Automotive configurators often suffer from sluggish loading and fragmented multi-step flows that disengage luxury car buyers.",
    system: "Sub-second reactive vehicle spec customizer (Profile, Optics, Circuit, Cabin), telemetry metrics displays, DM Serif Display typography, and integrated VIP test-drive booking portal.",
    deliverables: [
      "Multi-Finish Real-time Vehicle Configurator",
      "Chassis Aerodynamics & Powertrain Telemetry HUD",
      "Bespoke Grand Tourer Specification Builder",
      "Direct VIP Test Drive Concierge Pipeline"
    ],
    techStack: ["React 19", "DM Serif Display", "Space Grotesk", "Tailwind CSS", "Vercel"],
    metricsHighlight: "420 HP AWD Vectoring • Real-time Configurator",
    layoutSpan: "span-2"
  }
];


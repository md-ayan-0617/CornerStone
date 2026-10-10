// Cornerstone - Brand & Content Data Source
// Clean separation of content from presentation

export const BRAND = {
  name: "CORNERSTONE",
  tagline: "BUILD WHAT'S NEXT.",
  descriptor: "DIGITAL SYSTEMS + CREATIVE",
  corePositioning: "Cornerstone builds AI-powered systems, digital experiences and creative that help businesses attract, convert and serve customers.",
  supportingStatement: "Technology, design and automation built around the way modern businesses actually work.",
  concept: "A cornerstone is the foundational element that supports everything built on top of it. Build the right foundation. Everything else becomes possible.",
  email: "hello@cornerstone.build",
  copyrightYear: 2026,
  location: "Global Studio / Remote Architecture",
};

export const CAPABILITIES = [
  {
    id: "01",
    code: "AI_AUTO",
    title: "AI + AUTOMATION",
    subtitle: "Make your business respond instantly.",
    description: "Intelligent agents, conversational workflows, and operational systems that operate 24/7 without fatigue.",
    services: [
      "AI Receptionists",
      "AI Voice Agents",
      "WhatsApp Automation",
      "Lead Qualification",
      "CRM & Workflow Integrations"
    ],
    accent: "Autonomous response pipelines, latency < 700ms, multi-channel synch.",
    metrics: "24/7 Availability • Zero Wait Time"
  },
  {
    id: "02",
    code: "DIGITAL",
    title: "DIGITAL",
    subtitle: "Make your business look the part.",
    description: "High-performance digital flagship websites, bespoke web applications, and conversion-focused editorial interfaces.",
    services: [
      "Websites & Flagship Platforms",
      "High-Conversion Landing Pages",
      "Digital Experiences",
      "Website Architecture & Redesign",
      "Conversion-focused Interfaces"
    ],
    accent: "Sub-second load times, editorial typography, architectural grids.",
    metrics: "99.9% Uptime • Sub-second LCP"
  },
  {
    id: "03",
    code: "CREATIVE",
    title: "CREATIVE",
    subtitle: "Make people stop and pay attention.",
    description: "Commercial-grade visual direction, brand identity systems, high-performing advertising assets, and AI-assisted production.",
    services: [
      "AI UGC & Synthetic Production",
      "Paid Acquisition Ad Creatives",
      "Graphic Design & Visual Systems",
      "Brand Identity & Art Direction",
      "Multi-format Campaign Assets"
    ],
    accent: "Cinematic commercial lighting, high-conversion visual hooks.",
    metrics: "Multi-Format • Production Velocity"
  },
  {
    id: "04",
    code: "GROWTH",
    title: "GROWTH",
    subtitle: "Make every touchpoint connect.",
    description: "The glue between initial interest and lifetime client value. Automated routing, qualification, calendars, and follow-ups.",
    services: [
      "Frictionless Lead Capture",
      "Algorithmic Lead Qualification",
      "Intelligent Follow-ups",
      "Automated Booking Pipelines",
      "Infrastructure & Data Telemetry"
    ],
    accent: "Zero dropped leads, instant calendar booking, CRM synchronization.",
    metrics: "Closed Loop • Zero Dropped Leads"
  }
];

export const JOURNEY_STAGES = [
  {
    step: "01",
    name: "ATTRACT",
    headline: "High-Performance Creative Hook",
    description: "Targeted creative systems stop the scroll across digital channels, driving qualified intent rather than empty impressions.",
    channel: "Paid Social / Meta / Search / Video",
    systemRole: "Top-of-funnel precision acquisition"
  },
  {
    step: "02",
    name: "ENGAGE",
    headline: "Architectural Digital Experience",
    description: "Prospects land on an ultra-fast, editorial web experience that establishes authority and eliminates cognitive friction.",
    channel: "Flagship Web Platform",
    systemRole: "Immediate positioning & clarity"
  },
  {
    step: "03",
    name: "RESPOND",
    headline: "Sub-Second Inbound Response",
    description: "Instant engagement via intelligent WhatsApp or web chat the moment interest is signaled. No waiting hours for a callback.",
    channel: "Conversational Gateway",
    systemRole: "Immediate touchpoint verification"
  },
  {
    step: "04",
    name: "QUALIFY",
    headline: "Autonomous Intent & Need Scoring",
    description: "AI conversational voice and chat agents assess project scope, budget, and urgency through natural dialogue.",
    channel: "AI Voice / Chat Logic",
    systemRole: "Frictionless discovery without human overhead"
  },
  {
    step: "05",
    name: "CONVERT",
    headline: "Direct Calendar & CRM Insertion",
    description: "Qualified opportunities are booked straight into your team's calendar with complete dossiers already synced to your CRM.",
    channel: "Automated Booking Engine",
    systemRole: "High-intent transaction handoff"
  },
  {
    step: "06",
    name: "GROW",
    headline: "End-to-End Operational Telemetry",
    description: "Continuous follow-ups, post-interaction feedback, and behavioral analytics refine the entire loop continuously.",
    channel: "Growth Telemetry Stack",
    systemRole: "Predictable revenue architecture"
  }
];

export const FEATURED_PROJECTS = [
  {
    id: "proj-01",
    number: "01",
    title: "AI Receptionist Architecture",
    category: "AI + AUTOMATION",
    industry: "Healthcare & Specialized Clinics",
    badge: "DEMONSTRATION",
    image: "/images/proj-ai-receptionist.jpg",
    shortDescription: "Autonomous voice & conversational routing system handling 24/7 patient triage, appointment rescheduling, and urgent doctor dispatch.",
    overview: "Specialized clinical practices lose over 35% of prospective consultations due to missed calls after hours or peak-hour desk queues. This system implements a low-latency voice AI pipeline that communicates with natural empathy, confirms insurance tiering, and schedules clinical bookings directly into EHR calendars.",
    challenge: "High call volume spikes during clinic opening hours caused 4-minute wait times and human reception burnout, with zero after-hours capture.",
    system: "Ultra-low-latency voice synthesis (<600ms latency), natural conversational turn-taking, HIPAA-compliant patient qualification, and two-way Google/EHR calendar synchronization.",
    deliverables: [
      "Custom Voice Agent Trained on Clinical Taxonomy",
      "Real-time Phone Gateway with Telephony Trunking",
      "Automated SMS Appointment Confirmation & Rescheduling",
      "Administrative Escalation Protocol for Emergency Keywords"
    ],
    status: "SYSTEM DEMONSTRATION / READY FOR DEPLOYMENT",
    metricsHighlight: "<600ms Response • 24/7 Triage Ready",
    accentColor: "#B8FF3D"
  },
  {
    id: "proj-02",
    number: "02",
    title: "WhatsApp Lead Qualification Engine",
    category: "AI + AUTOMATION",
    industry: "Executive Education & Higher Learning",
    badge: "CONCEPT PROJECT",
    image: "/images/proj-whatsapp-lead.jpg",
    shortDescription: "Multi-branch conversational WhatsApp engine qualifying candidates, delivering syllabus modules, and scheduling admissions interviews.",
    overview: "Modern executive candidates ignore cold email funnels. This system creates a frictionless messaging environment where prospective students receive personalized curriculum guides, assess prerequisite fit in 3 questions, and secure interview slots with academic advisors.",
    challenge: "Admissions teams struggled with 48-hour email response lags and unqualified applicants booking high-value advisor time.",
    system: "Official WhatsApp Cloud API backend, dynamic PDF prospectus generation, conversational branch routing, and HubSpot CRM bi-directional sync.",
    deliverables: [
      "WhatsApp Cloud Business API Infrastructure",
      "Dynamic Candidate Scoring & Intent Tagging",
      "Self-Serve Syllabus & Fee Structure Delivery",
      "Direct Advisor Calendar Booking Gateway"
    ],
    status: "CONCEPT SYSTEM / BENCHMARK ARCHITECTURE",
    metricsHighlight: "Instant Delivery • Multi-Language Support",
    accentColor: "#F4F3EF"
  },
  {
    id: "proj-03",
    number: "03",
    title: "Editorial Hospitality Digital Flagship",
    category: "DIGITAL",
    industry: "Boutique Hospitality & Private Residences",
    badge: "DEMONSTRATION",
    image: "/images/proj-hospitality-flagship.jpg",
    shortDescription: "Cinematic, sub-second editorial digital presence combining architectural typography with direct booking and concierge chat.",
    overview: "Luxury properties frequently suffer from slow, template-heavy third-party booking engines that strip away prestige. We engineered a bespoke digital flagship with smooth architectural motion, spatial room exploration, and direct reservation flow.",
    challenge: "Third-party booking portals took 18% commission and diluted the property's bespoke brand identity with clunky widget overlays.",
    system: "Headless React/Next.js frontend, micro-interactions, responsive high-resolution asset loading, and custom-styled Stripe/Opera booking gateway.",
    deliverables: [
      "Bespoke Digital Design System & Typography Engine",
      "Interactive 360 Spatial Suite Explorer",
      "Direct Zero-Commission Booking Checkout Flow",
      "Multilingual VIP Concierge Digital Dossier"
    ],
    status: "SELECTED DEMONSTRATION / PRODUCTION READY",
    metricsHighlight: "99+ Mobile Performance • Direct Checkout",
    accentColor: "#B8FF3D"
  },
  {
    id: "proj-04",
    number: "04",
    title: "Modular Brand Creative Pipeline",
    category: "CREATIVE",
    industry: "Direct-to-Consumer & Modern Lifestyle",
    badge: "SYSTEM EXPLORATION",
    image: "/images/proj-creative-pipeline.jpg",
    shortDescription: "High-velocity AI UGC and ad creative engine producing variations across aspect ratios, visual hooks, and campaign messaging.",
    overview: "Paid acquisition on modern platforms requires dozens of fresh creative iterations weekly to combat ad fatigue. This modular creative pipeline combines brand guardrails with automated asset generation, yielding campaign-ready creative at 10x standard studio velocity.",
    challenge: "Traditional photo and video shoots required 6-week lead times and massive budgets for assets that fatigue in 10 days.",
    system: "Generative image and motion pipeline calibrated to precise brand guidelines, dynamic typography templates, and automated format rendering (9:16, 1:1, 16:9).",
    deliverables: [
      "Comprehensive Dynamic Art Direction Guidelines",
      "Automated Multi-Hook Video & Static Ad Variations",
      "Localized Copy & Subtitle Sync System",
      "Continuous Creative Performance Review Dashboard"
    ],
    status: "SYSTEM EXPLORATION / READY FOR SCALE",
    metricsHighlight: "10x Production Speed • Unified Brand Standards",
    accentColor: "#F4F3EF"
  }
];

export const SYSTEM_NODES = [
  { id: "creative", step: "01", name: "CREATIVE", subtitle: "Scroll-stopping attention", detail: "Campaign hooks, AI UGC, visual systems" },
  { id: "website", step: "02", name: "WEBSITE", subtitle: "Architectural anchor", detail: "Fast editorial design, clear positioning" },
  { id: "lead", step: "03", name: "LEAD CAPTURE", subtitle: "Frictionless touchpoint", detail: "Zero-latency forms, intent capture" },
  { id: "whatsapp", step: "04", name: "WHATSAPP", subtitle: "Instant communication", detail: "Direct conversational channel" },
  { id: "ai_reception", step: "05", name: "AI RECEPTIONIST", subtitle: "24/7 intelligent agent", detail: "Voice & chat triage, contextual answers" },
  { id: "qualification", step: "06", name: "QUALIFICATION", subtitle: "Automated scoring", detail: "Budget, timeline, scope verification" },
  { id: "booking", step: "07", name: "BOOKING", subtitle: "Calendar synchronization", detail: "Direct scheduling into team workflow" },
  { id: "followup", step: "08", name: "FOLLOW-UP", subtitle: "Closed-loop nurture", detail: "Automated sequences, CRM data sync" }
];

export const APPROACH_STAGES = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Mapping the operational architecture.",
    description: "We analyze how your business currently captures, communicates with, and serves customers. We identify friction, dropped leads, and missed opportunities in your existing workflow.",
    deliverable: "Systems Audit & Opportunity Matrix"
  },
  {
    number: "02",
    title: "DESIGN",
    subtitle: "Architectural blueprints & creative direction.",
    description: "We formulate the complete digital and automated foundation: typography, interface aesthetics, conversational trees, AI prompt engineering, and database integrations.",
    deliverable: "Interactive Prototypes & System Schematics"
  },
  {
    number: "03",
    title: "BUILD",
    subtitle: "Precision engineering & AI integration.",
    description: "We build the web experience, deploy the conversational agents, configure APIs, and stress-test the voice pipelines with extreme attention to latency and edge cases.",
    deliverable: "Tested Production-Ready Systems"
  },
  {
    number: "04",
    title: "CONNECT",
    subtitle: "Unified telemetry & operational launch.",
    description: "We connect the pieces into one living, synchronized ecosystem. Your creative feeds your site; your site routes to AI; your AI qualifies and books directly into your team's workflow.",
    deliverable: "Live Launch & Continuous Telemetry"
  }
];

export const PHILOSOPHY = [
  { statement: "Good technology should simplify.", elaboration: "Complexity is easy. Distilling operational power into an invisible, effortless experience is true craftsmanship." },
  { statement: "Good design should clarify.", elaboration: "Visual noise obscures value. We use architectural alignment, generous negative space, and disciplined typography to make positioning obvious." },
  { statement: "Good automation should remove friction.", elaboration: "Automation should never feel robotic or cold. It should deliver instantaneous, respectful service at the exact second a client needs it." },
  { statement: "Good creative should earn attention.", elaboration: "In a noisy landscape, only authentic visual hooks and cinematic standards command respect and inspire action." }
];

export const CONTACT_BUDGETS = [
  "Under $5,000",
  "$5,000 — $15,000",
  "$15,000 — $35,000",
  "$35,000 — $75,000",
  "$75,000+"
];

export const CONTACT_TIMELINES = [
  "Immediate (Within 2 weeks)",
  "Next 30–60 Days",
  "Quarterly Planning",
  "Exploring Architectural Options"
];

export const CONTACT_SERVICES = [
  "AI Voice & Receptionist",
  "WhatsApp Automation System",
  "Flagship Website / Web App",
  "High-Conversion Landing Page",
  "Creative & AI Ad Production",
  "End-to-End Growth Architecture"
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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
    badge: "LIVE PRODUCTION",
    status: "ONLINE // VERIFIED",
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


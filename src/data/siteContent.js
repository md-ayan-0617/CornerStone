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

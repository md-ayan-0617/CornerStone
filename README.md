# CORNERSTONE

> **"Build the right foundation. Everything else becomes possible."**

Cornerstone is a digital architecture studio and agency building AI-powered systems, digital experiences, and creative infrastructure that help modern businesses attract, convert, and serve customers.

---

## Visual & Design Philosophy

- **Visual Direction:** Dark Editorial Technology + Premium Creative Studio + Architectural Precision
- **Core Palette:**
  - Near Black: `#0A0A0A`
  - Charcoal: `#141414` / `#1A1A1A`
  - Warm Off-White: `#F4F3EF`
  - Muted Gray: `#9B9A96`
  - Border Gray: `#292929`
  - Accent Lime: `#B8FF3D` (strictly restrained for indicators and active states)
- **Typography:** Modern neo-grotesk system (`Inter Tight`, `Geist`, and `Geist Mono` for telemetry).
- **100% Responsive Architecture:** Fluid clamp-based scaling with zero horizontal overflow across 320px mobile to 4K displays.

---

## Core Capabilities & Pages

1. **HOME (`/`)**
   - Cinematic 100svh Hero with generative architectural canvas and real-time telemetry
   - Editorial Statement: *"TECHNOLOGY SHOULD MAKE BUSINESS SIMPLER."*
   - Interactive Capability Matrix (AI + Automation, Digital, Creative, Growth)
   - Horizontal Service Experience with mobile-adaptive stack
   - Signature Scroll Journey simulator (*Attract → Engage → Respond → Qualify → Convert → Grow*)
   - Selected Work demonstrations with interactive 5-stage case study modal
   - Architectural Node Topology (*"WE DON'T JUST BUILD THE PIECES. WE CONNECT THEM."*)
   - Dark quiet Pre-Footer CTA

2. **SERVICES (`/services`)**
   - In-depth catalog across the 4 major disciplines with alternating editorial warm off-white contrast.

3. **WORK (`/work`)**
   - Filterable project archive (`ALL`, `AI + AUTOMATION`, `DIGITAL`, `CREATIVE`, `GROWTH`) with explicit status badges (`DEMONSTRATION`, `CONCEPT PROJECT`, `SYSTEM EXPLORATION`).

4. **ABOUT (`/about`)**
   - The 4 core beliefs and 4-stage architectural approach (`DISCOVER`, `DESIGN`, `BUILD`, `CONNECT`).

5. **CONTACT (`/contact`)**
   - Interactive project planner with budget selector, timeline options, multi-select service chips, and real-time intake confirmation.

---

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Language:** JavaScript (JSX)
- **Styling:** Custom Vanilla CSS Design System with CSS variables and architectural grid tokens
- **Icons:** Lucide React
- **Motion:** GSAP & Lenis-ready smooth architecture

---

## Getting Started

### Prerequisites

Node.js v18+ and npm installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/md-ayan-0617/CornerStone.git

# Navigate to project directory
cd CornerStone

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Automated End-to-End Testing

```bash
npm run test:e2e
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Administration Console & Contact Management System

### 1. Admin Access Entry Point
- **Route:** `/admin/9827988375`
- Displays the **SYSTEM ACCESS** login screen when unauthenticated.
- Automatically grants access to the management console upon successful authentication.
- Ordinary visitors without credentials cannot view or access inquiry data.

### 2. Administrator Credentials & Setup
- Initial credentials can be seeded via environment variables in `.env`:
  ```bash
  ADMIN_USERNAME=admin
  ADMIN_INITIAL_PASSWORD=CornerStone@Admin2026
  ```
- Or set/updated directly via the CLI management script:
  ```bash
  npm run admin:create <username> <new_password>
  # Example:
  npm run admin:create admin MyStrongSecretPass!
  ```
- Administrators can also update their password directly inside the dashboard with current-password verification.

### 3. Database Architecture & Migrations
- **Production Database:** PostgreSQL (Neon, Supabase, AWS RDS, Render, etc.). Configured via `DATABASE_URL` in `.env`:
  ```bash
  DATABASE_URL=postgresql://user:password@ep-project.us-east-2.aws.neon.tech/neondb?sslmode=require
  ```
- **Local Zero-Config Fallback:** When `DATABASE_URL` is omitted locally, Cornerstone uses a persistent SQLite database in `.data/` using Node 24's built-in `node:sqlite` for seamless local testing.
- **Run Migrations:**
  ```bash
  npm run db:migrate
  ```

### 4. Vercel Deployment Configuration
1. Deploy the repository to Vercel.
2. In the Vercel Project Dashboard, navigate to **Settings → Environment Variables** and add:
   - `DATABASE_URL`: Your persistent PostgreSQL connection string (e.g. from Neon or Supabase).
   - `ADMIN_USERNAME`: Your admin username (e.g. `admin`).
   - `ADMIN_INITIAL_PASSWORD`: A secure initial password.
   - `SESSION_SECRET`: A 32+ character random string for session hardening.
3. Deploy! Vercel will build the frontend and serve all API endpoints via native serverless functions in `/api`.

---

## License

© 2026 CORNERSTONE. All rights reserved.


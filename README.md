# ACM NEXUS — NAVROHAN 2K26
### Premium ACM & ACM-W Chapter Web Platform + Intelligent Registration Portal

> **"Where Curiosity Becomes Creation."**  
> Designed, Engineered, and Architected by **Pradeepto Dixit**  
> Target Organization: **ABES ACM Student Chapter & ABES ACM-W Student Chapter**  
> Recruitment Context: **NAVROHAN 2K26 (Task 2 Web Development Assignment)**

---

## 1. Project Overview

**ACM NEXUS** is a web application created by **Pradeepto Dixit** for the NAVROHAN 2K26 recruitment assignment (Task 2: Build an ACM Home Page and Event Registration Page).

Rather than presenting an uninspired template, ACM NEXUS delivers an editorial-quality technology society platform inspired by advanced computing research labs, technical journals, and developer symposia. It bridges the student community with computing pathways, chapter activities, upcoming conclaves, and a verified event registration workflow backed by an Express ledger API.

---

## 2. Assignment Requirements Addressed

| Official Requirement | Implementation in ACM NEXUS | Status |
|---|---|---|
| **Mission & Vision** | Section 3: "Computing Is Better Together", 6 core pillars, draft disclaimer, dual ACM & ACM-W community context | **Completed** |
| **Activities & Opportunities** | Section 5: Activity ecosystem featuring technical workshops, hackathons, AI/ML SIGs, ACM-W circles, and CP arenas | **Completed** |
| **Team Members** | Section 8: Responsive governance roster with transparent, editable placeholder roles for chapter chairs, leads, and faculty sponsor | **Completed** |
| **Upcoming Events** | Section 6: Data-driven catalog with real-time category filtering, search, modal inspector, .ics calendar export, and interactive Constellation graph | **Completed** |
| **Event Registration Form** | Section 7: Intelligent registration with client/server validation, auto-population from event cards, atomic persistence, duplicate checks, and verified reference passes | **Completed** |
| **Creator Authorship** | Prominently featured across Hero, Navbar, Dedicated "Crafted with Purpose" section, Footer, and Metadata as **Pradeepto Dixit** | **Completed** |
| **Demo-Link Restrictions** | Strict audit conducted: Zero public-facing GitHub links, repository links, or live-demo buttons | **Verified** |

---

## 3. Key Architectural Features

### A. The Nexus Network (Interactive Signature Canvas)
An interactive orbital node-graph motif rendered via HTML5 Canvas that responds to cursor proximity with repulsion mechanics, dynamic connection thresholds, and reduced-motion fallbacks (`prefers-reduced-motion`).

### B. Dual-Mode Event Discovery (Grid & Constellation)
- **Card Grid View**: High-density cards with status indicators, logistics, takeaways, and one-click calendar invite (`.ics`) generation.
- **Constellation View**: An interactive orbital SVG network where events exist as celestial nodes. Clicking any node immediately previews the event and offers one-click registration.

### C. Six Specialized Learning Pathways
- **Build**: Software Engineering & Distributed Systems
- **Explore**: AI & Machine Learning Foundation Models
- **Solve**: Algorithmic & ICPC Problem Solving
- **Discover**: Research & Theoretical Computing
- **Create**: Creative Coding, WebGL Shaders & UI Design
- **Connect**: Community & ACM-W Diversity Leadership

### D. Intelligent Event Registration & Real Persistence
- Pre-selection sync: Clicking "Register" on any event automatically pre-selects the event in the portal.
- Full client-side validation for names, valid student emails, academic years, departments, and mandatory conduct consent.
- **Express API Backend (`server/index.js`)**:
  - Atomic JSON persistence in `data/registrations.json`.
  - Duplicate submission prevention per student email and event ID.
  - Unique reference pass generation (e.g., `NEXUS-2026-XXXX-XXXX`).
  - Privacy-preserving verification endpoint (`/api/verify/:ref`).
  - Graceful fallback to session demonstration mode if running standalone without backend.

### E. Quick Command Navigation Palette (⌘K / Ctrl+K)
Keyboard-accessible quick command menu enabling rapid jumping to events, pathways, registration, and chapter information.

---

## 4. Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite 6
- **Styling & Design System**: Tailwind CSS, Custom Midnight Navy (`#030712`, `#080E1E`) & Cyan Accent Palette (`#06B6D4`, `#22D3EE`)
- **Typography**: Space Grotesk (Headings & Display), Inter (Body & Microcopy), JetBrains Mono (Technical badges)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Backend & Ledger**: Node.js, Express, Atomic File-System Storage (`fs/promises`), Crypto
- **Compliance**: RFC-5545 iCalendar standard for event sync

---

## 5. Folder Structure

```
acm-nexus/
├── data/                       # Local persistent JSON ledger
│   └── registrations.json      # Atomic registration store
├── public/
│   └── favicon.svg             # Custom Nexus orbital brandmark
├── server/
│   ├── index.js                # Express API with rate limiting & validation
│   └── test.js                 # Automated backend test suite
├── src/
│   ├── components/
│   │   ├── about/              # Mission, EventJourney, CreatorSection
│   │   ├── activities/         # Community activities & cohorts
│   │   ├── events/             # EventsSection, Constellation, EventDetailModal
│   │   ├── hero/               # NexusHero, NexusCanvas (interactive physics)
│   │   ├── layout/             # Sticky Navbar, Footer
│   │   ├── pathways/           # 6 interactive learning tracks
│   │   ├── registration/       # Full registration portal & success state
│   │   ├── team/               # Chapter roles & governance directory
│   │   ├── ui/                 # QuickCommandModal (Ctrl+K)
│   │   └── faq/                # FAQ accordion & Community contact desk
│   ├── data/                   # Data-driven models (Events, FAQs, Teams, Pathways)
│   ├── types/                  # TypeScript interface definitions
│   ├── utils/                  # API client & iCalendar generator
│   ├── App.tsx                 # Root application composition
│   ├── index.css               # Tailwind directives & custom design tokens
│   └── main.tsx                # Application bootstrap
├── index.html                  # Accessible root document with author metadata
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 6. Local Setup and Execution

### Prerequisites
- Node.js (v18 or higher recommended, tested on Node v24)
- npm (v9 or higher)

### Installation
```bash
# Navigate to project directory
cd acm-nexus

# Install dependencies
npm install
```

### Development Mode
```bash
# Run the fullstack experience:
# Terminal 1: Run the API Server
node server/index.js

# Terminal 2: Run the Vite Frontend
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build & Launch
```bash
# Build the production bundle
npm run build

# Start the unified production server (serves frontend + API on port 3001)
npm start
```
Open your browser at `http://localhost:3001`.

---

## 7. Registration Data Flow & Persistence Status

1. **Submission**: User submits the registration form with student details and conduct acceptance.
2. **Client Validation**: Format verification for emails, length limits, and field completeness.
3. **API Dispatch**: `POST /api/register` sent with JSON payload.
4. **Server Validation**: Input sanitization, email regex validation, and checks against active event catalog.
5. **Duplicate Prevention**: If the student has already registered for that specific event, a `409 Conflict` status is returned with their existing reference number.
6. **Atomic Persistence**: Server writes to `data/registrations.json` atomically using temporary files and filesystem renames to prevent corruption.
7. **Confirmation**: A cryptographically random reference ID (`NEXUS-2026-XXXX-XXXX`) is returned and presented on an interactive pass with an `.ics` download link.
8. **Offline Resilience**: If the API server is unavailable, the frontend operates in a transparent client demonstration mode without throwing runtime errors.

---

## 8. Verification & Audit Results

- **TypeScript Compilation**: Passed with 0 errors (`tsc -b`).
- **Production Bundle**: Successfully compiled (`dist/` generated with minified JS/CSS and optimized assets).
- **Authorship Verification**: "Pradeepto Dixit" verified in Hero, Sticky Header, Creator Section ("Crafted with Purpose"), Footer, and HTML metadata.
- **Demo-Link Restrictions Audit**: Zero forbidden GitHub, repository, or live-demo buttons on the public website.
- **Backend Test**: `server/test.js` and live Express verification passed with successful health checks, registration writes, and reference validations.

---

## 9. Author & Creator

**Pradeepto Dixit**  
Creator, Designer & Lead Software Engineer  
*Submitted for NAVROHAN 2K26 Web Development Recruitment*

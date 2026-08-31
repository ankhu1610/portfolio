# Portfolio Product Specification
### Ankit Chaubey — ML Systems Research Portfolio
**Version 1.0 — Product & Design Spec (pre-code)**

Source of truth: resume (M.Tech Robotics & AI, IIT Guwahati; Fiserv Cybersecurity background; "LLM From Scratch in PyTorch"; "Stable Diffusion From Scratch in PyTorch"). This document treats the resume as seed content only — the system is built to outlive it.

---

## Table of Contents

1. Portfolio Strategy
2. Information Architecture
3. UX Wireframes
4. Design System
5. Component Library
6. Content Architecture
7. Dynamic Update Workflow
8. Technical Stack
9. Project Case Study Template
10. Implementation Roadmap

---

## Phase 1 — Portfolio Strategy

### 1.1 Target Audience (ranked by priority)

| Rank | Audience | What they're scanning for |
|---|---|---|
| 1 | ML/AI research recruiters & hiring managers (research labs, applied AI teams) | Evidence of first-principles understanding, not framework glue code |
| 2 | Engineering managers at systems-heavy companies | Can this person own ambiguous, infra-shaped problems? |
| 3 | Potential research collaborators / OSS peers | Is the work reproducible, documented, technically honest? |
| 4 | Cybersecurity-adjacent recruiters (secondary path) | Does the identity/security background still register as real experience, not padding? |

The cybersecurity experience is real and credible (SailPoint, IAM, DoS mitigation) but it is **not** the headline — it's supporting evidence of production discipline (compliance, access control, operational rigor) that most ML-from-scratch portfolios lack. It should read as "this person has shipped in regulated enterprise environments," not as a separate career track competing for attention.

### 1.2 Recruiter Journey

**30 seconds (scanning, mobile or desktop, no scroll depth commitment)**
- Hero states the positioning claim in one line + one supporting line
- Two flagship projects visible without scrolling past the fold on desktop; one tap-swipe away on mobile
- A single credibility strip: IIT Guwahati M.Tech · Fiserv Cybersecurity · 2 systems built from scratch

**2 minutes (one project, skimmed)**
- Opens the LLM-from-scratch case study
- Reads: Problem → Architecture diagram → 3 engineering challenges → 1 benchmark chart
- Does **not** read prose paragraphs top to bottom — the page must be skimmable via headers, diagrams, and pull-quotes (metric cards)

**10 minutes (deep technical read, likely a technical interviewer prepping)**
- Reads full case study including implementation decisions (why RoPE over learned positional embeddings, why RMSNorm, KV-cache tradeoffs)
- Opens the Lab section to check benchmarks / experiment logs
- Checks GitHub link to verify code matches claims

### 1.3 Research Lab Identity

The site should function like a **standing lab notebook**, not a single static resume-in-web-form. This means:
- Projects have `status` (active / paused / archived / shipped) — nothing is faked as "done"
- There's a `Lab` section separate from `Projects` for smaller experiments, benchmark runs, and notes that don't warrant a full case study
- Dates are shown honestly (e.g. "May 2026 – Present") rather than obscured

### 1.4 Personal Brand Positioning

**One-line positioning statement (for hero + meta description):**
> Building ML systems from first principles — transformers, diffusion models, and the infrastructure underneath them.

**Secondary line (credibility anchor):**
> M.Tech, Robotics & AI @ IIT Guwahati. Previously: cybersecurity engineering at Fiserv.

### 1.5 Visual Philosophy

- **Evidence over decoration.** Every visual element either shows a real diagram, a real number, or real code — never a stock illustration or gradient blob for its own sake.
- **Monospace as a design element**, not just a code font — used for metadata, tags, and small labels to reinforce "engineering notebook."
- **Restraint over motion.** Micro-interactions only where they clarify state (hover reveals a metric, expand/collapse for long implementation notes). No scroll-triggered parallax, no decorative animation.
- **Dark-first.** A dark theme reads as "terminal / lab," matching the positioning; light theme is a secondary, fully-supported option, not an afterthought.

### 1.6 Why This Structure Beats a Traditional Portfolio

| Traditional portfolio | This system |
|---|---|
| Hardcoded project cards in JSX | Structured MDX content, decoupled from UI |
| "About Me" as the centerpiece | Work and evidence as the centerpiece; About is one click away |
| Screenshots as primary project evidence | Architecture diagrams + benchmarks as primary evidence |
| Adding a project = editing components | Adding a project = one new `.mdx` file |
| Flat project list | Filterable by domain (LLMs / Diffusion / Systems / Security), with a Lab layer underneath for smaller work |
| Static resume PDF as the only "proof" | Resume PDF still included, but as one input among many, not the ceiling of what a visitor can learn |

---

## Phase 2 — Information Architecture

```
/                         Home
├── /projects             Project index (filterable)
│   └── /projects/[slug]  Individual case study
├── /lab                  Experiments, benchmarks, technical notes
│   ├── /lab/experiments
│   ├── /lab/benchmarks
│   └── /lab/notes/[slug]
├── /about                Bio, philosophy, current focus
├── /experience           Structured timeline (Fiserv, IIT Guwahati, education)
├── /resume               Rendered resume + PDF download
└── /contact               Contact + links (email, GitHub, LinkedIn)
```

### Home page section order (top to bottom)

1. **Hero** — positioning statement, credibility strip, primary CTA (View Projects) + secondary CTA (Resume)
2. **Current Focus** — 1–2 sentences, live-updated, e.g. "Currently: exploring MoE routing efficiency in the from-scratch LLM"
3. **Selected Work** — 2–3 flagship project cards (LLM, Stable Diffusion — expandable to more)
4. **Research Notes / Lab preview** — 3 most recent Lab entries
5. **Experience** — condensed timeline (full detail lives at `/experience`)
6. **Contact** — email, GitHub, LinkedIn, resume download

### Expandability rule

New top-level sections (e.g. `/writing`, `/talks`) can be added by (a) adding a new content collection directory and (b) adding one nav entry in `site.config.ts` — no changes to existing route logic.

---

## Phase 3 — UX Wireframes

### 3.1 Desktop (≥1280px) — Home

```
┌──────────────────────────────────────────────────────────────────────┐
│  AC.                      Projects   Lab   About   Experience  ⌐Resume│
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   Building ML systems from first principles.                         │
│   Transformers, diffusion models, and the infra underneath them.     │
│                                                                        │
│   M.Tech Robotics & AI, IIT Guwahati  ·  ex-Cybersecurity, Fiserv     │
│                                                                        │
│   [ View Projects ]   [ Download Resume ]                            │
│                                                                        │
├──────────────────────────────────────────────────────────────────────┤
│  CURRENT FOCUS                                                        │
│  > Exploring MoE routing efficiency in the from-scratch LLM. — May'26 │
├──────────────────────────────────────────────────────────────────────┤
│  SELECTED WORK                                                        │
│  ┌───────────────────────────┐   ┌───────────────────────────┐       │
│  │ LLM From Scratch (PyTorch)│   │ Stable Diffusion (PyTorch)│        │
│  │ [architecture thumbnail]  │   │ [architecture thumbnail]  │        │
│  │ RoPE · RMSNorm · KV-Cache │   │ CLIP · U-Net · DDPM        │        │
│  │ status: active            │   │ status: active              │      │
│  └───────────────────────────┘   └───────────────────────────┘       │
├──────────────────────────────────────────────────────────────────────┤
│  RESEARCH NOTES                                        [ View Lab → ]│
│  ─ KV-cache memory tradeoffs at long context         May 2026        │
│  ─ CFG scale vs sample diversity                     Apr 2026        │
│  ─ Benchmarking SFT vs RLHF convergence               Apr 2026        │
├──────────────────────────────────────────────────────────────────────┤
│  EXPERIENCE                                                            │
│  2025–Present   M.Tech, Robotics & AI — IIT Guwahati                  │
│  2024–2025      Technology Analyst, Cybersecurity — Fiserv            │
│  2023           Cybersecurity Intern — Fiserv                          │
│  2020–2024      B.Tech — Dehradun Institute of Technology              │
├──────────────────────────────────────────────────────────────────────┤
│  Email · GitHub · LinkedIn · Resume (PDF)              © 2026 Ankit  │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.2 Tablet (768–1024px)

- Nav collapses secondary items (Lab, Experience) into a single "Menu" disclosure; Projects and Resume stay visible.
- Selected Work grid drops from 2-up to 1-up, full-width cards.
- All other sections retain desktop order, full width, no sidebar.

### 3.3 Mobile (≤480px)

```
┌───────────────────────┐
│ AC.              ☰    │
├───────────────────────┤
│ Building ML systems   │
│ from first principles.│
│                        │
│ IIT Guwahati · Fiserv  │
│                        │
│ [ View Projects ]      │
│ [ Resume ]              │
├───────────────────────┤
│ CURRENT FOCUS          │
│ > MoE routing...       │
├───────────────────────┤
│ SELECTED WORK          │
│ ┌───────────────────┐ │
│ │ LLM From Scratch   │ │
│ │ [thumbnail]        │ │
│ │ active             │ │
│ └───────────────────┘ │
│  (swipe →)             │
│ ┌───────────────────┐ │
│ │ Stable Diffusion   │ │
│ │ [thumbnail]        │ │
│ │ active             │ │
│ └───────────────────┘ │
├───────────────────────┤
│ RESEARCH NOTES         │
│ ─ KV-cache tradeoffs   │
│ ─ CFG scale vs...      │
│  [ View Lab → ]        │
├───────────────────────┤
│ EXPERIENCE (collapsed, │
│ tap to expand each)    │
├───────────────────────┤
│ Email · GitHub · Linked│
│ in · Resume            │
└───────────────────────┘
```

Behavior notes:
- Project cards on mobile use horizontal swipe (native scroll-snap), not a carousel library.
- Sticky bottom bar on mobile case-study pages: `[ ← Projects ]  [ GitHub ↗ ]` for quick exit/verify.
- Nav becomes a full-height slide-over drawer, not a dropdown, to keep tap targets ≥44px.

### 3.4 Case Study Page (desktop) — structural skeleton

```
┌──────────────────────────────────────────────────────────────────────┐
│ ← Back to Projects                                    GitHub ↗       │
├──────────────────────────────────────────────────────────────────────┤
│ LLM From Scratch in PyTorch                                          │
│ May 2026 – Present · status: active · tags: LLM, Transformers, PyTorch│
├──────────────────────────────────────────────────────────────────────┤
│ [ Problem ]  [ Architecture ]  [ Implementation ]  [ Experiments ]    │
│      ← sticky in-page section nav, scroll-spy highlighted →           │
├──────────────────────────────────────────────────────────────────────┤
│  PROBLEM / MOTIVATION (prose, short)                                  │
├──────────────────────────────────────────────────────────────────────┤
│  ARCHITECTURE                                                          │
│  [ diagram container: transformer block, RoPE, attention, KV-cache ] │
├──────────────────────────────────────────────────────────────────────┤
│  ENGINEERING CHALLENGES (expandable cards, 1 per challenge)           │
├──────────────────────────────────────────────────────────────────────┤
│  EXPERIMENTS & BENCHMARKS  [ chart ]  [ metric card ]  [ metric card ]│
├──────────────────────────────────────────────────────────────────────┤
│  LESSONS LEARNED / FUTURE WORK                                        │
├──────────────────────────────────────────────────────────────────────┤
│  ← Prev project                                    Next project →     │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Phase 4 — Design System

### 4.1 Typography

| Role | Font | Notes |
|---|---|---|
| Display / Headings | **Söhne** or **General Sans** (fallback: Inter) | Geometric, technical, not playful |
| Body | **Inter** | High legibility at small sizes |
| Monospace (metadata, tags, code, metrics) | **JetBrains Mono** or **IBM Plex Mono** | Reinforces "lab notebook" |

Type scale (rem, 1rem = 16px):

| Token | Size | Line-height | Use |
|---|---|---|---|
| `text-xs` | 0.75 | 1.4 | tags, metadata |
| `text-sm` | 0.875 | 1.5 | captions, nav |
| `text-base` | 1 | 1.6 | body |
| `text-lg` | 1.125 | 1.6 | lead paragraphs |
| `text-xl` | 1.5 | 1.3 | section headers |
| `text-2xl` | 2 | 1.2 | page titles |
| `text-3xl` | 2.75 | 1.1 | hero |

### 4.2 Color Palette

**Dark theme (default)**

| Token | Hex | Use |
|---|---|---|
| `bg-base` | `#0A0B0D` | page background |
| `bg-surface` | `#131417` | cards, containers |
| `bg-surface-raised` | `#1B1D21` | hovered cards, modals |
| `border-subtle` | `#26282D` | dividers, card borders |
| `text-primary` | `#EDEDEF` | headings, body |
| `text-secondary` | `#9A9CA3` | captions, metadata |
| `accent` | `#5EEAD4` (teal) | links, active states, chart primary |
| `accent-warm` | `#F5A97F` | secondary chart series, highlights (sparingly) |
| `status-active` | `#5EEAD4` | project status dot |
| `status-archived` | `#6B6D74` | project status dot |

**Light theme**

| Token | Hex |
|---|---|
| `bg-base` | `#FAFAFA` |
| `bg-surface` | `#FFFFFF` |
| `border-subtle` | `#E5E5E7` |
| `text-primary` | `#111214` |
| `text-secondary` | `#6B6D74` |
| `accent` | `#0F9C8A` (darkened teal for contrast) |

Accent color used sparingly — links, active nav state, chart lines, status dots. Never as large background fills.

### 4.3 Grid System

- 12-column grid, max content width `1280px`, gutter `24px`
- Case study prose column capped at `680px` for readability; diagrams/charts can break out to full content width
- Mobile: single column, `16px` side padding

### 4.4 Spacing Scale

`4, 8, 12, 16, 24, 32, 48, 64, 96` (px) — used consistently as Tailwind spacing tokens (`1, 2, 3, 4, 6, 8, 12, 16, 24`).

### 4.5 Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 4px | badges, tags |
| `radius-md` | 8px | cards, buttons |
| `radius-lg` | 12px | diagram containers, images |

No fully-rounded (pill) buttons except tags/badges — keeps the "technical" feel over "SaaS marketing site" feel.

### 4.6 Icon Style

- **Outline icons only** (Lucide), 1.5px stroke, no filled icons.
- Icons are used only for navigation/utility (GitHub, external link, expand/collapse) — never as decorative section headers. Diagrams and charts replace icon-as-illustration.

### 4.7 Animation Principles

- Duration: 120–180ms for micro-interactions (hover, expand), 220ms max for page-level transitions.
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (standard ease-out) everywhere — one easing curve, no bounce/spring effects.
- Framer Motion used **only** for: expand/collapse of challenge cards, scroll-spy nav highlight transition, and page-route fade. Not used for hero text, not used for scroll-triggered reveals.

---

## Phase 5 — Component Library

| Component | Purpose | Variants | States | Key Props | Reusability |
|---|---|---|---|---|---|
| `Navbar` | Global nav | default, transparent-on-hero | default, scrolled (adds bg+shadow) | `links[]` | Site-wide, config-driven from `site.config.ts` |
| `Hero` | Page/section intro | home, case-study | — | `title, subtitle, ctas[]` | Home + optional reuse on `/about` |
| `ProjectCard` | Summarize a project in a grid | flagship (large), compact (list) | default, hover | `title, summary, tags[], status, thumbnail, href` | Home, `/projects` index |
| `TechBadge` | Show a technology/tag | filled, outline | default, active (when used as filter) | `label, active?` | Project cards, case studies, filter bar |
| `Timeline` | Chronological experience/education | vertical | default, expanded item | `items[]` | `/experience`, home condensed view |
| `MetricCard` | Highlight one quantified result | default | — | `label, value, delta?` | Case studies, Lab benchmarks |
| `ArchitectureDiagramContainer` | Wrap an SVG/diagram with caption + zoom | default | collapsed, expanded (lightbox) | `src, caption, alt` | Case studies, Lab |
| `ExperimentGraph` | Render a benchmark chart (line/bar) | line, bar | default, hover-tooltip | `data, xKey, yKey, series[]` | Case studies, Lab/benchmarks |
| `NoteCard` | Lab note / research note preview | default | default, hover | `title, date, excerpt, href` | Home preview, `/lab` index |
| `StatusDot` | Project status indicator | active, paused, archived, shipped | — | `status` | ProjectCard, case study header |
| `SectionNav` | Sticky in-page scroll-spy nav | horizontal (desktop), collapsed (mobile) | idle, active-section-highlighted | `sections[]` | Case study pages |
| `Footer` | Global footer | default | — | `links[]` | Site-wide |

Each component ships with a Storybook-less but MDX-documented usage example co-located in `/components/[name]/README.md` for future-self reference — no separate design tool required.

---

## Phase 6 — Content Architecture

### 6.1 Folder structure

```
/content
├── site.config.ts             # nav, social links, positioning copy, theme defaults
├── /projects
│   ├── llm-from-scratch.mdx
│   ├── stable-diffusion-from-scratch.mdx
│   └── _schema.ts              # zod schema — enforced at build time
├── /notes
│   ├── kv-cache-memory-tradeoffs.mdx
│   ├── cfg-scale-vs-diversity.mdx
│   └── _schema.ts
├── /experiments
│   ├── sft-vs-rlhf-convergence.mdx
│   └── _schema.ts
├── /experience
│   ├── fiserv-technology-analyst.mdx
│   ├── fiserv-intern.mdx
│   ├── iitg-mtech.mdx
│   └── ditde-btech.mdx
├── /about
│   └── index.mdx
└── /images
    ├── /projects/[slug]/
    └── /notes/[slug]/
```

### 6.2 Project frontmatter schema

```ts
// /content/projects/_schema.ts
import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),               // must match filename
  summary: z.string().max(200),   // used in cards + meta description
  duration: z.string(),           // e.g. "May 2026 – Present"
  status: z.enum(["active", "paused", "archived", "shipped"]),
  domain: z.enum(["llm", "diffusion", "systems", "security", "other"]),
  tags: z.array(z.string()),
  technologies: z.array(z.string()),
  heroImage: z.string(),          // path under /content/images/projects/[slug]/
  featured: z.boolean().default(false),
  links: z.object({
    github: z.string().url().optional(),
    paper: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});
```

Body content (below frontmatter) follows the fixed Case Study Template (Phase 9) as MDX sections with consistent `##` headers, so the renderer can programmatically extract a table of contents for `SectionNav`.

### 6.3 Example project file

```mdx
---
title: "LLM From Scratch in PyTorch"
slug: "llm-from-scratch"
summary: "A GPT-style transformer built from tokenization to RLHF, implementing RoPE, RMSNorm, SwiGLU, and KV-cache."
duration: "May 2026 – Present"
status: "active"
domain: "llm"
tags: ["Transformers", "PyTorch", "RLHF"]
technologies: ["PyTorch", "Python", "CUDA"]
heroImage: "/content/images/projects/llm-from-scratch/hero.png"
featured: true
links:
  github: "https://github.com/ankitchaubey/llm-from-scratch"
---

## Problem

...

## Architecture

<ArchitectureDiagram src="/content/images/projects/llm-from-scratch/architecture.svg" caption="..." />

## Implementation

...

## Engineering Challenges

<ChallengeCard title="KV-cache memory scaling">...</ChallengeCard>

## Experiments

<ExperimentGraph data={...} />

## Lessons Learned

...
```

### 6.4 Content/UI separation guarantee

- Zero component in `/components` imports from a specific project file. All rendering is generic: `getAllProjects()`, `getProjectBySlug(slug)`, validated against `ProjectSchema` at build time.
- A malformed or missing field fails the build with a clear zod error — content correctness is enforced, not assumed.

---

## Phase 7 — Dynamic Update Workflow

Goal: the user can later say **"Add this new project: [description]"** and the only output is one new `.mdx` file (plus its images) — no UI/component edits.

### 7.1 Update protocol

1. Determine `domain` from the description (llm / diffusion / systems / security / other).
2. Generate `slug` via naming convention (7.2).
3. Populate frontmatter against `ProjectSchema` — every field required by the schema must be filled; unknowns are asked for explicitly rather than guessed.
4. Write body content following the fixed Case Study Template (Phase 9), using only information provided — no fabricated benchmarks or results.
5. Place any images per the image convention (7.3).
6. Validate: run schema check mentally (or via `zod` at build) before declaring done.
7. Do not touch `/components`, `/app`, or `site.config.ts` unless a genuinely new section type is requested (e.g., a new top-level nav item).

### 7.2 Naming convention

- Slug: kebab-case, derived from title, no dates (`llm-from-scratch`, not `llm-from-scratch-2026`).
- File path: `/content/projects/[slug].mdx`.
- If a project is superseded/rewritten, old slug is kept and `status` is set to `archived`, with a `supersededBy` frontmatter field pointing to the new slug — history is never deleted.

### 7.3 Image convention

- Path: `/content/images/projects/[slug]/`
- Required: `hero.png` (16:9, ≥1600px wide)
- Optional: `architecture.svg` (preferred over PNG for diagrams — must use design-system CSS variables for color, so it themes correctly in dark/light)
- Any additional figures: `figure-1.png`, `figure-2.png`, referenced explicitly in MDX body

### 7.4 Metadata rules

- `summary` ≤ 200 characters — doubles as OpenGraph description.
- `duration` always in `"Month YYYY – Month YYYY"` or `"Month YYYY – Present"` format, matching resume convention already established.
- `status` must reflect reality at time of writing — never defaults to `"shipped"`.
- `featured: true` limited to max 3 projects at a time (enforced by a build-time check, not just convention) to keep the homepage curated.

### 7.5 Tag taxonomy (controlled vocabulary)

To keep filtering meaningful as content grows, tags are drawn from a maintained list rather than free text:

```
Domain tags:      LLM, Diffusion Models, Transformers, RLHF, Cybersecurity,
                   Systems, Infra, Research
Technique tags:    RoPE, RMSNorm, SwiGLU, KV-Cache, Mixed Precision,
                   Attention, Fine-Tuning, Quantization
Tooling tags:      PyTorch, CUDA, Python, Docker
```

New tags can be added to `/content/_taxonomy.ts` but should be additive, not duplicative (check for a near-synonym before adding).

---

## Phase 8 — Technical Stack

| Technology | Justification | Tradeoff acknowledged |
|---|---|---|
| **Next.js (App Router)** | File-based routing maps cleanly to the IA; built-in SSG for MDX content = fast, SEO-friendly, free-tier friendly on Vercel; React Server Components reduce client JS for a content-heavy site | Slightly more complex mental model (server/client components) than a plain static site generator |
| **TypeScript** | Content schemas (zod) + component props are type-checked end to end — a malformed MDX frontmatter fails the build instead of shipping a broken page | Minor authoring overhead; acceptable for a system meant to be maintained long-term |
| **Tailwind CSS** | Design tokens (Phase 4) map directly to a `tailwind.config.ts` theme — enforces the design system rather than letting ad hoc CSS drift | Utility class verbosity in JSX; mitigated by co-locating variants in component files, not duplicating classes across pages |
| **MDX (via `next-mdx-remote` or Contentlayer-style pipeline)** | Lets case studies mix prose with real React components (`ExperimentGraph`, `ArchitectureDiagramContainer`) — critical for "diagrams over decorations" | Slightly more setup than plain Markdown; justified because static charts/diagrams are a core requirement, not a nice-to-have |
| **Framer Motion (limited use)** | Used only for expand/collapse and scroll-spy highlight (Phase 4.7) — not a general animation library dependency | Adds bundle weight; scoped usage keeps this acceptable. If bundle size becomes a concern, expand/collapse can be replaced with native CSS `<details>` + transitions |
| **Vercel deployment** | Free tier covers a personal portfolio's traffic; git-push-to-deploy fits the "one new file = new project" workflow; built-in image optimization and OG image generation | Vendor lock-in is minimal since it's just Next.js — can migrate to any Node host or static export if needed |
| **GitHub Actions** | CI step to run the zod content validation (Phase 6.4) and a Lighthouse CI check on PRs before merge — catches broken content or performance regressions before they hit production | Adds a small amount of pipeline config to maintain; justified because content correctness is a stated hard requirement |
| **SEO (Next.js Metadata API + `sitemap.xml`)** | Each project page needs to be independently discoverable/shareable — recruiters share individual case study links, not just the homepage | None significant — this is close to free with the App Router's built-in metadata API |
| **Open Graph images** | Auto-generated per project (via `@vercel/og`) using `title` + `summary` from frontmatter, so shared links look intentional without manual design work per project | Slight build-time cost; negligible at this content scale |
| **Analytics (Vercel Analytics or Plausible)** | Lightweight, privacy-respecting, free-tier viable; answers "which case study actually gets read" to inform what to expand next | Vercel Analytics is proprietary; Plausible self-host is more setup — pick based on whether "free" or "full data ownership" matters more |
| **Performance optimization** | Static generation for all content routes (`generateStaticParams`), `next/image` for all imagery, SVG (not PNG) for diagrams where possible | Requires discipline to keep diagrams as SVG rather than dropping in screenshots |

---

## Phase 9 — Project Case Study Template

Fixed `##` header structure — required for `SectionNav` to auto-generate its scroll-spy table of contents. Applies uniformly whether the project is an LLM, a diffusion model, a systems project, or a security project (sections are still relevant to security/systems work; "Architecture" becomes system/threat architecture, "Experiments" becomes test results, etc.).

```markdown
## Hero
(rendered from frontmatter — title, summary, tags, status, links — no manual heading needed)

## Problem
What problem motivated this project. 2-4 sentences. No self-congratulation.

## Motivation
Why this problem, why now, why this approach over alternatives.

## Architecture
<ArchitectureDiagramContainer />
The system design. This is the section most technical readers jump to first —
it must stand on its own without reading the prose above it.

## Implementation
Concrete engineering decisions: why RoPE over learned positional embeddings,
why this tokenizer, why this training loop shape. Decisions, not just a feature list.

## Engineering Challenges
<ChallengeCard /> per challenge — problem encountered, why it was hard,
how it was resolved (or how it's still open, if status is "active").

## Experiments
<ExperimentGraph /> + <MetricCard /> — real numbers only. If a project has no
benchmarks yet (early stage), this section says so explicitly rather than
being omitted or faked.

## Benchmarks
(May merge with Experiments for smaller projects — kept separate when there's
a meaningful comparison table, e.g. against a reference implementation.)

## Lessons Learned
What would be done differently. Signals intellectual honesty — a from-scratch
LLM/diffusion project that claims zero mistakes reads as less credible, not more.

## Future Improvements
Concrete, not vague. "Add MoE routing" not "make it better."

## GitHub
(rendered from frontmatter link — no manual heading needed)
```

---

## Phase 10 — Implementation Roadmap

| Week | Focus | Deliverables | Acceptance Criteria |
|---|---|---|---|
| **1** | Foundation | Next.js + TS + Tailwind scaffold; design tokens in `tailwind.config.ts`; `Navbar`, `Footer`, `Hero`; dark/light theme toggle | Lighthouse perf ≥95 on empty shell; theme toggle persists across reload; nav fully keyboard-navigable |
| **2** | Content system | `_schema.ts` for all content types; MDX pipeline wired; `ProjectCard`, `TechBadge`, `StatusDot`; `/projects` index with domain filtering | Adding a new `.mdx` file with valid frontmatter produces a working card on `/projects` with zero component changes |
| **3** | Case study engine | `SectionNav` (scroll-spy), `ArchitectureDiagramContainer`, `ExperimentGraph`, `ChallengeCard`, `MetricCard`; full case study template wired for LLM + Stable Diffusion projects | Both real projects render end-to-end from resume-derived content; mobile sticky action bar works; all diagrams are theme-aware SVG |
| **4** | Lab, About, Experience, Resume, SEO, deploy | `/lab` index + note pages; `Timeline` on `/experience`; `/about`; `/resume` (rendered + PDF download); OG image generation; sitemap; GitHub Actions CI (schema validation + Lighthouse); Vercel deploy | All routes statically generated; CI blocks merge on schema/build/Lighthouse failure; production Lighthouse ≥90 across Performance/Accessibility/SEO/Best Practices on both a case study page and the homepage, mobile and desktop |

**Post-launch (ongoing, not a fixed week):** first real test of the Phase 7 workflow — add one additional project (e.g. a future systems or security project) using only a new `.mdx` file, confirming zero UI regression.

---

*End of specification. No implementation code has been written per the brief — this document is the handoff artifact for a build phase, to be executed only on explicit request.*

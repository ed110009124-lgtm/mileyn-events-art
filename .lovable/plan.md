# MileynEvents — Build Plan

## Phase 0 — Scaffold reset
- Remove TanStack Start: delete `src/routes/`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `wrangler.jsonc`, `routeTree.gen.ts`.
- Replace `vite.config.ts` with a plain React+Vite config (output `dist`).
- Update `package.json` scripts: `dev`/`build`/`preview` via Vite. Remove TanStack/Cloudflare deps; add `react-router-dom`, `framer-motion`.
- Add `src/main.tsx`, `src/App.tsx`, `index.html` at root.
- Tailwind v4 stays via `src/styles.css`. Add Cormorant Garamond + Inter via Google Fonts.

## Phase 1 — Design system
- Tokens in `styles.css`: `--cream #F9F7F4`, `--espresso #3C2A24`, `--amber #C8A97E`, `--champagne #E8D5C4`, `--taupe #8A7E72`, `--charcoal #2A1F1C`. Map to Tailwind via `@theme inline`.
- Fonts: `--font-display` (Cormorant), `--font-body` (Inter).
- Shared components: `GoldenThread`, `ScrollProgress`, `CustomCursor`, `Navbar`, `Footer`, `ConciergeIndicator`, `QuickInquiry`, `SectionDivider`, `PageTransition`.

## Phase 2 — Lovable Cloud + content model
Enable Cloud. Create:
- `site_content` table — single-row JSON blob, public read, admin write.
- `images` storage bucket (public read).
- `admins` table + RLS so only signed-in admin email `mileyn` can write.
- Seed user `mileyn / 12345` (email-style: `mileyn@mileynevents.local`).
- `useContent()` hook reads from Cloud (with a default fallback shipped in code so the site never breaks).

## Phase 3 — AI-generated imagery
Generate via `imagegen` and store in `src/assets/`:
- 1 hero (golden-hour wedding, amber-lit), 6 service tiles, 6 portfolio cards, 4 team candids, 1 about editorial. ~18 images total.

## Phase 4 — Homepage (single canvas)
Sections in order with the dark→light rhythm: Hero, About, Services, Portfolio, Team, Testimonials, Contact, Footer. Implement the entrance animation (sessionStorage-gated, reduced-motion safe), golden thread scroll indicator, custom cursor (desktop only), and ALL 11 creative moments using Framer Motion.

## Phase 5 — Sub-pages
`/services/:slug`, `/portfolio/:slug`, `/meet-the-team`, `/testimonials`, `/privacy`, `/terms`, `/404`. Each with the page-transition golden-thread sweep.

## Phase 6 — Admin
- Hidden 8px square dark toggle, bottom-left, no label. Triple-click within 3s → `/admin/login`.
- `/admin/login` — username + password form. Calls Supabase `signInWithPassword` with `mileyn@mileynevents.local`.
- `/admin` — mirrors the public site's section list. Inline editors for every text field, drag-drop image uploads to the bucket, save → updates `site_content.data`. Public site re-reads on next load.
- Logout button.

## Phase 7 — QA pass
- Verify `npm run build` outputs `dist/` cleanly.
- Verify reduced-motion and mobile.
- Verify admin auth and content persistence.

## Scope realism (read this)
- This is genuinely a 5–10 message build, not one turn. I'll do **Phases 0–4 (scaffold + design system + Cloud + imagery + full homepage with all creative moments)** in this first pass. Sub-pages and the admin dashboard come in follow-up turns once the foundation is solid and you've seen the homepage feel right.
- The admin will be functional but pragmatic: editing text fields and swapping images, not a visual page builder.
- All copy uses "Mileyn Events" (replacing "Dencyah") as you chose.

## Technical notes
- Plain Vite SPA → `dist/` deploys to Vercel/Cloudflare Pages with no config.
- React Router v6 (`BrowserRouter`).
- Supabase JS client used directly from the browser (no server functions, since you wanted no server code). RLS enforces admin-only writes.
- The hidden admin toggle uses a click-counter with 3s timeout; the route itself is also reachable directly at `/admin/login` for convenience.

Approve this and I'll start with Phase 0–4.
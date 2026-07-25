# Goodman Consulting — build complete

All six tasks from the original brief are done. Summary below, organized by task, with anything a human still needs to check before deploy called out explicitly.

## Task 1 — Placeholder content
Replaced across all 9 files (UDYAM number, WhatsApp/phone links and display text, email). Verified with grep — no old placeholder strings remain.

## Task 2 — Pricing
Seeded pricing updated to Starter ₹15,000 / Growth ₹35,000 / Scale ₹70,000 with the new descriptions in `backend/app/main.py`.
**Only affects fresh databases** — an already-deployed DB needs a manual edit via the admin panel's pricing editor.

## Task 3 — Testimonials feature (new)
Full stack: `Testimonial` model, Pydantic schemas, Alembic migration (`002_testimonials.py`, `down_revision = "001_initial"` — **not yet run against any live DB**), public/admin endpoints, a `TestimonialsSection` component, and a full create/edit/publish/delete manager in the admin panel.
One seeded testimonial (Priya Sahoo / Sahoo General Store) — **fictional, clearly marked with a comment in the code, must be replaced with a real client quote before launch.**

## Task 4 — Homepage live data
`frontend/app/page.tsx` is now an async server component:
- Fetches `/api/case-studies`, shows the latest 2 as a "Recent work" section (additive, existing 3-card grid unchanged).
- Fetches `/api/testimonials`, renders `TestimonialsSection`.
- Both fetches wrapped in try/catch, fail to `[]` — page won't crash if the backend is down.

## Task 5 — Design refinements
1. Added `teal` accent (`#3D6B66` / light `#5C8B85`) to `tailwind.config.ts`. Applied to the "Business Automation" and "Dashboards & Analytics" service cards on `/services` (top border + heading color) and to the testimonials section (border-left, section label, background tint). Gold remains the primary accent everywhere else.
2. Homepage H1 bumped from `md:text-6xl` to `md:text-7xl`; body copy untouched in size.
3. Empty-state copy rewritten on `/work` ("Our first project is wrapping up — check back this month…") and `/blog` (specific to the topics planned, not "check back soon").
4. `frontend/app/layout.tsx` now sets `icons.icon`, `openGraph.images`, and a `twitter` card block. Two new placeholder assets were added since none existed: `frontend/app/icon.svg` (a simple ink/gold "G" monogram — Next's App Router auto-serves this as the favicon, no code needed beyond the metadata) and `frontend/public/og-image.svg` (a 1200×630 text-based placeholder with the business name and tagline).
   **Caveat to flag:** these are SVGs. Next.js and browsers handle an SVG favicon fine, but **WhatsApp and Instagram's link-preview crawlers generally require a JPG or PNG for the OG image** — an SVG may not render in their previews even though the metadata is wired correctly. Before relying on link previews for real sharing, swap `og-image.svg` for an exported PNG/JPG at the same path reference (or generate one from a design tool) — the `openGraph`/`twitter` metadata block won't need to change, just the file format.

## Task 6 — Real case study
Fetched the README from `https://github.com/claudebaby2026-ctrl/RUBYZ-ENSEMBLE-Boutique` (a live, in-production Next.js + FastAPI e-commerce platform for a boutique ethnic-fashion brand — real Razorpay payments, real inventory, owner dashboard). Replaced the seeded placeholder case study with a real one at slug `rubyz-ensemble-boutique` (previously `retail-analytics-dashboard`), covering:
- **Problem:** framed conservatively as moving from informal, message-based selling to a real online store — the README doesn't state the "before" state explicitly, so this is a plausible inference, not confirmed fact.
- **What was built:** based directly on documented, verified features — storefront (browsing, filters, wishlist, coupons, real signature-verified Razorpay checkout) and owner dashboard (products, orders, coupons, analytics, homepage editor), plus the stated backend safeguards (server-side re-pricing, idempotent orders, row-locking against overselling).
- **Result:** deliberately left without invented metrics — states only that the store is live and the owner can self-serve the catalog/homepage, with an explicit note that real sales/conversion figures should be added once the owner can confirm them.

**Flag for the business owner:** both the case-study framing (the "problem" statement especially) and the fictional testimonial should be reviewed and adjusted/replaced with owner-confirmed specifics before the site goes live — these are the two places in the codebase where placeholder or inferred content could otherwise be mistaken for real, client-approved copy.

## Not run in this session (no network access in the sandbox)
- `npm install` / a full Next.js build or type-check.
- `alembic upgrade head` against a real database.
All edited Python files pass `py_compile`, and all edited `.tsx` files pass a brace/paren balance check, but a real build is worth running before deploy.

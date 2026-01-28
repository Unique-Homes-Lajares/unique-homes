# Unique Homes Lajares — project context for AI

**What it is:** Marketing site and booking flow for Unique Homes Lajares, boutique adults-only villas in Lajares, Fuerteventura. [uniquehomeslajares.com](https://www.uniquehomeslajares.com)

**Stack:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix), React Router, TanStack Query, Supabase (client + edge functions), i18n (de / en / es / fr / it).

**Key entry points**
- **App:** `src/App.tsx` — providers (Query, Router, Helmet, Language, AvailabilityModal), routes.
- **Entry:** `src/main.tsx` → `src/index.css`.
- **Pages:** `src/pages/` — Index, Villa (`/villa/:slug`), WellnessPage, NuestraFormaDeCuidar, PrivacyPolicy, NotFound.
- **Routing:** React Router in App; paths like `/`, `/villa/:slug`, `/wellness`, `/nuestra-forma-de-cuidar`, `/politica-privacidad`.

**Source layout**
- **`src/components/`** — Feature and layout components (Header, Footer, Hero, Casas, VillaGallery, VillaPhotoTour, modals, etc.). **`src/components/ui/`** — shadcn-style primitives (button, dialog, carousel, etc.).
- **`src/contexts/`** — LanguageContext, AvailabilityModalContext.
- **`src/hooks/`** — useBaliAvailability (Supabase function), useScrollReveal, useIsMobile, useToast.
- **`src/i18n/`** — `translations/{de,en,es,fr,it}.json`, `index.ts`, `types.ts`. LanguageContext consumes these.
- **`src/integrations/supabase/`** — Supabase client and types.
- **`src/lib/`** — `utils.ts` (cn), `photoTourTranslations.ts`, etc.
- **`src/pages/`** — Page components wired in App.
- **`src/types/`** — Shared TS types.

**Backend / Supabase**
- **`supabase/functions/get-bali-availability/`** — Edge function: fetches iCal, returns blocked periods and 3‑night gaps for “Bali” villa availability. Frontend calls it via `useBaliAvailability` (Supabase client `functions.invoke`).
- **`supabase/config.toml`** — Project/config for Supabase.

**Conventions**
- UI: shadcn/Radix + Tailwind; path alias `@/` → `src/`.
- Content: i18n JSON keys; use `useLanguage()` from LanguageContext for `t.*`.
- Villas: Mykonos, Santorini, The Retreat, California, Bali (coming). Villa pages use slug from route.

**Commands (root)**  
`npm run dev` | `npm run build` | `npm run lint` | `npm run preview`

**Config worth knowing**
- **`AGENTS.md`** (root) — How agents should work in this repo, Context7 rule, layout.
- **`.cursor/rules/context7-for-code.mdc`** — Use Context7 for all code generation.
- **`components.json`** — shadcn alias config (`@/components`, `@/lib/utils`, etc.).
- **`tailwind.config.ts`** — Theme (colors, fonts, radii, keyframes), content paths.

# Test suggestions for Unique Homes Lajares

This document lists **beneficial tests to add** (suggestions only; no tests are written here). Use Context7 and current Vitest / React Testing Library docs when implementing. Stack: Vite, React 18, TypeScript, Tailwind, shadcn/Radix, TanStack Query, Supabase, i18n (de/en/es/fr/it).

---

## 1. Tooling and conventions (Context7 / Vitest / RTL)

- **Runner**: Vitest (native Vite integration, ESM, fast).
- **React**: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- **Env**: `environment: 'jsdom'` in Vitest config; `setupFiles` (e.g. `vitest.setup.ts`) importing `@testing-library/jest-dom` and optionally `afterEach(cleanup)`.
- **Types**: Include `vitest/globals` in `tsconfig` if using global `describe`/`it`/`expect`.
- **Naming**: `*.test.tsx` or `*.spec.tsx` next to source or in `src/**/__tests__/`.
- **Style**: Prefer testing behavior and user-visible outcomes over implementation details; use RTL queries (`getByRole`, `getByLabelText`, `findBy*` for async).
- **Async**: Prefer `findBy*` / `waitFor` or Vitest’s `expect.element()` where docs recommend it, to reduce flakiness.

---

## 2. Pure utilities and logic (unit)

| Area | What to test | Rationale |
|------|--------------|------------|
| **`src/lib/utils.ts`** | `cn(...)` with various `ClassValue` inputs (strings, arrays, conditional objects), including Tailwind-style conflicts | Ensures `clsx` + `twMerge` behave as intended for layout/theme |
| **`src/i18n/index.ts`** | `getTranslation(lang)` for each `Language`; fallback for `fr`/`de`/`it`/`ru` to English; unknown lang → `es` | Protects i18n contract and fallback logic |
| **`src/i18n/types.ts`** | `detectBrowserLanguage()` for `navigator.language` values: `"es"`, `"en"`, `"fr"`, `"de"`, `"it"`, `"ru"`, unsupported (e.g. `"ja"`) → default | Critical for first-load language and fallback-to-English behavior |
| **`src/lib/photoTourTranslations.ts`** | Any pure helpers (e.g. key mapping, shape) if present | Prevents regressions in photo-tour i18n |

---

## 3. Hooks (unit with mocks)

| Hook | What to test | Rationale |
|------|--------------|------------|
| **`useBaliAvailability`** | (1) Initial load: `isLoading` true then false, `blockedPeriods`/`threeNightGaps` from mocked `supabase.functions.invoke`. (2) `isDateBlocked(date)` for dates inside/outside mocked periods. (3) `isRangeBlocked(start,end)` overlap vs no overlap. (4) `isExactThreeNightGap(checkIn, checkOut)` for matching and non-matching gaps. (5) `getMinimumNightsForDate(checkIn)` → 3 when check-in is start of a 3-night gap, else 4. (6) On invoke error: `error` set, no throw. (7) `refetch` triggers invoke again. | Core booking logic; date math and Supabase contract are high-value |
| **`useScrollReveal`** | If logic is unit-testable (e.g. threshold/intersection), test with mocked `IntersectionObserver` | Ensures reveal behavior is consistent |
| **`useIsMobile`** (or `use-mobile`) | With mocked `window.matchMedia`, test return value for `(min-width: 768px)` true/false | Drives responsive behavior in many components |

Mock Supabase in hook tests via `vi.mock('@/integrations/supabase/client')` and control `supabase.functions.invoke` resolution.

---

## 4. Contexts (unit / integration)

| Context | What to test | Rationale |
|---------|--------------|------------|
| **LanguageContext** | (1) `LanguageProvider`: default/initial from `localStorage` or `detectBrowserLanguage`. (2) `setLanguage(lang)` updates state and `localStorage`. (3) `useLanguage()` returns correct `t` and `language`. (4) `document.documentElement.lang` updates when language changes. (5) Use outside provider throws or safe default per your design | i18n and SSR/hydration-related behavior |
| **AvailabilityModalContext** | (1) `AvailabilityModalProvider`: `openModal` → `isOpen` true, `closeModal` → false. (2) `useAvailabilityModal()` outside provider throws | Prevents modal state bugs |

Render with minimal wrapper (e.g. only the provider under test) and, for LanguageContext, a small test component that calls `useLanguage()`.

---

## 5. Components – UI primitives (`src/components/ui/`)

| Scope | What to test | Rationale |
|-------|--------------|------------|
| **Button, Input, Label** | Render with props; click/press handlers; disabled/aria when applicable | Base for forms and CTAs |
| **Dialog** | Open/close via prop and internal close button; focus and a11y if you standardise on it | Used by AvailabilityModal, BaliRequestModal |
| **Calendar / DayPicker** | Controlled value, `onSelect`, disabled days (e.g. from `disabled` prop) | Underpins InlineDateRangePicker |
| **Select, Dropdown** | Open list, choose option, callback and closed state | Language selector and similar |

Prefer one or two representative primitives (e.g. Button + Dialog) rather than every shadcn file; add more where you’ve customised or wrapped them (e.g. your own DatePicker wrapper).

---

## 6. Components – feature / layout

| Component | What to test | Rationale |
|-----------|--------------|------------|
| **Header** | Renders nav links; language selector present; correct links for `/`, `/wellness`, etc. | Core navigation and i18n entry point |
| **Footer** | Links and copy present (e.g. policy, tagline) | Legal and branding |
| **CasaCard** | Renders title, image, slugs; “Reserve”/“Coming soon” and link to `/villa/:slug`; carousel next/prev if you test one interaction | Listing and entry to villa pages |
| **AvailabilityModal** | When open: title, CTA, close; on “Reserve”/continue: `window.open` called with expected URL shape and `lang=`; modal closes | Booking funnel and i18n in URL |
| **BaliRequestModal** | Opens/closes via props; contains `InlineDateRangePicker` and submit path; when using `useBaliAvailability`, consider testing with mocked hook so date rules are exercised in hook tests | Bali-specific flow and date logic |
| **InlineDateRangePicker** | With mocked `useLanguage` and injected `isDateBlocked`/`isRangeBlocked`/`getMinimumNightsForDate`: (1) check-in only: disabled dates not selectable. (2) check-out: min nights enforced, blocked ranges disable. (3) 3-night gap: when `getMinimumNightsForDate` returns 3, a 3-night range is accepted. (4) locale switches (e.g. month names) if you care | Critical for Bali availability UX |
| **LanguageSelector** | Lists locales; changing selection updates context (and optionally nav/label) | i18n and a11y |
| **CookieBanner** | Renders when needed; accept/dismiss hides and persists (e.g. localStorage) | Consent and legal |
| **ScrollToTop** | On route change, scroll position resets (e.g. `window.scrollTo` called) | UX after navigation |
| **VillaGallery / VillaPhotoTour** | Renders sections and images; navigation between sections/images if user-facing | Content and navigation |
| **Hero, Casas, Lajares, FAQ, Contact, etc.** | Smoke: render without error inside providers; optional: one visible string or key interaction per component | Prevents regressions on copy and structure |

Test feature components inside the providers they use (Router, Language, Query, etc.) or with small custom wrappers.

---

## 7. Pages (integration / smoke)

| Page | What to test | Rationale |
|------|--------------|------------|
| **App routing** | For paths `/`, `/villa/california`, `/villa/invalid`, `/wellness`, `/nuestra-forma-de-cuidar`, `/politica-privacidad`: correct component/content or redirect; 404 for unknown path | Routing and SPA behavior |
| **Index** | Renders main sections (Hero, Casas, etc.); at least one villa card; reserve/CTA visible | Homepage contract |
| **Villa** | (1) Valid slug `california` → title/description from data or i18n. (2) Invalid slug → “back to villas” / not-found. (3) Bali slug → “Coming soon” and request CTA. (4) Helmet title/description. (5) Reserve opens availability modal (if wired globally) | Villa pages and SEO |
| **WellnessPage, NuestraFormaDeCuidar, PrivacyPolicy** | Smoke render and key headings/links | Content and navigation |
| **NotFound** | Renders 404 copy and link home | Error state |

Use `MemoryRouter`/`createMemoryRouter` and `Routes` so you don’t depend on a real browser.

---

## 8. Integration and E2E (optional)

| Area | What to test | Rationale |
|------|--------------|------------|
| **Full booking flow** | From home → villa → “Reserve” → modal → pick dates (if applicable) → continue to external URL | Validates critical path without maintaining heavy E2E |
| **i18n flow** | Switch language → key pages show expected locale (e.g. aria or visible text) | Ensures LanguageContext and `t` are wired through |
| **Bali flow** | Open Bali villa → “Request availability” → modal → date picker uses blocked/min nights from `useBaliAvailability` (mocked or test backend) | End-to-end check of Bali logic |

Prefer Vitest + RTL for “integration” tests that still run in jsdom; add Playwright/Cypress later if you need real browser or multiple tabs.

---

## 9. CI and deploy

| Item | Suggestion | Rationale |
|------|------------|-----------|
| **Deploy workflow** | In `.github/workflows/deploy.yml`, add a step after “Install dependencies” and before “Build”: run `npm run test` (or `npm run test:run`) so deploy fails on failing tests | Prevents shipping broken main |
| **Scripts** | In `package.json`: `"test": "vitest"`, `"test:run": "vitest run"` (and optionally `"test:coverage": "vitest run --coverage"`) | Matches common Vitest usage |

---

## 10. Backend – Supabase Edge Function

| Area | What to test | Rationale |
|------|--------------|------------|
| **`get-bali-availability`** | (1) Unit-style: `parseICalDate`, `parseICalData` with sample iCal strings (multiple VEVENTs, continuation lines, different date formats). (2) Integration: with mocked fetch to iCal URL, assert response shape `{ blockedPeriods, threeNightGaps, lastUpdated }` and correctness of gaps. (3) CORS and error responses (e.g. 500, invalid iCal) | Deno/Vitest or Deno.test; keeps edge logic and contract stable |

Use Deno’s test runner or a Vitest Deno env so you don’t need to call the real iCal URL in CI.

---

## 11. Priorities (suggested order)

1. **High**: `useBaliAvailability` (with mocked Supabase), `InlineDateRangePicker` (with mocked helpers), `detectBrowserLanguage` / `getTranslation`, and one happy-path test for Villa page (valid + invalid slug).
2. **Medium**: LanguageContext and AvailabilityModalContext, AvailabilityModal (open/close + reserve URL), App routing, CasaCard smoke.
3. **Lower**: Remaining components as smoke tests; UI primitive tests for the few you rely on most; E2E when you need stronger guarantees.

---

## 12. Files and layout

- **Config**: `vitest.config.ts` or `vite.config.ts` `test` block; `vitest.setup.ts` (or path in `setupFiles`).
- **Placement**: Co-located `*.test.tsx`/`*.spec.tsx` next to source, or `__tests__` under `src/pages`, `src/components`, `src/hooks`, `src/contexts`, `src/lib`, `src/i18n`.
- **Mocks**: Shared mocks under `src/test/mocks/` or `src/__mocks__/` (e.g. Supabase client, `window.matchMedia`, `IntersectionObserver`).

---

*Use Context7 and current Vitest / React Testing Library documentation when implementing these suggestions.*

# feeninsure.com

The progressive marketing site for **K. Chanicha Setha-amorn (ฟีน)** — Allianz Ayudhya HNW agent (Morfeen Team).

Built with Astro 5 + Tailwind CSS + MDX. Bilingual TH (default) / EN. Optimized for SEO + AIO (AI Optimization for ChatGPT, Claude, Gemini, Perplexity).

---

## Local development

Requirements: **Node.js 20+** and **npm**.

```bash
cd website
npm install
npm run dev          # http://localhost:4321
```

Build for production:

```bash
npm run build        # outputs ./dist
npm run preview      # preview production build at :4321
```

## Project layout

```
website/
├── astro.config.mjs        Site config (i18n, sitemap, MDX)
├── tailwind.config.mjs     Brand tokens (teal/gold + Kinfolk palette)
├── tsconfig.json           Path aliases (@components/, @lib/, @i18n/)
│
├── src/
│   ├── pages/              File-based routes (TH default; /en/* for English)
│   ├── layouts/Layout.astro  Base layout with full SEO/AIO head
│   ├── components/         Reusable UI (Nav, Footer, BenefitCard, LineCTA, …)
│   ├── content/            MDX collections — products, blog, compare, faq
│   ├── content/config.ts   Zod schemas for each collection
│   ├── lib/site.ts         Single source of truth: agent info, contact, social
│   ├── i18n/strings.ts     Bilingual UI strings
│   └── styles/global.css   Tailwind layers + Google Fonts loader
│
└── public/
    ├── llms.txt            AI-crawler manifest (cited in robots.txt)
    ├── robots.txt          Allows GPTBot, ClaudeBot, Google-Extended, etc.
    ├── manifest.webmanifest  PWA manifest
    └── favicon.svg
```

## Editing content (no code required)

All page-level copy lives in MDX files inside `src/content/`. Edit the file, save, and the site rebuilds.

| To do this... | Edit this file |
|---|---|
| Change a product's benefits or wording | `src/content/products/<slug>.mdx` |
| Add a blog post | Create `src/content/blog/<slug>.mdx` (copy frontmatter from existing post) |
| Add an FAQ entry | Create `src/content/faq/<slug>.mdx` |
| Add a substitute-keyword comparison page | Create `src/content/compare/<slug>.mdx` |
| Update agent contact / social links | `src/lib/site.ts` |
| Update navigation labels (TH/EN) | `src/i18n/strings.ts` |
| Tweak brand colors or typography | `tailwind.config.mjs` + `src/styles/global.css` |

The product detail page template (`src/pages/products/[slug].astro`) renders **at most 3 benefit cards** to enforce the low-cognitive-load brief.

## SEO + AIO setup

Already wired:
- ✅ Per-page Schema.org JSON-LD (`InsuranceAgency`, `Person`, `FinancialProduct`, `Article`, `FAQPage`, `BreadcrumbList`)
- ✅ Hreflang for TH/EN
- ✅ Auto sitemap (`@astrojs/sitemap`) — submitted at `/sitemap-index.xml`
- ✅ `llms.txt` manifest at root (AI-crawler quick reference)
- ✅ `robots.txt` explicitly allows GPTBot / ClaudeBot / Google-Extended / PerplexityBot
- ✅ Open Graph + Twitter card metadata
- ✅ Canonical URLs

To finalize before launch:
- [ ] Set real domain (`feeninsure.com`) via Cloudflare Pages
- [ ] Replace Formspree form ID in `src/pages/contact.astro`
- [ ] Verify Google Search Console + Bing Webmaster Tools
- [ ] Add real LINE OA ID and update `src/lib/site.ts` `contact.line.id`
- [ ] Replace social-link placeholders with real URLs in `src/lib/site.ts`
- [ ] Generate real `og-default.jpg` (1200×630) using Canva
- [ ] Generate PWA icons (192px, 512px) for `/public/icons/`
- [ ] Uncomment Plausible analytics line in `src/layouts/Layout.astro`

## Deploy to Cloudflare Pages

1. Push `website/` to a GitHub repo (e.g., `feenfeen/feeninsure`)
2. In Cloudflare dashboard → Pages → Connect to Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variables: none needed for static build
6. Add custom domain `feeninsure.com` and set DNS to Cloudflare

The site is fully static — every page pre-renders at build time. Cloudflare Pages free tier covers expected Year-1 traffic.

## Bilingual structure

- TH (default): URLs like `/products/first-class-ultra`
- EN: URLs like `/en/products/first-class-ultra`
- The `<html lang>` and Schema.org locale auto-switch
- Hreflang tags on every page tell Google to serve the right version

To add a missing EN page, copy the TH page into `src/pages/en/` and translate the strings (or extend `src/i18n/strings.ts`).

## Brand kit (TL;DR)

| Token | Value | Use |
|---|---|---|
| Teal 600 | `#007B87` | Primary brand accent, CTA buttons |
| Gold 500 | `#C9A84C` | Secondary accent, dividers, premium hits |
| Cream | `#FAF8F4` | Page background (Kinfolk warm white) |
| Stone 100/200 | `#F2EEE5` / `#E8E2D6` | Card backgrounds, borders |
| Ink | `#1A1A1A` | Body text |
| Display font | Cormorant Garamond | Editorial headlines |
| Body Latin | Inter | Body text in EN |
| Body Thai | IBM Plex Sans Thai Looped | Body text in TH |

## Tech-stack rationale

- **Astro** — best-in-class for content-heavy SEO sites; ships zero JS by default; perfect Lighthouse scores
- **Tailwind** — fast iteration with brand tokens
- **MDX collections** — edit content without touching code; type-safe via Zod
- **Cloudflare Pages** — free, global, fast in Thailand
- **Plausible (later)** — PDPA-friendly analytics, no cookie banner needed

## What's NOT included (yet)

- Sanity / Decap CMS visual editor — postponed; MDX files are simpler to start
- Full English blog/product translations — only EN scaffolding is done
- LINE LIFF SDK (with login + form prefill) — current version uses LINE deep-link (sufficient for lead-gen Option A)
- Calculator: real Allianz quote API — current version uses public-info ballpark
- Service-worker for PWA — manifest exists but no SW registered
- A11y audit — basic semantics in place, full audit before launch

See `LAUNCH-CHECKLIST.md` for the production-ready punch list.

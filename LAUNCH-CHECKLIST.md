# Launch checklist — feeninsure.com

Work through top to bottom. Anything **bold** is a hard blocker for going live.

## Pre-launch (Week -2 to -1)

### Brand + legal
- [ ] **Allianz Ayudhya compliance approval** for personal-agent website using Allianz brand assets and product names. Submit `MF_Insurance_Digital_Marketing_Strategy_2026.pdf` + this site's URL to the Morfeen team lead for sign-off.
- [ ] **OIC agent license number** added to `src/lib/site.ts` (`agent.license` field) and shown in footer
- [ ] **PDPA notice** drafted and linked in form footer (currently has placeholder)
- [ ] Copyright on all photos confirmed (own photos? photographer release?)

### Domain + hosting
- [ ] Register `feeninsure.com` (.com primary)
- [ ] Optional: also register `feeninsure.co.th` and 301-redirect to .com
- [ ] DNS pointed to Cloudflare Pages
- [ ] SSL active (auto via Cloudflare)
- [ ] Custom 404 verified

### Content polish
- [ ] Replace placeholder hero figure on home with real Canva-edited photo (currently a gradient block)
- [ ] Generate `/og-default.jpg` (1200×630) for default social-share preview
- [ ] Generate PWA icons (192×192, 512×512) → `public/icons/`
- [ ] Generate `/icons/apple-touch-icon.png` (180×180)
- [ ] Replace `0829795429` placeholder phone if it changes
- [ ] Replace social-link mocks (`facebook.com/feeninsure` etc.) with real handles
- [ ] Verify all `https://www.allianz.co.th/...` links land on the right product page (these were assumed canonical — verify before launch)

### Forms + CTAs
- [ ] **Create Formspree account** → replace `REPLACE_WITH_FORM_ID` in `src/pages/contact.astro`
- [ ] **Test LINE deep-link** with prefilled message on iOS + Android
- [ ] **Set up LINE OA** with rich menu showing 6 main products
- [ ] Connect Formspree → Google Sheet via Zapier (or Formspree → email → manual)

### Analytics + monitoring
- [ ] Set up Plausible.io account, add domain, uncomment script in `src/layouts/Layout.astro`
- [ ] Verify Google Search Console (DNS or HTML verification)
- [ ] Verify Bing Webmaster Tools
- [ ] Submit `https://feeninsure.com/sitemap-index.xml` to both
- [ ] Submit IndexNow notification on first publish

### SEO + AIO
- [ ] Run Google Rich Results Test on home, 3 product pages, 1 blog, 1 compare page
- [ ] Validate JSON-LD with schema.org validator
- [ ] Verify `llms.txt` reachable at `https://feeninsure.com/llms.txt`
- [ ] Check `robots.txt` at `https://feeninsure.com/robots.txt` — confirm AI bots allowed
- [ ] Run Lighthouse on 3 representative pages — target ≥95 on Performance, SEO, Best Practices, Accessibility

## Launch day

- [ ] Final `npm run build` clean (no warnings on console)
- [ ] Deploy to Cloudflare Pages
- [ ] Smoke test: home, /products, /products/first-class-ultra, /compare/allianz-vs-aia, /blog/maternity-insurance-real-story, /faq, /calculator/health-premium, /contact
- [ ] LINE CTA fires correctly with context prefill on each page
- [ ] Form submits land in Formspree dashboard
- [ ] Mobile test: iOS Safari, Android Chrome (use Browserstack or real devices)
- [ ] Hreflang tags resolve correctly (use Google's hreflang tester)
- [ ] Submit homepage manually to Google Search Console "Request indexing"

## Post-launch (Week 1–4)

- [ ] Day 1: Post launch announcement on FB / IG / LINE OA
- [ ] Week 1: Begin TikTok + YT Shorts content production (1 shoot day)
- [ ] Week 2: First Search Console crawl arrives — fix any errors flagged
- [ ] Week 3: Check AIO presence — ask ChatGPT, Claude, Gemini "Allianz Ayudhya HNW agent in Bangkok" and see whether site is cited
- [ ] Week 4: First quarterly forecast re-baseline using real M1 data

## Recurring

- [ ] Monthly: 4 new blog posts (per content calendar)
- [ ] Monthly: 1 video shoot day → 4 hero videos × 6 channels = 24 pieces
- [ ] Monthly: Update `strategy/sales-forecast-1-3yr.csv` with actuals
- [ ] Quarterly: Refresh `strategy/keyword-universe.csv` with new opportunities from Search Console
- [ ] Annually: Refresh `strategy/market-size-model.csv` with TLAA Q1 data

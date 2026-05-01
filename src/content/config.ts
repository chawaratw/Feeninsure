import { defineCollection, z } from 'astro:content';

// Insurance products — one MDX file per product, bilingual fields.
// Slug is auto-derived from the filename (Astro reserves the `slug` field).
const products = defineCollection({
  type: 'content',
  schema: z.object({
    rank: z.number(),                    // ordering on /products
    nameTh: z.string(),
    nameEn: z.string(),
    taglineTh: z.string(),
    taglineEn: z.string(),
    audienceTh: z.string(),
    audienceEn: z.string(),
    coverageTh: z.string(),
    coverageEn: z.string(),
    onlineFit: z.enum(['high', 'medium', 'low']),
    rating: z.number().min(1).max(5),
    benefits: z.array(z.object({
      icon: z.string(),
      headlineTh: z.string(),
      headlineEn: z.string(),
      bodyTh: z.string(),
      bodyEn: z.string(),
    })).min(1).max(3),                   // hard cap: low cognitive load
    allianzUrl: z.string().url().optional(),
    brochureUrl: z.string().optional(),
    badge: z.string().optional(),
    related: z.array(z.string()).default([]),
    keywordsPrimary: z.array(z.string()).default([]),
    keywordsSecondary: z.array(z.string()).default([]),

    // Substantive product details — render as tables on product page so
    // visitors don't need to leave for the official Allianz site for basics.
    details: z.object({
      planTiers: z.array(z.object({
        name: z.string(),                            // "Platinum 80MB" etc.
        coverage: z.string(),                        // "฿80M / ปี"
        bestFor: z.string().optional(),              // "Upper-middle ถึง HNW"
        notes: z.string().optional(),                // anything else worth flagging
      })).optional(),
      whatsCovered: z.array(z.string()).optional(),
      whatsNotCovered: z.array(z.string()).optional(),
      waitingPeriods: z.array(z.object({
        item: z.string(),
        period: z.string(),
      })).optional(),
      renewalAge: z.string().optional(),
      hospitalNetwork: z.string().optional(),
      coPayment: z.string().optional(),
      issueAge: z.string().optional(),               // "อายุที่สมัครได้"
      premiumPaymentPeriod: z.string().optional(),   // "จ่าย 5 ปี"
      coverageDuration: z.string().optional(),       // "ถึงอายุ 99 ปี"
      taxDeductible: z.string().optional(),          // "ลดหย่อนได้สูงสุด ฿200K/ปี"
    }).optional(),
  }),
});

// Blog posts — Q&A format for AIO ranking.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    locale: z.enum(['th', 'en']).default('th'),
    author: z.string().default('ฟีน ชณิชา'),
    tags: z.array(z.string()).default([]),
    relatedProducts: z.array(z.string()).default([]),
    faqs: z.array(z.object({              // becomes FAQPage JSON-LD
      q: z.string(),
      a: z.string(),
    })).default([]),
    heroImage: z.string().optional(),
  }),
});

// FAQ entries — global FAQ page + page-level FAQPage schema
const faq = defineCollection({
  type: 'content',
  schema: z.object({
    q: z.string(),
    qEn: z.string().optional(),
    a: z.string(),
    aEn: z.string().optional(),
    category: z.enum(['general', 'health', 'critical-illness', 'savings', 'pension', 'tax', 'claims']),
    relatedProducts: z.array(z.string()).default([]),
    rank: z.number().default(50),
  }),
});

export const collections = { products, blog, faq };

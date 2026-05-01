// Bilingual UI strings. Pages import via `t(key, locale)`.
// Keep keys grouped by surface; values short, sentence-case.

import type { Locale } from '@lib/site';

const dict = {
  th: {
    'nav.home': 'หน้าแรก',
    'nav.about': 'เกี่ยวกับฉัน',
    'nav.products': 'ผลิตภัณฑ์',
    'nav.findMyPlan': 'Find My Plan',
    'nav.calculator': 'ประเมิน',
    'nav.blog': 'บทความ',
    'nav.faq': 'คำถามพบบ่อย',
    'nav.contact': 'ติดต่อ',

    'cta.consult': 'ปรึกษาฟีนฟรี ทาง LINE',
    'cta.consultShort': 'ปรึกษาฟีน',
    'cta.callNow': 'โทรเลย 082-979-5429',
    'cta.viewProduct': 'ดูแผนนี้',
    'cta.officialDetails': 'รายละเอียดเพิ่มเติมจาก Allianz',
    'cta.downloadBrochure': 'ดาวน์โหลดโบรชัวร์',

    'badge.firstMover': 'ตัวแทนรายแรกที่นำเสนอ AIO/SEO ครบวงจร',
    'badge.hnw': 'สำหรับ Premium / HNW',
    'badge.online': 'ปิดงานออนไลน์ได้',
    'badge.offline': 'ต้องนัดพบตัวแทน',

    'home.hero.eyebrow': 'Allianz Ayudhya • Premium / HNW',
    'home.hero.titleA': 'ประกันชีวิตและสุขภาพ',
    'home.hero.titleB': 'ระดับ First Class',
    'home.hero.lede': 'ฟีน วางแผนให้คุณ คุ้มครองทุกช่วงชีวิต — จากแม่มือใหม่ถึงผู้บริหาร เลือกแผนจาก Allianz Ayudhya ที่ตรงกับชีวิตของคุณจริงๆ',
    'home.featured': 'ผลิตภัณฑ์ที่แนะนำ',
    'home.why.title': 'ทำไมเลือกฟีน',
    'home.why.p1.h': 'ที่ปรึกษา ไม่ใช่นักขาย',
    'home.why.p1.b': 'ฟีนวางแผนจากความต้องการของคุณ — ไม่ใช่จากค่าคอมของผลิตภัณฑ์',
    'home.why.p2.h': 'เข้าใจชีวิตคุณ',
    'home.why.p2.b': 'ผ่านประสบการณ์จริง ทั้งแม่มือใหม่ ผู้บริหาร นักเดินทาง — เลือกแผนได้แม่นยำ',
    'home.why.p3.h': 'หลังการขายตลอดชีพ',
    'home.why.p3.b': 'เคลม 24/7 ทาง LINE — ไม่ใช่แค่เซ็นกรมธรรม์แล้วหายไป',

    'meta.home.title': 'feeninsure | ประกันชีวิตและสุขภาพ Allianz Ayudhya — ฟีน ชณิชา',
    'meta.home.desc': 'ตัวแทน Allianz Ayudhya สำหรับ Premium/HNW โดยฟีน — ชณิชา เศรษฐาอมร เปรียบเทียบ First Class Ultra, ปลดล็อค ดับเบิล แคร์, มัลติแคร์ และอื่นๆ ปรึกษาฟรีทาง LINE',

    'footer.disclaimer': 'feeninsure เป็นเว็บไซต์ส่วนตัวของตัวแทนประกัน ชณิชา เศรษฐาอมร (Allianz Ayudhya Morfeen Team) — ไม่ใช่เว็บไซต์ทางการของ Allianz Ayudhya สำหรับข้อมูลผลิตภัณฑ์ทางการ ดูที่ allianz.co.th',
    'footer.rights': 'สงวนลิขสิทธิ์',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.findMyPlan': 'Find My Plan',
    'nav.calculator': 'Estimator',
    'nav.blog': 'Insights',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    'cta.consult': 'Free consult via LINE',
    'cta.consultShort': 'Consult Feen',
    'cta.callNow': 'Call 082-979-5429',
    'cta.viewProduct': 'View this plan',
    'cta.officialDetails': 'Official details on Allianz.co.th',
    'cta.downloadBrochure': 'Download brochure',

    'badge.firstMover': 'First Allianz agent with full AIO/SEO',
    'badge.hnw': 'For Premium / HNW',
    'badge.online': 'Closes online',
    'badge.offline': 'Requires in-person meeting',

    'home.hero.eyebrow': 'Allianz Ayudhya • Premium / HNW',
    'home.hero.titleA': 'First-class life',
    'home.hero.titleB': '& health insurance',
    'home.hero.lede': 'Feen plans for every chapter of your life — from new motherhood to executive years. Allianz Ayudhya plans, chosen for who you actually are.',
    'home.featured': 'Featured plans',
    'home.why.title': 'Why work with Feen',
    'home.why.p1.h': 'Advisor, not salesperson',
    'home.why.p1.b': 'Feen plans from your needs — never from the product\'s commission.',
    'home.why.p2.h': 'Understands your life',
    'home.why.p2.b': 'New mother, executive, frequent traveller — lived experience, precise advice.',
    'home.why.p3.h': 'Lifetime after-sales',
    'home.why.p3.b': '24/7 claims help via LINE — not the agent who disappears after the policy.',

    'meta.home.title': 'feeninsure | Allianz Ayudhya life & health insurance — Feen Chanicha',
    'meta.home.desc': 'Allianz Ayudhya agent for Premium/HNW clients in Thailand. Compare First Class Ultra, Double Care, Multi Care and more. Free consult via LINE.',

    'footer.disclaimer': 'feeninsure is the personal site of insurance agent Chanicha Setha-amorn (Allianz Ayudhya Morfeen Team) — not the official Allianz Ayudhya website. For official product information, visit allianz.co.th',
    'footer.rights': 'All rights reserved',
  },
} as const;

export function t(key: keyof typeof dict.th, locale: Locale): string {
  return (dict[locale] as Record<string, string>)[key] ?? (dict.th as Record<string, string>)[key] ?? key;
}

export type StringKey = keyof typeof dict.th;

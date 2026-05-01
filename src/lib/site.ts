// Single source of truth for site-wide constants.
// Update here once; the value flows to every page, schema block, and CTA.

export const SITE = {
  domain: 'feeninsure.com',
  url: 'https://feeninsure.com',
  brand: {
    short: 'feeninsure',
    full: 'feeninsure | ฟีน ประกัน First Class',
    fullEn: 'feeninsure | First Class Health & Life by ฟีน',
    tagline: 'ฟีน วางแผนให้คุณ คุ้มครองทุกช่วงชีวิต ระดับ First Class',
    taglineEn: 'A First-Class Plan for Every Stage of Your Life',
  },
  agent: {
    nameTh: 'ชณิชา เศรษฐาอมร',
    nameEn: 'Chanicha Setha-amorn',
    nickname: 'ฟีน',
    nicknameEn: 'Feen',
    title: 'ตัวแทนประกันชีวิตและสุขภาพ',
    titleEn: 'Life & Health Insurance Agent',
    company: 'Allianz Ayudhya Assurance PCL.',
    team: 'Morfeen Team',
    license: '', // OIC license number — to be filled
  },
  contact: {
    phone: '0829795429',
    phoneDisplay: '082-979-5429',
    line: { id: '@feeninsure', deepLink: 'https://line.me/R/ti/p/@feeninsure' },
    email: '', // to be added
    address: 'Bangkok, Thailand',
  },
  social: {
    // Mock URLs — replace once real handles are live
    facebook: 'https://facebook.com/feeninsure',
    instagram: 'https://instagram.com/feeninsure',
    tiktok: 'https://www.tiktok.com/@feeninsure',
    youtube: 'https://www.youtube.com/@feeninsure',
  },
  allianz: {
    // Anchor links to official Allianz Ayudhya product pages (verify URLs at launch).
    home: 'https://www.allianz.co.th',
    productsHub: 'https://www.allianz.co.th/personal',
  },
  defaults: {
    ogImage: '/images/og-default.jpg',
    locale: 'th-TH',
  },
} as const;

export type Locale = 'th' | 'en';

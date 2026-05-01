// Recommendation engine for /find-my-plan.
// Pure-function scoring → ranked products. No deps, deterministic.
//
// Score model:
//   1) Concern → base scores per product
//   2) Hospital preference → modifier (only if concern is health-related)
//   3) Budget → hard filter (drop products outside budget envelope)
//   4) Age band → soft modifier (e.g., legacy planning is age-tiered)
// Products are 1-5 ranked; we return the top 3 with reasoning text.

export type ForWhom = 'self' | 'spouse' | 'children' | 'parents' | 'family';
export type Concern =
  | 'comprehensive-health'
  | 'critical-illness'
  | 'retirement'
  | 'tax-deduction'
  | 'wealth-building'
  | 'legacy';
export type AgeBand = 'under-25' | '25-34' | '35-44' | '45-54' | '55-plus';
export type Budget = 'under-50k' | '50k-150k' | '150k-500k' | 'over-500k';
export type Hospital = 'bdms' | 'any-thai' | 'worldwide' | 'not-applicable';

export interface QuizInputs {
  forWhom: ForWhom;
  concern: Concern;
  ageBand: AgeBand;
  budget: Budget;
  hospital?: Hospital;
}

export interface Recommendation {
  productSlug: string;
  score: number;
  reasoning: string;
}

// Base scores per concern. Higher = better fit.
const CONCERN_SCORES: Record<Concern, Record<string, number>> = {
  'comprehensive-health': {
    'first-class-ultra-bdms': 5,
    'first-class-ultra': 5,
    'double-care': 4,
    'superior-health': 3,
    'multi-care': 2,
  },
  'critical-illness': {
    'double-care': 5,
    'multi-care': 5,
    'first-class-ultra': 3,
    'first-class-ultra-bdms': 3,
  },
  'retirement': {
    'my-pension-five': 5,
    'my-style-wealth-ultra': 3,
    'my-wealth-legacy': 2,
  },
  'tax-deduction': {
    'my-pension-five': 5,
    'my-style-wealth-ultra': 4,
    'my-wealth-legacy': 3,
    'double-care': 2,
  },
  'wealth-building': {
    'my-style-wealth-ultra': 5,
    'my-wealth-legacy': 4,
    'my-pension-five': 3,
  },
  'legacy': {
    'my-wealth-legacy': 5,
    'my-style-wealth-ultra': 3,
  },
};

// Hospital preference modifier (applies when concern is health-related)
const HOSPITAL_MODIFIERS: Record<Hospital, Record<string, number>> = {
  'bdms': { 'first-class-ultra-bdms': +2, 'first-class-ultra': -1 },
  'any-thai': { 'first-class-ultra': +2, 'first-class-ultra-bdms': -1 },
  'worldwide': { 'superior-health': +3, 'first-class-ultra-bdms': +1 },
  'not-applicable': {},
};

// Hard budget gates — products NOT in the list for that budget are filtered out.
// Generous on the upper bound; conservative on the lower bound.
const BUDGET_ALLOW: Record<Budget, string[]> = {
  'under-50k': ['multi-care'],
  '50k-150k': ['multi-care', 'double-care', 'my-pension-five'],
  '150k-500k': [
    'multi-care', 'double-care', 'first-class-ultra', 'first-class-ultra-bdms',
    'my-pension-five', 'superior-health', 'my-wealth-legacy',
  ],
  'over-500k': [
    'first-class-ultra', 'first-class-ultra-bdms',
    'my-style-wealth-ultra', 'my-wealth-legacy',
    'superior-health', 'my-pension-five',
  ],
};

// Age modifiers — soft tilts based on which products fit life stage best
const AGE_MODIFIERS: Record<AgeBand, Record<string, number>> = {
  'under-25':  { 'multi-care': +1, 'double-care': +1, 'my-style-wealth-ultra': +1 },
  '25-34':     { 'double-care': +1, 'first-class-ultra': +1, 'my-style-wealth-ultra': +1 },
  '35-44':     { 'double-care': +1, 'first-class-ultra-bdms': +1, 'my-pension-five': +1 },
  '45-54':     { 'my-pension-five': +2, 'my-wealth-legacy': +1, 'first-class-ultra-bdms': +1 },
  '55-plus':   { 'my-wealth-legacy': +2, 'first-class-ultra-bdms': +1, 'multi-care': -1 },
};

// Reasoning template per (concern, slug)
const REASONING: Record<string, string> = {
  'comprehensive-health|first-class-ultra-bdms':
    'แผน @BDMS เน้นเครือ Bumrungrad / BNH / Samitivej — เหมาะถ้าคุณใช้โรงพยาบาลในเครือนี้เป็นหลัก',
  'comprehensive-health|first-class-ultra':
    'แผน Ultra ใช้ได้ทุกโรงพยาบาล — ความยืดหยุ่นสูงสุดสำหรับคนที่กระจายโรงพยาบาลที่ใช้',
  'comprehensive-health|double-care':
    'ครอบคลุมสุขภาพระดับสูง + ปลดล็อค 2 เท่าเมื่อโรคร้าย — เป็น "all-in-one" ที่คุ้มค่า',
  'comprehensive-health|superior-health':
    'คุ้มครองทั่วโลก เหมาะถ้าคุณเดินทางต่างประเทศบ่อย หรือต้องการรักษาที่สหรัฐฯ/ยุโรป',
  'critical-illness|double-care':
    'แผนสุขภาพ + วงเงินเพิ่ม 2 เท่าทันทีเมื่อตรวจพบมะเร็ง หัวใจ หรือสมอง',
  'critical-illness|multi-care':
    'จ่ายเงินก้อนเมื่อตรวจพบ 81 โรคร้าย — เคลมซ้ำได้ ครอบคลุมค่าใช้จ่ายที่ประกันสุขภาพไม่จ่าย',
  'critical-illness|first-class-ultra':
    'คุ้มครองค่ารักษาโรคร้ายระยะยาวด้วยวงเงินสูง',
  'retirement|my-pension-five':
    'จ่ายเบี้ย 5 ปี รับเงินบำนาญตลอดชีพ + ลดหย่อนภาษีเพิ่ม ฿200K/ปี',
  'retirement|my-style-wealth-ultra':
    'ลงทุนระยะยาวผ่าน Unit Link — ผลตอบแทนตามตลาด + คุ้มครองชีวิต',
  'tax-deduction|my-pension-five':
    'ลดหย่อนได้สูงสุด ฿200K/ปี (เพิ่มจาก ฿100K ของประกันชีวิตทั่วไป) — ฐานภาษี 30% = ประหยัด ฿60K/ปี',
  'tax-deduction|my-style-wealth-ultra':
    'ลดหย่อนภาษีในส่วนคุ้มครองชีวิต + ลงทุนระยะยาวเป็นแหล่งกระแสเงินสด',
  'wealth-building|my-style-wealth-ultra':
    'ลงทุนผ่าน Unit Link — เลือกพอร์ตได้ ปรับสมดุลได้ ผลตอบแทนระยะยาวสูง',
  'wealth-building|my-wealth-legacy':
    'จ่ายเบี้ย 6 ปี สร้างทุนคุ้มครองชีวิตยาวถึง 99 ปี + เงินปันผล',
  'legacy|my-wealth-legacy':
    'ออกแบบมาเฉพาะสำหรับการส่งต่อทรัพย์สินให้รุ่นถัดไป จ่ายสั้น คุ้มครองยาว',
  'legacy|my-style-wealth-ultra':
    'รวม Wealth + Protection ในกรมธรรม์เดียว ส่งต่อพอร์ตให้ทายาทได้',
};

function reasoningFor(concern: Concern, slug: string): string {
  return REASONING[`${concern}|${slug}`] ?? 'ตรงกับโปรไฟล์ของคุณตามคำตอบที่ระบุ';
}

export function recommend(inputs: QuizInputs): Recommendation[] {
  const base = CONCERN_SCORES[inputs.concern] ?? {};
  const ageMod = AGE_MODIFIERS[inputs.ageBand] ?? {};
  const hospMod = inputs.hospital ? HOSPITAL_MODIFIERS[inputs.hospital] ?? {} : {};
  const budgetSet = new Set(BUDGET_ALLOW[inputs.budget] ?? []);

  const candidates = new Set<string>([
    ...Object.keys(base),
    ...Object.keys(ageMod),
    ...Object.keys(hospMod),
  ]);

  const scored: Recommendation[] = Array.from(candidates)
    .filter((slug) => budgetSet.has(slug))
    .map((slug) => {
      const score = (base[slug] ?? 0) + (ageMod[slug] ?? 0) + (hospMod[slug] ?? 0);
      return { productSlug: slug, score, reasoning: reasoningFor(inputs.concern, slug) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Fallback: if no products survived budget gate, return top 1 from concern alone
  if (scored.length === 0) {
    const fallback = Object.entries(base)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 1)
      .map(([slug, score]) => ({
        productSlug: slug,
        score,
        reasoning: reasoningFor(inputs.concern, slug) +
          ' (อยู่นอก budget envelope ที่เลือก — ฟีนแนะนำให้ปรับงบหรือพิจารณาแผนอื่น)',
      }));
    return fallback;
  }
  return scored;
}

// Helpers for the result page UI
export const CONCERN_LABEL: Record<Concern, string> = {
  'comprehensive-health': 'ประกันสุขภาพครบถ้วน',
  'critical-illness': 'โรคร้ายแรง (มะเร็ง หัวใจ สมอง)',
  'retirement': 'วางแผนเกษียณ',
  'tax-deduction': 'ลดหย่อนภาษี',
  'wealth-building': 'สร้างทรัพย์สิน',
  'legacy': 'ส่งต่อมรดก',
};

export const FOR_WHOM_LABEL: Record<ForWhom, string> = {
  'self': 'ตัวเอง',
  'spouse': 'คู่ชีวิต',
  'children': 'ลูก',
  'parents': 'พ่อแม่',
  'family': 'ทั้งครอบครัว',
};

export const AGE_LABEL: Record<AgeBand, string> = {
  'under-25': 'ต่ำกว่า 25 ปี',
  '25-34': '25-34 ปี',
  '35-44': '35-44 ปี',
  '45-54': '45-54 ปี',
  '55-plus': '55 ปีขึ้นไป',
};

export const BUDGET_LABEL: Record<Budget, string> = {
  'under-50k': 'ต่ำกว่า ฿50,000/ปี',
  '50k-150k': '฿50,000–150,000/ปี',
  '150k-500k': '฿150,000–500,000/ปี',
  'over-500k': 'มากกว่า ฿500,000/ปี',
};

export const HOSPITAL_LABEL: Record<Hospital, string> = {
  'bdms': 'เครือ BDMS (Bumrungrad / BNH / Samitivej)',
  'any-thai': 'โรงพยาบาลใดก็ได้ในไทย',
  'worldwide': 'ต่างประเทศบ่อย',
  'not-applicable': '—',
};

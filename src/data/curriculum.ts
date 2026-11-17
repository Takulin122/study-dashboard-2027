import {
  BookItem,
  ClinicalScheduleRow,
  PhaseId,
  PhaseMeta,
  SubjectId,
  SubjectMeta,
  TaskDefinition,
  WeekDefinition,
} from '../types';

export const MILESTONES = {
  KOREA_CONGRESS: {
    id: 'korea',
    title: '韓國根管年會',
    dateStr: '2027/03/31',
    isoDate: '2027-03-31T09:00:00+08:00',
    subtitle: '基礎韓文實戰檢驗・W18 里程碑',
  },
  JLPT_N1: {
    id: 'jlpt',
    title: '日檢 N1 檢定',
    dateStr: '2027/12/05',
    isoDate: '2027-12-05T13:30:00+08:00',
    subtitle: '54 週跨領域終局目標・W54 考試日',
  },
} as const;

export const SUBJECT_ORDER: SubjectId[] = [
  'n1',
  'korean',
  'geo1',
  'geo2',
  'history',
  'civics',
  'math',
  'endo',
];

export const SUBJECTS: Record<SubjectId, SubjectMeta> = {
  n1: {
    id: 'n1',
    name: '日文檢定 N1',
    shortName: '日檢 N1',
    color: '#5B7C99',
    bgTint: 'rgba(91, 124, 153, 0.11)',
    borderTint: 'rgba(91, 124, 153, 0.35)',
    badgeText: '#3F5A73',
    scopeLabel: 'W1–W54・13 本教材',
    description: 'N2 喚醒銜接 N1 語彙、漢字、文法、讀解、聽解至全真模考',
  },
  korean: {
    id: 'korean',
    name: '基礎韓文入門',
    shortName: '韓文入門',
    color: '#C98A7A',
    bgTint: 'rgba(201, 138, 122, 0.12)',
    borderTint: 'rgba(201, 138, 122, 0.38)',
    badgeText: '#8E5547',
    scopeLabel: 'W1–W18 任務',
    description: '每日 15–20 分鐘 40 音、雙數字與年會旅遊情境，W18 後休眠',
  },
  geo1: {
    id: 'geo1',
    name: '滿級分地理(上)',
    shortName: '地理(上)',
    color: '#6B8E78',
    bgTint: 'rgba(107, 142, 120, 0.12)',
    borderTint: 'rgba(107, 142, 120, 0.38)',
    badgeText: '#466452',
    scopeLabel: '單元 1–9｜W1–W4',
    description: '通論地理：地圖 GIS、地形氣候、人口聚落與一二三級產業',
  },
  geo2: {
    id: 'geo2',
    name: '滿級分地理(下)',
    shortName: '地理(下)',
    color: '#5C8D89',
    bgTint: 'rgba(92, 141, 137, 0.12)',
    borderTint: 'rgba(92, 141, 137, 0.38)',
    badgeText: '#3A6360',
    scopeLabel: '單元 10–19｜W5–W8',
    description: '區域地理與全球化：世界體系、東亞、歐美、亞非澳與臺灣',
  },
  history: {
    id: 'history',
    name: '滿級分歷史',
    shortName: '歷史',
    color: '#B56555',
    bgTint: 'rgba(181, 101, 85, 0.12)',
    borderTint: 'rgba(181, 101, 85, 0.38)',
    badgeText: '#834134',
    scopeLabel: '主題 1–9｜W9–W13',
    description: '臺灣史、中國與東亞史、世界史九大主題脈絡通盤推進',
  },
  civics: {
    id: 'civics',
    name: '滿級分公民',
    shortName: '公民',
    color: '#84709B',
    bgTint: 'rgba(132, 112, 155, 0.12)',
    borderTint: 'rgba(132, 112, 155, 0.38)',
    badgeText: '#58466E',
    scopeLabel: '主題 1–12｜W14–W18',
    description: '社會、政治、法律、經濟四大篇十二主題系統完食',
  },
  math: {
    id: 'math',
    name: '對話式高一上數學',
    shortName: '高一上數學',
    color: '#6A7B9C',
    bgTint: 'rgba(106, 123, 156, 0.12)',
    borderTint: 'rgba(106, 123, 156, 0.38)',
    badgeText: '#475573',
    scopeLabel: '第 1–3 章｜W1–W8',
    description: '數與式、直線與圓、多項式函數三章核心例題與演練',
  },
  endo: {
    id: 'endo',
    name: '根管治療文獻',
    shortName: '根管文獻',
    color: '#A68A64',
    bgTint: 'rgba(166, 138, 100, 0.12)',
    borderTint: 'rgba(166, 138, 100, 0.38)',
    badgeText: '#725B3D',
    scopeLabel: '每月 30 篇｜W1–W54',
    description: '每週穩定精讀 7–8 篇 JOE / IEJ 臨床與基礎文獻維持專業視野',
  },
};

export const PHASES: PhaseMeta[] = [
  {
    id: 1,
    title: '第一期：N2 喚醒與雙語起跑 (W1–W6)',
    shortTitle: '第一期｜N2 喚醒與雙語起跑',
    weekRangeLabel: 'W1–W6',
    dateRangeLabel: '2026/11/17–12/31',
    startWeek: 1,
    endWeek: 6,
    focusSummary: '快速喚醒 N2 文法題感、建立韓文 40 音與數字系統，並同步展開地理與高一上數學。',
  },
  {
    id: 2,
    title: '第二期：N1 基礎與韓國年會衝刺 (W7–W18)',
    shortTitle: '第二期｜N1 基礎與年會衝刺',
    weekRangeLabel: 'W7–W18',
    dateRangeLabel: '2027/01/01–03/31',
    startWeek: 7,
    endWeek: 18,
    focusSummary: '切入 N1 單字文法第一輪、完成社會與數學第一輪，W18 迎戰韓國根管年會後韓文休眠。',
  },
  {
    id: 3,
    title: '第三期：N1 語彙深化與閱讀方法 (W19–W35)',
    shortTitle: '第三期｜N1 語彙深化與閱讀方法',
    weekRangeLabel: 'W19–W35',
    dateRangeLabel: '2027/04/01–07/31',
    startWeek: 19,
    endWeek: 35,
    focusSummary: '韓文休眠後每週日文提升至 9 小時，強攻満点語彙漢字、紅字二刷、新完全讀解與聽解訓練。',
  },
  {
    id: 4,
    title: '第四期：題海實戰與全真模考 (W36–W54)',
    shortTitle: '第四期｜題海實戰與全真模考',
    weekRangeLabel: 'W36–W54',
    dateRangeLabel: '2027/08/01–12/05',
    startWeek: 36,
    endWeek: 54,
    focusSummary: '讀解全攻略、10 回計時模考、公式問題集全真演練與考前兩週錯題音檔總復盤。',
  },
];

export const BOOKS: BookItem[] = [
  {
    bookId: 'try-n2',
    title: '《TRY！從文法掌握 N2》',
    category: '文法',
    isRecommended: false,
    phase: 1,
    phaseLabel: '第一期',
    targetWeeks: 'W1–W6',
    startWeek: 1,
    endWeek: 6,
    description: '全 14 課快速喚醒 N2 句型接續與語感，每週推進 2–3 課。',
  },
  {
    bookId: '500-n2',
    title: '《新日檢完勝 500 題 N2》',
    category: '綜合題庫',
    isRecommended: false,
    phase: 1,
    phaseLabel: '第一期',
    targetWeeks: 'W1–W6',
    startWeek: 1,
    endWeek: 6,
    description: '全 20 回文字・語彙・文法快篩刷題，每週 3–4 回補足基礎缺口。',
  },
  {
    bookId: 'vocab-5000-n1',
    title: '《新日檢完勝単語 N1》',
    category: '單字語彙',
    isRecommended: false,
    phase: 2,
    phaseLabel: '第一期暖身／二期一輪／三期紅字二輪',
    targetWeeks: 'W5–W25',
    startWeek: 5,
    endWeek: 25,
    description: 'W5–W6 聽音暖身 Ch.1–2；W7–W18 14 大主題第一輪；W19–W25 第二輪紅字複習。',
  },
  {
    bookId: 'try-n1',
    title: '《TRY！從文法掌握 N1》',
    category: '文法',
    isRecommended: false,
    phase: 2,
    phaseLabel: '第二期',
    targetWeeks: 'W7–W18',
    startWeek: 7,
    endWeek: 18,
    description: '全 14 課系統化建立 N1 文法骨架，每週 1–2 課穩健消化。',
  },
  {
    bookId: 'tekiji-500',
    title: '《改訂版 適時適所 日本語表現句型 500》',
    category: '文法',
    isRecommended: false,
    phase: 2,
    phaseLabel: '第二期查詢／三期掃描',
    targetWeeks: 'W7–W35',
    startWeek: 7,
    endWeek: 35,
    description: '第二期作為 TRY N1 對照字典查詢；W23–W35 進行後半 N1 句型系統掃描與近義辨析。',
  },
  {
    bookId: '500-n1',
    title: '《新日檢完勝 500 題 N1》',
    category: '綜合題庫',
    isRecommended: false,
    phase: 2,
    phaseLabel: '第二期／三期收尾',
    targetWeeks: 'W7–W22',
    startWeek: 7,
    endWeek: 22,
    description: 'W7–W18 每週 2 回完成第 1–24 回；W19–W22 完成第 25–28 回與全書錯題收尾。',
  },
  {
    bookId: 'manten-goi',
    title: '《満点 語彙 N1》',
    category: '單字語彙',
    isRecommended: false,
    phase: 3,
    phaseLabel: '第三期',
    targetWeeks: 'W19–W35',
    startWeek: 19,
    endWeek: 35,
    description: '按場景與詞性深化 N1 高階語彙與副詞・擬態語，每週 1–1.5 單元至完食。',
  },
  {
    bookId: 'manten-kanji',
    title: '《満点 漢字 N1》',
    category: '漢字',
    isRecommended: false,
    phase: 3,
    phaseLabel: '第三期',
    targetWeeks: 'W19–W35',
    startWeek: 19,
    endWeek: 35,
    description: '鎖定 N1 音讀訓讀易錯與同音異字漢字題，每週 1–1.5 單元至完食。',
  },
  {
    bookId: 'shinkanzen-dokkai',
    title: '《新完全マスター読解 N1》',
    category: '讀解',
    isRecommended: true,
    phase: 3,
    phaseLabel: '第三期',
    targetWeeks: 'W19–W30',
    startWeek: 19,
    endWeek: 30,
    description: '建立 N1 結構化閱讀法：掌握筆者主張、對比轉折與選項消去邏輯。',
  },
  {
    bookId: 'drill-choukai',
    title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》',
    category: '聽解',
    isRecommended: false,
    phase: 3,
    phaseLabel: '第三期／四期 Shadowing',
    targetWeeks: 'W19–W49',
    startWeek: 19,
    endWeek: 49,
    description: 'W19–W35 每週 2 單元建立題型耳感；W36–W49 完食並搭配 Shadowing 跟讀內化語速。',
  },
  {
    bookId: 'zenkouryaku-dokkai',
    title: '《全攻略新日本語能力試驗 N1 讀解問題集》',
    category: '讀解',
    isRecommended: false,
    phase: 4,
    phaseLabel: '第四期',
    targetWeeks: 'W36–W46',
    startWeek: 36,
    endWeek: 46,
    description: '共 14 回實戰長短文訓練，W36–W46 每週 1.5 回強化速度與精準度。',
  },
  {
    bookId: 'zettai-goukaku-10',
    title: '《新日檢！絕對合格 10 回模擬考題 N1〔讀解・言語知識〕》',
    category: '模擬考題',
    isRecommended: false,
    phase: 4,
    phaseLabel: '第四期',
    targetWeeks: 'W40–W49',
    startWeek: 40,
    endWeek: 49,
    description: 'W40–W49 每週嚴格計時 110 分鐘完成 1 回筆試並建立時間分配節奏。',
  },
  {
    bookId: 'koushiki-n1',
    title: '《日本語能力試験 公式問題集 N1》',
    category: '模擬考題',
    isRecommended: true,
    phase: 4,
    phaseLabel: '第四期考前衝刺',
    targetWeeks: 'W50–W54',
    startWeek: 50,
    endWeek: 54,
    description: 'W50–W52 進行 110 分鐘筆試＋55 分鐘聽解官方全真模考，W53–W54 錯題與音檔總複習。',
  },
];

export const CLINICAL_SCHEDULE: ClinicalScheduleRow[] = [
  {
    day: '週一 Mon',
    clinicHours: '08:30–21:00（全日高工時門診）',
    energyLevel: '休養',
    morningPlan: '高工時臨床門診',
    noonPlan: '純粹用餐與閉目養神',
    afternoonPlan: '高工時臨床門診',
    eveningPlan: '完全休息不排書（僅可純音樂放鬆）',
    antiInterferenceRule: '高工時日強制斷網休憩，保護腦力與視力續航力。',
  },
  {
    day: '週二 Tue',
    clinicHours: '14:00–21:00（午晚診）',
    energyLevel: '中負荷',
    morningPlan: '09:00–12:00 數學／社會／根管文獻精讀',
    noonPlan: '午休前 20 分鐘基礎韓文（W1–W18）／W19 起改日文單字',
    afternoonPlan: '臨床門診',
    eveningPlan: '21:30 後洗漱休息（可選擇聽 10 分鐘日文音檔）',
    antiInterferenceRule: '午休單一語言（韓文）完畢即切換臨床工作，避免同時背日韓單字。',
  },
  {
    day: '週三 Wed',
    clinicHours: '休診（全日進修日）',
    energyLevel: '黃金進度',
    morningPlan: '09:00–12:00 日文 N1 主戰場（文法／讀解／模考）',
    noonPlan: '午休 60 分鐘（不碰韓文，保持上午日語腦純度）',
    afternoonPlan: '13:30–16:30 數學與社會科單元推進＋文獻 3 篇',
    eveningPlan: '19:00–21:00 日文題庫刷題＋聽解練習',
    antiInterferenceRule: '週三定為「純日語進修日」，全面隔離韓語輸入，避免語彙與助詞混淆。',
  },
  {
    day: '週四 Thu',
    clinicHours: '14:00–21:00（午晚診）',
    energyLevel: '中負荷',
    morningPlan: '09:00–12:00 數學／社會／根管文獻精讀',
    noonPlan: '午休 20 分鐘基礎韓文情境與 Shadowing（W1–W18）',
    afternoonPlan: '臨床門診',
    eveningPlan: '21:30 後復盤當日錯題筆記 15 分鐘即休息',
    antiInterferenceRule: '上午處理中文邏輯（數學／社會／英文文獻），中午才做韓文短時高頻複習。',
  },
  {
    day: '週五 Fri',
    clinicHours: '09:00–17:00（早午診）',
    energyLevel: '高負荷',
    morningPlan: '臨床門診',
    noonPlan: '臨床空檔伸展休息',
    afternoonPlan: '臨床門診',
    eveningPlan: '19:30–22:00 日文 N1 單字語彙＋根管治療文獻 2 篇',
    antiInterferenceRule: '診後大腦疲勞適合做「日文單字聽音／複習」與「專業熟悉度高的文獻閱讀」。',
  },
  {
    day: '週六 Sat',
    clinicHours: '09:30–12:30（早診）',
    energyLevel: '中負荷',
    morningPlan: '08:30–09:00 診前韓文 20 分鐘（W1–W18）／W19 起日文聽解',
    noonPlan: '12:30 下診午餐休息',
    afternoonPlan: '14:00–17:00 社會科（地理／歷史／公民）單元完食推進',
    eveningPlan: '19:30–21:30 日文 N1 文法／讀解複習與進度補齊',
    antiInterferenceRule: '韓文（早診前）與日文（晚間）相隔超過 10 小時，徹底防止雙語干擾。',
  },
  {
    day: '週日 Sun',
    clinicHours: '休診（半日黃金＋傍晚關機）',
    energyLevel: '黃金進度',
    morningPlan: '09:00–12:00 日文 N1 週總結／計時模考／聽解弱點修正',
    noonPlan: '午餐＋徹底放鬆',
    afternoonPlan: '13:30–16:00 根管文獻收尾達標（7–8 篇）＋下週計畫預覽',
    eveningPlan: '16:00 後強制關機休息（禁止任何讀書排程）',
    antiInterferenceRule: '週日 16:00 後強制關機，確保週一 08:30–21:00 高工時門診擁有飽滿體力。',
  },
];

function formatDateYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

/**
 * 嚴格校準 W1 (2026/11/17) 至 W54 (2027/12/05) 共 384 天，零缺漏、不重疊：
 * - 第一期 W1–W6   (45 天): 2026/11/17 – 2026/12/31 -> 長度 [7,7,7,8,8,8]
 * - 第二期 W7–W18  (90 天): 2027/01/01 – 2027/03/31 -> 長度 6x8 + 6x7
 * - 第三期 W19–W35 (122 天): 2027/04/01 – 2027/07/31 -> 長度 14x7 + 3x8
 * - 第四期 W36–W54 (127 天): 2027/08/01 – 2027/12/05 -> 長度 13x7 + 6x6
 */
const WEEK_LENGTHS: number[] = [
  // Phase 1 (W1-W6 = 45 days)
  7, 7, 7, 8, 8, 8,
  // Phase 2 (W7-W18 = 90 days)
  8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7,
  // Phase 3 (W19-W35 = 122 days)
  7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 7, 8, 7, 7, 7, 7, 8,
  // Phase 4 (W36-W54 = 127 days)
  7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6,
];

function computeWeekDateRanges(): Array<{ startDate: string; endDate: string; dateRange: string }> {
  let cursor = new Date(2026, 10, 17); // 2026/11/17
  return WEEK_LENGTHS.map((len) => {
    const start = cursor;
    const end = addDays(start, len - 1);
    cursor = addDays(end, 1);
    const startDate = formatDateYMD(start);
    const endDate = formatDateYMD(end);
    return {
      startDate,
      endDate,
      dateRange: `${startDate}–${endDate.slice(5)}`,
    };
  });
}

const DATE_RANGES = computeWeekDateRanges();

interface RawTaskSeed {
  subject: SubjectId;
  title: string;
  bookId?: string;
}

interface RawWeekSeed {
  theme: string;
  endoTarget: number;
  milestoneTag?: string;
  tasks: RawTaskSeed[];
}

const RAW_WEEK_SEEDS: RawWeekSeed[] = [
  // ======================== 第一期：W1–W6 (2026/11/17–12/31) ========================
  {
    theme: '雙語起跑與 N2 喚醒啟動週',
    endoTarget: 7,
    milestoneTag: '計畫起跑日 11/17',
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 1–3 課（動詞變化與日常接續複習）' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 1–4 回（文字語彙與文法快篩）' },
      { subject: 'korean', title: '韓文字母 40 音①：基本母音 10 個＋複合母音 11 個發音與筆順' },
      { subject: 'math', title: '《對話式高一上數學》第 1 章 1-1 實數（有理數、無理數與絕對值）' },
      { subject: 'geo1', title: '《滿級分地理(上)》單元 1 地理學傳統與視野、單元 2 地圖與 GIS' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：化學沖洗液濃度與滲透機制）' },
    ],
  },
  {
    theme: 'N2 文法推進與收尾音拼讀週',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 4–5 課（時間與條件句型統整）' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 5–8 回（錯題詞性標註與筆記）' },
      { subject: 'korean', title: '韓文字母 40 音②：基本子音 14 個、雙子音 5 個＋收尾音（받침）拼讀' },
      { subject: 'math', title: '《對話式高一上數學》第 1 章 1-2 式的運算（乘法公式與分式根式）' },
      { subject: 'geo1', title: '《滿級分地理(上)》單元 3 地形系統、單元 4 氣候系統' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：超音波活化沖洗效率比較）' },
    ],
  },
  {
    theme: '萬用敬語起步與數與式完食週',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 6–8 課（原因、推測與比較表現）' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 9–11 回（近義副詞區辨）' },
      { subject: 'korean', title: '萬用敬語句尾 `-아요/어요` 規則變化與高頻動詞 30 組朗讀' },
      { subject: 'math', title: '《對話式高一上數學》第 1 章 1-3 指數與常用對數（第 1 章完食）' },
      { subject: 'geo1', title: '《滿級分地理(上)》單元 5 人口與環境負載力、單元 6 聚落交通與都市化' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：NiTi 旋轉銼抗疲勞強度研究）' },
    ],
  },
  {
    theme: '地理(上)全冊完食與直線開篇週',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 9–10 課（授受與敬語基礎銜接）' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 12–14 回（複合動詞加強）' },
      { subject: 'korean', title: '請求句尾 `-(으)세요` 與否定表達 `안`／`-지 않아요` 實戰造句' },
      { subject: 'math', title: '《對話式高一上數學》第 2 章 2-1 直線方程式（斜率與點斜式）' },
      { subject: 'geo1', title: '《滿級分地理(上)》單元 7 第一級產業、單元 8 第二級產業、單元 9 第三級產業與知識經濟（完食）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：根管工作長度電子根尖定位精準度）' },
    ],
  },
  {
    theme: 'N1 單字聽音暖身與地理(下)啟程週',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 11–12 課（語氣助詞與強調句型）' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 15–17 回' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》Ch.1 聽音暖身（通勤／診間空檔先聽熟語音）' },
      { subject: 'korean', title: '漢字詞數字系統：年月日、電話號碼、韓元金額與結帳報價聽辨' },
      { subject: 'math', title: '《對話式高一上數學》第 2 章 2-2 直線的應用（兩線關係與線性規劃基礎）' },
      { subject: 'geo2', title: '《滿級分地理(下)》單元 10 世界體系、單元 11 世界舞臺中的臺灣、單元 12 東亞文化圈' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：Bioceramic 根管封填糊劑生物相容性）' },
    ],
  },
  {
    theme: '第一期封關：N2 教材全數完食',
    endoTarget: 8,
    milestoneTag: '第一期收官 12/31',
    tasks: [
      { subject: 'n1', bookId: 'try-n2', title: '《TRY！從文法掌握 N2》第 13–14 課完食＋N2 總錯題收斂' },
      { subject: 'n1', bookId: '500-n2', title: '《新日檢完勝 500 題 N2》第 18–20 回全書完食' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》Ch.2 聽音暖身＋音檔語感熟悉' },
      { subject: 'korean', title: '固有詞數字系統：點餐份數（인분）、個數單位詞與整點時間表達' },
      { subject: 'math', title: '《對話式高一上數學》第 2 章 2-3 圓與直線的關係（第 2 章完食）' },
      { subject: 'geo2', title: '《滿級分地理(下)》單元 13A 東南亞、單元 13B 南亞、單元 14 澳紐' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（12 月目標 30 篇達成檢核）' },
    ],
  },

  // ======================== 第二期：W7–W18 (2027/01/01–03/31) ========================
  {
    theme: 'N1 正軌啟動與多項式切入週',
    endoTarget: 7,
    milestoneTag: '2027 新年 N1 啟動',
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.1–2 主題精讀與紅字標記' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 1 課（文語調與新聞書面句型）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 1–2 回（熟悉 N1 題型難度）' },
      { subject: 'korean', title: '雙數字時間日期混合運用：幾點幾分（고유어＋한자어）與餐廳營業詢問' },
      { subject: 'math', title: '《對話式高一上數學》第 3 章 3-1 多項式的運算與應用（除法原理與餘式定理）' },
      { subject: 'geo2', title: '《滿級分地理(下)》單元 15 伊斯蘭世界（西亞北非）、單元 16 歐洲文明、單元 17 美國' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：CBCT 於根管遺漏根管診斷效能）' },
    ],
  },
  {
    theme: '數學與地理(下)第一輪收官週',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.3 主題精讀＋前兩章快速複習' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 2 課＋搭配《適時適所 500》對照查詢相似表現' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》建立 TRY N1 第 1–2 課對照索引標籤' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 3–4 回' },
      { subject: 'korean', title: 'W1–W7 韓語基礎敬語＋雙數字系統綜合口說檢測與聽辨練習' },
      { subject: 'math', title: '《對話式高一上數學》3-2 簡單多項式函數及其圖形、3-3 多項式不等式（高一上完食）' },
      { subject: 'geo2', title: '《滿級分地理(下)》單元 18A 中南美洲、單元 18B 漠南非洲、單元 19 全球化（地理下完食）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：顯微根尖手術骨缺損癒合預後）' },
    ],
  },
  {
    theme: '歷史啟動與韓文情境實戰①機場篇',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.4 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 3 課（對比、極端舉例句型）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 5–6 回' },
      { subject: 'korean', title: '五大實戰情境①：仁川機場入境、巴士／AREX 搭車與 T-money 儲值' },
      { subject: 'history', title: '《滿級分歷史》第一篇臺灣史：主題 1 多元族群社會、主題 2 現代國家興起' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：裂齒症 Cracked Tooth 診斷與治療決策）' },
    ],
  },
  {
    theme: '東亞史銜接與韓文情境②餐廳篇',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.5 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 4 課＋《適時適所 500》對照查詢' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》查核 TRY N1 第 3–4 課容易混用句型' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 7–8 回' },
      { subject: 'korean', title: '五大實戰情境②：韓國餐廳點餐、人數告知、去冰／不辣與結帳用語' },
      { subject: 'history', title: '《滿級分歷史》臺灣史主題 3 經濟與文化多樣性 ＋ 東亞史主題 4 國家與社會' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（1 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: 'TRY N1 雙課加速與韓文情境③咖啡廳購物',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.6 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 5–6 課（時間同時性與瞬間表現）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 9–10 回' },
      { subject: 'korean', title: '五大實戰情境③：首爾咖啡廳客製點單、藥妝購物詢問與退稅對話' },
      { subject: 'history', title: '《滿級分歷史》第二篇中國與東亞史：主題 5 人群移動與交流、主題 6 現代化歷程' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根管鈣化導航技術 Guided Endodontics）' },
    ],
  },
  {
    theme: '單字雙章推進與韓文情境④問路篇',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.7–8 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 7 課＋《適時適所 500》對照查詢' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》對照複習 N1 條件與逆接句型' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 11–12 回' },
      { subject: 'korean', title: '五大實戰情境④：街頭問路、方位詞彙與計程車地址導航溝通' },
      { subject: 'history', title: '《滿級分歷史》第三篇世界史：主題 7 歐洲文化與現代世界、主題 8 文化交會與多元世界' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：根管內器械分離取出策略比較）' },
    ],
  },
  {
    theme: '滿級分歷史全冊完食與年會自我介紹',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.9 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 8 課（程度、限定與範圍文法）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 13–14 回' },
      { subject: 'korean', title: '五大實戰情境⑤：韓國根管年會禮貌韓語自我介紹、交換名片與致謝寒暄' },
      { subject: 'history', title: '《滿級分歷史》世界史主題 9 世界變遷與現代性 ＋ 全冊跨時期總複習（完食）' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：韓國學者發表之再生根管治療長期追蹤）' },
    ],
  },
  {
    theme: '滿級分公民啟動與韓文情境總整合',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.10 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 9 課＋《適時適所 500》對照查詢' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》查核 TRY N1 第 7–9 課核心語氣差異' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 15–16 回' },
      { subject: 'korean', title: '五大實戰情境總複習與個人常用韓語句卡整理' },
      { subject: 'civics', title: '《滿級分公民》第一篇社會：主題 1 公民身分與人權、主題 2 多元文化與媒體識讀、主題 3 社會階層與公平正義' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（2 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '公民政治篇與韓文自然語速跟讀①',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.11 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 10–11 課（評論、感慨與強調句型）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 17–18 回' },
      { subject: 'korean', title: '自然語速對話 Shadowing 跟讀訓練①：交通／餐廳高頻對話模仿' },
      { subject: 'civics', title: '《滿級分公民》第二篇政治：主題 4 國家主權與民主、主題 5 政府體制與選舉、主題 6 公民參與與國際組織' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：牙本質小管封閉與微滲漏評估方法）' },
    ],
  },
  {
    theme: '公民法律篇與韓文自然語速跟讀②',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.12 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 12 課＋《適時適所 500》對照查詢' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》對照整理意志・義務・禁止 N1 表現' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 19–20 回' },
      { subject: 'korean', title: '自然語速對話 Shadowing 跟讀訓練②：購物／問路／年會應對連音修正' },
      { subject: 'civics', title: '《滿級分公民》第三篇法律：主題 7 憲法與人權、主題 8 行政法與救濟、主題 9 民法刑法與紛爭解決' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：Laser / PIPS 光活化根管消毒系統回顧）' },
    ],
  },
  {
    theme: '公民經濟篇與年會手機小抄預演',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.13 主題精讀' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 13 課（推量與傳聞高級語氣）' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 21–22 回' },
      { subject: 'korean', title: '打造個人專屬韓國根管年會／首爾旅遊手機備忘小抄（分類標籤＋發音備註）' },
      { subject: 'civics', title: '《滿級分公民》第四篇經濟：主題 10 資源分配與市場機能、主題 11 市場失靈與政府干預、主題 12 總體經濟指標與國際貿易' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：韓國年會前瞻議題與大會摘要預習）' },
    ],
  },
  {
    theme: '第二期封關：韓國根管年會實戰與社會數學全完食',
    endoTarget: 8,
    milestoneTag: '03/31 韓國根管年會',
    tasks: [
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第一輪 Ch.14 主題精讀完食' },
      { subject: 'n1', bookId: 'try-n1', title: '《TRY！從文法掌握 N1》第 14 課全書完食＋《適時適所 500》階段複查' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》完成 TRY N1 全 14 課對照歸納' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 23–24 回完成（前 24 回達標）' },
      { subject: 'korean', title: '2027/03/31 韓國根管年會實戰應用總演練（會後韓文轉為休眠）' },
      { subject: 'civics', title: '《滿級分公民》全冊跨領域總複習與跨科觀念收斂（完食）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（3 月目標 30 篇達成＋年會筆記收斂）' },
    ],
  },

  // ======================== 第三期：W19–W35 (2027/04/01–07/31) ========================
  {
    theme: '韓文休眠・日文提升至每週 9 小時全面強攻',
    endoTarget: 7,
    milestoneTag: '日文 9h/週強攻啟動',
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 1（人際情感與性格形容語彙）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 1（高頻音讀漢字組與讀音辨析）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.1–2' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 25–26 回' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 1：文章構造與段落要旨掌握' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 1–2（課題理解基礎）' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根管再治療失敗原因長期流病統計）' },
    ],
  },
  {
    theme: '語彙漢字雙軌推進與完勝 500 題 N1 完食',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 2–3（動作態樣與抽象概念語彙）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 2–3（訓讀難讀字彙與複合名詞）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.3–4' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》第 27–28 回完食' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 2：指示詞還原與接續詞判讀' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 3–4' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：熱牙膠垂直加壓 vs 單尖法臨床追蹤）' },
    ],
  },
  {
    theme: '完勝 500 題 N1 錯題收尾與讀解邏輯深化',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 4（社會與文化高階名詞）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 4（同音異義漢字區辨）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.5–6' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》全書錯題與弱點二刷收尾①' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 3：作者主張與理由定位技巧' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 5–6' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根管治療後牙冠保護與箍效應 Ferrule）' },
    ],
  },
  {
    theme: '完勝 500 題 N1 徹底歸零與副詞攻堅',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 5–6（頻出副詞與擬態擬聲語）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 5–6（接頭接尾漢字讀音規則）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.7–8' },
      { subject: 'n1', bookId: '500-n1', title: '《新日檢完勝 500 題 N1》全書錯題與弱點二刷徹底收尾②' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 4：比喻與反問句弦外之音' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 7–8（ポイント理解）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（4 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '適時適所 500 後半 N1 句型系統掃描啟動',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 7（複合動詞精選集）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 7（偏旁聯想記憶組）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.9–10' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描①：時間與界限表現' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 5：短篇評論文限時快讀' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 9–10' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：活髓保存療法 Vital Pulp Therapy 指徵）' },
    ],
  },
  {
    theme: 'N1 中長文結構與句型掃描②',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 8–9（和語動詞與漢語サ變動詞）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 8–9（形似易混漢字對比）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.11–12' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描②：原因、根據與契機' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 6：中文（中篇）因果對比架構拆解' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 11–12' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：牙髓幹細胞與組織工程再生進展）' },
    ],
  },
  {
    theme: '完勝単語 N1 紅字二輪完食週',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 10（自然、經濟與醫療相關語彙）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 10（特殊熟字訓與連濁變化）' },
      { subject: 'n1', bookId: 'vocab-5000-n1', title: '《新日檢完勝単語 N1》第二輪紅字複習 Ch.13–14 全書紅字總複習完食' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描③：條件與假設高階表現' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 7：幹擾選項四大陷阱辨識' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 13–14（概要理解）' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：穿孔修補 Perforation Repair 材料比較）' },
    ],
  },
  {
    theme: '語彙漢字中段加速與即時應答聽解',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 11–12（類義語與外來語用法）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 11–12（高難度熟語讀音實戰）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描④：逆接與讓步表現' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 8：中文実戰演練與錯題分析' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 15–16（即時應答強化）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（5 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '長文抽象論說與句型掃描⑤',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 13（い形容詞與な形容詞細微語感）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 13（字形選擇易混淆題型）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑤：程度、比較與伴隨' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 9：長篇論說文脈絡筆記法' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 17–18' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：牙周與根管合併病灶 Endo-Perio 診治）' },
    ],
  },
  {
    theme: '統合理解雙文對比與聽解推進',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 14–15（慣用句與語彙搭配コロケーション）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 14–15（多音字脈絡判斷）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑥：話題限定與主張強調' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 10：A/B 雙篇統合理解異同比較' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 19–20（統合理解長文）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：數位導板與 3D 列印於牙髓治療應用）' },
    ],
  },
  {
    theme: '情報檢索秒殺法與句型掃描⑦',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 16（語形成：前綴後綴推測詞義）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 16（二字漢語動詞搭配）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑦：評價、觀點與立場' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 11：情報檢索（資訊查找題）速解法' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 21–22' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：全身性疾病與根管治療癒合率關聯）' },
    ],
  },
  {
    theme: '新完全マスター読解 N1 完食收官',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 17–18（近義詞語氣與適用對象辨析）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 17–18（四字熟語與慣用漢字）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑧：心情、感嘆與強調文末' },
      { subject: 'n1', bookId: 'shinkanzen-dokkai', title: '【推薦購入】《新完全マスター読解 N1》單元 12＋實戰模擬回完食' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 23–24' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（6 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '讀解方法論轉化與句子重組強化',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 19（實戰綜合題組與高難度名詞）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 19（總複習測驗①）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑨：文語表現與敬語高階體系' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 25–26' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根管疼痛控制與局部麻醉補充技術）' },
    ],
  },
  {
    theme: '語彙漢字收尾攻堅與聽解節奏定型',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 20–21（詞彙用法題實戰演練）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 20–21（總複習測驗②與錯字清查）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑩：時間前後與狀態維持' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 27–28' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：MTA 與新型生物陶瓷於齒內外傷應用）' },
    ],
  },
  {
    theme: '文末語氣總梳理與聽解精聽筆記',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 22（核心詞彙錯題二刷整理）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 22（容易遺漏音讀字複檢）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑪：推測、傳聞與委婉否定' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 29–30' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：超音波震盪對牙本質微裂紋影響檢討）' },
    ],
  },
  {
    theme: '第三期倒數第二週：語彙漢字總複檢',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》單元 23–24（模擬測驗回合與弱點收斂）' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》單元 23–24（模擬測驗回合與音訓總查）' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 句型掃描⑫：書面語接續詞全總覽' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 31–32' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：齒根外吸收與內吸收 CBCT 鑑別診斷）' },
    ],
  },
  {
    theme: '第三期封關：語彙・漢字・句型掃描全完食',
    endoTarget: 8,
    milestoneTag: '第三期收官 07/31',
    tasks: [
      { subject: 'n1', bookId: 'manten-goi', title: '《満点 語彙 N1》最後單元總複習完食' },
      { subject: 'n1', bookId: 'manten-kanji', title: '《満点 漢字 N1》最後單元總複習完食' },
      { subject: 'n1', bookId: 'tekiji-500', title: '《改訂版 適時適所 日本語表現句型 500》N1 後半句型掃描⑬ 完食結案' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》單元 33–34' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（7 月目標 30 篇達成檢核）' },
    ],
  },

  // ======================== 第四期：W36–W54 (2027/08/01–12/05) ========================
  {
    theme: '題海實戰開局：全攻略讀解問題集啟動',
    endoTarget: 7,
    milestoneTag: '第四期題海實戰啟動',
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 1–2 回（短篇與中篇實戰計時）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進①＋音檔 Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：抗生素於根管急性感染使用實證指引）' },
    ],
  },
  {
    theme: '讀解手感維持與 Shadowing 聽解跟讀',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 3 回（精讀長文結構剖析）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進②＋語速 Shadowing 15 分鐘/日' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：奈米粒子載體根管內抗菌劑新進展）' },
    ],
  },
  {
    theme: '讀解雙回強化與聽解長篇專注訓練',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 4–5 回' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進③＋統合理解做筆記練習' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：C 形根管系統解剖變異亞洲族群統計）' },
    ],
  },
  {
    theme: '讀解半程檢核與模考前暖身',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 6 回＋前 6 回錯題選項歸因' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進④＋Shadowing 跟讀複習' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（8 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '絕對合格 10 回模擬考第 1 回計時實戰啟動',
    endoTarget: 7,
    milestoneTag: '110 分鐘計時模考啟動',
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 7–8 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 1 回（嚴格計時 110 分鐘完成＋全題精析）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑤＋Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：牙髓腔內漂白術與齒頸部外吸收風險）' },
    ],
  },
  {
    theme: '雙線刷題：讀解第 9 回＋模擬考第 2 回',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 9 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 2 回（計時 110 分鐘＋作答時間紀錄）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑥＋即時應答聽寫' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：低能量雷射於根管術後疼痛緩解）' },
    ],
  },
  {
    theme: '雙線刷題：讀解第 10 回＋模擬考第 3 回',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 10 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 3 回（計時 110 分鐘＋錯題回查單字書）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑦＋Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根尖病變癒合人工智慧影像判讀）' },
    ],
  },
  {
    theme: '雙線刷題：讀解第 11 回＋模擬考第 4 回',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 11 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 4 回（計時 110 分鐘＋配速修正）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑧＋關鍵轉折詞聽辨' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（9 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '雙線刷題：讀解第 12 回＋模擬考第 5 回半程檢討',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 12 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 5 回（計時 110 分鐘＋前 5 回得分曲線分析）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑨＋Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：阻生牙齒移植與自體牙齒再植成功因子）' },
    ],
  },
  {
    theme: '雙線刷題：讀解第 13 回＋模擬考第 6 回',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 13 回' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 6 回（計時 110 分鐘＋長文段落摘要訓練）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑩＋Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：根管內生物膜耐藥菌株去除實驗）' },
    ],
  },
  {
    theme: '全攻略讀解 14 回完食＋模擬考第 7 回',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'zenkouryaku-dokkai', title: '《全攻略新日本語能力試驗 N1 讀解問題集》第 14 回完食＋全書錯題總結' },
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 7 回（計時 110 分鐘＋言語知識 35 分鐘鎖時）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑪＋錯題逐字聽寫' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：彎曲根管預備與階梯／穿孔預防）' },
    ],
  },
  {
    theme: '模擬考第 8 回＋聽解高頻錯題精聽',
    endoTarget: 8,
    tasks: [
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 8 回（計時 110 分鐘＋時間餘裕訓練）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑫＋Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（10 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '模擬考第 9 回＋聽解全書即將完食',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 9 回（計時 110 分鐘＋讀解失分題型歸類）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》實戰推進⑬＋全書錯題彙整' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：根管封填超充對神經損傷預防與處理）' },
    ],
  },
  {
    theme: '絕對合格 10 回模考＆聽解全書完食',
    endoTarget: 8,
    milestoneTag: '10 回模考全完食',
    tasks: [
      { subject: 'n1', bookId: 'zettai-goukaku-10', title: '《絕對合格 10 回模擬考題 N1》第 10 回完食（10 回總結報告與得分區間確認）' },
      { subject: 'n1', bookId: 'drill-choukai', title: '《ドリル＆ドリル 日本語能力試驗 N1 聽解》完食＋重點音檔 Shadowing 跟讀' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（本週焦點：超音波顯微根管鈣化通暢成功率回顧）' },
    ],
  },
  {
    theme: '公式問題集全真模考①（110 分筆試＋55 分聽解）',
    endoTarget: 7,
    milestoneTag: '官方公式模考①',
    tasks: [
      { subject: 'n1', bookId: 'koushiki-n1', title: '【推薦購入】《日本語能力試験 公式問題集 N1》第 1 回全真模考（110 分筆試＋55 分聽解連考）' },
      { subject: 'n1', bookId: 'koushiki-n1', title: '公式問題集第 1 回逐題檢討：調整言語知識／讀解配速與休息節奏' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（維持學術敏感度，不佔用考前模考核心時段）' },
    ],
  },
  {
    theme: '公式問題集全真模考②（時間配速定案）',
    endoTarget: 8,
    milestoneTag: '官方公式模考②',
    tasks: [
      { subject: 'n1', bookId: 'koushiki-n1', title: '【推薦購入】《日本語能力試験 公式問題集 N1》第 2 回／加演全真計時模考（比照正式考場作息）' },
      { subject: 'n1', bookId: 'koushiki-n1', title: '公式問題集錯題拆解＋確認各題型停損時間點（言語知識 ≤35 分、讀解 ≥70 分）' },
      { subject: 'endo', title: '根管治療文獻精讀 8 篇（11 月目標 30 篇達成檢核）' },
    ],
  },
  {
    theme: '公式問題集三刷複盤與高頻弱點清單收斂',
    endoTarget: 7,
    tasks: [
      { subject: 'n1', bookId: 'koushiki-n1', title: '【推薦購入】《日本語能力試験 公式問題集 N1》全真錯題二刷＋官方聽解題幹語氣精聽' },
      { subject: 'n1', bookId: 'koushiki-n1', title: '整合 10 回模擬考與公式問題集之「必殺文法・易混漢字・讀解陷阱」考前 3 頁筆記' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：再生根管治療血凝塊與支架臨床新訊）' },
    ],
  },
  {
    theme: '考前兩週①：錯題總清倉與高頻音檔維持耳感',
    endoTarget: 7,
    milestoneTag: '考前兩週總復盤',
    tasks: [
      { subject: 'n1', bookId: 'koushiki-n1', title: '考前錯題總複習①：《完勝単語 N1》紅字＋《満点 語彙/漢字》標記錯題全數過目' },
      { subject: 'n1', bookId: 'koushiki-n1', title: '考前音檔總複習①：重聽《公式問題集》與《ドリル＆ドリル》錯題音檔保持 N1 語速耳感' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（本週焦點：輕量快讀高影響力期刊最新臨床綜述）' },
    ],
  },
  {
    theme: '考前最終週：身心調適與 12/05 日檢 N1 上場決戰',
    endoTarget: 7,
    milestoneTag: '12/05 日檢 N1 考試日',
    tasks: [
      { subject: 'n1', bookId: 'koushiki-n1', title: '考前錯題總複習②：僅複習 3 頁考前精華筆記，維持 12 分鐘短文閱讀手感' },
      { subject: 'n1', bookId: 'koushiki-n1', title: '考前音檔總複習②：考試前一日早睡調整作息，2027/12/05 自信完成 JLPT N1 檢定' },
      { subject: 'endo', title: '根管治療文獻精讀 7 篇（考後輕鬆完成本週文獻收尾，圓滿達成 54 週計畫）' },
    ],
  },
];

function getPhaseForWeek(week: number): PhaseId {
  if (week <= 6) return 1;
  if (week <= 18) return 2;
  if (week <= 35) return 3;
  return 4;
}

export const WEEKS_DATA: WeekDefinition[] = RAW_WEEK_SEEDS.map((seed, idx) => {
  const week = idx + 1;
  const phase = getPhaseForWeek(week);
  const dates = DATE_RANGES[idx];

  // Track per-subject index within the week to build stable, deterministic taskIds
  const subjectCounters: Partial<Record<SubjectId, number>> = {};

  const tasks: TaskDefinition[] = seed.tasks.map((t) => {
    const count = (subjectCounters[t.subject] ?? 0) + 1;
    subjectCounters[t.subject] = count;
    const taskId = `w${String(week).padStart(2, '0')}-${t.subject}-${count}`;
    return {
      taskId,
      week,
      phase,
      subject: t.subject,
      title: t.title,
      bookId: t.bookId,
    };
  });

  return {
    week,
    phase,
    startDate: dates.startDate,
    endDate: dates.endDate,
    dateRange: dates.dateRange,
    theme: seed.theme,
    endoTarget: seed.endoTarget,
    isKoreanActive: week <= 18,
    milestoneTag: seed.milestoneTag,
    tasks,
  };
});

export const ALL_TASKS: TaskDefinition[] = WEEKS_DATA.flatMap((w) => w.tasks);

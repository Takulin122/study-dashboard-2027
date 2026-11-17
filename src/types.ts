export type SubjectId =
  | 'n1'
  | 'korean'
  | 'geo1'
  | 'geo2'
  | 'history'
  | 'civics'
  | 'math'
  | 'endo';

export type PhaseId = 1 | 2 | 3 | 4;

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  shortName: string;
  color: string;
  bgTint: string;
  borderTint: string;
  badgeText: string;
  scopeLabel: string;
  description: string;
}

export interface PhaseMeta {
  id: PhaseId;
  title: string;
  shortTitle: string;
  weekRangeLabel: string;
  dateRangeLabel: string;
  startWeek: number;
  endWeek: number;
  focusSummary: string;
}

export interface BookItem {
  bookId: string;
  title: string;
  category: '文法' | '單字語彙' | '漢字' | '讀解' | '聽解' | '綜合題庫' | '模擬考題';
  isRecommended: boolean;
  phase: PhaseId;
  phaseLabel: string;
  targetWeeks: string;
  startWeek: number;
  endWeek: number;
  description: string;
}

export interface TaskDefinition {
  taskId: string;
  week: number;
  phase: PhaseId;
  subject: SubjectId;
  title: string;
  bookId?: string;
}

export interface WeekDefinition {
  week: number;
  phase: PhaseId;
  startDate: string;
  endDate: string;
  dateRange: string;
  theme: string;
  endoTarget: number;
  isKoreanActive: boolean;
  milestoneTag?: string;
  tasks: TaskDefinition[];
}

export interface TaskState {
  completed: boolean;
  updatedAt: number;
}

export interface WeekMetaState {
  endoCount: number;
  endoTarget: number;
  note: string;
  updatedAt: number;
}

export interface AppState {
  tasks: Record<string, TaskState>;
  weeklyMeta: Record<number, WeekMetaState>;
  gasUrl: string;
  lastSyncedAt: number | null;
  pendingSync: boolean;
}

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'unconfigured';

export interface SyncPayloadTask {
  taskId: string;
  week: number;
  phase: PhaseId;
  subject: SubjectId;
  title: string;
  completed: boolean;
  updatedAt: number;
}

export interface SyncPayloadWeeklyMeta {
  week: number;
  dateRange: string;
  endoCount: number;
  endoTarget: number;
  note: string;
  updatedAt: number;
}

export interface SyncPayloadBookSummary {
  bookId: string;
  title: string;
  category: string;
  isRecommended: boolean;
  targetWeeks: string;
  progressPercent: number;
  updatedAt: number;
}

export interface SyncRequestPayload {
  action: 'sync' | 'init';
  clientTime: number;
  tasks: SyncPayloadTask[];
  weeklyMeta: SyncPayloadWeeklyMeta[];
  booksSummary: SyncPayloadBookSummary[];
}

export interface SyncResponsePayload {
  ok: boolean;
  serverTime: number;
  message?: string;
  tasks?: Array<{
    taskId: string;
    completed: boolean;
    updatedAt: number;
  }>;
  weeklyMeta?: Array<{
    week: number;
    endoCount: number;
    endoTarget: number;
    note: string;
    updatedAt: number;
  }>;
}

export interface ClinicalScheduleRow {
  day: string;
  clinicHours: string;
  energyLevel: '休養' | '高負荷' | '中負荷' | '黃金進度';
  morningPlan: string;
  noonPlan: string;
  afternoonPlan: string;
  eveningPlan: string;
  antiInterferenceRule: string;
}

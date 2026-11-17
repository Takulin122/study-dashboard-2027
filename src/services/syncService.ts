import { ALL_TASKS, BOOKS, WEEKS_DATA } from '../data/curriculum';
import {
  AppState,
  SyncPayloadBookSummary,
  SyncPayloadTask,
  SyncPayloadWeeklyMeta,
  SyncRequestPayload,
  SyncResponsePayload,
  TaskState,
  WeekMetaState,
} from '../types';

const STORAGE_KEY = 'study_dashboard_2027_state_v1';

export function createDefaultState(): AppState {
  return {
    tasks: {},
    weeklyMeta: {},
    gasUrl: '',
    lastSyncedAt: null,
    pendingSync: false,
  };
}

export function loadLocalState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      tasks: parsed.tasks && typeof parsed.tasks === 'object' ? parsed.tasks : {},
      weeklyMeta:
        parsed.weeklyMeta && typeof parsed.weeklyMeta === 'object' ? parsed.weeklyMeta : {},
      gasUrl: typeof parsed.gasUrl === 'string' ? parsed.gasUrl : '',
      lastSyncedAt: typeof parsed.lastSyncedAt === 'number' ? parsed.lastSyncedAt : null,
      pendingSync: Boolean(parsed.pendingSync),
    };
  } catch {
    return createDefaultState();
  }
}

export function saveLocalState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota issues silently while keeping in-memory state intact
  }
}

export function getTaskCompleted(state: AppState, taskId: string): boolean {
  return Boolean(state.tasks[taskId]?.completed);
}

export function getWeekMeta(state: AppState, week: number): WeekMetaState {
  const def = WEEKS_DATA[week - 1];
  const existing = state.weeklyMeta[week];
  return {
    endoCount: existing?.endoCount ?? 0,
    endoTarget: existing?.endoTarget ?? def?.endoTarget ?? 7,
    note: existing?.note ?? '',
    updatedAt: existing?.updatedAt ?? 0,
  };
}

export function computeBookProgressMap(state: AppState): Record<string, number> {
  const progressMap: Record<string, number> = {};
  for (const book of BOOKS) {
    const bookTasks = ALL_TASKS.filter((t) => t.bookId === book.bookId);
    if (bookTasks.length === 0) {
      progressMap[book.bookId] = 0;
      continue;
    }
    const doneCount = bookTasks.filter((t) => Boolean(state.tasks[t.taskId]?.completed)).length;
    progressMap[book.bookId] = Math.round((doneCount / bookTasks.length) * 100);
  }
  return progressMap;
}

export function buildSyncPayload(
  state: AppState,
  action: 'sync' | 'init'
): SyncRequestPayload {
  const now = Date.now();
  const bookProgress = computeBookProgressMap(state);

  const tasks: SyncPayloadTask[] = ALL_TASKS.map((def) => {
    const local = state.tasks[def.taskId];
    return {
      taskId: def.taskId,
      week: def.week,
      phase: def.phase,
      subject: def.subject,
      title: def.title,
      completed: Boolean(local?.completed),
      updatedAt: local?.updatedAt ?? 0,
    };
  });

  const weeklyMeta: SyncPayloadWeeklyMeta[] = WEEKS_DATA.map((w) => {
    const meta = getWeekMeta(state, w.week);
    return {
      week: w.week,
      dateRange: w.dateRange,
      endoCount: meta.endoCount,
      endoTarget: meta.endoTarget,
      note: meta.note,
      updatedAt: meta.updatedAt,
    };
  });

  const booksSummary: SyncPayloadBookSummary[] = BOOKS.map((b) => ({
    bookId: b.bookId,
    title: b.title,
    category: b.category,
    isRecommended: b.isRecommended,
    targetWeeks: b.targetWeeks,
    progressPercent: bookProgress[b.bookId] ?? 0,
    updatedAt: now,
  }));

  return {
    action,
    clientTime: now,
    tasks,
    weeklyMeta,
    booksSummary,
  };
}

export function mergeRemoteResponse(
  current: AppState,
  remote: SyncResponsePayload
): { nextState: AppState; changed: boolean } {
  let changed = false;
  const nextTasks: Record<string, TaskState> = { ...current.tasks };
  const nextMeta: Record<number, WeekMetaState> = { ...current.weeklyMeta };

  if (Array.isArray(remote.tasks)) {
    for (const rTask of remote.tasks) {
      if (!rTask || !rTask.taskId) continue;
      const local = nextTasks[rTask.taskId];
      const localTs = local?.updatedAt ?? 0;
      const remoteTs = Number(rTask.updatedAt) || 0;
      if (remoteTs > localTs) {
        nextTasks[rTask.taskId] = {
          completed: Boolean(rTask.completed),
          updatedAt: remoteTs,
        };
        changed = true;
      }
    }
  }

  if (Array.isArray(remote.weeklyMeta)) {
    for (const rMeta of remote.weeklyMeta) {
      if (!rMeta || !rMeta.week) continue;
      const w = Number(rMeta.week);
      const local = nextMeta[w];
      const localTs = local?.updatedAt ?? 0;
      const remoteTs = Number(rMeta.updatedAt) || 0;
      if (remoteTs > localTs) {
        const def = WEEKS_DATA[w - 1];
        nextMeta[w] = {
          endoCount: Number(rMeta.endoCount) || 0,
          endoTarget: Number(rMeta.endoTarget) || def?.endoTarget || 7,
          note: typeof rMeta.note === 'string' ? rMeta.note : '',
          updatedAt: remoteTs,
        };
        changed = true;
      }
    }
  }

  return {
    nextState: {
      ...current,
      tasks: nextTasks,
      weeklyMeta: nextMeta,
    },
    changed,
  };
}

export function isValidGasUrl(url: string): boolean {
  const trimmed = url.trim();
  return (
    trimmed.startsWith('https://script.google.com/') ||
    trimmed.startsWith('https://script.googleusercontent.com/')
  );
}

export async function pullFromGas(gasUrl: string): Promise<SyncResponsePayload> {
  const url = gasUrl.trim();
  const separator = url.includes('?') ? '&' : '?';
  const res = await fetch(`${url}${separator}t=${Date.now()}`, {
    method: 'GET',
    redirect: 'follow',
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as SyncResponsePayload;
  if (!data.ok) {
    throw new Error(data.message || '試算表讀取失敗');
  }
  return data;
}

export async function pushToGas(
  gasUrl: string,
  state: AppState,
  action: 'sync' | 'init' = 'sync'
): Promise<SyncResponsePayload> {
  const payload = buildSyncPayload(state, action);
  const res = await fetch(gasUrl.trim(), {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = (await res.json()) as SyncResponsePayload;
  if (!data.ok) {
    throw new Error(data.message || '試算表寫入失敗');
  }
  return data;
}

export function exportBackupJson(state: AppState): string {
  const payload = {
    app: '2027-study-dashboard-54w',
    version: 1,
    exportedAt: new Date().toISOString(),
    gasUrl: state.gasUrl,
    tasks: state.tasks,
    weeklyMeta: state.weeklyMeta,
  };
  return JSON.stringify(payload, null, 2);
}

export function importBackupJson(
  current: AppState,
  rawJson: string
): { nextState: AppState; importedTaskCount: number; importedWeekCount: number } {
  const parsed = JSON.parse(rawJson) as {
    tasks?: Record<string, TaskState>;
    weeklyMeta?: Record<string, WeekMetaState>;
    gasUrl?: string;
  };

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('JSON 格式不正確');
  }

  const now = Date.now();
  const nextTasks: Record<string, TaskState> = { ...current.tasks };
  const nextMeta: Record<number, WeekMetaState> = { ...current.weeklyMeta };
  let importedTaskCount = 0;
  let importedWeekCount = 0;

  if (parsed.tasks && typeof parsed.tasks === 'object') {
    for (const [taskId, val] of Object.entries(parsed.tasks)) {
      if (!val || typeof val !== 'object') continue;
      nextTasks[taskId] = {
        completed: Boolean(val.completed),
        updatedAt: Math.max(Number(val.updatedAt) || 0, now),
      };
      importedTaskCount += 1;
    }
  }

  if (parsed.weeklyMeta && typeof parsed.weeklyMeta === 'object') {
    for (const [weekKey, val] of Object.entries(parsed.weeklyMeta)) {
      const w = Number(weekKey);
      if (!w || w < 1 || w > 54 || !val || typeof val !== 'object') continue;
      const def = WEEKS_DATA[w - 1];
      nextMeta[w] = {
        endoCount: Number(val.endoCount) || 0,
        endoTarget: Number(val.endoTarget) || def?.endoTarget || 7,
        note: typeof val.note === 'string' ? val.note : '',
        updatedAt: Math.max(Number(val.updatedAt) || 0, now),
      };
      importedWeekCount += 1;
    }
  }

  return {
    nextState: {
      ...current,
      tasks: nextTasks,
      weeklyMeta: nextMeta,
      gasUrl:
        typeof parsed.gasUrl === 'string' && parsed.gasUrl.trim()
          ? parsed.gasUrl.trim()
          : current.gasUrl,
      pendingSync: Boolean(current.gasUrl),
    },
    importedTaskCount,
    importedWeekCount,
  };
}

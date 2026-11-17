import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Info, Sparkles } from 'lucide-react';
import { DrawersSection } from './components/DrawersSection';
import { GasWizardModal } from './components/GasWizardModal';
import { HeaderDashboard } from './components/HeaderDashboard';
import { PhaseAndWeekNav } from './components/PhaseAndWeekNav';
import { SubjectGrid, SubjectStat } from './components/SubjectGrid';
import { WeekCard } from './components/WeekCard';
import { ALL_TASKS, SUBJECTS, SUBJECT_ORDER, WEEKS_DATA } from './data/curriculum';
import {
  exportBackupJson,
  getWeekMeta,
  importBackupJson,
  loadLocalState,
  mergeRemoteResponse,
  pullFromGas,
  pushToGas,
  saveLocalState,
} from './services/syncService';
import { AppState, PhaseId, SubjectId, SyncStatus } from './types';

function detectInitialPhase(): PhaseId {
  const now = new Date();
  if (now >= new Date(2027, 7, 1)) return 4;
  if (now >= new Date(2027, 3, 1)) return 3;
  if (now >= new Date(2027, 0, 1)) return 2;
  return 1;
}

export function App() {
  const [appState, setAppState] = useState<AppState>(() => loadLocalState());
  const [activePhase, setActivePhase] = useState<PhaseId | 'all'>(() => detectInitialPhase());
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [highlightedWeek, setHighlightedWeek] = useState<number | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(() => {
    const initial = loadLocalState();
    if (!initial.gasUrl) return 'unconfigured';
    return navigator.onLine ? 'synced' : 'offline';
  });
  const [toast, setToast] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(
    null
  );

  const stateRef = useRef<AppState>(appState);
  stateRef.current = appState;

  const debounceTimerRef = useRef<number | null>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((type: 'success' | 'info' | 'error', text: string) => {
    setToast({ type, text });
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const executePush = useCallback(async (action: 'sync' | 'init' = 'sync') => {
    const current = stateRef.current;
    if (!current.gasUrl) {
      setSyncStatus('unconfigured');
      return { ok: false, message: '尚未設定 Google Apps Script 連結' };
    }
    if (!navigator.onLine) {
      setSyncStatus('offline');
      return { ok: false, message: '目前處於離線狀態，變更已暫存本機佇列' };
    }

    setSyncStatus('syncing');
    try {
      const response = await pushToGas(current.gasUrl, current, action);
      setAppState((prev) => {
        const { nextState } = mergeRemoteResponse(prev, response);
        const finalized: AppState = {
          ...nextState,
          lastSyncedAt: Date.now(),
          pendingSync: false,
        };
        saveLocalState(finalized);
        return finalized;
      });
      setSyncStatus('synced');
      return { ok: true, message: response.message || '試算表同步成功' };
    } catch (err) {
      setSyncStatus('offline');
      setAppState((prev) => {
        const next: AppState = { ...prev, pendingSync: true };
        saveLocalState(next);
        return next;
      });
      return {
        ok: false,
        message: err instanceof Error ? err.message : '試算表連線失敗，已暫存本機',
      };
    }
  }, []);

  const executePull = useCallback(async () => {
    const current = stateRef.current;
    if (!current.gasUrl) {
      setSyncStatus('unconfigured');
      return;
    }
    if (!navigator.onLine) {
      setSyncStatus('offline');
      return;
    }

    setSyncStatus('syncing');
    try {
      const response = await pullFromGas(current.gasUrl);
      setAppState((prev) => {
        const { nextState } = mergeRemoteResponse(prev, response);
        const finalized: AppState = {
          ...nextState,
          lastSyncedAt: Date.now(),
          pendingSync: false,
        };
        saveLocalState(finalized);
        return finalized;
      });
      setSyncStatus('synced');
    } catch {
      setSyncStatus('offline');
    }
  }, []);

  const scheduleDebouncedPush = useCallback(() => {
    if (!stateRef.current.gasUrl) return;
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      void executePush('sync');
    }, 1500);
  }, [executePush]);

  // Auto-Pull on load (or flush pending offline queue first)
  useEffect(() => {
    const current = stateRef.current;
    if (!current.gasUrl) return;
    if (current.pendingSync && navigator.onLine) {
      void executePush('sync');
    } else {
      void executePull();
    }
  }, [executePull, executePush]);

  // Online / Offline listeners for automatic retry of queued changes
  useEffect(() => {
    const handleOnline = () => {
      if (!stateRef.current.gasUrl) return;
      if (stateRef.current.pendingSync) {
        void executePush('sync');
      } else {
        void executePull();
      }
    };
    const handleOffline = () => {
      if (stateRef.current.gasUrl) {
        setSyncStatus('offline');
      }
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [executePull, executePush]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
      if (highlightTimerRef.current) window.clearTimeout(highlightTimerRef.current);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  // Optimistic mutation wrapper
  const mutateState = useCallback(
    (updater: (prev: AppState, now: number) => AppState) => {
      const now = Date.now();
      setAppState((prev) => {
        const updated = updater(prev, now);
        const withSyncFlag: AppState = {
          ...updated,
          pendingSync: Boolean(updated.gasUrl),
        };
        saveLocalState(withSyncFlag);
        stateRef.current = withSyncFlag;
        return withSyncFlag;
      });
      if (stateRef.current.gasUrl) {
        if (!navigator.onLine) {
          setSyncStatus('offline');
        }
        scheduleDebouncedPush();
      }
    },
    [scheduleDebouncedPush]
  );

  const handleToggleTask = useCallback(
    (taskId: string) => {
      mutateState((prev, now) => {
        const currentDone = Boolean(prev.tasks[taskId]?.completed);
        return {
          ...prev,
          tasks: {
            ...prev.tasks,
            [taskId]: {
              completed: !currentDone,
              updatedAt: now,
            },
          },
        };
      });
    },
    [mutateState]
  );

  const handleToggleAllWeekTasks = useCallback(
    (week: number, targetCompleted: boolean) => {
      const weekDef = WEEKS_DATA[week - 1];
      if (!weekDef) return;
      mutateState((prev, now) => {
        const nextTasks = { ...prev.tasks };
        for (const t of weekDef.tasks) {
          nextTasks[t.taskId] = {
            completed: targetCompleted,
            updatedAt: now,
          };
        }
        return {
          ...prev,
          tasks: nextTasks,
        };
      });
    },
    [mutateState]
  );

  const handleUpdateEndoCount = useCallback(
    (week: number, delta: number) => {
      mutateState((prev, now) => {
        const currentMeta = getWeekMeta(prev, week);
        const nextCount = Math.max(0, currentMeta.endoCount + delta);
        return {
          ...prev,
          weeklyMeta: {
            ...prev.weeklyMeta,
            [week]: {
              ...currentMeta,
              endoCount: nextCount,
              updatedAt: now,
            },
          },
        };
      });
    },
    [mutateState]
  );

  const handleUpdateNote = useCallback(
    (week: number, note: string) => {
      mutateState((prev, now) => {
        const currentMeta = getWeekMeta(prev, week);
        return {
          ...prev,
          weeklyMeta: {
            ...prev.weeklyMeta,
            [week]: {
              ...currentMeta,
              note,
              updatedAt: now,
            },
          },
        };
      });
    },
    [mutateState]
  );

  const handleSelectSubject = useCallback(
    (subjectId: SubjectId | null) => {
      setSelectedSubject(subjectId);
      if (subjectId && activePhase !== 'all') {
        const hasInCurrent = WEEKS_DATA.some(
          (w) => w.phase === activePhase && w.tasks.some((t) => t.subject === subjectId)
        );
        if (!hasInCurrent) {
          const matchingPhases = Array.from(
            new Set(
              WEEKS_DATA.filter((w) => w.tasks.some((t) => t.subject === subjectId)).map(
                (w) => w.phase
              )
            )
          );
          if (matchingPhases.length === 1) {
            setActivePhase(matchingPhases[0]);
          } else {
            setActivePhase('all');
          }
        }
      }
    },
    [activePhase]
  );

  const scrollToWeekCard = useCallback((week: number, targetPhase?: PhaseId) => {
    const weekDef = WEEKS_DATA[week - 1];
    if (!weekDef) return;
    const phaseToSet = targetPhase ?? weekDef.phase;

    setActivePhase((prev) => (prev === 'all' ? 'all' : phaseToSet));
    setHighlightedWeek(week);

    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightedWeek(null);
    }, 2800);

    window.setTimeout(() => {
      const el = document.getElementById(`week-card-${week}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  }, []);

  const handleJumpToBookWeek = useCallback(
    (week: number, phase: PhaseId) => {
      if (selectedSubject && selectedSubject !== 'n1') {
        setSelectedSubject(null);
      }
      scrollToWeekCard(week, phase);
    },
    [scrollToWeekCard, selectedSubject]
  );

  const handleManualSync = async () => {
    if (!appState.gasUrl) {
      setIsWizardOpen(true);
      return;
    }
    const res = await executePush('sync');
    showToast(res.ok ? 'success' : 'error', res.message);
  };

  const handleSaveAndTestGas = async (url: string) => {
    const updated: AppState = {
      ...stateRef.current,
      gasUrl: url,
      pendingSync: true,
    };
    saveLocalState(updated);
    stateRef.current = updated;
    setAppState(updated);

    const res = await executePush('init');
    if (res.ok) {
      showToast('success', 'Google 試算表已完成初始化並雙向同步！');
    }
    return res;
  };

  const handleClearGasUrl = () => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    setAppState((prev) => {
      const next: AppState = {
        ...prev,
        gasUrl: '',
        pendingSync: false,
      };
      saveLocalState(next);
      stateRef.current = next;
      return next;
    });
    setSyncStatus('unconfigured');
  };

  const handleExportJson = () => {
    const jsonText = exportBackupJson(appState);
    const blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `study-dashboard-2027-backup-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', '已匯出 54 週進度 JSON 備份檔');
  };

  const handleImportJson = async (file: File) => {
    try {
      const text = await file.text();
      const { nextState, importedTaskCount, importedWeekCount } = importBackupJson(
        stateRef.current,
        text
      );
      saveLocalState(nextState);
      stateRef.current = nextState;
      setAppState(nextState);
      showToast(
        'success',
        `已還原 ${importedTaskCount} 筆任務與 ${importedWeekCount} 週紀錄`
      );
      if (nextState.gasUrl) {
        scheduleDebouncedPush();
      }
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? `匯入失敗：${err.message}` : '匯入 JSON 失敗'
      );
    }
  };

  // Subject & overall statistics
  const { subjectStats, overallDone, overallTotal, overallPercent, totalEndoRead, totalEndoTarget } =
    useMemo(() => {
      const statsMap = {} as Record<SubjectId, SubjectStat>;

      let endoReadSum = 0;
      let endoTargetSum = 0;
      for (const w of WEEKS_DATA) {
        const meta = getWeekMeta(appState, w.week);
        endoReadSum += meta.endoCount;
        endoTargetSum += meta.endoTarget;
      }

      for (const id of SUBJECT_ORDER) {
        const subTasks = ALL_TASKS.filter((t) => t.subject === id);
        const total = subTasks.length;
        const done = subTasks.filter((t) => Boolean(appState.tasks[t.taskId]?.completed)).length;
        const percent = total > 0 ? Math.round((done / total) * 100) : 0;

        statsMap[id] = {
          subjectId: id,
          done,
          total,
          percent,
          extraLabel:
            id === 'endo'
              ? `實讀累積 ${endoReadSum} / ${endoTargetSum} 篇`
              : undefined,
        };
      }

      const allTotal = ALL_TASKS.length;
      const allDone = ALL_TASKS.filter((t) => Boolean(appState.tasks[t.taskId]?.completed)).length;

      return {
        subjectStats: statsMap,
        overallDone: allDone,
        overallTotal: allTotal,
        overallPercent: allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0,
        totalEndoRead: endoReadSum,
        totalEndoTarget: endoTargetSum,
      };
    }, [appState]);

  const filteredWeeks = useMemo(() => {
    return WEEKS_DATA.filter((w) => {
      const phaseOk = activePhase === 'all' || w.phase === activePhase;
      const subjectOk =
        !selectedSubject || w.tasks.some((t) => t.subject === selectedSubject);
      return phaseOk && subjectOk;
    });
  }, [activePhase, selectedSubject]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#33363A] pb-16">
      <HeaderDashboard
        syncStatus={syncStatus}
        pendingSync={appState.pendingSync}
        lastSyncedAt={appState.lastSyncedAt}
        overallPercent={overallPercent}
        overallDone={overallDone}
        overallTotal={overallTotal}
        totalEndoRead={totalEndoRead}
        totalEndoTarget={totalEndoTarget}
        onManualSync={handleManualSync}
        onOpenGasWizard={() => setIsWizardOpen(true)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <SubjectGrid
          stats={subjectStats}
          selectedSubject={selectedSubject}
          onSelectSubject={handleSelectSubject}
        />

        <DrawersSection appState={appState} onJumpToBookWeek={handleJumpToBookWeek} />

        <PhaseAndWeekNav
          activePhase={activePhase}
          highlightedWeek={highlightedWeek}
          appState={appState}
          onSelectPhase={setActivePhase}
          onJumpToWeek={(w) => scrollToWeekCard(w)}
        />

        {/* Active Filter Context Banner */}
        {selectedSubject && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white border border-[#E6E2DA] shadow-soft">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Sparkles
                className="w-4 h-4 shrink-0"
                style={{ color: SUBJECTS[selectedSubject].color }}
              />
              <span>
                目前篩選科目：
                <strong style={{ color: SUBJECTS[selectedSubject].color }}>
                  {SUBJECTS[selectedSubject].name}
                </strong>
                （共顯示 {filteredWeeks.length} 週）
              </span>
            </div>
            <div className="flex items-center gap-2">
              {activePhase !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActivePhase('all')}
                  className="text-xs font-semibold text-[#5B7C99] hover:underline"
                >
                  顯示該科目跨階段全部週次
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSelectSubject(null)}
                className="px-2.5 py-1 rounded-lg bg-[#F8F7F4] border border-[#DCD7CD] text-xs font-medium hover:bg-[#EFECE4]"
              >
                恢復全部顯示
              </button>
            </div>
          </div>
        )}

        {/* Weekly Cards List */}
        <section className="space-y-4" aria-label="每週讀書進度卡片">
          {filteredWeeks.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-[#E6E2DA] text-center space-y-2">
              <Info className="w-6 h-6 text-[#6E737B] mx-auto" />
              <p className="text-sm font-semibold text-[#33363A]">
                目前所選階段沒有「{selectedSubject ? SUBJECTS[selectedSubject].name : ''}」的排程任務
              </p>
              <button
                type="button"
                onClick={() => setActivePhase('all')}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-[#5B7C99] text-white text-xs font-semibold hover:bg-[#4B6B87]"
              >
                切換為檢視全部 54 週
              </button>
            </div>
          ) : (
            filteredWeeks.map((weekDef) => (
              <WeekCard
                key={weekDef.week}
                weekDef={weekDef}
                appState={appState}
                selectedSubject={selectedSubject}
                isHighlighted={highlightedWeek === weekDef.week}
                onToggleTask={handleToggleTask}
                onToggleAllWeekTasks={handleToggleAllWeekTasks}
                onUpdateEndoCount={handleUpdateEndoCount}
                onUpdateNote={handleUpdateNote}
              />
            ))
          )}
        </section>
      </main>

      <GasWizardModal
        isOpen={isWizardOpen}
        currentGasUrl={appState.gasUrl}
        onClose={() => setIsWizardOpen(false)}
        onSaveAndTest={handleSaveAndTestGas}
        onClearUrl={handleClearGasUrl}
      />

      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-xs sm:text-sm font-medium transition-all ${
            toast.type === 'success'
              ? 'bg-white border-[#6B8E78]/40 text-[#3F634D]'
              : toast.type === 'error'
              ? 'bg-white border-[#B56555]/45 text-[#834134]'
              : 'bg-white border-[#5B7C99]/40 text-[#3F5A73]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}
    </div>
  );
}

export default App;

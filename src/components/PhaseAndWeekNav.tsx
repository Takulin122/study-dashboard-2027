import React from 'react';
import { Check, Layers } from 'lucide-react';
import { PHASES, WEEKS_DATA } from '../data/curriculum';
import { AppState, PhaseId } from '../types';

interface PhaseAndWeekNavProps {
  activePhase: PhaseId | 'all';
  highlightedWeek: number | null;
  appState: AppState;
  onSelectPhase: (phase: PhaseId | 'all') => void;
  onJumpToWeek: (week: number) => void;
}

export const PhaseAndWeekNav: React.FC<PhaseAndWeekNavProps> = ({
  activePhase,
  highlightedWeek,
  appState,
  onSelectPhase,
  onJumpToWeek,
}) => {
  const getPhaseProgress = (startWeek: number, endWeek: number) => {
    const weeks = WEEKS_DATA.filter((w) => w.week >= startWeek && w.week <= endWeek);
    const tasks = weeks.flatMap((w) => w.tasks);
    const done = tasks.filter((t) => Boolean(appState.tasks[t.taskId]?.completed)).length;
    const total = tasks.length;
    return {
      done,
      total,
      percent: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  };

  return (
    <section className="space-y-3" aria-label="四階段分頁與 54 週快速跳轉">
      {/* 4 Phase Tabs + All Weeks Toggle */}
      <div className="bg-white rounded-2xl border border-[#E6E2DA] p-2.5 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {PHASES.map((phase) => {
            const isActive = activePhase === phase.id;
            const prog = getPhaseProgress(phase.startWeek, phase.endWeek);
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => onSelectPhase(phase.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-[#5B7C99] text-white border-[#5B7C99] shadow-sm'
                    : 'bg-[#F8F7F4] text-[#33363A] border-[#E6E2DA] hover:bg-[#EFECE4]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 text-[11px] font-medium">
                  <span className={isActive ? 'text-white/90' : 'text-[#6E737B]'}>
                    {phase.dateRangeLabel}
                  </span>
                  <span
                    className={`font-bold tabular-nums ${
                      isActive ? 'text-white' : 'text-[#5B7C99]'
                    }`}
                  >
                    {prog.percent}%
                  </span>
                </div>
                <div className="mt-1 text-xs font-bold leading-snug">{phase.title}</div>
                <div
                  className={`mt-2 h-1 w-full rounded-full overflow-hidden ${
                    isActive ? 'bg-white/25' : 'bg-[#E2DDD3]'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isActive ? 'bg-white' : 'bg-[#5B7C99]'
                    }`}
                    style={{ width: `${prog.percent}%` }}
                  />
                </div>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onSelectPhase('all')}
            className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
              activePhase === 'all'
                ? 'bg-[#33363A] text-white border-[#33363A] shadow-sm'
                : 'bg-[#F8F7F4] text-[#33363A] border-[#E6E2DA] hover:bg-[#EFECE4]'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-medium">
              <span className={activePhase === 'all' ? 'text-white/80' : 'text-[#6E737B]'}>
                W1–W54 全覽
              </span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="mt-1 text-xs font-bold">顯示全部 54 週卡片</div>
            <div
              className={`mt-1.5 text-[11px] ${
                activePhase === 'all' ? 'text-white/80' : 'text-[#6E737B]'
              }`}
            >
              跨階段檢視或全域搜尋
            </div>
          </button>
        </div>

        {/* Active Phase summary strip */}
        {activePhase !== 'all' && (
          <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#F8F7F4] border border-[#EDEAE2] text-xs text-[#52565C] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-[#33363A]">本階段策略重點：</strong>
              {PHASES.find((p) => p.id === activePhase)?.focusSummary}
            </span>
          </div>
        )}
      </div>

      {/* W1-W54 Quick Jump Pills Bar */}
      <div className="bg-white rounded-2xl border border-[#E6E2DA] px-3.5 py-3 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#33363A]">
            第 1–54 週快速跳轉（該週全數完成顯示綠色打勾徽章）
          </span>
          <span className="text-[11px] text-[#6E737B]">點擊膠囊平滑定位至該週卡片</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {WEEKS_DATA.map((w) => {
            const total = w.tasks.length;
            const done = w.tasks.filter((t) => Boolean(appState.tasks[t.taskId]?.completed)).length;
            const isWeekComplete = total > 0 && done === total;
            const isPartiallyDone = done > 0 && done < total;
            const isHighlighted = highlightedWeek === w.week;
            const inActivePhase = activePhase === 'all' || activePhase === w.phase;

            return (
              <button
                key={w.week}
                type="button"
                onClick={() => onJumpToWeek(w.week)}
                title={`W${w.week} (${w.dateRange})｜完成 ${done}/${total}`}
                className={`relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                  isWeekComplete
                    ? 'bg-[#6B8E78]/15 text-[#3F634D] border-[#6B8E78]/45 hover:bg-[#6B8E78]/25'
                    : isHighlighted
                    ? 'bg-[#5B7C99] text-white border-[#5B7C99]'
                    : inActivePhase
                    ? 'bg-[#F8F7F4] text-[#33363A] border-[#DCD7CD] hover:border-[#5B7C99] hover:text-[#3F5A73]'
                    : 'bg-white text-[#9A9FA6] border-[#ECE8DF] hover:text-[#33363A] hover:border-[#CFC9BD]'
                } ${isHighlighted ? 'ring-2 ring-[#5B7C99]/35' : ''}`}
              >
                <span>W{w.week}</span>
                {isWeekComplete && (
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#6B8E78] text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                {isPartiallyDone && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B7C99]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

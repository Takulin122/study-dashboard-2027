import React, { useState } from 'react';
import {
  BookMarked,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Flag,
  Minus,
  Plus,
  StickyNote,
} from 'lucide-react';
import { PHASES, SUBJECTS } from '../data/curriculum';
import { AppState, SubjectId, WeekDefinition } from '../types';
import { getWeekMeta } from '../services/syncService';

interface WeekCardProps {
  weekDef: WeekDefinition;
  appState: AppState;
  selectedSubject: SubjectId | null;
  isHighlighted: boolean;
  onToggleTask: (taskId: string) => void;
  onToggleAllWeekTasks: (week: number, targetCompleted: boolean) => void;
  onUpdateEndoCount: (week: number, delta: number) => void;
  onUpdateNote: (week: number, note: string) => void;
}

export const WeekCard: React.FC<WeekCardProps> = ({
  weekDef,
  appState,
  selectedSubject,
  isHighlighted,
  onToggleTask,
  onToggleAllWeekTasks,
  onUpdateEndoCount,
  onUpdateNote,
}) => {
  const [noteOpen, setNoteOpen] = useState(false);
  const [showOtherSubjects, setShowOtherSubjects] = useState(false);

  const meta = getWeekMeta(appState, weekDef.week);
  const phaseMeta = PHASES.find((p) => p.id === weekDef.phase);

  const totalTasks = weekDef.tasks.length;
  const doneTasks = weekDef.tasks.filter((t) =>
    Boolean(appState.tasks[t.taskId]?.completed)
  ).length;
  const isAllComplete = totalTasks > 0 && doneTasks === totalTasks;
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const visibleTasks =
    selectedSubject && !showOtherSubjects
      ? weekDef.tasks.filter((t) => t.subject === selectedSubject)
      : weekDef.tasks;

  const hiddenCount = weekDef.tasks.length - visibleTasks.length;

  const endoTarget = meta.endoTarget || weekDef.endoTarget;
  const endoMet = meta.endoCount >= endoTarget;
  const hasNote = meta.note.trim().length > 0;

  return (
    <article
      id={`week-card-${weekDef.week}`}
      className={`rounded-2xl bg-white border transition-all duration-300 shadow-soft overflow-hidden ${
        isHighlighted
          ? 'border-[#5B7C99] ring-2 ring-[#5B7C99]/30 shadow-card'
          : isAllComplete
          ? 'border-[#6B8E78]/45'
          : 'border-[#E6E2DA]'
      }`}
    >
      {/* Top Card Header */}
      <div
        className={`px-4 sm:px-5 py-3.5 border-b border-[#EFECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isAllComplete ? 'bg-[#6B8E78]/6' : 'bg-[#FCFBF9]'
        }`}
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-extrabold ${
                isAllComplete
                  ? 'bg-[#6B8E78] text-white'
                  : 'bg-[#33363A] text-white'
              }`}
            >
              {isAllComplete && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              W{weekDef.week}
            </span>

            <span className="text-xs font-semibold text-[#52565C] tabular-nums">
              {weekDef.dateRange}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#5B7C99]/10 text-[#3F5A73] border border-[#5B7C99]/20">
              {phaseMeta?.shortTitle}
            </span>

            {weekDef.isKoreanActive ? (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#C98A7A]/15 text-[#8E5547]">
                韓文並進期
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#EDEAE2] text-[#6E737B]">
                韓文已休眠・日文 9h/週
              </span>
            )}

            {weekDef.milestoneTag && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#B56555]/15 text-[#834134] border border-[#B56555]/30">
                <Flag className="w-3 h-3" />
                {weekDef.milestoneTag}
              </span>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#33363A]">{weekDef.theme}</h3>
        </div>

        {/* Right Controls: Progress & One-click Check All */}
        <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
          <div className="text-right">
            <div className="text-xs font-bold tabular-nums text-[#33363A]">
              {doneTasks}/{totalTasks} 項 ({progressPercent}%)
            </div>
            <div className="mt-1 w-24 h-1.5 rounded-full bg-[#EAE6DC] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: isAllComplete ? '#6B8E78' : '#5B7C99',
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleAllWeekTasks(weekDef.week, !isAllComplete)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              isAllComplete
                ? 'bg-white text-[#52565C] border-[#DCD7CD] hover:bg-[#F8F7F4]'
                : 'bg-[#6B8E78]/12 text-[#3F634D] border-[#6B8E78]/35 hover:bg-[#6B8E78]/22'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            {isAllComplete ? '取消全勾' : '一鍵全勾'}
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-4 sm:px-5 space-y-2">
        {visibleTasks.map((task) => {
          const subjectMeta = SUBJECTS[task.subject];
          const checked = Boolean(appState.tasks[task.taskId]?.completed);

          return (
            <label
              key={task.taskId}
              className={`flex items-start gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                checked
                  ? 'bg-[#F8F7F4] border-[#ECE8DF] opacity-80'
                  : 'bg-white border-[#EFECE4] hover:border-[#D9D3C7] hover:bg-[#FCFBF9]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleTask(task.taskId)}
                className="sr-only"
              />
              <span
                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  checked ? 'border-transparent text-white' : 'bg-white border-[#CFC9BD]'
                }`}
                style={{
                  backgroundColor: checked ? subjectMeta.color : undefined,
                }}
              >
                {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold"
                    style={{
                      backgroundColor: subjectMeta.bgTint,
                      color: subjectMeta.badgeText,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: subjectMeta.color }}
                    />
                    {subjectMeta.shortName}
                  </span>

                  {task.bookId && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#6E737B]">
                      <BookMarked className="w-3 h-3" />
                      教材連動
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    checked ? 'line-through text-[#7B8088]' : 'text-[#33363A] font-medium'
                  }`}
                >
                  {task.title}
                </p>
              </div>
            </label>
          );
        })}

        {selectedSubject && hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowOtherSubjects((v) => !v)}
            className="text-xs font-medium text-[#5B7C99] hover:underline pt-1"
          >
            {showOtherSubjects
              ? '僅顯示篩選科目任務'
              : `＋ 顯示本週其餘 ${hiddenCount} 項跨科任務`}
          </button>
        )}
      </div>

      {/* Bottom Footer: Endo Paper Counter + Collapsible Weekly Note */}
      <div className="px-4 sm:px-5 py-3 bg-[#FAF9F6] border-t border-[#EFECE4] space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Endo Counter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#725B3D]">
              <FileText className="w-3.5 h-3.5 text-[#A68A64]" />
              <span>本週根管治療文獻篇數</span>
            </div>

            <div className="inline-flex items-center rounded-lg border border-[#A68A64]/35 bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => onUpdateEndoCount(weekDef.week, -1)}
                disabled={meta.endoCount <= 0}
                className="p-1.5 hover:bg-[#F8F7F4] disabled:opacity-40 text-[#725B3D] transition-colors"
                aria-label="減少文獻篇數"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span
                className={`px-3 py-1 text-xs font-bold tabular-nums border-x border-[#EFECE4] ${
                  endoMet ? 'text-[#466452] bg-[#6B8E78]/10' : 'text-[#33363A]'
                }`}
              >
                {meta.endoCount} / {endoTarget} 篇
              </span>
              <button
                type="button"
                onClick={() => onUpdateEndoCount(weekDef.week, 1)}
                className="p-1.5 hover:bg-[#F8F7F4] text-[#725B3D] transition-colors"
                aria-label="增加文獻篇數"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {endoMet && (
              <span className="text-[11px] font-semibold text-[#466452]">
                已達本週文獻目標
              </span>
            )}
          </div>

          {/* Note Toggle Button */}
          <button
            type="button"
            onClick={() => setNoteOpen((o) => !o)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors self-start sm:self-auto ${
              hasNote
                ? 'bg-[#5B7C99]/10 text-[#3F5A73] border-[#5B7C99]/30'
                : 'bg-white text-[#52565C] border-[#DCD7CD] hover:bg-[#F8F7F4]'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>{hasNote ? '本週學習筆記與頁碼備忘（已填寫）' : '本週學習筆記與頁碼備忘'}</span>
            {noteOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {noteOpen && (
          <div className="pt-1">
            <textarea
              value={meta.note}
              onChange={(e) => onUpdateNote(weekDef.week, e.target.value)}
              rows={3}
              placeholder="記錄本週書本停駐頁碼、模考錯題編號、臨床閱讀心得或下週調整備忘（輸入後 1.5 秒自動背景同步）..."
              className="w-full rounded-xl border border-[#DCD7CD] bg-white px-3 py-2 text-xs sm:text-sm text-[#33363A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5B7C99] focus:ring-2 focus:ring-[#5B7C99]/20"
            />
          </div>
        )}
      </div>
    </article>
  );
};

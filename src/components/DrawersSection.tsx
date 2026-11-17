import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { ALL_TASKS, BOOKS, CLINICAL_SCHEDULE } from '../data/curriculum';
import { AppState, BookItem, PhaseId } from '../types';

interface DrawersSectionProps {
  appState: AppState;
  onJumpToBookWeek: (week: number, phase: PhaseId) => void;
}

export const DrawersSection: React.FC<DrawersSectionProps> = ({
  appState,
  onJumpToBookWeek,
}) => {
  const [openDrawer, setOpenDrawer] = useState<'books' | 'schedule' | null>(null);

  const toggleDrawer = (target: 'books' | 'schedule') => {
    setOpenDrawer((prev) => (prev === target ? null : target));
  };

  const getBookStats = (book: BookItem) => {
    const bookTasks = ALL_TASKS.filter((t) => t.bookId === book.bookId);
    const total = bookTasks.length;
    const done = bookTasks.filter((t) => Boolean(appState.tasks[t.taskId]?.completed)).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  };

  const energyBadgeColor: Record<string, string> = {
    休養: 'bg-[#EDEAE2] text-[#6E737B] border-[#DDD7CC]',
    高負荷: 'bg-[#B56555]/12 text-[#834134] border-[#B56555]/30',
    中負荷: 'bg-[#5B7C99]/12 text-[#3F5A73] border-[#5B7C99]/30',
    黃金進度: 'bg-[#6B8E78]/14 text-[#466452] border-[#6B8E78]/35',
  };

  return (
    <section className="space-y-2.5" aria-label="功能抽屜">
      {/* Trigger buttons bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleDrawer('books')}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all shadow-soft ${
            openDrawer === 'books'
              ? 'bg-[#5B7C99]/10 border-[#5B7C99]/40'
              : 'bg-white border-[#E6E2DA] hover:border-[#CFC9BD]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#5B7C99]/15 text-[#3F5A73]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#33363A]">
                抽屜 A：JLPT N1 13 本書單推進地圖
              </div>
              <div className="text-xs text-[#6E737B]">
                11 本現有書籍 ＋ 2 本【推薦購入】教材・點擊書卡跳轉啟用週次
              </div>
            </div>
          </div>
          {openDrawer === 'books' ? (
            <ChevronUp className="w-4 h-4 text-[#5B7C99] shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6E737B] shrink-0" />
          )}
        </button>

        <button
          type="button"
          onClick={() => toggleDrawer('schedule')}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all shadow-soft ${
            openDrawer === 'schedule'
              ? 'bg-[#6B8E78]/10 border-[#6B8E78]/40'
              : 'bg-white border-[#E6E2DA] hover:border-[#CFC9BD]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#6B8E78]/15 text-[#466452]">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#33363A]">
                抽屜 B：臨床排班與防雙語干擾時間表
              </div>
              <div className="text-xs text-[#6E737B]">
                週一高工時完全休養・週二四午休韓文・週三日黃金推進・週日 16:00 關機
              </div>
            </div>
          </div>
          {openDrawer === 'schedule' ? (
            <ChevronUp className="w-4 h-4 text-[#6B8E78] shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6E737B] shrink-0" />
          )}
        </button>
      </div>

      {/* Drawer A Content: 13 Books Map */}
      {openDrawer === 'books' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6E2DA] shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#EFECE4]">
            <div>
              <h3 className="text-base font-bold text-[#33363A]">
                JLPT N1 13 本書單推進地圖（即時連動週次勾選）
              </h3>
              <p className="text-xs text-[#6E737B] mt-0.5">
                點擊任一書卡，將自動切換至對應階段並平滑捲動至該書啟用週次
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6E737B]">
              <span className="px-2 py-0.5 rounded bg-[#C98A7A]/15 text-[#8E5547] font-medium">
                推薦購入 × 2 本
              </span>
              <span className="px-2 py-0.5 rounded bg-[#5B7C99]/12 text-[#3F5A73] font-medium">
                現有教材 × 11 本
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {BOOKS.map((book, idx) => {
              const st = getBookStats(book);
              return (
                <button
                  key={book.bookId}
                  type="button"
                  onClick={() => onJumpToBookWeek(book.startWeek, book.phase)}
                  className="group text-left p-3.5 rounded-xl border border-[#E6E2DA] bg-[#FCFBF9] hover:bg-white hover:border-[#5B7C99]/50 hover:shadow-soft transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-[#6E737B]">
                          #{String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[#5B7C99]/12 text-[#3F5A73]">
                          {book.category}
                        </span>
                        {book.isRecommended && (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded bg-[#C98A7A]/20 text-[#8E5547]">
                            <Sparkles className="w-3 h-3" />
                            【推薦購入】
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-[#5B7C99] shrink-0 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        {book.targetWeeks}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    <h4 className="mt-2 text-sm font-bold text-[#33363A] leading-snug">
                      {book.title}
                    </h4>
                    <div className="mt-1 text-[11px] font-medium text-[#6E737B]">
                      階段：{book.phaseLabel}
                    </div>
                    <p className="mt-1.5 text-xs text-[#6E737B] leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EFECE4]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#6E737B]">即時完成度</span>
                      <span className="font-bold tabular-nums text-[#3F5A73]">
                        {st.percent}% ({st.done}/{st.total})
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#EAE6DC] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#5B7C99] transition-all duration-300"
                        style={{ width: `${st.percent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Drawer B Content: Clinical Schedule & Anti-Interference */}
      {openDrawer === 'schedule' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6E2DA] shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#EFECE4]">
            <div>
              <h3 className="text-base font-bold text-[#33363A]">
                臨床排班與防雙語干擾參考時間表
              </h3>
              <p className="text-xs text-[#6E737B] mt-0.5">
                W1–W18 日韓並行期間採「時段物理隔離」；W19 年會結束後韓文休眠，釋出時段全面轉入 N1（每週 9 小時）。
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#A68A64]/12 text-[#725B3D] text-xs font-medium shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
              防雙語干擾原則：日／韓絕不連續排課
            </div>
          </div>

          <div className="overflow-x-auto morandi-scroll">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E6E2DA] text-[11px] font-semibold text-[#6E737B] bg-[#F8F7F4]">
                  <th className="py-2.5 px-3 rounded-tl-lg">星期</th>
                  <th className="py-2.5 px-3">臨床診次</th>
                  <th className="py-2.5 px-3">上午</th>
                  <th className="py-2.5 px-3">午間</th>
                  <th className="py-2.5 px-3">下午</th>
                  <th className="py-2.5 px-3">晚間</th>
                  <th className="py-2.5 px-3 rounded-tr-lg">防干擾／體力規則</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE4] text-xs">
                {CLINICAL_SCHEDULE.map((row) => (
                  <tr key={row.day} className="hover:bg-[#FBF9F6] transition-colors align-top">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-[#33363A]">{row.day}</div>
                      <span
                        className={`mt-1 inline-block px-1.5 py-0.5 rounded border text-[10px] font-medium ${energyBadgeColor[row.energyLevel]}`}
                      >
                        {row.energyLevel}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#52565C] font-medium whitespace-nowrap">
                      {row.clinicHours}
                    </td>
                    <td className="py-3 px-3 text-[#33363A]">{row.morningPlan}</td>
                    <td className="py-3 px-3 text-[#33363A]">{row.noonPlan}</td>
                    <td className="py-3 px-3 text-[#33363A]">{row.afternoonPlan}</td>
                    <td className="py-3 px-3 text-[#33363A] font-medium">{row.eveningPlan}</td>
                    <td className="py-3 px-3 text-[#6E737B]">{row.antiInterferenceRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import { Filter, X } from 'lucide-react';
import { SUBJECTS, SUBJECT_ORDER } from '../data/curriculum';
import { SubjectId } from '../types';

export interface SubjectStat {
  subjectId: SubjectId;
  done: number;
  total: number;
  percent: number;
  extraLabel?: string;
}

interface SubjectGridProps {
  stats: Record<SubjectId, SubjectStat>;
  selectedSubject: SubjectId | null;
  onSelectSubject: (subjectId: SubjectId | null) => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  stats,
  selectedSubject,
  onSelectSubject,
}) => {
  return (
    <section aria-label="八大科目統計儀表板">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6E737B]" />
          <h2 className="text-sm font-semibold text-[#33363A]">
            八大追蹤科目進度（點擊卡片篩選週次清單）
          </h2>
        </div>
        {selectedSubject && (
          <button
            type="button"
            onClick={() => onSelectSubject(null)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#33363A] text-white hover:bg-[#494D52] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            清除篩選：{SUBJECTS[selectedSubject].name}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {SUBJECT_ORDER.map((id) => {
          const meta = SUBJECTS[id];
          const st = stats[id];
          const isSelected = selectedSubject === id;
          const isDimmed = selectedSubject !== null && !isSelected;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectSubject(isSelected ? null : id)}
              className={`group text-left p-3 rounded-xl bg-white border transition-all duration-150 shadow-soft hover:shadow-card focus:outline-none ${
                isSelected
                  ? 'ring-2 ring-offset-1 ring-offset-[#F8F7F4]'
                  : 'border-[#E6E2DA] hover:border-[#CFC9BD]'
              } ${isDimmed ? 'opacity-55 hover:opacity-90' : 'opacity-100'}`}
              style={{
                borderColor: isSelected ? meta.color : undefined,
                boxShadow: isSelected ? `0 0 0 1px ${meta.color}` : undefined,
              }}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[11px] font-medium text-[#6E737B] truncate">
                  {meta.scopeLabel.split('｜')[0]}
                </span>
              </div>

              <div className="mt-2 font-bold text-xs sm:text-[13px] text-[#33363A] leading-snug line-clamp-1">
                {meta.name}
              </div>

              <div className="mt-2.5 flex items-baseline justify-between">
                <span
                  className="text-lg font-extrabold tabular-nums"
                  style={{ color: meta.color }}
                >
                  {st.percent}%
                </span>
                <span className="text-[11px] font-medium tabular-nums text-[#6E737B]">
                  {st.done}/{st.total}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#EFECE4] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${st.percent}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>

              {st.extraLabel && (
                <div className="mt-1.5 text-[10px] text-[#6E737B] truncate">
                  {st.extraLabel}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

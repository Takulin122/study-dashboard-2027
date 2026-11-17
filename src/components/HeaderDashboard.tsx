import React, { useEffect, useRef, useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  Cloud,
  CloudOff,
  Download,
  Loader2,
  RefreshCw,
  Settings2,
  Sparkles,
  Upload,
} from 'lucide-react';
import { MILESTONES } from '../data/curriculum';
import { SyncStatus } from '../types';

interface HeaderDashboardProps {
  syncStatus: SyncStatus;
  pendingSync: boolean;
  lastSyncedAt: number | null;
  overallPercent: number;
  overallDone: number;
  overallTotal: number;
  totalEndoRead: number;
  totalEndoTarget: number;
  onManualSync: () => void;
  onOpenGasWizard: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
}

interface CountdownInfo {
  days: number;
  hours: number;
  isPast: boolean;
}

function calcCountdown(isoDate: string, nowMs: number): CountdownInfo {
  const targetMs = new Date(isoDate).getTime();
  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours, isPast: false };
}

function formatSyncTime(ts: number | null): string {
  if (!ts) return '尚未同步';
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  syncStatus,
  pendingSync,
  lastSyncedAt,
  overallPercent,
  overallDone,
  overallTotal,
  totalEndoRead,
  totalEndoTarget,
  onManualSync,
  onOpenGasWizard,
  onExportJson,
  onImportJson,
}) => {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const koreaCd = calcCountdown(MILESTONES.KOREA_CONGRESS.isoDate, nowMs);
  const n1Cd = calcCountdown(MILESTONES.JLPT_N1.isoDate, nowMs);

  const syncBadgeConfig: Record<
    SyncStatus,
    { label: string; dotClass: string; badgeClass: string; icon: React.ReactNode }
  > = {
    synced: {
      label: '已同步至 Google 試算表',
      dotClass: 'bg-[#6B8E78]',
      badgeClass: 'bg-[#6B8E78]/10 text-[#466452] border-[#6B8E78]/30',
      icon: <Cloud className="w-3.5 h-3.5 text-[#547761]" />,
    },
    syncing: {
      label: '同步中...',
      dotClass: 'bg-[#5B7C99]',
      badgeClass: 'bg-[#5B7C99]/10 text-[#3F5A73] border-[#5B7C99]/30',
      icon: <Loader2 className="w-3.5 h-3.5 text-[#5B7C99] animate-spin" />,
    },
    offline: {
      label: pendingSync ? '離線暫存中（有待同步變更）' : '離線暫存中',
      dotClass: 'bg-[#C98A7A]',
      badgeClass: 'bg-[#C98A7A]/15 text-[#8E5547] border-[#C98A7A]/40',
      icon: <CloudOff className="w-3.5 h-3.5 text-[#A56252]" />,
    },
    unconfigured: {
      label: '未設定連結',
      dotClass: 'bg-[#9CA3AF]',
      badgeClass: 'bg-[#EDEAE2] text-[#6E737B] border-[#DDD7CC]',
      icon: <CloudOff className="w-3.5 h-3.5 text-[#80858D]" />,
    },
  };

  const activeSync = syncBadgeConfig[syncStatus];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      e.target.value = '';
    }
  };

  return (
    <header className="bg-white border-b border-[#E6E2DA] shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top bar: Brand + Sync controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5B7C99]/12 text-[#3F5A73] border border-[#5B7C99]/25">
                <Sparkles className="w-3.5 h-3.5" />
                2026/11/17 – 2027/12/05
              </span>
              <span className="text-xs text-[#6E737B]">
                總進度 {overallDone}/{overallTotal} 項任務（{overallPercent}%）・文獻累積 {totalEndoRead}/{totalEndoTarget} 篇
              </span>
            </div>
            <h1 className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-[#33363A]">
              54 週跨領域個人讀書進度儀表板
            </h1>
            <p className="text-xs sm:text-sm text-[#6E737B] mt-0.5">
              JLPT N1 × 韓國年會基礎韓文 × 滿級分社會四冊 × 高一上數學 × 根管治療文獻
            </p>
          </div>

          {/* Right Toolbar: Sync status & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Sync Status Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${activeSync.badgeClass}`}
              title={`上次成功同步時間：${formatSyncTime(lastSyncedAt)}`}
            >
              <span className={`w-2 h-2 rounded-full ${activeSync.dotClass}`} />
              {activeSync.icon}
              <span>{activeSync.label}</span>
              {lastSyncedAt && syncStatus === 'synced' && (
                <span className="hidden sm:inline opacity-70 text-[11px]">
                  ({formatSyncTime(lastSyncedAt)})
                </span>
              )}
            </div>

            {/* Manual Sync Button */}
            <button
              type="button"
              onClick={onManualSync}
              disabled={syncStatus === 'syncing' || syncStatus === 'unconfigured'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCD7CD] bg-[#F8F7F4] hover:bg-[#EFECE4] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium text-[#33363A] transition-colors"
              title={
                syncStatus === 'unconfigured'
                  ? '請先設定 Google Apps Script 連結'
                  : '立即與 Google 試算表雙向同步'
              }
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`}
              />
              立即手動同步
            </button>

            {/* GAS Wizard Button */}
            <button
              type="button"
              onClick={onOpenGasWizard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#5B7C99]/35 bg-[#5B7C99]/10 hover:bg-[#5B7C99]/18 text-xs font-medium text-[#3F5A73] transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              試算表設定與腳本精靈
            </button>

            {/* JSON Backup Export / Import */}
            <div className="inline-flex items-center rounded-lg border border-[#DCD7CD] bg-white overflow-hidden">
              <button
                type="button"
                onClick={onExportJson}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 hover:bg-[#F8F7F4] text-xs font-medium text-[#52565C] border-r border-[#E6E2DA] transition-colors"
                title="匯出 JSON 備份檔"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">匯出</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 hover:bg-[#F8F7F4] text-xs font-medium text-[#52565C] transition-colors"
                title="匯入 JSON 備份檔"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">匯入</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Countdown Cards Row */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Milestone 1: Korea Endo Congress */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#C98A7A]/12 via-[#FBF9F6] to-white border border-[#C98A7A]/30">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#C98A7A]/20 text-[#8E5547] shrink-0">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#C98A7A]/20 text-[#8E5547]">
                    {MILESTONES.KOREA_CONGRESS.dateStr}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-[#33363A]">
                    {MILESTONES.KOREA_CONGRESS.title}
                  </h2>
                </div>
                <p className="text-xs text-[#6E737B] mt-1">
                  {MILESTONES.KOREA_CONGRESS.subtitle}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              {koreaCd.isPast ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B8E78]">
                  <CheckCircle2 className="w-4 h-4" /> 已達成里程碑
                </span>
              ) : (
                <>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#8E5547]">
                      {koreaCd.days}
                    </span>
                    <span className="text-xs font-medium text-[#6E737B]">天</span>
                    <span className="text-sm font-bold tabular-nums text-[#A56D5E] ml-1">
                      {koreaCd.hours}
                    </span>
                    <span className="text-[11px] text-[#6E737B]">時</span>
                  </div>
                  <div className="text-[11px] text-[#6E737B]">倒數計時</div>
                </>
              )}
            </div>
          </div>

          {/* Milestone 2: JLPT N1 */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-[#5B7C99]/12 via-[#FBF9F6] to-white border border-[#5B7C99]/30">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#5B7C99]/20 text-[#3F5A73] shrink-0">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#5B7C99]/20 text-[#3F5A73]">
                    {MILESTONES.JLPT_N1.dateStr}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-[#33363A]">
                    {MILESTONES.JLPT_N1.title}
                  </h2>
                </div>
                <p className="text-xs text-[#6E737B] mt-1">{MILESTONES.JLPT_N1.subtitle}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              {n1Cd.isPast ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B8E78]">
                  <CheckCircle2 className="w-4 h-4" /> 考試日到達
                </span>
              ) : (
                <>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-[#3F5A73]">
                      {n1Cd.days}
                    </span>
                    <span className="text-xs font-medium text-[#6E737B]">天</span>
                    <span className="text-sm font-bold tabular-nums text-[#5B7C99] ml-1">
                      {n1Cd.hours}
                    </span>
                    <span className="text-[11px] text-[#6E737B]">時</span>
                  </div>
                  <div className="text-[11px] text-[#6E737B]">倒數計時</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

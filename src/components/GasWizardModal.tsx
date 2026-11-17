import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Database,
  ExternalLink,
  Loader2,
  Trash2,
  X,
} from 'lucide-react';
import { GAS_CODE_TEMPLATE } from '../data/gasTemplate';
import { isValidGasUrl } from '../services/syncService';

interface GasWizardModalProps {
  isOpen: boolean;
  currentGasUrl: string;
  onClose: () => void;
  onSaveAndTest: (url: string) => Promise<{ ok: boolean; message: string }>;
  onClearUrl: () => void;
}

export const GasWizardModal: React.FC<GasWizardModalProps> = ({
  isOpen,
  currentGasUrl,
  onClose,
  onSaveAndTest,
  onClearUrl,
}) => {
  const [urlInput, setUrlInput] = useState(currentGasUrl);
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUrlInput(currentGasUrl);
      setFeedback(null);
      setCopied(false);
    }
  }, [isOpen, currentGasUrl]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GAS_CODE_TEMPLATE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setFeedback({
        ok: false,
        message: '剪貼簿權限受限，請手動選取下方程式碼複製。',
      });
    }
  };

  const handleTestAndInit = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setFeedback({ ok: false, message: '請先貼上 Google Apps Script Web App 網址。' });
      return;
    }
    if (!isValidGasUrl(trimmed)) {
      setFeedback({
        ok: false,
        message: '網址需以 https://script.google.com/ 開頭（請貼上「部署後的網頁應用程式網址」）。',
      });
      return;
    }

    setTesting(true);
    setFeedback(null);
    const result = await onSaveAndTest(trimmed);
    setTesting(false);
    setFeedback(result);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#22252A]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gas-wizard-title"
    >
      <div className="w-full max-w-3xl max-h-[90vh] rounded-2xl bg-white border border-[#E6E2DA] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EFECE4] bg-[#FCFBF9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#5B7C99]/15 text-[#3F5A73]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="gas-wizard-title" className="text-base sm:text-lg font-bold text-[#33363A]">
                Google 試算表雙向自動同步設定精靈
              </h2>
              <p className="text-xs text-[#6E737B]">
                LocalStorage 優先寫入 ＋ Google Apps Script 跨裝置自動同步（電腦／手機共用進度）
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E737B] hover:bg-[#EFECE4] hover:text-[#33363A] transition-colors"
            aria-label="關閉設定視窗"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto morandi-scroll space-y-5 text-sm">
          {/* Step-by-step guide */}
          <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E6E2DA] space-y-2.5">
            <h3 className="font-bold text-[#33363A] text-sm">三步驟完成免費雲端試算表連線：</h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-[#52565C]">
              <li>
                前往{' '}
                <a
                  href="https://sheets.new"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-0.5 text-[#5B7C99] font-semibold hover:underline"
                >
                  Google 試算表 (sheets.new)
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                建立空白試算表，點選上方選單 <strong>「擴充功能」→「Apps Script」</strong>。
              </li>
              <li>
                清空編輯器預設內容，點擊下方 <strong>「一鍵複製 Code.gs 程式碼」</strong> 貼上並儲存（Ctrl+S / Cmd+S）。
              </li>
              <li>
                點擊右上角 <strong>「部署」→「新增部署作業」</strong>，類型選 <strong>「網頁應用程式」</strong>，執行身分選 <strong>「我」</strong>、誰可以存取選 <strong>「所有人」</strong>，部署授權後複製 <strong>網頁應用程式網址</strong> 貼入下方欄位。
              </li>
            </ol>
            <p className="text-[11px] text-[#6E737B] pt-1">
              連線測試時將自動建立 <code>Tasks</code>、<code>WeeklyMeta</code>、<code>BooksSummary</code> 三個工作表與標題列。
            </p>
          </div>

          {/* Code.gs Copy Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#33363A]">
                Apps Script 程式碼（Code.gs）
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  copied
                    ? 'bg-[#6B8E78] text-white'
                    : 'bg-[#5B7C99] hover:bg-[#4B6B87] text-white'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '已複製完整 Code.gs' : '一鍵複製 Code.gs 程式碼'}
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-[#272B30] text-[#E6E2DA] text-[11px] leading-relaxed max-h-52 overflow-auto morandi-scroll select-all">
              <code>{GAS_CODE_TEMPLATE}</code>
            </pre>
          </div>

          {/* URL Input & Test Action */}
          <div className="space-y-2.5">
            <label htmlFor="gas-url-input" className="block text-xs font-bold text-[#33363A]">
              貼上 Google Apps Script Web App 網址
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="gas-url-input"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 rounded-xl border border-[#DCD7CD] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#33363A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5B7C99] focus:ring-2 focus:ring-[#5B7C99]/20"
              />
              <button
                type="button"
                onClick={handleTestAndInit}
                disabled={testing}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6B8E78] hover:bg-[#5A7B66] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
              >
                {testing && <Loader2 className="w-4 h-4 animate-spin" />}
                測試連線並初始化試算表
              </button>
            </div>

            {feedback && (
              <div
                className={`flex items-start gap-2 p-3 rounded-xl border text-xs ${
                  feedback.ok
                    ? 'bg-[#6B8E78]/12 border-[#6B8E78]/35 text-[#3F634D]'
                    : 'bg-[#B56555]/12 border-[#B56555]/35 text-[#834134]'
                }`}
              >
                {feedback.ok ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-[#EFECE4] bg-[#FCFBF9] flex items-center justify-between">
          {currentGasUrl ? (
            <button
              type="button"
              onClick={() => {
                onClearUrl();
                setUrlInput('');
                setFeedback({ ok: true, message: '已中斷與試算表的同步連結，資料仍保留於本機。' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#B56555] hover:bg-[#B56555]/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              移除同步連結
            </button>
          ) : (
            <span className="text-xs text-[#6E737B]">未設定連結前仍可完整離線使用</span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#DCD7CD] bg-white hover:bg-[#F8F7F4] text-xs font-semibold text-[#33363A] transition-colors"
          >
            完成關閉
          </button>
        </div>
      </div>
    </div>
  );
};

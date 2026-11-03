import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Check,
  Copy,
  ExternalLink,
  Send,
  AlertCircle,
  X,
  HelpCircle,
  Database
} from 'lucide-react';
import {
  getSheetWebhookUrl,
  setSheetWebhookUrl,
  getSpreadsheetUrl,
  setSpreadsheetUrl,
  sendGameResultToSheet,
  formatCurrentTimestamp,
  GOOGLE_APPS_SCRIPT_CODE,
  getUserName,
  getPlayCount,
  TARGET_SPREADSHEET_URL,
} from '../utils/googleSheets';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserName?: string;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  currentUserName = getUserName(),
}) => {
  const [spreadsheetUrl, setSpreadsheetUrlState] = useState(getSpreadsheetUrl() || TARGET_SPREADSHEET_URL);
  const [webhookUrl, setWebhookUrlState] = useState(getSheetWebhookUrl());
  const [isCopied, setIsCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const [activeTab, setActiveTab] = useState<'settings' | 'script' | 'guide'>('settings');

  if (!isOpen) return null;

  const isSheetDocUrl = webhookUrl.includes('docs.google.com/spreadsheets');

  const handleSaveUrl = () => {
    setSheetWebhookUrl(webhookUrl);
    if (spreadsheetUrl) {
      setSpreadsheetUrl(spreadsheetUrl);
    }
    setTestResult({
      status: 'idle',
      message: '설정이 성공적으로 저장되었습니다.',
    });
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = GOOGLE_APPS_SCRIPT_CODE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleTestSend = async () => {
    if (!webhookUrl.trim()) {
      setTestResult({
        status: 'error',
        message: '먼저 구글 웹 앱 URL(Web App URL)을 입력해주세요.',
      });
      return;
    }

    if (isSheetDocUrl) {
      setTestResult({
        status: 'error',
        message: '입력하신 주소는 구글 시트 문서 주소입니다. 상단 [1분 연동 가이드]를 참고하여 [확장 프로그램 > Apps Script]에서 웹 앱으로 배포한 URL (https://script.google.com/macros/s/.../exec)을 입력해주세요.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult({ status: 'idle', message: '' });

    // Save current url first
    setSheetWebhookUrl(webhookUrl);
    if (spreadsheetUrl) {
      setSpreadsheetUrl(spreadsheetUrl);
    }

    const testPayload = {
      timestamp: formatCurrentTimestamp(),
      name: currentUserName || '익명 학생',
      play_count: getPlayCount(currentUserName) || 1,
      correct_count: 12,
      wrong_count: 3,
      sentence_taps: '[1] Camels can survive in the dry desert.(사막: 3회) | [2] I write my thoughts in my diary every night.(일기: 2회)',
      average_taps: 2.5,
      total_sentence_taps: 38,
    };

    const res = await sendGameResultToSheet(testPayload, webhookUrl);

    setIsTesting(false);
    if (res.success) {
      setTestResult({
        status: 'success',
        message: `테스트 데이터 전송 성공! 구글 시트의 [timestamp, name, play_count, correct_count, wrong_count, sentence_taps, average_taps] 7개 열 행을 확인해보세요.`,
      });
    } else {
      setTestResult({
        status: 'error',
        message: res.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-stone-900 border-2 border-emerald-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-stone-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-emerald-200">
                구글 시트(Google Sheets) 자동 연동
              </h2>
              <p className="text-xs text-stone-400">
                초등 5학년 영단어 학습 결과 5열(timestamp, name, play_count, correct_count, wrong_count)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-800 bg-stone-950/50 px-4 sm:px-6 pt-2 gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>시트 및 웹 앱 연동</span>
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'script'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>앱스 스크립트 코드</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>1분 연동 가이드</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Tab 1: Settings & Test Send */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Data Schema Preview (7 columns) */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Database className="w-4 h-4 text-emerald-400" />
                    저장될 데이터 형식 (7개 열 스키마)
                  </span>
                  <span className="text-[11px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700/50">
                    문장 탭 빈도 & 평균 포함
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-center text-[10px] sm:text-[11px] font-mono">
                  <div className="bg-stone-800/80 p-2 rounded border border-stone-700">
                    <div className="text-stone-400 font-bold mb-0.5">timestamp</div>
                    <div className="text-amber-300 truncate">2026-11-02...</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-stone-700">
                    <div className="text-stone-400 font-bold mb-0.5">name</div>
                    <div className="text-emerald-300 font-bold truncate">{currentUserName || '익명 학생'}</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-stone-700">
                    <div className="text-stone-400 font-bold mb-0.5">play_count</div>
                    <div className="text-cyan-300">{(getPlayCount(currentUserName) || 1)}회</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-stone-700">
                    <div className="text-stone-400 font-bold mb-0.5">correct_count</div>
                    <div className="text-green-400 font-bold">12개</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-stone-700">
                    <div className="text-stone-400 font-bold mb-0.5">wrong_count</div>
                    <div className="text-rose-400 font-bold">3개</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-amber-600/50">
                    <div className="text-amber-400 font-bold mb-0.5">sentence_taps</div>
                    <div className="text-amber-200 truncate">문장별 탭요약</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded border border-amber-600/50">
                    <div className="text-amber-400 font-bold mb-0.5">average_taps</div>
                    <div className="text-amber-200 font-bold">2.5회</div>
                  </div>
                </div>
                <p className="text-[10px] text-stone-400 text-right">
                  * .env.local의 <code className="text-emerald-300">NEXT_PUBLIC_GOOGLE_SCRIPT_URL</code>을 통해 각 문장별 탭 빈도 및 평균 탭 수가 시트에 자동 저장됩니다.
                </p>
              </div>

              {/* Web App URL Input (Required for receiving data) */}
              <div>
                <label className="block font-bold text-stone-200 mb-1.5 flex items-center justify-between">
                  <span>구글 앱스 스크립트 웹 앱 URL (Web App URL) <strong className="text-emerald-400">*필수</strong></span>
                  <span className="text-[10px] text-stone-400 font-normal">https://script.google.com/macros/s/...</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrlState(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-stone-100 placeholder-stone-500 font-mono text-xs focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleSaveUrl}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-xl font-bold border border-stone-600 transition-colors shrink-0"
                  >
                    저장
                  </button>
                </div>

                {isSheetDocUrl && (
                  <div className="mt-2 p-2.5 bg-amber-950/60 border border-amber-500/60 rounded-xl text-amber-200 text-xs flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>구글 시트 스프레드시트 주소를 입력하셨습니다!</strong>
                      <p className="mt-0.5 text-[11px] text-amber-300/90 leading-tight">
                        데이터를 실시간으로 저장하려면 시트 상단 메뉴 <strong>[확장 프로그램] → [Apps Script]</strong>에서 코드를 배포하고 받은 <strong>웹 앱 URL (https://script.google.com/macros/s/...)</strong>을 여기에 입력해주세요.
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-stone-400 mt-1">
                  💡 구글 시트의 [확장 프로그램] &gt; [Apps Script]에서 [배포] &gt; [웹 앱]으로 생성한 URL을 붙여넣으세요.
                </p>
              </div>

              {/* Optional Spreadsheet Link Input */}
              <div className="pt-1">
                <label className="block font-bold text-stone-200 mb-1.5 flex items-center justify-between">
                  <span>내 구글 시트 링크 (Spreadsheet Document Link) <span className="text-stone-400 font-normal">(선택사항)</span></span>
                  {spreadsheetUrl && (
                    <a
                      href={spreadsheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>시트 바로 열기</span>
                    </a>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={spreadsheetUrl}
                    onChange={(e) => setSpreadsheetUrlState(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-stone-100 placeholder-stone-500 font-mono text-xs focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleSaveUrl}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-xl font-bold border border-stone-600 transition-colors shrink-0"
                  >
                    저장
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  선생님/학생의 구글 스프레드시트 링크를 등록해두면 언제든 쉽게 열어볼 수 있습니다.
                </p>
              </div>

              {/* Action Buttons: Test Connection */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800">
                <button
                  onClick={handleTestSend}
                  disabled={isTesting}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? '구글 시트로 전송 중...' : '테스트 데이터 전송'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('script')}
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>스크립트 코드 보기 & 복사</span>
                </button>
              </div>

              {/* Test Result Message */}
              {testResult.message && (
                <div
                  className={`p-3 rounded-xl border flex items-start gap-2 ${
                    testResult.status === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                      : testResult.status === 'error'
                      ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                      : 'bg-stone-800 border-stone-700 text-stone-300'
                  }`}
                >
                  {testResult.status === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-relaxed">{testResult.message}</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Script Code Generation */}
          {activeTab === 'script' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-200">Google Apps Script 생성 코드</h3>
                  <p className="text-[11px] text-stone-400">
                    아래 코드를 복사하여 구글 시트의 Apps Script 편집기에 붙여넣으세요.
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 text-xs transition-colors shadow-sm"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? '복사 완료!' : '코드 전체 복사'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-[11px] font-mono text-emerald-300/90 max-h-64 overflow-y-auto leading-relaxed select-all">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>

              <div className="p-3 bg-amber-950/30 border border-amber-600/30 rounded-xl text-xs text-amber-200/90 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">배포 시 주의사항:</strong> [새 배포] 시 액세스 권한을 반드시 <span className="underline font-bold text-white">모든 사용자(Anyone)</span>로 선택해야 게임 앱에서 인증 오류 없이 안전하게 기록할 수 있습니다.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Step-by-Step Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs leading-relaxed text-stone-300">
              <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60 space-y-2">
                <h3 className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" />
                  초간단 4단계 설정 가이드
                </h3>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-300 pl-1">
                  <li>
                    구글 시트 생성 후 메뉴에서 <strong>[확장 프로그램] → [Apps Script]</strong>를 클릭합니다.
                  </li>
                  <li>
                    기존 기본 코드를 지우고, [앱스 스크립트 코드] 탭의 <strong>코드를 복사하여 붙여넣고 저장(Ctrl+S)</strong>합니다.
                  </li>
                  <li>
                    우측 상단 <strong>[배포] → [새 배포]</strong> 클릭 후, 톱니바퀴에서 <strong>[웹 앱]</strong>을 선택합니다.
                    <br />
                    <span className="text-amber-400 font-semibold pl-4 inline-block">
                      * '액세스 권한이 있는 사용자'를 반드시 <strong>[모든 사용자(Anyone)]</strong>로 설정!
                    </span>
                  </li>
                  <li>
                    [배포] 후 나타나는 <strong>웹 앱 URL (https://script.google.com/macros/s/...)</strong>을 복사하여 위 설정창에 붙여넣으면 완료!
                  </li>
                </ol>
              </div>

              <div className="bg-stone-800/40 p-3 rounded-xl border border-stone-700/40 text-[11px] text-stone-300">
                ✨ 이제 초등학교 5학년 학생들이 게임을 마칠 때마다 <strong>[timestamp, name, play_count, correct_count, wrong_count]</strong> 5개 열 데이터가 실시간으로 구글 시트에 차곡차곡 누적됩니다.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-stone-950 border-t border-stone-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold text-xs sm:text-sm transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

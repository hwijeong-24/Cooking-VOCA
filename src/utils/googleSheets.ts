/**
 * Google Sheets integration helper for Cooking Voca game.
 * Automatically tracks student name, cumulative play count, and logs:
 * - timestamp (기록 일시 - e.g. "2026-11-02 20:08:15")
 * - name (학생 이름 - e.g. "JSG", "영희", "익명 학생")
 * - play_count (게임 플레이 횟수)
 * - correct_count (맞힌 정답 개수)
 * - wrong_count (틀린 오답 개수)
 */

export interface SentenceTapDetail {
  sentence: string;
  tapCount: number;
  word?: string;
  meaning?: string;
}

export interface SheetLogPayload {
  timestamp: string;
  name?: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
  sentence_taps?: string;        // 문장별 탭 빈도 (텍스트 서식 요약 또는 JSON)
  average_taps?: number;         // 문장당 평균 탭 수
  total_sentence_taps?: number;  // 전체 문장 탭 합계
  sentence_details?: SentenceTapDetail[];
}

export interface SheetLogResult {
  success: boolean;
  message: string;
  responseStatus?: number;
}

const STORAGE_KEYS = {
  USER_NAME: 'cooking_voca_user_name',
  PLAY_COUNT: 'cooking_voca_play_count',
  USER_PLAY_COUNTS: 'cooking_voca_user_play_counts', // per-user count map
  SHEET_WEBHOOK_URL: 'cooking_voca_sheet_webhook_url',
  SPREADSHEET_URL: 'cooking_voca_spreadsheet_url',
  LAST_LOGGED: 'cooking_voca_last_sheet_log',
};

/**
 * Get saved student name (defaults to '익명 학생')
 */
export function getUserName(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_NAME);
    return saved && saved.trim() ? saved.trim() : '익명 학생';
  } catch {
    return '익명 학생';
  }
}

/**
 * Save student name
 */
export function setUserName(name: string): void {
  try {
    const clean = name.trim() || '익명 학생';
    localStorage.setItem(STORAGE_KEYS.USER_NAME, clean);
  } catch (e) {
    console.error('Failed to save user name', e);
  }
}

/**
 * Get current cumulative play count for the user
 */
export function getPlayCount(userName?: string): number {
  try {
    const targetName = (userName || getUserName()).trim();
    const mapStr = localStorage.getItem(STORAGE_KEYS.USER_PLAY_COUNTS);
    if (mapStr) {
      const map = JSON.parse(mapStr);
      if (typeof map[targetName] === 'number') {
        return map[targetName];
      }
    }
    // Fallback to global play count
    const globalCount = parseInt(localStorage.getItem(STORAGE_KEYS.PLAY_COUNT) || '0', 10);
    return isNaN(globalCount) ? 0 : globalCount;
  } catch {
    return 0;
  }
}

/**
 * Increment and return the new play count for the student
 */
export function incrementPlayCount(userName?: string): number {
  try {
    const targetName = (userName || getUserName()).trim();
    let map: Record<string, number> = {};
    try {
      const mapStr = localStorage.getItem(STORAGE_KEYS.USER_PLAY_COUNTS);
      if (mapStr) map = JSON.parse(mapStr);
    } catch {
      map = {};
    }

    const currentCount = typeof map[targetName] === 'number' ? map[targetName] : 0;
    const nextCount = currentCount + 1;
    map[targetName] = nextCount;
    localStorage.setItem(STORAGE_KEYS.USER_PLAY_COUNTS, JSON.stringify(map));

    // Also update global count
    const globalCount = parseInt(localStorage.getItem(STORAGE_KEYS.PLAY_COUNT) || '0', 10);
    localStorage.setItem(STORAGE_KEYS.PLAY_COUNT, (isNaN(globalCount) ? nextCount : globalCount + 1).toString());

    return nextCount;
  } catch {
    return 1;
  }
}

export const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyc8BiCWmzMQszRj7aoGZMAbsqcTEPsE7f8Gl9cLsBU9b_35tZR0feG05IJRWXbrL5b/exec';

/**
 * Get saved Google Apps Script Web App URL
 * Priority:
 * 1. NEXT_PUBLIC_GOOGLE_SCRIPT_URL (.env.local via Vite or process.env)
 * 2. localStorage saved webhook URL
 * 3. VITE_GOOGLE_SHEETS_WEBHOOK_URL
 * 4. Default user-provided Web App URL
 */
export function getSheetWebhookUrl(): string {
  try {
    // 1. Check NEXT_PUBLIC_GOOGLE_SCRIPT_URL (.env.local)
    const envPublic = (import.meta as unknown as { env?: { NEXT_PUBLIC_GOOGLE_SCRIPT_URL?: string } })?.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (envPublic && envPublic.trim()) return envPublic.trim();

    // Check process.env fallback
    if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL) {
      const pUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL.trim();
      if (pUrl) return pUrl;
    }

    // 2. Check user customized URL in localStorage
    const local = localStorage.getItem(STORAGE_KEYS.SHEET_WEBHOOK_URL);
    if (local && local.trim()) return local.trim();

    // 3. Check VITE_GOOGLE_SHEETS_WEBHOOK_URL
    const envVite = (import.meta as unknown as { env?: { VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string } })?.env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
    if (envVite && envVite.trim()) return envVite.trim();

    // 4. Fallback to default user-provided Web App URL
    return DEFAULT_GOOGLE_SCRIPT_URL;
  } catch {
    return DEFAULT_GOOGLE_SCRIPT_URL;
  }
}

/**
 * Save Google Apps Script Web App URL
 */
export function setSheetWebhookUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHEET_WEBHOOK_URL, url.trim());
  } catch (e) {
    console.error('Failed to save sheet url', e);
  }
}

export const TARGET_SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM/edit?usp=sharing';
export const TARGET_SPREADSHEET_ID = '1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM';

/**
 * Get saved Google Spreadsheet Document URL (defaults to user's sheet)
 */
export function getSpreadsheetUrl(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SPREADSHEET_URL);
    return saved && saved.trim() ? saved.trim() : TARGET_SPREADSHEET_URL;
  } catch {
    return TARGET_SPREADSHEET_URL;
  }
}

/**
 * Save Google Spreadsheet Document URL
 */
export function setSpreadsheetUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SPREADSHEET_URL, url.trim());
  } catch (e) {
    console.error('Failed to save spreadsheet url', e);
  }
}

/**
 * Format current timestamp in Korean Standard Time (KST): YYYY-MM-DD HH:mm:ss
 */
export function formatCurrentTimestamp(date: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Get last saved log payload
 */
export function getLastLoggedResult(): { payload: SheetLogPayload; date: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LAST_LOGGED);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// In-memory deduplication cache to prevent duplicate submissions (React StrictMode, double mount, re-renders)
let lastSentSignature = '';
let lastSentTimestamp = 0;
let inFlightRequest: Promise<SheetLogResult> | null = null;
let inFlightSignature = '';

/**
 * Send game results and sentence tap statistics to Google Sheets via Google Apps Script Web App
 */
export async function sendGameResultToSheet(payload: SheetLogPayload, targetUrl?: string): Promise<SheetLogResult> {
  const webhookUrl = (targetUrl !== undefined ? targetUrl : getSheetWebhookUrl()).trim();

  if (!webhookUrl) {
    return {
      success: false,
      message: '구글 앱스 스크립트 웹 앱 URL이 설정되지 않았습니다.',
    };
  }

  // Ensure valid URL structure
  if (!webhookUrl.startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: '올바른 Google Apps Script 웹 앱 URL 형식이 아닙니다. (https://script.google.com/macros/s/... 로 시작해야 합니다)',
    };
  }

  // Generate a unique signature for this round's result
  const signature = `${payload.name || ''}_${payload.play_count}_${payload.correct_count}_${payload.wrong_count}_${payload.average_taps ?? 0}`;
  const now = Date.now();

  // Deduplication check: If identical record was sent within 20 seconds, suppress duplicate submission
  if (lastSentSignature === signature && now - lastSentTimestamp < 20000) {
    return {
      success: true,
      message: '중복 전송 방지: 이미 구글 시트에 저장된 기록입니다.',
    };
  }

  // In-flight deduplication: If identical request is currently pending, share existing promise
  if (inFlightRequest && inFlightSignature === signature) {
    return inFlightRequest;
  }

  inFlightSignature = signature;
  inFlightRequest = (async (): Promise<SheetLogResult> => {
    try {
      // 1. Send via POST with text/plain JSON payload to prevent CORS preflight redirect blocks
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      lastSentSignature = signature;
      lastSentTimestamp = Date.now();

      // Save to localStorage as last successful log
      try {
        localStorage.setItem(
          STORAGE_KEYS.LAST_LOGGED,
          JSON.stringify({
            payload,
            date: new Date().toISOString(),
          })
        );
      } catch {
        // ignore
      }

      return {
        success: true,
        message: '구글 시트에 문장별 탭 빈도 및 학습 결과가 성공적으로 전송되었습니다!',
      };
    } catch (error) {
      console.warn('POST failed, trying GET fallback...', error);
      try {
        // 2. GET fallback with query params
        const params = new URLSearchParams({
          timestamp: payload.timestamp,
          name: payload.name || '익명 학생',
          play_count: payload.play_count.toString(),
          correct_count: payload.correct_count.toString(),
          wrong_count: payload.wrong_count.toString(),
          sentence_taps: payload.sentence_taps || '',
          average_taps: (payload.average_taps !== undefined ? payload.average_taps : 0).toString(),
          total_sentence_taps: (payload.total_sentence_taps !== undefined ? payload.total_sentence_taps : 0).toString(),
        });

        const getUrl = `${webhookUrl}${webhookUrl.includes('?') ? '&' : '?'}${params.toString()}`;
        await fetch(getUrl, { mode: 'no-cors' });

        lastSentSignature = signature;
        lastSentTimestamp = Date.now();

        try {
          localStorage.setItem(
            STORAGE_KEYS.LAST_LOGGED,
            JSON.stringify({
              payload,
              date: new Date().toISOString(),
            })
          );
        } catch {
          // ignore
        }

        return {
          success: true,
          message: '구글 시트에 학습 결과가 전송되었습니다. (GET)',
        };
      } catch (fallbackError) {
        console.error('Sheet logging error', fallbackError);
        return {
          success: false,
          message: fallbackError instanceof Error ? fallbackError.message : '구글 시트 전송 중 오류가 발생했습니다.',
        };
      }
    } finally {
      inFlightRequest = null;
      inFlightSignature = '';
    }
  })();

  return inFlightRequest;
}

/**
 * Complete Google Apps Script source code template for the Google Sheet.
 * Tailored for 7-column schema:
 * timestamp, name, play_count, correct_count, wrong_count, sentence_taps, average_taps
 * 
 * Target Sheet: https://docs.google.com/spreadsheets/d/1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM/edit?usp=sharing
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =======================================================================
 * 쿠킹 보카 (Cooking Voca) - 초등 5학년 / 중1 영어 단어 게임 구글 시트 연동 스크립트
 * =======================================================================
 * 
 * [대상 구글 스프레드시트]
 * 링크: https://docs.google.com/spreadsheets/d/1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM/edit?usp=sharing
 * 시트 ID: 1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM
 *
 * [저장할 7개 열 구조]
 * 1열: timestamp     (기록 일시 - 예: 2026-11-02 20:08:15)
 * 2열: name          (학생 이름 - 예: 홍길동, 김민준)
 * 3열: play_count    (게임 플레이 횟수 - 예: 1)
 * 4열: correct_count (맞힌 정답 수 - 예: 12)
 * 5열: wrong_count   (틀린 오답 수 - 예: 3)
 * 6열: sentence_taps (각 문장별 탭 빈도 - 예: [1] Camels can survive in the dry desert.(2회) | ...)
 * 7열: average_taps  (문장당 평균 탭 빈도 - 예: 2.3)
 *
 * [1분 설치 및 웹 앱 배포 방법]
 * 1. 위 구글 스프레드시트 열기
 * 2. 상단 메뉴에서 [확장 프로그램] -> [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 이 스크립트 전체를 붙여넣기 후 [저장 (Ctrl+S)]
 * 4. 우측 상단 파란색 [배포] -> [새 배포] 클릭
 * 5. 왼쪽 톱니바퀴 -> [웹 앱(Web App)] 선택
 * 6. 배포 설정:
 *    - 설명: 영어 단어 게임 및 문장 탭 빈도 기록
 *    - 다음 사용자 권한으로 실행: '나(내 계정)'
 *    - 액세스 권한이 있는 사용자: '모든 사용자(Anyone)'  <-- [★반드시 '모든 사용자' 선택]
 * 7. [배포] 클릭 -> 권한 승인 (고급 -> 이동 클릭)
 * 8. 생성된 [웹 앱 URL] 복사 후 .env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 또는 게임 설정에 지정
 */

// 고유 스프레드시트 ID (스탠드얼론 실행 시에도 작동하도록 지원)
var SPREADSHEET_ID = "1xc0Q4OBz0kFuK44vO2qBWNCzlr-dkY-zOgMAloqwRmM";

function getTargetSheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active.getActiveSheet();
  } catch (e) {
    // ignore
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // 동시 접속 충돌 방지: 최대 20초 락 대기
  lock.tryLock(20000);

  try {
    var sheet = getTargetSheet();
    var defaultHeaders = ["timestamp", "name", "play_count", "correct_count", "wrong_count", "sentence_taps", "average_taps"];

    // 1. 시트 1행 헤더 확인 및 자동 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(defaultHeaders);
      sheet.getRange(1, 1, 1, defaultHeaders.length)
        .setFontWeight("bold")
        .setBackground("#dcfce7") // 부드러운 에메랄드 그린
        .setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 2. 전달된 데이터 파싱 (JSON 또는 파라미터)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 기본 일시 (한국 표준시 KST)
    var defaultDate = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
    var timestamp = data.timestamp || data["timestamp "] || defaultDate;
    var name = (data.name || data["name "] || "익명 학생").toString().trim();

    var playCount = 1;
    if (data.play_count !== undefined) playCount = Number(data.play_count);
    else if (data["play_count "] !== undefined) playCount = Number(data["play_count "]);

    var correctCount = 0;
    if (data.correct_count !== undefined) correctCount = Number(data.correct_count);
    else if (data["correct_count "] !== undefined) correctCount = Number(data["correct_count "]);

    var wrongCount = 0;
    if (data.wrong_count !== undefined) wrongCount = Number(data.wrong_count);
    else if (data["wrong_count "] !== undefined) wrongCount = Number(data["wrong_count "]);

    var sentenceTaps = data.sentence_taps || data["sentence_taps "] || "";
    if (typeof sentenceTaps === "object") {
      sentenceTaps = JSON.stringify(sentenceTaps);
    }

    var averageTaps = 0;
    if (data.average_taps !== undefined) averageTaps = Number(data.average_taps);
    else if (data["average_taps "] !== undefined) averageTaps = Number(data["average_taps "]);

    // 3. 1행 헤더를 분석하여 공백 무관하게 정확한 열 인덱스 매핑
    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var colMap = {};
    for (var i = 0; i < headers.length; i++) {
      var h = String(headers[i]).trim().toLowerCase();
      if (h) {
        colMap[h] = i + 1; // 1-based column index
      }
    }

    // 기존 5개 열 시트인 경우 sentence_taps, average_taps 자동 확장
    if (!colMap["sentence_taps"]) {
      var nextCol1 = headers.length + 1;
      sheet.getRange(1, nextCol1).setValue("sentence_taps").setFontWeight("bold").setBackground("#dcfce7");
      colMap["sentence_taps"] = nextCol1;
      headers.push("sentence_taps");
    }
    if (!colMap["average_taps"]) {
      var nextCol2 = headers.length + 1;
      sheet.getRange(1, nextCol2).setValue("average_taps").setFontWeight("bold").setBackground("#dcfce7");
      colMap["average_taps"] = nextCol2;
      headers.push("average_taps");
    }

    // 4. 헤더 순서에 맞춰 정확한 셀 위치에 배치
    var rowData = new Array(headers.length);
    for (var k = 0; k < headers.length; k++) {
      rowData[k] = "";
    }
    if (colMap["timestamp"]) rowData[colMap["timestamp"] - 1] = timestamp;
    if (colMap["name"]) rowData[colMap["name"] - 1] = name;
    if (colMap["play_count"]) rowData[colMap["play_count"] - 1] = playCount;
    if (colMap["correct_count"]) rowData[colMap["correct_count"] - 1] = correctCount;
    if (colMap["wrong_count"]) rowData[colMap["wrong_count"] - 1] = wrongCount;
    if (colMap["sentence_taps"]) rowData[colMap["sentence_taps"] - 1] = sentenceTaps;
    if (colMap["average_taps"]) rowData[colMap["average_taps"] - 1] = averageTaps;

    sheet.appendRow(rowData);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "영어 학습 결과 및 문장별 탭 빈도가 성공적으로 저장되었습니다.",
      record: {
        timestamp: timestamp,
        name: name,
        play_count: playCount,
        correct_count: correctCount,
        wrong_count: wrongCount,
        sentence_taps: sentenceTaps,
        average_taps: averageTaps
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return doPost(e);
}
`;


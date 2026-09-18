import React, { useEffect } from 'react';
import { GameHistoryItem, Semester } from '../types';
import { ChefAvatar } from './ChefAvatar';
import {
  Coins,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  Volume2,
  Award,
  BookOpen,
  AlertTriangle,
  Sparkles,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakEnglishWord, playFinishFanfare } from '../utils/audio';

interface ResultScreenProps {
  totalCoins: number;
  maxCoins: number;
  history: GameHistoryItem[];
  semester: Semester;
  soundEnabled: boolean;
  onRetry: () => void;
  onRetryIncorrectOnly?: (incorrectWords: GameHistoryItem[]) => void;
  onBackToHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  totalCoins,
  maxCoins,
  history,
  soundEnabled,
  onRetry,
  onRetryIncorrectOnly,
  onBackToHome
}) => {
  const incorrectList = history.filter((item) => !item.isCorrect);
  const correctCount = history.filter((item) => item.isCorrect).length;
  const isPerfect = incorrectList.length === 0;

  useEffect(() => {
    // Play fanfare
    playFinishFanfare(soundEnabled);

    // Launch celebratory confetti
    try {
      if (isPerfect) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 300);
      } else if (correctCount >= 10) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    } catch (e) {
      console.debug('Confetti error', e);
    }
  }, [isPerfect, correctCount, soundEnabled]);

  // Chef rank title based on coins
  const getChefRank = () => {
    if (correctCount === 15) return { title: '미슐랭 3스타 마스터 셰프', badge: '⭐⭐⭐ 최고등급', color: 'from-amber-400 to-yellow-500' };
    if (correctCount >= 12) return { title: '수석 총괄 셰프 (Head Chef)', badge: '⭐⭐ 우수등급', color: 'from-amber-300 to-amber-500' };
    if (correctCount >= 9) return { title: '유망주 주니어 셰프', badge: '⭐ 숙련등급', color: 'from-blue-300 to-blue-500' };
    return { title: '수련 셰프 (Apprentice)', badge: '🌱 복습필요', color: 'from-stone-300 to-stone-400' };
  };

  const rank = getChefRank();

  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col justify-between p-3 sm:p-5 text-stone-800 overflow-y-auto"
      style={{
        background: 'radial-gradient(ellipse at center, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
      }}
      id="result-screen"
    >
      {/* Top Header Summary */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between z-10 border-b border-amber-900/15 pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-700" />
          <h1 className="text-lg sm:text-xl font-black text-amber-950">
            영업 마감! 주방 결산 리포트
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-700/30 rounded-full font-bold text-xs sm:text-sm text-amber-950 transition-all flex items-center gap-1 active:scale-95"
            id="back-home-top-btn"
          >
            <Home className="w-4 h-4 text-amber-800" />
            <span>홈으로</span>
          </button>
        </div>
      </header>

      {/* Center Main Content */}
      <main className="w-full max-w-4xl mx-auto my-2 sm:my-3 z-10 flex flex-col gap-4">
        {/* Score & Chef Badge Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-3 border-amber-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Chef Illustration with expression */}
          <div className="flex flex-col items-center shrink-0">
            <ChefAvatar
              size="lg"
              expression={isPerfect ? 'celebrate' : correctCount >= 10 ? 'confident' : 'thinking'}
            />
            <span className="mt-1 text-xs font-black text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
              {rank.badge}
            </span>
          </div>

          {/* Stats Breakdown */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-800">
                CHEF EVALUATION
              </span>
              {isPerfect && (
                <span className="bg-emerald-500 text-white text-[11px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  PERFECT ALL CLEAR
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {rank.title}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              총 5명의 손님 주문(15개 재료) 중 <strong className="text-emerald-700 text-base">{correctCount}개</strong>를 성공적으로 서빙했습니다.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {/* Accumulated Coins */}
              <div
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black px-4 py-2 rounded-2xl border-2 border-yellow-200 shadow-md"
                id="result-coins-box"
              >
                <Coins className="w-6 h-6 text-amber-950 fill-amber-300" />
                <div className="leading-tight">
                  <div className="text-[10px] font-bold text-amber-900 uppercase">누적 획득 코인</div>
                  <div className="text-xl sm:text-2xl font-black">
                    {totalCoins} <span className="text-sm font-bold text-amber-900">/ {maxCoins} G</span>
                  </div>
                </div>
              </div>

              {/* Accuracy rate */}
              <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center leading-tight">
                <div className="text-[10px] font-bold text-amber-800 uppercase">정답률 (Accuracy)</div>
                <div className="text-xl sm:text-2xl font-black text-amber-950">
                  {Math.round((correctCount / (history.length || 15)) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incorrect Words Review Section (PRD: List of incorrect words, retry option) */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <h3 className="text-base sm:text-lg font-black text-amber-950">
                오답 클리닉 & 스펠링 함정 분석
              </h3>
            </div>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                incorrectList.length === 0
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {incorrectList.length === 0 ? '오답 없음 (완벽해요!)' : `틀린 단어 ${incorrectList.length}개`}
            </span>
          </div>

          {/* Perfect case banner */}
          {incorrectList.length === 0 ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center text-emerald-900">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-2 animate-bounce" />
              <h4 className="text-lg font-black">축하합니다! 모든 스펠링 함정을 완벽하게 피했습니다!</h4>
              <p className="text-xs sm:text-sm text-emerald-700 mt-1">
                중1 필수 영단어와 헷갈리는 유사 철자를 훌륭하게 구별해 냈습니다.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1" id="incorrect-words-list">
              {incorrectList.map((item, idx) => {
                const wasTrap = item.selectedWord.toLowerCase() === item.trapWord.toLowerCase();

                return (
                  <div
                    key={`${item.correctWord}-${idx}`}
                    className="p-3 bg-amber-50/70 hover:bg-amber-50 rounded-2xl border border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-amber-200/80 text-amber-900 text-xs font-black px-2 py-0.5 rounded-md">
                          #{item.questionNumber}
                        </span>

                        {item.dishName && (
                          <span className="bg-amber-900/10 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-800/20">
                            손님 {item.customerNumber} ({item.dishName}) · 재료 {item.ingredientNumber}/3
                          </span>
                        )}

                        <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                          {item.koreanMeaning}
                        </span>

                        {/* Correct word badge */}
                        <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold shadow-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>정답:</span>
                          <span className="font-mono text-sm sm:text-base font-black text-emerald-900">{item.correctWord}</span>
                          <button
                            onClick={() => speakEnglishWord(item.correctWord)}
                            className="p-1 hover:text-emerald-700 text-emerald-900 transition-colors cursor-pointer active:scale-95"
                            title="발음 듣기"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Wrong choice badge */}
                        <div className="flex items-center gap-1.5 bg-rose-100 border border-rose-300 text-rose-900 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-bold shadow-xs">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>선택 오답:</span>
                          <span className="font-mono text-sm sm:text-base font-black text-rose-800 line-through">{item.selectedWord}</span>
                        </div>
                      </div>

                      {/* Trap explanation */}
                      <div className="mt-1.5 text-xs text-amber-950 bg-white/70 p-2 rounded-xl border border-amber-200/80 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="leading-snug">
                          {wasTrap ? (
                            <span className="font-bold text-rose-700">
                              [함정 단어 선택!] {item.trapMeaning}
                            </span>
                          ) : (
                            <span>{item.trapMeaning}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons: [Retry] and [Back to Home] */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-black text-lg sm:text-xl rounded-2xl border-3 border-amber-300 shadow-[0_4px_0_#78350f] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="retry-game-btn"
          >
            <RotateCcw className="w-5 h-5 text-amber-950" />
            <span>새 게임 도전 (Retry)</span>
          </button>

          {incorrectList.length > 0 && onRetryIncorrectOnly && (
            <button
              type="button"
              onClick={() => onRetryIncorrectOnly(incorrectList)}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-base sm:text-lg rounded-2xl border-2 border-rose-300 shadow-[0_4px_0_#881337] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="retry-incorrect-btn"
            >
              <AlertTriangle className="w-5 h-5 text-rose-100" />
              <span>오답 {incorrectList.length}개만 다시 풀기</span>
            </button>
          )}

          <button
            type="button"
            onClick={onBackToHome}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-amber-50 text-stone-800 font-bold text-base sm:text-lg rounded-2xl border-2 border-stone-300 shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="back-to-home-btn"
          >
            <Home className="w-5 h-5 text-stone-600" />
            <span>홈으로 이동 (Back to Home)</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto text-center text-xs text-amber-900/60 pt-2 border-t border-amber-900/10">
        쿠킹 보카: 중1 영어 어휘 스펠링 트랩 클리닉
      </footer>
    </div>
  );
};

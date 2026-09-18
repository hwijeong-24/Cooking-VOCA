import React from 'react';
import { Semester } from '../types';
import { ChefAvatar } from './ChefAvatar';
import { Volume2, VolumeX, Sparkles, Utensils, Award, BookOpen, AlertCircle } from 'lucide-react';
import { playOrderBellSound } from '../utils/audio';

interface StartScreenProps {
  semester: Semester;
  onSelectSemester: (sem: Semester) => void;
  onStartGame: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  semester,
  onSelectSemester,
  onStartGame,
  soundEnabled,
  onToggleSound,
}) => {
  const handleStart = () => {
    playOrderBellSound(soundEnabled);
    onStartGame();
  };

  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col items-center justify-between p-3 sm:p-5 text-stone-800 overflow-y-auto"
      style={{
        background: 'radial-gradient(circle at center, #fffbeb 0%, #fef3c7 45%, #fde68a 100%)',
      }}
      id="start-screen"
    >
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-amber-900/10 px-3 py-1.5 rounded-full border border-amber-800/20 backdrop-blur-xs">
          <Utensils className="w-4 h-4 text-amber-800" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-amber-950">
            중학교 1학년 필수 영단어 (CEFR A2)
          </span>
        </div>

        <button
          onClick={onToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 border-2 border-amber-700/30 rounded-full font-bold text-xs sm:text-sm text-amber-950 transition-all shadow-xs active:scale-95"
          id="sound-toggle-btn"
          aria-label={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-800" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          <span>{soundEnabled ? '소리 ON' : '소리 OFF'}</span>
        </button>
      </header>

      {/* Main Center Content: Restaurant Sign & Chef */}
      <main className="w-full max-w-4xl flex flex-col items-center my-auto py-2 z-10">
        {/* Restaurant Wooden Signboard Style Logo */}
        <div className="relative mb-2 sm:mb-4 text-center">
          {/* Signboard chain brackets */}
          <div className="flex justify-center gap-32 sm:gap-48 -mb-2">
            <div className="w-1.5 h-4 bg-stone-700 rounded-xs shadow-xs"></div>
            <div className="w-1.5 h-4 bg-stone-700 rounded-xs shadow-xs"></div>
          </div>

          <div className="relative bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 border-4 border-amber-600 rounded-2xl sm:rounded-3xl px-6 sm:px-12 py-3 sm:py-5 shadow-2xl">
            {/* Corner brass rivets */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-700"></div>
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-700"></div>
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-700"></div>
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-700"></div>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
              <span className="text-amber-200 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
                3분 완성 스펠링 트랩 클리닉
              </span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            </div>

            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-black text-amber-100 tracking-tight drop-shadow-[0_3px_2px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: "'Nunito', 'Noto Sans KR', sans-serif" }}
            >
              COOKING VOCA
            </h1>
            <p className="text-amber-300 font-bold text-sm sm:text-base mt-0.5">
              쿠킹 보카: 맛있는 영단어 레스토랑
            </p>
          </div>
        </div>

        {/* Center Row: Chef Character & Interactive Semester Selection */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-2">
          {/* Chef Character */}
          <div className="flex flex-col items-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <ChefAvatar size="lg" expression="confident" />
            </div>
            <div className="mt-1 bg-amber-950/80 backdrop-blur-xs text-amber-100 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30 shadow-xs">
              👨‍🍳 셰프 마스터
            </div>
          </div>

          {/* Right Column: Menu Options & How It Works */}
          <div className="w-full sm:max-w-md flex flex-col gap-3">
            {/* Semester Set Selector */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 border-2 border-amber-300 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>학습 단어 세트 선택 (15문항 주문 코스)</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onSelectSemester('all')}
                  className={`px-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all border-2 flex items-center justify-center text-center ${
                    semester === 'all'
                      ? 'bg-amber-500 text-amber-950 border-amber-600 shadow-md scale-102'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  id="sem-select-all"
                >
                  전체 풀코스
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSemester('semester1')}
                  className={`px-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all border-2 flex items-center justify-center text-center ${
                    semester === 'semester1'
                      ? 'bg-amber-500 text-amber-950 border-amber-600 shadow-md scale-102'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  id="sem-select-1"
                >
                  1학기 코스
                </button>

                <button
                  type="button"
                  onClick={() => onSelectSemester('semester2')}
                  className={`px-2 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all border-2 flex items-center justify-center text-center ${
                    semester === 'semester2'
                      ? 'bg-amber-500 text-amber-950 border-amber-600 shadow-md scale-102'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                  id="sem-select-2"
                >
                  2학기 코스
                </button>
              </div>
            </div>

            {/* Quick Rule Card */}
            <div className="bg-amber-950/5 border border-amber-800/20 rounded-xl p-2.5 text-xs text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>주요 게임 규칙</span>
              </div>
              <p className="leading-snug">
                1. 총 <strong>5명의 손님</strong>이 각각 <strong>3개 재료</strong>(총 15문항)를 주문합니다.
              </p>
              <p className="leading-snug">
                2. 5개 재료 카드 중 <strong>올바른 영단어</strong>를 터치해 요리를 완성하세요!
              </p>
              <p className="leading-snug text-rose-800 font-semibold">
                ⚠️ 철자가 교묘하게 비슷한 <strong>1개의 스펠링 함정 단어</strong>를 조심하세요!
              </p>
            </div>
          </div>
        </div>

        {/* Big Start Game Button */}
        <div className="mt-3 sm:mt-5 flex flex-col items-center gap-1.5 w-full max-w-sm">
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-3.5 sm:py-4 px-8 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-black text-xl sm:text-2xl rounded-2xl border-3 border-amber-300 shadow-[0_6px_0_#78350f,0_10px_15px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#78350f] transition-all cursor-pointer flex items-center justify-center gap-3"
            id="start-game-btn"
          >
            <Utensils className="w-6 h-6 text-amber-900" />
            <span>게임 시작 (Start Game)</span>
            <Sparkles className="w-6 h-6 text-amber-300 animate-bounce" />
          </button>
          <span className="text-[11px] font-bold text-amber-900/70">
            총 15문항 · 문항당 +10코인 적립 · 오답 노트 제공
          </span>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-4xl flex items-center justify-between text-[11px] text-amber-900/70 pt-2 border-t border-amber-900/10">
        <span>스마트폰/태블릿 가로 모드 권장 (Landscape Mode)</span>
        <div className="flex items-center gap-1 font-semibold text-amber-900">
          <Award className="w-3.5 h-3.5 text-amber-700" />
          <span>중1 영어과 교육과정 성취기준 연계</span>
        </div>
      </footer>
    </div>
  );
};

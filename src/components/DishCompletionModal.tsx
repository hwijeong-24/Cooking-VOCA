import React from 'react';
import { CustomerProfile } from '../types';
import { CustomerAvatar } from './CustomerAvatar';
import { DishIllustration } from './DishIllustration';
import { getDishInfo } from '../data/dishes';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Coins, Award, Volume2, Flame, Ban, AlertTriangle } from 'lucide-react';
import { speakEnglishWord } from '../utils/audio';
import { getWordMeaning } from '../utils/customerFeedback';

export interface DishIngredientSummary {
  ingredientNumber: number;
  koreanMeaning: string;
  correctWord: string;
  selectedWord: string;
  isCorrect: boolean;
  trapWord: string;
  trapMeaning: string;
}

interface DishCompletionModalProps {
  customer: CustomerProfile;
  customerNumber: number;
  totalCustomers: number;
  dishName: string;
  ingredients: DishIngredientSummary[];
  coinsAwarded: number;
  onNextCustomer: () => void;
  isFinalDish: boolean;
}

export const DishCompletionModal: React.FC<DishCompletionModalProps> = ({
  customer,
  customerNumber,
  totalCustomers,
  dishName,
  ingredients,
  coinsAwarded,
  onNextCustomer,
  isFinalDish
}) => {
  const dishInfo = getDishInfo(dishName);

  const correctCount = ingredients.filter((i) => i.isCorrect).length;
  const isPerfect = correctCount === 3;
  const isFailed = correctCount === 0;

  // Character-specific mild, playful negative review when all 3 ingredients fail
  const getExtremeAngryReview = () => {
    switch (customer.animalType) {
      case 'cat':
        return {
          title: '고양이 손님의 뾰로통한 한마디',
          badge: '시무룩 😿',
          quote: `"${customer.name}: 냥... 재료가 다 달라서 맛이 너무 이상하다냥... 제가 시킨 ${dishName} 맛이 전혀 아니에요! 힝, 다음엔 꼭 맛있게 만들어달라냥! 😿💧"`,
          detail: '고양이 손님이 입술을 삐죽이며 아쉬운 표정으로 식탁을 바라봅니다.'
        };
      case 'bear':
        return {
          title: '곰돌이 손님의 시무룩한 후기',
          badge: '배고파요 🐻',
          quote: `"${customer.name}: 으앙~ 곰돌이 배고픈데 재료 3개가 전부 바뀌어버렸어요! 맛이 너무 알쏭달쏭해서 오늘은 아쉽지만 먹기 어렵겠어요. 다음엔 꼭 성공해주세요! 🐻💦"`,
          detail: '곰 손님이 아쉬워하며 배를 통통 두드리고 있습니다.'
        };
      case 'rabbit':
        return {
          title: '토끼 손님의 아쉬운 리뷰',
          badge: '아쉬워요 🐰',
          quote: `"${customer.name}: 앗... 제가 주문했던 것과 다른 재료들만 들어갔어요! 맛이 너무 이상해서 이번 접시는 패스해야겠어요... 셰프님 다음 요리는 파이팅이에요! 🐰💧"`,
          detail: '토끼 손님이 머리를 긁적이며 미소를 짓고 있습니다.'
        };
      case 'dog':
        return {
          title: '강아지 단골손님의 갸우뚱 피드백',
          badge: '시무룩 🐶',
          quote: `"${customer.name}: 낑낑... 제가 너무 기대했던 ${dishName}인데 철자가 조금 헷갈리셨나 봐요! 맛이 낯설어서 아쉽지만, 다음엔 꼭 맛있는 요리로 부탁해요! 🐶🦴"`,
          detail: '강아지 손님이 꼬리를 살랑이며 다음 기회를 기대하고 있습니다.'
        };
      case 'fox':
        return {
          title: '여우 손님의 부드러운 조언',
          badge: '복습 권장 🦊',
          quote: `"${customer.name}: 흠, 세 가지 재료의 철자가 모두 빗나갔군요. 이번 요리는 아쉽지만 맛의 조화가 부족해요. 단어 스펠링을 다시 한번 꼼꼼히 복습해 볼까요? 🦊✏️"`,
          detail: '여우 손님이 노트에 미식 팁을 적어 주방에 건넸습니다.'
        };
      case 'panda':
        return {
          title: '판다 손님의 머쓱한 반응',
          badge: '어색해요 🐼',
          quote: `"${customer.name}: 으음... 맛이 생각했던 것과 너무 달라서 깜짝 놀랐어요! 3개 재료 영단어를 잘 기억해서 다음엔 진짜 맛있는 요리를 부탁해요! 🐼🍃"`,
          detail: '판다 손님이 머리를 긁적이며 물을 한 모금 마십니다.'
        };
      default:
        return {
          title: `${customer.name}의 아쉬운 한마디`,
          badge: '아쉬워요 🥺',
          quote: `"${customer.name}: 재료가 다르게 들어가서 맛이 조금 이상해요... 아쉽지만 이번 요리는 다음 기회에 다시 도전해주세요! 🥺"`,
          detail: '손님이 아쉬운 표정으로 다음 요리를 응원했습니다.'
        };
    }
  };

  // Feedback based on performance for successful dishes
  const getCustomerQuote = () => {
    if (correctCount === 3) {
      return `"${customer.name}: 우와! 완벽한 황금비율이에요! 최고의 ${dishName}입니다!"`;
    }
    if (correctCount === 2) {
      return `"${customer.name}: 정말 맛있어요! 한 가지 재료만 더 정확했으면 완벽했을 거예요!"`;
    }
    if (correctCount === 1) {
      return `"${customer.name}: 독특한 풍미가 느껴지네요! 그래도 정성껏 잘 먹겠습니다!"`;
    }
    return '';
  };

  const extremeAngry = getExtremeAngryReview();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 select-none overflow-y-auto"
      id="dish-completion-modal"
    >
      <div
        className={`relative w-full max-w-xl lg:max-w-2xl rounded-3xl border-3 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          isFailed
            ? 'bg-gradient-to-b from-stone-950 via-rose-950 to-stone-950 border-rose-600 shadow-rose-950/80'
            : 'bg-gradient-to-b from-stone-900 via-amber-950/95 to-stone-900 border-amber-500/60 shadow-amber-950/60'
        }`}
      >
        {/* Top Glowing Ribbon Banner */}
        {isFailed ? (
          <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 px-4 py-2.5 text-center text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-md shrink-0 border-b border-rose-400/50">
            <span className="text-base">🍳</span>
            <span>
              {isFinalDish
                ? '요리 미완성: 마지막 손님이 아쉬워해요 🥺'
                : `요리 미완성: 손님 ${customerNumber}/${totalCustomers}이(가) 아쉬워해요 🥺`}
            </span>
            <span className="text-base">🥺</span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 px-4 py-2.5 text-center text-amber-950 font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-md shrink-0">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>
              {isFinalDish ? '🎉 마지막 손님 요리 완성!' : `🎉 손님 ${customerNumber}/${totalCustomers} 요리 완성!`}
            </span>
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        )}

        {/* Scrollable Content Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-white">
          {/* Dish Header + Customer */}
          <div
            className={`flex items-center justify-between gap-3 p-3 rounded-2xl border ${
              isFailed
                ? 'bg-rose-950/80 border-rose-500/50'
                : 'bg-amber-950/60 border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <CustomerAvatar
                customer={customer}
                mood={isFailed ? 'angry' : correctCount >= 2 ? 'happy' : 'waiting'}
                size="sm"
                className={`shrink-0 ${
                  isFailed ? 'ring-3 ring-rose-400/70 rounded-full shadow-md' : ''
                }`}
              />
              <div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isFailed ? 'text-rose-300' : 'text-amber-300'
                  }`}
                >
                  {customer.name}의 주문 {isFailed && '· 🥺 시무룩 상태'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5">
                  <span>{dishInfo.badgeEmoji}</span>
                  <span className={isFailed ? 'text-rose-200 line-through' : 'text-amber-200'}>
                    {dishName}
                  </span>
                </h3>
                <span className={`text-xs font-medium ${isFailed ? 'text-rose-400' : 'text-amber-300/70'}`}>
                  {dishInfo.englishName}
                </span>
              </div>
            </div>

            {/* Stars rating */}
            <div
              className={`text-right shrink-0 px-3 py-1.5 rounded-xl border ${
                isFailed
                  ? 'bg-rose-900/60 border-rose-500/40'
                  : 'bg-amber-900/60 border-amber-600/40'
              }`}
            >
              <div className="flex items-center gap-0.5 justify-end text-base sm:text-lg">
                {[1, 2, 3].map((starIdx) => (
                  <span
                    key={starIdx}
                    className={
                      !isFailed && starIdx <= correctCount
                        ? 'text-amber-300 scale-110'
                        : 'text-stone-600 opacity-30'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span
                className={`text-[10px] font-bold block ${
                  isFailed ? 'text-rose-300' : 'text-amber-300'
                }`}
              >
                {isFailed ? '0/3 실패 (조리 중단)' : `${correctCount}/3 재료 성공`}
              </span>
            </div>
          </div>

          {/* Dish Showcase Area:
              CRITICAL REQUIREMENT: If all 3 ingredients are answered incorrectly, the dish must FAIL to complete
              (do NOT display the finished dish image).
          */}
          {isFailed ? (
            /* Charred / Ruined Disaster Dish (Finished Dish Image is HIDDEN) */
            <div className="relative w-full py-4 px-3 rounded-2xl overflow-hidden border-2 border-rose-600/70 shadow-xl bg-gradient-to-b from-stone-950 via-rose-950/40 to-stone-950 flex flex-col items-center justify-center text-center">
              {/* Burnt Charcoal SVG Illustration */}
              <svg viewBox="0 0 160 120" className="w-36 h-28 drop-shadow-2xl my-1 overflow-visible">
                {/* Shadow */}
                <ellipse cx="80" cy="108" rx="60" ry="8" fill="#000000" opacity="0.6" />
                {/* Burnt blackened plate with crack */}
                <ellipse cx="80" cy="92" rx="62" ry="18" fill="#1c1917" stroke="#7f1d1d" strokeWidth="3" />
                <ellipse cx="80" cy="89" rx="52" ry="13" fill="#292524" />
                <path d="M72,82 L82,96 L88,91 L96,99" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                {/* Burnt lumps */}
                <path d="M45,86 Q52,70 65,76 Q78,64 95,72 Q108,70 115,84 Z" fill="#0c0a09" stroke="#451a03" strokeWidth="2" />
                <circle cx="62" cy="78" r="3" fill="#ef4444" opacity="0.8" />
                <circle cx="85" cy="74" r="2.5" fill="#f97316" opacity="0.9" />
                <circle cx="102" cy="80" r="2.5" fill="#ef4444" opacity="0.7" />
                {/* Smoke fumes */}
                <path d="M55,68 Q50,52 58,40 Q65,28 60,18" fill="none" stroke="#78716c" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
                <path d="M80,65 Q85,48 78,35 Q72,22 80,12" fill="none" stroke="#78716c" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
                <path d="M105,68 Q110,55 102,42 Q96,30 102,20" fill="none" stroke="#78716c" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
                {/* Big Red Ban Badge */}
                <g transform="translate(66, 52)">
                  <circle cx="14" cy="14" r="14" fill="#dc2626" stroke="#fff" strokeWidth="2" />
                  <path d="M8,8 L20,20 M20,8 L8,20" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              </svg>

              <h4 className="text-base sm:text-lg font-black text-rose-300 mt-1">
                🍳 아쉬운 요리: {dishName} 조리 미완성
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-rose-200/90 font-medium max-w-md px-2 leading-relaxed">
                3개 재료의 영단어가 어긋나 기대했던 맛을 내지 못했습니다. 아쉽지만 이번 접시는 손님 식탁에 올리지 못했어요!
              </p>

              {/* Failed Tag Badge */}
              <div className="absolute top-2.5 left-2.5 bg-rose-700 text-white font-black text-[11px] px-2.5 py-1 rounded-xl border border-rose-400 shadow-md flex items-center gap-1">
                <Ban className="w-3.5 h-3.5" />
                <span>요리 미완성 (서빙 보류)</span>
              </div>
            </div>
          ) : (
            /* Successful / Partially Completed Finished Dish Illustration */
            <div className="relative w-full py-3 px-2 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-xl bg-gradient-to-b from-amber-950/70 via-stone-900/90 to-stone-950 flex flex-col items-center justify-center">
              {/* Background radial warmth */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.2)_0%,transparent_70%)] pointer-events-none" />

              {/* Handcrafted Vector Dish Illustration matching Chef and Customer Art Style */}
              <DishIllustration dishName={dishName} size="md" className="my-1 drop-shadow-2xl" />

              {/* Dish Description */}
              <p className="mt-1 text-xs sm:text-sm text-amber-200 font-medium text-center max-w-md drop-shadow-sm px-2">
                {dishInfo.description}
              </p>

              {/* Completion Tag Badge */}
              <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-black text-[11px] px-2.5 py-1 rounded-xl border border-yellow-200 shadow-md flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>완성된 요리 일러스트</span>
              </div>
            </div>
          )}

          {/* Customer Quote / Gentle Negative Review */}
          {isFailed ? (
            <div className="bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 border-2 border-rose-500/50 rounded-2xl p-3.5 text-center shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <span className="text-base">🥺</span>
                <span className="text-xs font-black text-rose-300 uppercase tracking-wide">
                  {extremeAngry.title}
                </span>
                <span className="text-base">🥺</span>
              </div>
              <p className="text-sm sm:text-base text-rose-100 font-bold italic leading-relaxed">
                {extremeAngry.quote}
              </p>
              <p className="text-[11px] text-rose-300/80 mt-1.5 font-medium bg-black/30 py-1 px-2 rounded-lg inline-block border border-rose-500/30">
                💬 {extremeAngry.detail}
              </p>
            </div>
          ) : (
            <div className="bg-amber-900/40 border border-amber-600/30 rounded-xl px-3.5 py-2 text-center">
              <p className="text-xs sm:text-sm text-amber-200 font-bold italic">
                {getCustomerQuote()}
              </p>
            </div>
          )}

          {/* 3 Ingredients Review */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold px-1">
              <span className={isFailed ? 'text-rose-300' : 'text-amber-300/90'}>
                {isFailed ? '💥 실패한 3개 재료 확인 (철자 오답 복습)' : '조합된 3개 재료 확인 (영단어 복습)'}
              </span>
              <span className="text-[11px] text-stone-400">발음 듣기 지원 🔊</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    ing.isCorrect
                      ? 'bg-gradient-to-b from-emerald-950/80 to-emerald-950/40 border-emerald-500/50 shadow-md'
                      : 'bg-gradient-to-b from-rose-950/80 to-rose-950/40 border-rose-500/50 shadow-md'
                  }`}
                >
                  <div>
                    {/* Top: Ingredient Number & Status */}
                    <div className="flex items-center justify-between gap-1 mb-1.5 pb-1 border-b border-white/10">
                      <span className="font-bold text-[11px] text-stone-300">
                        재료 {ing.ingredientNumber}
                      </span>
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-1 ${
                          ing.isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {ing.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>정답</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>오답</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Korean Meaning */}
                    <p className="font-extrabold text-amber-200 text-xs sm:text-sm">
                      {ing.koreanMeaning}
                    </p>

                    {/* Prominent Large English Words */}
                    <div className="mt-2 space-y-1.5 font-mono">
                      {ing.isCorrect ? (
                        <div className="bg-emerald-900/90 border-2 border-emerald-400/60 rounded-xl px-2.5 py-2 flex items-center justify-between gap-1.5 shadow-inner">
                          <span className="font-black text-lg sm:text-xl text-emerald-100 tracking-wide break-words">
                            {ing.correctWord}
                          </span>
                          <button
                            onClick={() => speakEnglishWord(ing.correctWord)}
                            className="p-1.5 text-emerald-300 hover:text-white bg-emerald-800/80 rounded-lg transition-all active:scale-90 cursor-pointer shrink-0"
                            title={`${ing.correctWord} 발음 듣기`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {/* Wrong selected word */}
                          <div className="bg-rose-950/90 border border-rose-500/40 rounded-lg px-2 py-1 flex items-center justify-between gap-1">
                            <span className="text-[10px] text-rose-300/90 font-sans font-bold shrink-0">선택 오답</span>
                            <span className="font-bold text-sm sm:text-base text-rose-200 line-through tracking-wide truncate">
                              {ing.selectedWord}
                            </span>
                          </div>

                          {/* Correct target word - Large, vibrant, and clear */}
                          <div className="bg-emerald-950/95 border-2 border-emerald-400/70 rounded-xl px-2.5 py-1.5 flex items-center justify-between gap-1.5 shadow-sm">
                            <div className="min-w-0">
                              <span className="text-[10px] text-emerald-400 font-sans font-extrabold block">올바른 정답</span>
                              <span className="font-black text-base sm:text-lg text-emerald-100 tracking-wide truncate block">
                                {ing.correctWord}
                              </span>
                            </div>
                            <button
                              onClick={() => speakEnglishWord(ing.correctWord)}
                              className="p-1.5 text-emerald-300 hover:text-white bg-emerald-800/80 rounded-lg transition-all active:scale-90 cursor-pointer shrink-0"
                              title={`${ing.correctWord} 발음 듣기`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {!ing.isCorrect && (
                    <div className="mt-2 text-[11px] bg-black/30 p-2 rounded-lg border border-rose-500/30 leading-snug">
                      {ing.selectedWord.toLowerCase() === ing.trapWord.toLowerCase() ? (
                        <p className="text-amber-200">
                          ⚠️ <span className="font-bold text-amber-300">[스펠링 함정 선택]</span> {ing.trapMeaning}
                        </p>
                      ) : (
                        <p className="text-rose-200">
                          ❌ <span className="font-bold text-rose-300">[오답 재료 선택]</span> '{ing.selectedWord}'은(는) '{getWordMeaning(ing.selectedWord)}'의 뜻으로, 주문 재료 '{ing.koreanMeaning}'(정답: {ing.correctWord})과(와) 다릅니다.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reward Banner:
              CRITICAL REQUIREMENT: If failed, do NOT award any coins (0 coins).
          */}
          {isFailed ? (
            <div className="bg-gradient-to-r from-rose-950/60 via-stone-900/90 to-rose-950/60 border-2 border-rose-500/50 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-stone-800 text-stone-500 flex items-center justify-center shadow-md border border-stone-700">
                  <Coins className="w-6 h-6 stroke-stone-500" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-400 block">
                    요리 미완성으로 코인 미지급! (0 코인)
                  </span>
                  <p className="text-xs text-stone-300">
                    3개 재료의 철자가 모두 어긋나 이번 요리는 아쉽지만 코인이 지급되지 않았습니다.
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 bg-stone-900/90 px-3 py-1.5 rounded-xl border border-rose-500/40">
                <span className="text-xl sm:text-2xl font-black text-stone-500 line-through">
                  +0
                </span>
                <span className="text-[10px] font-extrabold text-stone-500 block">
                  COINS
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-yellow-400/50 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-md animate-bounce">
                  <Coins className="w-6 h-6 fill-amber-300" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-300 block">
                    요리 완성 보상 지급!
                  </span>
                  <p className="text-xs text-stone-300">
                    {isPerfect
                      ? '3개 재료를 완벽하게 배합하여 최대 보상을 받았습니다!'
                      : `${correctCount}개 재료를 올바르게 맞춰 코인이 적립되었습니다!`}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 bg-stone-900/90 px-3 py-1.5 rounded-xl border border-amber-500/50">
                <span className="text-xl sm:text-2xl font-black text-amber-300">
                  +{coinsAwarded}
                </span>
                <span className="text-[10px] font-extrabold text-amber-400 block">
                  COINS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Manual Next Customer Button (Do not auto-advance; require manual tap) */}
        <div
          className={`p-4 border-t flex items-center justify-between gap-3 shrink-0 ${
            isFailed
              ? 'bg-stone-950 border-rose-900/40'
              : 'bg-stone-950 border-amber-700/40'
          }`}
        >
          <span className="text-xs text-stone-400 hidden sm:inline">
            {isFinalDish
              ? '모든 코스가 끝났습니다. 결산 결과를 확인하세요!'
              : isFailed
              ? '손님이 조금 아쉬워하고 있어요. 다음 손님 요리에 다시 힘내봐요!'
              : '준비가 완료되면 버튼을 눌러 다음 손님을 맞이하세요.'}
          </span>

          <button
            onClick={onNextCustomer}
            className={`w-full sm:w-auto ml-auto px-6 py-3 font-black text-sm sm:text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all ${
              isFailed
                ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white border-2 border-rose-300/80 shadow-rose-950/60'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-stone-950 border-2 border-yellow-200'
            }`}
            id="next-customer-btn"
          >
            <span>
              {isFinalDish
                ? '🏆 최종 결산 리포트 확인'
                : isFailed
                ? `아쉽지만 다음 손님 맞이하기 (${customerNumber + 1}/${totalCustomers})`
                : `다음 손님 맞이하기 (${customerNumber + 1}/${totalCustomers})`}
            </span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

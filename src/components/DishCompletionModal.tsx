import React from 'react';
import { CustomerProfile } from '../types';
import { CustomerAvatar } from './CustomerAvatar';
import { DishIllustration } from './DishIllustration';
import { getDishInfo } from '../data/dishes';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Coins, Award, Volume2, Flame, Ban, AlertTriangle } from 'lucide-react';
import { speakEnglishWord } from '../utils/audio';

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

  // Character-specific extreme furious review when all 3 ingredients fail
  const getExtremeAngryReview = () => {
    switch (customer.animalType) {
      case 'cat':
        return {
          title: '고양이 손님의 0점 분노 폭발 혹평',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 냥?! 장난하냥?! 3개 재료가 모조리 엉터리라 냄새만 맡아도 털이 곤두선다냥!! 이런 끔찍한 걸 음식이라고 내놓다니 당장 주방장 자격증 반납해라냥!! 🔥😾"`,
          detail: '고양이 손님이 식탁을 엎을 듯 꼬리를 곤두세우며 0점 영수증을 던졌습니다.'
        };
      case 'bear':
        return {
          title: '곰 미식가의 우렁찬 분노 혹평',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 크워어엉!! 배고파 죽겠는데 3가지 재료가 다 엉터리라니! 먹을 수도 없는 검은 숯덩이를 주고 돈을 받으려 했소?! 당장 환불하시오!! 🐻💥"`,
          detail: '곰 손님이 발을 쿵쿵 구르며 주방을 매섭게 노려보고 있습니다.'
        };
      case 'rabbit':
        return {
          title: '토끼 손님의 경악과 눈물의 분노',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 꺄악!! 세상에 어떻게 3가지 재료를 모조리 틀릴 수가 있죠?! 귀가 찢어질 정도로 끔찍해요! 위생국에 고발하기 전에 셰프 사과하세요!! 🐰🌋"`,
          detail: '토끼 손님이 기겁하며 테이블을 박차고 나갈 준비를 하고 있습니다.'
        };
      case 'dog':
        return {
          title: '강아지 단골손님의 배신감 어린 분노',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 으르렁 컹컹!! 내가 제일 아끼는 ${dishName}인데 3개 재료 철자를 싹 다 틀리다니! 내 꼬리가 축 처질 정도로 맛없고 끔찍해요!! 🐶💢"`,
          detail: '강아지 손님이 이빨을 드러내며 최악의 0점 리뷰를 남겼습니다.'
        };
      case 'fox':
        return {
          title: '여우 평론가의 서늘한 0점 독설',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 흥, 소문난 레스토랑이라더니 영단어 기초도 모르는 풋내기였군요. 3개 재료가 전부 쓰레기통 직행감입니다. 식당 문 닫으시죠! 🦊⚡"`,
          detail: '여우 평론가가 미식 잡지에 0점 최악의 불합격 평점을 작성했습니다.'
        };
      case 'panda':
        return {
          title: '팬더 손님의 깊은 빡침',
          badge: '극대노 🔥',
          quote: `"${customer.name}: 쿵!! 느긋한 나조차 참을 수 없을 만큼 최악의 괴식이야! 3개 재료를 하나도 못 맞추다니 주방 청소부터 다시 하고 와! 🐼🔥"`,
          detail: '팬더 손님이 다크서클이 짙어진 채 분노를 삭이지 못하고 있습니다.'
        };
      default:
        return {
          title: `${customer.name}의 극대노 0점 최악 리뷰`,
          badge: '극대노 🔥',
          quote: `"${customer.name}: 3개 재료가 전부 잘못 들어가 요리가 완전히 타버렸습니다! 도저히 한 입도 먹을 수 없어요! 당장 환불해주세요!! 🔥😡"`,
          detail: '손님이 극도로 분노하여 식당에 0점 혹평을 남겼습니다.'
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
        className={`relative w-full max-w-xl rounded-3xl border-3 shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col ${
          isFailed
            ? 'bg-gradient-to-b from-stone-950 via-rose-950 to-stone-950 border-rose-600 shadow-rose-950/80'
            : 'bg-gradient-to-b from-stone-900 via-amber-950/95 to-stone-900 border-amber-500/60 shadow-amber-950/60'
        }`}
      >
        {/* Top Glowing Ribbon Banner */}
        {isFailed ? (
          <div className="bg-gradient-to-r from-rose-800 via-red-600 to-rose-800 px-4 py-2.5 text-center text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-md shrink-0 border-b border-rose-400/50 animate-pulse">
            <Flame className="w-5 h-5 text-amber-300" />
            <span>
              {isFinalDish
                ? '💥 요리 대실패! 마지막 손님 극대노 폭발!'
                : `💥 요리 대실패! 손님 ${customerNumber}/${totalCustomers} 극대노 폭발!`}
            </span>
            <Flame className="w-5 h-5 text-amber-300" />
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
                  isFailed ? 'ring-4 ring-rose-500/80 rounded-full shadow-lg shadow-rose-900/60 animate-bounce' : ''
                }`}
              />
              <div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isFailed ? 'text-rose-300' : 'text-amber-300'
                  }`}
                >
                  {customer.name}의 주문 {isFailed && '· 😡 극대노 상태'}
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
                💥 타버린 실패작: {dishName} 조리 실패!
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-rose-200/90 font-medium max-w-md px-2 leading-relaxed">
                3개 재료의 영단어를 모두 틀려 요리가 새까맣게 타버렸습니다. 손님 식탁에 올릴 수 없어 전량 폐기 처분되었습니다!
              </p>

              {/* Failed Tag Badge */}
              <div className="absolute top-2.5 left-2.5 bg-rose-700 text-white font-black text-[11px] px-2.5 py-1 rounded-xl border border-rose-400 shadow-md flex items-center gap-1">
                <Ban className="w-3.5 h-3.5" />
                <span>요리 미완성 (서빙 불가)</span>
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

          {/* Customer Quote / Extreme Angry Feedback */}
          {isFailed ? (
            <div className="bg-gradient-to-r from-rose-950 via-red-950 to-rose-950 border-2 border-rose-500/70 rounded-2xl p-3.5 text-center shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
                <span className="text-xs font-black text-rose-300 uppercase tracking-wide">
                  {extremeAngry.title}
                </span>
                <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
              </div>
              <p className="text-sm sm:text-base text-rose-100 font-extrabold italic leading-relaxed">
                {extremeAngry.quote}
              </p>
              <p className="text-[11px] text-rose-300/80 mt-1.5 font-semibold bg-black/30 py-1 px-2 rounded-lg inline-block border border-rose-500/30">
                ⚠️ {extremeAngry.detail}
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
                    <p className="text-[11px] text-rose-200 bg-black/30 px-2 py-1 rounded-lg border border-rose-500/30 mt-2 line-clamp-2 leading-tight">
                      ⚠️ <span className="font-bold text-amber-300">함정:</span> {ing.trapMeaning}
                    </p>
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
                    3개 재료를 모두 실패하여 손님이 대금을 지불하지 않고 분노했습니다.
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
              ? 'bg-stone-950 border-rose-900/60'
              : 'bg-stone-950 border-amber-700/40'
          }`}
        >
          <span className="text-xs text-stone-400 hidden sm:inline">
            {isFinalDish
              ? '모든 코스가 끝났습니다. 결산 결과를 확인하세요!'
              : isFailed
              ? '손님이 몹시 화가 났습니다. 마음을 가다듬고 다음 손님을 맞이하세요.'
              : '준비가 완료되면 버튼을 눌러 다음 손님을 맞이하세요.'}
          </span>

          <button
            onClick={onNextCustomer}
            className={`w-full sm:w-auto ml-auto px-6 py-3 font-black text-sm sm:text-base rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all ${
              isFailed
                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white border-2 border-rose-400 shadow-rose-950/60'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-amber-400 text-stone-950 border-2 border-yellow-200'
            }`}
            id="next-customer-btn"
          >
            <span>
              {isFinalDish
                ? '🏆 최종 결산 리포트 확인'
                : isFailed
                ? `화난 손님 보내고 다음 손님 받기 (${customerNumber + 1}/${totalCustomers})`
                : `다음 손님 맞이하기 (${customerNumber + 1}/${totalCustomers})`}
            </span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

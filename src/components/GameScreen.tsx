import React, { useState, useEffect, useRef } from 'react';
import { QuestionData, CustomerMood, GameHistoryItem, CustomerProfile } from '../types';
import { CustomerAvatar } from './CustomerAvatar';
import { DishCompletionModal, DishIngredientSummary } from './DishCompletionModal';
import { getSpecificCustomerErrorFeedback } from '../utils/customerFeedback';
import {
  Coins,
  Volume2,
  VolumeX,
  Volume1,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  Clock
} from 'lucide-react';
import {
  playCorrectSound,
  playWrongSound,
  playCoinSound,
  playFinishFanfare,
  playDisasterFailSound,
  speakEnglishWord
} from '../utils/audio';

interface DishModalState {
  customer: CustomerProfile;
  customerNumber: number;
  totalCustomers: number;
  dishName: string;
  ingredients: DishIngredientSummary[];
  coinsAwarded: number;
  isFinalDish: boolean;
  pendingSubmission: {
    isCorrect: boolean;
    selectedWord: string;
    coinsEarned: number;
    historyItem: GameHistoryItem;
  };
}

interface GameScreenProps {
  question: QuestionData;
  totalQuestions: number;
  currentCoins: number;
  history: GameHistoryItem[];
  soundEnabled: boolean;
  onToggleSound: () => void;
  onAnswerSubmitted: (result: {
    isCorrect: boolean;
    selectedWord: string;
    coinsEarned: number;
    historyItem: GameHistoryItem;
  }) => void;
  onExitToHome: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  question,
  totalQuestions,
  currentCoins,
  history,
  soundEnabled,
  onToggleSound,
  onAnswerSubmitted,
  onExitToHome
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [customerMood, setCustomerMood] = useState<CustomerMood>('waiting');
  const [coinAddedNotice, setCoinAddedNotice] = useState(false);
  const [dishModalData, setDishModalData] = useState<DishModalState | null>(null);
  const [feedbackSecondsLeft, setFeedbackSecondsLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset states on new question
  useEffect(() => {
    setSelectedWord(null);
    setIsAnswered(false);
    setCustomerMood('waiting');
    setCoinAddedNotice(false);
    setDishModalData(null);
    setFeedbackSecondsLeft(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, [question.id]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const isLastIngredientOfCustomer = question.ingredientNumber === question.totalIngredientsPerCustomer;
  const isLastQuestionOfGame = question.orderNumber === totalQuestions;

  const handleSelectOption = (word: string) => {
    if (isAnswered) return; // Prevent double tap

    setIsAnswered(true);
    setSelectedWord(word);

    const isCorrect = word.toLowerCase() === question.correctWord.toLowerCase();

    // Sound and Mood feedback
    if (isCorrect) {
      setCustomerMood('happy');
      playCorrectSound(soundEnabled);
    } else {
      setCustomerMood('angry');
      playWrongSound(soundEnabled);
    }

    // Pronounce the correct word for learning
    if (soundEnabled) {
      setTimeout(() => {
        speakEnglishWord(question.correctWord);
      }, 350);
    }

    const historyItem: GameHistoryItem = {
      questionNumber: question.orderNumber,
      customerNumber: question.customerNumber,
      ingredientNumber: question.ingredientNumber,
      dishName: question.dishName,
      koreanMeaning: question.koreanMeaning,
      correctWord: question.correctWord,
      selectedWord: word,
      isCorrect,
      trapWord: question.trapWord,
      trapMeaning: question.trapMeaning,
    };

    if (isLastIngredientOfCustomer) {
      // 3rd Ingredient: Dish is completed!
      // Requirement: Do NOT automatically advance past modal! Coins only awarded after entire dish completed.
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }

      // Find previous 2 ingredients from customer history
      const prevIng1 = history.find(
        (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 1
      );
      const prevIng2 = history.find(
        (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 2
      );

      const ing1Summary: DishIngredientSummary = {
        ingredientNumber: 1,
        koreanMeaning: prevIng1 ? prevIng1.koreanMeaning : '1번째 재료',
        correctWord: prevIng1 ? prevIng1.correctWord : '',
        selectedWord: prevIng1 ? prevIng1.selectedWord : '',
        isCorrect: prevIng1 ? prevIng1.isCorrect : false,
        trapWord: prevIng1 ? prevIng1.trapWord : '',
        trapMeaning: prevIng1 ? prevIng1.trapMeaning : '',
      };

      const ing2Summary: DishIngredientSummary = {
        ingredientNumber: 2,
        koreanMeaning: prevIng2 ? prevIng2.koreanMeaning : '2번째 재료',
        correctWord: prevIng2 ? prevIng2.correctWord : '',
        selectedWord: prevIng2 ? prevIng2.selectedWord : '',
        isCorrect: prevIng2 ? prevIng2.isCorrect : false,
        trapWord: prevIng2 ? prevIng2.trapWord : '',
        trapMeaning: prevIng2 ? prevIng2.trapMeaning : '',
      };

      const ing3Summary: DishIngredientSummary = {
        ingredientNumber: 3,
        koreanMeaning: question.koreanMeaning,
        correctWord: question.correctWord,
        selectedWord: word,
        isCorrect,
        trapWord: question.trapWord,
        trapMeaning: question.trapMeaning,
      };

      const dishIngredients = [ing1Summary, ing2Summary, ing3Summary];
      const correctCount = dishIngredients.filter((i) => i.isCorrect).length;
      const isFailed = correctCount === 0;
      const dishCoinsAwarded = isFailed ? 0 : correctCount * 10;

      // Allow student to see the 3rd card feedback and in-speech reaction before modal displays
      const delayBeforeModal = isCorrect ? 1300 : (isFailed ? 2800 : 2500);

      timerRef.current = setTimeout(() => {
        if (isFailed) {
          playDisasterFailSound(soundEnabled);
          setCoinAddedNotice(false);
        } else {
          playFinishFanfare(soundEnabled);
          setTimeout(() => playCoinSound(soundEnabled), 400);
          setCoinAddedNotice(true);
        }
        setDishModalData({
          customer: question.customer,
          customerNumber: question.customerNumber,
          totalCustomers: question.totalCustomers,
          dishName: question.dishName,
          ingredients: dishIngredients,
          coinsAwarded: dishCoinsAwarded,
          isFinalDish: isLastQuestionOfGame,
          pendingSubmission: {
            isCorrect,
            selectedWord: word,
            coinsEarned: dishCoinsAwarded,
            historyItem,
          }
        });
      }, delayBeforeModal);
    } else {
      // Ingredients 1 & 2:
      // Requirement: Add 5 more seconds to display duration after answer is chosen (2.5s + 5s = 7.5s = 7500ms)
      setFeedbackSecondsLeft(7);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = setInterval(() => {
        setFeedbackSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = setTimeout(() => {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        advanceNext(isCorrect, word, historyItem);
      }, 7500);
    }
  };

  const advanceNext = (isCorrect: boolean, chosenWord: string, historyItem: GameHistoryItem) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setFeedbackSecondsLeft(null);

    onAnswerSubmitted({
      isCorrect,
      selectedWord: chosenWord,
      coinsEarned: 0, // In ingredients 1 and 2, coins are held until whole dish completion
      historyItem,
    });
  };

  const handleManualNext = () => {
    if (!isAnswered || !selectedWord) return;
    const isCorrect = selectedWord.toLowerCase() === question.correctWord.toLowerCase();

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    const historyItem: GameHistoryItem = {
      questionNumber: question.orderNumber,
      customerNumber: question.customerNumber,
      ingredientNumber: question.ingredientNumber,
      dishName: question.dishName,
      koreanMeaning: question.koreanMeaning,
      correctWord: question.correctWord,
      selectedWord,
      isCorrect,
      trapWord: question.trapWord,
      trapMeaning: question.trapMeaning,
    };

    if (isLastIngredientOfCustomer) {
      if (dishModalData) {
        handleNextCustomerFromModal();
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        // Trigger modal immediately if user taps button early
        const prevIng1 = history.find(
          (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 1
        );
        const prevIng2 = history.find(
          (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 2
        );
        const ing1Summary: DishIngredientSummary = {
          ingredientNumber: 1,
          koreanMeaning: prevIng1 ? prevIng1.koreanMeaning : '1번째 재료',
          correctWord: prevIng1 ? prevIng1.correctWord : '',
          selectedWord: prevIng1 ? prevIng1.selectedWord : '',
          isCorrect: prevIng1 ? prevIng1.isCorrect : false,
          trapWord: prevIng1 ? prevIng1.trapWord : '',
          trapMeaning: prevIng1 ? prevIng1.trapMeaning : '',
        };
        const ing2Summary: DishIngredientSummary = {
          ingredientNumber: 2,
          koreanMeaning: prevIng2 ? prevIng2.koreanMeaning : '2번째 재료',
          correctWord: prevIng2 ? prevIng2.correctWord : '',
          selectedWord: prevIng2 ? prevIng2.selectedWord : '',
          isCorrect: prevIng2 ? prevIng2.isCorrect : false,
          trapWord: prevIng2 ? prevIng2.trapWord : '',
          trapMeaning: prevIng2 ? prevIng2.trapMeaning : '',
        };
        const ing3Summary: DishIngredientSummary = {
          ingredientNumber: 3,
          koreanMeaning: question.koreanMeaning,
          correctWord: question.correctWord,
          selectedWord,
          isCorrect,
          trapWord: question.trapWord,
          trapMeaning: question.trapMeaning,
        };
        const dishIngredients = [ing1Summary, ing2Summary, ing3Summary];
        const correctCount = dishIngredients.filter((i) => i.isCorrect).length;
        const isFailed = correctCount === 0;
        const dishCoinsAwarded = isFailed ? 0 : correctCount * 10;
        if (isFailed) {
          playDisasterFailSound(soundEnabled);
          setCoinAddedNotice(false);
        } else {
          playFinishFanfare(soundEnabled);
          setCoinAddedNotice(true);
        }
        setDishModalData({
          customer: question.customer,
          customerNumber: question.customerNumber,
          totalCustomers: question.totalCustomers,
          dishName: question.dishName,
          ingredients: dishIngredients,
          coinsAwarded: dishCoinsAwarded,
          isFinalDish: isLastQuestionOfGame,
          pendingSubmission: {
            isCorrect,
            selectedWord,
            coinsEarned: dishCoinsAwarded,
            historyItem,
          }
        });
      }
    } else {
      advanceNext(isCorrect, selectedWord, historyItem);
    }
  };

  // Manual Next Customer button handler from DishCompletionModal
  const handleNextCustomerFromModal = () => {
    if (!dishModalData) return;
    const { pendingSubmission } = dishModalData;
    setDishModalData(null);
    onAnswerSubmitted(pendingSubmission);
  };

  const isUserCorrect = isAnswered && selectedWord === question.correctWord;
  const isUserTrap = isAnswered && selectedWord === question.trapWord;

  // Check if all 3 ingredients are incorrect for this customer
  const prevIng1 = history.find(
    (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 1
  );
  const prevIng2 = history.find(
    (h) => h.customerNumber === question.customerNumber && h.ingredientNumber === 2
  );
  const isAll3IngredientsWrong =
    isLastIngredientOfCustomer &&
    isAnswered &&
    !isUserCorrect &&
    prevIng1?.isCorrect === false &&
    prevIng2?.isCorrect === false;

  // Dynamically tailored negative customer food review on error
  const errorFeedback = isAnswered && !isUserCorrect && selectedWord
    ? getSpecificCustomerErrorFeedback(question.customer, question, selectedWord)
    : null;

  // Effective coins displayed (includes dish completion coins if modal is open)
  const displayCoins = currentCoins + (dishModalData ? dishModalData.coinsAwarded : 0);

  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col justify-between p-2 sm:p-4 text-stone-800 select-none overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, #fffbeb 0%, #fef3c7 60%, #fde68a 100%)',
      }}
      id="game-screen"
    >
      {/* 1. Top Bar: Customer Progress, Dish, Ingredient Progress, Quit button, Sound, and Coin Counter */}
      <header className="w-full flex items-center justify-between gap-2 px-2 py-1.5 bg-amber-950/85 backdrop-blur-md rounded-2xl border-2 border-amber-600/40 shadow-lg text-white z-20 shrink-0">
        {/* Left: Exit + Customer Order Status */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <button
            onClick={onExitToHome}
            className="px-2 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-xs font-bold transition-all border border-stone-600 flex items-center gap-1 active:scale-95"
            title="처음 화면으로 나가기"
            id="exit-to-home-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">처음으로</span>
          </button>

          {/* Customer Number Badge */}
          <div className="flex items-center gap-1 bg-amber-900/90 px-2.5 py-1 rounded-xl border border-amber-500/40">
            <span className="text-[10px] sm:text-xs font-bold text-amber-300">손님</span>
            <span className="text-sm sm:text-base font-black text-amber-100" id="customer-progress-label">
              {question.customerNumber}/{question.totalCustomers}
            </span>
          </div>

          {/* Dish & Ingredient Badge */}
          <div className="hidden xs:flex items-center gap-1 bg-amber-800/60 px-2.5 py-1 rounded-xl border border-amber-600/30 text-xs">
            <span className="text-amber-200 font-bold truncate max-w-[90px] sm:max-w-none">{question.dishName}</span>
            <span className="text-amber-400 font-extrabold bg-amber-950/80 px-1.5 py-0.2 rounded-md text-[11px]">
              재료 {question.ingredientNumber}/{question.totalIngredientsPerCustomer}
            </span>
          </div>

          {/* Total Question Progress */}
          <div className="flex items-center gap-1 text-[11px] text-amber-200/80 font-bold pl-1">
            <span id="question-progress-label">총 {question.orderNumber}/{totalQuestions}</span>
          </div>

          {/* Progress bar line */}
          <div className="hidden lg:block w-28 h-2 bg-stone-800 rounded-full overflow-hidden border border-amber-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${(question.orderNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Sound Toggle and Coins */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSound}
            className="p-1.5 bg-amber-900/60 hover:bg-amber-800/80 rounded-xl border border-amber-600/40 text-amber-200 transition-all active:scale-95"
            title={soundEnabled ? '소리 끄기' : '소리 켜기'}
            id="game-sound-btn"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Coins Display (awarded on dish completion) */}
          <div
            className={`relative flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black px-3 py-1 rounded-xl border-2 border-yellow-200 shadow-md ${
              coinAddedNotice || dishModalData ? 'scale-110 ring-2 ring-yellow-300' : ''
            } transition-all duration-200`}
            id="coins-counter"
          >
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-300" />
            <span className="text-base sm:text-lg font-black tracking-tight">{displayCoins}</span>
            <span className="text-xs font-bold text-amber-900">G</span>

            {/* Coin reward floater upon dish completion */}
            {(coinAddedNotice || dishModalData) && (
              <span className="absolute -bottom-6 right-0 font-extrabold text-xs sm:text-sm text-yellow-300 bg-amber-950 px-2 py-0.5 rounded-full border border-yellow-400 shadow-lg animate-bounce">
                +{dishModalData ? dishModalData.coinsAwarded : 30}🪙
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. Middle Central Zone: Customer + Speech Bubble (3 Ingredients Dish Workflow) */}
      <main className="w-full flex-1 flex flex-col justify-center items-center my-1 sm:my-2 px-1 max-w-5xl mx-auto">
        <div className="w-full flex flex-row items-center justify-center gap-3 sm:gap-6">
          {/* Customer Avatar & Nametag */}
          <div className="flex flex-col items-center shrink-0">
            <CustomerAvatar
              customer={question.customer}
              mood={customerMood}
              size="md"
            />
            <div className="mt-1 bg-amber-950/85 text-amber-200 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-700 shadow-xs flex items-center gap-1">
              <span>{question.customer.name}</span>
            </div>
          </div>

          {/* Customer Order Speech Bubble (Korean Meaning Text - Always Visible) */}
          <div className="relative flex-1 max-w-xl">
            {/* Speech bubble pointer triangle towards customer */}
            <div className="absolute top-1/2 -left-2.5 sm:-left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 sm:border-r-10 border-r-amber-950/90 z-10" />

            <div
              className={`relative bg-amber-950/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-3 ${
                isAnswered
                  ? isUserCorrect
                    ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)]'
                    : 'border-rose-400 shadow-[0_0_20px_rgba(248,113,113,0.35)]'
                  : 'border-amber-400/80 shadow-xl'
              } text-white transition-all duration-200`}
              id="speech-bubble-order"
            >
              {/* Order Header: Customer Name, Ordered Dish, and 3-Ingredient Tray */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-amber-800/60">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-black tracking-wider text-amber-300 uppercase flex items-center gap-1">
                    <span>🍽️ 주문 요리: <strong className="text-white bg-amber-900/90 px-1.5 py-0.5 rounded-md">{question.dishName}</strong></span>
                  </span>
                  <span className="text-[10px] text-amber-300/80 font-semibold">
                    (손님 {question.customerNumber}/5)
                  </span>
                </div>

                {/* 3-Ingredient Dish Completion Tray */}
                <div className="flex items-center gap-1" id="ingredient-dish-tray">
                  {[1, 2, 3].map((slotIdx) => {
                    const isPassed = slotIdx < question.ingredientNumber;
                    const isCurrent = slotIdx === question.ingredientNumber;

                    let slotClass = 'bg-stone-800/80 text-stone-400 border-stone-700';
                    let slotLabel = `${slotIdx}`;

                    if (isPassed) {
                      slotClass = 'bg-emerald-600 text-white border-emerald-400';
                      slotLabel = `✓`;
                    } else if (isCurrent) {
                      if (isAnswered) {
                        slotClass = isUserCorrect
                          ? 'bg-emerald-500 text-white border-emerald-300 ring-2 ring-emerald-400 scale-105'
                          : 'bg-rose-500 text-white border-rose-300 ring-2 ring-rose-400 scale-105';
                        slotLabel = isUserCorrect ? '✓' : '✗';
                      } else {
                        slotClass = 'bg-amber-500 text-stone-950 border-amber-300 font-black animate-pulse';
                        slotLabel = `${slotIdx}`;
                      }
                    }

                    return (
                      <div
                        key={slotIdx}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all shadow-xs ${slotClass}`}
                        title={`재료 ${slotIdx}/3`}
                      >
                        {slotLabel}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Korean Meaning - Large, High Contrast, Prominent */}
              <div className="py-1">
                <p className="text-xs sm:text-sm text-amber-200/90 font-semibold mb-0.5">
                  "셰프님! <strong>{question.ingredientNumber}번째 재료(총 3개)</strong>의 뜻을 확인하고 올려주세요!"
                </p>
                <div className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-stone-950 font-black text-xl sm:text-3xl px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl shadow-md border-2 border-yellow-200">
                  {question.koreanMeaning}
                </div>
              </div>

              {/* Optional Hint Sentence context for CEFR A2 */}
              {question.hintSentence && (
                <p className="text-[11px] sm:text-xs text-amber-200/80 font-mono mt-1 bg-black/25 px-2 py-1 rounded-md border border-white/10">
                  💡 예문 힌트: {question.hintSentence}
                </p>
              )}

              {/* Immediate Feedback Reveal inside speech bubble when answered */}
              {isAnswered && (
                <div
                  className={`mt-2.5 pt-2.5 border-t ${
                    isUserCorrect ? 'border-emerald-500/40' : 'border-rose-500/40'
                  }`}
                  id="feedback-reveal"
                >
                  {isUserCorrect ? (
                    /* Correct Answer Customer Celebration */
                    <div className="space-y-2">
                      <div className="flex items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-black text-sm sm:text-base text-emerald-300 block">
                              {isLastIngredientOfCustomer
                                ? `🎉 [${question.dishName}] 요리 완성!`
                                : `재료 준비 성공! (+10코인은 요리 완성 시 일괄 적립)`}
                            </span>
                            <span className="text-xs text-amber-200/90 italic font-medium">
                              "{question.customer.name}: 완벽해요! 신선한 {question.koreanMeaning} 재료가 딱 들어갔어요!"
                            </span>
                          </div>
                        </div>

                        {/* Audio & Word chip */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-amber-950/95 border-2 border-emerald-500/50 px-3 py-1.5 rounded-xl shadow-inner">
                          <span className="text-sm sm:text-base font-mono font-black text-emerald-300 tracking-wide">
                            {question.correctWord}
                          </span>
                          <button
                            onClick={() => speakEnglishWord(question.correctWord)}
                            className="p-1 text-amber-300 hover:text-white bg-white/10 rounded-md transition-all active:scale-95 cursor-pointer"
                            title="정답 발음 듣기"
                          >
                            <Volume1 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Trap reminder note */}
                      <p className="text-[11px] sm:text-xs text-stone-300 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
                        💡 스펠링 함정 주의: <span className="text-amber-300">{question.trapMeaning}</span>
                      </p>
                    </div>
                  ) : (
                    /* Dynamic Customer Negative Review on Error */
                    <div className="space-y-2">
                      {/* Customer Angry Review Banner */}
                      <div className={`border-2 rounded-xl p-2.5 sm:p-3 shadow-md ${
                        isAll3IngredientsWrong
                          ? 'bg-red-950/90 border-rose-500 shadow-rose-950/70 animate-pulse'
                          : 'bg-rose-950/80 border-rose-500/60'
                      }`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm text-rose-300">
                            <span className="text-base">{isAll3IngredientsWrong ? '🌋' : errorFeedback?.reactionEmoji || '😾'}</span>
                            <span>
                              {isAll3IngredientsWrong
                                ? '💥 3연속 오답! 손님 극대노 폭발'
                                : errorFeedback?.reviewTitle || '손님의 1점 악평'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 bg-rose-900/80 text-rose-100 text-[10px] font-black px-2 py-0.5 rounded-md border border-rose-500/60">
                            <span>{isAll3IngredientsWrong ? '☆☆☆☆☆' : '★☆☆☆☆'}</span>
                            <span>{isAll3IngredientsWrong ? '별점 0점 (극대노)' : '별점 1점'}</span>
                          </div>
                        </div>

                        {/* In-character Customer Speech Quote */}
                        <p className="text-xs sm:text-sm text-rose-100 font-bold leading-relaxed italic bg-black/30 p-2 rounded-lg border border-rose-500/30">
                          {isAll3IngredientsWrong
                            ? `"${question.customer.name}: 3가지 재료가 모조리 틀렸잖아?! 냄새만 맡아도 끔찍해! 이런 쓰레기 괴식은 절대 안 먹어!! 🔥😡"`
                            : errorFeedback?.customerQuote || `"${question.customer.name}: 앗, 주문한 재료가 아니에요!"`}
                        </p>

                        {/* Specific Distinction between Chosen Wrong Word and Correct Word - Large English Typography */}
                        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-rose-900/40 border border-rose-500/40 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2">
                            <span className="text-rose-300 font-bold text-xs shrink-0">
                              선택한 오답:
                            </span>
                            <span className="font-mono font-black text-sm sm:text-base text-rose-200 bg-rose-950 px-2.5 py-1 rounded-lg line-through tracking-wide">
                              {selectedWord}
                            </span>
                          </div>

                          <div className="bg-emerald-950/70 border-2 border-emerald-500/60 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-2 shadow-sm">
                            <span className="text-emerald-300 font-bold text-xs shrink-0">
                              올바른 정답:
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-black text-sm sm:text-base text-emerald-200 bg-emerald-900 px-2.5 py-1 rounded-lg tracking-wide">
                                {question.correctWord}
                              </span>
                              <button
                                onClick={() => speakEnglishWord(question.correctWord)}
                                className="p-1 text-amber-300 hover:text-white bg-white/10 rounded-md transition-all active:scale-95 cursor-pointer shrink-0"
                                title="정답 발음 듣기"
                              >
                                <Volume1 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Pedagogical Explanation */}
                        {errorFeedback && (
                          <p className="text-[11px] text-amber-200 mt-2 font-medium bg-stone-900/70 p-1.5 rounded-md border border-amber-600/30">
                            💡 {errorFeedback.specificExplanation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer Bar: Countdown Timer + Manual Next Button */}
                  <div className="mt-2.5 pt-2 border-t border-amber-800/40 flex items-center justify-between gap-2">
                    {/* Feedback Duration Countdown Indicator (Extra 5 seconds) */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-bold bg-black/30 px-2.5 py-1 rounded-full border border-amber-600/30">
                      <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      {feedbackSecondsLeft !== null && !isLastIngredientOfCustomer ? (
                        <span>
                          {feedbackSecondsLeft}초 후 다음 재료로 자동 이동
                        </span>
                      ) : (
                        <span>
                          {isLastIngredientOfCustomer
                            ? isAll3IngredientsWrong
                              ? '💥 요리 대실패! 손님 극대노 상태'
                              : '요리 완성 리포트 준비 완료'
                            : '원할 때 즉시 다음 재료를 누르세요'}
                        </span>
                      )}
                    </div>

                    {/* Manual Next Button */}
                    <button
                      onClick={handleManualNext}
                      className={`px-3.5 py-1.5 font-black text-xs sm:text-sm rounded-xl border-2 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 ${
                        isAll3IngredientsWrong
                          ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white border-rose-300 shadow-rose-950/50'
                          : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 border-yellow-200'
                      }`}
                      id="next-order-btn"
                    >
                      <span>
                        {isLastIngredientOfCustomer
                          ? isAll3IngredientsWrong
                            ? '요리 실패 결과 확인 💥'
                            : '요리 완성 보기 🍽️'
                          : question.ingredientNumber === 2
                          ? '마지막 재료 주문'
                          : '다음 재료 주문'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. Bottom Zone: 5 [Ingredient Card] Buttons */}
      <footer className="w-full max-w-5xl mx-auto shrink-0 pb-1 z-10">
        <div className="flex items-center justify-between px-1 mb-1.5 text-xs text-amber-950 font-bold">
          <span className="flex items-center gap-1">
            <span>🥗 신선한 영단어 재료 선택 (Ingredient Cards)</span>
            <span className="text-[10px] bg-amber-800/10 text-amber-900 px-2 py-0.5 rounded-full">
              즉시 서빙
            </span>
          </span>
          <span className="text-[11px] text-amber-900/80">
            {isAnswered ? '서빙 결과 확인 중...' : '원하는 영단어를 터치하세요!'}
          </span>
        </div>

        {/* 5 Cards Layout (Finger-friendly in landscape: 5 columns on desktop/tablet, responsive flex/grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3" id="ingredient-cards-container">
          {question.options.map((opt, idx) => {
            const isThisSelected = selectedWord === opt.word;
            const isThisCorrect = opt.word.toLowerCase() === question.correctWord.toLowerCase();
            const isThisTrap = opt.isTrap;

            // Style states
            let cardBg =
              'bg-gradient-to-b from-white to-amber-50/90 text-stone-800 border-amber-300 hover:border-amber-400 hover:shadow-md';
            let statusBadge = null;

            if (isAnswered) {
              if (isThisCorrect) {
                // Correct answer always glows green
                cardBg =
                  'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-300 shadow-lg ring-2 ring-emerald-400 scale-102';
                statusBadge = (
                  <span className="absolute -top-2 -right-1 bg-emerald-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                    정답!
                  </span>
                );
              } else if (isThisSelected && !isThisCorrect) {
                // Selected wrong card turns red
                cardBg =
                  'bg-gradient-to-b from-rose-500 to-rose-700 text-white border-rose-300 shadow-lg ring-2 ring-rose-400';
                statusBadge = (
                  <span className="absolute -top-2 -right-1 bg-rose-400 text-rose-950 text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                    {isThisTrap && <AlertTriangle className="w-2.5 h-2.5" />}
                    {isThisTrap ? '함정!' : '오답'}
                  </span>
                );
              } else {
                // Other unselected options dim
                cardBg = 'bg-stone-100/60 text-stone-400 border-stone-300 opacity-60';
              }
            }

            return (
              <button
                key={`${opt.word}-${idx}`}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.word)}
                className={`relative flex flex-col items-center justify-between p-2.5 sm:p-3.5 rounded-2xl border-2 sm:border-3 transition-all duration-200 cursor-pointer select-none active:scale-98 min-h-[72px] sm:min-h-[96px] ${cardBg}`}
                id={`ingredient-card-${idx}`}
                style={{
                  fontFamily: "'Nunito', 'Noto Sans KR', sans-serif",
                }}
              >
                {statusBadge}

                {/* Top of Card: Emoji + Ingredient Label */}
                <div className="w-full flex items-center justify-between gap-1 text-xs">
                  <span className="text-xl sm:text-2xl drop-shadow-xs">{opt.ingredientEmoji}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] font-semibold truncate ${
                      isAnswered && (isThisCorrect || isThisSelected) ? 'text-white/90' : 'text-stone-500'
                    }`}
                  >
                    {opt.ingredientName}
                  </span>
                </div>

                {/* Center: English Word - Large, clear typography for 1st-year students */}
                <div className="my-1 text-center w-full">
                  <span
                    className={`block text-base sm:text-xl md:text-2xl font-black tracking-tight leading-tight ${
                      isAnswered && (isThisCorrect || isThisSelected) ? 'text-white' : 'text-amber-950'
                    }`}
                  >
                    {opt.word}
                  </span>
                </div>

                {/* Bottom hint label */}
                <div className="w-full flex justify-end">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider ${
                      isAnswered && (isThisCorrect || isThisSelected) ? 'text-white/80' : 'text-stone-400'
                    }`}
                  >
                    TOUCH
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </footer>

      {/* 4. Dish Completion Modal (Finished Dish Image, Reward, and Manual Next Customer button) */}
      {dishModalData && (
        <DishCompletionModal
          customer={dishModalData.customer}
          customerNumber={dishModalData.customerNumber}
          totalCustomers={dishModalData.totalCustomers}
          dishName={dishModalData.dishName}
          ingredients={dishModalData.ingredients}
          coinsAwarded={dishModalData.coinsAwarded}
          onNextCustomer={handleNextCustomerFromModal}
          isFinalDish={dishModalData.isFinalDish}
        />
      )}
    </div>
  );
};

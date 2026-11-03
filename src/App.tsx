import { useState, useCallback } from 'react';
import { Semester, QuestionData, GameHistoryItem } from './types';
import { generateQuestions, findVocabWordsForHistory } from './utils/gameHelper';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { OrientationHelper } from './components/OrientationHelper';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import {
  getUserName,
  setUserName as saveUserName,
  getPlayCount,
  incrementPlayCount,
  getSheetWebhookUrl,
} from './utils/googleSheets';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [semester, setSemester] = useState<Semester>('all');
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [history, setHistory] = useState<GameHistoryItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sentenceTaps, setSentenceTaps] = useState<Record<number, number>>({});

  // Student profile & Google Sheets state
  const [userName, setUserNameState] = useState<string>(() => getUserName());
  const [playCount, setPlayCount] = useState<number>(() => getPlayCount(getUserName()));
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const hasSheetWebhook = Boolean(getSheetWebhookUrl());

  const handleUpdateUserName = useCallback((newName: string) => {
    const clean = newName.trim() || '익명 학생';
    setUserNameState(clean);
    saveUserName(clean);
    setPlayCount(getPlayCount(clean));
  }, []);

  const handleSentenceTap = useCallback((orderNumber: number) => {
    setSentenceTaps((prev) => ({
      ...prev,
      [orderNumber]: (prev[orderNumber] || 0) + 1,
    }));
  }, []);

  // Start new game session
  const handleStartGame = useCallback((chosenSemester = semester) => {
    const newQuestions = generateQuestions(chosenSemester, 15);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setCoins(0);
    setHistory([]);
    setSentenceTaps({});
    setScreen('game');
  }, [semester]);

  // Submit answer for current question
  const handleAnswerSubmitted = useCallback(
    ({
      coinsEarned,
      historyItem,
    }: {
      isCorrect: boolean;
      selectedWord: string;
      coinsEarned: number;
      historyItem: GameHistoryItem;
    }) => {
      setCoins((prev) => prev + coinsEarned);
      setHistory((prev) => [...prev, historyItem]);

      // Move to next question or result screen
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Increment play count upon finishing game round
        const nextCount = incrementPlayCount(userName);
        setPlayCount(nextCount);
        setScreen('result');
      }
    },
    [currentQuestionIndex, questions.length, userName]
  );

  // Retry full 15 questions
  const handleRetry = useCallback(() => {
    handleStartGame(semester);
  }, [handleStartGame, semester]);

  // Retry only incorrect questions
  const handleRetryIncorrectOnly = useCallback((incorrectItems: GameHistoryItem[]) => {
    const vocabList = findVocabWordsForHistory(incorrectItems);
    if (vocabList.length === 0) {
      handleStartGame(semester);
      return;
    }
    const reviewQuestions = generateQuestions(semester, vocabList.length, vocabList);
    setQuestions(reviewQuestions);
    setCurrentQuestionIndex(0);
    setCoins(0);
    setHistory([]);
    setScreen('game');
  }, [handleStartGame, semester]);

  // Return to home start screen
  const handleBackToHome = useCallback(() => {
    setScreen('start');
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return (
    <div className="w-full min-h-screen bg-stone-900 font-sans flex flex-col items-center justify-center">
      {/* Active Screen View */}
      {screen === 'start' && (
        <StartScreen
          semester={semester}
          onSelectSemester={setSemester}
          onStartGame={() => handleStartGame(semester)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          userName={userName}
          onUpdateUserName={handleUpdateUserName}
          playCount={playCount}
          onOpenSheetModal={() => setIsSheetModalOpen(true)}
          hasSheetWebhook={hasSheetWebhook}
        />
      )}

      {screen === 'game' && questions.length > 0 && questions[currentQuestionIndex] && (
        <GameScreen
          question={questions[currentQuestionIndex]}
          totalQuestions={questions.length}
          currentCoins={coins}
          history={history}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onAnswerSubmitted={handleAnswerSubmitted}
          onExitToHome={handleBackToHome}
          sentenceTapCount={sentenceTaps[questions[currentQuestionIndex].orderNumber] || 0}
          onTapSentence={() => handleSentenceTap(questions[currentQuestionIndex].orderNumber)}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          totalCoins={coins}
          maxCoins={questions.length * 10}
          history={history}
          semester={semester}
          soundEnabled={soundEnabled}
          onRetry={handleRetry}
          onRetryIncorrectOnly={handleRetryIncorrectOnly}
          onBackToHome={handleBackToHome}
          userName={userName}
          playCount={playCount}
          onOpenSheetModal={() => setIsSheetModalOpen(true)}
          hasSheetWebhook={hasSheetWebhook}
          questions={questions}
          sentenceTaps={sentenceTaps}
          onTapSentence={handleSentenceTap}
        />
      )}

      {/* Google Sheets Setup & Code Modal */}
      <GoogleSheetsModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        currentUserName={userName}
      />

      {/* Orientation helper notification for smartphones (portrait) & tablets/laptops (landscape) */}
      <OrientationHelper />
    </div>
  );
}

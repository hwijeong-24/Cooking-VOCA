export type Semester = 'all' | 'semester1' | 'semester2';

export interface VocabWord {
  id: string;
  koreanMeaning: string;       // e.g. "사막"
  correctWord: string;         // e.g. "desert"
  trapWord: string;            // e.g. "dessert" (달콤한 디저트/후식)
  trapMeaning: string;         // e.g. "디저트, 후식 (s가 2개)"
  phonetic?: string;           // e.g. "/ˈdez.ət/"
  distractors: string[];       // 3 other words, e.g. ["dinner", "forest", "season"]
  semester: 'semester1' | 'semester2';
  hintSentence?: string;       // e.g. "The camel walked across the hot ___."
  category?: string;           // e.g. "자연과 날씨", "학교생활", "일상과 감정"
}

export interface QuestionData {
  id: string;
  orderNumber: number;         // 1 to 15 (overall question number)
  customerNumber: number;      // 1 to 5 (Customer index)
  totalCustomers: number;      // 5
  ingredientNumber: number;    // 1 to 3 (Ingredient order for this customer)
  totalIngredientsPerCustomer: number; // 3
  dishName: string;            // e.g. "연어 파스타"
  koreanMeaning: string;
  correctWord: string;
  trapWord: string;
  trapMeaning: string;
  hintSentence?: string;
  category?: string;
  options: {
    word: string;
    isCorrect: boolean;
    isTrap: boolean;
    ingredientEmoji: string;
    ingredientName: string;
  }[];
  customer: CustomerProfile;
}

export type CustomerMood = 'waiting' | 'happy' | 'angry';

export interface CustomerProfile {
  id: string;
  name: string;
  animalType: 'cat' | 'bear' | 'rabbit' | 'dog' | 'fox' | 'panda' | 'penguin' | 'koala';
  foodPreference: string;
  colorScheme: {
    primary: string;
    accent: string;
    bg: string;
  };
}

export interface GameHistoryItem {
  questionNumber: number;
  customerNumber: number;
  ingredientNumber: number;
  dishName: string;
  koreanMeaning: string;
  correctWord: string;
  selectedWord: string;
  isCorrect: boolean;
  trapWord: string;
  trapMeaning: string;
}

export interface GameState {
  screen: 'start' | 'game' | 'result';
  semester: Semester;
  currentQuestionIndex: number;
  coins: number;
  score: number;
  history: GameHistoryItem[];
  soundEnabled: boolean;
}

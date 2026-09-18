import { VocabWord, QuestionData, Semester, GameHistoryItem } from '../types';
import { VOCABULARY_LIST, CUSTOMER_PROFILES, INGREDIENT_STYLES } from '../data/vocabulary';

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuestions(
  semester: Semester,
  targetCount: number = 15,
  customWords?: VocabWord[]
): QuestionData[] {
  // 1. Select source vocabulary
  let sourceList: VocabWord[] = [];

  if (customWords && customWords.length > 0) {
    sourceList = customWords;
  } else {
    if (semester === 'all') {
      sourceList = [...VOCABULARY_LIST];
    } else {
      sourceList = VOCABULARY_LIST.filter((w) => w.semester === semester);
    }
  }

  // Shuffle candidate words
  const shuffledVocab = shuffleArray(sourceList);
  // Pick up to targetCount
  const selectedVocab = shuffledVocab.slice(0, Math.min(targetCount, shuffledVocab.length));

  // 5 customers for 15 questions (3 ingredients per customer order)
  const INGREDIENTS_PER_CUSTOMER = 3;
  const totalQuestions = selectedVocab.length;
  const totalCustomers = Math.max(1, Math.ceil(totalQuestions / INGREDIENTS_PER_CUSTOMER));

  // Shuffled customers to serve
  const shuffledCustomers = shuffleArray(CUSTOMER_PROFILES);

  // 2. Build QuestionData for each word
  return selectedVocab.map((vocab, index) => {
    const customerIdx = Math.floor(index / INGREDIENTS_PER_CUSTOMER);
    const customer = shuffledCustomers[customerIdx % shuffledCustomers.length];
    const customerNumber = customerIdx + 1;
    const ingredientNumber = (index % INGREDIENTS_PER_CUSTOMER) + 1;
    const dishName = customer.foodPreference;

    // Build the 5 options: 1 correct + 1 trap + 3 distractors
    const optionsRaw: {
      word: string;
      isCorrect: boolean;
      isTrap: boolean;
    }[] = [
      {
        word: vocab.correctWord,
        isCorrect: true,
        isTrap: false,
      },
      {
        word: vocab.trapWord,
        isCorrect: false,
        isTrap: true,
      },
    ];

    // Ensure we have 3 unique distractors that don't match correct or trap
    const existingWords = new Set([vocab.correctWord.toLowerCase(), vocab.trapWord.toLowerCase()]);
    const availableDistractors: string[] = [];

    for (const d of vocab.distractors) {
      if (!existingWords.has(d.toLowerCase())) {
        availableDistractors.push(d);
        existingWords.add(d.toLowerCase());
      }
    }

    // If needed, pull more words from the general vocabulary pool
    if (availableDistractors.length < 3) {
      for (const other of VOCABULARY_LIST) {
        if (!existingWords.has(other.correctWord.toLowerCase())) {
          availableDistractors.push(other.correctWord);
          existingWords.add(other.correctWord.toLowerCase());
        }
        if (availableDistractors.length >= 3) break;
      }
    }

    // Add first 3 unique distractors
    for (const d of availableDistractors.slice(0, 3)) {
      optionsRaw.push({
        word: d,
        isCorrect: false,
        isTrap: false,
      });
    }

    // Shuffle the 5 options
    const shuffledOptions = shuffleArray(optionsRaw);

    // Shuffle ingredient visuals for each card
    const shuffledIngredientStyles = shuffleArray(INGREDIENT_STYLES);

    const options = shuffledOptions.map((opt, optIdx) => {
      const style = shuffledIngredientStyles[optIdx % shuffledIngredientStyles.length];
      return {
        ...opt,
        ingredientEmoji: style.emoji,
        ingredientName: style.name,
      };
    });

    return {
      id: `q_${vocab.id}_${index}`,
      orderNumber: index + 1,
      customerNumber,
      totalCustomers,
      ingredientNumber,
      totalIngredientsPerCustomer: INGREDIENTS_PER_CUSTOMER,
      dishName,
      koreanMeaning: vocab.koreanMeaning,
      correctWord: vocab.correctWord,
      trapWord: vocab.trapWord,
      trapMeaning: vocab.trapMeaning,
      hintSentence: vocab.hintSentence,
      category: vocab.category,
      options,
      customer,
    };
  });
}

// Convert history items to VocabWord list for targeted review
export function findVocabWordsForHistory(historyItems: GameHistoryItem[]): VocabWord[] {
  const wordMap = new Map<string, VocabWord>();
  for (const v of VOCABULARY_LIST) {
    wordMap.set(v.correctWord.toLowerCase(), v);
  }

  const result: VocabWord[] = [];
  for (const item of historyItems) {
    const found = wordMap.get(item.correctWord.toLowerCase());
    if (found) {
      result.push(found);
    }
  }
  return result;
}

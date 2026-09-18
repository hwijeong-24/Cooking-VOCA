import { CustomerProfile, QuestionData } from '../types';

export interface CustomerErrorFeedback {
  customerQuote: string;
  reviewTitle: string;
  specificExplanation: string;
  reactionEmoji: string;
  isTrap: boolean;
}

/**
 * Generates dynamic, highly specific negative customer reviews when a student selects
 * an incorrect ingredient card. Tailored specifically to the chosen wrong word,
 * distinguishing spelling trap words from regular distractors, in the character's voice.
 */
export function getSpecificCustomerErrorFeedback(
  customer: CustomerProfile,
  question: QuestionData,
  selectedWrongWord: string
): CustomerErrorFeedback {
  const isTrap = selectedWrongWord.toLowerCase() === question.trapWord.toLowerCase();
  const animal = customer.animalType;
  const name = customer.name;
  const dish = question.dishName;
  const targetMeaning = question.koreanMeaning;
  const correct = question.correctWord;
  const trapWord = question.trapWord;
  const trapMeaning = question.trapMeaning;

  // 1. When the user fell into the specific SPELLING TRAP word
  if (isTrap) {
    switch (animal) {
      case 'cat':
        return {
          customerQuote: `“냥? 셰프님! 저는 '${targetMeaning}' 재료를 원했는데, 철자가 쏙 닮은 '${selectedWrongWord}'(${trapMeaning})이(가) 들어갔다냥! 맛이 살짝 알쏭달쏭해요냥~ 😿”`,
          reviewTitle: `냥냥이의 시무룩한 리뷰: “제가 주문한 재료가 아니에요냥!”`,
          specificExplanation: `단어 '${selectedWrongWord}'은(는) '${correct}'와 철자가 비슷하지만 뜻이 전혀 다른 함정 단어(${trapMeaning})입니다.`,
          reactionEmoji: '😿',
          isTrap: true,
        };

      case 'bear':
        return {
          customerQuote: `“어라라? '${targetMeaning}' 대신 철자가 헷갈리는 '${selectedWrongWord}'(${trapMeaning})을(를) 넣으셨네요! 곰돌이가 기대했던 달콤한 맛이 아니에요, 흑흑! 🐻💦”`,
          reviewTitle: `곰돌이의 아쉬운 표정: “이 맛은 조금 낯설어요!”`,
          specificExplanation: `정답 '${correct}'(${targetMeaning}) 대신 함정 단어 '${selectedWrongWord}'(${trapMeaning})을(를) 넣었습니다.`,
          reactionEmoji: '🐻',
          isTrap: true,
        };

      case 'rabbit':
        return {
          customerQuote: `“앗! 셰프님! '${targetMeaning}'을(를) 부탁드렸는데 닮은꼴 철자인 '${selectedWrongWord}'(${trapMeaning})이(가) 쏙 들어갔어요! 신선한 맛이 살짝 어색해졌어요! 🐰💧”`,
          reviewTitle: `토끼 학생의 갸우뚱 리뷰: “철자가 살짝 헷갈리셨나 봐요!”`,
          specificExplanation: `'${correct}'와(과) '${selectedWrongWord}'은(는) 1학년 시험에 가장 자주 나오는 철자 혼동 어휘(${trapMeaning})예요.`,
          reactionEmoji: '🐰',
          isTrap: true,
        };

      case 'dog':
        return {
          customerQuote: `“컹컹! '${targetMeaning}' 재료 자리에 스펠링이 비슷한 '${selectedWrongWord}'(${trapMeaning})이(가) 쏙 들어가다니! 철자 함정에 깜빡 속으셨군요, 셰프님! 🐶”`,
          reviewTitle: `멍멍 단골손님의 아쉬운 한마디: “함정 단어를 조심하세요!”`,
          specificExplanation: `헷갈리는 함정 단어 '${selectedWrongWord}'(${trapMeaning}) 대신 올바른 스펠링 '${correct}'을(를) 기억하세요!`,
          reactionEmoji: '🐶',
          isTrap: true,
        };

      case 'fox':
        return {
          customerQuote: `“흠! '${targetMeaning}'의 진짜 철자는 '${correct}'인데, 유사한 '${selectedWrongWord}'(${trapMeaning})에 살짝 낚이셨군요. 다음엔 스펠링을 잘 비교해보세요! 🦊✨”`,
          reviewTitle: `여우 손님의 친절한 조언: “함정 철자를 다시 확인해볼까요?”`,
          specificExplanation: `주의: '${selectedWrongWord}'(${trapMeaning})은(는) 스펠링 착각을 유도하는 대표적인 트랩 어휘입니다.`,
          reactionEmoji: '🦊',
          isTrap: true,
        };

      case 'panda':
        return {
          customerQuote: `“어라? 상쾌한 맛을 기대했는데 '${targetMeaning}' 대신 '${selectedWrongWord}'(${trapMeaning})이(가) 씹혀요! 맛이 조금 이상해요! 🐼”`,
          reviewTitle: `판다 손님의 머쓱한 후기: “제가 생각한 재료가 아니에요!”`,
          specificExplanation: `'${selectedWrongWord}'은(는) '${targetMeaning}'이(가) 아니라 '${trapMeaning}'을(를) 의미합니다.`,
          reactionEmoji: '🐼',
          isTrap: true,
        };

      case 'penguin':
        return {
          customerQuote: `“솔직하게 말씀드릴게요. '${targetMeaning}'의 필수 단어인 '${correct}' 대신 함정 철자인 '${selectedWrongWord}'(${trapMeaning})이(가) 들어가서 식감이 어색해졌어요. 🐧”`,
          reviewTitle: `펭귄 손님의 솔직한 평가: “올바른 철자를 챙겨주세요!”`,
          specificExplanation: `헷갈리기 쉬운 '${selectedWrongWord}'(${trapMeaning})에 주의하고, 정답 철자 '${correct}'을(를) 챙기세요.`,
          reactionEmoji: '🐧',
          isTrap: true,
        };

      case 'koala':
      default:
        return {
          customerQuote: `“깜짝 놀라 눈이 동그래졌어요! '${targetMeaning}' 요리에 왜 '${selectedWrongWord}'(${trapMeaning})이(가) 들어갔을까요? 셰프님, 진짜 정답 '${correct}'을(를) 찾아주세요! 🐨”`,
          reviewTitle: `${name}의 당황한 한마디: “이건 제가 주문한 재료가 아니에요!”`,
          specificExplanation: `'${selectedWrongWord}'은(는) ${trapMeaning}의 뜻을 가진 스펠링 함정입니다.`,
          reactionEmoji: '🐨',
          isTrap: true,
        };
    }
  }

  // 2. When the user chose a GENERAL WRONG DISTRACTOR word
  switch (animal) {
    case 'cat':
      return {
        customerQuote: `“냥? 셰프님, '${targetMeaning}' 요리에 다른 재료인 '${selectedWrongWord}'이(가) 들어갔다냥! 맛이 살짝 이상하다냥~ 😿”`,
        reviewTitle: `냥냥이의 시무룩한 리뷰: “엉뚱한 재료가 섞였어요냥!”`,
        specificExplanation: `선택하신 '${selectedWrongWord}'은(는) '${targetMeaning}'과(와) 무관합니다. 정답은 '${correct}'입니다.`,
        reactionEmoji: '😿',
        isTrap: false,
      };

    case 'bear':
      return {
        customerQuote: `“으앙! '${targetMeaning}' 자리에 엉뚱한 '${selectedWrongWord}'을(를) 넣으시면 맛이 너무 낯설어요! 다음엔 꼭 정답을 골라주세요! 🐻”`,
        reviewTitle: `곰돌이의 아쉬운 표정: “제가 주문한 맛이 아니에요!”`,
        specificExplanation: `'${targetMeaning}'에 알맞은 올바른 영어 단어는 '${correct}'입니다.`,
        reactionEmoji: '🐻',
        isTrap: false,
      };

    case 'rabbit':
      return {
        customerQuote: `“어라? 제가 주문한 '${targetMeaning}' 재료 대신 '${selectedWrongWord}'이(가) 쏙 들어가 있어요! 정답 '${correct}'을(를) 넣어주시면 좋겠어요! 🐰”`,
        reviewTitle: `토끼 학생의 아쉬운 표정: “다른 재료가 섞였어요!”`,
        specificExplanation: `'${targetMeaning}'의 올바른 영어 철자는 '${correct}'입니다. '${selectedWrongWord}'은(는) 오답입니다.`,
        reactionEmoji: '🐰',
        isTrap: false,
      };

    case 'dog':
      return {
        customerQuote: `“컹! 셰프님, '${targetMeaning}' 자리에 엉뚱한 '${selectedWrongWord}'이(가) 들어갔어요! 진짜 단어인 '${correct}'을(를) 찾아주세요! 🐶”`,
        reviewTitle: `멍멍 단골손님의 갸우뚱: “주문한 재료가 아니에요!”`,
        specificExplanation: `'${targetMeaning}'은(는) 영어로 '${correct}'입니다.`,
        reactionEmoji: '🐶',
        isTrap: false,
      };

    case 'fox':
      return {
        customerQuote: `“이런 이런, '${targetMeaning}'의 기본 단어인 '${correct}'을(를) 놓치고 다른 '${selectedWrongWord}'을(를) 고르셨군요. 침착하게 단어를 다시 보세요! 🦊”`,
        reviewTitle: `여우 손님의 친절한 조언: “기초 단어 철자를 다시 확인해봐요!”`,
        specificExplanation: `'${targetMeaning}'을(를) 나타내는 정확한 단어는 '${correct}'입니다.`,
        reactionEmoji: '🦊',
        isTrap: false,
      };

    case 'panda':
    case 'penguin':
    case 'koala':
    default:
      return {
        customerQuote: `“어라? '${targetMeaning}'을(를) 원했는데 다른 재료 '${selectedWrongWord}'이(가) 들어갔어요! 맛이 살짝 이상해요... 진짜 재료는 '${correct}'랍니다! 🍽️”`,
        reviewTitle: `${name}의 시무룩한 후기: “맛이 조금 이상해요...”`,
        specificExplanation: `'${targetMeaning}'의 정답 영어 단어는 '${correct}'입니다.`,
        reactionEmoji: '😕',
        isTrap: false,
      };
  }
}

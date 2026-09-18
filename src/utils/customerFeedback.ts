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
          customerQuote: `“우웩! 셰프님! 저는 '${targetMeaning}' 재료를 원했는데, 스펠링이 헷갈리는 '${selectedWrongWord}'을(를) 넣으시면 어떡해요냥! 이건 ${trapMeaning}잖아요! 맛이 엉망진창이 됐다냥! 😿”`,
          reviewTitle: `냥냥이의 1점 악평: “스펠링 함정에 낚인 요리다냥!”`,
          specificExplanation: `단어 '${selectedWrongWord}'은(는) '${correct}'와 철자가 비슷하지만 뜻이 전혀 다른 함정 단어(${trapMeaning})입니다.`,
          reactionEmoji: '😾',
          isTrap: true,
        };

      case 'bear':
        return {
          customerQuote: `“으아앙! 배고파 죽겠는데 '${targetMeaning}' 대신 '${selectedWrongWord}'(${trapMeaning})을(를) 넣으면 어떡해요! 정답 '${correct}' 스펠링을 헷갈리신 거죠?! 곰 배가 아프다구요! 🐻💢”`,
          reviewTitle: `배고픈 곰돌이의 불만 폭발: “달콤함은커녕 함정 맛이 나요!”`,
          specificExplanation: `정답 '${correct}'(${targetMeaning}) 대신 함정 단어 '${selectedWrongWord}'(${trapMeaning})을(를) 넣었습니다.`,
          reactionEmoji: '🐻‍❄️',
          isTrap: true,
        };

      case 'rabbit':
        return {
          customerQuote: `“앗! 셰프님! '${targetMeaning}'을(를) 달라고 했는데 '${selectedWrongWord}'을(를) 넣으셨어요! '${selectedWrongWord}'은(는) '${trapMeaning}'라는 뜻이라 신선한 ${dish}의 맛이 완전히 변해버렸어요! 🐰💦”`,
          reviewTitle: `토끼 학생의 속상한 리뷰: “레시피 단어가 헷갈리셨나 봐요!”`,
          specificExplanation: `'${correct}'와(과) '${selectedWrongWord}'은(는) 1학년 시험에 가장 자주 나오는 철자 혼동 어휘(${trapMeaning})예요.`,
          reactionEmoji: '🐰',
          isTrap: true,
        };

      case 'dog':
        return {
          customerQuote: `“컹컹! 내가 단골인데 이런 실수를?! '${targetMeaning}' 재료 자리에 '${selectedWrongWord}'(${trapMeaning})이(가) 들어가다니! 철자 함정에 속으셨군요, 셰프님! 🐶”`,
          reviewTitle: `멍멍 단골손님의 뼈아픈 피드백: “입맛을 뚝 떨어뜨린 함정 단어!”`,
          specificExplanation: `헷갈리는 함정 단어 '${selectedWrongWord}'(${trapMeaning}) 대신 올바른 스펠링 '${correct}'을(를) 기억하세요!`,
          reactionEmoji: '🐶',
          isTrap: true,
        };

      case 'fox':
        return {
          customerQuote: `“흠! 기본기가 부족하군요! '${targetMeaning}'은(는) 당연히 '${correct}'이거늘, 스펠링이 유사한 '${selectedWrongWord}'(${trapMeaning})을(를) 집어넣다니 이 접시는 불합격입니다! 🦊”`,
          reviewTitle: `여우 교수님의 혹평: “철자 구분을 다시 공부하고 오세요.”`,
          specificExplanation: `주의: '${selectedWrongWord}'(${trapMeaning})은(는) 스펠링 착각을 유도하는 대표적인 트랩 어휘입니다.`,
          reactionEmoji: '🦊',
          isTrap: true,
        };

      case 'panda':
        return {
          customerQuote: `“콜록콜록! 건강한 맛을 기대했는데 '${targetMeaning}' 대신 엉뚱한 '${selectedWrongWord}'(${trapMeaning})이(가) 씹혀요! '${correct}'을(를) 넣으셔야죠! 🐼”`,
          reviewTitle: `판다 선배의 당황한 후기: “대나무 향이 다 날아갔어요!”`,
          specificExplanation: `'${selectedWrongWord}'은(는) '${targetMeaning}'이(가) 아니라 '${trapMeaning}'을(를) 의미합니다.`,
          reactionEmoji: '🐼',
          isTrap: true,
        };

      case 'penguin':
        return {
          customerQuote: `“차갑게 평가하겠습니다. '${targetMeaning}'에 필수적인 '${correct}' 대신 함정 철자인 '${selectedWrongWord}'(${trapMeaning})을(를) 투입해 식감이 무너졌습니다. 별점 반 개! 🐧”`,
          reviewTitle: `펭귄 요리평론가의 혹평: “치명적인 철자 오류로 탈락입니다.”`,
          specificExplanation: `헷갈리기 쉬운 '${selectedWrongWord}'(${trapMeaning})에 주의하고, 정답 철자 '${correct}'을(를) 챙기세요.`,
          reactionEmoji: '🐧',
          isTrap: true,
        };

      case 'koala':
      default:
        return {
          customerQuote: `“깜짝 놀라 졸음이 확 깼어요! '${targetMeaning}' 요리에 왜 '${selectedWrongWord}'(${trapMeaning})을(를) 넣으신 건가요? 셰프님, 정답 '${correct}'을(를) 찾아주세요! 🐨”`,
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
        customerQuote: `“냥! 셰프님 눈에는 '${selectedWrongWord}'이(가) '${targetMeaning}'(으)로 보이나요냥?! 전혀 엉뚱한 단어를 넣어서 맛이 이상해졌다냥! 😾”`,
        reviewTitle: `냥냥이의 실망 리뷰: “전혀 엉뚱한 재료를 넣으셨다냥!”`,
        specificExplanation: `선택하신 '${selectedWrongWord}'은(는) '${targetMeaning}'과(와) 무관합니다. 정답은 '${correct}'입니다.`,
        reactionEmoji: '😿',
        isTrap: false,
      };

    case 'bear':
      return {
        customerQuote: `“으앙! '${targetMeaning}'이(가) 아니라 엉뚱한 '${selectedWrongWord}'을(를) 넣으면 어떡해요! 이 ${dish}는 못 먹겠어요, 새로 만들어주세요! 🐻”`,
        reviewTitle: `배고픈 곰돌이의 찡그림: “이 맛이 아니야!”`,
        specificExplanation: `'${targetMeaning}'에 알맞은 올바른 영어 단어는 '${correct}'입니다.`,
        reactionEmoji: '🐻',
        isTrap: false,
      };

    case 'rabbit':
      return {
        customerQuote: `“어라? 제가 주문한 '${targetMeaning}' 재료는 어디 가고 엉뚱한 '${selectedWrongWord}'이(가) 들어있죠? 정답 '${correct}'을(를) 넣어주셔야 해요! 🐰”`,
        reviewTitle: `토끼 학생의 의아한 표정: “다른 재료가 섞였어요!”`,
        specificExplanation: `'${targetMeaning}'의 올바른 영어 철자는 '${correct}'입니다. '${selectedWrongWord}'은(는) 오답입니다.`,
        reactionEmoji: '🐰',
        isTrap: false,
      };

    case 'dog':
      return {
        customerQuote: `“컹! 셰프님 레시피 북을 잘못 보신 것 같아요! '${targetMeaning}' 자리에 왜 '${selectedWrongWord}'이(가) 들어간 건가요?! 🐶”`,
        reviewTitle: `멍멍 단골손님의 갸우뚱: “주문이 완전히 잘못 들어갔어요!”`,
        specificExplanation: `'${targetMeaning}'은(는) 영어로 '${correct}'입니다.`,
        reactionEmoji: '🐶',
        isTrap: false,
      };

    case 'fox':
      return {
        customerQuote: `“이런 이런, '${targetMeaning}'의 기본 단어인 '${correct}'을(를) 놓치고 무관한 '${selectedWrongWord}'을(를) 고르셨군요. 침착하게 단어를 다시 보세요! 🦊”`,
        reviewTitle: `여우 교수님의 일침: “기초 단어 복습이 필요합니다.”`,
        specificExplanation: `'${targetMeaning}'을(를) 나타내는 정확한 단어는 '${correct}'입니다.`,
        reactionEmoji: '🦊',
        isTrap: false,
      };

    case 'panda':
    case 'penguin':
    case 'koala':
    default:
      return {
        customerQuote: `“이런! '${targetMeaning}'을(를) 원했는데 엉뚱한 재료 '${selectedWrongWord}'을(를) 넣으셨어요! 올바른 재료는 '${correct}'라구요! 🍽️”`,
        reviewTitle: `${name}의 불만족 후기: “주문한 재료가 아니에요!”`,
        specificExplanation: `'${targetMeaning}'의 정답 영어 단어는 '${correct}'입니다.`,
        reactionEmoji: '😕',
        isTrap: false,
      };
  }
}

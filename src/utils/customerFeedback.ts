import { CustomerProfile, QuestionData } from '../types';

export interface CustomerErrorFeedback {
  customerQuote: string;
  reviewTitle: string;
  specificExplanation: string;
  reactionEmoji: string;
  isTrap: boolean;
}

/**
 * Korean definitions for all vocabulary words and distractors in the game.
 * Used to give accurate, specific pedagogical feedback when any option is chosen.
 */
export const WORD_DEFINITIONS: Record<string, string> = {
  // Vocabulary & Trap pairs
  desert: '사막',
  dessert: '디저트, 후식',
  diary: '일기',
  dairy: '유제품',
  quiet: '조용한',
  quite: '꽤, 상당히',
  message: '메시지, 전갈',
  massage: '마사지',
  lose: '잃어버리다, 지다',
  loose: '헐거운, 헐렁한',
  breathe: '숨쉬다, 호흡하다',
  breath: '숨, 호흡',
  advice: '조언, 충고',
  advise: '조언하다',
  weather: '날씨',
  whether: '~인지 아닌지',
  angel: '천사',
  angle: '각도, 모서리',
  wonder: '궁금해하다, 경이',
  wander: '돌아다니다, 방황하다',
  receipt: '영수증',
  recipe: '요리법, 조리법',
  correct: '맞는, 올바른',
  collect: '수집하다, 모으다',
  protect: '보호하다, 지키다',
  project: '과제, 계획',
  invent: '발명하다',
  invite: '초대하다',
  practice: '연습하다, 실천',
  practical: '실용적인',
  except: '~을 제외하고',
  accept: '받아들이다, 수락하다',
  affect: '영향을 미치다 (동사)',
  effect: '영향, 효과 (명사)',
  custom: '관습, 풍습',
  costume: '의상, 복장',
  succeed: '성공하다',
  proceed: '앞으로 진행하다',
  personal: '개인적인, 사적인',
  personnel: '인사부, 직원들',
  principal: '교장 선생님, 주요한',
  principle: '원리, 원칙',
  adapt: '적응하다, 맞추다',
  adopt: '입양하다, 채택하다',
  convenient: '편리한',
  confident: '자신감 있는',
  respect: '존경하다, 존중하다',
  suspect: '의심하다, 용의자',
  patient: '인내심 있는, 환자',
  parent: '부모님',
  stationery: '문구류, 필기구',
  stationary: '정지한, 움직이지 않는',
  compliment: '칭찬하다, 찬사',
  complement: '보완하다',

  // Distractors
  accent: '억양, 말씨',
  access: '접근, 이용',
  adjust: '조절하다, 맞추다',
  admit: '인정하다, 허락하다',
  adore: '아주 좋아하다',
  adult: '어른, 성인',
  advance: '나아가다, 발전',
  afford: '여유가 되다',
  agent: '대리인, 중개인',
  ankle: '발목',
  appear: '나타나다, 보이다',
  attack: '공격하다',
  blow: '바람이 불다',
  branch: '나뭇가지, 지점',
  bright: '밝은, 영리한',
  clothes: '옷, 의복',
  comfort: '편안함, 위로하다',
  complain: '불평하다',
  complete: '완성하다, 완료된',
  complex: '복잡한',
  connect: '연결하다',
  constant: '끊임없는, 일정한',
  continue: '계속하다',
  cotton: '면, 솜',
  cousin: '사촌',
  culture: '문화',
  current: '현재의, 흐름',
  customer: '손님, 고객',
  daily: '매일의, 일상의',
  device: '장치, 기기',
  dinner: '저녁 식사',
  direct: '직접적인, 안내하다',
  effort: '노력',
  escape: '탈출하다, 달아나다',
  expand: '확장하다, 넓히다',
  expect: '기대하다, 예상하다',
  expert: '전문가',
  feather: '깃털',
  find: '찾다, 발견하다',
  forest: '숲, 산림',
  giant: '거인, 거대한',
  inform: '알리다, 통지하다',
  inside: '안쪽에, 내부의',
  intent: '의도, 열중하는',
  intend: '의도하다',
  invest: '투자하다',
  involve: '포함하다, 관련시키다',
  island: '섬',
  letter: '편지, 글자',
  look: '보다, 바라보다',
  loud: '시끄러운, 소리가 큰',
  memory: '기억, 추억',
  miss: '놓치다, 그리워하다',
  notice: '알아차리다, 공지',
  novel: '소설, 새로운',
  passage: '통로, 구절',
  patent: '특허',
  percent: '퍼센트, 백분율',
  period: '기간, 마침표',
  person: '사람',
  polite: '공손한, 예의 바른',
  ponder: '깊이 생각하다',
  predict: '예측하다',
  prevent: '예방하다, 막다',
  primary: '주요한, 초등의',
  prince: '왕자',
  private: '사적인, 개인적인',
  produce: '생산하다, 만들다',
  promise: '약속하다',
  quick: '빠른, 신속한',
  reflect: '반사하다, 반영하다',
  remind: '상기시키다',
  repeat: '반복하다',
  report: '보고서, 알리다',
  season: '계절',
  silent: '조용한, 침묵의',
  stapler: '스테이플러',
  statement: '진술, 성명',
  station: '역, 정거장',
  suggest: '제안하다',
  support: '지지하다, 후원하다',
  survive: '살아남다, 생존하다',
  ticket: '표, 티켓',
  voice: '목소리',
  winner: '승자, 우승자',
  winter: '겨울',
};

export function getWordMeaning(word: string): string {
  const normalized = word.trim().toLowerCase();
  return WORD_DEFINITIONS[normalized] || '다른 뜻의 어휘';
}

/**
 * Generates dynamic, highly specific negative customer reviews when a student selects
 * an incorrect ingredient card.
 *
 * CRITICAL LOGIC:
 * - If the student chose the SPELLING TRAP card (isTrap === true):
 *   Feedback explicitly highlights the confusing spelling and trap meaning.
 * - If the student chose a REGULAR DISTRACTOR card (isTrap === false):
 *   Feedback STRICTLY matches the chosen wrong word and its specific meaning,
 *   with NO mention of the trap card or trap meaning.
 */
export function getSpecificCustomerErrorFeedback(
  customer: CustomerProfile,
  question: QuestionData,
  selectedWrongWord: string
): CustomerErrorFeedback {
  const selectedOption = question.options?.find(
    (opt) => opt.word.toLowerCase() === selectedWrongWord.toLowerCase()
  );

  // Strictly check if the chosen option is indeed the spelling trap card
  const isTrap = selectedOption
    ? selectedOption.isTrap
    : selectedWrongWord.toLowerCase() === question.trapWord.toLowerCase();

  const animal = customer.animalType;
  const name = customer.name;
  const targetMeaning = question.koreanMeaning;
  const correct = question.correctWord;
  const trapMeaning = question.trapMeaning;
  const chosenWordMeaning = getWordMeaning(selectedWrongWord);
  const ingredientName = selectedOption?.ingredientName || '선택한 재료';

  // =========================================================================
  // 1. When the user fell into the specific SPELLING TRAP card
  // =========================================================================
  if (isTrap) {
    switch (animal) {
      case 'cat':
        return {
          customerQuote: `“냥? 셰프님! 저는 '${targetMeaning}'(${correct})을(를) 주문했는데, 철자가 쏙 닮은 스펠링 함정 '${selectedWrongWord}'(${trapMeaning})이(가) 들어갔다냥! 맛이 살짝 알쏭달쏭해요냥~ 😿”`,
          reviewTitle: `냥냥이의 시무룩한 리뷰: “스펠링 함정에 깜빡 속으셨어요냥!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] 단어 '${selectedWrongWord}'은(는) '${correct}'와 철자가 비슷하지만 뜻이 전혀 다른 함정 단어입니다! (${trapMeaning})`,
          reactionEmoji: '😿',
          isTrap: true,
        };

      case 'bear':
        return {
          customerQuote: `“어라라? '${targetMeaning}'(${correct}) 대신 철자가 헷갈리는 함정 단어 '${selectedWrongWord}'(${trapMeaning})을(를) 넣으셨네요! 곰돌이가 기대했던 달콤한 맛이 아니에요, 흑흑! 🐻💦”`,
          reviewTitle: `곰돌이의 아쉬운 표정: “닮은꼴 철자에 속으셨군요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] 정답 '${correct}'(${targetMeaning}) 대신 교묘한 함정 단어 '${selectedWrongWord}'(${trapMeaning})을(를) 선택했습니다.`,
          reactionEmoji: '🐻',
          isTrap: true,
        };

      case 'rabbit':
        return {
          customerQuote: `“앗! 셰프님! '${targetMeaning}'(${correct})을(를) 부탁드렸는데 닮은꼴 철자인 '${selectedWrongWord}'(${trapMeaning})이(가) 쏙 들어갔어요! 신선한 맛이 살짝 어색해졌어요! 🐰💧”`,
          reviewTitle: `토끼 학생의 갸우뚱 리뷰: “철자가 살짝 헷갈리셨나 봐요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] '${correct}'와(과) '${selectedWrongWord}'은(는) 시험에 가장 자주 나오는 철자 혼동 어휘예요. (${trapMeaning})`,
          reactionEmoji: '🐰',
          isTrap: true,
        };

      case 'dog':
        return {
          customerQuote: `“컹컹! '${targetMeaning}'(${correct}) 자리에 스펠링이 비슷한 '${selectedWrongWord}'(${trapMeaning})이(가) 쏙 들어가다니! 철자 함정에 깜빡 속으셨군요, 셰프님! 🐶”`,
          reviewTitle: `멍멍 단골손님의 아쉬운 한마디: “함정 단어를 조심하세요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] 헷갈리는 함정 단어 '${selectedWrongWord}'(${trapMeaning}) 대신 올바른 스펠링 '${correct}'을(를) 기억하세요!`,
          reactionEmoji: '🐶',
          isTrap: true,
        };

      case 'fox':
        return {
          customerQuote: `“흠! '${targetMeaning}'의 진짜 철자는 '${correct}'인데, 유사한 '${selectedWrongWord}'(${trapMeaning})에 살짝 낚이셨군요. 다음엔 스펠링을 잘 비교해보세요! 🦊✨”`,
          reviewTitle: `여우 교수님의 조언: “함정 철자를 다시 확인해볼까요?”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] '${selectedWrongWord}'은(는) 스펠링 착각을 유도하는 대표적인 트랩 어휘입니다. (${trapMeaning})`,
          reactionEmoji: '🦊',
          isTrap: true,
        };

      case 'panda':
        return {
          customerQuote: `“어라? 깔끔한 맛을 기대했는데 '${targetMeaning}'(${correct}) 대신 철자가 비슷한 '${selectedWrongWord}'(${trapMeaning})이(가) 씹혀요! 맛이 조금 이상해요! 🐼”`,
          reviewTitle: `판다 선배의 머쓱한 후기: “스펠링 함정에 걸리셨군요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] '${selectedWrongWord}'은(는) '${targetMeaning}'이(가) 아니라 '${trapMeaning}'을(를) 의미합니다.`,
          reactionEmoji: '🐼',
          isTrap: true,
        };

      case 'penguin':
        return {
          customerQuote: `“솔직하게 말씀드릴게요. '${targetMeaning}'의 정답 단어인 '${correct}' 대신 함정 철자인 '${selectedWrongWord}'(${trapMeaning})이(가) 들어가서 식감이 어색해졌어요. 🐧”`,
          reviewTitle: `펭귄 요리평론가의 평가: “올바른 철자를 챙겨주세요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] 헷갈리기 쉬운 '${selectedWrongWord}'(${trapMeaning})에 주의하고, 정답 철자 '${correct}'을(를) 챙기세요.`,
          reactionEmoji: '🐧',
          isTrap: true,
        };

      case 'koala':
      default:
        return {
          customerQuote: `“깜짝 놀라 눈이 동그래졌어요! '${targetMeaning}'(${correct}) 요리에 왜 닮은 철자인 '${selectedWrongWord}'(${trapMeaning})이(가) 들어갔을까요? 셰프님, 진짜 정답을 찾아주세요! 🐨”`,
          reviewTitle: `${name}의 당황한 한마디: “스펠링 함정에 쏙 빠지셨어요!”`,
          specificExplanation: `⚠️ [스펠링 함정 주의] '${selectedWrongWord}'은(는) ${trapMeaning}의 뜻을 가진 스펠링 함정입니다.`,
          reactionEmoji: '🐨',
          isTrap: true,
        };
    }
  }

  // =========================================================================
  // 2. When the user chose a REGULAR DISTRACTOR card (NON-TRAP)
  // Strictly matched to the chosen wrong word and its specific meaning,
  // without any mention of the trap card.
  // =========================================================================
  switch (animal) {
    case 'cat':
      return {
        customerQuote: `“냥? 셰프님! 저는 '${targetMeaning}'(${correct}) 재료를 주문했는데, '${ingredientName}'에 엉뚱한 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 들어갔다냥! 맛이 완전히 다르다냥~ 😿”`,
        reviewTitle: `냥냥이의 시무룩한 리뷰: “'${selectedWrongWord}'은(는) 제가 주문한 재료가 아니에요냥!”`,
        specificExplanation: `❌ [일반 오답] 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'의 뜻입니다. 손님이 주문한 '${targetMeaning}'의 정답은 '${correct}'입니다.`,
        reactionEmoji: '😿',
        isTrap: false,
      };

    case 'bear':
      return {
        customerQuote: `“으앙! 제가 주문한 건 '${targetMeaning}'(${correct})인데, 엉뚱한 재료 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})을(를) 넣으시면 어떡해요! 곰돌이가 기대한 맛이 아니에요! 🐻💦”`,
        reviewTitle: `곰돌이의 아쉬운 표정: “'${selectedWrongWord}' 대신 '${correct}'을(를) 넣어주세요!”`,
        specificExplanation: `❌ [일반 오답] '${selectedWrongWord}'은(는) '${chosenWordMeaning}'(으)로, 주문하신 '${targetMeaning}'(정답: ${correct})과(와) 다른 단어입니다.`,
        reactionEmoji: '🐻',
        isTrap: false,
      };

    case 'rabbit':
      return {
        customerQuote: `“어라? 셰프님! 주문서의 '${targetMeaning}'(${correct}) 대신 다른 단어인 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 쏙 들어갔어요! 신선한 재료를 다시 확인해주세요! 🐰💧”`,
        reviewTitle: `토끼 학생의 갸우뚱 후기: “다른 재료인 '${selectedWrongWord}'이(가) 들어갔어요!”`,
        specificExplanation: `❌ [일반 오답] '${targetMeaning}'을(를) 뜻하는 올바른 영어 단어는 '${correct}'입니다. 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'의 뜻입니다.`,
        reactionEmoji: '🐰',
        isTrap: false,
      };

    case 'dog':
      return {
        customerQuote: `“컹컹! 셰프님, 주문하신 '${targetMeaning}'(${correct}) 자리에 전혀 다른 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 들어갔어요! 진짜 재료를 골라주세요! 🐶”`,
        reviewTitle: `멍멍 단골손님의 리뷰: “'${selectedWrongWord}'은(는) 주문한 재료가 아니에요!”`,
        specificExplanation: `❌ [일반 오답] '${targetMeaning}'은(는) 영어로 '${correct}'입니다. 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'의 의미를 갖습니다.`,
        reactionEmoji: '🐶',
        isTrap: false,
      };

    case 'fox':
      return {
        customerQuote: `“이런 이런, 주문서의 '${targetMeaning}'(${correct})을(를) 놓치고 다른 어휘인 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})을(를) 고르셨군요. 단어의 의미를 차근차근 비교해보세요! 🦊”`,
        reviewTitle: `여우 교수님의 조언: “'${selectedWrongWord}'(뜻: ${chosenWordMeaning})은(는) 오답입니다!”`,
        specificExplanation: `❌ [일반 오답] '${targetMeaning}'을(를) 나타내는 정확한 단어는 '${correct}'입니다. '${selectedWrongWord}'은(는) '${chosenWordMeaning}'을(를) 뜻합니다.`,
        reactionEmoji: '🦊',
        isTrap: false,
      };

    case 'panda':
      return {
        customerQuote: `“어라? 제가 주문한 건 '${targetMeaning}'(${correct})인데, 다른 재료 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 접시에 올라왔어요! 맛이 너무 낯설어요! 🐼”`,
        reviewTitle: `판다 선배의 아쉬운 후기: “제가 주문한 재료가 아니에요!”`,
        specificExplanation: `❌ [일반 오답] 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'의 뜻입니다. 올바른 정답 '${correct}'(${targetMeaning})을(를) 확인하세요.`,
        reactionEmoji: '🐼',
        isTrap: false,
      };

    case 'penguin':
      return {
        customerQuote: `“솔직하게 말씀드리면, 주문한 '${targetMeaning}'(${correct}) 대신 전혀 다른 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 들어가서 요리의 조화가 깨졌어요. 🐧”`,
        reviewTitle: `펭귄 요리평론가의 평가: “'${selectedWrongWord}'은(는) 주문과 완전히 무관합니다.”`,
        specificExplanation: `❌ [일반 오답] '${targetMeaning}'의 정답 영어 단어는 '${correct}'입니다. 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'입니다.`,
        reactionEmoji: '🐧',
        isTrap: false,
      };

    case 'koala':
    default:
      return {
        customerQuote: `“깜짝이야! 주문서의 '${targetMeaning}'(${correct}) 대신 엉뚱한 '${selectedWrongWord}'(뜻: ${chosenWordMeaning})이(가) 들어갔어요! 올바른 정답 재료를 찾아주세요! 🐨”`,
        reviewTitle: `${name}의 시무룩한 후기: “주문한 재료가 아니에요...”`,
        specificExplanation: `❌ [일반 오답] 선택하신 '${selectedWrongWord}'은(는) '${chosenWordMeaning}'(으)로, 정답 '${correct}'(${targetMeaning})과(와) 다른 단어입니다.`,
        reactionEmoji: '😕',
        isTrap: false,
      };
  }
}

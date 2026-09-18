import { VocabWord, CustomerProfile } from '../types';

export const VOCABULARY_LIST: VocabWord[] = [
  // Semester 1 Essential Words
  {
    id: 'sem1_01',
    koreanMeaning: '사막',
    correctWord: 'desert',
    trapWord: 'dessert',
    trapMeaning: 'dessert 는 s가 2개인 "디저트, 후식"이에요! 사막은 s가 1개인 desert!',
    phonetic: '/ˈdez.ət/',
    distractors: ['dinner', 'forest', 'island'],
    semester: 'semester1',
    hintSentence: 'Camels can survive in the dry ___.',
    category: '자연과 지리'
  },
  {
    id: 'sem1_02',
    koreanMeaning: '일기',
    correctWord: 'diary',
    trapWord: 'dairy',
    trapMeaning: 'dairy 는 우유/치즈 같은 "유제품"이에요! 일기는 dia로 시작하는 diary!',
    phonetic: '/ˈdaɪə.ri/',
    distractors: ['daily', 'letter', 'novel'],
    semester: 'semester1',
    hintSentence: 'I write my thoughts in my ___ every night.',
    category: '학교와 일상'
  },
  {
    id: 'sem1_03',
    koreanMeaning: '조용한',
    correctWord: 'quiet',
    trapWord: 'quite',
    trapMeaning: 'quite 는 "꽤, 상당히"라는 부사예요! 조용한은 et로 끝나는 quiet!',
    phonetic: '/ˈkwaɪ.ət/',
    distractors: ['quick', 'silent', 'loud'],
    semester: 'semester1',
    hintSentence: 'Please be ___ in the school library.',
    category: '성격과 태도'
  },
  {
    id: 'sem1_04',
    koreanMeaning: '메시지, 전갈',
    correctWord: 'message',
    trapWord: 'massage',
    trapMeaning: 'massage 는 몸을 주무르는 "마사지"예요! 전갈은 e가 들어간 message!',
    phonetic: '/ˈmes.ɪdʒ/',
    distractors: ['passage', 'memory', 'notice'],
    semester: 'semester1',
    hintSentence: 'Did you get my text ___ on your phone?',
    category: '대화와 통신'
  },
  {
    id: 'sem1_05',
    koreanMeaning: '잃어버리다, 지다',
    correctWord: 'lose',
    trapWord: 'loose',
    trapMeaning: 'loose 는 o가 2개로 "헐거운, 헐렁한" 옷이에요! 잃어버리다는 o 1개 lose!',
    phonetic: '/luːz/',
    distractors: ['look', 'miss', 'find'],
    semester: 'semester1',
    hintSentence: 'Be careful not to ___ your house key.',
    category: '일상 동작'
  },
  {
    id: 'sem1_06',
    koreanMeaning: '숨쉬다, 호흡하다',
    correctWord: 'breathe',
    trapWord: 'breath',
    trapMeaning: 'breath (e 없음)는 명사 "숨, 호흡"이고, breathe (e 있음)는 동사 "숨쉬다"예요!',
    phonetic: '/briːð/',
    distractors: ['branch', 'bright', 'blow'],
    semester: 'semester1',
    hintSentence: 'It is important to ___ deeply when you are nervous.',
    category: '신체와 건강'
  },
  {
    id: 'sem1_07',
    koreanMeaning: '조언, 충고 (명사)',
    correctWord: 'advice',
    trapWord: 'advise',
    trapMeaning: 'advise (s)는 동사 "조언하다", advice (c)는 명사 "조언, 충고"예요!',
    phonetic: '/ədˈvaɪs/',
    distractors: ['advance', 'device', 'voice'],
    semester: 'semester1',
    hintSentence: 'My teacher gave me great ___ for the exam.',
    category: '학교와 소통'
  },
  {
    id: 'sem1_08',
    koreanMeaning: '날씨',
    correctWord: 'weather',
    trapWord: 'whether',
    trapMeaning: 'whether 는 "~인지 아닌지" 접속사예요! 비/바람/하늘 날씨는 weather!',
    phonetic: '/ˈweð.ər/',
    distractors: ['feather', 'winter', 'season'],
    semester: 'semester1',
    hintSentence: 'The ___ is sunny and warm today.',
    category: '날씨와 계절'
  },
  {
    id: 'sem1_09',
    koreanMeaning: '천사',
    correctWord: 'angel',
    trapWord: 'angle',
    trapMeaning: 'angle 은 수학의 "각도, 모서리"예요! 날개 달린 천사는 gel로 끝나는 angel!',
    phonetic: '/ˈeɪn.dʒəl/',
    distractors: ['agent', 'ankle', 'giant'],
    semester: 'semester1',
    hintSentence: 'She has a heart like a kind ___.',
    category: '이야기와 인물'
  },
  {
    id: 'sem1_10',
    koreanMeaning: '궁금해하다, 놀라움',
    correctWord: 'wonder',
    trapWord: 'wander',
    trapMeaning: 'wander (a)는 "이리저리 돌아다니다, 방황하다"예요! 궁금해하다는 wonder (o)!',
    phonetic: '/ˈwʌn.dər/',
    distractors: ['winner', 'ponder', 'winter'],
    semester: 'semester1',
    hintSentence: 'I ___ why the sky looks so blue today.',
    category: '생각과 감정'
  },
  {
    id: 'sem1_11',
    koreanMeaning: '영수증',
    correctWord: 'receipt',
    trapWord: 'recipe',
    trapMeaning: 'recipe 는 "요리법"이에요! 물건 사고 받는 영수증은 p가 묵음인 receipt!',
    phonetic: '/rɪˈsiːt/',
    distractors: ['repeat', 'ticket', 'report'],
    semester: 'semester1',
    hintSentence: 'Keep your store ___ if you want to exchange the shirt.',
    category: '쇼핑과 생활'
  },
  {
    id: 'sem1_12',
    koreanMeaning: '맞는, 올바른',
    correctWord: 'correct',
    trapWord: 'collect',
    trapMeaning: 'collect 는 "수집하다, 모으다"예요! 정답이나 올바른 것은 r이 들어간 correct!',
    phonetic: '/kəˈrekt/',
    distractors: ['connect', 'current', 'direct'],
    semester: 'semester1',
    hintSentence: 'Check your worksheet to make sure the answer is ___.',
    category: '학습과 평가'
  },
  {
    id: 'sem1_13',
    koreanMeaning: '보호하다, 지키다',
    correctWord: 'protect',
    trapWord: 'project',
    trapMeaning: 'project 는 과제/계획이에요! 위험으로부터 지키는 것은 protect!',
    phonetic: '/prəˈtekt/',
    distractors: ['predict', 'prevent', 'produce'],
    semester: 'semester1',
    hintSentence: 'We must ___ endangered wild animals.',
    category: '사회와 환경'
  },
  {
    id: 'sem1_14',
    koreanMeaning: '발명하다',
    correctWord: 'invent',
    trapWord: 'invite',
    trapMeaning: 'invite 는 파티에 "초대하다"예요! 새로운 기계를 발명하는 것은 invent!',
    phonetic: '/ɪnˈvent/',
    distractors: ['invest', 'intent', 'inform'],
    semester: 'semester1',
    hintSentence: 'Edison helped ___ many useful electric devices.',
    category: '과학과 역사'
  },
  {
    id: 'sem1_15',
    koreanMeaning: '초대하다',
    correctWord: 'invite',
    trapWord: 'invent',
    trapMeaning: 'invent 는 "발명하다"예요! 생일파티 등에 부르는 것은 invite!',
    phonetic: '/ɪnˈvaɪt/',
    distractors: ['inside', 'invent', 'involve'],
    semester: 'semester1',
    hintSentence: 'I want to ___ all my classmates to my birthday party.',
    category: '친구와 일상'
  },
  {
    id: 'sem1_16',
    koreanMeaning: '연습하다, 실천',
    correctWord: 'practice',
    trapWord: 'practical',
    trapMeaning: 'practical 은 "실용적인" 형용사예요! 악기나 운동을 연습하는 것은 practice!',
    phonetic: '/ˈpræk.tɪs/',
    distractors: ['patient', 'promise', 'produce'],
    semester: 'semester1',
    hintSentence: '___ makes perfect when learning the violin.',
    category: '취미와 특기'
  },

  // Semester 2 Essential Words
  {
    id: 'sem2_01',
    koreanMeaning: '~을 제외하고',
    correctWord: 'except',
    trapWord: 'accept',
    trapMeaning: 'accept 는 "수락하다, 받아들이다"예요! 누구를 제외할 때는 ex-로 시작하는 except!',
    phonetic: '/ɪkˈsept/',
    distractors: ['expect', 'expert', 'expand'],
    semester: 'semester2',
    hintSentence: 'Everyone was present in class ___ Minho.',
    category: '문법과 표현'
  },
  {
    id: 'sem2_02',
    koreanMeaning: '받아들이다, 수락하다',
    correctWord: 'accept',
    trapWord: 'except',
    trapMeaning: 'except 는 "~을 빼고"이고, 선물이나 사과를 받아들이는 것은 accept!',
    phonetic: '/əkˈsept/',
    distractors: ['access', 'accent', 'affect'],
    semester: 'semester2',
    hintSentence: 'She was happy to ___ the grand cooking award.',
    category: '태도와 관계'
  },
  {
    id: 'sem2_03',
    koreanMeaning: '영향을 미치다 (동사)',
    correctWord: 'affect',
    trapWord: 'effect',
    trapMeaning: 'effect (e)는 주로 명사 "영향, 효과", affect (a)는 동사 "영향을 미치다"예요!',
    phonetic: '/əˈfekt/',
    distractors: ['afford', 'attack', 'appear'],
    semester: 'semester2',
    hintSentence: 'Bad sleep habits can seriously ___ your grades.',
    category: '원인과 결과'
  },
  {
    id: 'sem2_04',
    koreanMeaning: '영향, 효과 (명사)',
    correctWord: 'effect',
    trapWord: 'affect',
    trapMeaning: 'affect (a)는 동사 "영향을 주다", effect (e)는 명사 "결과, 효과"예요!',
    phonetic: '/ɪˈfekt/',
    distractors: ['effort', 'expert', 'escape'],
    semester: 'semester2',
    hintSentence: 'Regular exercise has a positive ___ on your mood.',
    category: '원인과 결과'
  },
  {
    id: 'sem2_05',
    koreanMeaning: '관습, 풍습',
    correctWord: 'custom',
    trapWord: 'costume',
    trapMeaning: 'costume 은 할로윈 분장 "의상, 복장"이에요! 나라의 문화적 전통/관습은 custom!',
    phonetic: '/ˈkʌs.təm/',
    distractors: ['customer', 'comfort', 'culture'],
    semester: 'semester2',
    hintSentence: 'Bowing to elders is a traditional Korean ___.',
    category: '문화와 세계'
  },
  {
    id: 'sem2_06',
    koreanMeaning: '의상, 복장 (분장용)',
    correctWord: 'costume',
    trapWord: 'custom',
    trapMeaning: 'custom 은 "관습"이에요! 파티나 연극에서 입는 특별한 옷은 costume!',
    phonetic: '/ˈkɒs.tjuːm/',
    distractors: ['cotton', 'cousin', 'clothes'],
    semester: 'semester2',
    hintSentence: 'He wore an awesome chef ___ for the school festival.',
    category: '축제와 예술'
  },
  {
    id: 'sem2_07',
    koreanMeaning: '성공하다',
    correctWord: 'succeed',
    trapWord: 'proceed',
    trapMeaning: 'proceed 는 "앞으로 진행하다"예요! 목표를 이루어 성공하는 것은 succeed!',
    phonetic: '/səkˈsiːd/',
    distractors: ['support', 'suggest', 'survive'],
    semester: 'semester2',
    hintSentence: 'If you keep trying hard, you will surely ___.',
    category: '도전과 진로'
  },
  {
    id: 'sem2_08',
    koreanMeaning: '개인적인, 사적인',
    correctWord: 'personal',
    trapWord: 'personnel',
    trapMeaning: 'personnel 은 회사의 "인사부, 직원들"이에요! 개인적인 비밀은 personal!',
    phonetic: '/ˈpɜː.sən.əl/',
    distractors: ['person', 'period', 'percent'],
    semester: 'semester2',
    hintSentence: 'Never share your ___ password with strangers online.',
    category: '정보와 안전'
  },
  {
    id: 'sem2_09',
    koreanMeaning: '교장 선생님, 주요한',
    correctWord: 'principal',
    trapWord: 'principle',
    trapMeaning: 'principle (le)은 도덕적 "원리, 원칙"! 학교 교장 선생님은 pal(친구)이 들어간 principal!',
    phonetic: '/ˈprɪn.sə.pəl/',
    distractors: ['prince', 'private', 'primary'],
    semester: 'semester2',
    hintSentence: 'Our middle school ___ welcomed all new students.',
    category: '학교 구성원'
  },
  {
    id: 'sem2_10',
    koreanMeaning: '적응하다, 맞추다',
    correctWord: 'adapt',
    trapWord: 'adopt',
    trapMeaning: 'adopt (o)는 아기나 반려동물을 "입양하다"예요! 새로운 환경에 적응하는 것은 adapt (a)!',
    phonetic: '/əˈdæpt/',
    distractors: ['admit', 'adult', 'advice'],
    semester: 'semester2',
    hintSentence: 'It takes time to ___ to a new middle school semester.',
    category: '변화와 성장'
  },
  {
    id: 'sem2_11',
    koreanMeaning: '입양하다, 채택하다',
    correctWord: 'adopt',
    trapWord: 'adapt',
    trapMeaning: 'adapt (a)는 "적응하다"예요! 유기견을 새 가족으로 입양하는 것은 adopt (o)!',
    phonetic: '/əˈdɒpt/',
    distractors: ['adore', 'admit', 'adjust'],
    semester: 'semester2',
    hintSentence: 'Our family decided to ___ a rescue puppy from the shelter.',
    category: '가족과 동물'
  },
  {
    id: 'sem2_12',
    koreanMeaning: '편리한',
    correctWord: 'convenient',
    trapWord: 'confident',
    trapMeaning: 'confident 는 "자신감 있는"이에요! 쓰기 편하고 가까운 것은 convenient!',
    phonetic: '/kənˈviː.ni.ənt/',
    distractors: ['constant', 'continue', 'comfort'],
    semester: 'semester2',
    hintSentence: 'Online shopping is very fast and ___.',
    category: '생활과 기술'
  },
  {
    id: 'sem2_13',
    koreanMeaning: '존경하다, 존중하다',
    correctWord: 'respect',
    trapWord: 'suspect',
    trapMeaning: 'suspect 는 범인으로 "의심하다"예요! 어른이나 친구를 공경하는 것은 respect!',
    phonetic: '/rɪˈspekt/',
    distractors: ['repeat', 'reflect', 'remind'],
    semester: 'semester2',
    hintSentence: 'We should listen carefully and ___ each other’s opinions.',
    category: '인성과 예절'
  },
  {
    id: 'sem2_14',
    koreanMeaning: '인내심 있는, 환자',
    correctWord: 'patient',
    trapWord: 'parent',
    trapMeaning: 'parent 는 "부모님"이에요! 참고 기다릴 줄 아는 것은 t가 들어간 patient!',
    phonetic: '/ˈpeɪ.ʃənt/',
    distractors: ['polite', 'silent', 'patent'],
    semester: 'semester2',
    hintSentence: 'Cooking delicious soup requires you to be very ___.',
    category: '성격과 요리'
  },
  {
    id: 'sem2_15',
    koreanMeaning: '문구류 (필기구)',
    correctWord: 'stationery',
    trapWord: 'stationary',
    trapMeaning: 'stationary (a)는 "정지한, 움직이지 않는"이에요! 지우개/연필(Eraser, Pen)의 e가 들어간 stationery!',
    phonetic: '/ˈsteɪ.ʃən.ər.i/',
    distractors: ['station', 'stapler', 'statement'],
    semester: 'semester2',
    hintSentence: 'I bought notebooks and cute pens at the school ___ store.',
    category: '학용품'
  },
  {
    id: 'sem2_16',
    koreanMeaning: '칭찬하다, 찬사',
    correctWord: 'compliment',
    trapWord: 'complement',
    trapMeaning: 'complement (e)는 "보완하다"예요! I like you의 i가 들어간 compliment 는 "칭찬하다"!',
    phonetic: '/ˈkɒm.plɪ.mənt/',
    distractors: ['complete', 'complex', 'complain'],
    semester: 'semester2',
    hintSentence: 'The customer gave the young chef a sweet ___.',
    category: '대화와 표현'
  }
];

// Restaurant customer profiles
export const CUSTOMER_PROFILES: CustomerProfile[] = [
  {
    id: 'c_cat',
    name: '야옹 미식가',
    animalType: 'cat',
    foodPreference: '연어 파스타',
    colorScheme: { primary: '#F97316', accent: '#FED7AA', bg: '#FFF7ED' }
  },
  {
    id: 'c_bear',
    name: '배고픈 곰돌이',
    animalType: 'bear',
    foodPreference: '허니 팬케이크',
    colorScheme: { primary: '#854D0E', accent: '#FEF08A', bg: '#FEFCE8' }
  },
  {
    id: 'c_rabbit',
    name: '토끼 학생',
    animalType: 'rabbit',
    foodPreference: '당근 수프',
    colorScheme: { primary: '#EC4899', accent: '#FBCFE8', bg: '#FDF2F8' }
  },
  {
    id: 'c_dog',
    name: '멍멍 단골손님',
    animalType: 'dog',
    foodPreference: '치즈 버거',
    colorScheme: { primary: '#0284C7', accent: '#BAE6FD', bg: '#F0F9FF' }
  },
  {
    id: 'c_fox',
    name: '여우 교수님',
    animalType: 'fox',
    foodPreference: '스파이시 피자',
    colorScheme: { primary: '#EA580C', accent: '#FFEDD5', bg: '#FFF7ED' }
  },
  {
    id: 'c_panda',
    name: '판다 선배',
    animalType: 'panda',
    foodPreference: '대나무 샐러드',
    colorScheme: { primary: '#15803D', accent: '#BBF7D0', bg: '#F0FDF4' }
  },
  {
    id: 'c_penguin',
    name: '펭귄 요리평론가',
    animalType: 'penguin',
    foodPreference: '아이스 디저트',
    colorScheme: { primary: '#4F46E5', accent: '#C7D2FE', bg: '#EEF2FF' }
  },
  {
    id: 'c_koala',
    name: '코알라 매니저',
    animalType: 'koala',
    foodPreference: '유칼립투스 티',
    colorScheme: { primary: '#0D9488', accent: '#99F6E4', bg: '#F0FDFA' }
  }
];

export const INGREDIENT_STYLES = [
  { emoji: '🧀', name: '치즈 슬라이스', color: 'from-amber-100 to-amber-200 border-amber-300 text-amber-900' },
  { emoji: '🍅', name: '토마토 가니쉬', color: 'from-rose-100 to-rose-200 border-rose-300 text-rose-900' },
  { emoji: '🥬', name: '신선한 양상추', color: 'from-emerald-100 to-emerald-200 border-emerald-300 text-emerald-900' },
  { emoji: '🥩', name: '특선 스테이크', color: 'from-orange-100 to-orange-200 border-orange-300 text-orange-900' },
  { emoji: '🧂', name: '비법 양념스프', color: 'from-sky-100 to-sky-200 border-sky-300 text-sky-900' }
];

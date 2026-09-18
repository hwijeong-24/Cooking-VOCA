export interface DishInfo {
  name: string;
  englishName: string;
  imageUrl: string;
  badgeEmoji: string;
  description: string;
}

export const DISH_CATALOG: Record<string, DishInfo> = {
  '연어 파스타': {
    name: '연어 파스타',
    englishName: 'Creamy Salmon Pasta',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🍝',
    description: '노릇하게 구운 생연어와 진하고 고소한 크림소스가 어우러진 특선 파스타'
  },
  '허니 팬케이크': {
    name: '허니 팬케이크',
    englishName: 'Golden Honey Pancakes',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🥞',
    description: '달콤한 천연 벌꿀과 신선한 버터가 부드럽게 스며든 푹신한 수플레 팬케이크'
  },
  '당근 수프': {
    name: '당근 수프',
    englishName: 'Sweet Carrot Potage',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🥣',
    description: '유기농 단당근과 부드러운 생크림을 은은하게 끓여낸 마음까지 따뜻해지는 힐링 수프'
  },
  '치즈 버거': {
    name: '치즈 버거',
    englishName: 'Double Cheddar Burger',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🍔',
    description: '불향 가득한 순소고기 패티와 듬뿍 녹아내린 체다 치즈가 환상적인 수제 버거'
  },
  '스파이시 피자': {
    name: '스파이시 피자',
    englishName: 'Fire Pepperoni Pizza',
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🍕',
    description: '매콤한 페페로니와 신선한 모짜렐라 치즈를 화덕에서 노릇노릇 구워낸 피자'
  },
  '대나무 샐러드': {
    name: '대나무 샐러드',
    englishName: 'Fresh Bamboo Shoot Salad',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🥗',
    description: '아삭한 죽순과 신선한 채소에 고소한 참깨 드레싱을 곁들인 청량한 그린 샐러드'
  },
  '아이스 디저트': {
    name: '아이스 디저트',
    englishName: 'Berry Gelato Parfait',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🍨',
    description: '달콤한 산딸기, 블루베리와 부드러운 바닐라 아이스크림이 층층이 쌓인 시원한 디저트'
  },
  '유칼립투스 티': {
    name: '유칼립투스 티',
    englishName: 'Aromatic Herbal Tea',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    badgeEmoji: '🍵',
    description: '은은한 허브 잎과 청량한 민트향이 심신을 맑게 가꿔주는 따스한 블렌딩 티'
  }
};

export const DEFAULT_DISH: DishInfo = {
  name: '스페셜 요리',
  englishName: 'Chef Special Dish',
  imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
  badgeEmoji: '🍽️',
  description: '셰프님의 정성과 신선한 영단어 재료로 정갈하게 완성된 오늘의 특선 메뉴'
};

export function getDishInfo(dishName: string): DishInfo {
  return DISH_CATALOG[dishName] || {
    ...DEFAULT_DISH,
    name: dishName
  };
}

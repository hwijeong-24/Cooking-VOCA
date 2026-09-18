import React from 'react';

interface DishIllustrationProps {
  dishName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DishIllustration: React.FC<DishIllustrationProps> = ({
  dishName,
  className = '',
  size = 'md'
}) => {
  const dimensionClass = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48 sm:w-56 sm:h-56',
    lg: 'w-64 h-64 sm:w-72 sm:h-72'
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${dimensionClass} ${className}`}
      id={`dish-illu-${dishName.replace(/\s+/g, '-')}`}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        {/* Drop shadow underneath plate */}
        <ellipse cx="80" cy="142" rx="60" ry="10" fill="#00000020" />

        {/* 1. 연어 파스타 (Salmon Cream Pasta) */}
        {dishName.includes('파스타') && (
          <g>
            {/* Ceramic Plate */}
            <ellipse cx="80" cy="115" rx="66" ry="24" fill="#f8fafc" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="112" rx="52" ry="18" fill="#fef3c7" stroke="#451a03" strokeWidth="2.5" />

            {/* Pasta swirl base */}
            <ellipse cx="80" cy="98" rx="42" ry="22" fill="#fde047" stroke="#451a03" strokeWidth="3" />
            <path
              d="M 50,96 C 60,82 72,112 82,92 C 92,76 108,104 112,94"
              fill="none"
              stroke="#eab308"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 58,104 C 68,90 84,116 94,98 C 100,88 106,102 108,102"
              fill="none"
              stroke="#ca8a04"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Cream Sauce pooling */}
            <ellipse cx="80" cy="100" rx="30" ry="12" fill="#fef9c3" opacity="0.8" />

            {/* Grilled Salmon Cutlets */}
            <g transform="translate(62, 76) rotate(-8)">
              <rect x="0" y="0" width="34" height="20" rx="6" fill="#fb923c" stroke="#451a03" strokeWidth="3" />
              {/* Salmon meat lines */}
              <line x1="8" y1="3" x2="6" y2="17" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="17" y1="3" x2="15" y2="17" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="26" y1="3" x2="24" y2="17" stroke="#ffedd5" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Green Parsley Garnish */}
            <circle cx="82" cy="74" r="5" fill="#22c55e" stroke="#451a03" strokeWidth="2" />
            <circle cx="88" cy="73" r="4" fill="#16a34a" stroke="#451a03" strokeWidth="2" />
            <circle cx="84" cy="70" r="4" fill="#4ade80" stroke="#451a03" strokeWidth="2" />

            {/* Fork on the side */}
            <g transform="translate(126, 80) rotate(20)">
              <rect x="0" y="0" width="4" height="42" rx="2" fill="#94a3b8" stroke="#451a03" strokeWidth="2" />
              <path d="M -3,0 L 7,0 L 5,-12 L -1,-12 Z" fill="#cbd5e1" stroke="#451a03" strokeWidth="2" />
            </g>

            {/* Steam curves */}
            <path d="M 68,58 Q 72,46 68,36" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 82,52 Q 86,40 82,30" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 94,56 Q 98,44 94,34" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 2. 허니 팬케이크 (Honey Pancakes) */}
        {dishName.includes('팬케이크') && (
          <g>
            {/* Ceramic Plate */}
            <ellipse cx="80" cy="122" rx="66" ry="22" fill="#f8fafc" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="120" rx="52" ry="16" fill="#fed7aa" stroke="#451a03" strokeWidth="2.5" />

            {/* Pancake 1 (Bottom) */}
            <ellipse cx="80" cy="110" rx="46" ry="15" fill="#d97706" stroke="#451a03" strokeWidth="3" />
            <ellipse cx="80" cy="106" rx="46" ry="14" fill="#f59e0b" />

            {/* Pancake 2 (Middle) */}
            <ellipse cx="80" cy="95" rx="43" ry="14" fill="#d97706" stroke="#451a03" strokeWidth="3" />
            <ellipse cx="80" cy="91" rx="43" ry="13" fill="#fbbf24" />

            {/* Pancake 3 (Top) */}
            <ellipse cx="80" cy="79" rx="40" ry="13" fill="#d97706" stroke="#451a03" strokeWidth="3" />
            <ellipse cx="80" cy="75" rx="40" ry="12" fill="#fde68a" />

            {/* Dripping Amber Honey */}
            <path
              d="M 52,75 Q 56,88 60,88 Q 64,88 64,75 Q 74,74 78,98 Q 82,98 84,75 Q 94,74 98,86 Q 102,86 104,75"
              fill="#f59e0b"
              stroke="#451a03"
              strokeWidth="2.5"
            />
            {/* Honey Gloss Highlights */}
            <ellipse cx="78" cy="73" rx="18" ry="6" fill="#fef08a" opacity="0.8" />

            {/* Melting Butter Cube */}
            <g transform="translate(73, 56) rotate(6)">
              <polygon points="0,6 14,0 24,5 10,12" fill="#fef08a" stroke="#451a03" strokeWidth="2.5" />
              <polygon points="0,6 10,12 10,20 0,14" fill="#fde047" stroke="#451a03" strokeWidth="2.5" />
              <polygon points="10,12 24,5 24,14 10,20" fill="#eab308" stroke="#451a03" strokeWidth="2.5" />
            </g>

            {/* Sweet Blueberries on side */}
            <circle cx="50" cy="108" r="6" fill="#4338ca" stroke="#451a03" strokeWidth="2" />
            <circle cx="45" cy="112" r="5" fill="#3730a3" stroke="#451a03" strokeWidth="2" />
            <circle cx="112" cy="110" r="6" fill="#4338ca" stroke="#451a03" strokeWidth="2" />

            {/* Sparkles */}
            <polygon points="80,32 82,37 87,39 82,41 80,46 78,41 73,39 78,37" fill="#fbbf24" />
            <polygon points="118,52 119,55 122,56 119,57 118,60 117,57 114,56 117,55" fill="#fbbf24" />
          </g>
        )}

        {/* 3. 당근 수프 (Sweet Carrot Soup) */}
        {dishName.includes('수프') && (
          <g>
            {/* Saucer Plate */}
            <ellipse cx="80" cy="126" rx="60" ry="18" fill="#f1f5f9" stroke="#451a03" strokeWidth="3.5" />

            {/* Soup Bowl Base & Handles */}
            <ellipse cx="40" cy="90" rx="8" ry="14" fill="#fbcfe8" stroke="#451a03" strokeWidth="3" />
            <ellipse cx="120" cy="90" rx="8" ry="14" fill="#fbcfe8" stroke="#451a03" strokeWidth="3" />
            
            {/* Bowl Body */}
            <path
              d="M 46,78 Q 44,122 80,122 Q 116,122 114,78 Z"
              fill="#f472b6"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            {/* Bowl Rim */}
            <ellipse cx="80" cy="78" rx="36" ry="16" fill="#fb7185" stroke="#451a03" strokeWidth="3.5" />

            {/* Carrot Soup Surface */}
            <ellipse cx="80" cy="79" rx="32" ry="13" fill="#ea580c" stroke="#451a03" strokeWidth="2.5" />
            <ellipse cx="80" cy="79" rx="28" ry="10" fill="#f97316" />

            {/* Cream Swirl */}
            <path
              d="M 68,79 C 68,74 86,74 88,78 C 90,82 76,84 75,81 C 74,79 83,78 83,80"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Carrot slice garnish */}
            <g transform="translate(86, 75) rotate(15)">
              <circle cx="0" cy="0" r="5" fill="#f97316" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="3" fill="#fdba74" />
            </g>
            {/* Parsley flake */}
            <circle cx="73" cy="80" r="2.5" fill="#22c55e" stroke="#451a03" strokeWidth="1" />
            <circle cx="86" cy="82" r="2" fill="#16a34a" stroke="#451a03" strokeWidth="1" />

            {/* Steam curves */}
            <path d="M 72,55 Q 68,42 72,32" fill="none" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 88,52 Q 92,39 88,29" fill="none" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 4. 치즈 버거 (Double Cheese Burger) */}
        {dishName.includes('버거') && (
          <g>
            {/* Wooden Board */}
            <ellipse cx="80" cy="128" rx="66" ry="18" fill="#b45309" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="126" rx="62" ry="16" fill="#d97706" />

            {/* Bottom Bun */}
            <ellipse cx="80" cy="116" rx="42" ry="14" fill="#f59e0b" stroke="#451a03" strokeWidth="3.5" />

            {/* Juicy Beef Patty 1 */}
            <rect x="36" y="104" width="88" height="12" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="3.5" />

            {/* Melted Cheese (Drooping triangles) */}
            <polygon points="34,106 126,106 122,112 108,118 96,110 82,120 70,110 52,118 38,110" fill="#facc15" stroke="#451a03" strokeWidth="2.5" />

            {/* Juicy Beef Patty 2 */}
            <rect x="38" y="92" width="84" height="12" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="3.5" />

            {/* Tomato slice */}
            <rect x="42" y="86" width="76" height="8" rx="4" fill="#ef4444" stroke="#451a03" strokeWidth="3" />

            {/* Wavy Lettuce */}
            <path
              d="M 36,88 Q 44,94 52,86 Q 60,94 68,86 Q 76,94 84,86 Q 92,94 100,86 Q 108,94 116,86 Q 124,92 126,86"
              fill="#22c55e"
              stroke="#451a03"
              strokeWidth="3.5"
            />

            {/* Top Bun (Curved dome) */}
            <path
              d="M 38,86 C 38,44 122,44 122,86 Z"
              fill="#f59e0b"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            {/* Top Bun Highlight */}
            <ellipse cx="70" cy="56" rx="20" ry="7" fill="#fde68a" opacity="0.8" />

            {/* Sesame Seeds */}
            <ellipse cx="64" cy="62" rx="2.5" ry="1.5" fill="#fef3c7" stroke="#451a03" strokeWidth="1" transform="rotate(-15 64 62)" />
            <ellipse cx="80" cy="58" rx="2.5" ry="1.5" fill="#fef3c7" stroke="#451a03" strokeWidth="1" transform="rotate(20 80 58)" />
            <ellipse cx="94" cy="64" rx="2.5" ry="1.5" fill="#fef3c7" stroke="#451a03" strokeWidth="1" transform="rotate(-10 94 64)" />
            <ellipse cx="76" cy="70" rx="2.5" ry="1.5" fill="#fef3c7" stroke="#451a03" strokeWidth="1" transform="rotate(30 76 70)" />
            <ellipse cx="88" cy="74" rx="2.5" ry="1.5" fill="#fef3c7" stroke="#451a03" strokeWidth="1" transform="rotate(-25 88 74)" />
          </g>
        )}

        {/* 5. 스파이시 피자 (Spicy Pepperoni Pizza) */}
        {dishName.includes('피자') && (
          <g>
            {/* Pizza Pan */}
            <ellipse cx="80" cy="118" rx="64" ry="24" fill="#64748b" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="116" rx="60" ry="22" fill="#475569" />

            {/* Pizza Crust */}
            <ellipse cx="80" cy="112" rx="54" ry="20" fill="#d97706" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="110" rx="50" ry="18" fill="#f59e0b" />

            {/* Melted Mozzarella Cheese Surface */}
            <ellipse cx="80" cy="108" rx="44" ry="15" fill="#fef08a" stroke="#451a03" strokeWidth="2.5" />

            {/* Tomato Marinara Base Hints */}
            <path d="M 52,108 Q 62,115 74,106 Q 90,118 106,108" fill="none" stroke="#dc2626" strokeWidth="3" opacity="0.8" />

            {/* Pepperoni Slices */}
            <ellipse cx="64" cy="104" rx="9" ry="6" fill="#b91c1c" stroke="#451a03" strokeWidth="2" />
            <circle cx="62" cy="103" r="1.5" fill="#fca5a5" />
            
            <ellipse cx="94" cy="102" rx="9" ry="6" fill="#b91c1c" stroke="#451a03" strokeWidth="2" />
            <circle cx="93" cy="101" r="1.5" fill="#fca5a5" />

            <ellipse cx="78" cy="112" rx="10" ry="6" fill="#b91c1c" stroke="#451a03" strokeWidth="2" />
            <circle cx="77" cy="111" r="1.5" fill="#fca5a5" />

            <ellipse cx="79" cy="98" rx="8" ry="5" fill="#b91c1c" stroke="#451a03" strokeWidth="2" />

            {/* Green Basil & Spicy Chili Peppers */}
            <ellipse cx="68" cy="112" rx="4" ry="2" fill="#16a34a" stroke="#451a03" strokeWidth="1.5" transform="rotate(30 68 112)" />
            <ellipse cx="90" cy="110" rx="4" ry="2" fill="#16a34a" stroke="#451a03" strokeWidth="1.5" transform="rotate(-25 90 110)" />

            {/* Cute Cartoon Chili Pepper */}
            <g transform="translate(108, 62) rotate(15)">
              <path d="M 0,0 C 12,6 16,24 6,32 C 4,34 0,30 2,24 C 6,18 4,8 -2,4 Z" fill="#ef4444" stroke="#451a03" strokeWidth="2.5" />
              <path d="M -2,4 L -6,2" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Steam curves */}
            <path d="M 68,75 Q 72,62 68,52" fill="none" stroke="#fde047" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 86,72 Q 90,59 86,49" fill="none" stroke="#fde047" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        )}

        {/* 6. 대나무 샐러드 (Fresh Bamboo Salad) */}
        {dishName.includes('샐러드') && (
          <g>
            {/* Bamboo Wood Bowl */}
            <path
              d="M 36,86 C 36,132 124,132 124,86 Z"
              fill="#15803d"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            <ellipse cx="80" cy="86" rx="44" ry="16" fill="#166534" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="86" rx="40" ry="14" fill="#86efac" />

            {/* Salad Greens Mound */}
            <circle cx="62" cy="74" r="14" fill="#22c55e" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="82" cy="70" r="16" fill="#4ade80" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="98" cy="75" r="13" fill="#16a34a" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="78" cy="62" r="14" fill="#86efac" stroke="#451a03" strokeWidth="2.5" />

            {/* Bamboo Shoots (Crispy yellowish wedges) */}
            <polygon points="68,64 78,54 84,68" fill="#fef08a" stroke="#451a03" strokeWidth="2" />
            <polygon points="86,60 96,52 98,66" fill="#fef08a" stroke="#451a03" strokeWidth="2" />

            {/* Cucumber Coins */}
            <circle cx="58" cy="82" r="7" fill="#86efac" stroke="#451a03" strokeWidth="2" />
            <circle cx="58" cy="82" r="4" fill="#bbf7d0" />

            {/* Bright Red Cherry Tomatoes */}
            <circle cx="72" cy="76" r="7" fill="#ef4444" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="70" cy="74" r="2" fill="#fff" />
            <circle cx="92" cy="78" r="6" fill="#ef4444" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="90" cy="76" r="1.5" fill="#fff" />

            {/* Sesame Dressing Drops */}
            <circle cx="68" cy="68" r="2" fill="#fde68a" />
            <circle cx="82" cy="78" r="2" fill="#fde68a" />
            <circle cx="88" cy="64" r="2" fill="#fde68a" />
          </g>
        )}

        {/* 7. 아이스 디저트 (Berry Gelato Parfait) */}
        {dishName.includes('디저트') && (
          <g>
            {/* Glass Goblet Base & Stem */}
            <ellipse cx="80" cy="134" rx="28" ry="8" fill="#e0e7ff" stroke="#451a03" strokeWidth="3" />
            <rect x="76" y="106" width="8" height="28" rx="3" fill="#c7d2fe" stroke="#451a03" strokeWidth="3" />
            
            {/* Parfait Glass Cup */}
            <path
              d="M 50,68 C 50,110 110,110 110,68 Z"
              fill="#e0e7ff"
              stroke="#451a03"
              strokeWidth="3.5"
              opacity="0.85"
            />
            {/* Cup Rim */}
            <ellipse cx="80" cy="68" rx="30" ry="10" fill="#c7d2fe" stroke="#451a03" strokeWidth="3" />

            {/* Berry Sauce Swirl in glass */}
            <path d="M 58,82 Q 80,94 102,82" fill="none" stroke="#ec4899" strokeWidth="6" strokeLinecap="round" />

            {/* Vanilla & Strawberry Ice Cream Scoops */}
            <circle cx="68" cy="58" r="16" fill="#fdf4ff" stroke="#451a03" strokeWidth="3" />
            <circle cx="92" cy="56" r="16" fill="#f472b6" stroke="#451a03" strokeWidth="3" />
            <circle cx="80" cy="44" r="16" fill="#a78bfa" stroke="#451a03" strokeWidth="3" />

            {/* Dripping Chocolate/Berry Syrup */}
            <path d="M 74,40 Q 80,52 86,40" fill="none" stroke="#db2777" strokeWidth="4" strokeLinecap="round" />

            {/* Wafer Stick */}
            <g transform="translate(94, 18) rotate(32)">
              <rect x="0" y="0" width="8" height="46" rx="3" fill="#fed7aa" stroke="#451a03" strokeWidth="2.5" />
              <line x1="0" y1="10" x2="8" y2="15" stroke="#ea580c" strokeWidth="2" />
              <line x1="0" y1="22" x2="8" y2="27" stroke="#ea580c" strokeWidth="2" />
              <line x1="0" y1="34" x2="8" y2="39" stroke="#ea580c" strokeWidth="2" />
            </g>

            {/* Glossy Red Cherry on Top */}
            <circle cx="78" cy="28" r="7" fill="#dc2626" stroke="#451a03" strokeWidth="2.5" />
            <circle cx="76" cy="26" r="2" fill="#fff" />
            <path d="M 78,22 Q 88,14 86,6" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />

            {/* Sparkles */}
            <polygon points="50,38 52,42 56,43 52,45 50,49 48,45 44,43 48,42" fill="#f472b6" />
          </g>
        )}

        {/* 8. 유칼립투스 티 (Eucalyptus Herbal Tea) */}
        {(dishName.includes('티') || (!dishName.includes('파스타') && !dishName.includes('팬케이크') && !dishName.includes('수프') && !dishName.includes('버거') && !dishName.includes('피자') && !dishName.includes('샐러드') && !dishName.includes('디저트'))) && (
          <g>
            {/* Saucer */}
            <ellipse cx="80" cy="126" rx="58" ry="18" fill="#f1f5f9" stroke="#451a03" strokeWidth="3.5" />
            <ellipse cx="80" cy="124" rx="46" ry="14" fill="#ccfbf1" stroke="#451a03" strokeWidth="2.5" />

            {/* Cup Handle */}
            <path
              d="M 110,80 C 130,80 130,108 110,108"
              fill="none"
              stroke="#451a03"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Cup Body */}
            <path
              d="M 48,76 C 48,120 112,120 112,76 Z"
              fill="#99f6e4"
              stroke="#451a03"
              strokeWidth="3.5"
            />
            {/* Cup Rim */}
            <ellipse cx="80" cy="76" rx="32" ry="12" fill="#5eead4" stroke="#451a03" strokeWidth="3.5" />

            {/* Steaming Green Tea Liquid */}
            <ellipse cx="80" cy="77" rx="28" ry="10" fill="#0d9488" stroke="#451a03" strokeWidth="2.5" />
            <ellipse cx="80" cy="77" rx="24" ry="8" fill="#14b8a6" />

            {/* Floating Eucalyptus Leaf */}
            <g transform="translate(80, 77) rotate(-20)">
              <ellipse cx="0" cy="0" rx="8" ry="4" fill="#15803d" stroke="#451a03" strokeWidth="1.5" />
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#86efac" strokeWidth="1" />
            </g>

            {/* Sliced Lemon Wheel on Cup Rim */}
            <g transform="translate(50, 70) rotate(-35)">
              <circle cx="0" cy="0" r="10" fill="#facc15" stroke="#451a03" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="7" fill="#fef08a" />
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#facc15" strokeWidth="1.5" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#facc15" strokeWidth="1.5" />
            </g>

            {/* Aromatic Steam spirals */}
            <path d="M 72,55 Q 66,42 74,30" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 86,52 Q 94,38 86,26" fill="none" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};

import React from 'react';

interface ChefAvatarProps {
  className?: string;
  size?: 'md' | 'lg' | 'xl';
  expression?: 'confident' | 'celebrate' | 'thinking';
}

export const ChefAvatar: React.FC<ChefAvatarProps> = ({
  className = '',
  size = 'lg',
  expression = 'confident'
}) => {
  const dimensionClass = {
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-52 sm:h-52'
  }[size];

  return (
    <div className={`relative select-none flex items-center justify-center ${dimensionClass} ${className}`} id="chef-character">
      <svg viewBox="0 0 160 180" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Shadow */}
        <ellipse cx="80" cy="172" rx="55" ry="8" fill="#00000020" />

        {/* Chef Coat & Torso */}
        <path d="M42,120 Q80,116 118,120 L126,170 Q80,174 34,170 Z" fill="#f8fafc" stroke="#334155" strokeWidth="3.5" />
        
        {/* Double Breasted Coat Buttons */}
        <circle cx="68" cy="138" r="3.5" fill="#334155" />
        <circle cx="68" cy="154" r="3.5" fill="#334155" />
        <circle cx="92" cy="138" r="3.5" fill="#d97706" />
        <circle cx="92" cy="154" r="3.5" fill="#d97706" />

        {/* Red Neckerchief */}
        <path d="M60,116 Q80,126 100,116 L86,134 L80,140 L74,134 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />

        {/* Wooden Spoon held in Hand */}
        <g transform="translate(112, 90) rotate(22)">
          {/* Spoon handle */}
          <rect x="-3" y="10" width="7" height="60" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
          {/* Spoon bowl */}
          <ellipse cx="0.5" cy="8" rx="11" ry="16" fill="#d97706" stroke="#78350f" strokeWidth="2" />
          {/* Hand clasping */}
          <ellipse cx="0" cy="40" rx="8" ry="8" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
        </g>

        {/* Head Base */}
        <circle cx="80" cy="88" r="38" fill="#ffedd5" stroke="#451a03" strokeWidth="3.5" />

        {/* Rosy Cheeks */}
        <circle cx="56" cy="94" r="7" fill="#f43f5e" opacity="0.4" />
        <circle cx="104" cy="94" r="7" fill="#f43f5e" opacity="0.4" />

        {/* Ears */}
        <circle cx="42" cy="88" r="7" fill="#ffedd5" stroke="#451a03" strokeWidth="2.5" />
        <circle cx="118" cy="88" r="7" fill="#ffedd5" stroke="#451a03" strokeWidth="2.5" />

        {/* Facial Expression */}
        {expression === 'confident' && (
          <g>
            {/* Winking right eye, happy left eye */}
            <path d="M56,84 Q63,76 70,84" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="94" cy="82" rx="4.5" ry="6" fill="#451a03" />
            <circle cx="92" cy="80" r="2" fill="#fff" />
            
            {/* Little friendly moustache */}
            <path d="M72,94 Q80,98 88,94 Q80,92 72,94 Z" fill="#78350f" />
            {/* Smile */}
            <path d="M72,98 Q80,108 88,98" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {expression === 'celebrate' && (
          <g>
            {/* Big smiling eyes */}
            <path d="M54,82 Q62,72 70,82" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M90,82 Q98,72 106,82" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
            {/* Open cheer smile */}
            <path d="M70,94 Q80,112 90,94 Z" fill="#dc2626" stroke="#451a03" strokeWidth="2.5" />
            <path d="M74,99 Q80,104 86,99" fill="#fca5a5" />
          </g>
        )}

        {expression === 'thinking' && (
          <g>
            <circle cx="62" cy="82" r="4.5" fill="#451a03" />
            <circle cx="96" cy="80" r="4.5" fill="#451a03" />
            <path d="M74,96 Q80,94 86,98" fill="none" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Tall Grand Chef Hat (Toque) */}
        <g>
          {/* Hat headband band */}
          <path d="M50,56 Q80,52 110,56 L108,68 Q80,64 52,68 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
          <line x1="50" y1="62" x2="110" y2="62" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />

          {/* Hat Puffs */}
          <path
            d="M50,56 
               C36,46 36,24 52,18 
               C52,4 80,0 90,14 
               C104,2 124,16 122,34 
               C132,46 118,58 110,56 
               Z"
            fill="#ffffff"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Creases in chef hat */}
          <path d="M66,22 Q70,44 72,54" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          <path d="M86,16 Q88,38 88,54" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          <path d="M104,24 Q100,42 98,54" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

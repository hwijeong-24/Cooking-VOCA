import React from 'react';
import { CustomerProfile, CustomerMood } from '../types';

interface CustomerAvatarProps {
  customer: CustomerProfile;
  mood: CustomerMood;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  customer,
  mood,
  className = '',
  size = 'md'
}) => {
  const dimensionClass = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36'
  }[size];

  // Colors based on customer profile
  const { primary, accent } = customer.colorScheme;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${dimensionClass} ${className}`}
      id={`customer-${customer.id}-${mood}`}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md overflow-visible">
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="42" ry="6" fill="#00000015" />

        {/* Animal Ears / Features based on animalType */}
        {customer.animalType === 'cat' && (
          <g>
            <polygon points="28,45 15,16 48,28" fill={primary} stroke="#451a03" strokeWidth="3" />
            <polygon points="30,42 22,23 44,30" fill={accent} />
            <polygon points="92,45 105,16 72,28" fill={primary} stroke="#451a03" strokeWidth="3" />
            <polygon points="90,42 98,23 76,30" fill={accent} />
          </g>
        )}

        {customer.animalType === 'bear' && (
          <g>
            <circle cx="28" cy="28" r="16" fill={primary} stroke="#451a03" strokeWidth="3" />
            <circle cx="28" cy="28" r="9" fill={accent} />
            <circle cx="92" cy="28" r="16" fill={primary} stroke="#451a03" strokeWidth="3" />
            <circle cx="92" cy="28" r="9" fill={accent} />
          </g>
        )}

        {customer.animalType === 'rabbit' && (
          <g>
            <ellipse cx="38" cy="18" rx="10" ry="24" fill={primary} stroke="#451a03" strokeWidth="3" transform="rotate(-10 38 18)" />
            <ellipse cx="38" cy="18" rx="5" ry="16" fill={accent} transform="rotate(-10 38 18)" />
            <ellipse cx="82" cy="18" rx="10" ry="24" fill={primary} stroke="#451a03" strokeWidth="3" transform="rotate(10 82 18)" />
            <ellipse cx="82" cy="18" rx="5" ry="16" fill={accent} transform="rotate(10 82 18)" />
          </g>
        )}

        {customer.animalType === 'dog' && (
          <g>
            <ellipse cx="22" cy="48" rx="14" ry="24" fill={primary} stroke="#451a03" strokeWidth="3" transform="rotate(20 22 48)" />
            <ellipse cx="98" cy="48" rx="14" ry="24" fill={primary} stroke="#451a03" strokeWidth="3" transform="rotate(-20 98 48)" />
          </g>
        )}

        {customer.animalType === 'fox' && (
          <g>
            <polygon points="25,48 10,12 50,30" fill={primary} stroke="#451a03" strokeWidth="3" />
            <polygon points="28,44 18,22 46,32" fill="#fff" />
            <polygon points="95,48 110,12 70,30" fill={primary} stroke="#451a03" strokeWidth="3" />
            <polygon points="92,44 102,22 74,32" fill="#fff" />
          </g>
        )}

        {customer.animalType === 'panda' && (
          <g>
            <circle cx="28" cy="26" r="15" fill="#1f2937" stroke="#111827" strokeWidth="3" />
            <circle cx="92" cy="26" r="15" fill="#1f2937" stroke="#111827" strokeWidth="3" />
          </g>
        )}

        {customer.animalType === 'penguin' && (
          <g>
            <ellipse cx="60" cy="62" rx="46" ry="46" fill="#1e1b4b" stroke="#0f172a" strokeWidth="3" />
            <ellipse cx="60" cy="68" rx="34" ry="36" fill="#ffffff" />
          </g>
        )}

        {customer.animalType === 'koala' && (
          <g>
            <circle cx="20" cy="35" r="18" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
            <circle cx="20" cy="35" r="10" fill="#f1f5f9" />
            <circle cx="100" cy="35" r="18" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
            <circle cx="100" cy="35" r="10" fill="#f1f5f9" />
          </g>
        )}

        {/* Main Head Base */}
        {customer.animalType !== 'penguin' && (
          <circle cx="60" cy="62" r="44" fill={customer.animalType === 'panda' ? '#fdfbf7' : primary} stroke="#451a03" strokeWidth="3.5" />
        )}

        {/* Panda eye patches */}
        {customer.animalType === 'panda' && (
          <g>
            <ellipse cx="44" cy="56" rx="12" ry="9" fill="#1f2937" transform="rotate(-20 44 56)" />
            <ellipse cx="76" cy="56" rx="12" ry="9" fill="#1f2937" transform="rotate(20 76 56)" />
          </g>
        )}

        {/* Muzzle / Cheeks */}
        {customer.animalType !== 'penguin' && (
          <ellipse cx="60" cy="74" rx="26" ry="19" fill={customer.animalType === 'panda' ? '#f3f4f6' : accent} />
        )}

        {/* Customer Bib or Bow Tie */}
        <g transform="translate(48, 98)">
          <path d="M-6,0 L12,8 L-6,16 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          <path d="M30,0 L12,8 L30,16 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          <circle cx="12" cy="8" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        </g>

        {/* Mood Expressions */}
        {mood === 'waiting' && (
          <g>
            {/* Curious, waiting eyes */}
            <ellipse cx="45" cy="55" rx="5" ry="7" fill={customer.animalType === 'panda' ? '#fff' : '#292524'} />
            <circle cx="43" cy="53" r="2.2" fill="#fff" />
            <ellipse cx="75" cy="55" rx="5" ry="7" fill={customer.animalType === 'panda' ? '#fff' : '#292524'} />
            <circle cx="73" cy="53" r="2.2" fill="#fff" />

            {/* Rosy subtle cheeks */}
            <circle cx="34" cy="66" r="6" fill="#f43f5e" opacity="0.3" />
            <circle cx="86" cy="66" r="6" fill="#f43f5e" opacity="0.3" />

            {/* Nose & expectant mouth */}
            <polygon points="60,67 56,63 64,63" fill="#292524" />
            <path d="M55,75 Q60,78 65,75" fill="none" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {mood === 'happy' && (
          <g>
            {/* Smiling happy eyes: ^ ^ */}
            <path d="M38,55 Q45,45 52,55" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
            <path d="M68,55 Q75,45 82,55" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />

            {/* Cheerful blush */}
            <circle cx="33" cy="64" r="8" fill="#ec4899" opacity="0.5" />
            <circle cx="87" cy="64" r="8" fill="#ec4899" opacity="0.5" />

            {/* Nose & Big Open Smiling Mouth */}
            <polygon points="60,65 56,61 64,61" fill="#292524" />
            <path d="M50,71 Q60,88 70,71 Z" fill="#dc2626" stroke="#292524" strokeWidth="2" />
            <path d="M54,77 Q60,82 66,77" fill="#fb7185" />

            {/* Sparkles / Heart Floating */}
            <path d="M102,28 C102,24 96,22 93,26 C90,22 84,24 84,28 C84,34 93,39 93,39 C93,39 102,34 102,28 Z" fill="#ef4444" />
            <circle cx="18" cy="30" r="3" fill="#fbbf24" />
            <polygon points="20,18 22,23 27,24 23,28 24,33 19,30 15,33 16,28 12,24 17,23" fill="#fbbf24" />
          </g>
        )}

        {mood === 'angry' && (
          <g>
            {/* Furrowed angry brows & sharp eyes */}
            <line x1="36" y1="46" x2="52" y2="54" stroke="#991b1b" strokeWidth="4" strokeLinecap="round" />
            <line x1="84" y1="46" x2="68" y2="54" stroke="#991b1b" strokeWidth="4" strokeLinecap="round" />

            {/* Narrow angry eyes */}
            <circle cx="46" cy="58" r="4.5" fill="#7f1d1d" />
            <circle cx="74" cy="58" r="4.5" fill="#7f1d1d" />

            {/* Flushed red angry cheeks */}
            <circle cx="34" cy="67" r="7" fill="#ef4444" opacity="0.6" />
            <circle cx="86" cy="67" r="7" fill="#ef4444" opacity="0.6" />

            {/* Grumpy mouth */}
            <polygon points="60,66 56,62 64,62" fill="#292524" />
            <path d="M50,81 Q60,73 70,81" fill="none" stroke="#7f1d1d" strokeWidth="3.5" strokeLinecap="round" />

            {/* Anger vein / steam effect */}
            <g transform="translate(86, 12)">
              <path d="M4,4 Q10,2 12,8 Q16,4 20,10" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <path d="M12,4 L12,14 M6,9 L18,9" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw, X } from 'lucide-react';

export const LandscapeHelper: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      // If screen height > width and width is mobile size (< 768px)
      const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 768;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait || dismissed) return null;

  return (
    <div
      className="fixed bottom-2 left-2 right-2 sm:hidden z-50 bg-amber-950/95 text-white p-2.5 rounded-xl border border-amber-500 shadow-xl flex items-center justify-between gap-2 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-300"
      id="landscape-tip"
    >
      <div className="flex items-center gap-2 text-xs">
        <div className="relative p-1.5 bg-amber-800 rounded-lg shrink-0">
          <Smartphone className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
          <RotateCw className="w-2.5 h-2.5 text-yellow-300 absolute -top-0.5 -right-0.5" />
        </div>
        <div>
          <span className="font-black text-amber-200 block">가로 모드 추천! 🔄</span>
          <span className="text-[10px] text-amber-100/90 leading-tight">
            스마트폰을 가로로 돌리면 재료 카드를 더 편하게 터치할 수 있어요.
          </span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="p-1 text-stone-400 hover:text-white rounded-md shrink-0"
        title="닫기"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

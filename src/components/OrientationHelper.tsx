import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, RotateCw, X } from 'lucide-react';

export const OrientationHelper: React.FC = () => {
  const [phoneLandscape, setPhoneLandscape] = useState(false);
  const [tabletPortrait, setTabletPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Smartphone in landscape: width is small-ish (< 950px) and height is very short (< 550px)
      // or touch device with landscape orientation where min dimension < 600px
      const isPhoneLandscape = w > h && h < 550 && w < 1000;
      
      // Tablet in portrait: width is between 600px and 1024px, and height > width
      const isTabletPortrait = w >= 600 && w < 1024 && h > w;

      setPhoneLandscape(isPhoneLandscape);
      setTabletPortrait(isTabletPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (dismissed || (!phoneLandscape && !tabletPortrait)) return null;

  return (
    <div
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:max-w-md z-50 bg-amber-950/95 text-white p-3 rounded-2xl border-2 border-amber-500 shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-300"
      id="orientation-guide-toast"
    >
      <div className="flex items-center gap-2.5 text-xs">
        <div className="relative p-2 bg-amber-900 rounded-xl shrink-0 border border-amber-600/50">
          {phoneLandscape ? (
            <Smartphone className="w-5 h-5 text-amber-300 animate-pulse" />
          ) : (
            <Tablet className="w-5 h-5 text-amber-300 animate-pulse" />
          )}
          <RotateCw className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
        </div>
        <div className="leading-snug">
          <span className="font-black text-amber-200 block text-xs sm:text-sm">
            {phoneLandscape ? '스마트폰: 세로 모드 권장 📱' : '태블릿/노트북: 가로 모드 권장 🔄'}
          </span>
          <span className="text-[11px] text-amber-100/90">
            {phoneLandscape
              ? '스마트폰은 세로(Portrait) 화면에서 가장 편하게 플레이할 수 있어요.'
              : '태블릿과 노트북은 가로(Landscape) 화면에서 넓고 쾌적하게 즐겨보세요.'}
          </span>
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 text-stone-400 hover:text-white rounded-lg shrink-0 cursor-pointer transition-colors bg-white/5 hover:bg-white/10"
        title="안내 닫기"
        aria-label="안내 닫기"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

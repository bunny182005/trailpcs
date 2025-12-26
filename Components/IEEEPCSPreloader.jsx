import React, { useState, useEffect } from 'react';

export default function IEEEPCSPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const EXIT_ANIMATION_DURATION = 1000;

  useEffect(() => {
    const hasRenderedThisSession = window.sessionStorage.getItem('has-rendered');
    const isPageLoad = !window.performance || performance.navigation.type === 1 || !hasRenderedThisSession;
    
    if (isPageLoad || !hasRenderedThisSession) {
      setShouldShow(true);
      window.sessionStorage.setItem('has-rendered', 'true');
    } else {
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!shouldShow) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [shouldShow]);

  useEffect(() => {
    if (isExiting && shouldShow) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, EXIT_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete, shouldShow]);

  if (!shouldShow) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[999] flex select-none items-center justify-center bg-black text-center text-white overflow-hidden
        transition-all ease-in-out
        ${isExiting ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}
      `}
      style={{ transitionDuration: `${EXIT_ANIMATION_DURATION}ms` }}
    >
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      
      <main className="relative text-nowrap">
        {/* Main Wrapper */}
        <div className="relative inline-block">
          
          {/* 1. Background Gray Text (with padding to reserve space for S) */}
          <h1 className="font-black leading-none tracking-tighter text-zinc-600 px-4 py-2" style={{ fontSize: '20vw' }}>
            IEEE PCS
          </h1>

          {/* 2. Clipping Container for White Text */}
          <div 
            className="absolute left-0 bottom-0 w-full overflow-hidden px-4 py-2" 
            style={{ height: `${progress}%` }}
          >
             {/* Inner White Text (Must match padding of background text exactly) */}
             <h1 
              className="font-black leading-none tracking-tighter absolute bottom-0 left-0 right-0 px-4 py-2" 
              style={{ 
                fontSize: '20vw', 
                backgroundImage: 'linear-gradient(90deg, #fff 40%, #ffffffaa 50%, #fff 60%)', 
                backgroundSize: '200% auto', 
                color: 'transparent', 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text', 
                animation: 'shine 3s linear infinite' 
              }}>
              IEEE PCS
            </h1>
          </div>

          {/* 3. Wave SVG - Positioned absolutely to follow the progress line */}
          <div 
            className="absolute left-0 w-full pointer-events-none mix-blend-screen"
            style={{ 
              bottom: `${progress}%`, 
              transform: 'translateY(50%)', // Centers wave on the line
              zIndex: 20 
            }}
          >
             <svg 
               className="w-[200%] h-8 md:h-12" 
               viewBox="0 0 1200 30" 
               preserveAspectRatio="none" 
               xmlns="http://www.w3.org/2000/svg"
               style={{ animation: 'wave 4s linear infinite' }}
             >
              <path 
                d="M0,15 Q50,5 100,15 T200,15 T300,15 T400,15 T500,15 T600,15 T700,15 T800,15 T900,15 T1000,15 T1100,15 T1200,15 L1200,30 L0,30 Z" 
                fill="black" 
              />
            </svg>
          </div>

        </div>

        {/* Percentage Counter */}
        <div className="mt-8 flex items-center justify-end gap-3 text-xs pr-4">
          <span className="text-zinc-500 font-medium tracking-wider">loading...</span>
          <span className="text-white font-bold text-sm">{progress}%</span>
        </div>
      </main>
    </div>
  );
}
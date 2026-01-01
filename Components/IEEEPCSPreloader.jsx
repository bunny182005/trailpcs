import React, { useState, useEffect } from 'react';
// Ensure this path matches where you keep your helper function
import { preloadImages } from "../utils/preloadImages";

const IMAGES_TO_PRELOAD = [
  "/2025/c.png",
  "/2025/dh.png",
  "/2025/eh.png",
  "/2025/vc.png",
  "/2025/s.png",
  "/2025/th2.png",
  "/2025/mh.png",
  "/2025/cs.png",
  "/2025/p&m.png",
];

export default function IEEEPCSPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  
  // 🔹 CHANGED: Initialize to true so it always shows on mount/refresh
  const [shouldShow, setShouldShow] = useState(true);

  const EXIT_ANIMATION_DURATION = 1000;

  /* 🔹 BACKGROUND IMAGE PRELOADING */
  useEffect(() => {
    // Start downloading images immediately in the background
    preloadImages(IMAGES_TO_PRELOAD);
  }, []);

  /* 🔹 PROGRESS TIMER LOGIC */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // If we reach 100%, stop the timer and start exit sequence
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 500);
          return 100;
        }
        // Increment progress
        return prev + 1;
      });
    }, 50); // Speed of the loader

    return () => clearInterval(interval);
  }, []);

  /* 🔹 EXIT & CLEANUP LOGIC */
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        // Tell the parent component we are done
        if (onComplete) onComplete();
        
        // Unmount self locally (optional, depending on how parent handles it)
        setShouldShow(false);
      }, EXIT_ANIMATION_DURATION);
      
      return () => clearTimeout(timer);
    }
  }, [isExiting, onComplete]);

  // If the animation is finished, don't render anything
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
          
          {/* 1. Background Gray Text */}
          <h1 className="font-black leading-none tracking-tighter text-zinc-600 px-4 py-2" style={{ fontSize: '20vw' }}>
            IEEE PCS
          </h1>

          {/* 2. Clipping Container for White Text */}
          <div 
            className="absolute left-0 bottom-0 w-full overflow-hidden px-4 py-2 transition-all duration-300 ease-linear" 
            style={{ height: `${progress}%` }}
          >
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

          {/* 3. Wave SVG */}
          <div 
            className="absolute left-0 w-full pointer-events-none mix-blend-screen transition-all duration-300 ease-linear"
            style={{ 
              bottom: `${progress}%`, 
              transform: 'translateY(50%)', 
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
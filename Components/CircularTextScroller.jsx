import React, { useEffect, useState } from "react";

const CircularTextScroller = ({ texts, interval = 1000 }) => {
  const [index, setIndex] = useState(0);
  const items = [...texts, ...texts, ...texts];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev >= texts.length ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(id);
  }, [interval, texts.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      
      {/* ARROW LAYER 
        - Absolute position to stay fixed.
        - Mobile: 'pl-4' (Pinned to left edge)
        - Desktop: 'lg:pl-[6%]' (Original layout)
        - Arrow points Right (>) on all screens.
      */}
      <div className="absolute inset-0 flex items-center justify-start pl-4 lg:pl-[6%] pointer-events-none z-20">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>

      {/* TEXT LAYER 
        - Mobile: 'pl-16' (Just enough space to clear the arrow)
        - Desktop: 'lg:pl-[14%]' (Original layout)
      */}
      <div className="relative w-full h-full flex items-center pl-16 lg:pl-[14%]">
        <div className="relative w-full">
          {items.map((text, i) => {
            const relativeIndex = i - index - texts.length;
            const distance = Math.abs(relativeIndex);
            
            if (distance > 4) return null;

            // Mobile: REVERSED Vertical layout (Negative multiplier)
            const yMobile = relativeIndex * -80; 
            const xMobile = 0;
            const rotateMobile = 0;

            // Desktop: Standard Curved layout
            const yDesktop = relativeIndex * 80;
            const xDesktop = -Math.pow(relativeIndex, 2) * 15;
            const rotateDesktop = -relativeIndex * 3;

            const blur = Math.min(distance * 4, 16);
            const opacity = distance === 0 ? 1 : Math.max(0.3 - distance * 0.1, 0.1);
            
            return (
              <div
                key={`${text}-${i}`}
                className="text-item absolute left-0 flex items-center w-full"
                style={{
                  // Define variables for CSS switching
                  '--y-mobile': `${yMobile}px`,
                  '--x-mobile': `${xMobile}px`,
                  '--rotate-mobile': `${rotateMobile}deg`,
                  
                  '--y-desktop': `${yDesktop}px`,
                  '--x-desktop': `${xDesktop}px`,
                  '--rotate-desktop': `${rotateDesktop}deg`,
                  
                  filter: `blur(${blur}px)`,
                  opacity,
                  transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "80px", // Fixed height
                  top: "50%",     // Positions at vertical center
                  marginTop: "-40px" // Exact center alignment
                }}
              >
                <span
                  className={`font-bold tracking-wide text-black leading-none inline-block ${
                    distance === 0
                      ? "text-5xl sm:text-6xl md:text-7xl"
                      : "text-4xl sm:text-5xl md:text-6xl"
                  }`}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .text-item {
          transform: 
            translateY(var(--y-mobile)) 
            translateX(var(--x-mobile)) 
            rotate(var(--rotate-mobile)) 
            scale(1);
        }
        
        @media (min-width: 1024px) {
          .text-item {
            transform: 
              translateY(var(--y-desktop)) 
              translateX(var(--x-desktop)) 
              rotate(var(--rotate-desktop));
          }
        }
      `}</style>
    </div>
  );
};

export default CircularTextScroller;
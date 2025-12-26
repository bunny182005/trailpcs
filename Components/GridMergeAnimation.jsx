import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* -------------------------------
   Utils
-------------------------------- */
const getRandomDuration = (min = 3000, max = 6000) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* -------------------------------
   Scroll Visibility Hook
-------------------------------- */
const useInView = (ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return visible;
};

/* -------------------------------
   Window Size Hook
-------------------------------- */
const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

/* -------------------------------
   "Designer Feel" Merge Generator
-------------------------------- */
const getDesignerMerges = (gridSize, width) => {
  const isMobile = width < 640;
  
  // DESIGNER LOGIC:
  // Mobile needs smaller shapes to fit MORE items.
  
  const shapes = isMobile
    ? [
        { w: 4, h: 4, type: 'big' },      // One Big square
        { w: 3, h: 4, type: 'tall' },     // Tall portrait (Medium)
        { w: 3, h: 3, type: 'sq' },       // Medium square
        { w: 4, h: 3, type: 'wide' },     // Wide landscape
        { w: 2, h: 3, type: 'thin' },     // Thin filler (Crucial for packing more)
      ]
    : [
        { w: 3, h: 4, type: 'tall' },     
        { w: 4, h: 3, type: 'wide' },     
        { w: 4, h: 4, type: 'big' },      
        { w: 2, h: 2, type: 'small' },    
        { w: 3, h: 3, type: 'med' },      
      ];

  // CHANGED: Increased mobile count to 6 (was 3)
  // Desktop stays at 5
  const targetCount = isMobile ? 6 : 5; 
  
  const merges = [];
  const used = new Set();
  const maxAttempts = 300; // Increased attempts to help fit more items
  let attempts = 0;

  // Expanded vertical zone slightly for mobile to allow more items
  const startRow = Math.floor(gridSize * (isMobile ? 0.05 : 0.15)); 
  const endRow = Math.floor(gridSize * (isMobile ? 0.95 : 0.85));

  while (merges.length < targetCount && attempts < maxAttempts) {
    attempts++;
    
    // Pick a shape randomly
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    // Calculate valid positions
    const maxValidRow = endRow - shape.h;
    const effectiveMinRow = maxValidRow > startRow ? startRow : 0;
    const effectiveMaxRow = maxValidRow > startRow ? maxValidRow : (gridSize - shape.h);

    const row = effectiveMinRow + Math.floor(Math.random() * (effectiveMaxRow - effectiveMinRow + 1));
    const col = Math.floor(Math.random() * (gridSize - shape.w + 1));

    // Check collision
    let conflict = false;
    const currentIndices = [];

    for (let r = 0; r < shape.h; r++) {
      for (let c = 0; c < shape.w; c++) {
        const idx = (row + r) * gridSize + (col + c);
        if (used.has(idx)) {
          conflict = true;
          break;
        }
        currentIndices.push(idx);
      }
      if (conflict) break;
    }

    if (!conflict) {
      currentIndices.forEach(i => used.add(i));
      merges.push({
        row,
        col,
        rowSpan: shape.h,
        colSpan: shape.w,
        indices: currentIndices,
        id: crypto.randomUUID(),
        type: shape.type
      });
    }
  }

  return merges;
};

/* -------------------------------
   MAIN COMPONENT
-------------------------------- */
const GridMergeAnimation = () => {
  const { width } = useWindowSize();
  
  // CHANGED: Increased mobile grid size from 10 to 12.
  // This gives more "cells" so smaller items can pack in tighter.
  const gridSize = width < 640 ? 12 : width < 1024 ? 14 : 16; 
  const totalItems = gridSize * gridSize;
  
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef);
  const isPlayingRef = useRef(false);
  const timeoutsRef = useRef([]);
  const [activeBlocks, setActiveBlocks] = useState([]);

  const mediaPool = [
    '/2025/c.png',
    '/2025/dh.png',
    '/2025/eh.png',
    '/2025/vc.png',
    '/2025/eh.jpeg',
    '/2025/s.png',
    '/2025/th2.png',
    '/2025/mh.png',
    '/2025/cs.png',
    '/2025/p&m.png',
    
  ];

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const playCycle = () => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;

    const merges = getDesignerMerges(gridSize, width);

    // 1. Fade out grid
    merges.forEach(m => {
      m.indices.forEach(idx => {
        gsap.to(`[data-cell="${idx}"]`, {
          scale: 0.1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    });

    // 2. Show Images
    const showTimeout = setTimeout(() => {
      const shuffledMedia = [...mediaPool].sort(() => 0.5 - Math.random());
      
      setActiveBlocks(
        merges.map((m, i) => ({
          ...m,
          depth: i,
          media: shuffledMedia[i % shuffledMedia.length],
        }))
      );
    }, 600);

    const resetTimeout = setTimeout(resetCycle, getRandomDuration(3000, 5000));
    timeoutsRef.current.push(showTimeout, resetTimeout);
  };

  const resetCycle = () => {
    gsap.to(".merged-block", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setActiveBlocks([]);
        gsap.to("[data-cell]", {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.75)", 
          stagger: { amount: 0.2, grid: [gridSize, gridSize], from: "random" }
        });

        isPlayingRef.current = false;
        if (isVisible) {
          timeoutsRef.current.push(setTimeout(playCycle, 500));
        }
      },
    });
  };

  useEffect(() => {
    if (activeBlocks.length) {
      gsap.fromTo(".merged-block",
        { scale: 0.8, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "expo.out", 
          stagger: 0.15 
        }
      );
    }
  }, [activeBlocks]);

  useEffect(() => {
    if (!isVisible) {
      clearAllTimeouts();
      isPlayingRef.current = false;
      setActiveBlocks([]);
      gsap.set("[data-cell]", { scale: 1, opacity: 1 });
    } else {
      playCycle();
    }
  }, [isVisible]);

  useEffect(() => {
    clearAllTimeouts();
    setActiveBlocks([]);
    if (isVisible) setTimeout(playCycle, 300);
  }, [gridSize]);

  const gapSize = width < 640 ? 'gap-1' : 'gap-2';
  
  return (
    <div ref={containerRef} className="relative w-full h-full bg-white select-none overflow-hidden">
      
      {/* 1. Underlying Grid */}
      <div
        className={`grid ${gapSize} w-full h-full p-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: totalItems }, (_, i) => (
          <div
            key={i}
            data-cell={i}
            className="rounded-full bg-transparent border-none" 
            style={{ width: '100%', height: '100%' }} 
          />
        ))}
      </div>

      {/* 2. Merged Images */}
      <div className="absolute inset-0 p-4">
        <div className="relative w-full h-full">
            {activeBlocks.map(b => (
            <div
                key={b.id}
                className="merged-block absolute overflow-hidden bg-gray-100 group"
                style={{
                  top: `calc(${(b.row / gridSize) * 100}% + ${width < 640 ? 2 : 4}px)`,
                  left: `calc(${(b.col / gridSize) * 100}% + ${width < 640 ? 2 : 4}px)`,
                  width: `calc(${(b.colSpan / gridSize) * 100}% - ${width < 640 ? 4 : 8}px)`,
                  height: `calc(${(b.rowSpan / gridSize) * 100}% - ${width < 640 ? 4 : 8}px)`,
                  zIndex: 30 + b.depth,
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px -5px rgba(0,0,0,0.2)',
                }}
            >
                <img 
                  src={b.media} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  alt="" 
                />
            </div>
            ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white z-20" />
    </div>
  );
};

export default GridMergeAnimation;
import React, { useState, useEffect, useRef } from "react";
import HorizontalScrollGallery from "../Components/HorizontalScrollGallery";
// import MosaicTextHeader from "../Components/MosaicTextHeader.jsx"; 

/* ------------------ IMAGE SETS ------------------ */
const SOTY_IMAGES = [
  "/2025/c.png",
  "/2025/cs.png",
  "/2025/dh.png",
  "/2025/s.png",
];

const PLACEIT_IMAGES = [
  "/2025/c.png",
  "/2025/cs.png",
  "/2025/dh.png",
  "/2025/s.png",
];

/* ------------------ CROSSFADE PANEL ------------------ */
const CrossfadePanel = ({ images, direction = "up" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl pointer-events-none select-none">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
            ${
              i === index
                ? "opacity-100 translate-y-0 scale-100"
                : direction === "up"
                ? "opacity-0 translate-y-6 scale-105"
                : "opacity-0 -translate-y-6 scale-105"
            }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

/* ------------------ ANIMATED BORDER COMPONENT ------------------ */
/**
 * Uses CSS Transitions instead of React State for buttery smooth performance.
 * It is not affected by scrolling or the main thread.
 */
const AnimatedBorder = ({ duration, resetKey }) => {
  const rectRef = useRef(null);
  const containerRef = useRef(null);
  const [perimeter, setPerimeter] = useState(0);

  // 1. Measure the exact path length for responsiveness
  useEffect(() => {
    if (!containerRef.current || !rectRef.current) return;

    const updatePerimeter = () => {
      if (rectRef.current) {
        setPerimeter(rectRef.current.getTotalLength());
      }
    };

    updatePerimeter();
    
    // Efficient ResizeObserver
    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updatePerimeter);
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Trigger the CSS Animation whenever `resetKey` changes
  useEffect(() => {
    const rect = rectRef.current;
    if (!rect || perimeter === 0) return;

    // A. INSTANT RESET: Stop transition and hide the line (offset = perimeter)
    rect.style.transition = "none";
    rect.style.strokeDasharray = `${perimeter}`;
    rect.style.strokeDashoffset = `${perimeter}`;

    // B. FORCE REFLOW: Trigger a browser read to apply the 'none' transition immediately
    void rect.getBoundingClientRect();

    // C. START ANIMATION: Enable transition and move to 0
    rect.style.transition = `stroke-dashoffset ${duration}ms linear`;
    rect.style.strokeDashoffset = "0";

  }, [perimeter, resetKey, duration]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <svg className="w-full h-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="animatedGradient">
            <stop offset="0%" stopColor="#000000">
              <animate
                attributeName="stop-color"
                values="#000000; #4b5563; #000000"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#4b5563">
              <animate
                attributeName="stop-color"
                values="#4b5563; #000000; #4b5563"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        {/* Static Background Border */}
        <rect
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          rx="20"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />

        {/* Animated Moving Border */}
        <rect
          ref={rectRef}
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          rx="20"
          fill="none"
          stroke="url(#animatedGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ willChange: "stroke-dashoffset" }} // Hardware Acceleration Hint
        />
      </svg>
    </div>
  );
};

/* ------------------ CONTENT COMPONENTS ------------------ */
const SOTYContent = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center pointer-events-none">
    <h1 className="text-[20vw] md:text-[14vw] lg:text-[12vw] font-bold leading-none mb-4 md:mb-8 text-gray-900">
      SOTY
    </h1>
    <p className="text-base md:text-xl max-w-2xl px-4 text-gray-700 font-medium">
      The "Student of the Year" was a two-day challenge-based event testing
      participants across physical, mental, and creative domains.
    </p>
  </div>
);

const PlaceItContent = () => (
  <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center pointer-events-none">
    <h1 className="text-[20vw] md:text-[14vw] lg:text-[12vw] font-bold leading-none mb-4 md:mb-8 text-gray-900">
      PlaceIt
    </h1>
    <p className="text-base md:text-xl max-w-2xl px-4 text-gray-700 font-medium">
      Place-It bridges students with EdTech leaders through discussions and an
      Ideathon that challenges participants to shape the future of education.
    </p>
  </div>
);

/* ------------------ MAIN PAGE ------------------ */
export default function Creative() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const TOTAL_DURATION = 8000; // 8 Seconds per slide

  useEffect(() => {
    // Simple interval strictly for switching logical state.
    // The visual animation is now handled by CSS in the child component.
    const interval = setInterval(() => {
      setCurrentEvent((prev) => (prev === 0 ? 1 : 0));
    }, TOTAL_DURATION);

    return () => clearInterval(interval);
  }, []);

  const activeImages = currentEvent === 0 ? SOTY_IMAGES : PLACEIT_IMAGES;

  return (
    <div className="w-full min-h-screen bg-white py-10 md:py-20 select-none">
      <HorizontalScrollGallery />

      <h2 className="mb-12 md:mb-24 text-center text-3xl md:text-5xl lg:text-6xl font-extrabold px-4">
        OUR FLAGSHIP EVENTS
      </h2>

      <div className="w-full px-4 md:px-6 lg:px-12">
        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex w-full h-[500px] md:h-[600px] lg:h-[700px] gap-3 md:gap-4">
          <div className="w-32 md:w-48 lg:w-56">
            <CrossfadePanel images={activeImages} direction="up" />
          </div>

          <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden bg-white shadow-xl group">
            
            {/* The Border Animation - Pass currentEvent as resetKey */}
            <AnimatedBorder duration={TOTAL_DURATION} resetKey={currentEvent} />

            {/* SOTY Slide */}
            <div
              className={`absolute inset-0 transition-all duration-[800ms] ease-out
                ${
                  currentEvent === 0
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-95 blur-sm z-0"
                }`}
            >
              <SOTYContent />
            </div>

            {/* PlaceIt Slide */}
            <div
              className={`absolute inset-0 transition-all duration-[800ms] ease-out
                ${
                  currentEvent === 1
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-95 blur-sm z-0"
                }`}
            >
              <PlaceItContent />
            </div>
          </div>

          <div className="w-40 md:w-56 lg:w-64">
            <CrossfadePanel images={activeImages} direction="down" />
          </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="w-full h-48">
            <CrossfadePanel images={activeImages} direction="up" />
          </div>

          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-white shadow-xl">
            
            <AnimatedBorder duration={TOTAL_DURATION} resetKey={currentEvent} />

            <div
              className={`absolute inset-0 transition-all duration-[800ms] ease-out
                ${
                  currentEvent === 0
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-95 blur-sm z-0"
                }`}
            >
              <SOTYContent />
            </div>

            <div
              className={`absolute inset-0 transition-all duration-[800ms] ease-out
                ${
                  currentEvent === 1
                    ? "opacity-100 scale-100 blur-0 z-10"
                    : "opacity-0 scale-95 blur-sm z-0"
                }`}
            >
              <PlaceItContent />
            </div>
          </div>

          <div className="w-full h-48">
            <CrossfadePanel images={activeImages} direction="down" />
          </div>
        </div>
      </div>
    </div>
  );
}
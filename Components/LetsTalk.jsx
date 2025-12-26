import React, { useState, useEffect, useRef } from 'react';

// --- Data for all media blocks ---
const mediaBlocksData = [
  {
    id: 1,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { top: '18.5%', right: '70.5%' },
    size: { width: '25%', height: '22.5%' },
    responsiveZ: "z-20",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-75 translate-x-20 -translate-y-10 rotate-12",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '100ms',
    duration: '1000ms',
    loopInterval: 4000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  {
    id: 2,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { top: '30%', right: '40%' },
    size: { width: '45%', height: '28%' },
    responsiveZ: "z-10",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-90 translate-x-16 translate-y-8 rotate-8",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '300ms',
    duration: '800ms',
    loopInterval: 5500,
    media: [
      { type: 'video', src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  {
    id: 3,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { top: '45%', left: '-10%' },
    size: { width: '35%', height: '28%' },
    responsiveZ: "z-20",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-85 -translate-x-12 translate-y-12 -rotate-6",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '500ms',
    duration: '1000ms',
    loopInterval: 4000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop' },
      { type: 'video', src: 'https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_1MB.mp4' },
    ]
  },
  {
    id: 4,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { bottom: '21.5%', left: '-65%' },
    size: { width: '18%', height: '14%' },
    responsiveZ: "z-0",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-70 -translate-x-16 translate-y-10 -rotate-15",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '200ms',
    duration: '1100ms',
    loopInterval: 3000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2072&auto=format&fit=crop' },
    ]
  },
  {
    id: 5,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { bottom: '7%', left: '-25%' },
    size: { width: '30%', height: '30%' },
    responsiveZ: "z-10",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-80 -translate-x-14 translate-y-16 rotate-10",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '400ms',
    duration: '1000ms',
    loopInterval: 5000,
    media: [
      { type: 'video', src: 'https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_1MB.mp4' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop' },
    ]
  },
  {
    id: 6,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { bottom: '10%', left: '20%' },
    size: { width: '25%', height: '22%' },
    responsiveZ: "z-10",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-75 translate-x-10 translate-y-14 -rotate-8",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '600ms',
    duration: '900ms',
    loopInterval: 4000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175&auto=format&fit=crop' },
      { type: 'video', src: 'https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_1MB.mp4' },
    ]
  },
  {
    id: 7,
    baseClass: "absolute rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden",
    style: { bottom: '15%', right: '28%' },
    size: { width: '25%', height: '32%' },
    responsiveZ: "z-40",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-95 translate-x-18 translate-y-10 rotate-12",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '700ms',
    duration: '1000ms',
    loopInterval: 3500,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1974&auto=format&fit=crop' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1925&auto=format&fit=crop' },
    ]
  },
];

// --- Component to handle internal looping ---
function MediaBlock({ block, isAnimating }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { 
    baseClass,
    style,
    size,
    responsiveZ,
    animationClass, 
    initialState, 
    finalState, 
    delay, 
    media, 
    duration, 
    loopInterval 
  } = block;

  useEffect(() => {
    if (media.length <= 1) return;
    const loopTimer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, loopInterval || 4000);
    return () => clearTimeout(loopTimer);
  }, [currentIndex, media.length, loopInterval]);

  return (
    <div
      className={`${baseClass} ${responsiveZ} ${animationClass} ${isAnimating ? initialState : finalState}`}
      style={{
        ...style,
        width: size.width,
        height: size.height,
        transitionProperty: "all",
        transitionDuration: duration || "1000ms",
        transitionDelay: isAnimating ? '0ms' : delay,
      }}
    >
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main component ---
export default function TeamHeroSection() {
  const [isAnimating, setIsAnimating] = useState(true);
  const headingRef = useRef(null);

  useEffect(() => {
    const element = headingRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimating(false);
          observer.unobserve(element);
        }
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="relative w-full min-h-screen">
        {/* Main heading */}
        <div 
          ref={headingRef}
          className="absolute left-4 sm:left-8 md:left-12 lg:left-16 xl:left-24 top-1/2 -translate-y-1/2 z-30"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            A Team That's<br />
            Anything But<br />
            Ordinary
          </h1>
        </div>

        {/* Image grid - using percentage-based container */}
        <div className="absolute right-0 top-0 w-[55%] h-full">
          {mediaBlocksData.map((block) => (
            <MediaBlock key={block.id} block={block} isAnimating={isAnimating} />
          ))}
        </div>
      </div>
    </div>
  );
}
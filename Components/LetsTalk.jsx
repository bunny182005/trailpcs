import React, { useState, useEffect, useRef } from 'react';

// --- Data for all media blocks ---
const mediaBlocksData = [
  {
    id: 1,
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "top-4 right-8 sm:top-6 sm:right-16 md:top-8 md:right-32 lg:right-48 xl:right-72",
    responsiveSize: "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52",
    responsiveZ: "z-20",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-75 translate-x-20 sm:translate-x-32 md:translate-x-40 -translate-y-10 sm:-translate-y-16 md:-translate-y-20 rotate-12",
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
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "top-24 right-2 sm:top-32 sm:right-4 md:top-40 md:right-6 lg:top-48 lg:right-8 xl:top-52 xl:right-11",
    responsiveSize: "w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48 lg:w-80 lg:h-56 xl:w-96 xl:h-64",
    responsiveZ: "z-10",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-90 translate-x-16 sm:translate-x-24 md:translate-x-32 translate-y-8 sm:translate-y-12 md:translate-y-16 rotate-8",
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
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "top-40 left-8 sm:top-52 sm:left-12 md:top-64 md:left-20 lg:top-72 lg:left-32 xl:top-80 xl:left-56",
    responsiveSize: "w-40 h-32 sm:w-52 sm:h-40 md:w-60 md:h-44 lg:w-72 lg:h-52 xl:w-80 xl:h-60",
    responsiveZ: "z-30",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-85 -translate-x-12 sm:-translate-x-18 md:-translate-x-24 translate-y-12 sm:translate-y-18 md:translate-y-24 -rotate-6",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '500ms',
    duration: '1000ms',
    loopInterval: 4000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop' },
    ]
  },
  {
    id: 4,
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "bottom-0 left-0 sm:bottom-0 sm:left-0 md:bottom-0 md:left-[-80px] lg:bottom-0 lg:left-[-160px] xl:bottom-[-9px] xl:left-[-320px]",
    responsiveSize: "w-24 h-20 sm:w-32 sm:h-28 md:w-36 md:h-32 lg:w-40 lg:h-36 xl:w-44 xl:h-40",
    responsiveZ: "z-20",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-70 -translate-x-16 sm:-translate-x-24 md:-translate-x-32 translate-y-10 sm:translate-y-16 md:translate-y-20 -rotate-15",
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
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "bottom-0 left-12 sm:bottom-[-20px] sm:left-16 md:bottom-[-40px] md:left-20 lg:bottom-[-60px] lg:left-24 xl:bottom-[-100px] xl:left-20",
    responsiveSize: "w-32 h-40 sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-64 xl:w-56 xl:h-72",
    responsiveZ: "z-10",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-80 -translate-x-14 sm:-translate-x-20 md:-translate-x-28 translate-y-16 sm:translate-y-24 md:translate-y-32 rotate-10",
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
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "bottom-0 left-32 sm:bottom-[-10px] sm:left-48 md:bottom-[-20px] md:left-60 lg:bottom-[-30px] lg:left-72 xl:bottom-[-40px] xl:left-96",
    responsiveSize: "w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-56",
    responsiveZ: "z-20",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-75 translate-x-10 sm:translate-x-16 md:translate-x-20 translate-y-14 sm:translate-y-20 md:translate-y-28 -rotate-8",
    finalState: "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0",
    delay: '600ms',
    duration: '900ms',
    loopInterval: 4000,
    media: [
      { type: 'image', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2175&auto=format&fit=crop' },
    ]
  },
  {
    id: 7,
    baseClass: "absolute rounded-2xl sm:rounded-3xl overflow-hidden",
    responsivePosition: "bottom-0 right-2 sm:bottom-0 sm:right-4 md:bottom-0 md:right-6 lg:bottom-0 lg:right-10 xl:bottom-0 xl:right-12",
    responsiveSize: "w-32 h-40 sm:w-40 sm:h-52 md:w-44 md:h-60 lg:w-48 lg:h-68 xl:w-56 xl:h-80",
    responsiveZ: "z-40",
    animationClass: "transition-all ease-out",
    initialState: "opacity-0 scale-95 translate-x-18 sm:translate-x-24 md:translate-x-36 translate-y-10 sm:translate-y-16 md:translate-y-20 rotate-12",
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

// Flatten all images for mobile carousel
const allImages = mediaBlocksData.flatMap(block => block.media);

// --- Component to handle internal looping ---
function MediaBlock({ block, isAnimating }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { 
    baseClass,
    responsivePosition,
    responsiveSize,
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
      className={`${baseClass} ${responsivePosition} ${responsiveSize} ${responsiveZ} ${animationClass} ${isAnimating ? initialState : finalState}`}
      style={{
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
  const [isPaused, setIsPaused] = useState(false);
  const headingRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

  // Auto-scroll effect for mobile
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isPaused) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden py-12 sm:py-16 md:py-20">
      {/* Desktop Version - LG and above */}
      <div className="hidden lg:block relative w-full min-h-screen">
        {/* Main heading */}
        <div 
          ref={headingRef}
          className="absolute left-4 sm:left-8 md:left-12 lg:left-16 xl:left-24 top-1/2 -translate-y-1/2 z-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-bold leading-tight whitespace-nowrap">
            A Team That's<br />
            Anything But<br />
            Ordinary
          </h1>
        </div>

        {/* Image grid */}
        <div className="absolute right-2 sm:right-4 md:right-8 lg:right-12 xl:right-20 top-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[700px] xl:w-[900px] h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] xl:h-[700px]">
          {mediaBlocksData.map((block) => (
            <MediaBlock key={block.id} block={block} isAnimating={isAnimating} />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Version - Below LG */}
      <div className="lg:hidden relative w-full min-h-screen flex flex-col items-center justify-center px-4">
        {/* Single line heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">
          A Team That's Anything But Ordinary
        </h1>

        {/* Horizontal scrolling carousel */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {/* Duplicate images for infinite scroll effect */}
            {[...allImages, ...allImages].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg"
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
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
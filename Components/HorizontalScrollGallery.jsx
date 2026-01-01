import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollGallery = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const images = [
    "/Outreach_Poster.png",
    "/team/2.jpg",
    "/team/3.jpg",
    "/team/4.jpg",
    "/team/5.jpg",
    "/team/6.jpg",
    "/team/7.jpg",
    "/team/8.jpg",
    "/team/9.jpg",
    "/team/10.jpg",
  ];

  useEffect(() => {
    // 1. PERFORMANCE CONFIG
    // Stops the address bar from ruining the layout calculation
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // NOTE: 'normalizeScroll' is often the cause of the "stuck" feeling on mobile. 
    // We strictly DISABLE it here to let the native OS handle the touch physics.
    ScrollTrigger.normalizeScroll(false);

    const section = sectionRef.current;
    const track = trackRef.current;

    let ctx;

    const setupAnimation = () => {
      if (!track || !section) return;

      ctx = gsap.context(() => {
        const getScrollAmount = () => {
          // Standard calculation: Total width - Viewport width
          return track.scrollWidth - window.innerWidth;
        };

        const scrollAmount = getScrollAmount();
        const isMobile = window.innerWidth < 768;

        gsap.to(track, {
          x: -scrollAmount,
          ease: "none", // Linear is crucial for 1:1 mapping
          scrollTrigger: {
            trigger: section,
            start: "top top",
            
            // ⚡️ SMOOTHNESS TWEAK 1: THE GEAR RATIO ⚡️
            // On mobile, we cut the scroll distance to 60%.
            // This means a 600px swipe moves the gallery 1000px.
            // It feels "assisted" and effortless, but still controlled.
            end: () => `+=${isMobile ? scrollAmount * 0.6 : scrollAmount}`, 
            
            // ⚡️ SMOOTHNESS TWEAK 2: THE WEIGHT ⚡️
            // 0.5 adds just enough "momentum" to hide touch-screen jitter,
            // but is low enough to feel instant.
            scrub: isMobile ? 0.5 : 1, 
            
            pin: true,
            // crucial for preventing the "jump" when pinning starts
            anticipatePin: 1, 
            invalidateOnRefresh: true,
            // fastScrollEnd prevents the scroll from "running away" if you flick too hard
            fastScrollEnd: isMobile ? 2000 : null,
          },
        });
      }, section);
    };

    // Run setup
    setupAnimation();

    // 2. RESIZE HANDLER (Mobile Optimized)
    // Only refresh if width changes. This ignores the URL bar appearing/disappearing.
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        if (ctx) ctx.revert();
        ScrollTrigger.refresh();
        setupAnimation();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
      // ⚡️ CRITICAL CSS ⚡️
      // pan-y: Tells browser "Only listen to vertical swipes".
      // overscroll-behavior: Prevents the "rubber band" bounce effect on iOS.
      style={{ touchAction: "pan-y", overscrollBehavior: "none" }}
    >
      {/* TITLE */}
      <div className="absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black drop-shadow-sm">
          OUR EVENTS
        </h2>
      </div>

      {/* SCROLL TRACK */}
      <div
        ref={trackRef}
        className="
          absolute top-1/2 -translate-y-1/2 left-0 
          flex h-full items-center
          gap-4 px-6          
          md:gap-12 md:px-24
          will-change-transform
        "
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="
              group relative 
              w-[80vw] h-[50vh]    
              md:w-[380px] md:h-[480px]
              rounded-2xl 
              border-2 md:border-4 border-black 
              bg-white shadow-xl 
              overflow-hidden
              flex-shrink-0
              /* 3D Transform helps mobile GPU rendering */
              transform-gpu
            "
          >
            {/* IMAGE */}
            <img
              src={src}
              alt={`Event ${idx + 1}`}
              loading="eager" // Load first few eagerly for smoothness
              className="
                w-full h-full
                object-cover
                bg-gray-100
                transition-transform duration-700 ease-out
                /* Subtler zoom on mobile to save FPS */
                group-hover:scale-105 md:group-hover:scale-110
              "
              onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.parentNode.style.backgroundColor = '#f3f4f6';
              }}
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-black/40 to-transparent
                opacity-100 md:opacity-0 md:group-hover:opacity-100
                transition-opacity duration-300
                flex flex-col justify-end p-6
              "
            >
              <div className="translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl md:text-2xl font-bold mb-1">
                  Event {idx + 1}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
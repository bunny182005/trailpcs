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
    // 1. GLOBAL MOBILE CONFIGURATION
    // Prevents address bar resizing from breaking the scroll calculation
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // OPTIONAL: Smooths out touch scrolling to prevent "fighting" the animation
    // If you feel it's too aggressive, you can comment this line out.
    ScrollTrigger.normalizeScroll(true);

    const section = sectionRef.current;
    const track = trackRef.current;

    let ctx;

    const setupAnimation = () => {
      if (track && section) {
        ctx = gsap.context(() => {
          const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const windowWidth = window.innerWidth;
            return trackWidth - windowWidth;
          };

          const scrollAmount = getScrollAmount();
          const isMobile = window.innerWidth < 768;

          gsap.to(track, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              // On mobile, we reduce the multiplier slightly to 1.5 or 2 to make it less "long"
              // This helps the user exit the section faster when scrolling back up
              end: () => `+=${isMobile ? scrollAmount * 1.5 : scrollAmount}`, 
              
              scrub: 1, 
              pin: true,
              anticipatePin: 1, // Helps avoid the "flash" when pinning starts
              invalidateOnRefresh: true,
              
              // 2. FORCE REFRESH FIX
              // This ensures that when scrolling back UP, it recalculates smoother
              fastScrollEnd: true, 
              preventOverlaps: true,
            },
          });
        }, section);
      }
    };

    setupAnimation();

    // 3. OPTIMIZED RESIZE HANDLER
    // Only refresh if width changes (orientation change), not height (address bar)
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
      // Clean up the normalization when leaving the component
      ScrollTrigger.normalizeScroll(false); 
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      {/* TITLE */}
      <div className="absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black">
          OUR EVENTS
        </h2>
      </div>

      {/* SCROLL TRACK */}
      <div
        ref={trackRef}
        className="
          absolute top-1/2 -translate-y-1/2 left-0 
          flex h-full items-center
          gap-6 px-8 
          md:gap-12 md:px-24
          will-change-transform
        "
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="
              group relative 
              w-[85vw] h-[55vh]
              md:w-[380px] md:h-[480px]
              rounded-2xl 
              border-2 md:border-4 border-black 
              bg-white shadow-xl 
              overflow-hidden
              flex-shrink-0
            "
          >
            {/* IMAGE */}
            <img
              src={src}
              alt={`Event ${idx + 1}`}
              className="
                w-full h-full
                object-cover
                bg-gradient-to-br from-gray-100 to-gray-200
                transition-transform duration-500 ease-out
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black via-black/50 to-transparent
                opacity-100 md:opacity-0 md:group-hover:opacity-100
                transition-opacity duration-300
                flex flex-col justify-end p-6
              "
            >
              <div className="translate-y-0 md:translate-y-6 md:group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-bold mb-2">
                  Event {idx + 1}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Brief description...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
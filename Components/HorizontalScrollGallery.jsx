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
    // 1. PREMIUM PHYSICS CONFIGURATION
    // normalizeScroll: Intercepts native touch/wheel to apply GSAP's smooth physics
    // This eliminates the "jitter" between the browser's scroll thread and the animation
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      momentum: (self) => Math.min(3, self.velocityY / 1000), // Cap momentum for control
      type: "touch,wheel,pointer", // Apply to all input types
    });

    ScrollTrigger.config({ ignoreMobileResize: true });

    const section = sectionRef.current;
    const track = trackRef.current;

    let ctx;

    const setupAnimation = () => {
      if (track && section) {
        ctx = gsap.context(() => {
          const trackWidth = track.scrollWidth;
          const windowWidth = window.innerWidth;
          const scrollAmount = trackWidth - windowWidth;

          // --------------------------------------------------------
          // 2. THE MAIN TIMELINE
          // --------------------------------------------------------
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollAmount}`, 
              
              // KEY TO PREMIUM FEEL:
              // A value of 1-2 creates "weight". The content lags behind your finger
              // slightly, smoothing out all micro-jitters.
              scrub: 1.5, 
              
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // A. Move the Track Left
          tl.to(track, {
            x: -scrollAmount,
            ease: "none", // Must be linear for the scroll mapping
            duration: 1,  // Duration doesn't matter with scrub, just ratio
          });

          // B. PARALLAX EFFECT (The "Expensive" Look)
          // We select all images inside the track and move them slightly RIGHT
          // while the track moves LEFT. This creates depth.
          tl.to(".gallery-image", {
            xPercent: 20, // Move image 20% inside its frame
            ease: "none",
            duration: 1,
          }, "<"); // "<" syncs this strictly with the track movement

        }, section);
      }
    };

    setupAnimation();

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
      ScrollTrigger.normalizeScroll(false); // Clean up
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
      style={{ overscrollBehavior: "none" }}
    >
      {/* TITLE */}
      <div className="absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black mix-blend-difference">
          OUR EVENTS
        </h2>
      </div>

      {/* SCROLL TRACK */}
      <div
        ref={trackRef}
        className="
          absolute top-1/2 -translate-y-1/2 left-0 
          flex h-[60vh] md:h-[70vh] items-center
          gap-8 px-8 
          md:gap-16 md:px-24
          will-change-transform
        "
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="
              group relative 
              w-[85vw] h-full
              md:w-[50vh] md:h-full
              overflow-hidden
              flex-shrink-0
              grayscale hover:grayscale-0 transition-all duration-700
            "
          >
            {/* IMAGE CONTAINER WITH PARALLAX CLASS */}
            <div className="w-full h-full overflow-hidden rounded-2xl relative">
                <img
                src={src}
                alt={`Event ${idx + 1}`}
                className="
                    gallery-image
                    absolute
                    w-[120%] h-full /* 120% width to allow parallax movement */
                    left-[-10%]     /* Start slightly to the left */
                    object-cover
                    bg-gray-200
                "
                />
            </div>

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                flex flex-col justify-end p-8
                pointer-events-none
                rounded-2xl
              "
            >
              <h3 className="text-white text-3xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                Event {idx + 1}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
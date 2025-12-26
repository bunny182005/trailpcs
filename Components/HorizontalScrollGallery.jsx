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
    const section = sectionRef.current;
    const track = trackRef.current;

    let ctx;

    const setupAnimation = () => {
      // We removed the media query check so this runs on ALL devices
      if (track && section) {
        ctx = gsap.context(() => {
          const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const windowWidth = window.innerWidth;
            // Return the total scrollable distance
            return trackWidth - windowWidth;
          };

          const scrollAmount = getScrollAmount();

          gsap.to(track, {
            x: -scrollAmount, // Move exactly the width of the overflow
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              // Adjust the 'end' value to control how fast/slow the scroll feels
              // A larger value (e.g., scrollAmount * 1.5) makes the scroll slower/longer
              end: () => `+=${scrollAmount}`, 
              scrub: 1, // Increased scrub slightly for smoother feel on mobile touch
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true, // Recalculate on resize/mobile address bar shift
            },
          });
        }, section);
      }
    };

    setupAnimation();

    const handleResize = () => {
      if (ctx) ctx.revert();
      ScrollTrigger.refresh();
      setupAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    /* Unified Section for Mobile & Desktop */
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
        "
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="
              group relative 
              /* MOBILE SIZING: 85% of screen width */
              w-[85vw] h-[55vh]
              /* DESKTOP SIZING: Fixed width/height */
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
                  Brief description of the event or highlight goes here.
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
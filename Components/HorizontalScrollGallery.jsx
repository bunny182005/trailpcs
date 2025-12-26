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

    // We use matchMedia to separate Desktop vs Mobile logic
    let mm = gsap.matchMedia();

    // --------------------------------------------------------
    // DESKTOP LOGIC (Min-width: 768px)
    // --------------------------------------------------------
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return trackWidth - windowWidth;
      };

      const scrollAmount = getScrollAmount();

      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    // --------------------------------------------------------
    // MOBILE LOGIC (No GSAP Animation)
    // --------------------------------------------------------
    // We don't need JS for mobile, we will handle it with CSS classes below.
    // This ensures no "Scroll Jacking" conflicts when scrolling back up from Memories.

    return () => {
      // Kill animations when component unmounts
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      // UPDATE: Changed h-screen to min-h-screen/auto for mobile so it flows naturally
      className="relative w-full min-h-[60vh] md:h-screen bg-white overflow-hidden flex flex-col justify-center"
    >
      {/* TITLE */}
      <div className="md:absolute top-10 md:top-[15%] left-1/2 md:-translate-x-1/2 z-20 w-full px-4 text-center pointer-events-none mb-8 md:mb-0">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black">
          OUR EVENTS
        </h2>
      </div>

      {/* SCROLL TRACK CONTAINER */}
      {/* MOBILE CSS CHANGES:
         1. overflow-x-auto: Enables native horizontal swiping
         2. no-scrollbar: Hides the ugly scrollbar (needs custom CSS usually, or just leave standard)
         3. snap-x: Adds snap physics (optional, feels nice)
      */}
      <div className="w-full h-auto md:h-full flex items-center overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory">
        
        {/* THE TRACK ITSELF */}
        <div
          ref={trackRef}
          className="
            flex items-center
            gap-6 px-8 
            md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 
            md:gap-12 md:px-24
            will-change-transform
            /* Ensure width is fit-content on mobile so it scrolls */
            w-max md:w-auto
          "
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className="
                group relative 
                /* Mobile Dimensions: Smaller, static */
                w-[80vw] h-[50vh]
                /* Desktop Dimensions: Scalable */
                md:w-[380px] md:h-[480px]
                rounded-2xl 
                border-2 md:border-4 border-black 
                bg-white shadow-xl 
                overflow-hidden
                flex-shrink-0
                snap-center
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
                  /* Visible on mobile by default, hover on desktop */
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
          
          {/* Spacer for Mobile Right Padding */}
          <div className="w-4 md:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
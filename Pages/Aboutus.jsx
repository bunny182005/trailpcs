import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import SwapSection from "../Components/SwapSection.jsx";
import RethinkingSection from "../Components/RethinkingSection.jsx";

/* ---------------------------------------------
   Scroll helper for Contact
--------------------------------------------- */
const scrollToContact = () => {
  const footer = document.getElementById("contact-footer");
  if (footer) {
    footer.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
};

/* ---------------------------------------------
   Timeline Item
--------------------------------------------- */
const TimelineItem = ({ year, children }) => {
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const number = parseInt(year);
  const suffix = year.replace(number, "");

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center w-full"
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2 inline-flex justify-center h-12 sm:h-16">
        {start ? (
          <CountUp end={number} suffix={suffix} duration={2.5} />
        ) : (
          <span>0{suffix}</span>
        )}
      </span>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
        {children}
      </p>
    </div>
  );
};

/* ---------------------------------------------
   About Us Page
--------------------------------------------- */
const Aboutus = () => {
  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ================= HERO ================= */}

      {/* MOBILE / TABLET LAYOUT (< 1024px) */}
      <div className="flex flex-col lg:hidden min-h-screen w-full">
        <div className="flex flex-col justify-center items-center text-center px-6 py-16 bg-gray-50 flex-grow">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4 leading-tight">
            IEEE PCS
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Professional Communication Society – Bridging the gap between
            technical expertise and professional expression.
          </p>
          <button
            onClick={scrollToContact}
            className="mt-8 px-6 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition shadow-lg"
          >
            Get Involved
          </button>
        </div>

        {/* SwapSection takes remaining space or own height */}
        <div className="w-full">
          <SwapSection />
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= 1024px) */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left Column */}
        <div className="bg-gray-50 flex justify-center items-center p-12 xl:p-20">
          <div className="text-left">
            <h1 className="text-6xl xl:text-8xl font-bold text-black mb-6 tracking-tight">
              IEEE PCS
            </h1>
            <p className="text-xl xl:text-2xl text-gray-600 max-w-lg leading-relaxed">
              Professional Communication Society – Bridging the gap between
              technical expertise and professional expression.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-2 h-full">
          {/* Top Half: CTA */}
          <div className="bg-gray-100 flex justify-center items-center p-10 xl:p-16">
            <div className="text-center max-w-md">
              <h2 className="text-3xl xl:text-4xl font-bold text-gray-800 mb-4">
                Join Our Community
              </h2>
              <p className="text-base xl:text-lg text-gray-600 mb-8">
                Become part of a vibrant community of engineers and communicators.
              </p>
              <button
                onClick={scrollToContact}
                className="px-8 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 hover:scale-105 transition transform duration-300"
              >
                Get Involved
              </button>
            </div>
          </div>

          {/* Bottom Half: Component */}
          <div className="w-full h-full relative overflow-hidden">
             {/* Ensure parent has explicit dimensions if SwapSection relies on % */}
            <SwapSection />
          </div>
        </div>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="relative w-full py-20 px-4 sm:px-8 overflow-hidden   bg-white">
        {/* Background Watermark */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-center items-center select-none">
          <span className="text-[20vw] font-extrabold text-black whitespace-nowrap">
            IEEE PCS
          </span>
        </div>

        {/* Stats Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4">
            <TimelineItem year="250+">Members</TimelineItem>
            <TimelineItem year="80+">Events</TimelineItem>
            <TimelineItem year="150+">Workshops</TimelineItem>
            <TimelineItem year="30+">Sponsors</TimelineItem>
          </div>
        </div>
      </div>

      {/* ================= RETHINKING ================= */}
      <div className="w-full mt-5 ">
        <RethinkingSection />
      </div>

    </div>
  );
};

export default Aboutus;
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SwapSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,          
        once: false,       
      },
    })
    .to(leftRef.current, {
      backgroundColor: '#ffffff',
      color: '#000000',
      ease: 'none',
    }, 0)
    .to(rightRef.current, {
      backgroundColor: '#000000',
      color: '#ffffff',
      ease: 'none',
    }, 0);
  }, sectionRef);

  return () => ctx.revert();
}, []);


  return (
    <div
      ref={sectionRef}
      className="w-full min-h-[50vh] grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left */}
      <div
        ref={leftRef}
        className="p-10 flex flex-col justify-center bg-black text-white"
      >
        <h1 className="text-5xl font-extrabold uppercase tracking-wider">
          Over a Decade <br /> in the <br /> Making
        </h1>
        <span className="mt-4 text-xs tracking-widest opacity-70">
          SINCE 2013
        </span>
      </div>

      {/* Right */}
      <div
        ref={rightRef}
        className="p-10 flex items-center justify-center bg-white text-gray-900"
      >
        <p className="max-w-md text-sm leading-relaxed">
          The core objective of IEEE-PCS is to help engineers communicate technical
          concepts effectively in their workplaces. It emphasizes developing strong
          verbal and non-verbal communication skills.
        </p>
      </div>
    </div>
  );
};

export default SwapSection;

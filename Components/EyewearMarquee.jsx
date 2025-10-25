import React from 'react'

const EyewearMarquee = () => (
  <div className="w-full bg-black text-gray-400 py-4 sm:py-6 md:py-8 overflow-hidden">
    <div className="flex animate-marquee">
      <div className="flex-shrink-0 flex items-center whitespace-nowrap">
        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wider sm:tracking-widest px-4">
          IEEE PROFESSIONAL COMMUNICATION SOCIETY
        </span>
      </div>
      <div className="flex-shrink-0 flex items-center whitespace-nowrap">
        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wider sm:tracking-widest px-4">
          IEEE PROFESSIONAL COMMUNICATION SOCIETY
        </span>
      </div>
      <div className="flex-shrink-0 flex items-center whitespace-nowrap">
        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wider sm:tracking-widest px-4">
          IEEE PROFESSIONAL COMMUNICATION SOCIETY
        </span>
      </div>
      <div className="flex-shrink-0 flex items-center whitespace-nowrap">
        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-wider sm:tracking-widest px-4">
          IEEE PROFESSIONAL COMMUNICATION SOCIETY
        </span>
      </div>
    </div>
    
    <style>{`
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      
      @media (max-width: 640px) {
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      }
    `}</style>
  </div>
);

export default EyewearMarquee
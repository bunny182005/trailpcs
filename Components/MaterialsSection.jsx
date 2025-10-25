import React from "react";

const MaterialsSection = () => (
  <>
    {/* --- BOTTOM MARQUEE --- */}
    <div className="w-full bg-black text-white py-4 sm:py-5 md:py-6 flex overflow-hidden">
      <div className="flex-shrink-0 flex items-center animate-marquee whitespace-nowrap">
        {[...Array(20)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider sm:tracking-widest mx-2 sm:mx-3 md:mx-4">
              IEEE PCS
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-light mx-2 sm:mx-3 md:mx-4">*</span>
          </React.Fragment>
        ))}
      </div>
    </div>

   

    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 25s linear infinite;
      }
      
      @media (max-width: 640px) {
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      }
    `}</style>
  </>
);

export default MaterialsSection;
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

    <div className="relative w-full bg-[#f7f7f7] text-black px-4 sm:px-6 md:px-8 lg:px-12 mt-16 sm:mt-24 md:mt-32 lg:mt-44 py-12 sm:py-14 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative">
        {/* --- LEFT COLUMN (IMAGES) --- */}
        <div className="relative w-full mb-8 md:mb-0">
          {/* Top sunglasses image */}
          <div className="relative w-full sm:w-[90%] md:w-[85%]">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1760&auto=format&fit=crop"
              alt="Premium sunglasses"
              className="w-full h-auto object-cover grayscale"
            />
          </div>

          {/* Overlapping model photo */}
          <div className="absolute top-[45%] sm:top-[48%] md:top-[50%] left-[25%] sm:left-[28%] md:left-[29.5%] w-[70%] sm:w-[68%] md:w-[70%] shadow-xl md:shadow-2xl border-[15px] sm:border-[20px] md:border-[30px] border-white z-20">
            <img
              src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1760&auto=format&fit=crop"
              alt="Model"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom black square */}
          <div className="absolute -bottom-[20%] sm:-bottom-[25%] md:-bottom-[27%] left-[8%] sm:left-[9%] md:left-[10%] w-[35%] sm:w-[36%] md:w-[38%] aspect-square bg-black z-0"></div>
        </div>

        {/* --- RIGHT COLUMN (TEXTS) --- */}
        <div className="flex flex-col justify-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 mt-8 md:mt-0">
          {/* Premium Materials */}
          <div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-3 sm:mb-4 ml-2 sm:ml-3 md:ml-3.5 leading-none"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              Premium Materials
            </h2>
            <p className="text-gray-800 text-xs sm:text-sm md:text-base ml-2 sm:ml-3 md:ml-3.5 leading-relaxed max-w-sm">
              Titanium, acetate, and gold — responsibly sourced and meticulously
              selected for enduring quality.
            </p>
          </div>

          {/* Heritage Style */}
          <div className="relative">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-3 sm:mb-4 ml-2 sm:ml-3 md:ml-3.5 leading-none"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              Heritage Style
            </h2>
            <p className="text-gray-800 ml-2 sm:ml-3 md:ml-3.5 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm">
              Classic meets modern aesthetics in designs that honor tradition
              while defining contemporary elegance.
            </p>

            <span className="absolute left-0 mt-4 sm:mt-5 md:mt-6 text-4xl sm:text-5xl md:text-6xl font-light">*</span>
          </div>

          {/* Timeless Design */}
          <div className="bg-black text-white p-6 sm:p-7 md:p-8 lg:p-10 mt-3 sm:mt-4 md:mt-6 lg:mt-8 w-full sm:w-[95%] md:w-[90%]">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase mb-3 sm:mb-4 leading-none"
              style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                letterSpacing: "-0.02em",
              }}
            >
              Timeless Design
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm">
              Created to be collected, not discarded. Our pieces transcend
              seasonal trends to become lasting signatures.
            </p>
          </div>
        </div>
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
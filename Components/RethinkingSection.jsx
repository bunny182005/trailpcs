import React from 'react';

const RethinkingSection = () => {
  const carouselImages = [
    "/logo.png",
    "/logo.png",
    "/bglogo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/bglogo.png",
    "/logo.png",
  ];

  return (
    <div className="w-full bg-neutral-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col items-center text-center relative overflow-hidden">
      
      {/* Quote */}
      <h2 className="relative z-10 mt-16 sm:mt-24 md:mt-32 lg:mt-36 mb-24 sm:mb-32 md:mb-44 lg:mb-56 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-black leading-tight tracking-wide max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-4">
        &ldquo;WE ARE IEEEPCS<br /> 
        IDEAS MADE CLEAR<br /> 
        DESIGNED COMMUNICATION<br /> 
        ENGINEERED FOR IMPACT&rdquo;
      </h2>

      {/* Image Carousel */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12 sm:mb-16 md:mb-20 lg:mb-24 justify-start md:justify-center px-4 md:px-0">
          {carouselImages.map((imageSrc, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-gray-300 border border-gray-400 flex items-center justify-center text-gray-600 text-xl font-bold shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={imageSrc}
                alt={`Carousel image ${index + 1}`} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default RethinkingSection;
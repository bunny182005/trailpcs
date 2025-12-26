import React, { useState, useEffect, useRef } from 'react';
import Shuffle from './Shuffle';
import VariableProximity from './VariableProximity';

// SOTY Component
const SOTYContent = ({ containerRef }) => {
  const revolvingImages = [
    '/Black_colour.jpg', '/Black_colour.jpg', '/Black_colour.jpg', '/Black_colour.jpg',
    '/Black_colour.jpg', '/Black_colour.jpg', '/Black_colour.jpg', '/Black_colour.jpg',
  ];

  const descriptionText =
    'The "Student of the Year" was an exciting two-day event where participants faced a gauntlet of challenges. They competed in a scavenger hunt, an obstacle course, trivia night, and a talent show to test their diverse abilities. These activities were designed to test both mental and physical skills to prove who was the most well-rounded. The one participant who excelled in all areas was ultimately crowned "Student of the Year."';

  return (
    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8">
      <h1 className="text-[15vw] font-bold mb-8 flex items-center justify-center leading-none">
        <span className="mr-8">S</span>
        <div className="relative w-[12vw] h-[12vw] mx-4">
          {revolvingImages.map((image, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[3vw] h-[3vw] rounded-full overflow-hidden border-2 border-white shadow-lg"
              style={{
                animation: `revolve 8s linear infinite`,
                animationDelay: `${index * -1}s`,
              }}
            >
              <img
                src={image}
                alt={`Revolving ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <span className="ml-8">TY</span>
      </h1>

      <VariableProximity
        label={descriptionText}
        containerRef={containerRef}
        className="text-xl mb-8 mt-8 max-w-2xl mx-auto block"
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        radius={100}
        falloff="linear"
      />

      <style>{`
        @keyframes revolve {
          0% {
            transform: rotate(0deg) translate(5vw) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translate(5vw) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

// PlaceIt Component
const PlaceItContent = () => {
  return (
    <div className="text-center w-full h-full flex flex-col items-center justify-center p-8">
        <div className='text-[15vw] font-bold mb-8'>
            <h1>Placeit</h1>
        </div>
      

      <p className="text-xl mb-8 max-w-2xl mx-auto">
        "Place-It" is a premier event that bridges the gap between students and leading figures in the EdTech industry. It's centered around insightful discussions and features a dynamic Ideathon, challenging participants to bring innovative educational ideas to life. This event provides a vital opportunity for attendees to learn from experts, connect with pioneers, and play an active role in shaping the future of education technology.
      </p>
    </div>
  );
};

export default function Creative() {
  const [currentEvent, setCurrentEvent] = useState(0); // 0 = SOTY, 1 = PlaceIt
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset progress when event changes
    setProgress(0);
    
    // Switch events every 10 seconds
    const eventInterval = setInterval(() => {
      setCurrentEvent(prev => (prev === 0 ? 1 : 0));
    }, 10000);

    // Update progress every 100ms
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 1; // 100 steps in 10 seconds = 100ms per step
      });
    }, 100);

    return () => {
      clearInterval(eventInterval);
      clearInterval(progressInterval);
    };
  }, [currentEvent]);

  return (
    <div className='w-full '>
        <h2 className=" flex justify-center items-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-800 mb-11 md:mb-8">
        OUR FLAGSHIP EVENTS
        </h2>



    
    



    
    <div className="flex w-full mb-36 h-[700px] gap-4">
        
      {/* Left side gaps - different width containers */}
      <div className="flex flex-col gap-4 w-48">
        <div className="bg-gray-800 h-64 rounded-2xl"></div>
        <div className="bg-gray-700 flex-1 rounded-2xl"></div>
      </div>
      
      {/* Center main container with SVG progress border */}
      <div 
        ref={containerRef}
        className="relative flex-1 rounded-3xl overflow-hidden bg-white"
      >
        {/* SVG Progress Border */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 10 }}
        >
          {/* Background gray border */}
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="24"
            ry="24"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="4"
          />
          {/* Animated black progress border */}
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="24"
            ry="24"
            fill="none"
            stroke="#000"
            strokeWidth="4"
            strokeDasharray="2000"
            strokeDashoffset={2000 - (progress * 20)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        {/* Fade transition between events */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentEvent === 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <SOTYContent containerRef={containerRef} />
        </div>
        
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentEvent === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <PlaceItContent />
        </div>
      </div>
      
      {/* Right side gaps - different width containers */}
      <div className="flex flex-col gap-4 w-64">
        <div className="bg-gray-700 h-80 rounded-2xl"></div>
        <div className="bg-gray-800 h-48 rounded-2xl"></div>
        <div className="bg-gray-600 flex-1 rounded-2xl"></div>
      </div>
    </div>
    </div>
  );
}
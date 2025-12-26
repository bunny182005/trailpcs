import React, { useState, useEffect } from 'react';

export default function GrayscaleReveal() {
  const [stripPosition, setStripPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // Replace this with your actual image URL
  const imageUrl = "../public/ieeepcsmain.png";
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStripPosition(prev => {
        const newPos = prev + (direction * 0.5);
        
        // Reverse direction at boundaries
        if (newPos >= 80) {
          setDirection(-1);
          return 80;
        } else if (newPos <= 0) {
          setDirection(1);
          return 0;
        }
        
        return newPos;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [direction]);
  
  const stripHeight = 150; // Height of the colored strip in pixels
  const containerHeight = 400; // Must match the height in className
  
  return (
    <div className="flex w-full mb-36 h-[700px] gap-4">
      {/* Left side gaps - different width containers */}
      <div className="flex flex-col gap-4 w-48">
        <div className="bg-gray-800 h-64 rounded-2xl"></div>
        <div className="bg-gray-700 flex-1 rounded-2xl"></div>
      </div>
      
      {/* Center main image container */}
      <div className="relative flex-1 border-2 rounded-3xl overflow-hidden">
        {/* Grayscale background image */}
        <div 
          className="absolute  w-full inset-0 bg-contain bg-center bg-no-repeat grayscale"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Colored strip that moves vertically */}
        {/* <div 
          className="absolute left-0 right-0 overflow-hidden"
          style={{ 
            top: `${stripPosition}%`,
            height: `${stripHeight}px`,
          }}
        >
          <div 
            className="absolute w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              width: '100%',
              height: `700px`,
              top: `${-(stripPosition / 100) * 700}px`,
              left: 0
            }}
          />
        </div> */}
      </div>
      
      {/* Right side gaps - different width containers */}
      <div className="flex flex-col gap-4 w-64">
        <div className="bg-gray-700 h-80 rounded-2xl"></div>
        <div className="bg-gray-800 h-48 rounded-2xl"></div>
        <div className="bg-gray-600 flex-1 rounded-2xl"></div>
      </div>
    </div>
  );
}

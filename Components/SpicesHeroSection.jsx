import React, { useEffect, useState } from 'react';

export default function SpicesHeroSection() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => (prev + 0.5) % 100);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* Main Content Area */}
      <div className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-52 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pb-12 sm:pb-16 md:pb-20">
        
        {/* Background Large Circle - Bottom Left (hidden on mobile) */}
        <div className="hidden md:block absolute bottom-16 md:bottom-24 lg:bottom-32 left-8 md:left-12 lg:left-20 w-[300px] md:w-[400px] lg:w-[550px] h-[300px] md:h-[400px] lg:h-[550px] bg-white/10 rounded-full"></div>

        {/* Main Content Card */}
        <div className="relative bg-[#ececec] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
          
          {/* Top Right White Circle - Responsive animation */}
          <div 
            className="absolute top-8 sm:top-12 md:top-16 lg:top-20 right-8 sm:right-16 md:right-24 lg:right-32 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-white rounded-full shadow-lg"
            style={{ 
              transform: `translateY(${Math.sin(position * 0.05) * 40}px)`,
              animation: 'floatUp 6s ease-in-out infinite'
            }}
          ></div>
          
          {/* Bottom Center Large White Circle */}
          <div 
            className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 left-1/4 sm:left-1/3 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-white/60 rounded-full shadow-lg"
            style={{ 
              transform: `translateY(${Math.sin(position * 0.03) * 60}px)`,
              animation: 'floatUp 8s ease-in-out infinite'
            }}
          ></div>
          
          {/* Additional floating white circle */}
          <div 
            className="hidden sm:block absolute top-20 sm:top-32 md:top-40 left-1/2 w-32 sm:w-40 md:w-48 lg:w-60 h-32 sm:h-40 md:h-48 lg:h-60 bg-white/80 rounded-full shadow-lg"
            style={{ 
              transform: `translateY(${Math.sin(position * 0.04) * 50}px)`,
              animation: 'floatUp 7s ease-in-out infinite 1s'
            }}
          ></div>
          
          {/* Main Heading */}
          <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
            <h1 
              className="text-[#ff6b4a] font-bold leading-[0.88] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
              style={{letterSpacing: '-0.025em'}}
            >
              At the Forefront<br />
              of Food Sobriety
            </h1>
            
            {/* Description */}
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 max-w-3xl">
              {/* Divider */}
              <div className="w-full h-px bg-[#ff6b4a]/30 my-4 sm:my-6 md:my-8"></div>
            </div>
          </div>

          {/* Globe Image - Positioned at left edge */}
          <div 
            className="absolute bottom-0 -left-24 sm:-left-32 md:-left-40 lg:-left-48 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[600px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]" 
            style={{ transform: 'translateY(30%) sm:translateY(35%) md:translateY(40%)' }}
          >
            <img
              src="/Globe-5.png" 
              alt="Wireframe globe"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-30px);
          }
          50% {
            transform: translateY(-60px);
          }
          75% {
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
}
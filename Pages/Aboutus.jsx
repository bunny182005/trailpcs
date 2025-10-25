import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import EyewearMarquee from '../Components/EyewearMarquee.jsx';
import MaterialsSection from '../Components/MaterialsSection.jsx';
import RethinkingSection from '../Components/RethinkingSection.jsx';
import LetsTalk from '../Components/LetsTalk.jsx';
import Crazy from '../Components/Crazy.jsx';
import SpicesHeroSection from '../Components/SpicesHeroSection.jsx';

// Scroll Animation Trigger (unchanged)
const TriggerOnScroll = ({ children }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all ease-out duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

// TimelineItem component
const TimelineItem = ({ year, children }) => {
  const number = parseInt(year);
  const suffix = year.replace(number, '');

  return (
    <div className="flex flex-col items-center text-center max-w-[100px] sm:max-w-[120px] md:max-w-[150px]  lg:max-w-[200px]">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2 sm:mb-3 w-24 sm:w-32 md:w-40 inline-flex justify-center">
        <CountUp
          end={number}
          suffix={suffix}
          duration={5}      
          enableScrollSpy   
          scrollSpyDelay={300} 
          scrollSpyOnce={true}
        />
      </span>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-1">{children}</p>
    </div>
  );
};

const Aboutus = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      
      {/* Fixed Hero Section - Responsive */}
      <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0'>
        
        {/* Left Side - IEEE PCS */}
        <div className='bg-gray-50 flex flex-col justify-center items-center p-6 sm:p-8 md:p-12 lg:p-16 min-h-[50vh] lg:min-h-screen'>
          <div className="text-center">
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-4 sm:mb-6 md:mb-8'>
              IEEE PCS
            </h1>
            <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-md px-4'>
              Professional Communication Society - Bridging the gap between technical expertise and professional expression.
            </p>
          </div>
        </div>
        
        {/* Right Side - Split into two sections */}
        <div className='grid grid-rows-1  min-h-[50vh] lg:h-screen'>
          {/* Top Section */}
          <div className='bg-gray-100 flex justify-center items-center p-6 sm:p-8 md:p-10 lg:p-8 min-h-[300px]'>
            <div className='text-center max-w-md'>
              <h2 className='text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4'>
                Join Our Community
              </h2>
              <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4'>
                Become part of a vibrant community of engineers and communicators working together to enhance professional communication in the tech industry.
              </p>
              <button className='px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white rounded-lg hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 font-medium text-sm sm:text-base'>
                Get Involved
              </button>
            </div>
          </div>
          {/* Bottom Section - Canvas */}
          
        </div>
      </div>

      {/* Timeline Section - Responsive */}
      <div className="relative w-full bg-white text-black py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.05] sm:opacity-[0.06] md:opacity-[0.07] flex items-center justify-center overflow-hidden">
          <span className="text-[15vw] sm:text-[16vw] md:text-[18vw] font-extrabold text-gray-800 whitespace-nowrap">IEEE PCS</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-8 sm:gap-6 md:gap-8">
          <TimelineItem year="250+">
            Members
          </TimelineItem>
          <div className="hidden sm:block w-px h-16 sm:h-20 md:h-24 bg-gray-300"></div>
          <TimelineItem year="80+">
            Events
          </TimelineItem>
          <div className="hidden sm:block w-px h-16 sm:h-20 md:h-24 bg-gray-300"></div>
          <TimelineItem year="150+">
            Workshops
          </TimelineItem>
          <div className="hidden sm:block w-px h-16 sm:h-20 md:h-24 bg-gray-300"></div>
          <TimelineItem year="30+">
            Sponsors
          </TimelineItem>
        </div>
      </div>

      {/* Half a Century Section - Responsive */}
      <div className="w-full bg-neutral-100 flex items-center justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-black text-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wider uppercase mb-6 sm:mb-8">
              HALF A CENTURY <br /> IN THE <br /> MAKING
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
              The core objective of IEEE-PCS is to help engineers communicate technical concepts effectively in their workplaces.
              It emphasizes developing strong verbal and non-verbal communication skills.<br />
              Through this, IEEE-PCS bridges the gap between technical expertise and professional expression.
            </p>
          </div>

          <div className="relative bg-white p-4 sm:p-6 md:p-6 lg:p-8 flex items-center justify-center overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-0">
            <div className="relative border border-gray-200 p-2 sm:p-3 lg:p-5">
              <img
                src="https://via.placeholder.com/450x450?text=IEEE+PCS"
                alt="IEEE PCS"
                className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[450px] h-auto object-cover grayscale"
              />
            </div>
            <div
              className="hidden sm:block absolute top-0 right-0 w-60 sm:w-64 md:w-72 lg:w-80 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-black text-white text-[10px] sm:text-xs font-bold uppercase py-1.5 sm:py-2 px-12 sm:px-16 md:px-20 text-center tracking-widest whitespace-nowrap italic" 
              style={{ 
                right: '-80px', 
                top: '50px' 
              }}
            >
              IEEE PCS
            </div>
          </div>
        </div>
      </div>
      
      {/* Lets Talk Section - Responsive */}
      <div className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className='w-full'>
            <TriggerOnScroll>
              <LetsTalk />
            </TriggerOnScroll>
          </div>
        </div>
      </div>

      {/* Other sections - Already responsive */}
      <SpicesHeroSection />
      <MaterialsSection />
      <RethinkingSection />
      <EyewearMarquee />
      
    </div>
  );
}

export default Aboutus;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const flagshipRef = useRef(null);
  const navigate = useNavigate();

  // Check if we're returning from a detail page
  useEffect(() => {
    const isReturningFromDetail = sessionStorage.getItem('returningFromEventDetail');
    if (isReturningFromDetail) {
      sessionStorage.removeItem('returningFromEventDetail');
      setTimeout(() => {
        if (flagshipRef.current) {
          window.scrollTo({
            top: flagshipRef.current.offsetTop,
            behavior: 'instant'
          });
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKnowMore = (page) => {
    sessionStorage.setItem('returningFromEventDetail', 'true');
    navigate(`/events/${page}`);
  };

  const leftColumnAwards = [
    { id: 1, title: 'Site of the Day', imgSrc: '/images/event1.jpg', date: 'Mar 04, 2020' },
    { id: 2, title: 'Developer Award', imgSrc: '/images/event2.jpg', date: 'Feb 25, 2022' },
    { id: 3, title: 'Best Design', imgSrc: '/images/event3.jpg', date: 'Jun 12, 2021' },
    { id: 4, title: 'Innovation Award', imgSrc: '/images/event4.jpg', date: 'Aug 20, 2022' },
    { id: 5, title: 'Digital Award', imgSrc: '/images/event5.jpg', date: 'Dec 10, 2021' },
  ];

  const centerColumnAwards = [
    { id: 6, title: 'FWA of the Day', imgSrc: '/images/event6.jpg', date: 'Dec 06' },
    { id: 7, title: 'Mobile Excellence', imgSrc: '/images/event7.jpg', date: 'Feb 25, 2020' },
    { id: 8, title: 'UX Excellence', imgSrc: '/images/event8.jpg', date: 'Mar 15, 2021' },
    { id: 9, title: 'Creative Award', imgSrc: '/images/event9.jpg', date: 'Sep 10, 2022' },
    { id: 10, title: 'Web Excellence', imgSrc: '/images/event10.jpg', date: 'Jan 05, 2022' },
  ];

  const rightColumnAwards = [
    { id: 11, title: 'Website of the Day', imgSrc: '/images/event11.jpg', date: 'Feb 25, 2022' },
    { id: 12, title: 'Best Innovation', imgSrc: '/images/event12.jpg', date: 'Jan 15, 2023' },
    { id: 13, title: 'Digital Excellence', imgSrc: '/images/event13.jpg', date: 'Apr 08, 2021' },
    { id: 14, title: 'Web Award', imgSrc: '/images/event14.jpg', date: 'Nov 30, 2022' },
    { id: 15, title: 'Design Award', imgSrc: '/images/event15.jpg', date: 'May 18, 2021' },
  ];

  const flagshipEvents = [
    {
      id: 1,
      title: 'Placeit',
      imgSrc: '/images/placeit-poster.jpg',
      description: 'Our premier design and innovation event',
      page: 'placeit'
    },
    {
      id: 2,
      title: 'SOTY',
      imgSrc: '/images/soty-poster.jpg',
      description: 'Site of the Year celebration',
      page: 'soty'
    }
  ];

  const getTextStyle = () => {
    const textFadeIn = 0.05;
    const textFadeOut = 0.2;
    
    if (scrollY < textFadeIn) {
      return { opacity: scrollY / textFadeIn, transform: 'scale(0.9)', pointerEvents: 'auto' };
    }
    if (scrollY > textFadeOut) {
      const fadeProgress = (scrollY - textFadeOut) / 0.1;
      return { 
        opacity: Math.max(0, 1 - fadeProgress), 
        transform: `scale(${1 - fadeProgress * 0.1})`, 
        pointerEvents: 'none' 
      };
    }
    return { opacity: 1, transform: 'scale(1)', pointerEvents: 'auto' };
  };

  const getPosterStyle = (index, column) => {
    const animStart = 0.3;
    
    if (scrollY < animStart) {
      if (column === 'center') {
        return { opacity: 0, transform: 'translateY(50vh)', pointerEvents: 'none' };
      }
      return { opacity: 0, transform: 'translateY(-50vh)', pointerEvents: 'none' };
    }
    
    const adjustedProgress = (scrollY - animStart) / (1 - animStart);
    const phase1End = 0.45;
    const phase2End = 0.70;
    const phase3End = 0.95;
    
    if (index < 3) {
      const posterDuration = phase1End / 3;
      const posterStart = index * posterDuration;
      const posterEnd = (index + 1) * posterDuration;
      
      if (adjustedProgress < posterStart) {
        if (column === 'center') {
          return { opacity: 0, transform: 'translateY(100vh)', pointerEvents: 'none' };
        }
        return { opacity: 0, transform: 'translateY(-100vh)', pointerEvents: 'none' };
      }
      
      if (adjustedProgress < posterEnd) {
        const localProgress = (adjustedProgress - posterStart) / posterDuration;
        
        if (column === 'center') {
          const translateY = 50 - (localProgress * 100);
          return { opacity: 1, transform: `translateY(${translateY}vh)`, pointerEvents: 'auto' };
        } else {
          const translateY = -50 + (localProgress * 100);
          return { opacity: 1, transform: `translateY(${translateY}vh)`, pointerEvents: 'auto' };
        }
      }
      
      const exitProgress = (adjustedProgress - posterEnd) / 0.1;
      const easedExit = Math.min(1, exitProgress);
      
      if (column === 'left') {
        return { opacity: 1, transform: `translate(-${easedExit * 100}vw, 50vh)`, pointerEvents: 'none' };
      } else if (column === 'center') {
        return { opacity: 1, transform: `translateY(-${50 + easedExit * 100}vh)`, pointerEvents: 'none' };
      } else if (column === 'right') {
        return { opacity: 1, transform: `translate(${easedExit * 100}vw, 50vh)`, pointerEvents: 'none' };
      }
    }
    
    if (index >= 3) {
      if (adjustedProgress < phase2End) {
        const alignStart = phase1End;
        const alignDuration = phase2End - phase1End;
        
        if (adjustedProgress < alignStart) {
          if (column === 'center') {
            return { opacity: 0, transform: 'translateY(50vh)', pointerEvents: 'none' };
          }
          return { opacity: 0, transform: 'translateY(-50vh)', pointerEvents: 'none' };
        }
        
        const poster3Duration = alignDuration * 0.6;
        const poster4Start = alignStart + poster3Duration;
        const poster4Duration = alignDuration * 0.4;
        
        if (index === 3) {
          const poster3Progress = (adjustedProgress - alignStart) / poster3Duration;
          const easedProgress = 1 - Math.pow(1 - Math.min(1, poster3Progress), 3);
          const spacing = 25;
          const targetY = -spacing;
          
          if (column === 'center') {
            const startY = 50;
            const translateY = startY - (startY - targetY) * easedProgress;
            return { opacity: easedProgress, transform: `translateY(${translateY}vh)`, pointerEvents: easedProgress > 0.5 ? 'auto' : 'none' };
          } else {
            const startY = -50;
            const translateY = startY - (startY - targetY) * easedProgress;
            return { opacity: easedProgress, transform: `translateY(${translateY}vh)`, pointerEvents: easedProgress > 0.5 ? 'auto' : 'none' };
          }
        }
        
        if (index === 4) {
          if (adjustedProgress < poster4Start) {
            if (column === 'center') {
              return { opacity: 0, transform: 'translateY(50vh)', pointerEvents: 'none' };
            }
            return { opacity: 0, transform: 'translateY(-50vh)', pointerEvents: 'none' };
          }
          
          const poster4Progress = (adjustedProgress - poster4Start) / poster4Duration;
          const easedProgress = 1 - Math.pow(1 - Math.min(1, poster4Progress), 3);
          const spacing = 25;
          const targetY = spacing;
          
          if (column === 'center') {
            const startY = 50;
            const translateY = startY - (startY - targetY) * easedProgress;
            return { opacity: easedProgress, transform: `translateY(${translateY}vh)`, pointerEvents: easedProgress > 0.5 ? 'auto' : 'none' };
          } else {
            const startY = -50;
            const translateY = startY - (startY - targetY) * easedProgress;
            return { opacity: easedProgress, transform: `translateY(${translateY}vh)`, pointerEvents: easedProgress > 0.5 ? 'auto' : 'none' };
          }
        }
      }
      
      if (adjustedProgress < phase3End) {
        const fadeStart = phase2End;
        const fadeDuration = phase3End - phase2End;
        const poster3FadeDuration = fadeDuration * 0.5;
        const poster4FadeStart = fadeStart + poster3FadeDuration * 0.3;
        const poster4FadeDuration = fadeDuration * 0.7;
        
        if (index === 3) {
          const fadeProgress = (adjustedProgress - fadeStart) / poster3FadeDuration;
          const easedFade = Math.min(1, fadeProgress);
          const spacing = 25;
          const initialY = -spacing;
          
          if (column === 'left') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translate(-${easedFade * 100}vw, ${initialY}vh)`, pointerEvents: 'none' };
          } else if (column === 'center') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translateY(${initialY - easedFade * 100}vh)`, pointerEvents: 'none' };
          } else if (column === 'right') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translate(${easedFade * 100}vw, ${initialY}vh)`, pointerEvents: 'none' };
          }
        }
        
        if (index === 4) {
          if (adjustedProgress < poster4FadeStart) {
            const spacing = 25;
            const initialY = spacing;
            return { opacity: 1, transform: `translateY(${initialY}vh)`, pointerEvents: 'auto' };
          }
          
          const fadeProgress = (adjustedProgress - poster4FadeStart) / poster4FadeDuration;
          const easedFade = Math.min(1, fadeProgress);
          const spacing = 25;
          const initialY = spacing;
          
          if (column === 'left') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translate(-${easedFade * 100}vw, ${initialY}vh)`, pointerEvents: 'none' };
          } else if (column === 'center') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translateY(${initialY + easedFade * 100}vh)`, pointerEvents: 'none' };
          } else if (column === 'right') {
            return { opacity: Math.max(0, 1 - easedFade), transform: `translate(${easedFade * 100}vw, ${initialY}vh)`, pointerEvents: 'none' };
          }
        }
      }
      return { opacity: 0, pointerEvents: 'none', display: 'none' };
    }
    return { opacity: 0, pointerEvents: 'none', display: 'none' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll Animation Section - Hidden on mobile */}
      <div ref={containerRef} className="hidden lg:block relative min-h-[600vh] bg-gray-50">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-700"
            style={getTextStyle()}
          >
            <div className="max-w-4xl mx-auto px-8 text-center">
              <button className="px-6 py-3 bg-gray-800 text-white rounded-full text-sm font-medium mb-12">
                Events
              </button>
              <h2 className="text-5xl md:text-6xl font-light leading-tight">
                To truly stand out, you have to break away from the ordinary.
              </h2>
            </div>
          </div>

          <div className="absolute inset-0 flex gap-24 items-center justify-center px-16">
            <div className="relative w-80 h-96">
              {leftColumnAwards.map((award, index) => (
                <div
                  key={award.id}
                  className="absolute inset-0 transition-all duration-700 ease-out will-change-transform"
                  style={getPosterStyle(index, 'left')}
                >
                  <div className="relative rounded-lg shadow-xl h-full overflow-hidden">
                    <img src={award.imgSrc} alt={award.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <div className="text-xs font-medium mb-2">W.</div>
                        <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                        <p className="text-sm mb-1">{award.date}</p>
                        <p className="text-xs opacity-90">Neondoor.</p>
                      </div>
                      <div className="text-xs opacity-75">By Cappen</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-80 h-96">
              {centerColumnAwards.map((award, index) => (
                <div
                  key={award.id}
                  className="absolute inset-0 transition-all duration-700 ease-out will-change-transform"
                  style={getPosterStyle(index, 'center')}
                >
                  <div className="relative rounded-lg shadow-xl h-full overflow-hidden">
                    <img src={award.imgSrc} alt={award.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <div className="text-xs font-medium mb-2">W.</div>
                        <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                        <p className="text-sm mb-1">{award.date}</p>
                        <p className="text-xs opacity-90">Neondoor.</p>
                      </div>
                      <div className="text-xs opacity-75">By Cappen</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-80 h-96">
              {rightColumnAwards.map((award, index) => (
                <div
                  key={award.id}
                  className="absolute inset-0 transition-all duration-700 ease-out will-change-transform"
                  style={getPosterStyle(index, 'right')}
                >
                  <div className="relative rounded-lg shadow-xl h-full overflow-hidden">
                    <img src={award.imgSrc} alt={award.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <div className="text-xs font-medium mb-2">W.</div>
                        <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                        <p className="text-sm mb-1">{award.date}</p>
                        <p className="text-xs opacity-90">Neondoor.</p>
                      </div>
                      <div className="text-xs opacity-75">By Cappen</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header - Visible only on mobile */}
      <div className="lg:hidden min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white rounded-full text-xs sm:text-sm font-medium mb-8 sm:mb-12">
            Events
          </button>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight">
            To truly stand out, you have to break away from the ordinary.
          </h2>
        </div>
      </div>

      {/* Flagship Events Section - Responsive */}
      <div ref={flagshipRef} className="min-h-screen flex flex-col justify-center bg-white px-4 sm:px-6 md:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 text-center mb-8 sm:mb-12 md:mb-16">
          Our flagship Events
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-16 max-w-7xl mx-auto w-full">
          {flagshipEvents.map((event) => (
            <div key={event.id} className="flex flex-col items-center w-full max-w-sm">
              <div className="relative w-full aspect-[4/5] rounded-lg shadow-xl overflow-hidden mb-4 sm:mb-6">
                <img
                  src={event.imgSrc}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between text-white">
                  <div>
                    <div className="text-xs font-medium mb-2">Flagship</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{event.description}</p>
                  </div>
                  <div className="text-xs opacity-75">Premium Event</div>
                </div>
              </div>
              <button
                onClick={() => handleKnowMore(event.page)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gray-800 text-white rounded-full text-base sm:text-lg font-medium hover:bg-gray-700 transition-colors w-full sm:w-auto"
              >
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
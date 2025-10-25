import React, { useState, useEffect } from 'react';
import Past from '../Components/past';

const Team = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('team-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        const multiplier = 0.20;
        
        if (sectionTop < windowHeight && sectionTop > 0) {
          setScrollY((windowHeight - sectionTop) * multiplier);
        } else if (sectionTop <= 0) {
          setScrollY(windowHeight * multiplier);
        } else {
          setScrollY(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop 4-column layout
  const teamMembers = {
    column1: [
      { name: 'Pratham Lal', role: 'ChairPerson', imgSrc: '/2025/placeholder1.jpg', bgColor: 'blue' },
      { name: 'Aditya Bramhe', role: 'Design Head', imgSrc: '/2025/placeholder2.jpg', bgColor: 'blue' },
      { name: 'Greeshma', role: 'Editorial Head', imgSrc: '/2025/placeholder3.jpg', bgColor: 'darkblue' },
    ],
    column2: [
      { name: 'Prashast Awasthi', role: 'Vice-ChairPerson', imgSrc: '/2025/placeholder4.jpg', bgColor: 'navy' },
      { name: 'Vidhi Yadav', role: 'Events Head', imgSrc: '/2025/placeholder5.jpg', bgColor: 'green' },
    ],
    column3: [
      { name: 'Sahil Sureka', role: 'Secretary', imgSrc: '/2025/placeholder6.jpg', bgColor: 'black' },
      { name: 'Karthikeya', role: 'Technical Head', imgSrc: '/2025/placeholder7.jpg', bgColor: 'purple' },
      { name: 'Akakshar Sharma', role: 'Management Head', imgSrc: '/2025/placeholder8.jpg', bgColor: 'purple' },
    ],
    column4: [
      { name: 'Aditya Khanna', role: 'Co-Secretary', imgSrc: '/2025/placeholder9.jpg', bgColor: 'olive' },
      { name: 'Aarti Chhabaria', role: 'P&M Head', imgSrc: '/2025/placeholder10.jpg', bgColor: 'indigo' },
    ],
  };

  // Tablet 2-column layout - Customize the order here
  const tabletMembers = {
    column1: [
      { name: 'Pratham Lal', role: 'ChairPerson', imgSrc: '/2025/placeholder1.jpg', bgColor: 'blue' },
      { name: 'Sahil Sureka', role: 'Secretary', imgSrc: '/2025/placeholder6.jpg', bgColor: 'black' },
      { name: 'Aditya Bramhe', role: 'Design Head', imgSrc: '/2025/placeholder2.jpg', bgColor: 'blue' },
      { name: 'Vidhi Yadav', role: 'Events Head', imgSrc: '/2025/placeholder5.jpg', bgColor: 'green' },
      { name: 'Greeshma', role: 'Editorial Head', imgSrc: '/2025/placeholder3.jpg', bgColor: 'darkblue' },
    ],
    column2: [
      { name: 'Prashast Awasthi', role: 'Vice-ChairPerson', imgSrc: '/2025/placeholder4.jpg', bgColor: 'navy' },
      { name: 'Aditya Khanna', role: 'Co-Secretary', imgSrc: '/2025/placeholder9.jpg', bgColor: 'olive' },
      { name: 'Karthikeya', role: 'Technical Head', imgSrc: '/2025/placeholder7.jpg', bgColor: 'purple' },
      { name: 'Aarti Chhabaria', role: 'P&M Head', imgSrc: '/2025/placeholder10.jpg', bgColor: 'indigo' },
      { name: 'Akakshar Sharma', role: 'Management Head', imgSrc: '/2025/placeholder8.jpg', bgColor: 'purple' },
    ],
  };

  // Mobile single column layout - Customize the order here
  const mobileMembers = [
    { name: 'Pratham Lal', role: 'ChairPerson', imgSrc: '/2025/placeholder1.jpg', bgColor: 'blue' },
    { name: 'Prashast Awasthi', role: 'Vice-ChairPerson', imgSrc: '/2025/placeholder4.jpg', bgColor: 'navy' },
    { name: 'Sahil Sureka', role: 'Secretary', imgSrc: '/2025/placeholder6.jpg', bgColor: 'black' },
    { name: 'Aditya Khanna', role: 'Co-Secretary', imgSrc: '/2025/placeholder9.jpg', bgColor: 'olive' },
    { name: 'Karthikeya', role: 'Technical Head', imgSrc: '/2025/placeholder7.jpg', bgColor: 'purple' },
    { name: 'Aditya Bramhe', role: 'Design Head', imgSrc: '/2025/placeholder2.jpg', bgColor: 'blue' },
    { name: 'Vidhi Yadav', role: 'Events Head', imgSrc: '/2025/placeholder5.jpg', bgColor: 'green' },
    { name: 'Aarti Chhabaria', role: 'P&M Head', imgSrc: '/2025/placeholder10.jpg', bgColor: 'indigo' },
    { name: 'Akakshar Sharma', role: 'Management Head', imgSrc: '/2025/placeholder8.jpg', bgColor: 'purple' },
    { name: 'Greeshma', role: 'Editorial Head', imgSrc: '/2025/placeholder3.jpg', bgColor: 'darkblue' },

    
  ];

  const getBackgroundColor = (color) => {
    const colors = {
      pink: 'bg-pink-100', blue: 'bg-blue-100', navy: 'bg-slate-100',
      green: 'bg-green-100', black: 'bg-purple-100', brown: 'bg-amber-100',
      olive: 'bg-emerald-100', darkblue: 'bg-indigo-100', purple: 'bg-violet-100',
      teal: 'bg-teal-100', rose: 'bg-rose-100', indigo: 'bg-indigo-100',
    };
    return colors[color] || 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-screen flex items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center">
          Scroll Down to See Team
        </h1>
      </div>

      <div id="team-section" className="relative py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Mobile View: Single Column */}
        <div className="block md:hidden">
          <div className="space-y-6 max-w-md mx-auto">
            {mobileMembers.map((member, idx) => (
              <div 
                key={idx}
                className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                style={{ minHeight: '300px' }}
              >
                <img 
                  src={member.imgSrc} 
                  alt={member.name} 
                  className="aspect-[3/5] w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                  <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                    <span className="font-semibold text-lg">{member.name}</span>
                    <span className="text-sm opacity-90">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet View: 2 Columns */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-6">
              {tabletMembers.column1.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {tabletMembers.column2.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View: 4 Columns with Parallax */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            <div 
              className="space-y-6 transition-transform duration-300 ease-out pt-[100px]"
              style={{ transform: `translateY(-${scrollY}px)` }}
            >
              {teamMembers.column1.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-16">
              {teamMembers.column2.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="space-y-6 transition-transform duration-300 ease-out pt-[100px]"
              style={{ transform: `translateY(-${scrollY}px)` }}
            >
              {teamMembers.column3.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-16">
              {teamMembers.column4.map((member, idx) => (
                <div 
                  key={idx}
                  className={`${getBackgroundColor(member.bgColor)} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative`}
                  style={{ minHeight: '300px' }}
                >
                  <img 
                    src={member.imgSrc} 
                    alt={member.name} 
                    className="aspect-[3/5] w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                    <div className="bg-white bg-opacity-80 text-black w-full py-3 rounded-b-2xl flex flex-col items-center justify-center gap-1">
                      <span className="font-semibold text-lg">{member.name}</span>
                      <span className="text-sm opacity-90">{member.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
     
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Past />
      </div>
    </div>
  );
};

export default Team;

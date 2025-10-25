import React, { useState, useEffect, useRef } from 'react';

// Past Team Component
const Past = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const carouselRef = useRef(null);

  const pastTeamData = {
    2024: [
      { id: 1, name: 'Abhay Maheshwari', designation: 'Chairperson', imageUrl: '/2024/c.jpg' },
      { id: 2, name: 'Aakriti Goenka', designation: 'Vice Chairperson', imageUrl: '/2024/vc.jpg' },
      { id: 3, name: 'Arnav Trivedi', designation: 'Secretary', imageUrl: '/2024/s.jpg' },
      { id: 4, name: 'Drishya Krishnakumar', designation: 'Co-secretary', imageUrl: '/2024/cs.jpg' },
      { id: 5, name: 'Taruna Dhaddha', designation: 'Technical Head', imageUrl: '/2024/th.jpg' },
      { id: 6, name: 'Anika Saxena', designation: 'Design Head', imageUrl: '/2024/dh.jpg' },
      { id: 7, name: 'Soumyajit Pal', designation: 'Projects Head', imageUrl: '/2024/ph.jpg' },
      { id: 8, name: 'Riddhi Thakare', designation: 'Management Head', imageUrl: '/2024/mh.jpg' },
      { id: 9, name: 'Joyeetha Nath', designation: 'Finance and HR', imageUrl: '/2024/fh.jpg' },
      { id: 10, name: 'Prabhav Srivastava', designation: 'Public Relations', imageUrl: '/2024/pr.jpg' },
    ],
    2023: [
      { id: 1, name: 'Ayush Tulshan', designation: 'Chairperson', imageUrl: '/2023/c.jpg' },
      { id: 2, name: 'Gaurav Singh', designation: 'Vice Chairperson', imageUrl: '/2023/vc.jpg' },
      { id: 3, name: 'Adira P', designation: 'Secretary', imageUrl: '/2023/s.jpg' },
      { id: 4, name: 'Ainesh', designation: 'Co-secretary', imageUrl: '/2023/cs.jpg' },
      { id: 5, name: 'Mehul', designation: 'Technical Head', imageUrl: '/2023/th.jpg' },
    ],
    2022: [
      { id: 1, name: 'Krishanu Das', designation: 'Chairperson', imageUrl: '/2022/c.jpg' },
      { id: 2, name: 'Rohan B', designation: 'Vice Chairperson', imageUrl: '/2022/vc.jpeg' },
      { id: 3, name: 'Dilith Dinesh', designation: 'Secretary', imageUrl: '/2022/s.jpeg' },
    ],
    2021: [
      { id: 1, name: 'Ayan Chandra', designation: 'Chairperson', imageUrl: '/2021/c.png' },
      { id: 2, name: 'Kshitij Arya', designation: 'Vice Chairperson', imageUrl: '/2021/vc.png' },
    ],
  };

  const years = [2024, 2023, 2022, 2021];
  const currentTeam = pastTeamData[selectedYear] || [];

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const firstItem = carouselRef.current.children[0];
      if (!firstItem) return;
      const itemWidth = firstItem.offsetWidth;
      const gap = parseFloat(window.getComputedStyle(carouselRef.current).gap) || 0;
      const scrollAmount = itemWidth + gap;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col p-4 sm:p-6 md:p-8 lg:p-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto mb-8 md:mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-800 mb-4 md:mb-8">
          EX-BOARD
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 relative">
          <label htmlFor="year-select" className="text-xl sm:text-2xl md:text-3xl font-semibold text-black">
            Select Year:
          </label>
          <div className="relative w-full sm:w-auto">
            <button
              id="year-select"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-gray-100 text-black py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-lg sm:text-xl font-medium cursor-pointer flex items-center justify-between w-full sm:min-w-[150px] relative z-20 border border-gray-300 hover:bg-gray-200"
            >
              {selectedYear}
              <svg className={`ml-2 w-5 h-5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-30 w-full sm:min-w-[150px] border border-gray-200">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className={`block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl font-medium hover:bg-gray-100 transition-colors duration-200 ${
                      selectedYear === year ? 'bg-gray-100 text-blue-600' : 'text-black'
                    }`}
                  >
                    {selectedYear === year && <span className="inline-block w-4 mr-2">✓</span>}
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full text-center mb-8 md:mb-12">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="text-gray-500 font-normal text-xl sm:text-2xl md:text-3xl">Meet Our</span>
          <span className="text-black relative">
            TEAM
            <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></span>
          </span>
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center w-full">
        <div className="relative w-full max-w-7xl">
          <button
            onClick={() => scrollCarousel('left')}
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-white border border-gray-300 text-black p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-10"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            onClick={() => scrollCarousel('right')}
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-white border border-gray-300 text-black p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-10"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <div 
            ref={carouselRef}
            className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-none px-2 py-4"
          >
            {currentTeam.map((member) => (
              <div 
                key={member.id} 
                className="flex-none snap-start w-[85%] xs:w-[70%] sm:w-[45%] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.5rem)]"
              >
                <div className="bg-white rounded-2xl p-3 sm:p-4 h-full flex flex-col justify-between border-2 border-gray-100 shadow-xl transition-shadow hover:shadow-2xl">
                  <div className="w-full aspect-[4/5] overflow-hidden rounded-xl mb-3 sm:mb-4 bg-gray-100 flex items-center justify-center">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center pb-2">
                    <p className="text-lg sm:text-xl font-bold text-black mb-1">{member.name}</p>
                    <p className="text-sm sm:text-md text-gray-500">{member.designation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Past;
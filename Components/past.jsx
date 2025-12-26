import React, { useState, useRef, useEffect } from "react";

const Past = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const carouselRef = useRef(null);

  /* ================= DATA ================= */

  const pastTeamData = {
    2024: [
      { id: 1, name: "Abhay Maheshwari", designation: "Chairperson", imageUrl: "/2024/c.jpg" },
      { id: 2, name: "Aakriti Goenka", designation: "Vice Chairperson", imageUrl: "/2024/vc.jpg" },
      { id: 3, name: "Arnav Trivedi", designation: "Secretary", imageUrl: "/2024/s.jpg" },
      { id: 4, name: "Drishya Krishnakumar", designation: "Co-secretary", imageUrl: "/2024/cs.jpg" },
      { id: 5, name: "Taruna Dhaddha", designation: "Technical Head", imageUrl: "/2024/th.jpg" },
      { id: 6, name: "Anika Saxena", designation: "Design Head", imageUrl: "/2024/dh.jpg" },
      { id: 7, name: "Soumyajit Pal", designation: "Projects Head", imageUrl: "/2024/pj.jpg" },
      { id: 8, name: "Riddhi Thakare", designation: "Management Head", imageUrl: "/2024/mh.jpg" },
      { id: 9, name: "Joyeetha Nath", designation: "Finance and HR", imageUrl: "/2024/fh.jpg" },
      { id: 10, name: "Prabhav Srivastava", designation: "Public Relations", imageUrl: "/2024/ph.jpg" },
    ],
    2023: [
      { id: 1, name: "Ayush Tulshan", designation: "Chairperson", imageUrl: "/2023/c.jpg" },
      { id: 2, name: "Gaurav Singh", designation: "Vice Chairperson", imageUrl: "/2023/vc.jpg" },
      { id: 3, name: "Adira P", designation: "Secretary", imageUrl: "/2023/s.jpg" },
      { id: 4, name: "Ainesh", designation: "Co-secretary", imageUrl: "/2023/cs.jpg" },
      { id: 5, name: "Mehul", designation: "Technical Head", imageUrl: "/2023/th.jpg" },
      { id: 6, name: "Adit Kaushal", designation: "Editorial Head", imageUrl: "/2023/eh.jpg" },
      { id: 7, name: "Rajesh Kumar", designation: "Design Head", imageUrl: "/2023/dh.jpg" },
      { id: 8, name: "Shreya", designation: "Management Head", imageUrl: "/2023/mh.png" },
      { id: 9, name: "Oindrila Paul", designation: "Finance and HR", imageUrl: "/2023/fh.jpg" },
      { id: 10, name: "Abhiram Sunil", designation: "Public Relations", imageUrl: "/2023/pr.jpg" },
      { id: 11, name: "Soumya Rathi", designation: "R&D Lead", imageUrl: "/2023/r&d.jpg" },
    ],
    2022: [
      { id: 1, name: "Krishanu Das", designation: "Chairperson", imageUrl: "/2022/c.jpg" },
      { id: 2, name: "Rohan B", designation: "Vice Chairperson", imageUrl: "/2022/vc.jpeg" },
      { id: 3, name: "Dilith Dinesh", designation: "Secretary", imageUrl: "/2022/s.jpeg" },
      { id: 4, name: "Manas Sahu", designation: "Co-secretary", imageUrl: "/2022/cs.jpg" },
      { id: 5, name: "Chirag Makwana", designation: "Technical Head", imageUrl: "/2022/th.jpg" },
      { id: 6, name: "Srishti Chopra", designation: "Editorial Head", imageUrl: "/2022/dh.jpg" },
      { id: 7, name: "Harshwardhan Jha", designation: "Design Head", imageUrl: "/2022/ed.jpg" },
      { id: 8, name: "Gauravi Mittal", designation: "Management Head", imageUrl: "/2022/mh.jpeg" },
      { id: 9, name: "Shivang Singh", designation: "Finance and HR", imageUrl: "/2022/hr.jpg" },
      { id: 10, name: "Pulkit Saraf", designation: "Public Relations", imageUrl: "/2022/pr.jpg" },
      { id: 11, name: "Sidharth Nair", designation: "Web Lead", imageUrl: "/2022/wl.jpeg" },
    ],
    2021: [
      { id: 1, name: "Ayan Chandra", designation: "Chairperson", imageUrl: "/2021/c.png" },
      { id: 2, name: "Kshitij Arya", designation: "Vice Chairperson", imageUrl: "/2021/vc.png" },
      { id: 3, name: "Alap Bhakta", designation: "Secretary", imageUrl: "/2021/s.png" },
      { id: 4, name: "Pranjal Diwivedi", designation: "Editorial Head", imageUrl: "/2021/eh.png" },
      { id: 5, name: "Arshita Marwaha", designation: "Technical Head", imageUrl: "/2021/th.png" },
      { id: 6, name: "Ankit Bhanja", designation: "Design Head", imageUrl: "/2021/dh.png" },
      { id: 7, name: "Eshika Goyal", designation: "Events Head", imageUrl: "/2021/evh.png" },
      { id: 8, name: "Laveesha Mudgal", designation: "Management Head", imageUrl: "/2021/mh.png" },
      { id: 9, name: "Hartej Singh", designation: "Finance and HR", imageUrl: "/2021/hr.png" },
      { id: 10, name: "Mansi Singh", designation: "Public Relations", imageUrl: "/2021/pr.png" },
    ],
  };

  const years = Object.keys(pastTeamData).map(Number);
  const currentTeam = pastTeamData[selectedYear] || [];

  /* ================= HANDLERS ================= */

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0 });
  };

  const scrollCarousel = (dir) => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector("[data-card]");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(carouselRef.current).gap) || 0;
    const scrollAmount = card.offsetWidth + gap;

    carouselRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  /* ================= JSX ================= */

  return (
    <section className="w-full bg-white text-black px-4 pt-16 pb-24 sm:px-6 md:px-10 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-gray-800 mb-6">
          EX-BOARD
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xl font-semibold">Select Year:</span>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="bg-gray-100 px-5 py-3 rounded-lg text-lg font-medium border border-gray-300 flex items-center gap-2"
            >
              {selectedYear}
              <span className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 bg-white rounded-lg shadow-xl border z-20 w-full">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className={`block px-5 py-3 w-full text-left hover:bg-gray-100 ${
                      selectedYear === y ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Hint */}
      <p className="sm:hidden text-center text-sm text-gray-400 mb-3">
        Swipe horizontally →
      </p>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        {/* Desktop Arrows */}
        <button
          onClick={() => scrollCarousel("left")}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border shadow rounded-full w-10 h-10 items-center justify-center"
        >
          ‹
        </button>

        <button
          onClick={() => scrollCarousel("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border shadow rounded-full w-10 h-10 items-center justify-center"
        >
          ›
        </button>

        {/* Scroll Container */}
        <div
          ref={carouselRef}
          className="
            flex gap-4 md:gap-6 lg:gap-8
            overflow-x-auto overflow-y-hidden
            px-2 py-6
            scroll-smooth

            sm:snap-x sm:snap-mandatory

            [scrollbar-width:none]
            [-ms-overflow-style:none]
          "
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {currentTeam.map((m) => (
            <div
              key={m.id}
              data-card
              className="
                flex-none
                sm:snap-start
                w-[80%]
                sm:w-[48%]
                md:w-[32%]
                lg:w-[24%]
              "
            >
              <div className="bg-white rounded-2xl p-4 h-full shadow-lg border">
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Past;

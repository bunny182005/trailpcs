import React, { useState, useEffect } from "react";
import Past from "../Components/past";


const Team = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("team-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const multiplier = 0.2;

      if (rect.top < windowHeight && rect.top > 0) {
        setScrollY((windowHeight - rect.top) * multiplier);
      } else if (rect.top <= 0) {
        setScrollY(windowHeight * multiplier);
      } else {
        setScrollY(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= DATA ================= */

  const teamMembers = {
    column1: [
      { id: "c", name: "Pratham Lal", role: "ChairPerson", imgSrc: "/2025/c.png", bgColor: "blue" },
      { id: "dh", name: "Aditya Bramhe", role: "Design Head", imgSrc: "/2025/dh.png", bgColor: "blue" },
      { id: "ed", name: "Greeshma", role: "Editorial Head", imgSrc: "/2025/eh.png", bgColor: "darkblue" },
    ],
    column2: [
      { id: "vc", name: "Prashast Awasthi", role: "Vice-ChairPerson", imgSrc: "/2025/vc.png", bgColor: "navy" },
      { id: "eh", name: "Vidhi Yadav", role: "Events Head", imgSrc: "/2025/eh.jpeg", bgColor: "green" },
    ],
    column3: [
      { id: "s", name: "Sahil Sureka", role: "Secretary", imgSrc: "/2025/s.png", bgColor: "black" },
      { id: "th", name: "Karthikeya", role: "Technical Head", imgSrc: "/2025/th2.png", bgColor: "purple" },
      { id: "mh", name: "Akakshar Sharma", role: "Management Head", imgSrc: "/2025/mh.png", bgColor: "purple" },
    ],
    column4: [
      { id: "cs", name: "Aditya Khanna", role: "Co-Secretary", imgSrc: "/2025/cs.png", bgColor: "olive" },
      { id: "pm", name: "Aarti Chhabaria", role: "P&M Head", imgSrc: "/2025/p&m.png", bgColor: "indigo" },
    ],
  };

  const tabletMembers = {
    column1: [
      teamMembers.column1[0],
      teamMembers.column3[0],
      teamMembers.column1[1],
      teamMembers.column2[1],
      teamMembers.column1[2],
    ],
    column2: [
      teamMembers.column2[0],
      teamMembers.column4[0],
      teamMembers.column3[1],
      teamMembers.column4[1],
      teamMembers.column3[2],
    ],
  };

  const mobileMembers = [
    teamMembers.column1[0],
    teamMembers.column2[0],
    teamMembers.column3[0],
    teamMembers.column4[0],
    teamMembers.column3[1],
    teamMembers.column1[1],
    teamMembers.column2[1],
    teamMembers.column4[1],
    teamMembers.column3[2],
    teamMembers.column1[2],
  ];

  /* ================= HELPERS ================= */

  const getBackgroundColor = (color) => {
    const colors = {
      blue: "bg-blue-100",
      navy: "bg-slate-100",
      green: "bg-green-100",
      black: "bg-purple-100",
      olive: "bg-emerald-100",
      darkblue: "bg-indigo-100",
      purple: "bg-violet-100",
      indigo: "bg-indigo-100",
    };
    return colors[color] || "bg-gray-100";
  };

  /* ================= CARD ================= */

  const Card = ({ member }) => (
  <div
    className={`
      ${getBackgroundColor(member.bgColor)}
      rounded-3xl overflow-hidden relative
      shadow-md hover:shadow-xl transition-shadow duration-300

      min-h-[190px]        /* Mobile ↓↓↓ */
      sm:min-h-[240px]
      md:min-h-[280px]
      lg:min-h-[320px]
      xl:min-h-[360px]
    `}
  >
    <img
      src={member.imgSrc}
      alt={member.name}
      loading="lazy"
      decoding="async"
      className="
        w-full h-full object-cover object-top

        aspect-[4/5]        /* Mobile: shorter */
        sm:aspect-[3/5]     /* Tablet+ keeps tall look */
      "
    />

    <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl py-1.5 sm:py-3 text-center">
        <div className="font-semibold text-sm sm:text-lg">
          {member.name}
        </div>
        <div className="text-[11px] sm:text-sm opacity-90">
          {member.role}
        </div>
      </div>
    </div>
  </div>
);


  /* ================= JSX ================= */

  return (
    <div className="min-h-screen bg-white mt-24">
      <h2 className="text-center text-5xl sm:text-6xl lg:text-8xl font-extrabold mb-28">
        CURRENT BOARD
      </h2>

      <div id="team-section" className="relative px-6">

        {/* Mobile */}
        <div className="md:hidden space-y-4 max-w-md mx-auto">
          {mobileMembers.map((m) => (
            <Card key={m.id} member={m} />
          ))}
        </div>

        {/* Tablet */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {tabletMembers.column1.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>
          <div className="space-y-6">
            {tabletMembers.column2.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          <div
            style={{ transform: `translateY(-${scrollY}px)` }}
            className="space-y-6 pt-[100px]"
          >
            {teamMembers.column1.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>

          <div className="space-y-6 pt-16">
            {teamMembers.column2.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>

          <div
            style={{ transform: `translateY(-${scrollY}px)` }}
            className="space-y-6 pt-[100px]"
          >
            {teamMembers.column3.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>

          <div className="space-y-6 pt-16">
            {teamMembers.column4.map((m) => (
              <Card key={m.id} member={m} />
            ))}
          </div>
        </div>
      </div>

      

    



    </div>
  );
};

export default Team;

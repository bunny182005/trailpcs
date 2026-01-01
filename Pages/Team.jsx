import React, { useEffect, useRef } from "react";

const Team = () => {
  const col1Ref = useRef(null);
  const col3Ref = useRef(null);
  const sectionRef = useRef(null);

  // 🔹 SMOOTHNESS CONFIGURATION
  // 0.08 = Butter Smooth | 1.0 = Instant/Rigid
  const LERP_FACTOR = 0.08;

  useEffect(() => {
    // Variables for the physics engine
    let currentTranslate = 0; // Where the element currently IS
    let targetTranslate = 0;  // Where the element WANTS to go
    let animationFrameId;
    
    // Cached metrics to avoid layout thrashing
    let sectionTopAbsolute = 0;
    let windowHeight = window.innerHeight;

    // 1. MEASURE: Run only on Mount & Resize
    const updateMetrics = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        sectionTopAbsolute = rect.top + scrollTop;
      }
      windowHeight = window.innerHeight;
    };

    // 2. CALCULATE TARGET: Run on Scroll
    // This uses YOUR EXACT original logic to determine the destination
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      // Calculate 'rect.top' mathematically (faster than getBoundingClientRect)
      const rectTop = sectionTopAbsolute - currentScroll;
      const multiplier = 0.2;

      // Your original conditions:
      if (rectTop < windowHeight && rectTop > 0) {
        targetTranslate = (windowHeight - rectTop) * multiplier;
      } else if (rectTop <= 0) {
        targetTranslate = windowHeight * multiplier;
      } else {
        targetTranslate = 0;
      }
    };

    // 3. ANIMATE: The Physics Loop
    // This runs constantly to smoothly drift 'current' towards 'target'
    const animate = () => {
      // Linear Interpolation (Lerp) for smoothness
      // formula: current + (target - current) * fraction
      const diff = targetTranslate - currentTranslate;

      // Only update if there is a noticeable difference (saves battery)
      if (Math.abs(diff) > 0.05) {
        currentTranslate += diff * LERP_FACTOR;

        // Apply to DOM using GPU-accelerated string
        const transformString = `translate3d(0, -${currentTranslate.toFixed(2)}px, 0)`;

        if (col1Ref.current) {
          col1Ref.current.style.transform = transformString;
        }
        if (col3Ref.current) {
          col3Ref.current.style.transform = transformString;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialization
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Kick off the loop
    animate();

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /* ================= DATA ================= */
  // ... (Keep all your existing data arrays here exactly as they were) ...
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

  const Card = ({ member }) => (
    <div
      className={`
        ${getBackgroundColor(member.bgColor)}
        rounded-3xl overflow-hidden relative
        shadow-md hover:shadow-xl transition-shadow duration-300
        min-h-[190px] sm:min-h-[240px] md:min-h-[280px]
        lg:min-h-[320px] xl:min-h-[360px]
      `}
      // 🔹 HARDWARE ACCELERATION LOCK (Crucial for anti-jitter)
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      <img
        src={member.imgSrc}
        alt={member.name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top aspect-[4/5] sm:aspect-[3/5]"
      />
      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl py-1.5 sm:py-3 text-center">
          <div className="font-semibold text-sm sm:text-lg">{member.name}</div>
          <div className="text-[11px] sm:text-sm opacity-90">{member.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white mt-24">
      <h2 className="text-center text-5xl sm:text-6xl lg:text-8xl font-extrabold mb-28">
        CURRENT BOARD
      </h2>

      <div ref={sectionRef} id="team-section" className="relative px-6">
        {/* Mobile */}
        <div className="md:hidden space-y-4 max-w-md mx-auto">
          {mobileMembers.map((m) => <Card key={m.id} member={m} />)}
        </div>

        {/* Tablet */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            {tabletMembers.column1.map((m) => <Card key={m.id} member={m} />)}
          </div>
          <div className="space-y-6">
            {tabletMembers.column2.map((m) => <Card key={m.id} member={m} />)}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {/* 🔹 GPU LAYERING STYLES 
              These prevent the text/images from re-painting during movement
          */}
          <div 
            ref={col1Ref} 
            className="space-y-6 pt-[100px]"
            style={{ 
              willChange: "transform",
              backfaceVisibility: "hidden", 
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
          >
            {teamMembers.column1.map((m) => <Card key={m.id} member={m} />)}
          </div>

          <div className="space-y-6 pt-16">
            {teamMembers.column2.map((m) => <Card key={m.id} member={m} />)}
          </div>

          <div 
            ref={col3Ref} 
            className="space-y-6 pt-[100px]"
            style={{ 
              willChange: "transform",
              backfaceVisibility: "hidden", 
              perspective: 1000,
              transformStyle: "preserve-3d"
            }}
          >
            {teamMembers.column3.map((m) => <Card key={m.id} member={m} />)}
          </div>

          <div className="space-y-6 pt-16">
            {teamMembers.column4.map((m) => <Card key={m.id} member={m} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
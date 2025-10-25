import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VariableProximity from './VariableProximity'; // <-- 1. IMPORTED

// -----------------------------------------------------------------
// 1. SOTYHERO COMPONENT
// -----------------------------------------------------------------
const SOTYHero = () => {
  const revolvingImages = [
    '/logo.png', '/logo.png', '/logo.png', '/logo.png',
    '/logo.png', '/logo.png', '/logo.png', '/logo.png',
  ];

  // --- 2. REF ADDED for the container ---
  const heroRef = useRef(null);

  // --- 3. TEXT DEFINED for the label prop ---
  const descriptionText =
    'The "Student of the Year" was an exciting two-day event where participants faced a gauntlet of challenges. They competed in a scavenger hunt, an obstacle course, trivia night, and a talent show to test their diverse abilities. These activities were designed to test both mental and physical skills to prove who was the most well-rounded. The one participant who excelled in all areas was ultimately crowned "Student of the Year."';

  return (
    // --- 4. REF ATTACHED to the main container ---
    <div
      ref={heroRef}
      className="h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="text-center w-full">
        <h1 className="text-[25vw] font-bold mb-8 flex items-center justify-center leading-none">
          <span className="mr-16">S</span>
          <div className="relative w-[20vw] h-[20vw] mx-8">
            {revolvingImages.map((image, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4vw] h-[4vw] rounded-full overflow-hidden border-2 border-white shadow-lg"
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
          <span className="ml-16">TY</span>
        </h1>

        {/* --- 5. <p> TAG REPLACED with <VariableProximity> --- */}
        <VariableProximity
          label={descriptionText}
          containerRef={heroRef}
          className="text-2xl mb-8 mt-12 max-w-3xl mx-auto block" // Added max-width, margin, and block display
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          radius={100}
          falloff="linear"
        />
      </div>

      <style>{`
        @keyframes revolve {
          0% {
            transform: rotate(0deg) translate(8vw) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translate(8vw) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------
// 2. TIMELINE ITEM COMPONENT
// -----------------------------------------------------------------
const TimelineItem = ({ side, children, index, totalItems, scrollProgress, isLast }) => {
  const isLeft = side === 'left';
  const itemStart = index / totalItems;
  const itemEnd = (index + 1) / totalItems;
  const fadeInEnd = itemStart + 0.1;

  const itemOpacity = useTransform(
    scrollProgress,
    isLast ? [itemStart, fadeInEnd] : [itemStart, fadeInEnd, itemEnd],
    isLast ? [0, 1] : [0, 1, 0]
  );
  const itemScale = useTransform(
    scrollProgress,
    isLast ? [itemStart, fadeInEnd] : [itemStart, fadeInEnd, itemEnd],
    isLast ? [0.8, 1] : [0.8, 1, 0.8]
  );
  const itemX = useTransform(
    scrollProgress,
    isLast ? [itemStart, fadeInEnd] : [itemStart, fadeInEnd, itemEnd],
    isLast ? [isLeft ? -100 : 100, 0] : [isLeft ? -100 : 100, 0, isLeft ? -100 : 100]
  );

  return (
    <motion.div
      className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}
      style={{
        opacity: itemOpacity,
        scale: itemScale,
        x: itemX,
      }}
    >
      <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
        {children}
      </div>
    </motion.div>
  );
};

// -----------------------------------------------------------------
// 3. TIMELINE CONTAINER COMPONENT (MODIFIED)
// -----------------------------------------------------------------
const Timeline = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end'],
  });

  // --- UPDATED: Adjusted for 4 items (5 points) instead of 5 items (6 points) ---
  const ballPosition = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['0%', '25%', '50%', '75%', '100%']
  );

  // --- UPDATED: Removed Round 5 ---
  const timelineItems = [
    { side: 'right', title: 'Round 1', content: 'Round 1 kicked off with an exciting Scavenger Hunt, sending participants racing across the campus. Teams had to decipher cryptic clues and find hidden items, putting their teamwork and problem-solving skills to the test right from the start.'},
    { side: 'left', title: 'Round 2', content: 'the competition intensified with a grueling Obstacle Course. This round was a true test of physical endurance, agility, and determination as contestants had to run, jump, and climb their way to the finish line.'},
    { side: 'right', title: 'Round 3', content: 'Round 3 shifted the focus from brawn to brains with an engaging Trivia Night. Participants battled wits in a fast-paced quiz, answering challenging questions that tested their general knowledge and quick thinking under pressure.'},
    { side: 'left', title: 'Round 4', content: 'Round 4 was the Talent Show, giving participants a chance to shine and showcase their unique creative abilities. From singing and dancing to stand-up comedy, this round celebrated the diverse artistic skills of all the contestants.'},
  ];

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <div
        ref={timelineRef}
        className="relative w-full max-w-4xl mx-auto"
        style={{ height: `${timelineItems.length * 100}vh` }} // This now correctly uses length 4
      >
        <div
          className="absolute top-0 left-1/2 w-1 bg-gray-200 -translate-x-1/2 z-0"
          style={{ height: '100%' }}
        />
        <motion.div
          className="absolute left-1/2 h-6 w-6 bg-gray-800 rounded-full z-20 border-4 border-white shadow-lg pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{ top: ballPosition }}
        />
        <div className="relative z-10 h-full">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="h-screen flex items-center justify-center absolute top-0 left-0 w-full"
              style={{ top: `${index * 100}vh` }}
            >
              <TimelineItem
                side={item.side}
                index={index}
                totalItems={timelineItems.length} // This now correctly uses length 4
                scrollProgress={scrollYProgress}
                isLast={index === timelineItems.length - 1}
              >
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </TimelineItem>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 4. MAIN SOTY COMPONENT
// -----------------------------------------------------------------
const SOTY = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/events');
  };

  return (
    <div className="bg-white">
      <SOTYHero />
      <Timeline />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <div className="text-center w-full max-w-xl p-8 bg-white shadow-2xl rounded-lg z-10">
          <h2 className="text-4xl font-bold mb-4">Round 5</h2>
          <p className="text-xl text-gray-600">
            Round 5 was the Final Race, the thrilling climax of the entire competition. This high-stakes finale combined elements from all previous rounds, pushing the finalists to their absolute limits in one last dash for the finish line.
          </p>
        </div>
        <p className="text-xl mt-[20%] text-gray-700 my-12">
          This is the Placeit event page with all the details.
        </p>
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-gray-800 text-white rounded-full text-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default SOTY;
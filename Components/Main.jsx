import { useEffect, useRef } from "react";

const Main = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const soulRef = useRef(null);
  const mindRef = useRef(null);
  const highlightSoulRef = useRef(null);
  const highlightMindRef = useRef(null);

  useEffect(() => {
    // Animate first line words
    const line1Words = line1Ref.current.querySelectorAll('.word');
    line1Words.forEach((word, index) => {
      const delay = index * 80;
      const duration = 600 + (index * 20);
      
      setTimeout(() => {
        word.style.opacity = '1';
        word.style.transform = 'translateX(0)';
        word.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      }, delay);
    });

    // Animate second line words
    const line2Words = line2Ref.current.querySelectorAll('.word');
    line2Words.forEach((word, index) => {
      const delay = 400 + (index * 80);
      const duration = 600 + (index * 20);
      
      setTimeout(() => {
        word.style.opacity = '1';
        word.style.transform = 'translateX(0)';
        word.style.transition = `all ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      }, delay);
    });

    // Animate "Soul" (Moves UP)
    setTimeout(() => {
      soulRef.current.style.opacity = '1';
      soulRef.current.style.transform = 'translate(0, -4px)'; // Move UP
      soulRef.current.style.transition = 'all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        highlightSoulRef.current.style.width = '100%';
        highlightSoulRef.current.style.transition = 'width 500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 100);
    }, 480);

    // Animate "Mind" (Now also Moves UP to match Soul)
    setTimeout(() => {
      mindRef.current.style.opacity = '1';
      mindRef.current.style.transform = 'translate(0, -4px)'; // CHANGED: Move UP (was 4px)
      mindRef.current.style.transition = 'all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      setTimeout(() => {
        highlightMindRef.current.style.width = '100%';
        highlightMindRef.current.style.transition = 'width 500ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      }, 100);
    }, 880);
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
      <div className='w-full h-screen flex items-center justify-center relative overflow-hidden'>
        <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-32 relative z-10'>
          
          {/* Line 1: Communication for the Soul, */}
          <div 
            ref={line1Ref}
            className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black text-center leading-tight mb-2 sm:mb-4'
          >
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              Communication
            </span>
            {' '}
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              for
            </span>
            {' '}
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              the
            </span>
            {' '}
            <span className="relative inline-block whitespace-nowrap">
              <span 
                ref={soulRef}
                className="text-blue-500 inline-block opacity-0 relative z-10"
                style={{ transform: 'translate(-20px, 0)' }}
              >
                Soul,
              </span>
              <span 
                ref={highlightSoulRef}
                className="absolute bottom-[0.15em] left-0 h-[0.12em] bg-blue-200/60 -z-0"
                style={{ width: '0%' }}
              />
            </span>
          </div>

          {/* Line 2: Innovation for the Mind. */}
          <div 
            ref={line2Ref}
            className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black text-center leading-tight'
          >
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              Innovation
            </span>
            {' '}
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              for
            </span>
            {' '}
            <span className="word inline-block opacity-0" style={{ transform: 'translateX(-20px)' }}>
              the
            </span>
            {' '}
            <span className="relative inline-block whitespace-nowrap">
              <span 
                ref={mindRef}
                className="text-blue-500 inline-block opacity-0 relative z-10"
                style={{ transform: 'translate(-20px, 0)' }}
              >
                Mind.
              </span>
              {/* FIXED: Exact same positioning and height as Soul */}
              <span 
                ref={highlightMindRef}
                className="absolute bottom-[0.15em] left-0 h-[0.12em] bg-blue-200/60 -z-0"
                style={{ width: '0%' }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
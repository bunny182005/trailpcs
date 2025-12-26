import { useEffect, useState } from "react";

const ScrollToTopButton = ({ footerRef }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!footerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [footerRef]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed right-0 top-1/2 -translate-y-1/2 z-50
        bg-black text-white font-semibold text-sm
        px-4 py-3 rounded-full
        shadow-lg
        transition-all duration-300
        hover:bg-gray-800
        ${
          visible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }
      `}
      style={{
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
      }}
    >
      → Return to Top
    </button>
  );
};

export default ScrollToTopButton;

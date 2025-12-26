import React from "react";

const RethinkingSection = () => {
  return (
    <>
      {/* Marquee Section */}
      <div className="w-full bg-black text-white py-3 sm:py-4 md:py-5 overflow-hidden">
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {[...Array(20)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wider mx-2 sm:mx-3">
                IEEE PCS
              </span>
              <span className="text-xl sm:text-3xl md:text-4xl font-light mx-2 sm:mx-3">
                *
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <section
  className="
    w-full bg-white
    flex items-center justify-center
    px-4 sm:px-6 md:px-10

    py-16           /* Mobile spacing */
    sm:py-24        /* Tablet */
    lg:min-h-screen /* Desktop keeps full height */
  "
>
  <h2 className="
    text-center
    text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
    font-extrabold text-black
    leading-snug tracking-wide
    max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl
  ">
    &ldquo;WE ARE IEEE PCS <br />
    IDEAS MADE CLEAR <br />
    DESIGNED COMMUNICATION <br />
    ENGINEERED FOR IMPACT&rdquo;
  </h2>
</section>


      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 16s linear infinite;
          }
        }
      `}</style>
    </>
  );
};

export default RethinkingSection;

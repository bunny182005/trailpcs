import React from "react";
import CircularTextScroller from "../Components/CircularTextScroller";
import GridMergeAnimation from "../Components/GridMergeAnimation";

const Memories = () => {
  return (
    <section
      id="memories"
      data-memories-center
      className="w-full bg-white flex flex-col min-h-screen"
    >
      {/* MAIN CONTENT */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-0">
        
        {/* LEFT SECTION: Circular Text */}
        <div className="col-span-1 flex items-center justify-center py-10 lg:py-0 bg-white  ">
          <CircularTextScroller
            texts={[
              "Emotion",
              "Memories",
              "Moments",
              "Nostalgia",
              "Bond",
              "Journey",
              "Home",
              "Stories",
              "Legacy",
              "Unity",
              "Forever",
            ]}
            interval={1500}
          />
        </div>

        {/* RIGHT SECTION: Grid Merge Animation */}
        <div className="col-span-1 lg:col-span-2 w-full h-[60vh] lg:h-auto overflow-hidden bg-gray-50/50">
          <GridMergeAnimation />
        </div>

      </div>
    </section>
  );
};

export default Memories;

// src/Components/ScribbleLink.jsx
import React from 'react';

export default function ScribbleLink({ href = "#", children }) {
  return (
    // This is a container for our stacking layers
    <a
      href={href}
      className="
        relative inline-block 
        font-['Arial',_sans-serif] 
        text-7xl font-bold tracking-widest
        no-underline
      "
    >
      {/* --- LAYER 1: The Scribbles (On Top) --- 
        This div holds both of our toggling scribble images.
      */}
      <div
        className="
          scribble-link
          absolute inset-0 w-full h-full
          
          /* --- THIS IS THE KEY --- */
          /* It makes the blue scribbles interact with the white text below */
          mix-blend-lighten

          /* Define ::before (Frame 1) */
          before:content-[''] before:absolute
          before:bg-no-repeat before:bg-center
          
          /* Define ::after (Frame 2) */
          after:content-[''] after:absolute
          after:bg-no-repeat after:bg-center


          /* --- BRUTE FORCE ALIGNMENT (Frame 1) ---
           * Change these values to manually align your first scribble.
           * w-[100%] = 100% width. Try w-[110%] to make it 10% wider.
           * h-[100%] = 100% height. Try h-[120%] to make it 20% taller.
           * top-0 = 0px from top. Try top-[-10px] to move it up.
           * left-0 = 0px from left. Try left-[-5px] to move it left.
          */
          before:w-[100%] before:h-[100%] before:top-0 before:left-0
          before:bg-[length:100%_100%] /* Stretches image to the w/h above */


          /* --- BRUTE FORCE ALIGNMENT (Frame 2) ---
           * Change these to align your second scribble.
           * These should probably match the values you set for Frame 1.
          */
          after:w-[100%] after:h-[100%] after:top-0 after:left-0
          after:bg-[length:100%_100%] /* Stretches image to the w/h above */


          /* --- ON HOVER: Animate both frames --- */
          group-hover:before:animate-[flickerOn_0.6s_steps(1)_infinite]
          group-hover:after:animate-[flickerOff_0.6s_steps(1)_infinite]
        "
      />
      
      {/* --- LAYER 2: The Text (On Bottom) --- 
        This is the clean, white "IEEEPCS" text.
      */}
      <span className="
        relative block
        /* Add 'group' so hovering over the text triggers the animation in the div above */
        group 
        text-white
      ">
        {children}
      </span>
    </a>
  );
}
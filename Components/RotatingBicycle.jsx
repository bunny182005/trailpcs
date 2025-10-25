import React from 'react';

const RotatingBicycle = ({ className = "" }) => {
  return (
    <svg
      width="80"
      height="50"
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      {/* Back Wheel */}
      <g>
        <circle
          cx="120"
          cy="200"
          r="70"
          stroke="black"
          strokeWidth="8"
          fill="none"
        />
        {/* Spokes - rotating group */}
        <g className="animate-spin" style={{ animationDuration: '2s', transformOrigin: '120px 200px' }}>
          <line x1="120" y1="130" x2="120" y2="270" stroke="black" strokeWidth="3" />
          <line x1="50" y1="200" x2="190" y2="200" stroke="black" strokeWidth="3" />
          <line x1="70" y1="150" x2="170" y2="250" stroke="black" strokeWidth="3" />
          <line x1="170" y1="150" x2="70" y2="250" stroke="black" strokeWidth="3" />
        </g>
      </g>

      {/* Front Wheel */}
      <g>
        <circle
          cx="380"
          cy="200"
          r="70"
          stroke="black"
          strokeWidth="8"
          fill="none"
        />
        {/* Spokes - rotating group */}
        <g className="animate-spin" style={{ animationDuration: '2s', transformOrigin: '380px 200px' }}>
          <line x1="380" y1="130" x2="380" y2="270" stroke="black" strokeWidth="3" />
          <line x1="310" y1="200" x2="450" y2="200" stroke="black" strokeWidth="3" />
          <line x1="330" y1="150" x2="430" y2="250" stroke="black" strokeWidth="3" />
          <line x1="430" y1="150" x2="330" y2="250" stroke="black" strokeWidth="3" />
        </g>
      </g>

      {/* Frame - Rear Triangle */}
      <line x1="120" y1="200" x2="220" y2="120" stroke="black" strokeWidth="7" />
      <line x1="120" y1="200" x2="220" y2="200" stroke="black" strokeWidth="7" />
      <line x1="220" y1="120" x2="220" y2="200" stroke="black" strokeWidth="7" />
      
      {/* Frame - Front Triangle */}
      <line x1="220" y1="120" x2="350" y2="90" stroke="black" strokeWidth="7" />
      <line x1="220" y1="120" x2="380" y2="200" stroke="black" strokeWidth="7" />
      <line x1="350" y1="90" x2="380" y2="200" stroke="black" strokeWidth="7" />
      
      {/* Top Tube */}
      <line x1="220" y1="120" x2="300" y2="120" stroke="black" strokeWidth="7" />
      
      {/* Seat Post */}
      <line x1="220" y1="120" x2="220" y2="70" stroke="black" strokeWidth="7" />
      
      {/* Seat */}
      <ellipse cx="220" cy="60" rx="30" ry="10" fill="black" />
      
      {/* Down Tube (Seat to Bottom Bracket) */}
      <line x1="220" y1="120" x2="220" y2="200" stroke="black" strokeWidth="7" />
      
      {/* Chain Stays */}
      <line x1="120" y1="200" x2="220" y2="200" stroke="black" strokeWidth="6" />
      
      {/* Fork */}
      <line x1="350" y1="90" x2="380" y2="200" stroke="black" strokeWidth="6" />
      
      {/* Handle Bar Stem */}
      <line x1="350" y1="90" x2="370" y2="60" stroke="black" strokeWidth="6" />
      
      {/* Handle Bars */}
      <line x1="340" y1="60" x2="400" y2="60" stroke="black" strokeWidth="7" strokeLinecap="round" />
      <circle cx="340" cy="60" r="6" fill="black" />
      <circle cx="400" cy="60" r="6" fill="black" />
      
      {/* Bottom Bracket / Crank Area */}
      <circle cx="220" cy="200" r="18" fill="black" stroke="black" strokeWidth="3" />
      
      {/* Pedal Crank - rotating */}
      <g className="animate-spin" style={{ animationDuration: '2s', transformOrigin: '220px 200px' }}>
        <line x1="220" y1="182" x2="220" y2="245" stroke="black" strokeWidth="6" />
        <rect x="210" y="245" width="20" height="12" rx="2" fill="black" />
        <line x1="220" y1="218" x2="220" y2="155" stroke="black" strokeWidth="6" />
        <rect x="210" y="143" width="20" height="12" rx="2" fill="black" />
      </g>
      
      {/* Chain (simplified) */}
      <ellipse cx="170" cy="200" rx="50" ry="8" fill="none" stroke="gray" strokeWidth="3" strokeDasharray="5,5" />
    </svg>
  );
};

export default RotatingBicycle;
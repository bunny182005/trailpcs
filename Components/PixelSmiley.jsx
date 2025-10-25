import React from 'react';

export default function PixelSmiley() {
  const pixelSize = 1;
  
  // Define the pixel grid (1 = black, 2 = yellow, 0 = transparent/orange)
  const grid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
    [0,0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
    [0,0,1,2,2,2,1,1,1,2,2,2,2,2,2,1,0,0,0,0],
    [0,0,1,2,2,2,2,2,1,2,2,2,2,2,2,1,0,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
    [0,1,2,2,1,1,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
    [0,1,2,2,2,1,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
    [0,1,1,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];
  
  const colors = {
    0: 'transparent',
    1: '#000000', // Black
    2: '#ffff00', // Yellow
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{backgroundColor: '#ff5544'}}>
      <div className="w-full max-w-md">
        <svg viewBox="0 0 20 15" className="w-full h-full" style={{imageRendering: 'pixelated'}}>
          {grid.map((row, y) => 
            row.map((cell, x) => 
              cell !== 0 && (
                <rect
                  key={`${x}-${y}`}
                  x={x * pixelSize}
                  y={y * pixelSize}
                  width={pixelSize}
                  height={pixelSize}
                  fill={colors[cell]}
                />
              )
            )
          )}
        </svg>
      </div>
    </div>
  );
}
import React, { useMemo } from "react";
const MosaicTextHeader = () => {
  const COLS = 84;
  const ROWS = 10;

  const createBlock = (r, c, h, w) => {
    const points = [];
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        points.push({ r: r + i, c: c + j });
      }
    }
    return points;
  };

  const LETTER_SHAPES = {
    I: [
      ...createBlock(0, 0, 2, 10),
      ...createBlock(2, 4, 6, 2),
      ...createBlock(8, 0, 2, 10),
    ],
    E: [
      ...createBlock(0, 0, 10, 2),
      ...createBlock(0, 2, 2, 8),
      ...createBlock(4, 2, 2, 6),
      ...createBlock(8, 2, 2, 8),
    ],
    P: [
      ...createBlock(0, 0, 10, 2),
      ...createBlock(0, 2, 2, 6),
      ...createBlock(0, 8, 5, 2),
      ...createBlock(4, 2, 2, 6),
    ],
    C: [
      ...createBlock(2, 0, 6, 2),
      ...createBlock(0, 2, 2, 6),
      ...createBlock(0, 8, 3, 2),
      ...createBlock(8, 2, 2, 6),
      ...createBlock(7, 8, 3, 2),
    ],
    S: [
      ...createBlock(0, 2, 2, 7),
      ...createBlock(0, 0, 4, 2),
      ...createBlock(4, 2, 2, 6),
      ...createBlock(6, 8, 4, 2),
      ...createBlock(8, 1, 2, 7),
    ],
  };

  const activeCells = React.useMemo(() => {
    const text = "IEEEPCS";
    const map = new Set();
    const columnsPerLetter = 12;

    text.split("").forEach((char, index) => {
      const shape = LETTER_SHAPES[char] || LETTER_SHAPES.I;
      const startCol = index * columnsPerLetter + 1;

      shape.forEach((pt) => {
        map.add(`${pt.r}-${startCol + pt.c}`);
      });
    });

    return map;
  }, []);

  return (
    <div className="w-full bg-white flex justify-center py-6 border-b border-gray-200">
      <div
        className="w-full max-w-[1920px] grid gap-[1px] md:gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          height: "min(22vw, 200px)",
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          const isActive = activeCells.has(`${r}-${c}`);

          return (
            <div
              key={`${r}-${c}`}
              className={`transition-colors duration-300 ${
                isActive
                  ? "bg-black rounded-[1px]"
                  : "bg-transparent"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MosaicTextHeader;

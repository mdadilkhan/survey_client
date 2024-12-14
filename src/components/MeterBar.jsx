import React from "react";

const MeterBar = ({ value }) => {
  // Calculate the position of the marker within the meter
//   const calculateMarkerPosition = (value) => {
//     if (value <= 2.2) return `${(value - 1.2) * 50}%`; // Low range
//     if (value <= 2.6) return `${50 + (value - 2.2) * 50}%`; // Medium range
//     return `${100}%`; // High range (clamped at max)
//   };

const calculateMarkerPosition = (score) => {
    const min = 0.5; // Minimum value
    const max = 4;   // Maximum value
  
    // Clamp the value to ensure it stays within the range
    const clampedScore = Math.max(min, Math.min(score, max));
  
    // Normalize the score within the range [0, 1]
    const normalizedScore = (clampedScore - min) / (max - min);
  
    // Map the normalized score to the meter width percentages
    if (normalizedScore <= 0.33) {
      return `${normalizedScore * 100}%`; // Low
    } else if (normalizedScore <= 0.66) {
      return `${33 + (normalizedScore - 0.33) * 100}%`; // Medium
    } else {
      return `${66 + (normalizedScore - 0.66) * 100}%`; // High
    }
  };
  
  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Meter Bar */}
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        {/* Low */}
        <div
          className="absolute h-full bg-red-500"
          style={{ width: "33%" }}
        ></div>
        {/* Medium */}
        <div
          className="absolute h-full bg-yellow-400"
          style={{ left: "33%", width: "33%" }}
        ></div>
        {/* High */}
        <div
          className="absolute h-full bg-green-500"
          style={{ left: "66%", width: "34%" }}
        ></div>
        {/* Marker */}
        <div
          className="absolute top-[-2px] w-2 h-10 bg-black rounded-full"
          style={{ left: calculateMarkerPosition(value) }}
        ></div>
      </div>
      {/* Labels */}
      <div className="flex justify-between text-sm mt-2">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
      {/* <div className="text-center mt-2 font-semibold">
        Value: {value}
      </div> */}
    </div>
  );
};

export default MeterBar;

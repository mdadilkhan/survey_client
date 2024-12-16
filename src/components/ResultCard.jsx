import React, { useState } from "react";
import MeterBar from "./MeterBar";
import UpArrow from "../assets/upArrow.svg"; // Replace with your up arrow SVG
import DownArrow from "../assets/downArrow.svg"; // Replace with your down arrow SVG

const ResultCard = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the "Read More" toggle

  const calculateMarkerPosition = (score) => {
    if (score <= 2.2) return `${(score - 1.2) * 33.33}%`; // Low
    if (score <= 2.6) return `${33.33 + (score - 2.2) * 33.33}%`; // Medium
    return `${66.66 + (score - 2.6) * 33.33}%`; // High
  };

  const getInterpretation = (id, score) => {
    if (id === "Awareness") {
      return score >= 1.2 && score <= 2.2
        ? data.high
        : score > 2.2 && score <= 2.6
        ? data.medium
        : data.low;
    } else if (id === "Preparedness") {
      return score >= 1 && score <= 2
        ? data.low
        : score > 2.2 && score <= 2.6
        ? data.medium
        : data.high;
    } else if (id === "Clarity" || id === "Understanding") {
      return score >= 1 && score <= 2
        ? data.high
        : score > 2 && score <= 3
        ? data.medium
        : data.low;
    }
    return null;
  };

  return (
    <div className="mix-w-[55rem] w-[50rem] h-full min-h-[23rem] bg-white shadow-lg rounded-[1.6rem] p-[4rem] font-nunito">
      <div className="flex justify-between items-center mb-4 gap-6">
        <h3 className="text-[1.6rem] sm:text-[2.2rem] font-bold break-words">{data.title}</h3>
      </div>

      <MeterBar value={data.score} />

      {/* Read More Section */}
      <div className="mt-4 w-full">
        <button
          className="flex items-center gap-2 text-br-1 font-semibold text-[1.4rem] hover:underline justify-between w-full font-nunito"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Show Less" : "Read More"}
          {isExpanded ? <img src={UpArrow} alt="" /> : <img src={DownArrow} alt="" /> }
        </button>

        {isExpanded && (
          <div className="mt-1">
            <p className="text-gray-600 text-[1.2rem] sm:text-[1.8rem] font-nunito">
              {getInterpretation(data.id, data.score)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;



// <div>
// {/* Progress Bar */}
// <div className="relative w-full bg-gray-300 h-3 rounded-full">
//   <div
//     className="absolute bg-red-500 h-3 rounded-l-full"
//     style={{ width: "33%" }}
//   ></div>
//   <div
//     className="absolute bg-yellow-400 h-3"
//     style={{ left: "33%", width: "34%" }}
//   ></div>
//   <div
//     className="absolute bg-green-500 h-3 rounded-r-full"
//     style={{ left: "67%", width: "33%" }}
//   ></div>
//   {/* Dynamic Marker */}
//   <div
//     className="absolute w-1 h-6 bg-black rounded-full top-[-6px]"
//     style={{ left: calculateMarkerPosition(data.score) }}
//   ></div>
// </div>

// {/* Labels */}
// <div className="flex justify-between text-sm mt-2">
//   <span>Low</span>
//   <span>Medium</span>
//   <span>High</span>
// </div>
// </div>

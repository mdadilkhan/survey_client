import React, { useState } from "react";
import IButton from "../assets/IButton.svg";
import MeterBar from "./MeterBar";
const ResultCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility

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
    <div className="mix-w-[55rem] w-[50rem] max-h-[27.4rem] bg-white shadow-lg rounded-[1.6rem] p-[4rem]">
      <div className="flex justify-between items-center mb-4 gap-6">
        <h3 className="text-[1.6rem] sm:text-[2.2rem] font-bold break-words">{data.title}</h3>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(true)} // Open the modal on button click
        >
          <img src={IButton} alt="Info" />
        </button>
      </div>
    
      <MeterBar value={data.score}/>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-[500px] rounded-lg p-6 flex flex-col gap-4">
            <h4 className="font-normal  mb-4 text-[1.8rem] sm:text-[2.4rem] text-center">Interpretation</h4>
            <p className="text-gray-600  text-[1.2rem] sm:text-[1.8rem]">
              {getInterpretation(data.id, data.score)}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)} // Close the modal
                className="bg-br-1 text-white px-4 py-2 rounded-lg font-nunito hover:bg-br-1 shadow-2xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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

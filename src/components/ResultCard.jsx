import React from "react";

const ResultCard = ({ data }) => {
  console.log("data>>", data);

  // Calculate marker position dynamically
  const calculateMarkerPosition = (score) => {
    if (score <= 2.2) return `${(score - 1.2) * 33.33}%`; // Low
    if (score <= 2.6) return `${33.33 + (score - 2.2) * 33.33}%`; // Medium
    return `${66.66 + (score - 2.6) * 33.33}%`; // High
  };

  return (
    <div className="max-w-[55rem] max-h-[27.4rem]  bg-white shadow-lg rounded-[1.6rem] p-[4rem]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[1.6rem] sm:text-[2.2rem] font-bold">{data.title}</h3>
        {/* <button className="text-gray-500 hover:text-gray-700">
          <i className="fas fa-info-circle">i</i>
        </button> */}
      </div>
      <div>
        {/* Progress Bar */}
        <div className="relative w-full bg-gray-300 h-3 rounded-full">
          <div
            className="absolute bg-red-500 h-3 rounded-l-full"
            style={{ width: "33%" }}
          ></div>
          <div
            className="absolute bg-yellow-400 h-3"
            style={{ left: "33%", width: "34%" }}
          ></div>
          <div
            className="absolute bg-green-500 h-3 rounded-r-full"
            style={{ left: "67%", width: "33%" }}
          ></div>
          {/* Dynamic Marker */}
          <div
            className="absolute w-1 h-6 bg-black rounded-full top-[-6px]"
            style={{ left: calculateMarkerPosition(data.score) }}
          ></div>
        </div>
        {/* Labels */}
        <div className="flex justify-between text-sm mt-2">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
      {/* Interpretation */}
      <div className="mt-4">
        <h4 className="font-semibold text-[#000] font-nunito text-[1.4rem]">Interpretation</h4>

        {data.id === "Awareness" && (
          <p className="text-[#636566] font-nunito text-[1.2rem] font-normal">
            {data.score >= 1.2 && data.score <= 2.2
              ? data.high
              : data.score > 2.2 && data.score <= 2.6
              ? data.medium
              : data.score > 2.6
              ? data.low
              : null}
          </p>
        )}
        {data.id === "Preparedness" && (
            <p className="text-[#636566] font-nunito text-[1.2rem] font-normal">
            {data.score >= 1 && data.score <= 2
              ? data.low
              : data.score > 2.2 && data.score <= 2.6
              ? data.medium
              : data.score > 2.6
              ? data.high
              : null}
          </p>
        )}
        {data.id === "Clarity" && (
            <p className="text-[#636566] font-nunito text-[1.2rem] font-normal">
            {data.score >= 1 && data.score <= 2
              ? data.high
              : data.score > 2 && data.score <= 3
              ? data.medium
              : data.score > 3
              ? data.low
              : null}
          </p>
        )}
        {data.id === "Understanding" && (
            <p className="text-[#636566] font-nunito text-[1.2rem] font-normal">
            {data.score >= 1 && data.score <= 2
              ? data.high
              : data.score > 2 && data.score <= 3
              ? data.medium
              : data.score > 3
              ? data.low
              : null}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;

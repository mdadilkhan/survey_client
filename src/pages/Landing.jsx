import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "../components/Header";
import FilteredModal from "./Times"; // Import the modal component
import { timeAtom } from "../recoil/timeatom";

function CareerSurvey() {
  const navigate = useNavigate();
  const name = useRecoilValue(timeAtom);
  console.log(name);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  return (
    <>
      <Header />
      <div className="flex justify-center items-center">
        <div
          style={{
            background: `conic-gradient(from 90deg at 50% 50%, #FFF 208.5344123840332deg, #F4EDFF 311.6137218475342deg)`,
          }}
          className="flex flex-col w-full sm:flex-col h-full py-[10rem] gap-[8rem] space-y-4"
        >
          {/* Left Section */}
          <div className="flex flex-col mb-6 text-center sm:text-center justify-center items-center">
            <h2 className="font-nunito text-[3.2rem] text-[#614298] font-bold text-wrap sm:w-[50%] mb-6">
              Understanding Careers in Psychology A Comprehensive Survey
            </h2>
            <p className="text-[#515151] font-nunito w-[90%] font-medium sm:text-[1.8rem] text-[1.4rem] sm:w-[70%]">
              This survey aims to explore the diverse career opportunities
              within the field of psychology. Whether you're a student,
              professional, or someone considering psychology as a career path,
              this survey provides insights into various roles, specializations,
              and career growth opportunities in psychology.
            </p>
          </div>
          <div className="flex justify-center sm:flex-row flex-col  sm:gap-[5rem] mt-[5rem] gap-[3rem] pl-7 ">
            {/* Survey Registration Section */}
            <div className="flex flex-col justify-center items-center sm:w-[25%] w-[95%] pl-7 h-auto space-y-5 p-4  border rounded-3xl">
              <h2 className="font-nunito text-[2.4rem] w-[80%] text-center">
              Take the Career Survey
              </h2>
              <p className="w-[80%] text-center text-wrap justify-center font-nunito text-[1.2rem]">
                Sign up today to join our upcoming workshop and boost your
                skills!
              </p>
              <button
                className="bg-[#9C81CC] text-white ml-8 font-semibold font-nunito text-[1.6rem] py-4 px-6 rounded-xl justify-center items-center sm:w-[22rem] w-[80%] h-[5rem] transition duration-300 flex"
                onClick={() => {
                  navigate(`/question/${1}`);
                }}
              >
                Take the Survey →
              </button>
            </div>

            {/* Workshop Registration Section */}
            <div className="flex flex-col justify-center items-center sm:w-[25%] w-[95%] pl-7 h-auto space-y-5 p-4 border rounded-3xl">
              <h2 className="font-nunito text-[2.4rem] w-[80%] text-center">
                Register for Workshop
              </h2>
              <p className="w-[80%] text-center text-wrap justify-center font-nunito text-[1.2rem]">
                Sign up today to join our upcoming workshop and boost your
                skills!
              </p>
              <button
                className="bg-[#9C81CC] text-white ml-8 font-semibold font-nunito text-[1.6rem] py-4 px-6 rounded-xl justify-center items-center sm:w-[22rem] w-[80%] h-[5rem] transition duration-300 flex"
                onClick={() => setIsModalOpen(true)}
              >
                Register for Workshop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the FilteredModal */}
      <FilteredModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default CareerSurvey;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "../components/Header";
import FilteredModal from "./Times"; // Import the modal component
import { timeAtom } from "../recoil/timeatom";
import MoveRight from "../assets/MoveRight.svg";
import landing from "../assets/landing.png";
function CareerSurvey() {
  const navigate = useNavigate();
  const name = useRecoilValue(timeAtom);
  console.log(name);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col w-full sm:flex-col h-full gap-0 sm:gap-[8rem] space-y-4 bg-[rgba(252,250,255,0.5)]">
          {/* Left Section */}

         
          <div className="flex flex-col mb-6 text-center sm:text-center justify-center items-center">
            <h2 className="font-nunito text-[2.4rem] sm:text-[4rem] text-[#614298] font-bold text-wrap sm:w-[50%] mb-6">
              Psychology Pathways
            </h2>
            <p className="text-s-1 font-nunito w-[90%] font-medium sm:text-[2.4rem] text-[1.4rem] sm:w-[70%]">
              Explore. Discover. Decide
            </p>
          </div>
          <div className="w-full sm:hidden ">
            <img
              src={landing}
              alt=""
              className="bg-blue bg-opacity-0"
            />
          </div>
        </div>

        <div className="w-[100%] flex justify-evenly">
          {/* left survey and registration container */}
          <div className="w-full sm:w-[60%] flex flex-col p-[4rem] sm:pl-[6rem] sm:pt-[3rem]">
            <div>
              <h5 className="text-[#6750A4] text-[1.8rem] sm:text-[2.4rem] font-bold">
                Understanding Careers in Psychology A Comprehensive Survey
              </h5>
              <p className="text-[#515151] font-nunito text-[1.4rem] sm:text-[1.8rem] font-normal">
                This survey aims to explore the diverse career opportunities
                within the field of psychology. Whether you're a student,
                professional, or someone considering psychology as a career
                path, this survey provides insights into various roles,
                specializations, and career growth opportunities in psychology.{" "}
              </p>
            </div>
            <div className="flex justify-center sm:flex-row flex-col  sm:gap-[5rem] mt-[5rem] gap-[3rem] sm:pl-7 w-full">
              {/* Survey Registration Section */}
              <div className="flex flex-col justify-center items-center sm:w-[50%] w-[95%] pl-7 h-auto space-y-5 p-4  border rounded-3xl">
                <h2 className="font-nunito text-[1.7rem] sm:text-[2.4rem] w-[80%] text-center text-p-4">
                  Take the Career Survey
                </h2>
                <p className="w-[80%] text-center text-wrap justify-center font-nunito text-[1.2rem]">
                  Sign up today to join our upcoming workshop and boost your
                  skills!
                </p>
                <button
                  className="bg-s-1 text-p-2 font-bold sm:font-semibold font-nunito text-[1.1rem] sm:text-[1.6rem] py-4 px-6 rounded-xl justify-center items-center sm:w-[80%] w-[80%] h-[5rem] transition duration-300 flex gap-2"
                  onClick={() => {
                    navigate(`/question/${1}`);
                  }}
                >
                  Take the Survey{" "}
                  <img
                    src={MoveRight}
                    alt=""
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(18%) sepia(55%) saturate(1650%) hue-rotate(243deg) brightness(95%) contrast(95%)",
                    }}
                  />
                </button>
              </div>

              {/* Workshop Registration Section */}
              <div className="flex flex-col justify-center items-center sm:w-[50%] w-[95%] pl-7 h-auto space-y-5 p-4 border rounded-3xl">
                <h2 className="font-nunito text-[1.7rem] sm:text-[2.4rem] w-[80%] text-center text-p-4">
                  Register for Workshop
                </h2>
                <p className="w-[80%] text-center text-wrap justify-center font-nunito text-[1.2rem]">
                  Sign up today to join our upcoming workshop and boost your
                  skills!
                </p>
                <button
                  className="bg-s-1 text-p-2  font-bold sm:font-semibold  font-nunito text-[1.1rem] sm:text-[1.6rem] py-4 px-6 rounded-xl justify-center items-center sm:w-[80%] w-[80%] h-[5rem] transition duration-300 flex gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  Register for Workshop{" "}
                  <img
                    src={MoveRight}
                    alt=""
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(18%) sepia(55%) saturate(1650%) hue-rotate(243deg) brightness(95%) contrast(95%)",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* right image container  */}

          <div className="w-[35%] sm:block hidden">
            <img
              src={landing}
              alt=""
              className="bg-blue bg-opacity-0"
            />
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

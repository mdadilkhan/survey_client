import React from 'react';
import temp from "../assets/Landing.svg"
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
function CareerSurvey() {
    const navigate=useNavigate();
  return (
    <>
    <Header/>
    <div className='flex justify-center items-center'>

    <div className="flex flex-col-reverse  w-full   sm:w-[70%] mt-[10rem] sm:flex-row  px-[3rem] sm:px-0 gap-[8rem] ">
      {/* Left Section */}
      <div className="flex flex-col items-start sm:w-1/2  w-full space-y-4">

      <div className=' flex flex-col mb-6 text-center sm:text-left'> 
        <h1 className="text-[#2F2B36] sm:text-[5rem] font-bold font-nunito gap-[0.05rem] flex flex-col text-[3rem]">
          CAREER IN <span className="text-[#9C81CC] ">SESSION SURVEY</span>
        </h1>
        <p className="text-[#515151]  font-nunito w-full   font-medium sm:text-[1.8rem] text-[1.4rem] sm:w-[90%]">
        Discover your strengths and passions with our Career Counselling Test. 
        Get personalized insights to guide you toward a successful career path and make informed decisions about your future. 
        Let us help you find the direction that fits your potential.</p>
        </div>
        <button className="bg-[#9C81CC] text-white font-semibold text-[1.6rem] py-4 px-6 rounded-xl  justify-center items-center sm:w-[22rem]  w-full h-[5rem] transition duration-300 flex"
           onClick={()=>{navigate(`/question/${1}`)}}>
          Take the Survey →
        </button>
      </div>

      {/* Right Section */}
      <div className=" sm:w-[40%] mt-8 lg:mt-0 flex justify-end w-[95%] mb-[2rem]">
        <img
           // Replace with the actual image URL
           src={temp}
          alt="Career Counseling Illustration"
          className="w-full h-auto "
        />
      </div>
     
      </div>
    </div>
    </>
  );
}

export default CareerSurvey;

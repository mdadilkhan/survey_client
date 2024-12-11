import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ResultCard from "../components/ResultCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../constant/APIConstant";
import {
  AwarenessofCareerOpportunities,
  PreparednessforRealWorldRoles,
  ClarityAboutSpecializationChoices,
  UnderstandingInternshipSelectionforCareerGrowth,
} from "../constant/APIConstant";
import ResultBg from "../assets/ResultBg.svg";
import { Link } from "react-router-dom";
import MoveRight from "../assets/MoveRight.svg";
const ViewResult = () => {
  const currentUser = useSelector((state) => state.userDetails.currentUser);
  const [resultData, setResultData] = useState({
    AwarenessofCareerOpportunities: null,
    PreparednessforRealWorldRoles: null,
    ClarityAboutSpecializationChoices: null,
    UnderstandingInternshipSelectionforCareerGrowth: null,
  });

  const getAwarenessofCareerOpportunities = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/question/limited-job/${currentUser?.id}`
      );
      setResultData((prev) => ({
        ...prev,
        AwarenessofCareerOpportunities:
          Math.round(res.data.data.totalOutcomePoints * 10) / 10,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getPreparednessforRealWorldRoles = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/question/lack-skill/${currentUser?.id}`
      );
      setResultData((prev) => ({
        ...prev,
        PreparednessforRealWorldRoles:
          Math.round(res.data.data.totalOutcomePoints * 10) / 10,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getClarityAboutSpecializationChoices = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/question/confusion-branches/${currentUser?.id}`
      );
      setResultData((prev) => ({
        ...prev,
        ClarityAboutSpecializationChoices:
          Math.round(res.data.data.totalOutcomePoints * 10) / 10,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getUnderstandingInternshipSelectionforCareerGrowth = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/question/internship-selection/${currentUser?.id}`
      );
      setResultData((prev) => ({
        ...prev,
        UnderstandingInternshipSelectionforCareerGrowth:
          Math.round(res.data.data.totalOutcomePoints * 10) / 10,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAwarenessofCareerOpportunities();
    getPreparednessforRealWorldRoles();
    getClarityAboutSpecializationChoices();
    getUnderstandingInternshipSelectionforCareerGrowth();
  }, []);
  return (
    <>
      <Header />
      <div
        className="h-[10rem] flex justify-start items-center sm:items-end pl-[2rem] sm:pl-[8rem] bg-cover bg-center"
        style={{
          backgroundImage: `url(${ResultBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h5 className="text-[#565857] font-nunito text-[2.4rem] sm:text-[4rem] font-semibold border-b-[5px] border-br-1">
          Result
        </h5>
      </div>

      {/* for card */}
      <div className="p-4 sm:p-[8rem] flex justify-evenly flex-wrap gap-6">
        <ResultCard
          data={{
            ...AwarenessofCareerOpportunities,
            score: resultData.AwarenessofCareerOpportunities,
          }}
        />
        <ResultCard
          data={{
            ...PreparednessforRealWorldRoles,
            score: resultData.PreparednessforRealWorldRoles,
          }}
        />
        <ResultCard
          data={{
            ...ClarityAboutSpecializationChoices,
            score: resultData.ClarityAboutSpecializationChoices,
          }}
        />
        <ResultCard
          data={{
            ...UnderstandingInternshipSelectionforCareerGrowth,
            score: resultData.UnderstandingInternshipSelectionforCareerGrowth,
          }}
        />
      </div>

      <div className="flex flex-col items-center p-4 gap-4">
        <p className="txt-[#2F2B36] text-center font-nunito text-[1.8rem] sm:text-[3.6rem] font-bold ">
          Registration for Workshop
        </p>
        <div className="px-10 mx-auto sm:w-[50%]">
          <p className="text-[#515151] text-center font-nunito text-[1.4rem] sm:text-[1.8rem] font-semibold">
            Take charge of your career! Join our workshop to explore growth
            opportunities, sharpen your skills, and connect with mentors who’ll
            guide you toward success. Let’s build your future together
          </p>
        </div>


          <Link to="/">
            <button className=" bg-br-1 py-6 px-10 rounded-[50px] text-white flex justify-center items-center text-[1.4rem] font-nunito font-bold gap-2">
              Register for Workshop
              <img src={MoveRight} alt="" />
            </button>
          </Link>
      </div>
    </>
  );
};

export default ViewResult;
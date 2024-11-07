import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "../constant/APIConstant";
import { useSelector,useDispatch } from "react-redux";
import { Stepper } from "../components/Step";
function Quiz() {
  const { questionId } = useParams(); 
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.userDetails.currentUser);

  const getQuestionById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/question/getQuestionById/${id}`);
      setCurrentQuestion(res.data.question);
      setLoading(false);
    } catch (err) {
        setCurrentQuestion(null);
      console.log(err);
      setLoading(false);
    }
  };

  const storeAnswerById = async () => {
    
    try {
      await axios.post(`${API_URL}/question/storeAnswerById`, {
        userId:userdetails.id,
        questionId,
        optionSelected: selectedOptions, // Send selected options for the current question
      }).then((res)=>{
        if(res.status){
            if(id+1<=13){
                console.log(id,"kdfslafjalsd")
            navigate(`question/${id+1}`)}
            else{

              navigate('/thankyou')
            }

        }
      });
    } catch (err) {
      console.error("Error storing answer:", err);
    }
  };

  function handleOptionChange(option) {
    const optionId = option.optionId;
    const isSelected = selectedOptions.includes(optionId);
  
    if (currentQuestion?.selectionType === "multi") {
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      } else {
        setSelectedOptions((prevSelected) => {
          if (prevSelected.length < 4) {
            return [...prevSelected, optionId];
          }
          return prevSelected;
        });
      }
    } else {
      // For single selection
      setSelectedOptions([optionId]);
    }
  }
  

  async function handleNext() {
    await storeAnswerById(); // Store the answer before navigating

    const nextQuestionId = parseInt(questionId) + 1;

    // Navigate to the next question or thank you page
    if (nextQuestionId > 13) {
      // Assuming there are only 13 questions
      navigate("/thankyou");
    } else {
      navigate(`/question/${nextQuestionId}`);
      setSelectedOptions([]); // Clear selected options for the next question
      setLoading(true);
    }
  }

  useEffect(() => {
    getQuestionById(questionId);
  }, [questionId]); // Re-fetch question whenever questionId changes

  const isNextButtonDisabled = currentQuestion?.selectionType === "multi"
    ? selectedOptions.length <= 3
    : selectedOptions.length === 0;

  if (loading) {
    return <p>Loading question...</p>;
  }

  return (
    <>
      <Header />
      <div className="mt-[5rem]">
      <Stepper current={1}/>
      </div>
      <div className="flex flex-col justify-center items-center bg-[#F8F8F8] p-8 rounded-[2rem] w-[100%] mx-auto">
        <div className="flex flex-col justify-between bg-white px-[2rem] sm:px-[4rem] py-[2rem] rounded-[2rem] w-[99%] sm:w-[70%] min-h-[80vh]">
          <div className="font-nunito text-[1.6rem] sm:text-[2.4rem] font-bold">
            <div className="flex gap-4">
              <h2>{questionId}.</h2>
              <h2>{currentQuestion?.questionText}</h2>
            </div>
            <p className="font-nunito text-[1.2rem] sm:text-[1.8rem] mb-[2rem] font-medium flex justify-end text-[#7D748C] capitalize">
              (Select {currentQuestion?.selectionType === "multi" ? "four options" : "one option"})
            </p>
          </div>
          <div
            className={`w-full flex flex-col gap-8 ${
              currentQuestion?.selectionType === "multi" ? "lg:grid lg:grid-cols-3 lg:gap-4" : "space-y-4"
            }`}
          >
            {currentQuestion?.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center justify-between px-[4rem] flex-row-reverse w-full h-[10rem] border border-[#D5D2D9] rounded-[1rem] cursor-pointer ${
                  (
                    currentQuestion?.selectionType === "multi"
                      ? selectedOptions.includes(option?.optionId)
                      : selectedOptions[0] === option?.optionId
                  )
                    ? "bg-purple-100"
                    : ""
                }`}
              >
                <input
                  type={currentQuestion?.selectionType === "multi" ? "checkbox" : "radio"}
                  name={`question-${questionId}`}
                  className="hidden"
                  checked={
                    currentQuestion?.selectionType === "multi"
                      ? selectedOptions.includes(option?.optionId)
                      : selectedOptions[0] === option?.optionId
                  }
                  onChange={() => handleOptionChange(option)}
                />
                <span
                  className={`checkbox-custom ${
                    currentQuestion?.selectionType === "multi"
                      ? selectedOptions.includes(option?.optionId)
                      : selectedOptions[0] === option?.optionId
                      ? "bg-[#9C81CC]"
                      : ""
                  }`}
                ></span>

                <span className="text-[1.4rem] sm:text-[1.8rem] font-nunito flex gap-4">
                  <h2>{String.fromCharCode(65 + index)}.</h2>
                  <h2>{option?.optionText}</h2>
                </span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-[3rem] items-center w-full p-[2rem]">
            <span className="text-black text-[1.4rem] sm:text-[2rem] font-nunito">
              Question: {`${questionId}/13`}
            </span>
            <button
              onClick={handleNext}
              className={`px-6 py-2 text-white w-[12rem] sm:w-[23rem] h-[4rem] sm:h-[6rem] rounded-full text-[1.4rem] sm:text-[1.8rem] ${
                isNextButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#9C81CC]"
              }`}
              disabled={isNextButtonDisabled}
            >
              {parseInt(questionId) === 13 ? "SUBMIT" : "NEXT"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
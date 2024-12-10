import Frame from "../assets/Frame.svg";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";
import { Stepper } from "../components/Step";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { timeAtom } from "../recoil/timeatom";

const ThankyouWorkshop = () => {
  const dispatch=useDispatch();
  const date = useRecoilValue(timeAtom);
  const resetTimeAtom = useResetRecoilState(timeAtom);
  console.log(date, "in thankyou page");

  return (
    <>
      <Header />
      <div className="bg-white w-full h-[85vh] flex justify-center items-center font-nunito space-y-6">
        <div className="flex flex-col justify-center items-center text-center">
          <img className="w-[15rem] h-[15rem]" src={Frame} alt="Thank you" />
          <p className="text-[2.2rem] font-nunito font-bold">
            Workshop Registration Confirmed!
          </p>
          <p className="font-nunito font-semibold text-[1.2rem] w-[60%] text-wrap">
            {`Thank you for registering for Workshop! We look forward to seeing you on `}
            <span className="text-[#9C81CC] font-bold">
              {date?.selectedSlot?.date}
            </span>
            {`. Please check your email for further details and instructions.`}
          </p>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor behavior
              dispatch(userDetails(null));
              resetTimeAtom();
              localStorage.clear();
              window.location.href = "/";
            }}
            className="text-p-1 flex justify-center items-center text-[1.4rem] font-nunito font-bold"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
};
export default ThankyouWorkshop;

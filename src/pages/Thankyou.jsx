import Frame from "../assets/Frame.svg";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";
import { Stepper } from "../components/Step";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { timeAtom } from "../recoil/timeatom";
const Thankyou = () => {
  const dispatch = useDispatch();
  const date = useRecoilValue(timeAtom);
  const resetTimeAtom = useResetRecoilState(timeAtom);
  console.log(date, "in thankyou page");

  return (
    <>
      <Header />
      <div className="bg-white w-full h-[85vh] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <img className="w-[15rem] h-[15rem]" src={Frame} />
          <p className="flex flex-col justify-center items-center text-[1.8rem] font-nunito font-bold">
            Thank You for time
            <span className="font-nunito font-semibold text-[1.2rem]">
              your response ha been sent successfull
            </span>
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
export default Thankyou;

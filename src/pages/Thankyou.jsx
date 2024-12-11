import Frame from "../assets/Frame.svg";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";
import { Stepper } from "../components/Step";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { timeAtom } from "../recoil/timeatom";
import { Link } from "react-router-dom";
import MoveRight from '../assets/MoveRight.svg'
const Thankyou = () => {
  const dispatch = useDispatch();
  const date = useRecoilValue(timeAtom);
  const resetTimeAtom = useResetRecoilState(timeAtom);
  console.log(date, "in thankyou page");
  // onClick={(e) => {
  //   e.preventDefault(); // Prevent the default anchor behavior
  //   dispatch(userDetails(null));
  //   resetTimeAtom();
  //   localStorage.clear();
  //   window.location.href = "/";
  // }}
  return (
    <>
      <Header />
      <div className="bg-white w-full h-[85vh] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-3">
          <img className="w-[15rem] h-[15rem]" src={Frame} />
          <p className="flex flex-col justify-center items-center text-[1.8rem] font-nunito font-bold">
            Thank You for time
            <span className="font-nunito font-semibold text-[1.2rem]">
              your response ha been sent successfull
            </span>
          </p>
          <div>
            <Link to="/workshop/result">
              <button className="bg-br-1 py-6 px-10 rounded-2xl text-white flex justify-center items-center text-[1.4rem] font-nunito font-bold gap-2">
                View Result
                <img src={MoveRight} alt="" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Thankyou;

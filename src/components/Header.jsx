import Logo from "../assets/Logo.png"; // Replace with your actual path to the logo
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector((state) => state.userDetails.currentUser);

  return (
    <div className="flex justify-between items-center p-4 sm:py-6 sm:h-[7rem] bg-b-1">
      {/* Logo */}
      <div className="w-[10rem] h-[5rem] sm:w-[25rem] sm:h-[5rem] flex justify-center items-center cursor-pointer">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Take Survey Button */}
      <button className="px-4 py-2 rounded bg-purple-100 text-purple-700 font-medium">
        Take Survey
      </button>

      {/* User Profile */}
      <div className="flex items-center space-x-2 mr-[0rem] sm:mr-[4rem]">
        <div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-purple-400 text-white font-medium rounded-full">
          {currentUser ? currentUser.name[0] : "X"}
        </div>

      </div>
    </div>
  );
};

export default Header;

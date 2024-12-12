import Logo from "../assets/Logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slices/userSlices";
import { Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
   const location=useLocation();
   console.log(location.pathname,"location");
   
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userDetails(null));
    localStorage.clear();
    navigate("/");
  };

  const currentUser = useSelector((state) => state.userDetails.currentUser);

  const popoverContent = (
    <div className="flex flex-col items-center justify-start p-4 space-y-2 w-[20rem]">
      <div className="flex gap-[2rem] items-center">
   <div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-purple-400 text-white font-medium rounded-full cursor-pointer">
     {currentUser ? currentUser?.name[0] : "X"}
   </div>

      <div className="flex flex-col">
      <h2 className="text-[1.6rem] font-semibold text-black">{currentUser?.name}</h2>
      <p className="text-[1.4rem] text-gray-500">{currentUser?.email}</p>
      </div>
      </div>
      <hr className="w-full border-t border-gray-300 my-2" />
      <button className="text-red-500 text-[1.4rem] w-full flex justify-start items-center gap-3 pl-4"  onClick={handleLogout}>
        <LogoutOutlined className="mr-1" /> Logout
      </button>
    </div>
  );

  return (
    <div className="flex justify-between items-center p-4 sm:py-6 sm:h-[7rem] bg-b-1 ">
      {/* Logo */}
      <div className="w-[10rem] h-[5rem] sm:w-[25rem] sm:h-[5rem] flex justify-center items-center cursor-pointer">
        <img src={Logo} alt="Logo" />
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-2 mr-[0rem] sm:mr-[4rem]">
        <Popover content={popoverContent} trigger="click">
        {location.pathname != '/' &&
 location.pathname != '/register' &&
 location.pathname != '/workshop/register' && (<div className="w-[4rem] h-[4rem] flex items-center text-[2rem] justify-center bg-purple-400 text-white font-medium rounded-full cursor-pointer">
            {currentUser ? currentUser.name[0] : "X"}
          </div>)}
        </Popover>
      </div>
    </div>
  );
};

export default Header;

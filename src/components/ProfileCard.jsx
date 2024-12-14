import React from "react";



const ProfileCard = ({data}) => {
  return (
    <div className="w-full sm:w-1/2 shadow-xl rounded-3xl flex justify-between  items-center flex-col sm:flex-row gap-2 sm:gap-10 p-10">
      {/* Profile Image */}

      {/* Profile Text */}
      <div className="flex flex-col items-center justify-center gap-4 sm:text-left mt-4 sm:mt-0">
        <img
          src={data?.img} // Replace with the actual image URL
          alt="Profile"
          className="w-[12rem] sm:w-[60rem] rounded-full shadow-md"
        />
        <h2 className="text-xl font-semibold text-purple-700">{data?.name}</h2>
      </div>
      <p className="text-gray-600 mt-2 text-[1rem] sm:tex-[1.2rem]">
       {data.desc}
      </p>
    </div>
  );
};

export default ProfileCard;

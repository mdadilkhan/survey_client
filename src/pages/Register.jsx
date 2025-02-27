import { useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { API_URL } from "../constant/APIConstant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../store/slices/userSlices";
import { useDispatch } from "react-redux";
import { Stepper } from "../components/Step";
import { useLocation } from "react-router-dom";
const courseCategories = {
  undergraduate: ["1st year", "2nd year", "3rd year", "4th year"],
  postgraduate: ["1st year", "2nd year"],
};
const universityList = ["Christ University", "Jindal University", "GBU"];
const subcategoryOptions = ["undergraduate", "postgraduate"];
const RegisterForm = () => {
  const location =useLocation();
  console.log(location.pathname);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    course: "",
    year: "",
    country_code: "+91",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Restrict "phone" input to numeric values only and a maximum of 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // Allow only numbers
      if (value.length > 10) return; // Restrict to 10 digits
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "course" ? { year: "" } : {}),
    }));
  };
  

  

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/register`, formData)
      .then((res) => {
        if (res.status === 201) {
          dispatch(userDetails(res.data.user));
          toast.success("Registered Successfully", {
            position: "top-center",
            duration: 3000,
            style: { fontWeight: "bold", fontSize: "14px" },
          });
          {location.pathname=="/workshop/register"?navigate("/workshop/payment"):navigate("/question/1")}
        }
      })
      .catch((err) => {
        toast.error("Failed To Register", {
          position: "top-center",
          duration: 3000,
          style: { fontWeight: "bold", fontSize: "14px" },
        });
        console.error("Registration error:", err);
      });
  };
console.log(formData);

  return (
    <>
     
      <Header />
      <div className="mt-[2rem]">
        <div>
          <div className="flex flex-col mb-6 text-center sm:text-center justify-center items-center">
            <h2 className="font-nunito text-[2.4rem] sm:text-[4rem] text-[#614298] font-bold text-wrap sm:w-[50%] mb-6">
              Psychology Pathways
            </h2>
            <p className="text-s-1 font-nunito w-[90%] font-medium sm:text-[2.4rem] text-[1.4rem] sm:w-[70%]">
              Explore. Discover. Decide
            </p>
          </div>
          <Stepper current={0}/>
        </div>
     
      </div>
      <div className="flex justify-center items-center py-10 w-full bg-[#F8F8F8]">
        <form
          onSubmit={handleSubmit}
          className="bg-[#FFFFFF] p-10 rounded-[1.4rem] shadow-lg w-[90%] sm:w-[70%]"
        >
          <h1 className="text-[4rem] font-bold mb-4 font-nunito">Register</h1>

          <div className="flex flex-col">
            <div className="flex flex-col w-full mb-8">
              <label className="text-[2rem] font-light mb-4 font-nunito">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-br-1 p-[2rem] rounded-[10px] w-[100%] h-[6rem] text-[2rem] font-normal font-nunito"
                placeholder="Name"
              />
            </div>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-6 w-full mb-8">
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[100%] h-[6rem] text-[2rem] font-normal font-nunito"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Phone No. (Whatsapp)*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[100%] h-[6rem] text-[2rem] font-normal font-nunito"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[2rem] font-light mb-4 font-nunito">
                Name of the School/University*
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                className="border border-br-1 p-[2rem] rounded-[10px] w-[100%] h-[6rem] text-[2rem] font-normal font-nunito"
                placeholder="School/University"
              />
              {/* <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                required
                className="border border-br-1 p-[1rem] rounded-[10px] w-[100%] h-[6rem] text-[2rem] font-normal font-nunito mb-8"
              >
                <option value="" disabled>
                  Select School/University
                </option>
                {universityList.map((university, index) => (
                  <option key={index} value={university}>
                    {university}
                  </option>
                ))}
              </select> */}
            </div>

            <div className="flex flex-col">
              <label className="text-[2rem] font-light mb-4 font-nunito">
                Course*
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="border border-br-1 p-6 rounded-[10px] w-[100%] h-[6rem] text-[1.8rem] font-normal font-nunito capitalize"
              >
                <option value="" disabled>
                  Select Course
                </option>
                {subcategoryOptions.map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mt-10">
              <label className="text-[2rem] font-light mb-4 font-nunito">
                Year*
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                disabled={!formData.course}
                className="border border-br-1 p-6 rounded-[10px] w-[100%] h-[6rem] text-[1.8rem] font-normal font-nunito"
              >
                <option value="" disabled>
                  Select Year
                </option>
                {(courseCategories[formData.course] || []).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-p-1 rounded-[6px] w-[50%] sm:w-[25%] h-[6rem] text-b-1 text-[2rem] font-normal font-nunito mt-10"
          >
            Register
          </button>
          
        </form>
      </div>
    </>
  );
};

export default RegisterForm;

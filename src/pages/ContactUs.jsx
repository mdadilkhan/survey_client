import { useState } from "react";
import Header from "../components/Header";
import Location from "../assets/Location.svg";
import Phone from "../assets/Phone.svg";
import Mail from "../assets/Mail.svg";
import FacebookLogo from "../assets/FacebookLogo.svg";
import InstagramLogo from "../assets/InstagramLogo.svg";
import LinkedinLogo from "../assets/LinkedinLogo.svg";
import TwitterLogo from "../assets/TwitterLogo.svg";
import YoutubeLogo from "../assets/YoutubeLogo.svg";
import Footer from "../components/Footer";
import axios from "axios";
import { API_URL } from "../constant/APIConstant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post(`${API_URL}/contactSupport`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('We will contact you soon', {
            position: 'top-center', // Set the position to top-center
            duration: 3000, // Display for 3 seconds
            style: {
              fontWeight: 'bold',
              fontSize: '14px', // Smaller text
            },
          });
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err); // Log the error for debugging
        toast.error('Failed To send ', {
          position: 'top-center', // Set the position to top-center
          duration: 3000, // Display for 3 seconds
          style: {
            fontWeight: 'bold',
            fontSize: '14px', // Smaller text
          },
        });
      });
  };
console.log(formData);

  return (
    <>
     <Header />
      <div className="w-full mx-auto overflow-hidden">
        <h2 className="text-[3.5rem] text-p-1 font-semibold text-center font-nunito mt-[3rem]">
          Contact Us
        </h2>
        <p className="w-[95%] sm:w-[50%] mx-auto text-[1.8rem] text-center text-g-4 mb-[5rem] font-semibold font-nunito">
          Sage Turtle is a mental health initiative which aims to provide
          everyone access to personalized care experience through technology.
        </p>
        <div className="bg-gradient-to-r from-b-2 to-white py-12 w-full flex sm:flex-row flex-col-reverse relative">
          <div className="w-full sm:w-[40%] ml-[2rem] sm:ml-[8.4rem] flex flex-col gap-8 sm:mt-0 mt-[25px]">
            <h1 className="text-[4rem] text-bl font-semibold font-nunito">
              Let's Connect
            </h1>
            <div className="flex items-center gap-4">
              <img src={Location} alt="Location" />
              <h1 className="text-[1.6rem] text-bl font-thin font-nunito w-[75%]">
                C-47, Shivalik, Malviya Nagar, New Delhi, Delhi -110017
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <img src={Phone} alt="Phone" />
              <h1 className="text-[1.6rem] text-bl font-thin font-nunito">
                +91 - 98 73 020 194
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <img src={Mail} alt="Mail" />
              <h1 className="text-[1.6rem] text-bl font-thin font-nunito">
                info@ensolab.in
              </h1>
            </div>
            <div className="relative sm:absolute sm:bottom-16">
              <h1 className="text-[12px] text-bl font-semibold font-nunito">
                Where can you find us
              </h1>
              <div className="flex items-center gap-5">
                <img src={InstagramLogo} alt="Instagram" />
                <img src={LinkedinLogo} alt="LinkedIn" />
                <img src={TwitterLogo} alt="Twitter" />
                <img src={YoutubeLogo} alt="YouTube" />
                <img src={FacebookLogo} alt="Facebook" />
              </div>
            </div>
          </div>
          <div className="bg-br-1 w-[1px] h-auto sm:block hidden"/>
          <div className="w-full sm:w-[60%] ml-[2rem] sm:ml-[8.4rem] flex flex-col gap-8">
            <div>
              <h1 className="text-[3rem] sm:text-[4rem] text-bl font-semibold font-nunito">
                Happy to help
              </h1>
              <p className="text-[1.6rem] text-g-3 font-normal font-nunito">
                Our squad is here to help you
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[90%] sm:w-[70%] h-[6rem] text-[2rem] font-normal font-nunito"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[90%] sm:w-[70%] h-[6rem] text-[2rem] font-normal font-nunito"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[90%] sm:w-[70%] h-[6rem] text-[2rem] font-normal font-nunito"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[2rem] font-light mb-4 font-nunito">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border border-br-1 p-[2rem] rounded-[10px] w-[90%] sm:w-[70%] text-[2rem] font-normal font-nunito"
                  placeholder="Enter your description"
                  rows="4"
                />
              </div>
              <div className="flex items-center mb-6 gap-4">
                <input
                  type="checkbox"
                  name="terms"
                  checked={termsAccepted} // Bind checkbox state
                  onChange={()=> setTermsAccepted(!termsAccepted)} // Handle change for checkbox
                  id="terms"
                  className="w-[1.6rem] h-[1.6rem]"
                />
                <label
                  htmlFor="terms"
                  className="text-[1.6rem] text-g-4 font-normal font-nunito w-[75%]"
                >
                  By continuing you agree to Sage Turtle’s Terms and Conditions
                </label>
              </div>
              <button
                type="submit"
                className="bg-p-1 rounded-[6px] w-[50%] sm:w-[25%] h-[6rem] text-b-1 text-[2rem] font-normal font-nunito"
                disabled={!termsAccepted}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;
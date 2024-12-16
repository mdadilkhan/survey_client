import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import visa from "../assets/visa.svg";
import Tick from "../assets/tick.svg";
import RazorPay from "../components/Razorpay.jsx";
import Logo from "../assets/Logo.svg";
import axios from "axios";
import { API_URL } from "../constant/APIConstant.js";
import { useRecoilValue } from "recoil";
import { timeAtom } from "../recoil/timeatom.js";

const PayementDetails = () => {
  const navigate = useNavigate();
  // const courseDetails = useSelector((state) => state.courseDetails.purchaseDetails);
  let currentUser = useSelector((state) => state.userDetails.currentUser);
  const date = useRecoilValue(timeAtom);
  currentUser = {
    ...currentUser,
    date: date?.selectedSlot?.date,
    mode:date?.selectedSlot?.mode,
    slot:date?.selectedSlot?.time
  };
  console.log(currentUser,"userdata with date");
  
  // const gstRate = 0.18;
  const price = 250;
  // const gst = Number((price * gstRate).toFixed(2));
  
  // Calculate initial total with two-decimal precision
  const [total, setTotal] = useState(price);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  
  console.log("Initial Values:", price, total);
  
  const applyCoupon = () => {
    axios
      .post(`${API_URL}/payment/applyCouponCode`, {
        couponCode: coupon,
        amount: price + gst,
      })
      .then((res) => {
        if (res.status === 200) {
          // Get and round discount to two decimals
          const discountAmount = Number(res.data.discountAmount.toFixed(2));
  
          // Set the discount and calculate the total after applying the discount
          setDiscount(discountAmount);
          setTotal(Number((price + gst - discountAmount).toFixed(2)));
  
          setCouponApplied(true);
          setCouponMessage("Coupon applied successfully!");
        }
      })
      .catch((err) => {
        console.log(err?.message);
        
        setCouponMessage("Invalid coupon code.");
      });
  };
  
  // Payload data for other uses
  const data = {
    userId:currentUser?.id,
     price: total,
  };

  return (
    <>
      <div className="mt-10">
        <p className="font-nunito font-bold text-4xl text-[#565857] block sm:hidden ml-4 mt-4">
          Check Out
        </p>
        <div className="h-screen bg-card-bg-3">
          <div className="flex justify-evenly sm:flex-row flex-col-reverse p-4 sm:p-16 bg-background2 w-full gap-4 m-t">
            <div className="w-[100%] sm:w-[35%] p-2 sm:p-8 flex flex-col justify-center gap-6">
              <p className="font-nunito font-bold text-4xl text-[#565857] sm:block hidden">
                Check Out
              </p>
              <img className="h-[50px] w-[250px]" src={visa} alt="" />
              <p className="text-[1.5rem] font-nunito ml-2">
                By continuing to payment, I agree to the{" "}
                <a
                  className="text-[#0056D2] underline"
                  target="_blank"
                  href="https://sageturtle.in/privacyPolicyPage"
                >
                   Refund Policy,
                </a>{" "}
                and{" "}
                <a
                  className="text-[#0056D2] underline"
                  target="_blank"
                  href="https://sageturtle.in/privacyPolicyPage"
                >
                  Privacy Policy.
                </a>
              </p>
              <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="capitalize py-2.5 px-5 rounded-lg w-[150px] bg-white border border-border text-p-1 font-bold text-[1.6rem] font-nunito"
                >
                  Back
                </button>

                <RazorPay currentPayementDetails={data} />
              </div>
            </div>
            <div className="w-[100%] sm:w-[40%] p-8 bg-white rounded-3xl flex flex-col gap-10 shadow-md">
              <div className="flex flex-col gap-8">
                <div className="w-full">
                  <img className="w-1/2" src={Logo} alt="Logo" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-nunito text-[2rem] text-[#06030D]">
                       Workshop Registraion Fees
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                  <p className="font-nunito text-[20px] font-semibold w-[70%]">
                    Individual
                  </p>
                  <p className="w-[30%] font-nunito font-normal text-[2rem] text-p-3">
                    ₹{price}/-
                  </p>
                </div>
                {/* <div className="flex justify-between items-center w-full">
                  <p className="font-nunito text-[1.6rem] font-semibold w-[70%]">
                    GST (18%)
                  </p>
                  <p className="w-[30%] font-nunito font-normal text-[1.6rem] text-p-3">
                    ₹{gst}/-
                  </p>
                </div> */}

                {/* Coupon Input */}

                <hr />

                <div className="flex justify-between items-center w-full">
                  <p className="font-nunito text-[20px] font-semibold w-[70%]">
                    Total
                  </p>
                  <p className="w-[30%] font-nunito font-normal text-[2rem] text-p-3">
                    ₹{total}/-
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayementDetails;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant/APIConstant";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { timeAtom } from "../recoil/timeatom";

const RazorPay = ({ currentPayementDetails }) => {
  let currentUser = useSelector((state) => state.userDetails.currentUser);
  const date = useRecoilValue(timeAtom);
  
  currentUser = {
    ...currentUser,
    date: date?.selectedSlot?.dates,
    mode: date?.selectedSlot?.mode,
    slot: date?.selectedSlot?.time,
  };
  console.log(currentUser,"gejololojsadfjaskd");
  
  
  const [paymentStatus, setPaymentStatus] = useState("undefined");
  const navigate = useNavigate();
  
  const config = {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
  
  // Handler for RazorPay checkout
  const checkoutHandler = async () => {
    try {
      // Create order with amount
      const orderResponse = await axios.post(
        `${API_URL}/payment/createOrder`,
        { amount: currentPayementDetails.price },
        config
      );
  
      const { data: orderData } = orderResponse;
      // rzp_live_IIwhdZvx1c4BGz
      // rzp_test_IqmS1BltCU4SFU
      // Razorpay options
      const options = {
        key: "rzp_live_IIwhdZvx1c4BGz",
        amount: orderData.amount,
        currency: "INR",
        name: "Sage Turtle",
        description: "Test Transaction",
        payment_capture: true,
        image:
          "https://firebasestorage.googleapis.com/v0/b/sage-turtle-website.appspot.com/o/logo.jpeg?alt=media&token=97d30b20-63fb-461e-8063-ca619ffaa7e3",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const paymentData = {
              ...currentPayementDetails, // Include current payment details
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            // Verify payment
            const verificationResponse = await axios.post(
              `${API_URL}/payment/verifyOrder`,
              paymentData,
              config
            );
  
            if (verificationResponse.status === 200) {
              // Booking data
              const bookingData = {
                userId: currentUser.id,
                mode: currentUser.mode,
                slot: currentUser.slot,
                date: currentUser.date,
              };
  
              // Book slot
              const bookingResponse = await axios.post(
                `${API_URL}/bookslot`,
                bookingData,
                config
              );
  
              if (bookingResponse.status === 200) {
                toast.success("Slot booked successfully!", {
                  position: "top-center",
                  duration: 3000,
                  style: {
                    fontWeight: "bold",
                    fontSize: "14px",
                  },
                });
                navigate("/workshop/thankyou");
              } else {
                throw new Error(bookingResponse.data.message || "Slot booking failed");
              }
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (err) {
            console.error("Error during payment verification or booking:", err.message);
            toast.error(err.message, {
              position: "top-center",
              duration: 3000,
              style: {
                fontWeight: "bold",
                fontSize: "14px",
              },
            });
          }
        },
        prefill: {
          name: `${currentUser.firstName} ${currentUser.lastName}`, // User's name
          email: currentUser.email, // User's email
          contact: currentUser.phone, // User's phone
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#614298",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Order creation error:", error.message);
      toast.error("Failed to create order. Please try again.", {
        position: "top-center",
        duration: 3000,
        style: {
          fontWeight: "bold",
          fontSize: "14px",
        },
      });
    }
  };
  

  return (
    <div>
      <button
        type="button"
        className="bg-p-1 w-[17rem] h-[4.8rem] text-b-1 rounded-lg cursor-pointer capitalize font-bold text-[1.6rem] font-nunito"
        onClick={checkoutHandler}
      >
        <span className="btn1">Proceed</span>
      </button>
    </div>
  );
};

export default RazorPay;

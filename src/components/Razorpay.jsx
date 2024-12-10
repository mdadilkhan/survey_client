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
  console.log(date,"jadhsfjkhads");
  
   currentUser = {
    ...currentUser,
    date: date?.selectedSlot?.date,
    mode:date?.selectedSlot?.mode,
    slot:date?.selectedSlot?.time
  };
  const [paymentStatus, setPaymentStatus] = useState("undefined");
  const navigate = useNavigate();
  console.log(currentUser);
  
  const config = {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
   console.log(config,"in razorpay");
   
  // Handler for RazorPay checkout
  const checkoutHandler = async () => {
    try {
      // Create order with amount
      const { data } = await axios.post(
        `${API_URL}/payment/createOrder`,
        { amount: currentPayementDetails.price },
        config
      );
      console.log(data);
      
      // Razorpay options
      const options = {
        key: "rzp_test_IqmS1BltCU4SFU",
        amount: data.amount,
        currency: "INR",
        name: "Sage Turtle",
        description: "Test Transaction",
        payment_capture: true,
        image:
          "https://firebasestorage.googleapis.com/v0/b/sage-turtle-website.appspot.com/o/logo.jpeg?alt=media&token=97d30b20-63fb-461e-8063-ca619ffaa7e3",
        order_id: data.id,
        handler: async function (response) {
          const paymentData = {
            ...currentPayementDetails, // Include current payment details in the request
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment
          try {
            const verificationResponse = await axios.post(
              `${API_URL}/payment/verifyOrder`,
              paymentData,
              config
            );

            if (verificationResponse.status === 200) {
              toast.success("Payment Successful", {
                position: "top-center",
                duration: 3000,
                style: {
                  fontWeight: "bold",
                  fontSize: "14px",
                },
              });
              navigate("/purchased")
            } else {
              toast.error("Payment Verification Failed", {
                position: "top-center",
                duration: 3000,
                style: {
                  fontWeight: "bold",
                  fontSize: "14px",
                },
              });
            }
          } catch (error) {
            toast.error("Payment Verification Error", {
              position: "top-center",
              duration: 3000,
              style: {
                fontWeight: "bold",
                fontSize: "14px",
              },
            });
            console.error("Verification Error:", error);
          }
        },
        prefill: {
          name: currentUser.firstName + currentUser.lastName,        // User's name
          email: currentUser.email,      // User's email to receive notifications
          contact: currentUser.phone,    // User's phone number for notifications
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
      toast.error("Order Creation Failed", {
        position: "top-center",
        duration: 3000,
        style: {
          fontWeight: "bold",
          fontSize: "14px",
        },
      });
      console.error("Order Creation Error:", error);
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

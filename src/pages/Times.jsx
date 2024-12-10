import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { timeAtom } from '../recoil/timeatom'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from '../constant/APIConstant';
import axios from 'axios';

const decemberAppointments = [
  { date: "21 Dec, 2024", time: "11:00 AM - 12:30 PM", mode: "offline" },
  { date: "22 Dec, 2024", time: "11:00 AM - 12:30 PM", mode: "offline" },
  { date: "22 Dec, 2024", time: "13:00 AM - 14:30 PM", mode: "offline" },
  { date: "21 Dec, 2024", time: "16:00 PM - 17:30 PM", mode: "online" },
  { date: "22 Dec, 2024", time: "16:00 PM - 17:30 PM", mode: "online" },
  { date: "22 Dec, 2024", time: "14:00 PM - 15:30 PM", mode: "online" },

];

const januaryAppointments = [
  { date: "4 Jan, 2025", time: "11:00 AM - 12:30 PM", mode: "offline" },
  { date: "4 Jan, 2025", time: "16:00 AM - 17:30 PM", mode: "online" },
  { date: "5 Jan, 2025", time: "9:00 AM - 9:30 AM", mode: "offline" }
];

function FilteredModal({ isModalOpen, setIsModalOpen }) {
  const [filteredMode, setFilteredMode] = useState("offline"); // "online" or "offline"
  const [timeState, setTimeState] = useRecoilState(timeAtom); // Recoil state for storing mode and selected slot
  const [allslots,setallSlots]=useState([]);
  const navigate=useNavigate();

  const details = useSelector((state) => state.userDetails.currentUser);
  
  const getSlots = async () => {
    try {
      const res = await axios.get(`${API_URL}/getslots`);
      if (res.status === 200) {
        setAllSlots(res.data.slots);
      }
    } catch (err) {
      console.error("Error fetching slots:", err.message);
    }
  };
  // Filtered data for each month
  const filteredDecemberAppointments = decemberAppointments.filter(
    (appointment) => !filteredMode || appointment.mode === filteredMode
  );

  const filteredJanuaryAppointments = januaryAppointments.filter(
    (appointment) => !filteredMode || appointment.mode === filteredMode
  );

  // Handle appointment selection and store in Recoil state
  const handleSelectAppointment = async (appointment) => {
    try {
      // Update Recoil state with the selected slot and mode
      setTimeState({
        mode: filteredMode,
        selectedSlot: appointment,
      });
  
      if (details?.id) {
        const data = {
          userId: details.id,
          mode: filteredMode,
          slot: appointment?.SelectedSlot,
          date: appointment?.date,
        };
  
        // Send booking data to the server
        const response = await axios.post(`${API_URL}/bookslot`, data);
  
        // Navigate to the payment page if booking is successful
        if (response?.status === 200) {
          navigate("/workshop/payment");
        } else {
          console.error("Failed to book the slot:", response?.data?.message);
        }
      } else {
        // If no user ID is available, navigate to the registration page
        setIsModalOpen(false);
        navigate("/workshop/register");
      }
    } catch (err) {
      console.error("Error booking the slot:", err.message);
    }
  };

  useEffect(()=>{
    getSlots();
   })
  return (
    <Modal
      title="Workshop Slot"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      width="95rem"
      style={{ height: "105rem" }}
      footer={null}
    >
      {/* Filter Buttons */}
      <div className="flex justify-center sm:w-[37%] w-[90%] h-[5rem] gap-4 bg-[#F6F0FF] border rounded-3xl mb-4 font-nunito ">
        <button
          className={`w-[48%] ${
            filteredMode === "online" ? "bg-[#9C81CC] text-white" : "bg-[#F6F0FF]"
          } border-solid rounded-3xl`}
          onClick={() => setFilteredMode("online")}
        >
          Online
        </button>
        <button
          className={`w-[48%] ${
            filteredMode === "offline" ? "bg-[#9C81CC] text-white" : "bg-[#F6F0FF]"
          } border-solid rounded-3xl`}
          onClick={() => setFilteredMode("offline")}
        >
          Offline
        </button>
      </div>

      {/* Render December Appointments */}
      <div className="mb-6">
        <h2 className="text-[2.2rem] font-nunito font-semibold text-[#565857]  mb-4">December</h2>
        <div className="flex flex-row gap-8 flex-wrap">
          {filteredDecemberAppointments.length > 0 ? (
            filteredDecemberAppointments.map((appointment, index) => (
              <div
                key={index}
                className="p-4 bg-[#F6F0FF] sm:w-[30%] w-[40%] border rounded-xl flex flex-wrap justify-center font-nunito text-[2rem] items-center group border-transparent transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-[#9C81CC] cursor-pointer"
                onClick={() => handleSelectAppointment(appointment)}
              >
                <div>
                  <p className="text-lg font-semibold">{appointment.date}</p>
                  <p className="text-sm">{appointment.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments available</p>
          )}
        </div>
      </div>

      {/* Render January Appointments */}
      <div>
        <h2 className="text-[2.2rem] font-nunito font-semibold text-[#565857]  mb-4">January</h2>
        <div className="flex flex-row gap-8 flex-wrap">
          {filteredJanuaryAppointments.length > 0 ? (
            filteredJanuaryAppointments.map((appointment, index) => (
              <div
                key={index}
                className="p-4 bg-[#F6F0FF] sm:w-[30%] w-[40%]  border rounded-xl flex flex-wrap justify-center font-nunito text-[2rem] items-center group border-transparent transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-[#9C81CC] cursor-pointer"
                onClick={() => handleSelectAppointment(appointment)}
              >
                <div>
                  <p className="text-lg font-semibold">{appointment.date}</p>
                  <p className="text-sm">{appointment.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No appointments available</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FilteredModal;

import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { timeAtom } from '../recoil/timeatom'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL, filterAppointmentsByMonth } from '../constant/APIConstant';
import axios from 'axios';

function FilteredModal({ isModalOpen, setIsModalOpen }) {
  const [filteredMode, setFilteredMode] = useState("offline"); // "online" or "offline"
  const [timeState, setTimeState] = useRecoilState(timeAtom); // Recoil state for storing mode and selected slot
  const [allslots,setallSlots]=useState([]);
  const navigate=useNavigate();

  const details = useSelector((state) => state.userDetails.currentUser);

  const decemberAppointments = filterAppointmentsByMonth(allslots, "Dec");
const januaryAppointments = filterAppointmentsByMonth(allslots, "Jan");
  
  const getSlots = async () => {
    try {
      const res = await axios.get(`${API_URL}/getAllSlots`);
      if (res.status === 200) {
        setallSlots(res.data.slots);
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
    if(isModalOpen){
    getSlots();}
   },[isModalOpen])
  return (
    <Modal
    title={
      <div className="flex justify-center items-center text-[#565857] font-bold text-[3.2rem] font-nunito ">
        Workshop Slot
      </div>
    }
    open={isModalOpen}
    onCancel={() => setIsModalOpen(false)}
    width="95rem"
    style={{ height: "105rem" }}
    footer={null}
  >
    {/* Centered Filter Buttons */}
    <div className='sm:w-[20%] w-[50%] sm:ml-[35rem] ml-[5rem] h-[0.5rem] bg-[#9C81CC]'/>
    <div className="flex justify-center items-center h-[10rem]">
      <div className="flex justify-center sm:w-[37%] w-[90%] h-[5rem] gap-4 bg-[#F6F0FF] border rounded-3xl font-nunito">
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
    </div>
  
    {/* Render December Appointments */}
    <div className="mb-6">
      <h2 className="text-[2.2rem] font-nunito font-semibold text-[#565857] mb-4">December</h2>
      <div className="flex flex-row gap-8 flex-wrap ">
        {filteredDecemberAppointments.length > 0 ? (
          filteredDecemberAppointments.map((appointment, index) => (
            <div
              key={index}
              className={`p-4 sm:w-[30%] w-[45%] border rounded-xl flex flex-wrap  justify-center font-nunito sm:text-[1.4rem] text-[1.2rem] items-center group transition duration-300 ease-in-out cursor-pointer ${
                appointment?.info === 0
                  ? "border-[#c7c7cc] text-[#c7c7cc] cursor-not-allowed"
                  : appointment?.info === 1
                  ? "border-[#e08505] text-[#e08505] hover:scale-105 hover:shadow-lg"
                  : appointment?.info === 2
                  ? "border-[#34c759] text-[#34c759] hover:scale-105 hover:shadow-lg"
                  : "border-transparent"
              }`}             
              onClick={() => {
                if (appointment?.isAvailable) {
                  handleSelectAppointment(appointment);
                }
              }}
            >
              <div>
                <p className="font-semibold">{appointment.date}</p>
                <p className="">{appointment.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 ml-20">No appointments available</p>
        )}
      </div>
    </div>
  
    {/* Render January Appointments */}
    <div>
      <h2 className="text-[2.2rem] font-nunito font-semibold text-[#565857] mb-4">January</h2>
      <div className="flex flex-row gap-8 flex-wrap">
        {filteredJanuaryAppointments.length > 0 ? (
          filteredJanuaryAppointments.map((appointment, index) => (
            <div
              key={index}
              className={`p-4 sm:w-[30%] w-[45%] border rounded-xl flex flex-wrap justify-center  font-nunito text-[3rem] items-center group transition duration-300 ease-in-out cursor-pointer ${
                appointment?.info === 0
                  ? "border-[#c7c7cc] text-[#c7c7cc] cursor-not-allowed"
                  : appointment?.info === 1
                  ? "border-[#e08505] text-[#e08505] hover:scale-105 hover:shadow-lg"
                  : appointment?.info === 2
                  ? "border-[#34c759] text-[#34c759] hover:scale-105 hover:shadow-lg"
                  : "border-transparent"
              }`}
              
              onClick={() => {
                if (appointment?.isAvailable) {
                  handleSelectAppointment(appointment);
                }
              }}
            >
              <div>
                <p className="text-lg font-semibold">{appointment.date}</p>
                <p className="text-sm">{appointment.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-10 ml-20 text-gray-500">No appointments available</p>
        )}
      </div>
    </div>
    <div className="sm:w-[70%] w-full sm:text-[1.8rem] text-[1.2rem]  flex font-nunito justify-end gap-10 mt-[5rem]">
  {/* Filling Fast */}
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-[#e08505] rounded-full"></span>
    <p className="text-[#e08505]">Filling Fast</p>
  </div>

  {/* Available */}
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-[#34c759] rounded-full"></span>
    <p className="text-[#34c759]">Available</p>
  </div>

  {/* Already Booked */}
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 bg-[#c7c7cc] rounded-full"></span>
    <p className="text-[#c7c7cc]">Already Booked</p>
  </div>
</div>

  </Modal>
  
  );
}

export default FilteredModal;

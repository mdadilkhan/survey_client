 export const API_URL = "http://localhost:5001/api"
// export const API_URL = "https://survey-server-th3f.onrender.com/api";

export const API_URI = "https://practice.sageturtle.in/corporate/";
export const getLoggedInUserDetails = () => {
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    const parsedData = JSON.parse(storedData);

    if (parsedData.userDetails) {
      const userDetails = JSON.parse(parsedData.userDetails);

      const currentUser = userDetails.currentUser;
      return currentUser;
    } else {
      console.error("userDetails not found in the stored data.");
    }
  } else {
    console.error("No data found in localStorage for the key 'persist:root'.");
  }
};


 export const filterAppointmentsByMonth = (slots, targetMonth) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return slots
    .filter((slot) => {
      const [day, month] = slot.date.split("/");
      return months[parseInt(month, 10) - 1] === targetMonth;
    })
    .map((slot) => ({
      date: new Date(slot.date.split("/").reverse().join("-")).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: slot.time,
      mode: slot.mode,
      isAvailable:slot?.isAvailable,
      info:slot?.info
    }));
};
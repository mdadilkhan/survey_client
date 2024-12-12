 export const API_URL = "http://localhost:5003/api"
// export const API_URL = "https://survey.sageturtle.in/api";
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


export const AwarenessofCareerOpportunities={
  id:"Awareness",
  title:"Awareness of Career Opportunities",
  low:"your awareness of career opportunities in psychology may currently be limited to traditional roles like Clinical and Counseling Psychology. This could be an opportunity to explore diverse and interdisciplinary fields in psychology to gain a broader perspective.",
  medium:"you have some awareness of career opportunities in psychology, but your focus may be on a few well-known roles. Exploring less traditional and emerging fields could help you expand your understanding of available career paths",
  high:"you have a good level of awareness of psychology career opportunities across various sectors. There might still be scope to explore emerging fields and deepen your understanding of less traditional roles."
}

export const PreparednessforRealWorldRoles={
  id:"Preparedness",
  title:"Preparedness for Real-World Roles",
  low:"You may feel less prepared for real-world roles in psychology and could benefit from opportunities to develop practical skills. Internships, hands-on training, or professional development programs might help you feel more confident in your readiness",
  medium:"You have developed some skills for real-world roles, but there may still be room to build more practical exposure. Participating in targeted workshops or additional training programs could strengthen your confidence and capabilities",
  high:"You feel fairly confident in your preparedness for real-world roles. While this is encouraging, there may still be opportunities to refine and expand your skill set for specific career paths"
}

export const ClarityAboutSpecializationChoices={
  id:"Clarity",
  title:"Clarity About Specialization Choices",
  low:"You may be uncertain about which specialization aligns with your skills and interests. This could be a great opportunity to explore career counseling, assessments, or workshops to gain more clarity and make informed decisions.",
  medium:"You have some understanding of specialization options, but there may still be a need for more clarity. Engaging in career bootcamps or assessments might help you refine your choices and align them with your long-term goals.",
  high:"You feel confident about your specialization choice and its alignment with your skills and interests. However, there could still be value in exploring other options to confirm your decision or discover new possibilities."
}

export const UnderstandingInternshipSelectionforCareerGrowth={
  id:"Understanding",
  title:"Understanding Internship Selection for Career Growth",
  low:"You might be unclear about how internships contribute to job readiness or which internships would suit your career goals. This could be a chance to explore mentorship programs or sessions on internship selection strategies to gain more clarity",
  medium:"You have some understanding of internships and their role in job readiness. However, there may be opportunities to learn more about how to strategically align internships with your career aspirations",
  high:"You have a good understanding of the role internships play in job readiness and how to select ones that align with your career goals. There could still be value in exploring new or emerging internship opportunities."
}



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
      info:slot?.info,
      dates:slot.date,
      slot:slot.time,
      isLocked:slot?.isLocked
    }));
};
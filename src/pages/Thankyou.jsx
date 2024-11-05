
import Frame from "../assets/Frame.svg"
import Header from "../components/Header"
const Thankyou=()=>{

  return(<>

    <Header/>

    <div className="bg-white w-full h-[80rem]  flex justify-center items-center mt-200px">
        <div className="flex  flex-col justify-center items-center  ">
            <img className="w-[15rem] h-[15rem]"
              src={Frame}
            />
            <p className="flex flex-col justify-center items-center text-[1.8rem] font-nunito font-bold">
                Thank You for time
                  <span className="font-nunito font-semibold text-[1.2rem]">your response ha been sent sucefully</span>
            </p>
            <a href="/" className="text-p-1 justify-center items-center text-[1.4rem] font-nunito font-bold"> Back to Home</a>

        </div>

  </div>
    </>)

}
export default Thankyou
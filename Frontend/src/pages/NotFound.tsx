import Not_found from "../assets/404_status.png";
import { useNavigate } from "react-router-dom"

export default function NotFound(){
    const navigate=useNavigate()
    return(
        <div className="flex flex-col gap-y-2 h-screen items-center justify-center">
            <img src={Not_found} className="rounded-[30px]" width={180} height={160} alt="Not supported image"/>
            <div className="text-xl max-md:text-lg text-center font-semibold">
                <p>Oops! Page not found</p>
            </div>
            <div className="text-center text-base max-md:text-sm my-2">
                <p>The page you're try to reach doesn't exist</p>
            </div>
            <button className="flex bg-gray-800 justify-center items-center rounded-[30px] w-[120px] text-white h-[43px]" onClick={()=>navigate(-1)}>
                Return
            </button>
        </div>
    )
}

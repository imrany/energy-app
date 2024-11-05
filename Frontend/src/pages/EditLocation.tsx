import { useEffect } from "react";
import { useParams } from "react-router-dom"
export default function EditLocation(){
    const {id}=useParams();
    
    useEffect(()=>{
        console.log(id)
    },[])
    return(
        <div className="h-screen items-center align-center flex">Edit location</div>
    )
}

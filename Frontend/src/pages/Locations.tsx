import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
  

export default function Locations(){
    const navigate=useNavigate()
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col gap-2 w-full px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Locations</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Input type="text" name="" placeholder="Type your location" id="" />
            </div>
            <div className="flex flex-col gap-4 justify-center border-b py-4 px-4 h-[200px] border-gray-500 border-dashed">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">Home</p>
                        <p className="text-sm">GreenLand</p>
                    </div>
                    <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate("/locations/1")}>
                        Stats
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">2400 WHs/day</p>
                        <p className="text-sm">4 Appliances</p>
                    </div>
                    <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate("/locations/2")}>
                        Edit
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center border-b py-4 px-4 h-[200px] border-gray-500 border-dashed">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">Work</p>
                        <p className="text-sm">GreenLand</p>
                    </div>
                    <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate("/locations:/id")}>
                        Stats
                    </Button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">17000 WHs/day</p>
                        <p className="text-sm">20 Appliances</p>
                    </div>
                    <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate("/locations:/id")}>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Locations(){
    const {API_URL, getLocations,  handleGetLocations }=useContext(GlobalContext)
    const [error,setError]=useState("")
    const [open, setOpen] = useState(false); // Manage dialog visibility
    const navigate=useNavigate()
    const [totalConsumption,setTotalConsumption]=useState(0)
    const [totalAppliance,setTotalAppliances]=useState(0)
    const [locations,setLocations]=useState([
        {
            location_name:"",
            location_state: "",
            consumption: 0, //(total_watts*total_hours)/24,
            appliances: 0, 
        }
    ])
    const [locationsOrigin,setLocationsOrigin]=useState([
        {
            location_name:"",
            location_state: "",
            consumption: 0, //(total_watts*total_hours)/24,
            appliances: 0, 
        }
    ])

    const handleClose = () => {
        setOpen(false); // Set open state to false to close the dialog
        setError("")
    };

    async function handleAddLocation(e:any){
        try{
            e.preventDefault()
            let url=`${API_URL}/api/locations`
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    location_name:`${e.target.location_name.value}`,
                    location_state:`${e.target.location_state.value}`,
                    appliances:{
                        name:`${e.target.name.value}`, 
                        hours:e.target.hours.value, 
                        quantity:e.target.quantity.value, 
                        watts:e.target.watts.value
                    }
                })
            })
            const parseRes=await response.json()
            if(parseRes.error){
                console.log(parseRes.error)
                setError("Try a different location and state.")
            }else{
                handleClose()
                e.target.reset()
                handleGetLocations()
            }
        }catch(error:any){
            console.log(error.message)
        }
    }

    function handleSearch(e:any) {
        let results:any=[]
        let search=e.target.value
        locationsOrigin.map((location)=>{
            if(location.location_name.toLowerCase().includes(search.toLowerCase())){
                results.push(location)
            }
        })
        setLocations(results)
    }

    function setLocation(){
        setLocationsOrigin(getLocations)
        setLocations(getLocations)
        let consumptions=[]
        let appliances=[]
        for (let i = 0; i < getLocations.length; i++) {
            consumptions.push(Math.round(getLocations[i].consumption));
            appliances.push(Math.round(getLocations[i].appliances));
        }
        let sumConsuptions = consumptions.reduce((acc, val) => acc + val, 0)
        let sumAppliances = appliances.reduce((acc, val) => acc + val, 0)
        setTotalConsumption(sumConsuptions)
        setTotalAppliances(sumAppliances)
    }

    useEffect(()=>{
        setLocation()
    },[getLocations])
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col gap-2 w-full px-4 max-sm:px-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>My Locations</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Input type="search" name="search" placeholder="Type a location to search" onChange={handleSearch} />
            </div>
            <Card className="my-2 mx-4 max-sm:mx-3">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Location energy consumption</CardTitle>
                        <CardDescription>
                            Showing total energy consumed by in your locations
                        </CardDescription>
                    </div>
                    <div className="flex gap-2 px-6 py-5 sm:py-6">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" onClick={() => handleGetLocations()}>
                                        <ReloadIcon/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Refresh table</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => setOpen(true)}>Add new appliance</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                <DialogTitle className="flex flex-col gap-1">
                                    <span className="text-red-500 text-sm font-normal">{error}</span>
                                    Add new appliance
                                </DialogTitle>
                                <DialogDescription>
                                    You are adding a new appliance.
                                </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddLocation} className="flex flex-col gap-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="location_name">
                                            Location name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="location_name"
                                            name="location_name"
                                            placeholder="Home"
                                            required
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="location_state">
                                            State
                                        </Label>
                                        <Input
                                            type="text"
                                            id="location_state"
                                            name="location_state"
                                            placeholder="Greenland"
                                            required
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="name">
                                            Appliance
                                        </Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Computer"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="quantity">
                                                Counts
                                            </Label>
                                            <Input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                required
                                            />
                                        </div>

                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="watts">
                                                Watts
                                            </Label>
                                            <Input
                                                type="number"
                                                id="watts"
                                                name="watts"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="hours">
                                            Hours
                                        </Label>
                                        <Input
                                            type="number"
                                            id="hours"
                                            name="hours"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="px-3">
                                        submit
                                    </Button>
                                </form>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="button" onClick={handleClose} variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your recent locations.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Location</TableHead>
                                <TableHead>State</TableHead>
                                <TableHead>Consumption (WHs/day)</TableHead>
                                <TableHead>Appliances</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {locations.map((location) => (
                            <TableRow key={location.location_name}>
                                <TableCell className="font-medium">{location.location_name}</TableCell>
                                <TableCell>{location.location_state}</TableCell>
                                <TableCell>{Math.round(location.consumption)}</TableCell>
                                <TableCell>{location.appliances}</TableCell>
                                <TableCell className="flex">
                                    <div className="flex gap-2 ml-auto">
                                        <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate(`/locations/${location.location_name}`)}>
                                            Stats
                                        </Button>
                                        <Button variant="secondary" className="bg-gray-300 w-[120px]" onClick={()=>navigate(`/edit_location/${location.location_name}`)}>
                                            Edit
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{totalConsumption}</TableCell>
                                <TableCell>{totalAppliance}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

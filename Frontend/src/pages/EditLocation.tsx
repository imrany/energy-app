import { Link, useNavigate, useParams } from "react-router-dom"
import { Label } from "@/components/ui/label"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlobalContext } from "@/context"

export default function EditLocation(){
    const {API_URL}=useContext(GlobalContext)
    const { id }=useParams()
    const navigate=useNavigate()

    async function updateLocation(e:any) {
        try {
            e.preventDefault()
            let url=`${API_URL}/api/locations/${id}`
            const response=await fetch(url,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    location_name:e.target.location_name.value, 
                    location_state:e.target.location_state.value, 
                    appliances:{
                        name:e.target.name.value,
                        hours:e.target.hours.value,
                        quantity:e.target.quantity.value
                    }
                })
            })
            const parseRes=await response.json()
            if(parseRes.error){
                alert(parseRes.error)
            }else{
                navigate("/")
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }

    async function handleDelete() {
        try {
            let url=`${API_URL}/api/locations/${id}`
            const response=await fetch(url,{method:"DELETE"})
            const parseRes=await response.json()
            if(parseRes.error){
                alert(parseRes.error)
            }else{
                navigate("/")
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col pb-4 gap-2 w-full px-4 max-sm:px-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">
                                My Locations
                            </Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">
                                Edit Location
                            </Link>
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>{id}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <form onSubmit={updateLocation} className="flex flex-col gap-2 px-4 max-sm:px-3">
                <Card>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Edit location</CardTitle>
                            <CardDescription>
                                Changes this location's details
                            </CardDescription>
                        </div>
                        <div className="flex gap-3 px-6 py-5 sm:py-6">
                            <Button type="button" variant="destructive" className="w-[120px]" onClick={handleDelete}>Delete location</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="location_name">Location Name</Label>
                                <Input type="text" id="location_name" name="location_name" placeholder="Nairobi" required/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="location_state">Location State</Label>
                                <Input type="text" id="location_state" name="location_state" placeholder="Kenya" required/>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent className="px-2 sm:p-6 border-t-[1px]">
                        <div className="flex flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="name">Appliance</Label>
                                <Input type="text" id="name" name="name" placeholder="Computer" required/>
                            </div>
                            <div className="flex gap-2">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="picture">Hours</Label>
                                    <Input type="number" id="hours" required/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input type="number" id="quantity" name="quantity" required/>
                                </div>
                            </div>
                            <Button type="submit" className="w-[200px]">
                                Add
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
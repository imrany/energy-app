import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
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
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
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
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
  
export default function Leaderboard(){
    const {API_URL}=useContext(GlobalContext)
    const [open, setOpen] = useState(false); // Manage dialog visibility
    const [totalWind, setTotalWind]=useState(0)
    const [totalSolar, setTotalSolar]=useState(0)
    const [totalGas, setTotalGas]=useState(0)
    const [totalCoal, setTotalCoal]=useState(0)
    const [leaderboard,setLeaderboard]=useState([
        {
            id:0,
            location_state:"",
            wind:0,
            solar:0,
            gas:0,
            coal:0
        }
    ])

    async function getLeaderboard(){
        try {
            let url=`${API_URL}/api/leaderboard`
            const response=await fetch(url)
            const parseRes=await response.json()
            if(parseRes.error){
                console.log(parseRes.error)
            }else{
                console.log(parseRes.leaderboard)
                setLeaderboard(parseRes.leaderboard)
                let winds=[]
                let solars=[]
                let gases=[]
                let coals=[]
                for (let i = 0; i < parseRes.leaderboard.length; i++) {
                    winds.push(Math.round(parseRes.leaderboard[i].wind));
                    solars.push(Math.round(parseRes.leaderboard[i].solar));
                    gases.push(Math.round(parseRes.leaderboard[i].gas));
                    coals.push(Math.round(parseRes.leaderboard[i].coal));
                }
                let sumWind = winds.reduce((acc, val) => acc + val, 0)
                let sumSolar = solars.reduce((acc, val) => acc + val, 0)
                let sumGas = gases.reduce((acc, val) => acc + val, 0)
                let sumCoal = coals.reduce((acc, val) => acc + val, 0)
                setTotalWind(sumWind)
                setTotalSolar(sumSolar)
                setTotalGas(sumGas)
                setTotalCoal(sumCoal)
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const handleClose = () => {
        setOpen(false); // Set open state to false to close the dialog
    };

    async function deleteLeaderboard(id:number) {
        try {
            let url=`${API_URL}/api/leaderboard/${id}`
            const response=await fetch(url,{
                method:"DELETE"
            })
            const parseRes=await response.json()
            if(parseRes.error){
                console.log(parseRes.error)
            }else{
                handleClose()
                getLeaderboard()
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getLeaderboard()
    },[])
    return(
        <div className="h-screen flex flex-col my-2">
            <div className="flex flex-col gap-2 w-full px-4 max-sm:px-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">My leaderboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Leader Board</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Card className="my-2 mx-4 max-sm:mx-3">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>The leader Board</CardTitle>
                        <CardDescription>
                            Showing leading sources under different states
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex">
                    <Table>
                        <TableCaption>The list of leading energy sources</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">State</TableHead>
                                <TableHead>Wind</TableHead>
                                <TableHead>Solar</TableHead>
                                <TableHead>Gas</TableHead>
                                <TableHead>Coal</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell  className="font-medium">{item.location_state}</TableCell>
                                <TableCell>{Math.round(item.wind)}</TableCell>
                                <TableCell>{Math.round(item.solar)}</TableCell>
                                <TableCell>{Math.round(item.gas)}</TableCell>
                                <TableCell>{Math.round(item.coal)}</TableCell>
                                <TableCell>
                                    <Dialog open={open} onOpenChange={setOpen}>
                                        <DialogTrigger>
                                            <Button variant="ghost" onClick={() => setOpen(true)}>
                                                <Trash2 className="w-[18px] h-[18px]"/>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                <DialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter className="flex">
                                                <DialogClose asChild>
                                                    <Button onClick={handleClose} type="button" variant="destructive">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button type="button" onClick={()=>deleteLeaderboard(item.id)} className="hover:bg-[#60a5f3] bg-[#2563eb]">
                                                    Confirm
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{totalWind}</TableCell>
                                <TableCell>{totalSolar}</TableCell>
                                <TableCell>{totalGas}</TableCell>
                                <TableCell>{totalCoal}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import { GlobalContext } from "./context";
import Statistics from "./pages/Statistics";
import EditLocation from "./pages/EditLocation";
import Locations from "./pages/Locations";
import LocationStats from "./pages/LocationStats";

function App() {
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState("Loading, please wait...")
    const API_URL=`http://localhost:8000`;
    // const API_URL=`https://energy-app-comf.onrender.com`
    const [getLocations,setGetLocations]=useState([
        {
            location_name:"",
            location_state: "",
            consumption: 0, //(total_watts*total_hours)/24,
            appliances: 0, 
        }
    ])

    async function handleGetLocations(){
        try {
            setIsLoading(true)
            let url=`${API_URL}/api/locations`
            const response=await fetch(url)
            const parseRes=await response.json()
            if(parseRes.error){
                console.log(parseRes.error)
                setError(`Error: ${parseRes.error}`)
            }else{
                setIsLoading(false)
                console.log(parseRes.locations)
                setGetLocations(parseRes.locations)
            }
        } catch (error:any) {
            console.log(error.message)
            setError(`Error: ${error.message}`)
        }
    }

    useEffect(()=>{
        handleGetLocations()
    },[])
    return (
        <>
            {isLoading?(
                <div className="flex flex-col h-screen w-screen items-center justify-center">
                    <p className="text-center w-[80vw]">{error}</p>
                </div>
            ):(
                <BrowserRouter>
                    <GlobalContext.Provider value={{ API_URL, getLocations,  handleGetLocations }}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Locations />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="/statistics" element={<Statistics />} />
                                <Route path="/locations/:id" element={<LocationStats />} />
                                <Route path="/edit_location/:id" element={<EditLocation />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </GlobalContext.Provider>
                </BrowserRouter>
            )}
        </>
    )
}

export default App

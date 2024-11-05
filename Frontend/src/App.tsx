import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react'
import Layout from '@/components/Layout';
import NotFound from './pages/NotFound';
import Leaderboard from './pages/Leaderboard';
import { GlobalContext } from "./context";
import Statistics from "./pages/Statistics";
import EditLocation from "./pages/EditLocation";
import Locations from "./pages/Locations";
import LocationStats from "./pages/LocationStats";

function App() {
    const API_URL=`http://localhost:8000`

    useEffect(()=>{
    },[])
    return (
        <BrowserRouter>
            <GlobalContext.Provider value={{ API_URL }}>
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
    )
}

export default App

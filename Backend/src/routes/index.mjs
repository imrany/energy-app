import express from "express"
import { 
    createLocation, 
    deleteLeaderboardEntry,  
    deleteLocation,  
    getAnalyticsData,  
    getLeaderboard, 
    getLocations, 
    getNationalSources, 
    updateLocation
} from "../Controllers/index.mjs";

const router=express.Router();

router.get('/analytics/:location_name', getAnalyticsData);

router.get('/locations',getLocations);
router.post('/locations', createLocation);
router.patch('/locations/:previous_location_name', updateLocation);
router.delete('/locations/:location_name', deleteLocation);

router.get('/national-sources', getNationalSources);

router.get('/leaderboard',getLeaderboard);
router.delete('/leaderboard/:id',deleteLeaderboardEntry);

export default router
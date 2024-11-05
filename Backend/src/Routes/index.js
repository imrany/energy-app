import express from "express"
import { 
    createLocation, 
    deleteLeaderboardEntry,  
    deleteLocation,  
    getAnalyticsData,  
    getAppliances, 
    getLeaderboard, 
    getLocations, 
    getNationalSources, 
    loadAnalytics, 
    updateLocation
} from "../Controllers/index.js";

const router=express.Router();


router.get('/analytics',loadAnalytics);
router.get('/analytics/:location_name', getAnalyticsData);

router.get('/appliances',getAppliances);

router.get('/locations',getLocations);
router.post('/locations', createLocation);
router.patch('/locations/:previous_location_name', updateLocation);
router.delete('/locations/:location_name', deleteLocation);

router.get('/national-sources', getNationalSources);

router.get('/leaderboard',getLeaderboard);
router.delete('/leaderboard/:id',deleteLeaderboardEntry);

export default router
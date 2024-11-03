import express from "express"
import { 
    createLocation, 
    createNationalSources, 
    deleteLeaderboardEntry,  
    getAnalyticsData,  
    getAppliances, 
    getLeaderboard, 
    getLocations, 
    getNationalSources, 
    loadAnalytics, 
    updateLocation
} from "../Controllers";

const router=express.Router();


router.get('/analytics',loadAnalytics);
router.get('/analytics/:location_name/:timeRange', getAnalyticsData);

router.get('/appliances',getAppliances);

router.get('/locations',getLocations);
router.post('/locations', createLocation);
router.patch('/locations/:id', updateLocation);

router.get('/national-sources', getNationalSources);
router.post('/national-sources', createNationalSources);
router.patch('/national-sources/:location_state', createNationalSources);

router.get('/leaderboard',getLeaderboard);
router.delete('/leaderboard/:location_name',deleteLeaderboardEntry);

export default router
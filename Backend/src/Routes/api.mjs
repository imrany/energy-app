/*
* defined all api routes here 
*/
import express from "express"
import { getAnalyticsData } from "../Controllers/AnalyticsController.mjs";
import { createLocation, deleteLocation, getLocations, updateLocation } from "../Controllers/LocationController.mjs";
import { getNationalSources } from "../Controllers/NationalStatsController.mjs";
import { deleteLeaderboardEntry, getLeaderboard } from "../Controllers/LeaderBoardController.mjs";

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
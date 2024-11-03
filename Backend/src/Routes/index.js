import express from "express"
import { getLeaderboard, deleteLeaderboardEntry } from '../Controllers/LeaderboardController.mjs';
import { getNationalSources } from '../Controllers/NationalSources.mjs';
import { createLocation, getAppliances, getLocations, loadAnalytics } from "../Controllers";
const router=express.Router();

router.get('/leaderboard',getLeaderboard);

router.get('/analytics',loadAnalytics);
router.get('/analytics/:locationId/:timeRange', AnalyticsController.getAnalyticsData);

router.get('/appliances',getAppliances);

router.get('/locations',getLocations);
router.post('/locations', createLocation);

router.get('/national-sources', getNationalSources);
router.delete('/leaderboard/:index',deleteLeaderboardEntry);

export default router

const routes = {
    '/': 'locations',
    '/locations': 'locations',
    '/edit-location': 'editLocation',
    '/statistics': 'locationStatistics',
    '/leaderboard': 'publicLeaderboard',
    '/national-stats': 'nationalStats'
  };
  
  function router() {
    let path = window.location.hash.slice(1) || '/';
    let params = new URLSearchParams(window.location.search);
    
    const [base, id] = path.split('/');
    
    const page = routes[`/${base}`] || 'notFound';
  
    loadPage(page, id, params);
  }
  
  function loadPage(page, id, params) {
    const contentDiv = document.getElementById('content');
    
    switch(page) {
      case 'locations':
        import('./LocationListController.mjs')
          .then(module => {
            contentDiv.innerHTML = '<h1>Locations</h1><div id="locations-list"></div>';
            module.default.render();
          });
        break;
      case 'editLocation':
        import('./LocationEditController.mjs')
          .then(module => {
            contentDiv.innerHTML = '<h1>Edit Location</h1><div id="location-edit-form"></div>';
            module.default.render(id);
          });
        break;
      case 'locationStatistics':
        import('./LocationStatsController.mjs')
          .then(module => {
            contentDiv.innerHTML = '<h1>Location Statistics</h1><div id="location-statistics"></div>';
            module.default.render(id);
          });
        break;
      case 'publicLeaderboard':
        import('./LeaderboardController.mjs')
          .then(module => {
            contentDiv.innerHTML = '<h1>Public Leaderboard</h1><div id="public-leaderboard"></div>';
            module.default.render();
          });
        break;
      case 'nationalStats':
        import('../Controllers/NationalStatsController.mjs')
          .then(module => {
            contentDiv.innerHTML = '<h1>National Statistics</h1><div id="national-statistics"></div>';
            module.default.render();
          });
        break;
      default:
        contentDiv.innerHTML = '<h1>404 Not Found</h1>';
    }
  }
  
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  
  export function navigateTo(url) {
    window.location.hash = url;
  }

 
import express from 'express';
import { loadAnalyticsPage } from '../Controllers/AnalyticsController.mjs';

const router = express.Router();

router.get('/analytics', loadAnalyticsPage);

export default router;

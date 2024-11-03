import LeaderboardModel from '../Models/LeaderboardModel.mjs';

let locations = [
    {
        name: 'Location 1',
        appliances: [
            { name: 'Computer', watts: 200, hours: 5, quantity: 2 },
            { name: 'Fridge', watts: 150, hours: 24, quantity: 1 }
        ]
    },
    {
        name: 'Location 2',
        appliances: [
            { name: 'Light', watts: 60, hours: 10, quantity: 10 }
        ]
    }
];

export const getLeaderboard = (req, res) => {
    const leaderboard = locations.map(location => ({
        locationName: location.name,
        totalEnergy: LeaderboardModel.calculateTotalEnergy(location)
    }));
    
    res.json(leaderboard);
};

export const deleteLeaderboardEntry = (req, res) => {
    const index = parseInt(req.params.index);
    
    if (index >= 0 && index < locations.length) {
        locations.splice(index, 1);
        res.status(200).send('Deleted successfully');
    } else {
        res.status(404).send('Entry not found');
    }
};

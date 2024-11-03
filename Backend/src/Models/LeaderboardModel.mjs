class LeaderboardModel {
    static calculateTotalEnergy(location) {
        let totalEnergy = 0;
        location.appliances.forEach(appliance => {
            totalEnergy += appliance.watts * appliance.hours * appliance.quantity;
        });
        return totalEnergy;
    }
}

export default LeaderboardModel;

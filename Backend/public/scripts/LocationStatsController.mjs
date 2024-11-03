import LocationModel from './LocationModel.mjs';

const LocationStatsController = {
    async init() {
        this.locationId = new URLSearchParams(window.location.search).get('id');
        this.location = await LocationModel.getLocation(this.locationId);
        this.energySources = await this.fetchEnergySources();
        this.render();
    },

    async fetchEnergySources() {
        const response = await fetch('/api/energy-sources');
        return response.json();
    },

    calculateEnergyUsage() {
        const totalUsage = this.location.appliances.reduce((total, appliance) => {
            return total + (appliance.hoursUsed * appliance.quantity * this.getApplianceWattage(appliance.type));
        }, 0);

        return this.energySources.map(source => ({
            name: source.name,
            percentage: source.percentage,
            usage: (totalUsage * source.percentage / 100).toFixed(2)
        }));
    },

    getApplianceWattage(type) {
        // This would ideally come from a database or API
        const wattages = {
            'Refrigerator': 150,
            'TV': 100,
            'Washing Machine': 500,
            // Add more appliances as needed
        };
        return wattages[type] || 100; // Default to 100W if unknown
    },

    render() {
        const container = document.getElementById('location-stats');
        const usage = this.calculateEnergyUsage();

        container.innerHTML = `
            <h2>${this.location.name}, ${this.location.state}</h2>
            <div id="energy-sources-chart"></div>
            <ul>
                ${usage.map(source => `
                    <li>${source.name}: ${source.usage} Wh (${source.percentage}%)</li>
                `).join('')}
            </ul>
        `;

        this.renderChart(usage);
    },

    renderChart(usage) {
        // This is a placeholder for chart rendering
        // You would typically use a charting library like Chart.js here
        const chartContainer = document.getElementById('energy-sources-chart');
        chartContainer.innerHTML = 'Energy Sources Chart Placeholder';
    }
};

export default LocationStatsController;
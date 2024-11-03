import AnalyticsModel from '../Models/AnalyticsModel.mjs';

const AnalyticsController = {
    init() {
        this.locationSelect = document.getElementById('location-select');
        this.timeRangeSelect = document.getElementById('time-range');
        this.usageChart = document.getElementById('usageChart');
        this.projectionChart = document.getElementById('projectionChart');
        this.summaryContent = document.getElementById('summary-content');

        this.loadLocations();
        this.locationSelect.addEventListener('change', () => this.updateAnalytics());
        this.timeRangeSelect.addEventListener('change', () => this.updateAnalytics());
    },

    async loadLocations() {
        const locations = await AnalyticsModel.getLocations();
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location.id;
            option.textContent = location.name;
            this.locationSelect.appendChild(option);
        });
        this.updateAnalytics();
    },

    async updateAnalytics() {
        const locationId = this.locationSelect.value;
        const timeRange = this.timeRangeSelect.value;

        const data = await AnalyticsModel.getAnalyticsData(locationId, timeRange);
        this.renderUsageChart(data.usageData);
        this.renderSummary(data.summary);
        this.renderProjections(data.projections);
    },

    renderUsageChart(usageData) {
        const maxUsage = Math.max(...usageData.map(d => d.usage));
        const chartHtml = usageData.map(d => `
            <div class="bar" style="height: ${(d.usage / maxUsage) * 100}%" title="${d.date}: ${d.usage.toFixed(2)} kWh"></div>
        `).join('');
        this.usageChart.innerHTML = chartHtml;
    },

    renderSummary(summary) {
        this.summaryContent.innerHTML = `
            <div class="summary-item">
                <h3>Total Usage</h3>
                <p>${summary.totalUsage.toFixed(2)} kWh</p>
            </div>
            <div class="summary-item">
                <h3>Average Daily Usage</h3>
                <p>${summary.averageDailyUsage.toFixed(2)} kWh</p>
            </div>
            <div class="summary-item">
                <h3>Peak Usage</h3>
                <p>${summary.peakUsage.toFixed(2)} kWh</p>
            </div>
            <div class="summary-item">
                <h3>Usage Trend</h3>
                <p>${summary.usageTrend}</p>
            </div>
        `;
    },

    renderProjections(projections) {
        const maxProjection = Math.max(...projections.map(d => d.usage));
        const chartHtml = projections.map(d => `
            <div class="bar" style="height: ${(d.usage / maxProjection) * 100}%; background-color: #e74c3c;" title="${d.date}: ${d.usage.toFixed(2)} kWh"></div>
        `).join('');
        this.projectionChart.innerHTML = chartHtml;
    }
};

export default AnalyticsController;
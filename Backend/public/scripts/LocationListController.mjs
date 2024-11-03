import LocationModel from './LocationModel.mjs';

const LocationListController = {
    async init() {
        this.locationList = await LocationModel.getAllLocations();
        this.render();
        this.attachEventListeners();
    },

    render() {
        const container = document.getElementById('location-list');
        container.innerHTML = this.locationList.map(location => `
            <div class="location-item">
                <h3>${location.name}, ${location.state}</h3>
                <p>Daily Energy Consumption: ${location.totalEnergyConsumption} Wh</p>
                <p>Number of Appliances: ${location.appliances.length}</p>
                <button class="view-stats" data-id="${location.id}">View Statistics</button>
                <button class="edit-location" data-id="${location.id}">Edit Location</button>
            </div>
        `).join('');

        container.innerHTML += '<button id="create-location">Create New Location</button>';
    },

    attachEventListeners() {
        document.querySelectorAll('.view-stats').forEach(button => {
            button.addEventListener('click', (e) => this.viewStats(e.target.dataset.id));
        });

        document.querySelectorAll('.edit-location').forEach(button => {
            button.addEventListener('click', (e) => this.editLocation(e.target.dataset.id));
        });

        document.getElementById('create-location').addEventListener('click', () => this.createLocation());
    },

    viewStats(locationId) {
        window.location.href = `/location_statistics.html?id=${locationId}`;
    },

    editLocation(locationId) {
        window.location.href = `/edit_location.html?id=${locationId}`;
    },

    createLocation() {
        window.location.href = '/edit_location.html';
    }
};

export default LocationListController;
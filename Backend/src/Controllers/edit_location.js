// Controller
class LocationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindAddAppliance(this.handleAddAppliance.bind(this));
        this.view.bindSaveLocation(this.handleSaveLocation.bind(this));
        this.view.bindDeleteAppliance(this.handleDeleteAppliance.bind(this));

        this.editIndex = new URLSearchParams(window.location.search).get('index');
        if (this.editIndex !== null) {
            const location = this.model.getLocation(this.editIndex);
            if (location) {
                this.view.setLocationData(location);
            }
        }
    }

    handleAddAppliance() {
        this.view.addApplianceToList();
    }

    handleSaveLocation() {
        const locationData = this.view.getLocationData();
        if (this.editIndex !== null) {
            this.model.updateLocation(this.editIndex, locationData);
        } else {
            this.model.addLocation(locationData);
        }
        window.location.href = 'locations_list.html';
    }

    handleDeleteAppliance(index) {
        const locationData = this.view.getLocationData();
        locationData.appliances.splice(index, 1);
        this.view.renderAppliances(locationData.appliances);
    }
}


const app = new LocationController(new LocationModel(), new LocationView());
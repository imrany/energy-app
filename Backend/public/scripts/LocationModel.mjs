const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your actual API base URL

const LocationModel = {
  async getAllLocations() {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`);
      if (!response.ok) throw new Error('Failed to fetch locations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  async getLocationById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch location');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },

  async updateLocation(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update location');
      return await response.json();
    } catch (error) {
      console.error(`Error updating location with id ${id}:`, error);
      throw error;
    }
  },

  async getLocationStats(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}/stats`);
      if (!response.ok) throw new Error('Failed to fetch location statistics');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching statistics for location with id ${id}:`, error);
      throw error;
    }
  },

  async createLocation(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create location');
      return await response.json();
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },

  async deleteLocation(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete location');
      return await response.json();
    } catch (error) {
      console.error(`Error deleting location with id ${id}:`, error);
      throw error;
    }
  }
};

export default LocationModel;
import axios from "axios";

class LocationService {
  static BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/location`;
  static ACCESS_TOKEN = localStorage.getItem("token");

  static async saveLocation(coords, buildingId) {
    const response = await axios.put(
      `${LocationService.BASE_URL}/for-building/${buildingId}`,
      coords,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`
          },
          withCredentials: true
        }
    );
    return response.data;
  }

  static async getBuildingLocation(buildingId) {
    const response = await axios.get(
      `${LocationService.BASE_URL}/get-by-building/${buildingId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`
          },
          withCredentials: true
        }
    );
    console.log(response);
    return response.data;
  }

  static async getLocations() {
    const response = await axios.get(`${LocationService.BASE_URL}/get-all-locations`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.ACCESS_TOKEN}`
          },
          withCredentials: true
        }
    );

    return response.data;
  }
}

export default LocationService;

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  private apiUrl = 'http://localhost:5000/drones';

  async getDrones() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async createDrone(drone: any) {
    const response = await axios.post(this.apiUrl, drone);
    return response.data;
  }

  async updateDrone(id: string, drone: any) {
    const droneData = { ...drone };
    delete drone._id;
  
    return axios.put(`${this.apiUrl}/${id}`, droneData)
      .then(response => response.data)
      .catch(error => console.error("Error updating mission:", error));
  }

  async deleteDrone(id: string) {
    const response = await axios.delete(`${this.apiUrl}/${id}`);
    return response.data;
  }
}

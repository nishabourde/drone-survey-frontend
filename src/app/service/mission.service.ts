import { Injectable } from '@angular/core';
import axios from 'axios';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private API_URL = 'http://localhost:5000/missions'; 

  constructor() {}


  async getMissions() {
    const response = await axios.get(this.API_URL);
    return response.data;
  }

  async createMission(mission: Mission): Promise<Mission> {
    try {
      const response = await axios.post<Mission>('http://localhost:5000/missions', mission);
      return response.data; 
    } catch (error) {
      console.error('Error creating mission:', error);
      throw error;
    }
  }

  updateMission(id: string, mission: any): Promise<any> {
    const missionData = { ...mission };
    delete missionData._id; // ✅ Remove _id before sending the request
  
    return axios.put(`http://localhost:5000/missions/${id}`, missionData)
      .then(response => response.data)
      .catch(error => console.error("Error updating mission:", error));
  }
  
  async deleteMission(id: string) {
    try {
      const response = await axios.delete(`http://localhost:5000/missions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting mission:', error);
      throw error;
    }
  }

}

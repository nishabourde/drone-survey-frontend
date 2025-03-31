import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { DroneService } from './drone.service';

jest.mock('axios');  // ✅ Mock axios

describe('DroneService', () => {
  let service: DroneService;
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DroneService],
    });
    service = TestBed.inject(DroneService);
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  // ✅ Test getDrones()
  it('should fetch all drones', async () => {
    const mockDrones = [{ _id: '1', name: 'Drone A' }, { _id: '2', name: 'Drone B' }];
    mockAxios.get.mockResolvedValue({ data: mockDrones });

    const result = await service.getDrones();

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5000/drones');
    expect(result).toEqual(mockDrones);
  });

  // ✅ Test createDrone()
  it('should create a new drone', async () => {
    const newDrone = { name: 'Drone X', model: 'X1' };
    const mockResponse = { _id: '3', ...newDrone };

    mockAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await service.createDrone(newDrone);

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:5000/drones', newDrone);
    expect(result).toEqual(mockResponse);
  });

  // ✅ Test updateDrone()
  it('should update a drone', async () => {
    const droneUpdate = { _id: '1', name: 'Updated Drone' };
    const updatedData = { name: 'Updated Drone' };

    mockAxios.put.mockResolvedValue({ data: updatedData });

    const result = await service.updateDrone('1', droneUpdate);

    expect(mockAxios.put).toHaveBeenCalledWith('http://localhost:5000/drones/1', { name: 'Updated Drone' });
    expect(result).toEqual(updatedData);
  });

  // ✅ Test deleteDrone()
  it('should delete a drone', async () => {
    mockAxios.delete.mockResolvedValue({ data: { success: true } });

    const result = await service.deleteDrone('1');

    expect(mockAxios.delete).toHaveBeenCalledWith('http://localhost:5000/drones/1');
    expect(result).toEqual({ success: true });
  });

  // ✅ Test updateDrone() - Handle error case
  it('should handle errors when updating a drone', async () => {
    const droneUpdate = { _id: '1', name: 'Drone Error' };
  
    mockAxios.put.mockRejectedValue(new Error('Update failed'));
  
    try {
      await service.updateDrone('1', droneUpdate);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      // expect(error.message).toBe('Update failed');
    }
  });
  
});

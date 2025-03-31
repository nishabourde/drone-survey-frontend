import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { MissionService } from './mission.service';
import { Mission } from '../models/mission';

jest.mock('axios'); 

describe('MissionService', () => {
  let service: MissionService;
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService],
    });
    service = TestBed.inject(MissionService);
    mockAxios = axios as jest.Mocked<typeof axios>;
  });

  // ✅ Test getMissions()
  it('should fetch all missions', async () => {
    const mockMissions: Mission[] = [
      { _id: '1', name: 'Mission A', status: 'Active', location: 'Site 1', date: '2025-03-31' },
      { _id: '2', name: 'Mission B', status: 'Completed', location: 'Site 2', date: '2025-03-30' }
    ];
    mockAxios.get.mockResolvedValue({ data: mockMissions });

    const result = await service.getMissions();

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5000/missions');
    expect(result).toEqual(mockMissions);
  });

  // ✅ Test createMission()
  it('should create a new mission', async () => {
    const newMission: Mission = { name: 'Mission X', status: 'Pending', location: 'Site X', date: '2025-04-01' };
    const mockResponse = { _id: '3', ...newMission };

    mockAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await service.createMission(newMission);

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:5000/missions', newMission);
    expect(result).toEqual(mockResponse);
  });

  // ✅ Test updateMission()
  it('should update a mission', async () => {
    const missionUpdate = { _id: '1', name: 'Updated Mission', status: 'In Progress', location: 'Site Y', date: '2025-04-02' };
    const updatedData = { name: 'Updated Mission', status: 'In Progress', location: 'Site Y', date: '2025-04-02' };

    mockAxios.put.mockResolvedValue({ data: updatedData });

    const result = await service.updateMission('1', missionUpdate);

    expect(mockAxios.put).toHaveBeenCalledWith('http://localhost:5000/missions/1', updatedData);
    expect(result).toEqual(updatedData);
  });

  // ✅ Test deleteMission()
  it('should delete a mission', async () => {
    mockAxios.delete.mockResolvedValue({ data: { success: true } });

    const result = await service.deleteMission('1');

    expect(mockAxios.delete).toHaveBeenCalledWith('http://localhost:5000/missions/1');
    expect(result).toEqual({ success: true });
  });

  // ✅ Test updateMission() - Handle error case
  it('should handle errors when updating a mission', async () => {
    const missionUpdate = { _id: '1', name: 'Mission Error', status: 'Failed', location: 'Site Z', date: '2025-04-03' };

    mockAxios.put.mockRejectedValue(new Error('Update failed'));

    try {
      await service.updateMission('1', missionUpdate);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MissionDashboardComponent } from './mission-dashboard.component';
import { MissionService } from '../../service/mission.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('MissionDashboardComponent', () => {
  let component: MissionDashboardComponent;
  let fixture: ComponentFixture<MissionDashboardComponent>;
  let mockMissionService: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockMissionService = {
      getMissions: jest.fn().mockReturnValue(Promise.resolve([{ _id: '1', name: 'Test Mission', status: 'Active', location: 'Area 51', date: '2025-03-31' }])),
      createMission: jest.fn().mockReturnValue(Promise.resolve({ _id: '2', name: 'New Mission' })),
      updateMission: jest.fn().mockReturnValue(Promise.resolve({ name: 'Updated Mission' })),
      deleteMission: jest.fn().mockReturnValue(Promise.resolve({ success: true }))
    };

    mockSnackBar = { open: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [MissionDashboardComponent],
      providers: [
        { provide: MissionService, useValue: mockMissionService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load missions on init', async () => {
    await component.ngOnInit();
    expect(mockMissionService.getMissions).toHaveBeenCalled();
    expect(component.missions.length).toBeGreaterThan(0);
  });

  it('should create a mission', async () => {
    component.mission = { name: 'New Mission', status: 'Pending', location: 'Test', date: '2025-04-01' };
    await component.onCreateMission(new Event('submit'));
    expect(mockMissionService.createMission).toHaveBeenCalledWith(component.mission);
  });

  it('should update a mission', async () => {
    component.mission = { _id: '1', name: 'Updated Mission', status: 'Active', location: 'Test', date: '2025-04-01' };
    await component.onSubmit(new Event('submit'));
    expect(mockMissionService.updateMission).toHaveBeenCalledWith('1', component.mission);
  });

  it('should delete a mission', async () => {
    await component.deleteMission('1');
    expect(mockMissionService.deleteMission).toHaveBeenCalledWith('1');
  });

  // it('should handle mission creation error', async () => {
  //   mockMissionService.createMission.mockReturnValue(Promise.reject('Error creating mission'));
  //   await component.onCreateMission(new Event('submit'));
  //   expect(mockSnackBar.open).toHaveBeenCalledWith('Error creating mission!', 'Close', expect.anything());
  // });

  // it('should handle mission deletion error', async () => {
  //   mockMissionService.deleteMission.mockReturnValue(Promise.reject('Error deleting mission'));
  //   await component.deleteMission('1');
  //   expect(mockSnackBar.open).toHaveBeenCalledWith('Error deleting mission!', 'Close', expect.anything());
  // });
});

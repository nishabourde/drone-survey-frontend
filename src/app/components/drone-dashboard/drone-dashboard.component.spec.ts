import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneDashboardComponent } from './drone-dashboard.component';
import { DroneService } from '../../service/drone.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

describe('DroneDashboardComponent', () => {
  let component: DroneDashboardComponent;
  let fixture: ComponentFixture<DroneDashboardComponent>;
  let droneService: jasmine.SpyObj<DroneService>;

  beforeEach(async () => {
    const droneServiceSpy = jasmine.createSpyObj('DroneService', ['getDrones', 'createDrone', 'updateDrone', 'deleteDrone']);

    await TestBed.configureTestingModule({
      declarations: [DroneDashboardComponent],
      imports: [CommonModule, MatTableModule, FormsModule],
      providers: [{ provide: DroneService, useValue: droneServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DroneDashboardComponent);
    component = fixture.componentInstance;
    droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load drones on init', () => {
    const mockDrones = [{ _id: '1', name: 'Drone A', type: 'Quadcopter', status: 'Active' }];
    droneService.getDrones.and.returnValue(Promise.resolve(mockDrones));

    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.drones).toEqual(mockDrones);
    });
  });

  it('should create a new drone', async () => {
    const newDrone = { name: 'Drone B', type: 'Hexacopter', status: 'Inactive' };
    droneService.createDrone.and.returnValue(Promise.resolve(newDrone));
    spyOn(component, 'loadDrones');

    await component.onSubmit(new Event('submit'));
    expect(droneService.createDrone).toHaveBeenCalledWith(newDrone);
    expect(component.loadDrones).toHaveBeenCalled();
  });

  it('should update an existing drone', async () => {
    const updatedDrone = { _id: '1', name: 'Updated Drone', type: 'Octocopter', status: 'Active' };
    droneService.updateDrone.and.returnValue(Promise.resolve(updatedDrone));
    spyOn(component, 'loadDrones');

    component.drone = updatedDrone;
    await component.onSubmit(new Event('submit'));

    expect(droneService.updateDrone).toHaveBeenCalledWith('1', updatedDrone);
    expect(component.loadDrones).toHaveBeenCalled();
  });

  it('should delete a drone', async () => {
    droneService.deleteDrone.and.returnValue(Promise.resolve({ success: true }));
    spyOn(component, 'loadDrones');

    await component.deleteDrone('1');

    expect(droneService.deleteDrone).toHaveBeenCalledWith('1');
    expect(component.loadDrones).toHaveBeenCalled();
  });

  it('should handle errors when deleting a drone', async () => {
    droneService.deleteDrone.and.returnValue(Promise.reject('Error deleting drone'));
    spyOn(console, 'error');

    try {
      await component.deleteDrone('1');
    } catch (error) {
      expect(console.error).toHaveBeenCalledWith('Error deleting drone');
    }
  });
});

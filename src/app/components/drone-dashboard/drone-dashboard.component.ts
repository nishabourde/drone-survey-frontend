import { Component, OnInit } from '@angular/core';
import { DroneService } from '../../service/drone.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drone-dashboard',
  templateUrl: './drone-dashboard.component.html',
  styleUrl: './drone-dashboard.component.scss',
  imports: [CommonModule, MatTableModule, FormsModule]
})
export class DroneDashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'status', 'actions'];
  drones: any[] = [];
  drone: any = { name: '', type: '', status: '' };

  constructor(private droneService: DroneService) {}

  async ngOnInit() {
    this.loadDrones();
  }

  async loadDrones() {
    this.drones = await this.droneService.getDrones();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.drone._id) {
      await this.droneService.updateDrone(this.drone._id, this.drone);
    } else {
      await this.droneService.createDrone(this.drone);
    }
    this.loadDrones();
    this.resetForm();
  }

  editDrone(drone: any) {
    this.drone = { ...drone };
  }

  async deleteDrone(id: string) {
    await this.droneService.deleteDrone(id);
    this.loadDrones();
  }

  resetForm() {
    this.drone = { name: '', type: '', status: '' };
  }
}

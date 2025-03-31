import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../service/mission.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Mission } from '../../models/mission';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MqttMissionService } from '../../service/mqtt-service';

@Component({
  selector: 'app-mission-dashboard',
  imports: [CommonModule, MatTableModule, FormsModule ],
  templateUrl: './mission-dashboard.component.html',
  styleUrl: './mission-dashboard.component.scss'
})

export class MissionDashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'status', 'progress', 'actions']; // ✅ Add "actions"

  missions: any[] = [];
  selectedMission: any = null;
  mission: Mission = { name: '', status: '', location: '', date: '' };

  constructor(
      private missionService: MissionService,
      private snackBar: MatSnackBar,
      // private mqttService: MqttMissionService
  ) {}

  async ngOnInit() {
    this.loadMissions();
    // this.mqttService.onConnect.subscribe(() => {
    //   console.log('Connected to MQTT Broker');
    //   this.mqttService.getMissionUpdates().subscribe(message => {
    //     const update = JSON.parse(message.payload.toString());
    //     console.log('New update received:', update);
    //     this.missionUpdates.push(update);
    //   });
    // });
  }

  showMessage(message: string, color: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [color],
    });
  }

  async getMissions(){
    try {
      this.missions = await this.missionService.getMissions();
      console.log('Fetched missions:', this.missions);
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  }

  async onCreateMission(event: Event) {
    event.preventDefault();
    try {
      const newMission = await this.missionService.createMission(this.mission);
      this.getMissions();
      this.resetForm();
    } catch (error) {
      alert('Error creating mission!');
    }
  }

  loadMissions() {
    this.missionService.getMissions().then((data) => {
      this.missions = data;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.mission._id) { 
      this.missionService.updateMission(this.mission._id, this.mission).then(() => {
        this.showMessage('Mission Updated Successfully!', 'success-snackbar');
        this.loadMissions();
        this.resetForm();
      });
    } else {
      this.missionService.createMission(this.mission).then(() => {
        this.showMessage('Mission Created Successfully!', 'success-snackbar');
        this.loadMissions();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.mission = { name: '', status: '', location: '', date: '' };
  }
  
  editMission(mission: any) {
    this.mission = { ...mission }; 
  }
  async deleteMission(missionId: string) {
    try {
      await this.missionService.deleteMission(missionId);
      this.showMessage('Mission deleted successfully!', 'snackbar-danger');
      this.loadMissions(); 
    } catch (error) {
      this.showMessage('Error deleting mission!', 'snackbar-error');
    }
  }
}

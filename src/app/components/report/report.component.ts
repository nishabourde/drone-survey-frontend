import { Component } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  standalone: true, 
  imports: [CommonModule, MatTableModule, FormsModule], 
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  displayedColumns: string[] = ['name', 'status', 'progress', 'start_time', 'end_time'];

  missions: any[] = [];

  constructor(private reportService: ReportService) {}

  async ngOnInit() {
    this.missions = await this.reportService.getReports();
  }
  
}

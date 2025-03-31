
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionDashboardComponent } from './components/mission-dashboard/mission-dashboard.component';
import { DroneDashboardComponent } from './components/drone-dashboard/drone-dashboard.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
  { path: 'missions', component: MissionDashboardComponent },
  { path: 'drones', component: DroneDashboardComponent },
  { path: 'reports', component: ReportComponent },
  { path: '', redirectTo: '/missions', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

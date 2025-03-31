import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:5000/reports';

  constructor() {}

   async getReports() {
      const response = await axios.get(this.apiUrl);
      return response.data;
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root',
})
export class MissionMqttService {
  constructor(private mqttService: MqttService) {}

  getMissionUpdates(): Observable<IMqttMessage> {
    return this.mqttService.observe('missions/updates');
  }
}

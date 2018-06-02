import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class EventService {

  BASE_URL = 'http://localhost:3000/api/';
  private _eventsUrl = 'http://localhost:3000/api/events/';

  selectedEvent;
  events: any[];
  myEvents: any[];

  constructor(private auth: AuthService, private http: HttpClient) {
    this.getEvents().subscribe(res => this.events = res);
    this.getMyEvents(this.auth.userId).subscribe(res => this.myEvents = res);
     }


  getEvents(): Observable<any[]>  {
    return this.http.get<any>(this._eventsUrl).pipe();
  }

  getMyEvents(userId): Observable<any[]> {
    return this.http.get<any>(this._eventsUrl + userId).pipe();
  }

  removeMyEvents(userId) {
    this.http.delete(this._eventsUrl + 'delete/' + userId).subscribe(res => {
      if (this.events) {
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].userId === res['userID']) {
            this.events.splice(i, 1);
          }
          if (this.myEvents) {
            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < this.myEvents.length; i++) {
              this.myEvents.splice(i, 1);
            }
          }
        }
      }


    });
  }

  addEvent(event, userId) {
    if (!event) {
    return this.http.post(this._eventsUrl + 'add/' + userId, event);
    }


}
}

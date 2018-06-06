import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from './event';
// import { Observable } from 'rxjs/Observable';
// import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
@Injectable()

export class EventService {

  selectedEvent: EventModel;

  // back-end route reference -- check the port!!
  private _getUrl = 'http://localhost:3000/api/events';
  private _postUrl = 'http://localhost:3000/api/events/add';  // check if its not the adress shitting
  private _putUrl = 'http://localhost:3000/api/events/update/'; // "/" at the end cuz event id will be following
  private _deleteUrl = 'http://localhost:3000/api/events/delete/'; // "/" at the end cuz event id will be following

  constructor(private _http: HttpClient) { }

  // fetch all events (in the WALL & EVENTS-CENTER)
  getEvents() {
    return this._http.get<any>(this._getUrl);
  }

  // create a new event, from the EVENTS-CENTER component
  addEvent(event: EventModel) {
    return this._http.post(this._postUrl, event);
  }


  // edit event, from the EVENTS-DETAILS component  --- working BUT -- when updated, returns an event with "null" values
  editEvent(event: EventModel) {
    return this._http.put(this._putUrl + this.selectedEvent['_id'], this.selectedEvent);
  }



  // delete event, from EVENT-DETAILS ------ working
  deleteEvent(event: EventModel) {
    return this._http.delete(this._deleteUrl + this.selectedEvent['_id']);
  }

}

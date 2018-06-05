import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventModel } from './../event';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})


export class EventDetailsComponent implements OnInit {

  event: any;
  eventModel: any;

  updateEventEvent: any;
  constructor(private _eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.event = this._eventService.selectedEvent;
  }

  updateEvent() { // function to update an existing event
    this._eventService.editEvent(this.eventModel).subscribe(res => {
      console.log(res);
      this.router.navigate(['/events']);
    });
  }

  removeEvent(id) {
    this._eventService.deleteEvent(this.eventModel).subscribe(res => {
      console.log(res); // will show deleted event details json object);
      this.router.navigate(['/events']);
    });
  }
}

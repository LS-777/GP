import { EventService } from '../event.service';
import { EventModel } from './../event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-center',
  templateUrl: './event-center.component.html',
  styleUrls: ['./event-center.component.css'],
  providers: [EventService]

})
export class EventCenterComponent implements OnInit {

  onAddMode = false;
  eventModel = {
    name: '',
    description: '',
    category: '',
    contact: '',
    date: ''
  };

  constructor(private _eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  addMode() {
    this.onAddMode = !this.onAddMode;
  }

  addEvent() {
    this._eventService.addEvent(this.eventModel).subscribe(res => {
      console.log(res);
      this.eventModel = {
        name: '',
        description: '',
        category: '',
        contact: '',
        date: ''
      };
    });
    this.router.navigate(['/events']);

  }

}

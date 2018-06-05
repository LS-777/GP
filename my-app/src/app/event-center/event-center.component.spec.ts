import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCenterComponent } from './event-center.component';

describe('EventCenterComponent', () => {
  let component: EventCenterComponent;
  let fixture: ComponentFixture<EventCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

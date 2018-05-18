import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrezComponent } from './prez.component';

describe('PrezComponent', () => {
  let component: PrezComponent;
  let fixture: ComponentFixture<PrezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

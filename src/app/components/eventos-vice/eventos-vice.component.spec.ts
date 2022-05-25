import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosViceComponent } from './eventos-vice.component';

describe('EventosViceComponent', () => {
  let component: EventosViceComponent;
  let fixture: ComponentFixture<EventosViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDirectorComponent } from './eventos-director.component';

describe('EventosDirectorComponent', () => {
  let component: EventosDirectorComponent;
  let fixture: ComponentFixture<EventosDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

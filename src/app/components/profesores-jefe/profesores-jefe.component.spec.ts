import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresJefeComponent } from './profesores-jefe.component';

describe('ProfesoresJefeComponent', () => {
  let component: ProfesoresJefeComponent;
  let fixture: ComponentFixture<ProfesoresJefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresJefeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirEventosComponent } from './imprimir-eventos.component';

describe('ImprimirEventosComponent', () => {
  let component: ImprimirEventosComponent;
  let fixture: ComponentFixture<ImprimirEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

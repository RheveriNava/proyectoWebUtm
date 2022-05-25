import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirArticulosComponent } from './imprimir-articulos.component';

describe('ImprimirArticulosComponent', () => {
  let component: ImprimirArticulosComponent;
  let fixture: ComponentFixture<ImprimirArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

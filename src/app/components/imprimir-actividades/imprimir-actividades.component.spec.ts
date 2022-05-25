import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirActividadesComponent } from './imprimir-actividades.component';

describe('ImprimirActividadesComponent', () => {
  let component: ImprimirActividadesComponent;
  let fixture: ComponentFixture<ImprimirActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirActividadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

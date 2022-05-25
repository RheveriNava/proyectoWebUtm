import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesViceComponent } from './actividades-vice.component';

describe('ActividadesViceComponent', () => {
  let component: ActividadesViceComponent;
  let fixture: ComponentFixture<ActividadesViceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesViceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesViceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

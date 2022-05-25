import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDirectorComponent } from './actividades-director.component';

describe('ActividadesDirectorComponent', () => {
  let component: ActividadesDirectorComponent;
  let fixture: ComponentFixture<ActividadesDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

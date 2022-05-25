import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosDirectorComponent } from './articulos-director.component';

describe('ArticulosDirectorComponent', () => {
  let component: ArticulosDirectorComponent;
  let fixture: ComponentFixture<ArticulosDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

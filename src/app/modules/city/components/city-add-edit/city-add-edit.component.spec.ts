import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAddEditComponent } from './city-add-edit.component';

describe('CityAddEditComponent', () => {
  let component: CityAddEditComponent;
  let fixture: ComponentFixture<CityAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityAddEditComponent]
    });
    fixture = TestBed.createComponent(CityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

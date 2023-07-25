import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAddEditComponent } from './state-add-edit.component';

describe('StateAddEditComponent', () => {
  let component: StateAddEditComponent;
  let fixture: ComponentFixture<StateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateAddEditComponent]
    });
    fixture = TestBed.createComponent(StateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

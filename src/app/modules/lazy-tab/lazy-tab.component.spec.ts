import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTabComponent } from './lazy-tab.component';

describe('LazyTabComponent', () => {
  let component: LazyTabComponent;
  let fixture: ComponentFixture<LazyTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LazyTabComponent]
    });
    fixture = TestBed.createComponent(LazyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

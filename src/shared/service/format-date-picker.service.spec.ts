import { TestBed } from '@angular/core/testing';

import { FormatDatePickerService } from './format-date-picker.service';

describe('FormatDatePickerService', () => {
  let service: FormatDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

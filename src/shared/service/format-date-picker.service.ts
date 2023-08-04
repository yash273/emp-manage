import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDatePickerService extends NativeDateAdapter {

  displayFormat = localStorage.getItem("format") || 'MM/dd/yyyy';

  override format(date: Date, displayFormat: Object): string {
    return formatDate(date, this.displayFormat, this.locale);
  }
}

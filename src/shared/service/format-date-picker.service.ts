import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDatePickerService extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'dd/MM/yyyy') {
      return formatDate(date, 'dd/MM/yyyy', this.locale)
    } else if (displayFormat === 'MM/dd/yyyy') {
      return formatDate(date, 'MM/dd/yyyy', this.locale)
    }
    else {
      return formatDate(date, 'MM/dd/yyyy', this.locale)
    }
  }
}

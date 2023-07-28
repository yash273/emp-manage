import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NameByIdPipe } from './pipes/name-by-id.pipe';

@NgModule({
  declarations: [
    NameByIdPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    NameByIdPipe
  ]
})
export class SharedModule { }

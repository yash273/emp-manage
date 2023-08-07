import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyTabRoutingModule } from './lazy-tab-routing.module';
import { LazyTabComponent } from './lazy-tab.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    LazyTabComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LazyTabRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class LazyTabModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InfoComponent } from './components/info/info.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }

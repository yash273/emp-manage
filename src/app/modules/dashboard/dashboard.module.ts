import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InfoComponent } from './components/info/info.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    InfoComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule,
    NgxSpinnerModule

  ]
})
export class DashboardModule { }

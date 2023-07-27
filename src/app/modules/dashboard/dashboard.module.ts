import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InfoComponent } from './components/info/info.component';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    InfoComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }

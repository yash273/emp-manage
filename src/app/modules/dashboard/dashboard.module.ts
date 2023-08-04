import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxChartsModule,
    NgxSpinnerModule,
    SharedModule,
    HttpClientModule,

    TranslateModule
  ]
})
export class DashboardModule { }

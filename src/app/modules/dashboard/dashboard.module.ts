import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InfoComponent } from './components/info/info.component';
// import { SharedModule } from 'src/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { HeaderComponent } from 'src/shared/components/header/header.component';


@NgModule({
  declarations: [
    InfoComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // SharedModule,
    MaterialModule
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
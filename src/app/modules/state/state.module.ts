import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateListComponent } from './components/state-list/state-list.component';
import { StateAddEditComponent } from './components/state-add-edit/state-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material/material.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    StateListComponent,
    StateAddEditComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StateModule { }

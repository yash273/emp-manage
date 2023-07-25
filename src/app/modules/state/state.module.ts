import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateListComponent } from './components/state-list/state-list.component';
import { StateAddEditComponent } from './components/state-add-edit/state-add-edit.component';


@NgModule({
  declarations: [
    StateListComponent,
    StateAddEditComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule
  ]
})
export class StateModule { }

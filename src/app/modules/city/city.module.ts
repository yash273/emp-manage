import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityAddEditComponent } from './components/city-add-edit/city-add-edit.component';


@NgModule({
  declarations: [
    CityListComponent,
    CityAddEditComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule
  ]
})
export class CityModule { }

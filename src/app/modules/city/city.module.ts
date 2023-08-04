import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityAddEditComponent } from './components/city-add-edit/city-add-edit.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CityListComponent,
    CityAddEditComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    MaterialModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class CityModule { }

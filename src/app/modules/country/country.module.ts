import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryAddEditComponent } from './components/country-add-edit/country-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material/material.module';


@NgModule({
  declarations: [
    CountryListComponent,
    CountryAddEditComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }

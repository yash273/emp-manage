import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryAddEditComponent } from './components/country-add-edit/country-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material/material.module';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


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
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class CountryModule { }

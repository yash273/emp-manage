import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryAddEditComponent } from './components/country-add-edit/country-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent
  },
  {
    path: 'add',
    component: CountryAddEditComponent
  },
  {
    path: 'edit',
    component: CountryAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryAddEditComponent } from './components/country-add-edit/country-add-edit.component';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    component: CountryListComponent,
  },
  {
    path: 'add',
    canActivate: [canActivateGuard],
    component: CountryAddEditComponent
  },
  {
    path: 'edit/:id',
    canActivate: [canActivateGuard],
    component: CountryAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }

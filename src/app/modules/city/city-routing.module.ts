import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityAddEditComponent } from './components/city-add-edit/city-add-edit.component';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    component: CityListComponent
  },
  {
    path: 'add',
    canActivate: [canActivateGuard],
    component: CityAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }

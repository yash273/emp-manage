import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityAddEditComponent } from './components/city-add-edit/city-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent
  },
  {
    path: 'add',
    component: CityAddEditComponent
  },
  {
    path: 'edit',
    component: CityAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddEditComponent } from './components/employee-add-edit/employee-add-edit.component';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    component: EmployeeListComponent
  },
  {
    path: 'add',
    canActivate: [canActivateGuard],
    component: EmployeeAddEditComponent
  },
  {
    path: 'edit/:id',
    canActivate: [canActivateGuard],
    component: EmployeeAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './components/state-list/state-list.component';
import { StateAddEditComponent } from './components/state-add-edit/state-add-edit.component';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canActivateGuard],
    component: StateListComponent
  },
  {
    path: 'add',
    canActivate: [canActivateGuard],
    component: StateAddEditComponent
  },
  {
    path: 'edit/:id',
    canActivate: [canActivateGuard],
    component: StateAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }

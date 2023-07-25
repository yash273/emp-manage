import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './components/state-list/state-list.component';
import { StateAddEditComponent } from './components/state-add-edit/state-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent
  },
  {
    path: 'add',
    component: StateAddEditComponent
  },
  {
    path: 'edit',
    component: StateAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }

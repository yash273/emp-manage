import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyTabComponent } from './lazy-tab.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LazyTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyTabRoutingModule { }

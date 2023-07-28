import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { DashboardComponent } from './dashboard.component';
import { canActivateGuard } from 'src/app/helpers/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: InfoComponent,
        // canActivate: [canActivateGuard],
      },
      {
        path: 'country',
        loadChildren: () =>
          import('./../country/country.module').then((m) => m.CountryModule),
      },
      {
        path: 'state',
        canActivate: [canActivateGuard],
        loadChildren: () =>
          import('./../state/state.module').then((m) => m.StateModule),
      },
      {
        path: 'city',
        canActivate: [canActivateGuard],
        loadChildren: () =>
          import('./../city/city.module').then((m) => m.CityModule),
      },
      {
        path: 'employee',
        canActivate: [canActivateGuard],
        loadChildren: () =>
          import('./../employee/employee.module').then((m) => m.EmployeeModule),
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/shared/components/page-not-found/page-not-found.component';
import { canActivateGuard } from './helpers/can-activate.guard';
import { SettingsComponent } from './modules/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'country',
    loadChildren: () =>
      import('./modules/country/country.module').then((m) => m.CountryModule),
  },
  {
    path: 'state',
    loadChildren: () =>
      import('./modules/state/state.module').then((m) => m.StateModule),
  },
  {
    path: 'city',
    loadChildren: () =>
      import('./modules/city/city.module').then((m) => m.CityModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then((m) => m.SettingsModule)
    // component: SettingsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

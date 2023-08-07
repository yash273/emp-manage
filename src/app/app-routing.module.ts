import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    title: 'Welcome | EmpManage',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | EmpManage',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'country',
    title: 'Country | EmpManage',
    loadChildren: () =>
      import('./modules/country/country.module').then((m) => m.CountryModule),
  },
  {
    path: 'state',
    title: 'State | EmpManage',
    loadChildren: () =>
      import('./modules/state/state.module').then((m) => m.StateModule),
  },
  {
    path: 'city',
    title: 'City | EmpManage',
    loadChildren: () =>
      import('./modules/city/city.module').then((m) => m.CityModule),
  },
  {
    path: 'employee',
    title: 'Employee | EmpManage',
    loadChildren: () =>
      import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'settings',
    title: 'Settings | EmpManage',
    loadChildren: () =>
      import('./modules/settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: 'tab',
    title: 'Lazy-tabs | EmpManage',
    loadChildren: () =>
      import('./modules/lazy-tab/lazy-tab.module').then((m) => m.LazyTabModule)
  },
  {
    path: '**',
    title: '404 | EmpManage',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

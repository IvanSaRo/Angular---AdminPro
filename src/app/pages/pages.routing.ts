import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadersearchComponent } from './headersearch/headersearch.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { LoginComponent } from '../auth/login/login.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProgressComponent } from './progress/progress.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Mantenimiento
import { DoctorComponent } from './mantenimiento/doctors/doctor.component';
import { DoctorsComponent } from './mantenimiento/doctors/doctors.component';
import { HospitalsComponent } from './mantenimiento/hospitals/hospitals.component';
import { UsersComponent } from './mantenimiento/users/users.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes'} },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica #1'} },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile'} },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
      { path: 'prueba', component: LoginComponent, data: { title: 'Prueba'} },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'} },
      { path: 'search/:term', component: HeadersearchComponent, data: { title: 'Search'} },
      

      // Mantenimiento
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de doctores'} },
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Mantenimiento de doctores'} },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de hospitales'} },
      
      // Ruta Admin
      { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Mantenimiento de usuarios'} },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

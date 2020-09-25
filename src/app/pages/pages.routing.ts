import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginComponent } from '../auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';

// Mantenimiento
import { UsersComponent } from './mantenimiento/users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes'} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1'} },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
      { path: 'prueba', component: LoginComponent, data: { titulo: 'Rxjs'} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },

      // Mantenimiento
      { path: 'users', component: UsersComponent, data: { titulo: 'Usuarios'} },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

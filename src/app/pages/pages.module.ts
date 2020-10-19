import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { DoctorsComponent } from './mantenimiento/doctors/doctors.component';
import { HospitalsComponent } from './mantenimiento/hospitals/hospitals.component';
import { UsersComponent } from './mantenimiento/users/users.component';
import { DoctorComponent } from './mantenimiento/doctors/doctor.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule, /* esta importación es para que funcione routeroutlet, por eso no hace falta que sea AppRoutingModule */
    FormsModule, /* importado para que el ngmodel del progress funcione */
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule/* para poder usar pipes en las pages */
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ]
})
export class PagesModule { }

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';


const routes: Routes = [
 
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NopagesfoundComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

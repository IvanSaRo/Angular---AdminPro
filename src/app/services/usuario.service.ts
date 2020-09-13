import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  base_url = environment.base_url;
  
  constructor( private http: HttpClient) { }


  createUser(formData: RegisterForm){
    
    return this.http.post(`${ this.base_url}/users`, formData )
               .pipe(
                 tap( (res: any) => {
                   localStorage.setItem('token', res.token);
                   
                 })
               )
  }

  login( formData: LoginForm){
   
    return this.http.post(`${ this.base_url}/login`, formData ) 
               .pipe(
                 tap( (res: any) => {
                   localStorage.setItem('token', res.token);
                   
                 })
               )
  }


}



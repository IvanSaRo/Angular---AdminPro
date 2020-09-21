import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url = environment.base_url;

  public auth2: any;

  public user: User;
  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
    
    
  }

  googleInit() {
    
    return new Promise(resolve => {


      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '1079830924924-jpp1eou8vupsvfb5ttcl3e159u8f10mr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    })
    
  }

  logout() {
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
    // como ls función de arriba es llama a una librería externa a Angular provoca problemas de ejecución
    // el botónG no recarga bien al hacer logout, va a manejar la instancia global de Angular y va a permitirnos
    // ejecutar procesos en Angular aunque vengan de fuera 
    this.ngZone.run( () => {

       this.router.navigateByUrl('/login');

     })
     
    });
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${this.base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => {
          const { email, ​google, img = '', name, uid, role} = res.user;

          this.user = new User(name, email, img, '', role, google, uid);
          
          console.log(this.user);
          
          
          localStorage.setItem('token', res.token);
          
        }),
        map((res) => true),
        catchError((err) => of(false)) //este of retorna un nuevo observable con el false para que no se rompa el ciclo
      );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${this.base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}

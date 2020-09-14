import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) {}

  validateToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ this.base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);

      }),
      map( res => true ),
      catchError( err => of( false)) //este of retorna un nuevo observable con el false para que no se rompa el ciclo
    )
  }
  
  
  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}/login`, formData)
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
  loginGoogle(token) {
    return this.http.post(`${this.base_url}/login/google`, {token})
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }
}

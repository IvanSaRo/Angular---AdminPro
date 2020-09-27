import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { chargeUser } from '../interfaces/charge-users.interface';

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base_url = environment.base_url;

  public auth2: any;

  public user: User;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id:
            '1079830924924-jpp1eou8vupsvfb5ttcl3e159u8f10mr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      // como ls función de arriba es llama a una librería externa a Angular provoca problemas de ejecución
      // el botónG no recarga bien al hacer logout,ngZone va a manejar la instancia global de Angular y va
      // a permitirnos ejecutar procesos en Angular aunque vengan de fuera
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${this.base_url}/login/renew`, this.headers).pipe(
      map((res: any) => {
        const { email, google, img = '', name, uid, role } = res.user;

        this.user = new User(name, email, img, '', role, google, uid);

        localStorage.setItem('token', res.token);

        return true;
      }),
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

  updateProfile(data: { name: string; email: string; role: string }) {
    data = {
      ...data,
      role: this.user.role,
    };
    return this.http.put(
      `${this.base_url}/users/${this.uid}`,
      data,
      this.headers
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

  getUsers(from: number = 0) {
    const url = `${this.base_url}/users?from=${from}`;

    return this.http.get<chargeUser>(url, this.headers);
  }
}

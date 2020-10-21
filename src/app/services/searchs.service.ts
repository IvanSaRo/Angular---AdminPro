import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  base_url = environment.base_url;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformUsers(res: any): User[] {
    return res.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.img,
          '',
          user.role,
          user.google,
          user.uid
        )
    );
  }

  private transformHospitals(res: any): Hospital[] {
    return res.map(
      (hospital) =>
        new Hospital(
          hospital.name,
          hospital._id,
          hospital.img,
          hospital.user
        ) /* podría devolver res directamente porque aquí el tipado no es tan importante como con el usuario */
    );
  }

  private transformDoctors(res: any): Doctor[] {
    return res.map(
      (doctor) =>
        new Doctor(
          doctor.name,
          doctor._id,
          doctor.img,
          doctor.user,
          doctor.hospital
        )
    );
  }

  search(type: 'users' | 'doctors' | 'hospitals', query: string = '') {
    const url = `${this.base_url}/search/collection/${type}/${query}`;
    return this.http.get(url, this.headers).pipe(
      map((res: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(res.results);
          case 'doctors':
            return this.transformDoctors(res.results);
          case 'hospitals':
            return this.transformHospitals(res.results);

          default:
            return [];
        }
      })
    );
  }
}

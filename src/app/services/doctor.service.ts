import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

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

  getHospitals() {
    const url = `${base_url}/doctors`;

    return this.http
      .get(url, this.headers)
      .pipe(
        map((res: { ok: boolean; doctors: Doctor[] }) => res.doctors)
      );
  }

  createDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors`;

    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    const url = `${base_url}/doctors/${doctor._id}`;

    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(_id: string) {
    const url = `${base_url}/doctors/${_id}`;

    return this.http.delete(url, this.headers);
  }
}

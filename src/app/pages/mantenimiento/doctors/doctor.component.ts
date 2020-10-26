import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from '../../../models/hospital.model';

import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [],
})
export class DoctorComponent implements OnInit {
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedHospital: Hospital;
  public selectedDoctor: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: [``, Validators.required],
    });

    this.doctorForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.selectedHospital = this.hospitals.find((h) => h._id === hospitalId);
    });
  }
  loadHospitals() {
    this.hospitalService
      .getHospitals()
      .subscribe((hospitals) => (this.hospitals = hospitals));
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    this.doctorService.createDoctor(this.doctorForm.value).subscribe((res:any) => {
      Swal.fire('Doctor creado', name, 'success');
      this.router.navigate(['dashboard', 'doctor', res.doctor._id ]),
        (err) => Swal.fire('Error', 'No se pudo crear doctor', 'error');
    });
  }
}

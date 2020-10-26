import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: [``, Validators.required],
    });
    
    this.doctorForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.selectedHospital = this.hospitals.find((h) => h._id === hospitalId);
    });
    this.loadHospitals();
    
    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadDoctor(id);
    });
  }

  loadDoctor(id: string) {
    if (id === 'new') {
      return;
    }

    this.doctorService.getDoctorById(id).subscribe((doctor) => {
      if (!doctor) {
        return this.router.navigate(['dashboard', 'doctors']);
      }

      const {
        name,
        hospital: { _id },
      } = doctor;
      this.selectedDoctor = doctor;
      this.doctorForm.setValue({ name, hospital: _id });
    });
  }

  loadHospitals() {
    this.hospitalService
      .getHospitals()
      .subscribe((hospitals) => (this.hospitals = hospitals));
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      // Actualizar
      const doctorData = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id,
      };
      this.doctorService.updateDoctor(doctorData).subscribe((res) => {
        Swal.fire(
          'Doctor actualizado',
          `${name} fue actualizado/a correctamente`,
          'success'
        );
      });
    } else {
      // Crear
      this.doctorService
        .createDoctor(this.doctorForm.value)
        .subscribe((res: any) => {
          Swal.fire('Doctor creado', name, 'success');
          this.router.navigate(['dashboard', 'doctor', res.doctor._id]),
            (err) => Swal.fire('Error', 'No se pudo crear doctor', 'error');
        });
    }
  }
}

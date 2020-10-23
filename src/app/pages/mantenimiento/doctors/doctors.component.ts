import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Doctor } from '../../../models/doctor.model';

import { DoctorService } from '../../../services/doctor.service';
import { SearchsService } from '../../../services/searchs.service';
import { ModalImgService } from '../../../services/modal-img.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  constructor(
    private doctorService: DoctorService,
    private searchsService: SearchsService,
    private modalImgService: ModalImgService
  ) {}
  public doctors: Doctor[] = [];
  public loading: boolean = true;
  public doctorsTemp: Doctor[] = [];
  public imgSubs: Subscription;

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.loadDoctors());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.getHospitals().subscribe((doctors) => {
      this.doctors = doctors;
      this.doctorsTemp = doctors;
      this.loading = false;
    });
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.doctors = this.doctorsTemp);
    }

    this.searchsService
      .search('doctors', term)
      .subscribe((res) => (this.doctors = res));
  }

  openModal(doctor: Doctor) {
    this.modalImgService.openModal('doctors', doctor._id, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {
    const { name, _id } = doctor;

    Swal.fire({
      title: 'Cuidado',
      text: 'El borrado es permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(_id).subscribe((res) => {
          this.loadDoctors();
          Swal.fire('Borrado', name, 'success'),
            (err) => {
              Swal.fire('Error', 'No se pudo borrar', 'error');
            };
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Doctor } from '../../../models/doctor.model';

import { DoctorService } from '../../../services/doctor.service';
import { SearchsService } from '../../../services/searchs.service';
import { ModalImgService } from '../../../services/modal-img.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [],
})
export class DoctorsComponent implements OnInit {
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

  openModal(doctor: Doctor){
    this.modalImgService.openModal('doctors', doctor._id, doctor.img);
    
  }
}

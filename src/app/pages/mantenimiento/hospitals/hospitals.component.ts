import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImgService } from '../../../services/modal-img.service';
import { SearchsService } from '../../../services/searchs.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs: Subscription;

  public hospitalsTemp: Hospital[] = []


  constructor(
    private hospitalService: HospitalService,
    private modalImgService: ModalImgService,
    private searchsService: SearchsService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImgService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.loadHospitals());
  }

  ngOnDestroy(){
    this.imgSubs.unsubscribe();
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals().subscribe((hospitals) => {
      this.hospitals = hospitals;
      this.hospitalsTemp = hospitals;
      this.loading = false;
    });
  }
  saveChanges(hospital: Hospital) {
    const { name, _id } = hospital;

    this.hospitalService.updateHospital(_id, name).subscribe((res) => {
      Swal.fire('Actualizado', name, 'success'),
        (err) => {
          Swal.fire('Error', 'No se pudo actualizar', 'error');
        };
    });
  }
  deleteHospital(hospital: Hospital) {
    const { name, _id } = hospital;

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
        this.hospitalService.deleteHospital(_id).subscribe((res) => {
          this.loadHospitals();
          Swal.fire('Borrado', name, 'success'),
            (err) => {
              Swal.fire('Error', 'No se pudo borrar', 'error');
            };
        });
      }
    });
  }

  async openSwal() {
    const { value = "" } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((res) => {
        this.loadHospitals();
        Swal.fire('Hospital creado', value, 'success'),
          (err) => {
            Swal.fire('Error', 'No se pudo crear el hospital', 'error');
          };
      });
    } else {
      return;
    }
  }

  openModal(hospital: Hospital) {
    this.modalImgService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.hospitals = this.hospitalsTemp);/* aquí también podría llamar al loadHospitals en vez de hacerlo así con el array temporal
      como back up tal y como lo hice en user */
    }

    this.searchsService.search('hospitals', term).subscribe((res) => {
      this.hospitals = res;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [],
})
export class ModalImgComponent implements OnInit {
  constructor(public modalImgService: ModalImgService) {}

  ngOnInit(): void {}

  openModal() {
    this.modalImgService.openModal();
  }

  closeModal(){
    this.modalImgService.closeModal();
  }
}

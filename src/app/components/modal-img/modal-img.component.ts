import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [],
})
export class ModalImgComponent implements OnInit {
  public imgUp: File;

  public imgTemp: any = null;

  constructor(
    public modalImgService: ModalImgService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImgService.closeModal();
  }

  changeImg(file: File) {
    this.imgUp = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImg() {
    const id = this.modalImgService.id;
    const type = this.modalImgService.type;

    this.fileUploadService
      .updatePhoto(this.imgUp, type, id)
      .then((img) => {
        Swal.fire('Guardado', 'La nueva imagen fue guardada', 'success');
        this.modalImgService.newImg.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}

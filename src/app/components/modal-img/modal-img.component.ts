import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [],
})
export class ModalImgComponent implements OnInit {
  public imgUp: File;

  public imgTemp: any = null;

  public user: User;

  
  constructor(public modalImgService: ModalImgService) {}

  ngOnInit(): void {}

  closeModal(){
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
}

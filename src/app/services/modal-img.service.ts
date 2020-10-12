import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImgService {
  private _hideModal: boolean = true;
  public type: string;
  public id: string;
  public img: string;

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-img'
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
  constructor() {}
}

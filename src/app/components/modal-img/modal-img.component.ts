import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  public hideModal = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.hideModal = true;
  }

}

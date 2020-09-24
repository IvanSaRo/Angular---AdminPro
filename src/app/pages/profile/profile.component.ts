import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;

  public user: User;

  public imgUp: File;

  public error: boolean = false;

  public imgTemp: any = null;

  constructor(private fb: FormBuilder, 
              private userService: UserService,
              private fileUploadService: FileUploadService
              ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  updateProfile() {
  

    this.userService.updateProfile(this.profileForm.value)
        .subscribe((res) => {
          const { name, email } = this.profileForm.value;

          this.user.name  = name;
          this.user.email = email;

          Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
      
        // ésto funciona debido a que en todos los lugares donde toque el user manejan la misma
        // instancia del usuario que está en el servicio, modificar en un punto modifica el objeto
        // a nivel global e instantáneo           
        }, error => {
          Swal.fire('Error', error.error.msg, 'error');

         }
    
    );
  }

  changeImg(file: File){
    this.imgUp = file;


    if (!file) { return this.imgTemp = null }



    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => { this.imgTemp = reader.result }
    
  }

  uploadImg(){

    this.fileUploadService
        .updatePhoto( this.imgUp, 'users', this.user.uid)
        .then( img => this.user.img = img );
  }
}

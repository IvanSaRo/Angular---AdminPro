import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;

  public user: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
    console.log(this.profileForm.value);

    this.userService.updateProfile(this.profileForm.value)
        .subscribe((res) => {
          const { name, email } = this.profileForm.value;

          this.user.name  = name;
          this.user.email = email;
      
        // ésto funciona debido a que en todos los lugares donde toque el user manejan la misma
        // instancia del usuario que está en el servicio, modificar en un punto modifica el objeto
        // a nivel global e instantáneo
    });
  }
}

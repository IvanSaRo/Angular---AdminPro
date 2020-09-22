import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['123', Validators.required],
      email: ['abc', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    })
  }


  updateProfile(){
    console.log(this.profileForm.value);

    this.userService.updateProfile( this.profileForm.value )
        .subscribe( res => {

          console.log( res );
          
        })
    
  }
}

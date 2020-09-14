import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;
  
  
  public registerForm = this.fb.group({
    name: ['iván', [ Validators.required, Validators.minLength(3)]],
    email: ['ivan@gmail.com', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),Validators.required]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this.samePasswords('password', 'repeatPassword')
  });
  
  
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router
              ) { }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value)

    if(this.registerForm.invalid){
      return
      
    }

    // posteo

    this.userService.createUser( this.registerForm.value )
        .subscribe( res => {
           // navegar al dashboard
        this.router.navigateByUrl('/');
          
          
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
    
  };



  fieldInvalid( field: string): boolean{

    if( this.registerForm.get(field).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  unvalidPasswords(){
    
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('repeatPassword').value;
    
    

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    }else{
      return false
    }

  }


  emptyPasswords(){

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('repeatPassword').value;
    
    

    if ((!pass1 || !pass2) && this.formSubmitted) {
      return true
    }else{
      return false
    }



  }
  acceptTerms(){
    return !this.registerForm.get('terms').value && this.formSubmitted
  }

  samePasswords(pass1name: string, pass2name: string){
    // tenemos que retornar una función ya que los validadores son funciones(validators.required por ejemplo)
    return (formGroup: FormGroup) =>{

      const pass1Control = formGroup.get(pass1name);
      const pass2Control = formGroup.get(pass2name);

      (pass1Control.value === pass2Control.value) ? pass2Control.setErrors(null) : pass2Control.setErrors({notTheSame: true});
      

    }
  }

}
